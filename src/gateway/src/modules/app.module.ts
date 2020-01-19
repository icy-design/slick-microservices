import { GraphQLModule } from '@graphql-modules/core';
import { UserModule } from './user';
import { CartModule } from './cart';
import { CurrencyModule } from './currency';
import { ProductCatalogModule } from './productcatalog';
import { RecommendationModule } from './recommendation';
import { ShippingModule } from './shipping';

export const appModule = new GraphQLModule({
  name: 'app',
  imports: [
    UserModule,
    CartModule,
    CurrencyModule,
    ProductCatalogModule,
    RecommendationModule,
    ShippingModule
  ]
});