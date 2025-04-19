console.log('Hello World');

const API_URL = 'https://api.magicthegathering.io/v1/cards';
const FALLBACK_IMAGE =
  'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=130550&type=card';

/**
 * Utility function to create HTML elements dynamically
 */
const createElement = (tag, attributes = {}, textContent = '') => {
  const element = document.createElement(tag);
  Object.entries(attributes).forEach(([key, value]) => {
    element[key] = value;
  });
  if (textContent) {
    element.textContent = textContent;
  }
  return element;
};

/***
 * function to toggle the theme
 */

const createThemeToggle = () => {
    let currentTheme = localStorage.getItem("theme") || "light";
  
    const themeToggleButton = createElement("button", {
        id: "theme-toggle",
        style: 'cursor: pointer;',
        'aria-label': 'Toggle theme',
      }, "Toggle Theme");

    const initTheme = () => {
      if (currentTheme === "dark") {
        document.body.classList.add("dark");
      }
    };
  
    const toggleTheme = () => {
      const isDark = document.body.classList.toggle("dark");
      currentTheme = isDark ? "dark" : "light";
      localStorage.setItem("theme", currentTheme);
    };
  
    themeToggleButton.addEventListener("click", toggleTheme);
    initTheme();
  
    return {
      getElement: () => themeToggleButton,
      getTheme: () => currentTheme,
      toggle: toggleTheme,
    };
  };

/***
 * Utility function to create links in the navigation elements dynamically
 */
const createNavLinks = (links) => {
    const ullist = createElement('ul', {className: 'navbar-links',});
  
    links.forEach(({ text, href, 'aria-label': ariaLabel }) => {
      const aElement = createElement('a', {
        href,
        'aria-label': ariaLabel,
        textContent: text,
        className: 'nav-link'
      });
  
      const li = createElement('li');
      li.appendChild(aElement);
      ullist.appendChild(li);
    });
  
    return ullist;
  };
  
/***
 * Function to create and configure the navigation bar
 */
const createNavbar = () => {
    const nav = createElement('nav', {
      'aria-label': 'Main Navigation',
      className: 'navbar'
    });
  
    const hamburger = createElement('div', {
      className: 'navbar-toggle',
      'aria-label': 'Toggle navigation',
      'aria-expanded': 'false',
      innerHTML: '&#9776;'
    });
  
    const navLinks = [
        { text: 'Home', href: '#', 'aria-label': 'Home page' },
        { text: 'Cards', href: '#cards', 'aria-label': 'View cards' },
        { text: 'About', href: '#about', 'aria-label': 'About this project' },
        { text: 'Contact', href: '#contact', 'aria-label': 'Contact information' }
      ];
    
    const ul = createNavLinks(navLinks);
  
    hamburger.addEventListener('click', () => {
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !expanded);
      ul.classList.toggle('open');
    });
    
    const themeToggle = createThemeToggle();
    
    const controlsContainer = createElement('div', {
        className: 'navbar-controls',
        style: `
        display: flex;
        width: 100%;
        gap: 10px;
        align-items: center;
        justify-content: space-between;
        `
      });
    
      controlsContainer.appendChild(hamburger); 
      controlsContainer.appendChild(themeToggle.getElement());
    
      nav.appendChild(controlsContainer);
      nav.appendChild(ul);
  
    return nav;
  };
  
/**
 * Function to create and configure the grid container
 */
const setupGridContainer = () => {
  const container =document.getElementById('card-container') || createElement('section', { id: 'card-container' , ariaLabel : 'Card Grid' });

  container.innerHTML = '';
  Object.assign(container.style, {
    display: 'grid',
    gap: '10px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    padding: '20px',
  });

  return container;
};

/**
 * Counter with Closure
 */
const createCounter = (count = 0) => {
  const counterContainer = createElement('section', {ariaLabel: 'Selected Cards Counter'});
  const counterElement = createElement('h3',{ id: 'selected-counter' },`Selected: ${count}`);
  counterContainer.appendChild(counterElement);

  return {
    getElement: () => counterContainer,
    getCount: () => count,
    increment: () => {
      count++;
      counterElement.innerText = `Selected: ${count}`;
    },
    decrement: () => {
      if (count > 0) count--;
      counterElement.innerText = `Selected: ${count}`;
    },
    reset: () => {
      count = 0;
      counterElement.innerText = `Selected: ${count}`;
    },
  };
};

/**
 * Class for handling button creation and actions
 */
