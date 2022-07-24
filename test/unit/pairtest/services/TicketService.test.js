import { jest } from '@jest/globals';
import TicketRepository from '../../../../src/pairtest/repository/TicketRepository.js';
import TicketTypeRequest from '../../../../src/pairtest/lib/TicketTypeRequest.js';
import TicketPaymentService from '../../../../src/thirdparty/paymentgateway/TicketPaymentService.js';
import SeatReservationService from '../../../../src/thirdparty/seatbooking/SeatReservationService.js';
import TicketService from '../../../../src/pairtest/services/TicketService.js';
import { MAXIMUM_TICKETS } from '../../../../src/pairtest/lib/Constants.js';

jest.mock('../../../../src/pairtest/repository/TicketRepository.js')
jest.mock('../../../../src/thirdparty/paymentgateway/TicketPaymentService.js')
jest.mock('../../../../src/thirdparty/seatbooking/SeatReservationService.js')

afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
});

describe("purchaseTickets", () => {
    it("should return a success object with valid ticketRequests and successful upstream calls", async () => {
        // SETUP
        const getPriceSpy = jest
        .spyOn(TicketRepository.prototype, 'getPrice')
        .mockImplementation(() => 1);

        const makePaymentSpy = jest
        .spyOn(TicketPaymentService.prototype, 'makePayment')
        .mockImplementationOnce(() => {});

        const seatReservationSpy = jest
        .spyOn(SeatReservationService.prototype, 'reserveSeat')
        .mockImplementationOnce(() => {})

        const sut = new TicketService()

        const ticketTypeRequests = [new TicketTypeRequest('INFANT', 1), new TicketTypeRequest('CHILD', 2), new TicketTypeRequest('ADULT', 2)]

        // CALL
        const result = sut.purchaseTickets(1, ticketTypeRequests)
        
        // EXPECT
        expect(getPriceSpy).toHaveBeenCalled();
        expect(makePaymentSpy).toHaveBeenCalled();
        expect(seatReservationSpy).toHaveBeenCalled();
        expect(result).toEqual({
            "success": true,
            "data": {
                "totalPaid": 3,
                "seatsAllocated": 4
            }
        });
    })

    it("should catch and rethrow any upstream errors", async () => {
        // SETUP
        const getPriceSpy = jest
        .spyOn(TicketRepository.prototype, 'getPrice')
        .mockImplementation(() => 1);

        const makePaymentSpy = jest
        .spyOn(TicketPaymentService.prototype, 'makePayment')
        .mockImplementationOnce(() => {
            throw new Error('some upstream payment error')
        });

        const seatReservationSpy = jest
        .spyOn(SeatReservationService.prototype, 'reserveSeat')
        .mockImplementationOnce(() => {})

        const sut = new TicketService()

        const ticketTypeRequests = [new TicketTypeRequest('INFANT', 1), new TicketTypeRequest('CHILD', 2), new TicketTypeRequest('ADULT', 2)]

        // CALL
        expect(() => sut.purchaseTickets(1, ticketTypeRequests)).toThrowError();
        
        // EXPECT
        expect(getPriceSpy).toHaveBeenCalled()
        expect(makePaymentSpy).toHaveBeenCalled();
        expect(seatReservationSpy).not.toHaveBeenCalled();
    })

    it(`should throw an InvalidPurchaseException when trying to purchase more than ${MAXIMUM_TICKETS} tickets`, () => {
        // SETUP
        const getPriceSpy = jest
        .spyOn(TicketRepository.prototype, 'getPrice')
        .mockImplementation(() => 1);

        const makePaymentSpy = jest
        .spyOn(TicketPaymentService.prototype, 'makePayment')
        .mockImplementationOnce(() => {});

        const seatReservationSpy = jest
        .spyOn(SeatReservationService.prototype, 'reserveSeat')
        .mockImplementationOnce(() => {})

        const sut = new TicketService()

        const ticketTypeRequests = [new TicketTypeRequest('INFANT', 10), new TicketTypeRequest('CHILD', 20), new TicketTypeRequest('ADULT', 10)]

        // CALL
        expect(() => sut.purchaseTickets(1, ticketTypeRequests)).toThrowError('Cannot purchase more than 20 tickets total');
        
        // EXPECT
        expect(getPriceSpy).not.toHaveBeenCalled();
        expect(makePaymentSpy).not.toHaveBeenCalled();
        expect(seatReservationSpy).not.toHaveBeenCalled();
    })

    it(`should throw an InvalidPurchaseException when purchasing tickets without an adult ticket`, () => {
        // SETUP
        const getPriceSpy = jest
        .spyOn(TicketRepository.prototype, 'getPrice')
        .mockImplementation(() => 1);

        const makePaymentSpy = jest
        .spyOn(TicketPaymentService.prototype, 'makePayment')
        .mockImplementationOnce(() => {});

        const seatReservationSpy = jest
        .spyOn(SeatReservationService.prototype, 'reserveSeat')
        .mockImplementationOnce(() => {})

        const sut = new TicketService()

        const ticketTypeRequests = [new TicketTypeRequest('INFANT', 1), new TicketTypeRequest('CHILD', 2)]

        // CALL
        expect(() => sut.purchaseTickets(1, ticketTypeRequests)).toThrowError('Ticket purchases require at least 1 adult');
        
        // EXPECT
        expect(getPriceSpy).not.toHaveBeenCalled();
        expect(makePaymentSpy).not.toHaveBeenCalled();
        expect(seatReservationSpy).not.toHaveBeenCalled();
    })
})