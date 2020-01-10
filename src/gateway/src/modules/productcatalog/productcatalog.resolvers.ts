import { ProductCatalogProvider } from './productcatalog.provider';

export default {
  Query: {
    products: async (_, __, ctx) => {
      const { injector } = ctx;
      return injector.get(ProductCatalogProvider).listProducts();
    },
    product: async (_, args, ctx) => {
      const { id } = args;
      const { injector } = ctx;
      return injector.get(ProductCatalogProvider).getProduct(id);
    },
    searchProduct: async (_, args, ctx) => {
      const { query } = args;
      const { injector } = ctx;
      return injector.get(ProductCatalogProvider).searchProducts(query);
    },
  },
  Product: {
    id: product => product.id
  }
}