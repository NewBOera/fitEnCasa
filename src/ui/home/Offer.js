import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export class Offer extends LitElement {
  static properties = {
    offersData: { type: Array },
  };

  constructor() {
    super();
    this.offersData = [
      {
        id: 1,
        name: 'Planes de Fitness Personalizados',
        description: 'Rutinas de ejercicios adaptadas a tus metas, nivel de condición física y preferencias para ayudarte a obtener los mejores resultados.',
        image: '/public/assets/offer/offer_1.webp',
      },
      {
        id: 2,
        name: 'Clases Virtuales',
        description: 'Accede a clases en vivo o a demanda con entrenadores expertos que te guiarán en cada paso del camino.',
        image: '/public/assets/offer/offer_2.webp',
      },
      {
        id: 3,
        name: 'Entrenamiento Personalizado',
        description: 'Recibe apoyo directo y motivación de nuestros entrenadores certificados, quienes están dedicados a ayudarte a mantenerte en el camino correcto.',
        image: '/public/assets/offer/offer_3.webp',
      },
      {
        id: 4,
        name: 'Flexibilidad',
        description: 'Entrena a tu propio ritmo y según tu horario, con acceso a todo el contenido en cualquier dispositivo: smartphone, laptop o tablet.',
        image: '/public/assets/offer/offer_4.webp',
      },
      {
        id: 5,
        name: 'Consejos de Nutrición',
        description: 'Obtén orientación para mantener una dieta equilibrada que complemente tu rutina de ejercicios, ayudándote a lograr tus objetivos más rápido.',
        image: '/public/assets/offer/offer_5.webp',
      },
      {
        id: 6,
        name: 'Entrenamiento Personalizado',
        description: 'Para quienes desean atención individualizada, nuestro entrenamiento uno a uno ofrece planes de ejercicios personalizados y apoyo continuo.',
        image: '/public/assets/offer/offer_6.webp',
      },
      {
        id: 7,
        name: 'Clases Grupales',
        description: 'Únete a sesiones en vivo o a demanda con otras personas y disfruta de la energía de entrenar juntos. ¡Manténte motivado y conectado!',
        image: '/public/assets/offer/offer_7.webp',
      },
    ];
  }

  // Para usar Tailwind fuera de Shadow DOM
  createRenderRoot() {
    return this;
  }

  /**
   * Determina el "tamaño" (normal, wide, half, full) según el ID de la tarjeta.
   * Ajusta esta lógica como prefieras.
   */
  getCardClass(id) {
    const sizeMap = {
      1: 'col-span-1 xl:col-start-1 xl:col-end-5 xl:row-start-1 xl:row-end-2',
      2: 'col-span-1 xl:col-start-5 xl:col-end-7 xl:row-start-1 xl:row-end-2',
      3: 'col-span-1 xl:col-span-6 xl:row-start-2 xl:row-end-3',
      4: 'col-span-1 xl:col-span-6 xl:row-start-3 xl:row-end-4',
      5: 'col-span-1 xl:col-start-3 xl:col-end-7 xl:row-start-4 xl:row-end-5',
      6: 'col-span-1 xl:col-start-1 xl:col-end-3 xl:row-start-4 xl:row-end-5',
      7: 'col-span-1 xl:col-span-6 xl:row-start-5 xl:row-end-6',
    };
    return sizeMap[id] || 'xl:col-span-2';
  }

  renderOffersGrid() {
    return html`
      <!-- En pantallas XL, tendremos 6 columnas. 
           En menores, 1 sola columna (puedes ajustarlo si quieres 2 col. en MD). -->
      <div class="grid grid-cols-1 xl:grid-cols-6 xl:grid-rows-5 gap-8 w-full md:gap-12">
        ${this.offersData.map(offer => {
          // Calcula el "size" y sus clases asociadas
          const cardClass = this.getCardClass(offer.id);

          return html`
            <!-- Card -->
            <div class="relative w-full rounded-3xl shadow-lg overflow-hidden ${cardClass}">
              <img class="w-full h-[240px] md:h-[240px] object-cover xl:object-top" src="${offer.image}" alt="Imagen de ${offer.name}" />
              <div class="absolute bottom-0 rounded-3xl w-full bg-black bg-opacity-80 text-white p-4 flex flex-col gap-2">
                <h3 class="text-sm font-black uppercase text-center">${offer.name}</h3>
                <p class="text-xs sm:text-sm leading-snug text-center text-gray-200">${offer.description}</p>
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }

  render() {
    return html`
      <section class="flex flex-col gap-8 items-center pt-6">
        <h2 class="text-center text-lg lg:text-xl xl:text-2xl font-black uppercase">Descubre todo lo que te ofrecemos</h2>
        <p class=" text-gray-800 text-base lg:text-lg 2xl:text-xl font-normal text-center">
          En FitEnCasa, ofrecemos una experiencia integral de fitness en línea diseñada para ayudarte a mantenerte saludable y activo desde la comodidad de tu hogar. Esto es lo que puedes esperar al
          unirte a nosotros:
        </p>
        ${this.renderOffersGrid()}
      </section>
    `;
  }
}

customElements.define('offer-section', Offer);
