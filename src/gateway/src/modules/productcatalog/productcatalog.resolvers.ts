import { ProductCatalogProvider } from './productcatalog.provider';

export default {
  Query: {
    products: async (_, __, { injector }) => {
      return await injector.get(ProductCatalogProvider).listProducts();
    },
    product: async (_, { id }, { injector }) => {
      return await injector.get(ProductCatalogProvider).getProduct(id);
    },
    searchProduct: async (_, { query }, { injector }) => {
      return await injector.get(ProductCatalogProvider).searchProducts(query);
    },
  },
  Product: {
    id: product => product._id || product.id
  }
}