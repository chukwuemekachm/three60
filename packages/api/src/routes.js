import { Router } from 'express'

const routes = Router();

routes.get('/', (_, response) =>
  response.status(200).json({
    status: 'success',
    message: 'Welcome to three60 API, please use the graphql endpoint on /graphql'
  })
);

routes.all('*', (_, response) =>
  response.status(404).json({
    status: 'fail',
    message: 'Route unavailable',
  }),
);

export default routes;
