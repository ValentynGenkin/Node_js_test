import app from '../app';
import supertest from 'supertest';

const request = supertest(app);

describe('GET /movie', () => {
  it('Should return status code 200 and movie list', async () => {
    const response = await request.get('/movie');

    checkStatusAndType(response, 200, 'application/json');
  });

  it('GET /movie/:id, should return status code 200 and found movie if movie already exist', async () => {
    const testId = 'd7504fc0-a46d-4e99-8d0d-38b603788473';

    const response = await request.get(`/movie/${testId}`);

    checkStatusAndType(response, 200, 'application/json');

    expect(response.body).toEqual([
      {
        id: testId,
        title: expect.any(String),
        director: expect.any(String),
        release_date: expect.any(String),
      },
    ]);
  });

  it('Should return status code 400 if ID length < 36', async () => {
    const testId = 'd7504fc0-a46d-4e99-8d0d-38b60378847';

    const response = await request.get(`/movie/${testId}`);

    checkStatusAndType(response, 400, 'application/json');
    expect(response.body).toEqual({ msg: 'Invalid ID' });
  });

  it('Should return status code 404 and msg if movie not found', async () => {
    const testId = 'd7504fc0-1111-4e99-0000-38b603788471';

    const response = await request.get(`/movie/${testId}`);

    checkStatusAndType(response, 404, 'application/json');
    expect(response.body).toEqual({ msg: `Movie with id ${testId} not found` });
  });
});

describe('POST /movie/:id', () => {
  it('should return status code 200 and add new movie to the list', async () => {
    const testData = {
      title: 'test',
      director: 'test',
      release_date: '2023-12-12',
    };

    const response = await request.post('/movie').send(testData);

    checkStatusAndType(response, 201, 'application/json');
    expect(response.body.msg).toMatch(
      new RegExp(`Movie '${testData.title}' added with id - .+`),
    );
  });

  it('should return status code 409 if movie already in list', async () => {
    const testData = {
      id: 'a84e6a03-9ce1-4909-9ff8-3fd456588583',
      title: 'Forrest Gump',
      director: 'Robert Zemeckis',
      release_date: '1994-07-06',
    };

    const response = await request.post('/movie').send(testData);

    checkStatusAndType(response, 409, 'application/json');

    expect(response.body).toEqual({
      msg: `Movie with title '${testData.title}' already exist`,
    });
  });
});

describe('DELETE /movie/:id', () => {
  it('should delete exist movie and return status code 200 and msg', async () => {
    const testId = 'a84e6a03-9ce1-4909-9ff8-3fd456588583';

    const response = await request.delete(`/movie/${testId}`);

    checkStatusAndType(response, 200, 'application/json');
    expect(response.body.msg).toMatch(new RegExp(`Movie with id .+ deleted`));
  });

  it('should return status code 404 and msg if movie not found', async () => {
    const testId = 'a84e6a03-9ce1-4909-0000-3fd456588583';

    const response = await request.delete(`/movie/${testId}`);

    checkStatusAndType(response, 404, 'application/json');
    expect(response.body).toEqual({ msg: `Movie with id ${testId} not found` });
  });
});

describe('Using not exist routes or methods', () => {
  it('should return status code 404 if try to get not exist route', async () => {
    const response = await request.get('/wrongUrl');
    checkStatusAndType(response, 404, 'application/json');
  });
  it('should return status code 404 if try to use not exist HTTP method', async () => {
    const response = await request.patch('/movie');
    checkStatusAndType(response, 404, 'application/json');
  });
});

const checkStatusAndType = (response, code, contentType) => {
  expect(response.status).toBe(code);
  expect(response.type).toBe(contentType);
};
