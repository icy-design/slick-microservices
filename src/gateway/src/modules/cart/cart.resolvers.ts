import { CartProvider } from './cart.provider';

export default {
  Query: {
    carts: async (_, __, ctx) => {
      const { userId, injector } = ctx;
      return injector.get(CartProvider).getCart(userId);
    },
  },
  Mutation: {
    addItem: async (_, args, ctx) => {
      const { productId, quantity } = args;
      const { userId, injector } = ctx;
      return injector.get(CartProvider).addItem(userId, productId, quantity);
    },
    emptyCart: async (_, __, ctx) => {
      const { userId, injector } = ctx;
      return injector.get(CartProvider).emptyCart(userId);
    },
  }
}