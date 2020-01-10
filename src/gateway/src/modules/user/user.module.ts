import 'graphql-import-node';
import { GraphQLModule } from '@graphql-modules/core';
import * as typeDefs from './user.graphql';
import resolvers from './user.resolvers';

export const UserModule = new GraphQLModule({
  typeDefs,
  resolvers
});