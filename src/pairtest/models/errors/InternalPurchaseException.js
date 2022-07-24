import StatusCodes, { getReasonPhrase } from 'http-status-codes'

export default class InternalPurchaseException extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.status = StatusCodes.INTERNAL_SERVER_ERROR;
        this.code = getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR);
      }
}