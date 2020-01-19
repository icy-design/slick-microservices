import 'graphql-import-node';
import { GraphQLModule } from '@graphql-modules/core';
import { UserModule } from '../user';
import * as typeDefs from './recommendation.graphql';
import { RecommendationProvider } from './recommendation.provider';
import { ProductCatalogProvider } from './../productcatalog/productcatalog.provider';
import { AuthProvider } from '../user/auth.provider';

const resolvers = {
  Query: {
    recommendations: async (_, { productIds }, { injector }) => {
      const currentUser = await injector.get(AuthProvider).currentUser();

      if (!currentUser) return [];

      const recommendationIds = await injector.get(RecommendationProvider).listRecommendations(currentUser.id, productIds);
      if (recommendationIds.length > 0) {
        return recommendationIds.map(async (id) =>
          injector.get(ProductCatalogProvider).getProduct(id)
        );
      }
      return [];
    },
  }
};

export const RecommendationModule = new GraphQLModule({
  name: 'recommendation',
  imports: [UserModule],
  typeDefs,
  resolvers,
  providers: [RecommendationProvider, ProductCatalogProvider]
});