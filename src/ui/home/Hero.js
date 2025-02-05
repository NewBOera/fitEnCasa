import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export class Hero extends LitElement {
  constructor() {
    super();
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <style>
        #hero-section {
          min-height: 820px;
          background-image: linear-gradient(rgba(0, 0, 0, 0.4), transparent), url('/public/assets/hero/hero.png');
          background-position: bottom;
          background-size: cover;
          background-repeat: no-repeat;
        }

        .image-hero {
          display: none;
        }

        .main-text {
          text-shadow: 4px 4px 6px #000;
        }
        .gradientWhite {
          background: linear-gradient(to top, #ffffff, transparent);
        }

        @media (min-width: 746px) {
          #hero-section {
            min-height: 900px;
            background-image: url('/public/assets/hero/heroMd.png');
          }
        }

        @media (min-width: 1280px) {
          #hero-section {
            min-height: 1000px;
            background-image: url('/public/assets/hero/heroLg.png');
          }
          .image-hero {
            display: block;
          }
        }
      </style>

      <section id="hero-section" class="relative xl:pt-10">
        <img class=" w-full xl:w-1/2 h-auto object-cover xl:-ml-40 " src="/public/assets/hero/navMd.png" alt="Logo" />
        <div
          class="mx-auto flex flex-col gap-10 md:gap-12 lg:gap-14 xl:gap-20 w-full sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1300px] p-10 sm:px-12 md:px-16 lg:px-24 xl:grid xl:grid-cols-2"
        >
          <div class=" pt-10 md:pt-20 lg:pt-32 xl:pt-40">
            <h1 class="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black uppercase text-center text-white main-text ">Únete a nosotros para obtener la ventaja de ponerte en forma desde casa</h1>

            <p class="text-sm md:text-base lg:text-lg 2xl:text-xl font-normal text-center text-white main-text mt-6 xl:mt-10">
              Ahorra tiempo y dinero aprovechando esta oportunidad en línea de hacer ejercicio desde casa utilizando internet y tu teléfono inteligente o laptop
            </p>
          </div>
        </div>
        <div class="hidden sm:block absolute w-full bottom-0 h-28 gradientWhite py-4"></div>
      </section>
    `;
  }
}

customElements.define('hero-section', Hero);
