import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export class Casino extends LitElement {
  static properties = {
    casinoID: { type: String },
    casinoInfo: { type: Object },
    currentMainImage: { type: Number },
    gridImages: { type: Array },
  };

  constructor() {
    super();
    this.casinoID = '';
    this.casinoInfo = null;
    this.currentMainImage = 0;
    this.gridImages = [1, 2, 3, 4];
  }

  createRenderRoot() {
    return this;
  }

  async firstUpdated() {
    this.casinoInfo = await this.fetchCasinos();
    this.requestUpdate();
  }

  _handleImageClick(event) {
    const thumbnailImg = event.target.closest('.thumbnail-img');
    if (!thumbnailImg) return;

    const gridPosition = parseInt(thumbnailImg.dataset.position, 10);
    this._swapImages(gridPosition);
  }

  _swapImages(gridPosition) {
    const newGridImages = [...this.gridImages];
    const oldMainIndex = this.currentMainImage;
    const clickedImageIndex = newGridImages[gridPosition];

    this.currentMainImage = clickedImageIndex;
    this.gridImages = newGridImages.map(index => (index === clickedImageIndex ? oldMainIndex : index));
  }

  async fetchCasinos() {
    try {
      const response = await fetch('/data/casinos.json');
      const data = await response.json();
      return data.find(casino => casino.casinoInfo.id === this.casinoID);
    } catch (error) {
      console.error('Error fetching casinos:', error);
      return null;
    }
  }

  render() {
    console.log(this.casinoInfo);
    if (this.casinoInfo === null) {
      return html`
        <section id="casino-choices-section" class="flex justify-center items-center">
          <div class="sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1300px] w-full px-4 sm:px-6 md:px-8 lg:px-10">
            <h2 class="text-red-600 xl:text-lg">Error fetching casino data. Please try again later.</h2>
          </div>
        </section>
      `;
    }

    return html`
      <article class="flex flex-col gap-6" id="${this.casinoInfo.casinoInfo.id}">
        <section class="flex flex-col gap-4">
          <div class="flex flex-col gap-1">
            <div class="flex flex-col gap-1 lg:flex-row lg:gap-2">
              <h2 class="lg:text-lg xl:text-xl font-medium">${this.casinoInfo.index}. ${this.casinoInfo.casinoInfo.title}</h2>
              <h3 class="font-semibold text-purple lg:text-lg xl:text-xl">${this.casinoInfo.casinoInfo.name}</h3>
            </div>
            <h4 class="text-sm xl:text-base">
              <span class="italic">Per person</span>
              :  Starting at
              <span>£${this.casinoInfo.casinoInfo.pricing.starting}</span>
              , and u to £2697
            </h4>
          </div>

          <p class="lg:text-lg">${this.casinoInfo.casinoInfo.descriptions.mainDescription}</p>

          <p class="lg:text-lg">${this.casinoInfo.casinoInfo.descriptions.secondaryDescription}</p>
        </section>

        <section class="flex flex-col lg:flex-row">
          <div class="flex lg:flex-col lg:w-3/12">
            <div class="bg-[#EFEAF6] border-[1px] border-[#0F0F0F0D] w-4/12 pb-16 px-4 pt-4 lg:w-full lg:pb-4">
              <h5>Best for</h5>
            </div>

            <div class="border-[1px] border-[#0F0F0F0D] w-8/12 pb-16 px-4 pt-4 lg:w-full lg:p-4 lg:flex-1">
              <p>${this.casinoInfo.casinoInfo.bestFor}</p>
            </div>
          </div>

          <div class="flex lg:flex-col lg:w-3/12">
            <div class="bg-[#EFEAF6] border-[1px] border-[#0F0F0F0D] w-4/12 pb-16 px-4 pt-4 lg:w-full lg:pb-4">
              <h5>Standout Features</h5>
            </div>

            <div class="border-[1px] border-[#0F0F0F0D] w-8/12 pb-16 px-4 pt-4 lg:w-full lg:pb-4 lg:flex-1">
              <p>${this.casinoInfo.casinoInfo.standOut}</p>
            </div>
          </div>

          <div class="flex lg:flex-col lg:w-6/12">
            <div class="bg-[#EFEAF6] border-[1px] border-[#0F0F0F0D] w-4/12 pb-16 px-4 pt-4 lg:w-full lg:p-4">
              <h5>Features</h5>
            </div>

            <div class="border-[1px] border-[#0F0F0F0D] w-8/12 pb-16 px-4 pt-4 lg:w-full lg:pb-4">
              <ul class="list-disc ml-5 space-y-1 font-light">
                ${this.casinoInfo.casinoInfo.features.map(feature => {
                  return html`
                    <li>${feature}</li>
                  `;
                })}
              </ul>
            </div>
          </div>
        </section>

        <section class="w-full casino-gallery flex flex-col gap-4 mb-4 lg:flex-row lg:h-max" @click="${this._handleImageClick}">
          <div class="main-image w-full lg:max-h-[550px] lg:w-7/12">
            <img
              src=${this.casinoInfo.gallery[this.currentMainImage].image}
              alt="${this.casinoInfo.gallery[0].metadata}"
              title="${this.casinoInfo.gallery[0].metadata}"
              class="w-full h-full max-h-[250px] lg:min-h-full object-cover rounded-lg fade-in image-transition"
            />
          </div>

          <div class="flex lg:flex-wrap lg:justify-between gap-4 w-full lg:w-5/12 h-full">
            ${this.gridImages.map(
              (index, position) => html`
                <div class="aspect-square w-full h-full lg:w-[47%] lg:h-[45%] xl:w-[48%]">
                  <img
                    src=${this.casinoInfo.gallery[index].image}
                    alt="${this.casinoInfo.gallery[index].metadata || `Casino image ${index + 1}`}"
                    title="${this.casinoInfo.gallery[index].metadata || `Casino image ${index + 1}`}"
                    data-position="${position}"
                    class="thumbnail-img w-full h-full object-cover rounded-lg hover:scale-95 hover:cursor-pointer transition-all duration-150 fade-in image-transition"
                  />
                </div>
              `
            )}
          </div>
        </section>

        <section class="w-full flex justify-center lg:justify-start">
          <a
            class="w-full max-w-[400px] text-center py-2 px-4 rounded-full font-medium text-white gradient sm:max-w-[300px] lg:text-lg hover:scale-95 transition-all duration-200"
            href="booking.html?casino-id=${this.casinoInfo.casinoInfo.id}&casino-name=${this.casinoInfo.casinoInfo.name}"
          >
            ${this.casinoInfo.ctaButton}
          </a>
        </section>
      </article>
    `;
  }
}

customElements.define('casino-element', Casino);
