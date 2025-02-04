import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export class NavbarDesktop extends LitElement {
  static properties = {
    isLanding: {
      type: Boolean,
      attribute: 'is-landing',
      converter: {
        fromAttribute: value => value !== 'false',
        toAttribute: value => value.toString(),
      },
    },
    activeSection: { type: String },
  };

  static styles = css`
    :host {
      display: block;
    }
    .active {
      color: #153131;
      font-weight: bolder;
    }
  `;

  constructor() {
    super();
    this.activeSection = 'hero-section';
    this.observers = new Map();
  }

  firstUpdated() {
    // Maneja el hash inicial
    const hash = window.location.hash;
    if (hash) {
      this.activeSection = hash.slice(1);
      if (this.isLanding) {
        setTimeout(() => {
          this.scrollToSection(this.activeSection);
        }, 100);
      }
    }

    // Solo configuramos el observer si estamos en la landing
    if (this.isLanding) {
      this.setupIntersectionObservers();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // Limpiamos los observers
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
  }

  setupIntersectionObservers() {
    const options = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // Ajustado para mejor detección
      threshold: 0,
    };

    const sections = ['hero-section', 'about-section', 'why-us-section', 'top-7-section', 'faq-section'];

    sections.forEach(sectionId => {
      const section = document.getElementById(sectionId);
      if (section && !this.observers.has(sectionId)) {
        const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              // Solo actualizamos el estado activo, no modificamos el scroll
              this.activeSection = sectionId;
              this.requestUpdate();
            }
          });
        }, options);

        observer.observe(section);
        this.observers.set(sectionId, observer);
      }
    });
  }

  scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      const headerHeight = 120;
      const offset = section.offsetTop - headerHeight;
      window.scrollTo({
        top: offset,
        behavior: 'smooth',
      });
    }
  }

  handleNavClick(e, sectionId) {
    e.preventDefault();

    if (!this.isLanding) {
      window.location.href = `/index.html#${sectionId}`;
      return;
    }

    this.activeSection = sectionId;
    this.scrollToSection(sectionId);
    history.pushState(null, null, `#${sectionId}`);
  }

  getNavItemHref(sectionId) {
    return this.isLanding ? `#${sectionId}` : `/index.html#${sectionId}`;
  }

  render() {
    return html`
      <link rel="stylesheet" href="/public/styles/output.css" />
      <link rel="stylesheet" href="/public/styles/globals.css" />

      <header class="hidden text-black justify-center items-center md:inline-flex fixed z-50 w-full bg-[#FFFFFF] font-Peridot shadow-sm">
        <div class="sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1300px] w-full px-4 sm:px-6 md:px-8 lg:px-4">
          <nav class="flex justify-between items-center rounded-xl h-[80px] w-full px-5">
            <div class="flex items-center flex-grow-0">
              <div class="font-normal text-lg flex gap-2 items-center">
                <a href="${this.getNavItemHref('hero-section')}" @click="${e => this.handleNavClick(e, 'hero-section')}">
                  <img id="navbar-logo" class="object-contain size-12 shrink-0" src="/public/assets/navbar/logo.webp" alt="Best 10 UK Spots logo" title="Best 10 UK Spots" />
                </a>
              </div>
            </div>

            <div class="flex-grow-1">
              <div class="font-normal">
                <ul id="nav-items" class="flex justify-center gap-10 xl:gap-20">
                  <li class="transition-all duration-200 nav-item ${this.activeSection === 'hero-section' ? 'active' : ''}" id-nav="hero-section">
                    <a href="${this.getNavItemHref('hero-section')}" @click="${e => this.handleNavClick(e, 'hero-section')}">Home</a>
                  </li>
                  <li class="transition-all duration-200 nav-item ${this.activeSection === 'about-section' ? 'active' : ''}" id-nav="about-section">
                    <a href="${this.getNavItemHref('about-section')}" @click="${e => this.handleNavClick(e, 'about-section')}">About Us</a>
                  </li>
                  <li class="transition-all duration-200 nav-item ${this.activeSection === 'why-us-section' ? 'active' : ''}" id-nav="why-us-section">
                    <a href="${this.getNavItemHref('why-us-section')}" @click="${e => this.handleNavClick(e, 'why-us-section')}">Why Us?</a>
                  </li>
                  <li class="transition-all duration-200 nav-item ${this.activeSection === 'top-7-section' ? 'active' : ''}" id-nav="top-7-section">
                    <a href="${this.getNavItemHref('top-7-section')}" @click="${e => this.handleNavClick(e, 'top-7-section')}">Top 7</a>
                  </li>
                  <li class="transition-all duration-200 nav-item ${this.activeSection === 'faq-section' ? 'active' : ''}" id-nav="faq-section">
                    <a href="${this.getNavItemHref('faq-section')}" @click="${e => this.handleNavClick(e, 'faq-section')}">F.A.Q</a>
                  </li>
                  <li>
                    <a href="/booking.html" class="bg-[#0F0F0F] hover:scale-105 transition-all duration-200 py-2 px-5 rounded-full text-white">
                      <span class="font-medium">Contact Us</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </header>
    `;
  }
}

customElements.define('navbar-desktop', NavbarDesktop);
