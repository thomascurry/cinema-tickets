import logger from '../../logger.js';
import TicketPaymentService from '../../thirdparty/paymentgateway/TicketPaymentService.js';
import SeatReservationService from '../../thirdparty/seatbooking/SeatReservationService.js';
import { MAXIMUM_TICKETS } from '../lib/Constants.js';
import InternalPurchaseException from '../models/errors/InternalPurchaseException.js';
import InvalidPurchaseException from '../models/errors/InvalidPurchaseException.js';
import TicketRepository from '../repository/TicketRepository.js';

const ticketRepository = new TicketRepository();
const ticketPaymentService = new TicketPaymentService();
const seatReserationService = new SeatReservationService();

export default class TicketService {

  #calculateTotalTicketAmount(ticketTypeRequests) {
    return ticketTypeRequests.reduce((acc, ticketReq) => {
      return acc + ticketReq.getNoOfTickets()
    }, 0)
  }

  #hasAdultTicket(ticketTypeRequests) {
    return ticketTypeRequests.some(ticketTypeRequest => ticketTypeRequest.getTicketType() === 'ADULT')
  }

  #calculateAmountToPay(ticketTypeRequests) {
    return ticketTypeRequests.reduce((acc, ticketReq) => {
      return acc + ticketRepository.getPrice(ticketReq.getTicketType()) * ticketReq.getNoOfTickets()
    }, 0)
  }

  #calculateTotalSeats(ticketTypeRequests) {
    return ticketTypeRequests.reduce((acc, ticketReq) => {
      const requiresSeat = ticketReq.getTicketType() === 'INFANT'
      return requiresSeat === false ? acc + ticketReq.getNoOfTickets() : 0
    }, 0)
  }
  
  /**
   * Should only have private methods other than the one below.
   */
  purchaseTickets(accountId, ticketTypeRequests) {

    if (this.#calculateTotalTicketAmount(ticketTypeRequests) > MAXIMUM_TICKETS) {
      const err = new InvalidPurchaseException(`Cannot purchase more than ${MAXIMUM_TICKETS} tickets at a time`);
      logger.error(err);
      throw err;
    }

    if (!this.#hasAdultTicket(ticketTypeRequests)) {
      const err = new InvalidPurchaseException('Ticket purchases require at least 1 adult');
      logger.error(err);
      throw err;
    } 

    try {
      const totalAmountToPay = this.#calculateAmountToPay(ticketTypeRequests)
      const totalSeatsToAllocate = this.#calculateTotalSeats(ticketTypeRequests)

      // could be a promise.all if external api, there for asynchronous
      ticketPaymentService.makePayment(accountId, totalAmountToPay)
      seatReserationService.reserveSeat(accountId, totalSeatsToAllocate)

      return {
        success: true,
        data: {
          totalPaid: totalAmountToPay,
          seatsAllocated: totalSeatsToAllocate
        }
      }
    } catch (err) {
      logger.error(err)
      throw new InternalPurchaseException('An internal error occurred when purchasing tickets')
    }
  }
}
