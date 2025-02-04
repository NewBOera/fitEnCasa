import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export class RegisterForm extends LitElement {
  static properties = {
    countryInfo: { type: Object },
  };

  constructor() {
    super();
    this.countryInfo = {
      flag: 'https://cdn.jsdelivr.net/npm/country-flag-icons/3x2/GB.svg',
      callingCode: '+44',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  createRenderRoot() {
    return this;
  }

  firstUpdated() {
    this.loadExternalResources();
    this.fetchUserLocation();
    this.initializeEvents();
  }

  loadExternalResources() {
    const iziToastCSS = document.createElement('link');
    iziToastCSS.rel = 'stylesheet';
    iziToastCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/izitoast/1.4.0/css/iziToast.min.css';
    document.head.appendChild(iziToastCSS);

    const iziToastScript = document.createElement('script');
    iziToastScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/izitoast/1.4.0/js/iziToast.min.js';
    document.head.appendChild(iziToastScript);

    iziToastScript.onload = () => {
      window.iziToast.settings({
        timeout: 3000,
        position: 'topRight',
      });
    };
  }

  async fetchUserLocation() {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();

      this.countryInfo = {
        flag: `https://cdn.jsdelivr.net/npm/country-flag-icons/3x2/${data.country_code}.svg`,
        callingCode: data.country_calling_code,
      };

      this.updatePhoneInputs();
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  }

  updatePhoneInputs() {
    const phoneInputContainers = this.querySelectorAll('.phone-input-container');
    phoneInputContainers.forEach(container => {
      const flagImg = container.querySelector('img');
      const phoneInput = container.querySelector('input[type="tel"]');

      if (flagImg) {
        flagImg.src = this.countryInfo.flag;
        flagImg.alt = 'Country flag';
      }

      if (phoneInput) {
        phoneInput.value = this.countryInfo.callingCode;
      }
    });
  }

  initializeEvents() {
    const form = this.querySelector('#registerForm');
    if (form) {
      form.addEventListener('submit', this.handleSubmit);

      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.addEventListener('click', e => {
          e.preventDefault();
          this.handleSubmit(e);
        });
      }
    }
  }

  async sendForm() {
    const GOOGLE_ENPOINT = 'https://script.google.com/macros/s/AKfycbwK7zEt2ZGcdfTsAjjm6izZY2iL10DSbOqlqR1m59Q_6D4ZGoyPckeVM0DG8JFgAJN5GA/exec';

    const form = this.querySelector('#registerForm');
    const submitBtn = this.querySelector('#submitButton');

    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" role="status">
        <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    `;

    const formData = new FormData(form);

    try {
      const params = new URLSearchParams();
      formData.forEach((value, key) => {
        params.append(key, value);
      });

      const response = await fetch(GOOGLE_ENPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });

      if (response.ok) {
        window.iziToast.success({
          message: 'Form submitted successfully',
          position: 'topRight',
        });

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Submit';
          form.reset();
          window.location.href = 'thank-you.html';
        }, 3000);
      } else {
        window.iziToast.warning({
          message: 'Error submitting form',
          position: 'topRight',
        });
      }
    } catch (error) {
      console.error('Error sending form:', error);
    }
  }

  async handleSubmit(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const form = this.querySelector('#registerForm');
    if (!form) {
      console.error('Form not found');
      return;
    }

    let isValid = true;
    const inputs = form.querySelectorAll('input, select');

    inputs.forEach(input => {
      input.classList.remove('error');

      // Email validation
      if (input.name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        isValid = false;
        input.classList.add('error');
        window.iziToast.warning({
          message: 'Invalid email address',
          position: 'topRight',
        });
      }

      // First name validation
      if (input.name === 'firstName' && (input.value.length < 3 || input.value.length > 50)) {
        isValid = false;
        input.classList.add('error');
        window.iziToast.warning({
          message: 'First name must be between 3 and 50 characters',
          position: 'topRight',
        });
      }

      // Last name validation
      if (input.name === 'lastName' && (input.value.length < 3 || input.value.length > 60)) {
        isValid = false;
        input.classList.add('error');
        window.iziToast.warning({
          message: 'Last name must be between 3 and 60 characters',
          position: 'topRight',
        });
      }
    });

    if (isValid) {
      await this.sendForm();
    }
  }

  render() {
    return html`
      <style>
        :host {
          display: block;
          width: 100%;
        }
        .hidden {
          display: none;
        }
        .error {
          border-color: #ef4444 !important;
        }
      </style>

      <form id="registerForm" class="flex w-full flex-col items-center justify-center">
        <!-- Basic Details Section -->
        <div class="mb-8 w-full">
          <h2 class="my-12 text-base text-center xl:text-xl font-normal text-white">
            Suscríbete a nuestro boletín para saber cuándo estará disponible una clase o un entrenador, y recibir todas las noticias e información que necesitas para comenzar.
          </h2>

          <div class="w-full flex flex-col gap-9 text-sm">
            <!-- First Name Input -->
            <div class="col-span-2 md:col-span-1">
              <input name="firstName" type="text" placeholder="Nombre" class="w-full rounded-lg bg-white px-4 py-3" required />
            </div>

            <!-- Last Name Input -->
            <div class="col-span-2 md:col-span-1">
              <input name="lastName" type="text" placeholder="Apellido" class="w-full rounded-lg bg-white px-4 py-3" required />
            </div>

            <!-- Email Input -->
            <div class="col-span-2">
              <input name="email" type="email" placeholder="Correo electrónico" class="w-full rounded-lg bg-white px-4 py-3" required />
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <button id="submitButton" type="submit" class="w-fit rounded-full px-16 py-4 md:mt-16 text-white bg-primary-500  transition-all duration-200 hover:scale-[1.05]  text-xl font-black ">
          Registro
        </button>
      </form>
    `;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.handleClickOutside);
    const form = this.querySelector('#registerForm');
    if (form) {
      form.removeEventListener('submit', this.handleSubmit);
    }
  }
}

customElements.define('register-form', RegisterForm);
