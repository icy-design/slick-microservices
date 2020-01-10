import 'graphql-import-node';
import { GraphQLModule } from '@graphql-modules/core';
import * as typeDefs from './auth.graphql';
import resolvers from './auth.resolvers';
import { UserModule } from '../user/user.module';
import { context } from '../context';

export const AuthModule = new GraphQLModule({
  typeDefs,
  resolvers,
  imports: [UserModule],
  context
});