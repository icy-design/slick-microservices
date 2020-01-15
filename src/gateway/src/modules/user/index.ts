import 'graphql-import-node';
import { GraphQLModule } from '@graphql-modules/core';
import * as typeDefs from './user.graphql';
import { UserProvider } from './user.provider';
import { AuthProvider } from './auth.provider';

const resolvers = {
  Query: {
    me(_, __, { injector }) {
      return injector.get(AuthProvider).currentUser();
    },
    user(_, { id }, { injector }) {
      return injector.get(UserProvider).findById(id);
    }
  },
  Mutation: {
    async signIn(_, { username, password }, { injector }) {
      return injector.get(AuthProvider).signIn({ username, password });
    },
    async signUp(_, args, { injector }) {
      const { name, username, password, passwordConfirm } = args;
      return injector.get(AuthProvider)
        .signUp({ name, username, password, passwordConfirm });
    },
  },
};

export const UserModule = new GraphQLModule({
  name: 'users',
  typeDefs,
  resolvers,
  providers: [UserProvider, AuthProvider]
});