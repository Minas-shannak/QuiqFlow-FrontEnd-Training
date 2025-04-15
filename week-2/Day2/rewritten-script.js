console.log("Magic cards");
//  Constants 
const API_URL = 'https://api.magicthegathering.io/v1/cards';
const FALLBACK_IMAGE = 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=130550&type=card';

//  Utils 
const createElement = (tag, attrs = {}, text = '') => {
  const el = document.createElement(tag);
  Object.assign(el, attrs);
  if (text) el.textContent = text;
  return el;
};

//  Counter 
class Counter {
  constructor() {
    this.count = 0;
    this.el = createElement('h3', {}, `Selected: ${this.count}`);
  }
  updateDisplay() {
    this.el.textContent = `Selected: ${this.count}`;
  }
  increment() {
    this.count++;
    this.updateDisplay();
  }
  decrement() {
    if (this.count > 0) this.count--;
    this.updateDisplay();
  }
  reset() {
    this.count = 0;
    this.updateDisplay();
  }
  getElement() {
    return this.el;
  }
}

//  Spinner 
class Spinner {
  static show() {
    const spinner = createElement('div', { id: 'spinner' });
    Object.assign(spinner.style, {
      position: 'fixed',
      top: '50%',
      left: '50%',
      width: '60px',
      height: '60px',
      border: '6px solid #eee',
      borderTop: '6px solid #007bff',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      transform: 'translate(-50%, -50%)',
      zIndex: 9999
    });
    document.body.appendChild(spinner);
    return spinner;
  }

  static hide(spinner) {
    if (spinner && spinner.parentNode) {
      spinner.parentNode.removeChild(spinner);
    }
  }
}

//  Button 
class UIButton {
  constructor(text, onClick, type = 'primary') {
    this.el = createElement('button', { textContent: text });
    Object.assign(this.el.style, {
      padding: '10px 15px',
      margin: '10px',
      border: 'none',
      borderRadius: '8px',
      backgroundColor: type === 'primary' ? 'var(--color-primary)' : '#28a745',
      color: 'white',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      boxShadow: '2px 2px 8px rgba(0,0,0,0.1)',
      cursor: 'pointer'
    });
    this.el.addEventListener('click', onClick);
    this.el.addEventListener('mouseover', () => this.el.style.opacity = '0.9');
    this.el.addEventListener('mouseout', () => this.el.style.opacity = '1');
  }
  getElement() {
    return this.el;
  }
  setText(txt) {
    this.el.textContent = txt;
  }
}

//  Card Model 
class Card {
  constructor(data) {
    Object.assign(this, data);
    this.imageUrl = data.imageUrl || FALLBACK_IMAGE;
    this.isSelected = false;
  }
  toggle() {
    this.isSelected = !this.isSelected;
  }
}

// Card View 
class CardView {
  constructor(card, counter) {
    this.card = card;
    this.counter = counter;
    this.element = this.createCard();
  }

  createCard() {
    const wrapper = createElement('div', {
      className: 'card',
      style: `
        display: flex;
        background: white;
        border-radius: 8px;
        padding: 12px;
        margin: 8px;
        position: relative;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        cursor: pointer;
      `
    });

    const img = createElement('img', {
      src: this.card.imageUrl,
      alt: this.card.name,
      style: 'width: 100px; height: auto; border-radius: 4px; margin-right: 15px;',
      onerror() { this.src = FALLBACK_IMAGE; }
    });

    const info = createElement('div');
    const name = createElement('h3', {}, this.card.name);
    const mana = createElement('p', {}, `Mana: ${this.card.manaCost || 'N/A'}`);
    const pt = createElement('p', {}, `P/T: ${this.card.power || 'N/A'} / ${this.card.toughness || 'N/A'}`);

    const toggleBtn = new UIButton('Select', () => this.toggleCard(toggleBtn, wrapper));

    info.append(name, mana, pt, toggleBtn.getElement());
    wrapper.append(img, info);
    this.card.wrapper = wrapper;
    this.card.toggleBtn = toggleBtn;
    return wrapper;
  }

  toggleCard(btn, wrapper) {
    this.card.toggle();
    btn.setText(this.card.isSelected ? 'Deselect' : 'Select');
    wrapper.style.backgroundColor = this.card.isSelected ? '#d1ffd1' : 'white';
    this.card.isSelected ? this.counter.increment() : this.counter.decrement();
  }

  getElement() {
    return this.element;
  }
}

// Card Manager 
class CardManager {
  constructor() {
    this.counter = new Counter();
    this.cards = [];
    this.container = createElement('div', {
      id: 'card-container',
      style: 'display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 10px; padding: 20px;'
    });
  }

  async init() {
    document.body.append(this.counter.getElement());
    const controls = createElement('div');
    const selectAll = new UIButton('Select All', () => this.selectAll());
    const deselectAll = new UIButton('Deselect All', () => this.deselectAll(), 'secondary');
    controls.append(selectAll.getElement(), deselectAll.getElement());
    document.body.append(controls, this.container);

    const spinner = Spinner.show();
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      this.cards = data.cards.slice(0, 70).map(card => new Card(card));
      this.renderCards();
    } catch (error) {
      alert('Error loading cards. Please try again later.');
    } finally {
      Spinner.hide(spinner);
    }
  }

  renderCards() {
    this.cards.forEach(card => {
      const view = new CardView(card, this.counter);
      this.container.append(view.getElement());
    });
  }

  selectAll() {
    this.cards.forEach(card => {
      if (!card.isSelected) {
        card.isSelected = true;
        card.wrapper.style.backgroundColor = '#d1ffd1';
        card.toggleBtn.setText('Deselect');
        this.counter.increment();
      }
    });
  }

  deselectAll() {
    this.cards.forEach(card => {
      if (card.isSelected) {
        card.isSelected = false;
        card.wrapper.style.backgroundColor = 'white';
        card.toggleBtn.setText('Select');
        this.counter.decrement();
      }
    });
  }
}

// Initialize Page
const app = new CardManager();
app.init();