class Button {
  constructor(text, onClick, type = 'primary') {
    this.button = createElement('button', {
      textContent: text,
      style: `
                background-color: ${
                  type === 'primary'
                    ? 'var(--color-primary)'
                    : 'var(--color-success)'
                };
                border-radius: 8px;
                border: none;
                box-shadow: var(--shadow-light);
                color: white;
                cursor: pointer;
                font-size: 14px;
                font-weight: bold;
                margin: 10px;
                padding: 10px 15px;
                text-transform: uppercase;
                transition: all 0.3s ease-in-out;
            `,
    });

    this.button.addEventListener('mouseover', () => {
      this.button.style.opacity = '0.9';
      this.button.style.boxShadow = 'var(--shadow-strong)';
    });

    this.button.addEventListener('mouseout', () => {
      this.button.style.opacity = '1';
      this.button.style.boxShadow = 'var(--shadow-light)';
    });

    this.button.addEventListener('click', onClick);
  }

  getElement() {
    return this.button;
  }

  setText(text) {
    this.button.textContent = text;
  }
  setAttributes(attributes = {}) {
    Object.entries(attributes).forEach(([key, value]) => {
      this.button.setAttribute(key, value);
    });
  }
}

/**
 * Fetch Data from API
 */
const fetchCards = async (SIZE = 70) => {
  const spinner = createLoadingSpinner();
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log(data);
    return data.cards.slice(0, SIZE).map((card) => new Card(card));
  } catch (error) {
    console.error('Error fetching cards:', error);
    return [];
  } finally {
    hideLoadingSpinner(spinner);
  }
};

/**
 * Hide the loading spinner
 */
const hideLoadingSpinner = (spinner) => {
  if (spinner) {
    spinner.style.display = 'none';
  }
};

/**
 * Function to create a loading spinner
 */
const createLoadingSpinner = () => {
  const spinner = createElement('div', { id: 'loading-spinner' });
  Object.assign(spinner.style, {
    animation: 'spin 1s linear infinite',
    border: '5px solid rgba(0, 0, 0, 0.2)',
    borderRadius: '50%',
    borderTop: '5px solid var(--color-success)',
    height: '50px',
    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50px',
    zIndex: '1000',
  });

  document.body.appendChild(spinner);
  return spinner;
};

/**
 * Handle Card Selection
 */
const handleBtnCardClick = (card, wrapper, button, counter) => {
  card.toggleSelection();
  wrapper.style.backgroundColor = card.isSelected? 'var(--color-card-selected)': 'var(--color-card-deselected)';
  button.setText(card.isSelected ? 'Deselect' : 'Select');
  button.setAttributes({
      'aria-label': card.isSelected ? 'Deselect this card' : 'Select this card',
      'aria-pressed': card.isSelected.toString()
  });

  if (card.isSelected) {
    counter.increment();
  } else {
    counter.decrement();
  }
};

/**
 * Card Class (Represents a single card)
 */
class Card {
  constructor(data) {
    this.artist = data.artist;
    this.button = null;
    this.counter = data.counter;
    this.id = data.id;
    this.imageUrl = data.imageUrl || FALLBACK_IMAGE;
    this.isSelected = false;
    this.manaCost = data.manaCost;
    this.name = data.name;
    this.power = data.power;
    this.rarity = data.rarity;
    this.setName = data.setName;
    this.text = data.text;
    this.toughness = data.toughness;
    this.type = data.type;
    this.wrapper = null;
  }

  toggleSelection() {
    this.isSelected = !this.isSelected;
  }

