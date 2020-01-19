import 'graphql-import-node';
import { GraphQLModule } from '@graphql-modules/core';
import { UserModule } from '../user';
import * as typeDefs from './shipping.graphql';
import { ShippingProvider } from './shipping.provider';
import { AuthProvider } from '../user/auth.provider';

const resolvers = {
  Query: {
    getQuote: async (_, { address, items }, { injector }) => {
      const currentUser = await injector.get(AuthProvider).currentUser();

      if (!currentUser) return null;

      return injector.get(ShippingProvider).getQuote(address, items);
    },
  },
  Mutation: {
    shipOrder: async (_, { address, items }, { injector }) => {
      const currentUser = await injector.get(AuthProvider).currentUser();

      if (!currentUser) return null;

      return injector.get(ShippingProvider).shipOrder(address, items);
    },
  }
};

export const ShippingModule = new GraphQLModule({
  name: 'shipping',
  imports: [UserModule],
  typeDefs,
  resolvers,
  providers: [ShippingProvider]
});