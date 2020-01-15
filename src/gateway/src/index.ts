import 'reflect-metadata';
import express from 'express';
import cookieParser from 'cookie-parser';
import { ApolloServer } from 'apollo-server-express';
import { getLogger } from 'log4js';
import { exampleQueries } from './queries';
import * as playground from 'graphql-playground-middleware-express';
import { express as voyagerMiddleware } from 'graphql-voyager/middleware';
import { appModule } from './modules/app.module';
import cookie from 'cookie';

const logger = getLogger('index');
logger.level = 'debug';

const PORT = process.env['PORT'] || 3000;
const GRAPHQL_PATH = '/graphql';
const PLAYGROUND_PATH = '/playground';

const app = express();

app.get(
  `${PLAYGROUND_PATH}`,
  playground.default({
    endpoint: `${GRAPHQL_PATH}`,
    tabs: exampleQueries(GRAPHQL_PATH),
  }),
);

app.use(cookieParser());
app.use('/voyager', voyagerMiddleware({ endpointUrl: `${GRAPHQL_PATH}` }));

const server = new ApolloServer({
  modules: [appModule],
  context: session => {
    if (session.connection) {
      const req = session.connection.context.session.request;
      const cookies = req.headers.cookie;

      if (cookies) {
        req.cookies = cookie.parse(cookies);
      }
    }
    return appModule.context(session);
  },
  subscriptions: appModule.subscriptions,
});
server.applyMiddleware({ app, path: `${GRAPHQL_PATH}` });

app.listen({ port: PORT }, () => {
  logger.info(`
    🚀
    Gateway ready at http://localhost:${PORT}${server.graphqlPath}
    Access playground with query examples at http://localhost:${PORT}${PLAYGROUND_PATH}
    🤘
  `);
});
