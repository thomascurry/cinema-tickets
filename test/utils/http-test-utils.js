import { jest } from '@jest/globals';

const fakeResponse = {
    send: jest.fn(),
};
  
const fakeNext = jest.fn();
  
global.beforeEach(() => {
    fakeResponse.status = jest.fn().mockReturnValue(fakeResponse);
    fakeResponse.json = jest.fn().mockReturnValue(fakeResponse);
});
  
export { fakeResponse, fakeNext };
  