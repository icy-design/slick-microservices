import { CartProvider } from './cart.provider';

export default {
  Query: {
    carts: async (_, __, { injector }) => {
      return await injector.get(CartProvider).getCart();
    },
  },
  Mutation: {
    addItem: async (_, { productId, quantity }, { injector }) => {
      return await injector.get(CartProvider).getProduct(productId, quantity);
    },
    emptyCart: async (_, { }, { injector }) => {
      return await injector.get(CartProvider).emptyCart();
    },
  }
}