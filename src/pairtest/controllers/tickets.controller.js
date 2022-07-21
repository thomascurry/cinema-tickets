import TicketService from "../services/TicketService"

const ticketService = new TicketService();

export const purchaseTickets = async (req, res, next) => {
    try {
        const result = ticketService.purchaseTickets()

        return res.status(200)
    } catch(error) {
        console.error('An error has occured')
        next(error);
    }
}