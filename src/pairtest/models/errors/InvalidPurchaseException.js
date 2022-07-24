import StatusCodes, { getReasonPhrase } from 'http-status-codes'

export default class InvalidPurchaseException extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.status = StatusCodes.BAD_REQUEST;
        this.code = getReasonPhrase(StatusCodes.BAD_REQUEST);
      }
}