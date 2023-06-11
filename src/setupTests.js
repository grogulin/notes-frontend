// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  // Request handlers
  rest.post('http://localhost:3000/login', (req, res, ctx) => {
    return res(
      ctx.status(401),
      ctx.json({ message: 'Invalid username or password.' })
    );
  }),

  rest.post('http://localhost:3000/registration', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ message: 'Success' })
    );
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
