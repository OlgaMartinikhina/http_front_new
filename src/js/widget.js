/* eslint-disable class-methods-use-this */
export default class Widget {
  constructor() {
    this.ticketsList = document.querySelector('#ticket_list');
  }

  newDesk(arrTicket) {
    this.ticketsList.innerHTML = '';
    // eslint-disable-next-line no-restricted-syntax
    for (const item of arrTicket) {
      const itemDate = new Date(item.created);
      const date = this.convertDate(itemDate.getDate());
      const month = this.convertDate(itemDate.getMonth() + 1);
      const year = this.convertDate(itemDate.getFullYear());
      const hours = this.convertDate(itemDate.getHours());
      const minut = this.convertDate(itemDate.getMinutes());
      const itemCreated = `${date}.${month}.${year} ${hours}:${minut}`;
      const ticket = document.createElement('div');
      ticket.className = 'ticket_item';
      ticket.dataset.id = item.id;
      ticket.innerHTML = `
      <div class="div-status"><span class="circle"></span></div>
      <div class="td-name">${item.name}
      </div>
      <div class="td-created">${itemCreated}</div>
      <div class="change-del">
        <span class="edit-ticket circle"></span>
        <span class="del-ticket circle"></span>
      </div>
      `;
      this.ticketsList.appendChild(ticket);
    }
  }

  convertDate(value) {
    const rValue = value < 10 ? `0${value}` : value;
    return rValue;
  }
}
