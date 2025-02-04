import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export class BookingForm extends LitElement {
  static properties = {
    countryInfo: { type: Object },
    selectedDates: { type: String },
    guests: { type: Number },
    rooms: { type: Number },
    casinoSelected: { type: String },
    casinoName: { type: String },
  };

  constructor() {
    super();
    this.countryInfo = {
      flag: 'https://cdn.jsdelivr.net/npm/country-flag-icons/3x2/GB.svg',
      callingCode: '+44',
    };
    this.selectedDates = '';
    this.guests = 1;
    this.rooms = 1;
    this.casinoSelected = '';
    this.casinoName = '';

    // Bindings
    this.handleGuestsDropdown = this.handleGuestsDropdown.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.updateGuestsAndRooms = this.updateGuestsAndRooms.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    document.addEventListener('click', this.handleClickOutside);
  }

  createRenderRoot() {
    return this;
  }

  async fetchBookingInfo() {
    try {
      this.isLoading = true;
      this.render();

      const urlParams = new URLSearchParams(window.location.search);
      const casinoID = urlParams.get('casino-id');
      const casinoName = urlParams.get('casino-name');

      if (!casinoID || !casinoName) {
        this.casinoSelected = '';
        this.casinoName = '';
      }

      this.casinoSelected = casinoID;
      this.casinoName = casinoName;
    } catch (error) {
      console.error('Error fetching booking info:', error);
      this.error = true;
      this.casino = null;
    } finally {
      this.isLoading = false;
      this.render();
    }
  }

  firstUpdated() {
    this.fetchBookingInfo();
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
    const form = this.querySelector('#bookingForm');
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

    const toggleButton = this.querySelector('#guests-toggle');
    const incrementButtons = this.querySelectorAll('.increment');
    const decrementButtons = this.querySelectorAll('.decrement');

    if (toggleButton) {
      toggleButton.addEventListener('click', this.handleGuestsDropdown);
    }

    incrementButtons.forEach(button => {
      button.addEventListener('click', e => {
        e.stopPropagation();
        const type = e.target.closest('.counter').querySelector('input').id;
        this.updateGuestsAndRooms(type, 'increment');
      });
    });

    decrementButtons.forEach(button => {
      button.addEventListener('click', e => {
        e.stopPropagation();
        const type = e.target.closest('.counter').querySelector('input').id;
        this.updateGuestsAndRooms(type, 'decrement');
      });
    });
  }

  handleGuestsDropdown(event) {
    event.stopPropagation();
    const dropdown = this.querySelector('.dropdown-section');
    if (dropdown.classList.contains('hidden')) {
      dropdown.classList.remove('hidden');
      dropdown.classList.add('slide-down');
    } else {
      dropdown.classList.add('hidden');
      dropdown.classList.remove('slide-down');
    }
  }

  handleClickOutside(event) {
    const dropdown = this.querySelector('.dropdown-section');
    const button = this.querySelector('#guests-toggle');

    if (dropdown && !dropdown.contains(event.target) && !button.contains(event.target)) {
      dropdown.classList.add('hidden');
      dropdown.classList.remove('slide-down');
    }
  }

  updateGuestsAndRooms(type, operation) {
    if (type === 'guests') {
      if (operation === 'increment' && this.guests < 12) {
        this.guests++;
      } else if (operation === 'decrement' && this.guests > 1) {
        this.guests--;
      }
    } else if (type === 'rooms') {
      if (operation === 'increment' && this.rooms < 4) {
        this.rooms++;
      } else if (operation === 'decrement' && this.rooms > 1) {
        this.rooms--;
      }
    }

    const guestsInput = this.querySelector('#guests');
    const roomsInput = this.querySelector('#rooms');
    const guestsLabel = this.querySelector('#guests-label');

    if (guestsInput && roomsInput && guestsLabel) {
      guestsInput.value = this.guests;
      roomsInput.value = this.rooms;
      guestsLabel.textContent = `${this.guests} ${this.guests > 1 ? 'Guests' : 'Guest'} & ${this.rooms} ${this.rooms > 1 ? 'Rooms' : 'Room'}`;
    }
  }

  async sendForm() {
    const GOOGLE_ENPOINT = 'https://script.google.com/macros/s/AKfycbzNdBUQbsJc9MWuaNcSnYxArMoOAtDgJ5ptPNVs6jpZNuSrHI4TDHkYI67n6zEKzatu/exec';

    const form = this.querySelector('#bookingForm');
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

    const form = this.querySelector('#bookingForm');
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

      // Phone validation
      if (input.name === 'phone' && !/^\+\d[\d\s()-]{3,}$/.test(input.value)) {
        isValid = false;
        input.classList.add('error');
        window.iziToast.warning({
          message: 'Invalid phone number',
          position: 'topRight',
        });
      }

      // Date validations
      if (input.name === 'check-in' || input.name === 'check-out') {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const checkInDate = new Date(form.querySelector('input[name="check-in"]').value);
        const checkOutDate = new Date(form.querySelector('input[name="check-out"]').value);

        if (!checkInDate.getTime() || !checkOutDate.getTime()) {
          isValid = false;
          input.classList.add('error');
          window.iziToast.warning({
            message: 'Please select both check-in and check-out dates',
            position: 'topRight',
          });
        } else if (checkOutDate <= checkInDate) {
          isValid = false;
          input.classList.add('error');
          window.iziToast.warning({
            message: 'Check-out date must be after check-in date',
            position: 'topRight',
          });
        } else if (checkInDate < today) {
          isValid = false;
          input.classList.add('error');
          window.iziToast.warning({
            message: 'Check-in date cannot be in the past',
            position: 'topRight',
          });
        }
      }

      // Casino validation
      if (input.name === 'casino' && !input.value) {
        isValid = false;
        input.classList.add('error');
        window.iziToast.warning({
          message: 'Please select a casino',
          position: 'topRight',
        });
      }

      // Guests and rooms validation
      if (input.name === 'guests') {
        const guests = parseInt(input.value);
        const rooms = parseInt(form.querySelector('#rooms').value);
        if (guests < 1) {
          isValid = false;
          input.classList.add('error');
          window.iziToast.warning({
            message: 'There must be at least 1 guest',
            position: 'topRight',
          });
        } else if (guests > rooms * 4) {
          isValid = false;
          input.classList.add('error');
          window.iziToast.warning({
            message: `Number of guests cannot exceed ${rooms * 4} for ${rooms} room(s)`,
            position: 'topRight',
          });
        }
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
        .phone-input-container {
          display: flex;
          align-items: center;
        }
        .phone-input-container .flag-container {
          display: flex;
          align-items: center;
          padding: 0 12px;
          border-right: 1px solid #e5e7eb;
        }
        .phone-input-container img {
          width: 24px !important;
          height: 16px !important;
          object-fit: cover;
          display: block;
        }
        .dropdown-section {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 1rem;
          margin-top: 0.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          z-index: 50;
        }
        .counter {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5rem 0;
        }
        .counter input {
          border: none;
          width: 3rem;
          text-align: center;
          font-size: 1rem;
        }
        .counter button {
          background: #f3f4f6;
          border: 1px solid #e5e7eb;
          border-radius: 9999px;
          width: 2rem;
          height: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .counter button:hover {
          background: #e5e7eb;
        }
        .counter button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .hidden {
          display: none;
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .slide-down {
          animation: slideDown 0.2s ease forwards;
        }
        select {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          background-size: 1em;
          padding-right: 2.5rem;
        }
        .error {
          border-color: #ef4444 !important;
          background-color: #fef2f2 !important;
        }
      </style>

      <form id="bookingForm" class="w-full p-1 lg:p-6 flex flex-col items-center justify-center">
        <!-- Basic Details Section -->
        <div class="mb-8 w-full">
          <h2 class="text-lg xl:text-xl font-medium mb-6">About You</h2>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- First Name Input -->
            <div class="col-span-1">
              <label class="text-[#0F0F0FBF] text-sm mb-2 block xl:text-base">First name</label>
              <input name="firstName" type="text" placeholder="Enter your first name" class="w-full px-4 py-3 rounded-lg bg-[#FFFFFF] border-[1px] border-[#100D0826]" required />
            </div>

            <!-- Last Name Input -->
            <div class="col-span-1">
              <label class="text-[#0F0F0FBF] text-sm mb-2 block xl:text-base">Last name</label>
              <input name="lastName" type="text" placeholder="Enter your last name" class="w-full px-4 py-3 rounded-lg bg-[#FFFFFF] border-[1px] border-[#100D0826]" required />
            </div>

            <!-- Phone Input -->
            <div class="col-span-1">
              <label class="text-[#0F0F0FBF] text-sm mb-2 block xl:text-base">Phone number</label>
              <div class="phone-input-container flex rounded-lg bg-[#FFFFFF] border-[1px] border-[#100D0826] overflow-hidden">
                <div class="flex items-center px-3">
                  <img src="/uk-flag.svg" alt="UK flag" class="w-6 h-4" />
                  <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <input
                  name="phone"
                  type="tel"
                  value="+44"
                  class="flex-1 px-4 py-3 bg-transparent border-0 focus:ring-0"
                  required
                  oninput="this.value = this.value.replace(/(?!^)+/g, '').replace(/[^0-9()+]/g, '');"
                />
              </div>
            </div>

            <!-- Email Input -->
            <div class="col-span-1">
              <label class="text-[#0F0F0FBF] text-sm mb-2 block xl:text-base">Your email</label>
              <input name="email" type="email" placeholder="Enter your email" class="w-full px-4 py-3 rounded-lg bg-[#FFFFFF] border-[1px] border-[#100D0826]" required />
            </div>
          </div>
        </div>

        <!-- Casino Details Section -->
        <div class="w-full">
          <h2 class="text-lg xl:text-xl font-medium mb-6">Travel Plans</h2>

          <div class="flex flex-row lg:flex-row lg:justify-between flex-wrap gap-6">
            <div class="flex flex-col w-full relative mt-4">
              <label for="check-in" class="absolute text-sm font-[300] -top-6 xl:-top-7 xl:text-base">Check-in date:</label>
              <select name="casino" class="w-full px-4 py-3 rounded-lg bg-[#FFFFFF] border-[1px] border-[#100D0826] appearance-none" required>
                <option value="" disabled selected>Select destination</option>
                <option value="Resorts_World_Casino" ?selected=${this.casinoSelected === 'Resorts_World_Casino'}>Resorts World Casino</option>
                <option value="Genting_Casino_Birmingham" ?selected=${this.casinoSelected === 'Genting_Casino_Birmingham'}>Genting Casino Birmingham Chinatown</option>
                <option value="Grosvenor_Casino_Birmingham" ?selected=${this.casinoSelected === 'Grosvenor_Casino_Birmingham'}>Grosvenor Casino Birmingham</option>
                <option value="Rainbow_Casino_Birmingham" ?selected=${this.casinoSelected === 'Rainbow_Casino_Birmingham'}>Rainbow Casino</option>
                <option value="Shaftesbury_Casino_West_Bromwich" ?selected=${this.casinoSelected === 'Shaftesbury_Casino_West_Bromwich'}>Shaftesbury Casino</option>
                <option value="Mecca_Acocks_Green" ?selected=${this.casinoSelected === 'Mecca_Acocks_Green'}>Mecca Acocks Green</option>
                <option value="Merkur_Slots_Erdington" ?selected=${this.casinoSelected === 'Merkur_Slots_Erdington'}>Merkur Slots</option>
              </select>
            </div>

            <!-- Check-in Date -->
            <div class="flex flex-col w-full lg:w-[47%] xl:w-[48%] relative mt-4">
              <label for="check-in" class="absolute text-sm font-[300] -top-6 xl:-top-7 xl:text-base">Check-in date:</label>
              <input type="date" name="check-in" class="w-full px-4 py-3 rounded-lg bg-[#FFFFFF] border-[1px] border-[#100D0826]" required />
            </div>

            <!-- Check-out Date -->
            <div class="flex flex-col w-full lg:w-[47%] xl:w-[48%] relative mt-4">
              <label for="check-out" class="absolute text-sm font-[300] -top-6 xl:-top-7 xl:text-base">Check-out date:</label>
              <input type="date" name="check-out" class="w-full px-4 py-3 rounded-lg bg-[#FFFFFF] border-[1px] border-[#100D0826]" required />
            </div>

            <!-- Guests & Rooms Selection -->
            <div class="flex flex-col w-full relative col-span-4">
              <button type="button" id="guests-toggle" class="w-full px-4 py-3 rounded-lg bg-[#FFFFFF] border-[1px] border-[#100D0826] flex justify-between items-center">
                <span id="guests-label">1 Guest & 1 Room</span>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div class="dropdown-section hidden">
                <div class="counter border-b border-gray-200 pb-3">
                  <label for="rooms" class="font-semibold">Rooms:</label>
                  <div class="flex items-center gap-4">
                    <button type="button" class="decrement">-</button>
                    <input type="text" id="rooms" name="rooms" .value="${this.rooms}" min="1" max="4" readonly />
                    <button type="button" class="increment">+</button>
                  </div>
                </div>
                <div class="counter pt-3">
                  <label for="guests" class="font-semibold">Guests:</label>
                  <div class="flex items-center gap-4">
                    <button type="button" class="decrement">-</button>
                    <input type="text" id="guests" name="guests" .value="${this.guests}" min="1" max="12" readonly />
                    <button type="button" class="increment">+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-center mt-6 lg:justify-start w-full">
          <button id="submitButton" type="submit" class="w-full lg:w-auto px-8 py-2 gradient text-white rounded-full hover:scale-[0.98] transition-all duration-200 font-medium">
            <span class="-mt-1 lg:text-lg">Submit details</span>
          </button>
        </div>
      </form>
    `;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.handleClickOutside);
    const form = this.querySelector('#bookingForm');
    if (form) {
      form.removeEventListener('submit', this.handleSubmit);
    }
  }
}

customElements.define('booking-form', BookingForm);
