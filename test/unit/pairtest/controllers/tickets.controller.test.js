import { purchaseTickets } from "../../../../src/pairtest/controllers/tickets.controller";
import {jest} from '@jest/globals';

afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

describe("purchaseTickets", () => {
    it("should return a 200 when a purchase is completed", async () => {
        const fakeReq = {}

        const fakeRes = {
            status: jest.fn()
        }

        const fakeNext = jest.fn()

        await purchaseTickets(fakeReq, fakeRes, fakeNext)
        expect(fakeRes.status).toHaveBeenCalledWith(200)
        expect(fakeNext).not.toHaveBeenCalled();
    })
})