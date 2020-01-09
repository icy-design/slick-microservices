import { GraphQLModule } from '@graphql-modules/core';
import { ProductCatalogModule } from './productcatalog';

export const AppModule = new GraphQLModule({
  imports: [ProductCatalogModule]
});