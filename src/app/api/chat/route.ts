import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import fs from 'fs';
import path from 'path';

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Rate limiting storage (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limiting function
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxRequests = 10; // 10 requests per hour per IP

  if (!rateLimitStore.has(ip)) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
    return false;
  }

  const data = rateLimitStore.get(ip)!;

  if (now > data.resetTime) {
    // Reset window
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
    return false;
  }

  if (data.count >= maxRequests) {
    return true;
  }

  data.count++;
  return false;
}

// Load knowledge base
function loadKnowledgeBase(): string {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'senyorial-knowledge.md');
    return fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    console.error('Error loading knowledge base:', error);
    return '';
  }
}


export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown';

    // Check rate limit
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait before sending another message.' },
        { status: 429 }
      );
    }

    const { message, conversation = [] } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    // Load knowledge base (contains all rules and company info)
    const knowledgeBase = loadKnowledgeBase();

    if (!knowledgeBase) {
      return NextResponse.json(
        { error: 'Knowledge base not available' },
        { status: 500 }
      );
    }

    // Build conversation context
    const conversationContext = conversation
      .slice(-4) // Keep last 4 exchanges to manage token limit
      .map((msg: { role: string; content: string }) => `${msg.role === 'user' ? 'Usuario' : 'Asistente'}: ${msg.content}`)
      .join('\n');

    // Create system prompt
    const systemPrompt = `${knowledgeBase}

CONVERSACIÓN PREVIA:
${conversationContext}

`;

    // Call Groq API
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: message,
        },
      ],
      model: 'llama-3.1-8b-instant',
      temperature: 0.1,
      max_tokens: 300,
      stream: false,
    });

    const assistantMessage = completion.choices[0]?.message?.content;

    if (!assistantMessage) {
      return NextResponse.json(
        { error: 'No response generated' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: assistantMessage,
      timestamp: new Date().toISOString(),
    });

  } catch (error: unknown) {
    console.error('Chat API error:', error);

    // Handle specific Groq API errors
    const errorWithStatus = error as { status?: number };
    if (errorWithStatus?.status === 401) {
      return NextResponse.json(
        { error: 'API configuration error' },
        { status: 500 }
      );
    }

    if (errorWithStatus?.status === 429) {
      return NextResponse.json(
        { error: 'Service temporarily unavailable. Please try again in a few minutes.' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'Senyorial Chat API is running',
    timestamp: new Date().toISOString(),
  });
}