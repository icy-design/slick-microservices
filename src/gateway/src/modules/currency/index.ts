import 'graphql-import-node';
import { GraphQLModule } from '@graphql-modules/core';
import * as typeDefs from './currency.graphql';
import { CurrencyProvider } from './currency.provider';

const resolvers = {
  Query: {
    getCurrencies: async (_, __, { injector }) => {
      return injector.get(CurrencyProvider).getCurrencies();
    },
    convertCurrency: async (_, { from, toCode }, { injector }) => {
      return injector.get(CurrencyProvider).convertCurrency(from, toCode);
    },
  }
};

export const CurrencyModule = new GraphQLModule({
  name: 'currency',
  typeDefs,
  resolvers,
  providers: [CurrencyProvider]
});