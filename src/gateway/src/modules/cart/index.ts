import 'graphql-import-node';
import { GraphQLModule } from '@graphql-modules/core';
import { UserModule } from '../user';
import * as typeDefs from './cart.graphql';
import { CartProvider } from './cart.provider';
import { ProductCatalogProvider } from './../productcatalog/productcatalog.provider';
import { AuthProvider } from '../user/auth.provider';

const resolvers = {
  Query: {
    cart: async (_, __, { injector }) => {
      const currentUser = await injector.get(AuthProvider).currentUser();

      if (!currentUser) return [];

      return injector.get(CartProvider).getCart(currentUser.id);
    },
  },
  CartItem: {
    product: async ({ productId }, __, { injector }) => {
      return injector.get(ProductCatalogProvider).getProduct(productId);
    }
  },
  Mutation: {
    addItem: async (_, { productId, quantity }, { injector }) => {
      const currentUser = await injector.get(AuthProvider).currentUser();

      if (!currentUser) return false;

      return injector.get(CartProvider).addItem(currentUser.id, productId, quantity);
    },
    emptyCart: async (_, __, { injector }) => {
      const currentUser = await injector.get(AuthProvider).currentUser();

      if (!currentUser) return false;

      return injector.get(CartProvider).emptyCart(currentUser.id);
    },
  }
};

export const CartModule = new GraphQLModule({
  name: 'carts',
  imports: [UserModule],
  typeDefs,
  resolvers,
  providers: [CartProvider, ProductCatalogProvider]
});