  draw() {
    const wrapper = createElement('div', {
      className: 'card',
      style: `
        align-items: center;
        background-color: var(--color-card-bg);
        border-radius: 8px;
        border: 1px solid #ccc;
        box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
        display: flex;
        overflow: hidden;
        padding: 12px;
        position: relative;
        transition: transform 0.3s, background-color 0.3s;
      `,
    });
  
    wrapper.addEventListener('mouseover', () => {
      wrapper.style.transform = 'scale(1.02)';
    });
  
    wrapper.addEventListener('mouseout', () => {
      wrapper.style.transform = 'scale(1)';
    });
  
    const img = createElement('img', {
      src: this.imageUrl,
      onerror: function () {
        this.src = FALLBACK_IMAGE;
      },
      style:
        'width: 100px; height: auto; border-radius: 5px; margin-right: 15px;',
      alt: this.name,
      ariaLabel: `Image of ${this.name}`,
    });
  
    const content = createElement('div', { style: 'flex-grow: 1;' });
  
    const title = createElement('h3', {}, this.name);
    const manaCost = createElement('p', {}, `Mana Cost: ${this.manaCost || 'N/A'}`);
    const powerToughness = createElement('p', {}, `P/T: ${this.power || 'N/A'} / ${this.toughness || 'N/A'}`);
  
    const details = createElement('div', {
      style: `
        background: var(--color-details-bg);
        border-top: 1px solid #ccc;
        font-size: 12px;
        left: 0;
        padding: 10px;
        position: absolute;
        text-align: left;
        top: 0;
        transition: bottom 0.3s ease-in-out;
        width: 100%;
        height: 100%;
        display: none;
      `,
    });
    details.innerHTML = `
      <p>Type: ${this.type}</p>
      <p>Rarity: ${this.rarity}</p>
      <p>Set: ${this.setName}</p>
      <p>Text: ${this.text || 'No description'}</p>
      <p>Artist: ${this.artist}</p>
    `;
  
    const showMoreButton = new Button(
      'Show More',
      () => {
        const isHidden = details.style.display === 'none';
        details.style.display = isHidden ? 'block' : 'none';
        showMoreButton.setText(isHidden ? 'Show Less' : 'Show More');
        showMoreButtonInside.setText(isHidden ? 'Show Less' : 'Show More');
      },
      'secondary'
    );
  
    const showMoreButtonInside = new Button(
      'Show Less',
      () => {
        const isHidden = details.style.display === 'none';
        details.style.display = isHidden ? 'block' : 'none';
        showMoreButton.setText(isHidden ? 'Show Less' : 'Show More');
        showMoreButtonInside.setText(isHidden ? 'Show Less' : 'Show More');
      },
      'secondary'
    );
  
    details.appendChild(showMoreButtonInside.getElement());
  
    showMoreButton.setAttributes({
      'aria-expanded': 'false',
      'aria-label': 'Show more details about this card',
    });
  
    const selectButton = new Button('Select', () =>
      handleBtnCardClick(this, wrapper, selectButton, this.counter)
    );

    selectButton.setAttributes({
      'aria-label': 'Select this card',
      'aria-pressed': 'false',
    });
  
    content.append(
      title,
      manaCost,
      powerToughness,
      selectButton.getElement(),
      showMoreButton.getElement(),
      details
    );
    wrapper.append(img, content);
  
    this.wrapper = wrapper;
    this.button = selectButton;
  
    return wrapper;
  }
  
}

/**
 * CardList Class (Handles the list of cards)
 */
class CardList {
  constructor(counter) {
    this.cards = [];
    this.counter = counter;
  }

  async loadCards() {
    this.cards = await fetchCards();
    this.draw();
  }

  draw() {
    const container = setupGridContainer();
    this.cards.forEach((card) => {
      card.counter = this.counter;
      container.appendChild(card.draw());
    });

    const main = document.querySelector('main');
    main.appendChild(container);
  }

  selectAll() {
    this.cards.forEach((card) => {
      if (!card.isSelected) {
        card.isSelected = true;
        card.wrapper.style.backgroundColor = 'var(--color-card-selected)';
        card.button.setText('Deselect');
        this.counter.increment(); 
      }
    });
  }

  deselectAll() {
    this.cards.forEach((card) => {
      if (card.isSelected) {
        card.isSelected = false;
        card.wrapper.style.backgroundColor = 'var(--color-card-deselected)';
        card.button.setText('Select');
        this.counter.decrement();
      }
    });
    this.counter.reset();
  }
}

/**
 * Function to set up the main layout of the page
 */

const setupLayout = (cardList, counter) => {
    
    // header
  const header = createElement('header', { ariaLabel: 'Header Area' });
  Object.assign(header.style, {
      fontSize: '20px',
      margin: '0',
      padding: '0',
    });

    //  main
  const main = createElement('main', { ariaLabel: 'Main Content Area' });
  Object.assign(main.style, {
    textAlign: 'center',
    margin: '20px',
    boxSizing: 'border-box',
    });

    
    const btnContainer = createElement('section', { style: 'margin: 20px;' });
    const selectAllBtn = new Button('Select All', () => cardList.selectAll());
    const deselectAllBtn = new Button('Deselect All',() => {cardList.deselectAll();},'secondary');
    
    btnContainer.appendChild(selectAllBtn.getElement());
    btnContainer.appendChild(deselectAllBtn.getElement());
    const container = setupGridContainer();
    
    document.body.appendChild(header);
    const navbar = createNavbar();
    header.appendChild(navbar);
    
    document.body.appendChild(main);
    main.append(
        counter.getElement(),
        btnContainer,
        container
        );
};

/**
 * Page Class (Handles page layout and UI setup)
 */

class Page {
  constructor() {
    this.counter = createCounter(0);
    this.cardList = new CardList(this.counter);
  }

  init() {
    setupLayout(this.cardList, this.counter);
    this.cardList.loadCards();
  }
}

/**
 * Initialize Page
 */
const page = new Page();
page.init();
