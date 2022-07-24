export default class AccountService {
    isValidAccount(accountId) {
        return Number.isInteger(accountId) && accountId >= 0
    }
}