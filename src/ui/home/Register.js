import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export class Register extends LitElement {
  constructor() {
    super();
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <style>
        .form-bg {
          background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('/public/assets/registerBg.webp');
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
        }

        @media (min-width: 768px) {
          .form-bg {
            background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('/public/assets/registerBg_md.webp');
          }
        }

        @media (min-width: 1024px) {
          .form-bg {
            background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('/public/assets/registerBg_lg.webp');
            background-size: contain;
          }
        }
      </style>
      <article class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20 rounded-3xl form-bg w-full">
        <section class=" col-span-1 lg:col-start-2 w-[300px] sm:w-[380px] md:w-[440px] lg:gap-5 p-4 pb-20 lg:p-12 md:p-16">
          <register-form></register-form>
        </section>
      </article>
    `;
  }
}

customElements.define('register-section', Register);
