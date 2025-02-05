import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export class About extends LitElement {
  constructor() {
    super();
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <section id="WePresent-section" class="flex flex-col gap-14 md:gap-24">
        <section class="flex flex-col lg:flex-row lg:justify-center lg:items-center lg:gap-10">
          <div class="flex flex-col gap-5 text-gray-800 [&>p]:text-sm lg:[&>p]:text-base 2xl:[&>p]:text-lg [&>p]:font-normal [&>p]:leading-5 xl:[&>p]:leading-relaxed">
            <h2 class="text-base lg:text-lg xl:text-xl text-center lg:text-left font-black uppercase">Quiénes somos</h2>
            <p>
              En FitEnCasa, entendemos que la vida moderna puede ser muy agitada. Sabemos que muchas personas tienen horarios de trabajo demandantes y responsabilidades diarias que hacen que sea
              difícil encontrar tiempo para ir al gimnasio. Es por eso que creamos esta plataforma en línea, para brindar una solución conveniente y accesible para que todos puedan mantenerse en forma
              desde la comodidad de su hogar.
            </p>
            <p>
              Nuestro objetivo es ofrecerte entrenamientos personalizados, clases en vivo y asesoría nutricional para que puedas lograr tus metas de fitness sin sacrificar tiempo ni esfuerzo. Con
              FitEnCasa, podrás cuidar de tu salud y bienestar a tu propio ritmo, sin tener que preocuparte por desplazamientos o horarios rígidos. Estamos aquí para hacer que el fitness sea accesible
              para ti, sin importar lo ocupado que estés.
            </p>
          </div>
          <img src="/public/assets/aboutUs.webp" class=" mx-auto object-contain w-full max-w-[300px] md:max-w-[520px] -mt-12" alt="About Us image" title="About Us" />
        </section>

        <section class="flex flex-col lg:flex-row-reverse lg:justify-center lg:items-center gap-9 lg:gap-10">
          <div class="mt-10 flex flex-col gap-10 ">
            <div class="flex flex-col gap-5 text-gray-800 [&>p]:text-sm lg:[&>p]:text-base 2xl:[&>p]:text-lg [&>p]:font-normal [&>p]:leading-5 xl:[&>p]:leading-relaxed">
              <h2 class="text-base lg:text-lg xl:text-xl text-left font-black uppercase">Misión</h2>
              <p>
                En FitEnCasa, brindamos entrenamientos online accesibles y personalizados, para que cualquier persona pueda alcanzar sus metas de salud y bienestar desde su hogar, sin importar su
                horario o lugar.
              </p>
            </div>
            <div class="flex flex-col gap-5 text-gray-800 [&>p]:text-sm lg:[&>p]:text-base 2xl:[&>p]:text-lg [&>p]:font-normal [&>p]:leading-5 xl:[&>p]:leading-relaxed">
              <h2 class="text-base lg:text-lg xl:text-xl text-left font-black uppercase">Visión</h2>
              <p>Ser la plataforma líder de entrenamiento online en Latinoamérica, ofreciendo una forma flexible y efectiva de mantenerse en forma desde casa.</p>
            </div>
          </div>
          <img src="/public/assets/mision.webp" class=" mx-auto object-contain w-full max-w-[300px] md:max-w-[520px] rounded-3xl rounded-br-none" alt="Vision image" title="Vision" />
        </section>
      </section>
    `;
  }
}

customElements.define('about-section', About);
