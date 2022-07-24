import { jest } from '@jest/globals';

import TicketRepository from '../../../../src/pairtest/repository/TicketRepository';

afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
});

describe("getPrice", () => {
    it("should return the price for the supplied ticket type", async () => {
        //SETUP
        const sut = new TicketRepository()
        // CALL
        const result = sut.getPrice('ADULT')
        
        // EXPECT
        expect(result).toBe(20)
    })

    it("should throw an error is the supplied ticket type does not exist in the price datastore", async () => {
        //SETUP
        const sut = new TicketRepository()
        // CALL
        expect(() => sut.getPrice('SOMETHINGELSE')).toThrowError('')        
    })
})