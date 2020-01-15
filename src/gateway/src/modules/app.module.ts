import { GraphQLModule } from '@graphql-modules/core';
import { UserModule } from './user';
import { CartModule } from './cart';
import { ProductCatalogModule } from './productcatalog';

export const appModule = new GraphQLModule({
  name: 'app',
  imports: [
    UserModule,
    CartModule,
    ProductCatalogModule
  ]
});