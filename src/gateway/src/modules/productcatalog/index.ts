import 'graphql-import-node';
import { GraphQLModule } from '@graphql-modules/core';
import * as typeDefs from './productcatalog.graphql';
import { ProductCatalogProvider } from './productcatalog.provider';

const resolvers = {
  Query: {
    products: async (_, __, { injector }) => {
      return injector.get(ProductCatalogProvider).listProducts();
    },
    product: async (_, { id }, { injector }) => {
      return injector.get(ProductCatalogProvider).getProduct(id);
    },
    searchProduct: async (_, { query }, { injector }) => {
      return injector.get(ProductCatalogProvider).searchProducts(query);
    },
  },
  Product: {
    id: product => product.id
  }
};

export const ProductCatalogModule = new GraphQLModule({
  typeDefs,
  resolvers,
  providers: [ProductCatalogProvider]
});