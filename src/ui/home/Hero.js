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
          min-height: max-content;
          padding: 0 0 50px 0;
        }
        @media (min-width: 1524px) {
          #hero-section {
            height: calc(80vh);
            min-height: 600px;
          }
        }

        @media (min-width: 1024px) {
          #hero-section {
            height: calc(50vh);
            min-height: 600px;
            padding: 0;
          }
        }
      </style>

      <section id="hero-section" class="flex justify-center items-center">
        <div
          class="sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1300px] w-full px-4 sm:px-6 md:px-8 lg:px-10 h-full flex flex-col justify-center items-center gap-8 mt-[130px] lg:mt-[80px]"
        >
          <h1 class="text-3xl font-normal md:text-4xl xl:text-5xl">
            <span class="text-purple">Top 7 Casinos in</span>
            <br class="sm:hidden" />
            Birmingham, UK
          </h1>

          <p class="text-center md:text-lg xl:text-xl md:w-[600px] lg:w-[800px] xl:w-[600px]">
            Where the best gaming venues from the West Midlands come together. Explore the thrilling venues this UK city has to offer in one place!
          </p>

          <div class="flex gap-6">
            <a href="#top-7-section" class="text-center gradient text-white rounded-2xl py-2 px-4 font-medium md:text-lg lg:text-xl lg:px-6 hover:scale-95 transition-all duration-200">
              Explore the venues
            </a>
            <a
              href="/booking.html"
              class="text-center bg-white rounded-2xl py-2 px-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] font-medium md:text-lg lg:text-xl lg:px-6 hover:scale-95 transition-all duration-200"
            >
              Book a casino
            </a>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('hero-section', Hero);
