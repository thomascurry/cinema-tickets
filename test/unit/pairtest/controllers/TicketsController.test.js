import { jest } from '@jest/globals';
import { purchaseTickets } from "../../../../src/pairtest/controllers/TicketController";
import { fakeResponse, fakeNext } from '../../../utils/http-test-utils';
import TicketService from '../../../../src/pairtest/services/TicketService'
import AccountService from '../../../../src/pairtest/services/AccountService';

jest.mock('../../../../src/pairtest/services/TicketService')
jest.mock('../../../../src/pairtest/services/AccountService')
afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
});

describe("purchaseTickets", () => {
    it("should return a 200 when a purchase is completed", async () => {
        // SETUP
        const fakeRequest = {
            body: {
                account: {
                    id: 1
                },
                tickets: {
                    infant: 1,
                    child: 1,
                    adult: 2
                }
            } 
        }

        const isValidAccountSpy = jest
        .spyOn(AccountService.prototype, 'isValidAccount')
        .mockImplementationOnce(() => true);

        const purchaseTicketsSpy = jest
        .spyOn(TicketService.prototype, 'purchaseTickets')
        .mockImplementationOnce(() => ({
            success: true,
            data: {
                totalPaid: 30,
                seatsAllocated: 5
            }
        }));

        // CALL
        await purchaseTickets(fakeRequest, fakeResponse, fakeNext)
        
        // EXPECT
        expect(isValidAccountSpy).toHaveBeenCalled()
        expect(purchaseTicketsSpy).toHaveBeenCalled();
    
        expect(fakeResponse.status).toHaveBeenCalledWith(200)
        expect(fakeResponse.json).toHaveBeenCalledWith({
            success: true,
            data: {
                seatsAllocated: 5,
                totalPaid: 30
            }})
        expect(fakeNext).not.toHaveBeenCalled();
    })

    it("should call next function when a service error is thrown", async () => {
        // SETUP
        const fakeRequest = {
            body: {
                account: {
                    id: 1
                },
                tickets: {
                    infant: 1,
                    child: 1,
                    adult: 2
                }
            }
        }

        const isValidAccountSpy = jest
        .spyOn(AccountService.prototype, 'isValidAccount')
        .mockImplementationOnce(() => true);

        const purchaseTicketsSpy = jest
        .spyOn(TicketService.prototype, 'purchaseTickets')  
        .mockImplementationOnce(() => {
            throw new Error('some error')
        });

        // CALL
        await purchaseTickets(fakeRequest, fakeResponse, fakeNext)

        // EXPECT
        expect(isValidAccountSpy).toHaveBeenCalled()
        expect(purchaseTicketsSpy).toHaveBeenCalled();

        expect(fakeNext).toHaveBeenCalledWith(new Error('some error'));
        expect(fakeResponse.status).not.toHaveBeenCalled();
    })

    it("should throw an InvalidPurchaseException when the account id is not greater than or equal to 0", async () => {
        // SETUP
        const fakeRequest = {
            body: {
                account: {
                    id: 1
                },
                tickets: {
                    infant: 1,
                    child: 1,
                    adult: 2
                }
            }
        }

        const isValidAccountSpy = jest
        .spyOn(AccountService.prototype, 'isValidAccount')
        .mockImplementationOnce(() => false);
        
        // CALL
        await purchaseTickets(fakeRequest, fakeResponse, fakeNext)

        // EXPECT
        expect(isValidAccountSpy).toHaveBeenCalled()

        expect(fakeNext).toHaveBeenCalledWith(new Error('Account id is not valid'));
        expect(fakeResponse.status).not.toHaveBeenCalled();
    })
})