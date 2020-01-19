import 'graphql-import-node';
import { GraphQLModule } from '@graphql-modules/core';
import { UserModule } from '../user';
import * as typeDefs from './checkout.graphql';
import { CheckoutProvider } from './checkout.provider';
import { AuthProvider } from '../user/auth.provider';

const resolvers = {
  Mutation: {
    placeOrder: async (_, { userCurrency, email, creditCard, address }, { injector }) => {
      const currentUser = await injector.get(AuthProvider).currentUser();

      if (!currentUser) return false;

      return injector.get(CheckoutProvider).placeOrder(currentUser.id, userCurrency, email, creditCard, address);
    }
  }
};

export const CheckoutModule = new GraphQLModule({
  name: 'checkout',
  imports: [UserModule],
  typeDefs,
  resolvers,
  providers: [CheckoutProvider]
});