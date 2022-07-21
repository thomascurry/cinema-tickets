import { jest } from '@jest/globals';
import { purchaseTickets } from "../../../../src/pairtest/controllers/tickets.controller";
import TicketService from '../../../../src/pairtest/services/TicketService'
jest.mock('../../../../src/pairtest/services/TicketService')

afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
});

describe("purchaseTickets", () => {
    it("should return a 200 when a purchase is completed", async () => {
        // SETUP
        const fakeReq = {}

        const fakeRes = {
            status: jest.fn()
        }

        const fakeNext = jest.fn()

        const purchaseTicketsSpy = jest
        .spyOn(TicketService.prototype, 'purchaseTickets')
        .mockImplementationOnce(() => {});

        // CALL
        await purchaseTickets(fakeReq, fakeRes, fakeNext)
        
        // EXPECT
        expect(purchaseTicketsSpy).toHaveBeenCalled();
    
        expect(fakeRes.status).toHaveBeenCalledWith(200)
        expect(fakeNext).not.toHaveBeenCalled();
    })

    it("should call next function when a downstream error is thrown", async () => {
        // SETUP
        const fakeReq = {}

        const fakeRes = {
            status: jest.fn()
        }

        const fakeNext = jest.fn()

        const purchaseTicketsSpy = jest
        .spyOn(TicketService.prototype, 'purchaseTickets')
        .mockImplementationOnce(() => {
            throw new Error('some error')
        });
  
        // CALL
        await purchaseTickets(fakeReq, fakeRes, fakeNext)

        // EXPECT
        expect(purchaseTicketsSpy).toHaveBeenCalled();

        expect(fakeNext).toHaveBeenCalled();
        expect(fakeRes.status).not.toHaveBeenCalled();
    })
})