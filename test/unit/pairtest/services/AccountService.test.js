import { jest } from '@jest/globals';

import AccountService from '../../../../src/pairtest/services/AccountService';

afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
});

describe("isValidAccount", () => {
    it("should return true when account id is greater than 0", async () => {
        //SETUP
        const sut = new AccountService()
        // CALL
        const result = sut.isValidAccount(1)
        
        // EXPECT
        expect(result).toBe(true)
    })

    it("should return false if account id is negative", async () => {
        //SETUP
        const sut = new AccountService()
        // CALL
        const result = sut.isValidAccount(-1)
        
        // EXPECT
        expect(result).toBe(false)
    })

    it("should return false if account id is not an integer", async () => {
        //SETUP
        const sut = new AccountService()
        // CALL
        const result = sut.isValidAccount('hey')
        
        // EXPECT
        expect(result).toBe(false)
    })
})