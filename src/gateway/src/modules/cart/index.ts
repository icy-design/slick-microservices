import 'graphql-import-node';
import { GraphQLModule } from '@graphql-modules/core';
import * as typeDefs from './cart.graphql';
import resolvers from './cart.resolvers';
import { CartProvider } from './cart.provider';

export const CartModule = new GraphQLModule({
  typeDefs,

  resolvers,
  providers: [CartProvider]
});