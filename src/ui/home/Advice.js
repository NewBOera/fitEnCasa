import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export class Advice extends LitElement {
  constructor() {
    super();
  }

  // Para que Lit no aplique Shadow DOM y puedas usar tus clases de Tailwind directamente:
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <style>
        .paper-bg {
          background-image: url('/public/assets/paper.webp');
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
        }

        @media (min-width: 480px) {
          .paper-bg {
            background-image: url('/public/assets/paperMd.webp');
          }
        }

        @media (min-width: 768px) {
          .paper-bg {
            background-image: url('/public/assets/paperLg.webp');
            /* background-size: contain; */
          }
        }
      </style>

      <section class=" paper-bg relative w-full min-h-[400px] md:min-h-[640px] xl:min-h-[700px] flex items-center justify-center text-center">
        <div
          class="relative max-w-2xl text-white uppercase leading-tight w-full sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1300px] px-10 sm:px-12 md:px-16  [&>p]:text-sm 2xl:[&>p]:text-base [&>p]:font-black [&>p]:leading-5"
        >
          <p class="md:-mt-20 lg:py-4 2xl:-mt-28">
            Con nuestra plataforma de fitness en línea, podrás disfrutar de una experiencia profesional de entrenamiento en cualquier momento y lugar, sin necesidad de membresía en un gimnasio.
            ¡Permítenos ayudarte a transformar tu viaje fitness hoy mismo!
          </p>
        </div>
      </section>
    `;
  }
}

customElements.define('advice-section', Advice);
