import 'graphql-import-node';
import { GraphQLModule } from '@graphql-modules/core';
import { AuthModule } from '../auth/auth.module';
import * as typeDefs from './cart.graphql';
import resolvers from './cart.resolvers';
import { CartProvider } from './cart.provider';

export const CartModule = new GraphQLModule({
  name: 'carts',
  imports: [AuthModule], // AuthModule for currentUser in the context
  typeDefs,
  resolvers,
  providers: [CartProvider]
});