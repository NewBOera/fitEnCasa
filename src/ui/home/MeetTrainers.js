import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export class MeetTrainers extends LitElement {
  static properties = {
    trainersData: { type: Array },
  };

  constructor() {
    super();
    this.trainersData = [
      {
        id: 1,
        name: 'Ana García',
        description:
          'Es una entrenadora personal con amplia experiencia y un sólido conocimiento en fitness funcional y prevención de lesiones. Con un título en ciencias del deporte, Ana lleva más de 10 años ayudando a sus clientes, enfocándose en mejorar la movilidad, fuerza y salud general. Ella personaliza sus rutinas de ejercicios para satisfacer las necesidades únicas de cada persona, asegurándose de que se sientan apoyados en cada paso del camino.',
        image: '/public/assets/trainer_anaG.png',
      },
      {
        id: 2,
        name: 'Carlos Rodríguez',
        description:
          'Es un experto en fitness certificado, especializado en entrenamiento de pesas y acondicionamiento físico. Ha trabajado con atletas de diversos niveles, desde principiantes hasta profesionales, ayudándolos a alcanzar su máximo rendimiento. Carlos combina su conocimiento en kinesiología con su pasión por motivar a los clientes, haciendo que cada entrenamiento sea una experiencia emocionante y desafiante para sus estudiantes.',
        image: '/public/assets/trainer_carlosR.png',
      },
    ];
  }

  // Para que Lit no aplique Shadow DOM y puedas usar tus clases de Tailwind directamente:
  createRenderRoot() {
    return this;
  }

  renderIndividualTables() {
    return html`
      <!-- Contenedor general de tarjetas (puedes ajustarlo a flex o grid a tu gusto) -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-20">
        ${this.trainersData.map(
          trainer => html`
            <!-- Tarjeta individual -->
            <div class="relative rounded-3xl rounded-br-none shadow-lg mx-auto w-[300px] md:w-[520px] lg:w-[400px] h-[500px] lg:h-[740px] overflow-y-hidden">
              <!-- Imagen del entrenador -->
              <img class="w-full object-cover rounded-3xl rounded-br-none" src="${trainer.image}" alt="Imagen de ${trainer.name}" />
              <!-- Capa oscura con el texto en la parte inferior -->
              <div class="absolute bottom-0 w-full bg-black bg-opacity-85 text-white p-3 rounded-3xl rounded-br-none overflow-y-scroll md:h-[220px] lg:h-[250px]">
                <h3 class="text-lg font-bold text-center uppercase">${trainer.name}</h3>
                <p class=" text-sm font-normal mt-2 leading-normal text-center">${trainer.description}</p>
              </div>
            </div>
          `
        )}
      </div>
    `;
  }

  render() {
    return html`
      <section class="flex flex-col gap-9">
        <h2 class="text-base lg:text-lg xl:text-xl uppercase text-center font-black">Conoce a algunos de nuestros entrenadores</h2>
        ${this.renderIndividualTables()}
      </section>
    `;
  }
}

customElements.define('meet-trainers-section', MeetTrainers);
