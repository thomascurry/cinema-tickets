
import supertest from 'supertest';
import app from '../../../src/app';

const request = supertest(app);

// afterEach(() => app.close());

describe('An unresolvable route', () => {
  it('should return a not found error', (done) => {
    const response = request
      .get('/fakeUrl')
      .expect(404)
      .end(done)
      
    // expect(response.status).toBe(404);
  });
});

describe('POST .../tickets', () => {
  it('should respond successfully given a valid body',  (done) => {
    const response = request
      .post('/api/v1/tickets')
      .send({
        "account": {
            "id": 10
        },
        "tickets": {
            "infant": 1,
            "child": 3,
            "adult": 2
        }
      })
      .expect(200)
      .end(done)
    })

    // expect(response.status).toBe(200);
});



