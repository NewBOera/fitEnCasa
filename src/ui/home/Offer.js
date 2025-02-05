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
        image: '/public/assets/offer/offer_1.png',
      },
      {
        id: 2,
        name: 'Clases Virtuales',
        description: 'Accede a clases en vivo o a demanda con entrenadores expertos que te guiarán en cada paso del camino.',
        image: '/public/assets/offer/offer_2.png',
      },
      {
        id: 3,
        name: 'Entrenamiento Personalizado',
        description: 'Recibe apoyo directo y motivación de nuestros entrenadores certificados, quienes están dedicados a ayudarte a mantenerte en el camino correcto.',
        image: '/public/assets/offer/offer_3.png',
      },
      {
        id: 4,
        name: 'Flexibilidad',
        description: 'Entrena a tu propio ritmo y según tu horario, con acceso a todo el contenido en cualquier dispositivo: smartphone, laptop o tablet.',
        image: '/public/assets/offer/offer_4.png',
      },
      {
        id: 5,
        name: 'Consejos de Nutrición',
        description: 'Obtén orientación para mantener una dieta equilibrada que complemente tu rutina de ejercicios, ayudándote a lograr tus objetivos más rápido.',
        image: '/public/assets/offer/offer_5.png',
      },
      {
        id: 6,
        name: 'Entrenamiento Personalizado',
        description: 'Para quienes desean atención individualizada, nuestro entrenamiento uno a uno ofrece planes de ejercicios personalizados y apoyo continuo.',
        image: '/public/assets/offer/offer_6.png',
      },
      {
        id: 7,
        name: 'Clases Grupales',
        description: 'Únete a sesiones en vivo o a demanda con otras personas y disfruta de la energía de entrenar juntos. ¡Manténte motivado y conectado!',
        image: '/public/assets/offer/offer_7.png',
      },
    ];
  }

  // Permitir usar clases de Tailwind fuera del shadow DOM:
  createRenderRoot() {
    return this;
  }

  renderOffersGrid() {
    return html`
      <!-- Ajusta las columnas según tu diseño -->
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-8 md:gap-12">
        ${this.offersData.map(
          offer => html`
            <div class="relative w-full rounded-3xl shadow-lg overflow-hidden">
              <!-- Imagen: ocupa todo el contenedor, con altura fija o mínima -->
              <img class="w-full h-[240px] md:h-[240px] object-cover" src="${offer.image}" alt="Imagen de ${offer.name}" />
              <!-- Overlay negro abajo, con texto blanco -->
              <div class="absolute bottom-0 rounded-3xl w-full bg-black bg-opacity-80 text-white p-4 flex flex-col gap-2">
                <h3 class="text-sm font-black uppercase text-center">${offer.name}</h3>
                <p class="text-xs sm:text-sm leading-snug text-center text-gray-200">${offer.description}</p>
              </div>
            </div>
          `
        )}
      </div>
    `;
  }

  render() {
    return html`
      <section class="flex flex-col gap-8 items-center">
        <h2 class="text-center text-lg lg:text-xl xl:text-2xl font-black uppercase">¡Descubre todo lo que te ofrecemos!</h2>
        ${this.renderOffersGrid()}
      </section>
    `;
  }
}

customElements.define('offer-section', Offer);
