import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export class TopSection extends LitElement {
  static properties = {
    casinosIDs: { type: Array },
  };

  constructor() {
    super();
    this.casinosIDs = [];
  }

  createRenderRoot() {
    return this;
  }

  async firstUpdated() {
    this.casinosIDs = await this.fetchCasinos();
    this.requestUpdate();
  }

  async fetchCasinos() {
    try {
      const response = await fetch('/data/casinos.json');
      const data = await response.json();
      return data.map(casino => ({
        id: casino.casinoInfo.id,
      }));
    } catch (error) {
      console.error('Error fetching casinos:', error);
      return null;
    }
  }

  render() {
    if (this.casinos === null) {
      return html`
        <section id="casino-choices-section" class="flex justify-center items-center">
          <div class="sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1300px] w-full px-4 sm:px-6 md:px-8 lg:px-10">
            <h2 class="text-red-600 xl:text-lg">Error fetching casino data. Please try again later.</h2>
          </div>
        </section>
      `;
    }

    return html`
      <section id="top-7-section" class="flex justify-center items-center">
        <div class="sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1300px] w-full px-4 sm:px-6 md:px-8 lg:px-10">
          <h2 class="font-medium text-lg xl:text-2xl text-center font-Poppins">Explore the best gaming options Birmingham has to offer</h2>
          <div class="mt-8 flex flex-col gap-10 lg:gap-14 xl:gap-20">
            ${this.casinosIDs.map(
              casino => html`
                <casino-element casinoID=${casino.id}></casino-element>
              `
            )}
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('top-section', TopSection);
