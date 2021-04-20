// eslint-disable-next-line import/extensions
import Widget from './widget.js';
// eslint-disable-next-line import/extensions
import Popups from './popups.js';
// eslint-disable-next-line import/extensions
import DeleteTicket from './del.js';
// eslint-disable-next-line import/extensions
import XHR from './xhr.js';

const widget = new Widget();
const popup = new Popups(document.body);
const deleteTicket = new DeleteTicket();
const xhrClass = new XHR();

class Work {
  constructor() {
    this.tableGoods = document.querySelector('#ticket_list');
    this.elAddProduct = document.querySelector('#add-ticket');
    this.id = null;
    this.itemIndex = null;
  }

  async init() {
    const arrTickets = await xhrClass.getTickets();
    widget.redrawGoods(arrTickets);

    popup.bindToDOM();
    popup.saveProduct(this.saveProduct.bind(this));
    this.inputName = document.querySelector('#name');
    this.inputDescription = document.querySelector('#description');
    this.popupTitle = document.querySelector('#title-popup');
    deleteTicket.init();
    this.eventsGoods();
  }

  eventsGoods() {
    this.tableGoods.addEventListener('click', async (event) => {
      const eClass = event.target.classList;
      this.id = event.target.closest('.ticket_item').dataset.id;

      // change add-ticket
      if (eClass.contains('edit-ticket')) {
        const itemName = event.target.closest('.ticket_item').querySelector('.td-name').innerText;
        const description = await xhrClass.getDescription(this.id);
        this.inputName.value = itemName;
        this.inputDescription.value = description;
        this.popupTitle.innerText = 'Изменить тикет';
        popup.showPopup();
      }
      // delete product
      if (eClass.contains('del-ticket')) {
        deleteTicket.delElement(this.delProduct.bind(this));
      }
      // get description
      if (eClass.contains('td-name')) {
        const itemDescription = event.target.parentNode.querySelector('.description');
        if (!itemDescription) {
          const description = await xhrClass.getDescription(this.id);
          const elDescription = document.createElement('div');
          elDescription.className = 'description';
          elDescription.innerHTML = `
          <p>${description}</p>
          `;
          event.target.parentNode.appendChild(elDescription);
        } else {
          itemDescription.classList.toggle('hidden');
        }
      }
    });

    this.elAddProduct.addEventListener('click', () => {
      this.id = null;
      this.popupTitle.innerText = 'Добавить тикет';
      popup.showPopup();
    });
  }

  async delProduct() {
    await xhrClass.delTicket(this.id);
    const arrTickets = await xhrClass.getTickets();
    widget.newDesk(arrTickets);
  }

  async saveProduct() {
    if (this.id !== null) {
      // change
      await xhrClass.changeTickets(this.id, this.inputName.value, this.inputDescription.value);
    } else {
      // save new
      await xhrClass.addTicket(this.inputName.value, this.inputDescription.value);
    }
    const arrTickets = await xhrClass.getTickets();
    widget.newDesk(arrTickets);
  }
}

const work = new Work();
work.init();
