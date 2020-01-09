import { GraphQLModule } from '@graphql-modules/core';
import { CartModule } from './cart';
import { ProductCatalogModule } from './productcatalog';

export const AppModule = new GraphQLModule({
  imports: [
    CartModule,
    ProductCatalogModule
  ]
});