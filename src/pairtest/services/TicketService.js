import TicketTypeRequest from '../lib/TicketTypeRequest.js';
import InvalidPurchaseException from '../lib/InvalidPurchaseException.js';

export default class TicketService {


  #hasAdultTicket(ticketTypeRequests) {
    return ticketTypeRequests.some(ticketTypeRequest => ticketTypeRequest.getTicketType() === 'ADULT')
  }

  #combinedTicketRequestsValid(ticketTypeRequests) {
    return this.#hasAdultTicket(ticketTypeRequests)
  }
  
  /**
   * Should only have private methods other than the one below.
   */
  purchaseTickets(accountId, ticketTypeRequests) {
    if (this.#combinedTicketRequestsValid) {

    } else {
      throw InvalidPurchaseException
    }
    // throws InvalidPurchaseException
  }
}
