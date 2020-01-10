import 'graphql-import-node';
import { GraphQLModule } from '@graphql-modules/core';
import * as typeDefs from './productcatalog.graphql';
import resolvers from './productcatalog.resolvers';
import { ProductCatalogProvider } from './productcatalog.provider';

export const ProductCatalogModule = new GraphQLModule({
  typeDefs,
  resolvers,
  providers: [ProductCatalogProvider]
});