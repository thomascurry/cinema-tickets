import InternalPurchaseException from '../models/errors/InternalPurchaseException.js';

export default class TicketRepository {
    #prices = {
        INFANT: 0,
        CHILD: 10,
        ADULT: 20
    }

    getPrice(ticketType) {
        if (!Object.keys(this.#prices).includes(ticketType)) {
            throw InternalPurchaseException('Provided ticket type does not have an associated price')
        }

        console.log(this.#prices[ticketType])
        return this.#prices[ticketType]
    }
}