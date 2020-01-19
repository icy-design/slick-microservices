import 'graphql-import-node';
import { GraphQLModule } from '@graphql-modules/core';
import * as typeDefs from './advertise.graphql';
import { AdProvider } from './advertise.provider';

const resolvers = {
  Query: {
    ads: async (_, { contextKeys }, { injector }) => {
      return injector.get(AdProvider).getAds(contextKeys);
    }
  }
};

export const AdModule = new GraphQLModule({
  name: 'advertise',
  typeDefs,
  resolvers,
  providers: [AdProvider]
});