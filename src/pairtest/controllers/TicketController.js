import TicketService from "../services/TicketService.js"
import AccountService from '../services/AccountService.js';
import logger from "../../logger.js";
import TicketTypeRequest from "../models/tickets/TicketTypeRequest.js";
import InvalidPurchaseException from "../models/errors/InvalidPurchaseException.js";

const ticketService = new TicketService();
const accountService = new AccountService();

export const purchaseTickets = (req, res, next) => {
    const { account, tickets } = req.body
    const accountValid = accountService.isValidAccount(account.id);

    if (!accountValid) {
        return next(new InvalidPurchaseException('Account id is not valid'))
    }

    try {
        const ticketTypeRequests = Object.entries(tickets)
            .map(([type, noOfTickets]) => new TicketTypeRequest(type.toUpperCase(), noOfTickets))

        const result = ticketService.purchaseTickets(account.id, ticketTypeRequests)

        return res.status(200).json(result)
    } catch (err) {
        logger.error(err)
        return next(err)
    }
}