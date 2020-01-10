import { GraphQLModule } from '@graphql-modules/core';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CartModule } from './cart/cart.module';
import { ProductCatalogModule } from './productcatalog/productcatalog.module';

export const AppModule = new GraphQLModule({
  imports: [
    AuthModule,
    UserModule,
    CartModule,
    ProductCatalogModule
  ]
});