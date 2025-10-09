import type { Metadata } from 'next';
import styles from './PoliticaCookies.module.css';

export const metadata: Metadata = {
  title: 'Política de Cookies | Senyorial - Empresa de Limpieza',
  description: 'Política de cookies de Senyorial. Información sobre el uso de cookies en nuestro sitio web y cómo gestionarlas.',
  robots: 'index, follow',
};

export default function PoliticaCookiesPage() {
  return (
    <div className={styles.container}>
      <div className="container">
        <div className={styles.content}>
          <header className={styles.header}>
            <h1 className={styles.title}>Política de Cookies</h1>
          </header>

          <nav className={styles.tableOfContents}>
            <h2>Índice de contenidos</h2>
            <ul>
              <li><a href="#uso-cookies">Uso de cookies</a></li>
              <li><a href="#consentimiento">Consentimiento</a></li>
              <li><a href="#tipos-finalidad">Tipos y finalidad de las cookies</a></li>
              <li><a href="#bloquear-eliminar">Cómo bloquear o eliminar las cookies instaladas</a></li>
              <li><a href="#modificaciones">Modificaciones</a></li>
            </ul>
          </nav>

          <section className={styles.section} id="uso-cookies">
            <h2>1. Uso de cookies</h2>
            <p>La página web senyorial.es utiliza cookies.</p>
            <p>
              Las cookies son ficheros que se descargan en su ordenador al acceder a determinadas páginas web. Las cookies permiten a una página web, entre otras cosas, almacenar y recuperar información sobre los hábitos de navegación de un usuario o de su equipo y, dependiendo de la información que contengan y de la forma en que utilice su equipo.
            </p>
            <p>
              Además, mejoran su proceso de navegación, ya que permiten que la página web ofrezca al usuario información que puede ser de su interés en función del uso que realice, del contenido de la misma.
            </p>
            <p>
              En caso de no querer recibir cookies, por favor configure su navegador de Internet, para que las borre del disco duro de su ordenador, las bloquee o le avise en caso de instalación de las mismas. Para continuar sin cambios en la configuración de las cookies, simplemente, continúe en la página web.
            </p>
          </section>

          <section className={styles.section} id="consentimiento">
            <h2>2. Consentimiento</h2>
            <p>
              Las cookies que utilizamos no almacenan dato personal alguno, ni ningún tipo de información que pueda identificarle, salvo que quiera registrarse, de forma voluntaria con el fin de utilizar los servicios que ponemos a su disposición o de recibir información sobre promociones y contenidos de su interés.
            </p>
            <p>
              Al navegar por primera vez por la página web aparecerá un banner explicativo del uso de las cookies. Al continuar en senyorial.es nos indica que está consintiendo el uso de las cookies antes enunciadas, y en las condiciones contenidas en la presente política de cookies. Este consentimiento es válido por un periodo de 13 meses. En caso de no estar de acuerdo envíe un correo electrónico a <a href="mailto:reservas@senyorial.es">reservas@senyorial.es</a>
            </p>
          </section>

          <section className={styles.section} id="tipos-finalidad">
            <h2>3. Tipos y finalidad de las cookies</h2>
            <p>Las Cookies, en función de su permanencia, pueden clasificarse en:</p>
            <ul>
              <li><strong>Cookies de sesión:</strong> expiran cuando el usuario cierra el navegador.</li>
              <li><strong>Cookies persistentes:</strong> expiran en función cuando se cumpla el objetivo para el que sirven (por ejemplo, para que el usuario se mantenga identificado en la página web y en los servicios de la misma o bien cuando se borran manualmente).</li>
            </ul>

            <p>Las cookies en función de su objetivo pueden clasificarse de la siguiente forma:</p>

            <h3>Cookies de rendimiento (técnicas y de personalización)</h3>
            <p>
              Este tipo de cookie recuerda sus preferencias para las herramientas que se encuentran en los servicios, por lo que no tiene que volver a configurar el servicio cada vez que usted visita. A modo de ejemplo, en esta tipología se incluyen: ajustes de volumen de reproductores de vídeo o sonido y las velocidades de transmisión de vídeo que sean compatibles con su navegador.
            </p>

            <h3>Cookies de geo-localización</h3>
            <p>
              Estas Cookies son utilizadas para averiguar en qué país se encuentra cuando se solicita un servicio. Esta Cookie es totalmente anónima, y sólo se utiliza para ayudar a orientar el contenido a su ubicación.
            </p>

            <h3>Cookies de registro (técnicas y de personalización)</h3>
            <p>
              Las Cookies de registro se generan una vez que el usuario se ha registrado o posteriormente ha abierto su sesión, y se utilizan para identificarle en los servicios con los siguientes objetivos:
            </p>
            <ul>
              <li>
                Mantener al Usuario identificado de forma que, si cierra un servicio, el navegador o el ordenador y en otro momento u otro día vuelve a entrar en dicho servicio, seguirá identificado, facilitando así su navegación sin tener que volver a identificarse. Esta funcionalidad se puede suprimir si el usuario pulsa la funcionalidad &quot;cerrar sesión&quot;, de forma que esta Cookie se elimina y la próxima vez que entre en el servicio el usuario tendrá que iniciar sesión para estar identificado.
              </li>
              <li>
                Comprobar si el usuario está autorizado para acceder a ciertos servicios, por ejemplo, para participar en un concurso.
              </li>
            </ul>

            <h3>Cookies de analíticas</h3>
            <p>
              Cada vez que un Usuario visita un servicio o información de la página web o una herramienta de un proveedor externo (Google Analytics, Comscore y similares que podrán añadirse a este listado en caso de que varíen en relación con los actuales) genera una cookie analítica en el ordenador del usuario. Esta cookie que sólo se genera en la visita, servirá en próximas visitas a los servicios de la página web para identificar de forma anónima al visitante. Los objetivos principales que se persiguen son:
            </p>
            <ul>
              <li>
                Permitir la identificación anónima de los usuarios navegantes a través de la cookie (identifica navegadores y dispositivos, no personas) y por lo tanto la contabilización aproximada del número de visitantes y su tendencia en el tiempo.
              </li>
              <li>
                Identificar de forma anónima los contenidos más visitados y por lo tanto más atractivos para los usuarios.
              </li>
              <li>
                Saber si el usuario que está accediendo es nuevo o repite visita. Importante: Salvo que el usuario decida registrarse en algún servicio o contenido de la página web, la cookie nunca irá asociada a ningún dato de carácter personal que pueda identificarle. Dichas Cookies sólo serán utilizadas con propósitos estadísticos que ayuden a la optimización de la experiencia de los usuarios en la página web.
              </li>
            </ul>

            <h3>Cookies publicitarias propias</h3>
            <p>
              Sirven para gestionar el titular de la página web si un Usuario ha visitado o no la publicidad que ha incluido. También permiten la gestión de espacios publicitarios en la página almacenando datos del comportamiento del Usuario en la navegación para poder ofrecerle anuncios publicitarios.
            </p>
          </section>

          <section className={styles.section} id="bloquear-eliminar">
            <h2>4. Cómo bloquear o eliminar las cookies instaladas</h2>
            <p>
              Puede usted permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la configuración de las opciones de su navegador. Puede encontrar información sobre cómo hacerlo, en relación con los navegadores más comunes, en los links que se incluyen a continuación:
            </p>
            <ul>
              <li><strong>Explorer:</strong> <a href="https://support.microsoft.com/es-es/kb/278835" target="_blank" rel="noopener noreferrer">https://support.microsoft.com/es-es/kb/278835</a></li>
              <li><strong>Chrome:</strong> <a href="http://support.google.com/chrome/bin/answer.py?hl=es&answer=95647" target="_blank" rel="noopener noreferrer">http://support.google.com/chrome/bin/answer.py?hl=es&answer=95647</a></li>
              <li><strong>Firefox:</strong> <a href="https://support.mozilla.org/es/kb/Borrar%20cookies" target="_blank" rel="noopener noreferrer">https://support.mozilla.org/es/kb/Borrar%20cookies</a></li>
              <li><strong>Safari:</strong> <a href="http://support.apple.com/kb/ph5042" target="_blank" rel="noopener noreferrer">http://support.apple.com/kb/ph5042</a></li>
            </ul>
            <p>
              Le informamos, no obstante, de la posibilidad de que la desactivación de alguna cookie impida o dificulte la navegación o la prestación de los servicios ofrecidos en la página web.
            </p>
          </section>

          <section className={styles.section} id="modificaciones">
            <h2>5. Modificaciones</h2>
            <p>
              La página web senyorial.es titularidad de SA SIVINA DES BABOT 1996 S.L.U, B70792858 con domicilio social en C/RICARD ROCA 4, T37 07008 (ILLES BALEARS), puede modificar esta política de cookies en función de exigencias legales, o con la finalidad de adaptar dicha política a las instrucciones dictadas por la Agencia Española de Protección de Datos.
            </p>
            <p>
              Por esta razón, aconsejamos a los usuarios que la visiten periódicamente. Cuando se produzcan cambios significativos en esta política de cookies, se comunicarán a los usuarios bien mediante la web o a través de correo electrónico a los usuarios registrados.
            </p>
            <p>
              Esta política de cookies fue actualizada el día 20 de septiembre de 2021 para adaptarse al Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016 relativo a la protección de las personas físicas en lo que respecta al tratamiento de datos personales y a la libre circulación de estos datos (RGPD).
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}