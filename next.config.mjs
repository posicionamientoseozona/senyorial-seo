/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimizaciones de imagen
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 año
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Compresión optimizada
  compress: true,

  // Optimizaciones experimentales
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  // Headers de performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          }
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
        ],
      },
    ]
  },

  // Redirecciones SEO-friendly
  async redirects() {
    return [
      {
        source: '/servicios/limpieza-hoteles',
        destination: '/servicios/hoteles',
        permanent: true, // 301
      },
      {
        source: '/servicios/limpieza-comunidades',
        destination: '/servicios/comunidades',
        permanent: true, // 301
      },
    ]
  },
};

export default nextConfig;
