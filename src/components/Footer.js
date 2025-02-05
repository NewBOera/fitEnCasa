import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export class Footer extends LitElement {
  static properties = {
    isPrivacyModalOpen: { type: Boolean },
    isTermsModalOpen: { type: Boolean },
  };

  constructor() {
    super();
    this.isPrivacyModalOpen = false;
    this.isTermsModalOpen = false;
  }

  createRenderRoot() {
    return this;
  }

  togglePrivacyModal() {
    this.isPrivacyModalOpen = !this.isPrivacyModalOpen;
    if (this.isPrivacyModalOpen) this.isTermsModalOpen = false;
  }

  toggleTermsModal() {
    this.isTermsModalOpen = !this.isTermsModalOpen;
    if (this.isTermsModalOpen) this.isPrivacyModalOpen = false;
  }

  renderPrivacyModal() {
    if (!this.isPrivacyModalOpen) return null;

    return html`
      <div class="fixed inset-0 z-50 flex justify-center items-center px-4 bg-black/60">
        <div class="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <!-- Modal header -->
          <div class="flex justify-between items-center p-6 border-b bg-primary-400">
            <h2 class="text-2xl font-bold text-white">Política de Privacidad</h2>
            <button @click=${this.togglePrivacyModal} class="text-white hover:text-gray-200 focus:outline-none">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <!-- Modal content -->
          <div class="p-6 text-gray-700">
            <p class="mb-6">
              En FitEnCasa, estamos comprometidos a proteger tu privacidad y garantizar que tu información personal se maneje de manera segura y responsable. Esta Política de Privacidad describe cómo
              recopilamos, usamos y protegemos tus datos cuando visitas nuestro sitio web o utilizas nuestros servicios. Al acceder o utilizar nuestro sitio web, aceptas la recopilación y el uso de
              tus datos personales tal como se describe en esta política.
            </p>

            <h3 class="font-semibold mb-4 text-xl text-primary-400">1. Información que Recopilamos</h3>

            <p class="mb-6">
              Recopilamos información personal cuando te registras en nuestros servicios, te suscribes a nuestro boletín o interactúas con nosotros en nuestro sitio web. La información que podemos
              recopilar incluye:
            </p>
            <ul class="list-disc pl-6 mb-6">
              <li class="mb-2">Nombre completo</li>
              <li class="mb-2">Dirección de correo electrónico</li>
              <li class="mb-2">Información demográfica (por ejemplo, edad, género, preferencias de fitness)</li>
            </ul>

            <h3 class="font-semibold mb-4 text-xl text-primary-400">2. Cómo Usamos Tu Información</h3>

            <p class="mb-3">La información personal que recopilamos se utiliza para los siguientes fines:</p>
            <ul class="list-disc pl-6 mb-6">
              <li class="mb-2">Procesar tu registro y brindarte acceso a nuestros servicios de fitness en línea.</li>
              <li class="mb-2">Enviarte actualizaciones, noticias y ofertas relacionadas con nuestros servicios, incluyendo horarios de clases, promociones y disponibilidad de entrenadores.</li>
              <li class="mb-2">Responder a tus consultas y ofrecer soporte al cliente.</li>
              <li class="mb-2">Mejorar nuestros servicios en función de tus comentarios y preferencias.</li>
            </ul>

            <h3 class="font-semibold mb-4 text-xl text-primary-400">3. Cómo Protegemos Tu Información</h3>

            <p class="mb-3">
              Tomamos las medidas técnicas y organizativas adecuadas para proteger tus datos personales contra el acceso no autorizado, alteración, divulgación o destrucción. Toda la información
              sensible se transmite a través de protocolos de cifrado seguros.
            </p>
            <p class="mb-6">
              Si bien utilizamos medidas de seguridad estándar de la industria para salvaguardar tus datos personales, ten en cuenta que ningún método de transmisión por internet es completamente
              seguro. Por lo tanto, no podemos garantizar la seguridad absoluta de tus datos.
            </p>

            <h3 class="font-semibold mb-4 text-xl text-primary-400">4. Compartir Tu Información</h3>

            <p class="mb-3">
              No vendemos, intercambiamos ni alquilamos tu información personal a terceros. Sin embargo, podemos compartir tus datos con proveedores de servicios de confianza que nos ayuden a operar
              nuestra plataforma o a ofrecer servicios, como servicios de marketing por correo electrónico o soporte informático.
            </p>
            <p class="mb-6">Nos aseguramos de que estos proveedores de terceros sigan estrictos estándares de protección de datos para mantener tu información segura.</p>

            <h3 class="font-semibold mb-4 text-xl text-primary-400">5. Cookies y Tecnologías de Seguimiento</h3>

            <p class="mb-6">
              Nuestro sitio web puede utilizar cookies para mejorar tu experiencia como usuario. Las cookies son pequeños archivos de texto que se colocan en tu dispositivo para ayudarnos a recordar
              tus preferencias y analizar el tráfico del sitio web. Puedes controlar la configuración de las cookies a través de tu navegador, pero ten en cuenta que algunas funciones de nuestro sitio
              web pueden no funcionar correctamente si las cookies están desactivadas.
            </p>

            <h3 class="font-semibold mb-4 text-xl text-primary-400">6. Tus Derechos y Opciones</h3>
            <p class="mb-3">Tienes el derecho de:</p>
            <ul class="list-disc pl-6 mb-3">
              <li class="mb-2">Acceder a la información personal que tenemos sobre ti.</li>
              <li class="mb-2">Solicitar la corrección de cualquier información inexacta.</li>
              <li class="mb-2">Solicitar la eliminación de tus datos personales, sujeto a obligaciones legales o necesidades comerciales.</li>
              <li class="mb-2">Cancelar la suscripción a correos electrónicos promocionales o boletines en cualquier momento.</li>
            </ul>
            <p class="mb-6">Si deseas ejercer alguno de estos derechos, por favor contáctanos utilizando la información proporcionada a continuación.</p>

            <h3 class="font-semibold mb-4 text-xl text-primary-400">7. Cambios en Esta Política de Privacidad</h3>

            <p class="mb-6">
              Podemos actualizar esta Política de Privacidad de vez en cuando para reflejar cambios en nuestras prácticas o para cumplir con los requisitos legales. Cualquier actualización será
              publicada en esta página, y la fecha de "Última Actualización" se modificará en consecuencia. Te recomendamos revisar esta política periódicamente para estar informado sobre cómo
              protegemos tu información.
            </p>

            <h3 class="font-semibold mb-4 text-xl text-primary-400">8. Contáctanos</h3>
            <p class="mb-3">Si tienes alguna pregunta o inquietud sobre esta Política de Privacidad o sobre cómo manejamos tus datos personales, por favor contáctanos en:</p>
            <strong class="mb-3">FitEnCasa</strong>
            <div class="mb-6 flex">
              Correo electrónico :
              <a href="mailto:info@fitencasa.com" class="font-semibold hover:text-primary-500 transition-colors duration-150 ">info@fitencasa.com</a>
            </div>
            <p class="mb-6">Al utilizar nuestro sitio web y servicios, consientes la recopilación y el uso de tus datos personales tal como se describe en esta Política de Privacidad.</p>
          </div>
          <!-- Modal footer -->
          <div class="flex justify-end p-6 border-t" style="background-color: rgb(249, 250, 251)">
            <button
              @click=${this.togglePrivacyModal}
              class="text-white px-6 py-2 rounded-full focus:outline-none font-semibold transition-all duration-200 hover:scale-105 bg-primary-400 hover:bg-primary-500"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    `;
  }

  renderTermsModal() {
    if (!this.isTermsModalOpen) return null;

    return html`
      <div class="fixed inset-0 z-50 flex justify-center items-center px-4 bg-black/60">
        <div class="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <!-- Modal header -->
          <div class="flex justify-between items-center p-6 border-b bg-primary-400">
            <h2 class="text-2xl font-bold text-white">Términos y Condiciones</h2>
            <button @click=${this.toggleTermsModal} class="text-white hover:text-gray-200 focus:outline-none">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <!-- Modal content -->
          <div class="p-6 text-gray-700">
            <p class="mb-6">
              Estos Términos y Condiciones ("Términos") rigen el uso del sitio web de FitEnCasa y los servicios proporcionados a través de él, incluyendo el acceso a nuestros programas de fitness en
              línea, clases virtuales, entrenamiento personalizado y contenido relacionado. Al acceder o utilizar nuestros servicios, aceptas cumplir con estos Términos y Condiciones. Si no estás de
              acuerdo con alguna parte de estos Términos, te recomendamos que no utilices nuestro sitio web ni nuestros servicios.
            </p>

            <!-- Terms and Conditions Content -->
            <h3 class="font-semibold mb-4 text-xl text-primary-400">1. Aceptación de los Términos</h3>
            <p class="mb-6">
              Al utilizar este sitio web y los servicios ofrecidos por FitEnCasa, aceptas estos Términos y Condiciones en su totalidad. Podemos actualizar estos Términos periódicamente, y cualquier
              cambio se publicará en esta página con la fecha de "Última Actualización" actualizada. Te recomendamos revisar estos Términos regularmente.
            </p>

            <h3 class="font-semibold mb-4 text-xl text-primary-400">2. Uso de la Plataforma</h3>
            <ul class="list-disc pl-6 mb-6">
              <li class="mb-2">
                <span class="font-semibold ">Registro de Cuenta:</span>
                Para acceder a nuestros servicios de fitness en línea cuando un entrenador o grupo esté disponible, deberás crear una cuenta proporcionando información precisa y actualizada. Eres
                responsable de mantener la confidencialidad de las credenciales de tu cuenta, incluido tu nombre de usuario y contraseña.
              </li>
              <li class="mb-2">
                <span class="font-semibold ">Uso personal:</span>
                Los servicios proporcionados son solo para uso personal y no deben compartirse ni distribuirse sin el consentimiento explícito de FitEnCasa.
              </li>
              <li class="mb-2">
                <span class="font-semibold ">Acceso al Contenido:</span>
                Cuando te inscribas en un programa o clase, tendrás acceso al contenido correspondiente durante la duración de tu suscripción o según lo establecido por FitEnCasa.
              </li>
            </ul>

            <h3 class="font-semibold mb-4 text-xl text-primary-400">3. Inscripción y Pago cuando un entrenador o grupo esté disponible</h3>
            <ul class="list-disc pl-6 mb-6">
              <li class="mb-2">
                <span class="font-semibold ">Proceso de Inscripción:</span>
                Para participar en los programas de fitness de FitEnCasa, deberás completar el proceso de inscripción y realizar el pago correspondiente. Los precios de nuestros servicios se muestran
                en el sitio web y pueden cambiar de vez en cuando.
              </li>
              <li class="mb-2">
                <span class="font-semibold ">Métodos de pago:</span>
                Aceptamos varios métodos de pago a través de procesadores de pago de terceros, como tarjetas de crédito/débito y sistemas de pago en línea.
              </li>
              <li class="mb-2">
                <span class="font-semibold ">Política de No Reembolso:</span>
                Los pagos realizados por servicios no son reembolsables una vez que se haya otorgado acceso al contenido. Por favor, revisa tus opciones antes de confirmar tu compra.
              </li>
            </ul>

            <h3 class="font-semibold mb-4 text-xl text-primary-400">4. Propiedad Intelectual</h3>
            <ul class="list-disc pl-6 mb-6">
              <li class="mb-2">
                <span class="font-semibold ">Propiedad:</span>
                Todo el contenido del sitio web de FitEnCasa, incluidos, entre otros, planes de ejercicios, videos, imágenes y contenido escrito, es propiedad de FitEnCasa y está protegido por las
                leyes de propiedad intelectual.
              </li>
              <li class="mb-2">
                <span class="font-semibold ">Uso permitido:</span>
                Se te concede un derecho limitado, no exclusivo e intransferible para acceder al contenido únicamente para uso personal durante el tiempo que estés suscrito a los servicios. No puedes
                distribuir, compartir ni modificar el contenido sin el consentimiento explícito de FitEnCasa.
              </li>
            </ul>

            <h3 class="font-semibold mb-4 text-xl text-primary-400">5. Responsabilidad de la Cuenta y Seguridad</h3>
            <ul class="list-disc pl-6 mb-6">
              <li class="mb-2">
                <span class="font-semibold ">Seguridad de la Cuenta:</span>
                Eres responsable de mantener la confidencialidad de las credenciales de tu cuenta. Si crees que ha habido acceso no autorizado a tu cuenta, debes notificar a FitEnCasa de inmediato.
              </li>
              <li class="mb-2">
                <span class="font-semibold ">Medidas de Seguridad:</span>
                Implementamos medidas de seguridad estándar de la industria para proteger tus datos personales. Sin embargo, ningún sistema en línea puede ser completamente seguro. Al utilizar la
                plataforma, reconoces los riesgos inherentes a las actividades en línea.
              </li>
            </ul>

            <h3 class="font-semibold mb-4 text-xl text-primary-400">6. Privacidad y Protección de Datos</h3>
            <p class="mb-6">
              Tu privacidad es de suma importancia para nosotros. Para obtener más información sobre cómo recopilamos, usamos y protegemos tu información personal, por favor consulta nuestra Política
              de Privacidad.
            </p>

            <h3 class="font-semibold mb-4 text-xl text-primary-400">7. Conducta del Usuario</h3>
            <p class="mb-3">
              <span class="font-semibold ">Actividades Prohibidas:</span>
              Aceptas no participar en actividades que puedan dañar la plataforma de FitEnCasa o a otros usuarios. Estas incluyen, pero no se limitan a:
            </p>
            <ul class="list-disc pl-6 mb-6">
              <li class="mb-2">Interrumpir el funcionamiento del sitio web o los servicios.</li>
              <li class="mb-2">Subir software dañino o virus.</li>
              <li class="mb-2">Acosar, abusar o amenazar a otros usuarios.</li>
            </ul>

            <h3 class="font-semibold mb-4 text-xl text-primary-400">8. Limitación de Responsabilidad</h3>
            <p class="mb-6">
              Responsabilidad de FitEnCasa: FitEnCasa no será responsable de ningún daño indirecto, incidental o consecuente que pueda resultar del uso de nuestros servicios. No garantizamos
              resultados específicos de fitness al utilizar nuestros programas.
            </p>

            <h3 class="font-semibold mb-4 text-xl text-primary-400">9. Enlaces a Terceros</h3>
            <p class="mb-6">
              Nuestro sitio web puede contener enlaces a sitios web de terceros. Estos sitios tienen sus propias políticas de privacidad y términos de uso, y no somos responsables de su contenido ni
              de sus prácticas. Te recomendamos revisar sus políticas de privacidad antes de utilizar sus servicios.
            </p>

            <h3 class="font-semibold mb-4 text-xl text-primary-400">10. Cambios en los Términos y Condiciones</h3>
            <p class="mb-6">
              FitEnCasa se reserva el derecho de modificar o actualizar estos Términos y Condiciones en cualquier momento. Los Términos actualizados se publicarán en esta página, y la fecha de "Última
              Actualización" reflejará los cambios. Te recomendamos revisar esta página regularmente para mantenerte informado sobre cualquier actualización.
            </p>

            <h3 class="font-semibold mb-4 text-xl text-primary-400">11. Ley Aplicable</h3>
            <p class="mb-6">
              Estos Términos y Condiciones se regirán por las leyes de la jurisdicción en la que FitEnCasa esté registrado. Cualquier disputa que surja de o en relación con estos Términos estará
              sujeta a la jurisdicción exclusiva de los tribunales en dicha jurisdicción.
            </p>

            <h3 class="font-semibold mb-4 text-xl text-primary-400">12. Contáctenos</h3>
            <p class="mb-3">Si tienes alguna pregunta o inquietud respecto a estos Términos y Condiciones o deseas ejercer alguno de tus derechos, por favor contáctanos en:</p>
            <strong class="mb-3">FitEnCasa</strong>
            <div class="mb-6 flex">
              Correo electrónico :
              <a href="mailto:info@fitencasa.com" class="font-semibold hover:text-primary-500 transition-colors duration-150 ">info@fitencasa.com</a>
            </div>
            <p class="mb-6">Al utilizar el sitio web y los servicios, aceptas estos Términos y Condiciones.</p>
          </div>

          <!-- Modal footer -->
          <div class="flex justify-end p-6 border-t" style="background-color: rgb(249, 250, 251)">
            <button
              @click=${this.toggleTermsModal}
              class="text-white px-6 py-2 rounded-full focus:outline-none font-semibold transition-all duration-200 hover:scale-105 bg-primary-400 hover:bg-primary-500"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    `;
  }

  render() {
    return html`
      <style>
        .footer-section {
          background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url('/public/assets/footer/footer.png');
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
        }

        /* @media (min-width: 746px) {
          .footer-section {
            background-image: url('/public/assets/footer/footer.png');
          }
        }

        @media (min-width: 1280px) {
          .footer-section {
            background-image: url('/public/assets/footer/footerBg.png');
          }
        } */
      </style>

      <div class="footer-section">
        <section class="flex justify-center items-center">
          <div class="sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1300px] w-full px-4 sm:px-6 md:px-8 lg:px-10 h-full flex flex-col py-5 md:py-10 lg:py-14">
            <div class="flex flex-col items-center text-center text-white text-xs md:text-lg gap-5">
              <img src="/public/assets/footer/logo.webp" class="w-[150px] md:w-[225px]" alt="" />
              <div class="flex gap-4">
                <button
                  @click=${this.togglePrivacyModal}
                  class=" bg-black py-2 px-4 text-center hover:scale-105 cursor-pointer transition-all duration-200 rounded-[30px] text-[8px] md:text-lg font-black uppercase"
                >
                  Política de Privacidad
                </button>
                <button
                  @click=${this.toggleTermsModal}
                  class=" bg-black py-2 px-4 text-center hover:scale-105 cursor-pointer transition-all duration-200 rounded-[30px] text-[8px] md:text-lg font-black uppercase"
                >
                  Términos y Condiciones
                </button>
              </div>
            </div>
          </div>
        </section>
        <section class="flex justify-center items-center">
          <div class="sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1300px] w-full px-4 sm:px-6 md:px-8 lg:px-10 h-max flex flex-col py-5 lg:py-8">
            <span class="font-white text-[8px] md:text-[15px] uppercase text-center text-white">® FitEnCasa 2025</span>
          </div>
        </section>
        ${this.renderPrivacyModal()} ${this.renderTermsModal()}
      </div>
    `;
  }
}

customElements.define('footer-element', Footer);
