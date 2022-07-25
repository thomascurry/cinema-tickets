
import supertest from 'supertest';
import app from '../../../src/app.js';

const request = supertest(app);

describe('An unresolvable route', () => {
  it('should return a not found error', async () => {
    const response = await request
      .get('/fakeUrl')
      
    expect(response.status).toBe(404);
  });
});

describe('POST .../tickets', () => {
  it('should respond successfully given a valid body', async () => {
    const validBody = {
      "account": {
          "id": 10
      },
      "tickets": {
          "infant": 1,
          "child": 3,
          "adult": 2
      }
    }
    const response = await request
    .post('/api/v1/tickets')
    .send(validBody)

    expect(response.status).toBe(200);

    })

    it('should respond with a bad request given an invalid body', async () => {
      const invalidBody = {
        "account": {
        },
        "tickets": {
            "infant": 1,
            "child": 3,
            "adult": 2
        }
      }
      const response = await request
      .post('/api/v1/tickets')
      .send(invalidBody)
  
      expect(response.status).toBe(200);
  
      })
});



