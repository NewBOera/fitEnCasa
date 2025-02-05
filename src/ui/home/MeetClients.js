import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export class MeetClients extends LitElement {
  static properties = {
    trainersData: { type: Array },
  };

  constructor() {
    super();
    this.trainersData = [
      {
        id: 1,
        name: 'José Martínez',
        description:
          '"Nunca imaginé que podría obtener los mismos resultados de un gimnasio, pero entrenando desde casa. Las clases en línea de FitEnCasa me han permitido ajustarme a mi propio horario, y los entrenadores personalizados me motivan mucho. ¡Estoy más en forma que nunca!"',
        image: '/public/assets/meetClients/client_joseM.webp',
      },
      {
        id: 2,
        name: 'Patricia López',
        description:
          '"¡Me encanta entrenar con FitEnCasa! Las clases grupales son súper divertidas, y lo mejor es la energía de todos. Los entrenadores están siempre atentos y me han ayudado a superar mis límites. Lo recomiendo totalmente."',
        image: '/public/assets/meetClients/client_patriciaL.webp',
      },
      {
        id: 3,
        name: 'Carlos Pérez',
        description:
          '"Mi experiencia con FitEnCasa ha sido increíble. Me gusta el entrenamiento personalizado, ya que los planes están hechos específicamente para mí y mis objetivos. Además, siempre recibo apoyo y motivación de los entrenadores. ¡El cambio ha sido notable!"',
        image: '/public/assets/meetClients/client_carlosP.webp',
      },
    ];
  }

  // Para que Lit no aplique Shadow DOM y puedas usar tus clases de Tailwind directamente:
  createRenderRoot() {
    return this;
  }

  renderIndividualCards() {
    return html`
      <!-- Contenedor general (usa grid o flex según prefieras) -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12  ">
        ${this.trainersData.map(trainer => {
          const scaleClass = trainer.id === 2 ? 'xl:scale-[1.05]' : '';
          return html`
            <!-- Tarjeta individual -->
            <div
              class="relative bg-white rounded-xl shadow-lg overflow-hidden flex flex-col items-center text-center mx-auto w-[300px] md:w-[600px] lg:w-[280px]
            xl:w-[300px] 2xl:w-[340px] ${scaleClass}"
            >
              <!-- Imagen en la parte superior -->
              <img class="w-full h-auto md:h-[380px] lg:h-auto object-cover md:object-top" src="${trainer.image}" alt="Imagen de ${trainer.name}" />

              <!-- Contenido textual -->
              <div class="p-6 flex flex-col gap-4">
                <p class="text-gray-700 text-sm leading-relaxed italic pb-16">${trainer.description}</p>
                <h3 class="absolute bottom-0 pb-8 text-lg font-black uppercase bg-white w-full text-left">${trainer.name}</h3>
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }

  render() {
    return html`
      <section class="flex flex-col items-center gap-9">
        <h2 class="text-base lg:text-lg xl:text-xl uppercase text-center font-black">Conoce a algunos de nuestros entrenadores</h2>
        ${this.renderIndividualCards()}
      </section>
    `;
  }
}

customElements.define('meet-clients-section', MeetClients);
