import type { Metadata } from 'next';
import styles from './TerminosCondiciones.module.css';

export const metadata: Metadata = {
  title: 'Términos y Condiciones | Senyorial - Empresa de Limpieza',
  description: 'Términos y condiciones de uso de los servicios de limpieza profesional de Senyorial en Palma de Mallorca.',
  robots: 'index, follow',
};

export default function TerminosCondicionesPage() {
  return (
    <div className={styles.container}>
      <div className="container">
        <div className={styles.content}>
          <header className={styles.header}>
            <h1 className={styles.title}>Términos y Condiciones</h1>
          </header>

          <nav className={styles.tableOfContents}>
            <h2>Índice de contenidos</h2>
            <ul>
              <li><a href="#datos-identificativos">Datos identificativos del titular</a></li>
              <li><a href="#usuario">El usuario</a></li>
              <li><a href="#aplicabilidad">Aplicabilidad de las condiciones generales</a></li>
              <li><a href="#objeto">Objeto</a></li>
              <li><a href="#condiciones-acceso">Condiciones de acceso y compra</a></li>
              <li><a href="#precios">Precios</a></li>
              <li><a href="#pagos">Pagos</a></li>
              <li><a href="#metodos-pago">Métodos de pago</a></li>
              <li><a href="#derecho-desistimiento">Derecho de desistimiento</a></li>
              <li><a href="#atencion-usuario">Servicio de atención al usuario</a></li>
              <li><a href="#garantias">Garantías</a></li>
              <li><a href="#correccion-errores">Medios técnicos para corregir errores</a></li>
              <li><a href="#proteccion-datos">Protección de datos personales</a></li>
              <li><a href="#idioma">Idioma del contrato</a></li>
              <li><a href="#legislacion">Legislación aplicable</a></li>
            </ul>
          </nav>

          <section className={styles.section} id="datos-identificativos">
            <h2>1. Datos identificativos del titular</h2>
            <p>
              La titularidad de senyorial.es, en adelante este Sitio Web, la ostenta SA SIVINA DES BABOT 1996 S.L.U con CIF: B70792858 (en adelante Senyorial).
            </p>
            <p>
              Este documento (así como todo otro documentos que aquí se mencionen) regula las condiciones por las que se rige el uso del sitio web senyorial.es y la compra o adquisición de servicios en el mismo. A efectos de estas Condiciones se entiende que la actividad que desarrolla a través del Sitio Web comprende la realización de los siguientes servicios:
            </p>
            <ul>
              <li>Servicios de limpieza</li>
              <li>Productos de limpieza</li>
            </ul>
            <p>
              Además de leer las presentes Condiciones, antes de acceder, navegar y/o usar esta página web, el usuario ha de haber leído el Aviso Legal y las Condiciones Generales de Uso, incluyendo, la política de cookies, y la política de privacidad y de protección de datos.
            </p>
            <p>
              Al utilizar este Sitio Web o al hacer y/o solicitar la adquisición de un servicio a través del mismo el Usuario acepta quedar vinculado por estas Condiciones y por todo lo anteriormente mencionado, por lo que si no está de acuerdo con todo ello, no debe usar este Sitio Web.
            </p>
            <p>
              Asimismo, se informa que estas Condiciones podrían ser modificadas. El Usuario es responsable de consultarlas cada vez que acceda, navegue y/o use el Sitio Web ya que serán aplicables aquellas que se encuentren vigentes en el momento en que se solicite la adquisición de los productos o servicios.
            </p>
            <p>
              Para todas las preguntas que el Usuario pueda tener en relación con las Condiciones puede ponerse en contacto con el titular utilizando los datos de contacto facilitados más arriba o utilizando el formulario de contacto.
            </p>
          </section>

          <section className={styles.section} id="usuario">
            <h2>2. El usuario</h2>
            <p>
              El acceso, la navegación y uso del Sitio Web, confiere la condición de usuario, por lo que se aceptan, desde que se inicia la navegación por el Sitio Web, todas las Condiciones aquí establecidas, así como sus ulteriores modificaciones, sin perjuicio de la aplicación de la correspondiente normativa legal de obligado cumplimiento según el caso.
            </p>
            <p>El Usuario asume su responsabilidad de un uso correcto del Sitio Web. Esta responsabilidad se extenderá a:</p>
            <ul>
              <li>Hacer uso de este Sitio Web únicamente para realizar consultas y compras o adquisiciones legalmente válidas.</li>
              <li>No realizar ninguna compra falsa o fraudulenta.</li>
              <li>Facilitar datos de contacto veraces y lícitos, entre ellos: Nombre, DNI/NIF, dirección residencia, dirección fiscal, dirección de correo electrónico, teléfono código postal y/u otros datos.</li>
            </ul>
            <p>
              El Usuario declara ser mayor de 18 años y tener capacidad legal para celebrar contratos a través de este Sitio Web.
            </p>
            <p>
              El Sitio Web está dirigido principalmente a Usuarios residentes en España. Senyorial no asegura que el Sitio Web cumpla con legislaciones de otros países, ya sea total o parcialmente.
            </p>
          </section>

          <section className={styles.section} id="aplicabilidad">
            <h2>3. Aplicabilidad de las condiciones generales</h2>
            <p>
              Estas condiciones se aplican a todas las cotizaciones, ofertas, actividades, acuerdos y entregas de servicios por o en nombre de Senyorial.
            </p>
            <p>
              El acuerdo siempre contiene obligaciones de esfuerzo para el proveedor de servicios, sin obligaciones de resultado.
            </p>
          </section>

          <section className={styles.section} id="objeto">
            <h2>4. Objeto</h2>
            <p>
              Las presentes condiciones tienen por objeto regular los términos contractuales para la prestación de los Servicios y la contraprestación debida por el usuario a Senyorial, así como la utilización del Servicio por éste. La prestación de los Servicios se llevará a cabo mediante la obtención, disposición, organización, empleo y gestión por parte de Senyorial de los recursos técnicos, humanos y operativos necesarios al efecto y, siempre y en todo caso, como contraprestación a los precios vigentes en cada momento.
            </p>
            <p>
              Las condiciones comerciales de este servicio y las ofertas que eventualmente puedan llevarse a cabo por Senyorial siempre aparecen en la página senyorial.es, por lo que pueden ser consultadas, archivadas o impresas.
            </p>
            <p>Senyorial proporciona a los usuarios diversos servicios de:</p>
            <ul>
              <li>Servicios y productos de limpieza.</li>
            </ul>
            <p>
              El contenido y el alcance de los servicios se rigen por los acuerdos contractuales respectivos, además, exclusivamente de acuerdo con las funcionalidades del servicio descrito en la celebración del contrato en senyorial.es.
            </p>
          </section>

          <section className={styles.section} id="condiciones-acceso">
            <h2>5. Condiciones de acceso y compra</h2>
            <p>
              El acceso al Portal de Senyorial es libre y atribuye a quien lo realiza la condición de Usuario, independientemente del posterior uso de los servicios ofrecidos.
            </p>
            <p>
              El Usuario deberá registrarse con el objeto de comprar en nuestra tienda debiendo proceder a la cumplimentación de un formulario, lo que puede comportar asignar unas credenciales personales compuestas por un identificador único (que será la dirección de correo electrónico), cuya conservación y custodia dependerá exclusivamente del Usuario, quien deberá operar con ellas con la diligencia debida. Por lo tanto, no utilizará otras claves que no sean las suyas, con el objeto de suplantar a otros Usuarios en la utilización de senyorial.es.
            </p>
            <p>
              La adquisición de los servicios en senyorial.es sólo podrá hacerse por usuarios mayores de dieciocho (18) años, que deberán seguir los pasos e instrucciones que acompañarán todo el proceso de compra, consistentes, a modo meramente enunciativo:
            </p>
            <ol>
              <li>Cumplimentación del formulario de alta o el de identificación de usuarios previamente registrados;</li>
              <li>Visualización en pantalla del resumen del pedido, condiciones de entrega y gastos;</li>
              <li>Aceptación de los Términos y Condiciones, lo cual supone la lectura, comprensión y aceptación irrevocable de todas y cada una de las presentes Condiciones Generales.</li>
            </ol>
          </section>

          <section className={styles.section} id="precios">
            <h2>6. Precios</h2>
            <p>
              Algunos precios indicados en las ofertas publicadas en la web excluyen IVA, así como lo indica la oferta. Este impuesto será incluido siempre en presupuestos, pre-confirmaciones, confirmaciones y facturas que incluyen los impuestos que legalmente corresponden, salvo pacto en contrario.
            </p>
            <p>
              Por lo que se refiere a los precios de la prestación de servicios, las partes podrán acordar un precio fijo cuando se celebre el acuerdo.
            </p>
            <p>
              Si no se ha acordado un precio fijo, la tarifa en relación con el servicio puede determinarse en función de las horas realmente empleadas. La tarifa se calculará de acuerdo con las tarifas horarias habituales de Senyorial, aplicables durante el período en que realice el trabajo, a menos que se haya acordado una tarifa horaria diferente.
            </p>
            <p>
              Si no se acuerda ninguna tarifa en función de las horas realmente empleadas, se acordará un precio orientativo para el servicio, en virtud del cual Senyorial tendrá derecho a desviarse de éste hasta un 50%. Si el precio objetivo es superior en más de un 50%, el prestador de servicios debe informar al usuario a su debido tiempo por qué se justifica un precio más alto. En ese caso, el usuario tendrá derecho a cancelar una parte del pedido que supere el precio recomendado más un 50%.
            </p>
            <p>Los precios podrán ser revisados por Senyorial en cualquier momento.</p>
          </section>

          <section className={styles.section} id="pagos">
            <h2>7. Pagos</h2>

            <h3>7.1 Términos y Condiciones de Pago para Confirmaciones:</h3>

            <h4>Confirmación:</h4>
            <p>
              Para Confirmar una reserva, el cliente deberá abonar un adelanto de al menos el 50% o el costo total (impuestos incluidos) del servicio contratado.
            </p>
            <p>
              Este adelanto se considera un depósito para asegurar la disponibilidad del servicio y confirmar la reserva.
            </p>

            <h4>Obligación de Pago Total:</h4>
            <p>
              El cliente reconoce y acepta que, de acuerdo con lo establecido en el artículo 1.124 del Código Civil español, el pago total acordado por el servicio ofrecido deberá ser efectuado en su totalidad antes o en el momento de la prestación del servicio. En caso de existir deudas pendientes con la empresa, esta se reserva el derecho a no prestar servicios adicionales hasta que se regularicen dichas deudas. Esta disposición se fundamenta en el principio de buena fe y cumplimiento de las obligaciones contractuales, según lo dispuesto en el artículo 1258 del Código Civil español.
            </p>
            <p>
              El cliente comprende que el pago del adelanto del 50% no exime de la obligación de abonar el total del servicio, de conformidad con el artículo 1.101 del Código Civil español.
            </p>

            <h4>Ausencia del Servicio:</h4>
            <p>
              En caso de que el cliente no requiera el servicio confirmado y no cancele la reserva dentro de un plazo de 72 horas antes del inicio del mismo, se entenderá que renuncia al mismo y el adelanto del 50% no será reembolsable, conforme a lo establecido en el artículo 1.261 del Código Civil español.
            </p>
            <p>
              La empresa se reserva el derecho de retener el adelanto del 50% como compensación por la pérdida de oportunidad de prestar el servicio y los costos operativos y organizativos asociados a la reserva.
            </p>
            <p>
              La empresa se reserva el derecho a no prestación y/o reembolso del importe adelantado por motivos técnicos, productivos, organizativos y/o económicos que imposibiliten la ejecución del contrato.
            </p>

            <h4>Cancelaciones y Reembolsos:</h4>
            <p>
              Cualquier cancelación de la reserva deberá ser notificada con al menos 72 horas de antelación para ser elegible para un reembolso del adelanto del 50% o el costo total.
            </p>
            <p>
              En caso de cancelación dentro del plazo establecido, se procederá a reembolsar el adelanto o el costo total de acuerdo con las disposiciones legales aplicables y los términos y condiciones de la empresa.
            </p>

            <h3>7.2 Términos y Condiciones de Pago para Facturas:</h3>
            <p>
              Las facturas deben pagarse dentro de los 3 días siguientes a la emisión de la factura, a menos que las partes hayan acordado lo contrario o que en la factura se indique otra forma de pago. En caso de devolución, demora o impago de los recibos, Senyorial podrá suspender total o parcialmente los Servicios o impedir la contratación de nuevos Servicios.
            </p>
            <p>
              Si transcurridos 30 días desde la emisión de las facturas el usuario no manifestara, por cualquier medio que acredite su recepción, su disconformidad con el contenido de la misma, se entenderá que dichas facturas son correctas, no aceptando Senyorial ninguna reclamación transcurrido dicho período.
            </p>
            <p>
              El usuario da su consentimiento expreso para que Senyorial ponga a su disposición, por medios electrónicos y vía telemática, las facturas.
            </p>
            <p>
              Además, el retraso en el pago por un período superior a 1 mes o la suspensión temporal de servicios en dos ocasiones por mora en el pago, darán derecho a Senyorial a la interrupción definitiva de los servicios y la correspondiente resolución del contrato, previa notificación con 15 días de antelación, pudiendo solicitar, en su caso, la indemnización por cancelación anticipada de estas Condiciones Generales y el abono de los daños y perjuicios que se pudieran ocasionar como consecuencia de su incumplimiento.
            </p>
            <p>
              Toda factura vencida y pendiente de pago podrá devengar, desde la fecha en que debió ser abonada, interés de demora al tipo legal de referencia más 2 puntos porcentuales.
            </p>

            <h3>7.3 Utilización Métodos de Pago:</h3>
            <p>
              Al utilizar cualquier método de pago y/o proporcionar detalles de pago para realizar compras en Senyorial, usted declara y garantiza que: (a) está legalmente autorizado para proporcionar dicha información; (b) está legalmente autorizado o tiene permiso para realizar pagos utilizando el (los) método (s) de pago; (c) si usted es un empleado o agente de una empresa o persona propietaria del método de pago, está autorizado por esa empresa o persona a utilizar el método de pago para realizar pagos en SENYORIAL; y (d) tales acciones no violan ninguna ley aplicable.
            </p>
          </section>

          <section className={styles.section} id="metodos-pago">
            <h2>8. Métodos de pago</h2>
            <p>Los medios de pago aceptados son:</p>
            <ul>
              <li>Transferencia bancaria</li>
              <li>Pago con tarjeta de crédito o débito. Nos reservamos el derecho de NO aceptar ciertos pagos con determinadas tarjetas de crédito.</li>
              <li>Pago mediante Efectivo el día de la reserva.</li>
            </ul>
          </section>

          <section className={styles.section} id="derecho-desistimiento">
            <h2>9. Derecho de desistimiento</h2>
            <p>
              El usuario podrá ejercer el derecho de desistimiento del presente Contrato sin necesidad de justificación ni penalización, tan solo en los casos en los que se cumplan todos y cada uno de los siguientes requisitos:
            </p>
            <ul>
              <li>que el usuario tenga la consideración de consumidor o usuario tal y como define la legislación vigente en materia de Defensa de Consumidores y Usuarios;</li>
              <li>que los servicios no hayan sido completamente ejecutados; y</li>
              <li>que este derecho sea ejercido por el usuario durante el periodo de desistimiento, que se corresponde con un plazo de 14 días naturales desde la fecha de celebración del contrato.</li>
            </ul>
            <p>
              A tal efecto, se considera consumidor o usuario la persona física que actúen con un propósito ajeno a su actividad comercial, empresarial, oficio o profesión.
            </p>
            <p>
              El usuario no tendrá derecho de desistimiento en aquellos supuestos en los que no pueda ser catalogado como consumidor. Tampoco será aplicable, atendiendo a las excepciones recogidas en la legislación vigente, como son:
            </p>
            <ul>
              <li>servicios que hayan sido completamente ejecutados;</li>
              <li>se trate de servicios personalizados en base a las especificaciones del usuario;</li>
              <li>servicios de suministro de contenido digital;</li>
              <li>servicios de alojamiento para fines distintos del de servir de vivienda, transporte de bienes, alquiler de vehículos, comida o servicios relacionados con actividades de esparcimiento, si los contratos prevén una fecha o un periodo de ejecución específicos.</li>
            </ul>
          </section>

          <section className={styles.section} id="atencion-usuario">
            <h2>10. Servicio de atención al usuario</h2>
            <p>
              Senyorial dispone de un servicio de atención al usuario para que el usuario pueda gestionar sus reclamaciones, dudas o pueda solicitar garantías y ejecutar el derecho de desistimiento.
            </p>
            <p>
              El usuario puede dirigir sus quejas, reclamaciones o solicitudes de información al Servicio de Atención al Cliente de senyorial, utilizando para ello cualquiera de las siguientes vías:
            </p>
            <ul>
              <li>Enviando un escrito al Servicio de Atención al Cliente de senyorial, en reservas@senyorial.es</li>
              <li>Rellenando el formulario disponible en el apartado «Contacto»</li>
            </ul>
            <p>
              Todas las dudas y especialmente las quejas y sugerencias serán atendidas a la mayor rapidez, sin sobrepasar en ningún caso los plazos que establezca la legislación vigente.
            </p>
            <p>
              Asimismo, tendrá constancia de las mismas mediante la entrega de un justificante por escrito, en papel o en cualquier otro soporte duradero.
            </p>
          </section>

          <section className={styles.section} id="garantias">
            <h2>11. Aplicación de garantías adicionales</h2>
            <p>
              Las garantías de limpieza ofrecidas por la empresa son de carácter voluntario y se aplican únicamente en los servicios de Limpieza Profunda o Limpieza Final de obra y solamente podrán ser aplicadas si el cliente las solicita expresamente, proporcionando documentación fotográfica que evidencie imperfecciones en las inclusiones del servicio. Estas condiciones se establecen de acuerdo con el principio de libertad de contratación consagrado en el artículo 1255 del Código Civil español, que permite a las partes establecer las condiciones del contrato de manera voluntaria y consensuada.
            </p>
            <p>
              Además, la solicitud expresa del cliente y la presentación de documentación fotográfica se consideran requisitos indispensables para la aplicación de las garantías, de conformidad con el artículo 1.258 del Código Civil, que establece la necesidad de probar el incumplimiento de las obligaciones contractuales para exigir su cumplimiento.
            </p>
            <p>
              La garantía adicional se compone de un repaso adicional realizado por un operario de la empresa durante un máximo de 5 horas. Este repaso tiene como objetivo abordar y corregir imperfecciones evidenciadas fotográficamente por el cliente. Es decir, cualquier defecto o área que no haya cumplido con los estándares acordados durante la prestación del servicio de Limpieza Profunda o Limpieza Final de obra será atendido durante este repaso adicional.
            </p>
            <p>
              Esta medida busca asegurar la plena satisfacción del cliente y garantizar la calidad del servicio prestado. El operario asignado llevará a cabo las acciones necesarias para corregir las imperfecciones identificadas, asegurando así que el resultado final cumpla con las expectativas del cliente y los estándares de calidad establecidos por la empresa.
            </p>
            <p>
              Es importante destacar que este repaso adicional se llevará a cabo únicamente previa solicitud expresa del cliente y tras la presentación de la documentación fotográfica que evidencie las imperfecciones. Este proceso se realizará de manera coordinada con el cliente para garantizar la efectividad y eficiencia en la corrección de las áreas afectadas.
            </p>
            <p>
              La empresa se compromete a ofrecer una fecha según su disponibilidad para la prestación del servicio en un plazo máximo de 30 días a partir de las aportaciones de las evidencias fotográficas de las imperfecciones y la adjunta solicitud. Sin embargo, si el cliente desestima la cita acordada sin período de previo aviso de 72 horas, la empresa se reserva el derecho de no ofrecer más citas gratuitas.
            </p>
            <p>
              Es importante destacar que estas garantías solo serán aplicables si se ha realizado el pago total del servicio, conforme a lo dispuesto en el artículo 1.101 del Código Civil, que establece la obligación de cumplir con las prestaciones una vez que se ha efectuado el pago total correspondiente. De esta manera, se garantiza la transparencia y el cumplimiento los Términos y Condiciones.
            </p>
          </section>

          <section className={styles.section} id="correccion-errores">
            <h2>12. Medios técnicos para corregir errores</h2>
            <p>
              Se pone en conocimiento del Usuario que en caso de que detecte que se ha producido un error al introducir datos necesarios para procesar su solicitud de compra en el Sitio Web, podrá modificar los mismos poniéndose en contacto con Senyorial utilizando los datos de contacto facilitados en la cláusula primera (Información general) y/o a través de aquellos habilitados para contactar con el servicio de atención al cliente. Asimismo, estas informaciones también podrían subsanarse por el Usuario a través de su espacio personal de conexión al Sitio Web.
            </p>
            <p>
              En cualquier caso, el Usuario, tiene acceso al espacio, carrito, o cesta donde se van anotando sus solicitudes de compra y puede hacer modificaciones.
            </p>
            <p>
              De igual forma, se remite al Usuario a consultar el Aviso Legal y Condiciones Generales de Uso para recabar más información sobre cómo ejercer su derecho de rectificación según lo establecido en la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales.
            </p>
          </section>

          <section className={styles.section} id="proteccion-datos">
            <h2>13. Protección de datos personales</h2>
            <p>
              Senyorial es el Responsable del tratamiento de los datos personales del usuario y le informa que estos datos serán tratados de conformidad con lo dispuesto en la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPD) y el Reglamento (UE) 2016/679 de 27 de abril de 2016 (RGPD) relativo a la protección de las personas físicas en lo que respecta al tratamiento de datos personales y a la libre circulación de estos datos, por lo que se le facilita la siguiente información del tratamiento:
            </p>

            <h3>Fin del tratamiento: Relación Contractual</h3>
            <p>Mantener una relación comercial con el usuario.</p>

            <h3>Datos recogidos:</h3>
            <p>Nombre, Email, Teléfono, DNI/NIF/CIF, Direcciones, Cuentas Bancarias, Tarjetas de crédito/débito</p>
            <p>Los datos personales recogidos en este sitio son los siguientes:</p>
            <ul>
              <li><strong>Apertura de la cuenta:</strong> al crear la cuenta del usuario, su nombre, apellidos, número de teléfono, dirección postal.</li>
              <li><strong>Login:</strong> cuando el usuario se conecta a la página web, registra, en particular, su apellido, nombre, datos de acceso, datos de uso, ubicación y datos de pago.</li>
              <li><strong>Perfil:</strong> la utilización de los servicios prestados en el sitio web permite introducir un perfil, que puede incluir una dirección y un número de teléfono.</li>
              <li><strong>Pago:</strong> como parte del pago de los servicios ofrecidos en el sitio web, se registran los datos financieros relativos a la cuenta bancaria o tarjeta de crédito del usuario.</li>
              <li><strong>Comunicación:</strong> cuando el sitio web se utiliza para comunicarse con otros miembros, los datos relativos a las comunicaciones del usuario se almacenan temporalmente.</li>
              <li><strong>Cookies:</strong> Las cookies se utilizan cuando se utiliza el sitio. El usuario tiene la posibilidad de desactivar las cookies desde la configuración de su navegador.</li>
            </ul>

            <h3>Uso de los datos personales</h3>
            <p>
              La finalidad de los datos personales recogidos de los usuarios es poner a su disposición los servicios del sitio web, mejorarlos y mantener un entorno seguro. Más específicamente, los usos son los siguientes:
            </p>
            <ul>
              <li>acceso y uso del sitio web por parte del usuario;</li>
              <li>gestión del funcionamiento y optimización de la página web;</li>
              <li>organización de las condiciones de uso de los Servicios de Pago;</li>
              <li>verificación, identificación y autenticación de los datos transmitidos por el usuario;</li>
              <li>propuesta al usuario de la posibilidad de comunicarse con otros usuarios del sitio web;</li>
              <li>implementación de la asistencia al usuario;</li>
              <li>personalización de los servicios mediante la visualización de anuncios en función del historial de navegación del usuario, según sus preferencias;</li>
              <li>prevención y detección de fraudes, gestión de malware (software malicioso) y de incidentes de seguridad;</li>
              <li>gestión de posibles conflictos con los usuario;</li>
              <li>el envío de información comercial y publicitaria.</li>
            </ul>

            <h3>Compartir datos personales con terceros</h3>
            <p>Los datos personales pueden ser compartidos con terceros en los siguientes casos:</p>
            <ul>
              <li>cuando el usuario utiliza los servicios de pago, para la implementación de estos servicios, el sitio web está en contacto con terceras entidades bancarias y financieras con las que ha celebrado contratos;</li>
              <li>cuando el usuario publica información de acceso público en las áreas de comentarios gratuitos del sitio web;</li>
              <li>cuando el usuario autoriza al sitio web de un tercero a acceder a sus datos;</li>
              <li>cuando el sitio web utilice los servicios de los proveedores de servicios para proporcionar servicios de apoyo al usuario, publicidad y pago. Estos proveedores de servicios tienen un acceso limitado a los datos del usuario, en el contexto de la prestación de estos servicios, y tienen la obligación contractual de utilizarlos de conformidad con las disposiciones de la normativa aplicable sobre protección de datos personales;</li>
              <li>si así lo exige la ley, el sitio web puede transmitir datos para presentar reclamaciones contra el sitio web y cumplir con los procedimientos administrativos y judiciales;</li>
            </ul>

            <h3>Seguridad y confidencialidad</h3>
            <p>
              El sitio web aplica medidas organizativas, técnicas, de software y físicas en materia de seguridad digital para proteger los datos personales contra la alteración, destrucción y acceso no autorizados. Sin embargo, cabe señalar que Internet no es un entorno completamente seguro y que el sitio web no puede garantizar la seguridad de la transmisión o el almacenamiento de la información en Internet.
            </p>

            <h3>Implementación de los derechos de los usuarios</h3>
            <p>
              De acuerdo con la normativa aplicable a los datos de carácter personal, los usuarios tienen los siguientes derechos, que pueden ejercitar dirigiendo su solicitud a la siguiente dirección o al correo electrónico info@senyorial.com.
            </p>
            <ul>
              <li>Derecho a retirar el consentimiento en cualquier momento.</li>
              <li>Derecho de acceso, rectificación, portabilidad y supresión de sus datos y a la limitación u oposición a su tratamiento.</li>
              <li>Derecho a presentar una reclamación ante la autoridad de control (agpd.es) si considera que el tratamiento no se ajusta a la normativa vigente.</li>
            </ul>
          </section>

          <section className={styles.section} id="idioma">
            <h2>14. Idioma del contrato</h2>
            <p>
              Estas condiciones generales de venta están redactadas en castellano. En caso de que se traduzcan a una o varias lenguas extranjeras, prevalecerá el texto en castellano en caso de litigio.
            </p>
          </section>

          <section className={styles.section} id="legislacion">
            <h2>15. Legislación aplicable</h2>
            <p>
              Estas Condiciones Generales se rigen por la ley española. Las partes se someten, a su elección, para la resolución de los conflictos y con renuncia a cualquier otro fuero, a los juzgados y tribunales del domicilio del usuario.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}