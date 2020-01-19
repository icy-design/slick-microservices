import { GraphQLModule } from '@graphql-modules/core';
import { AdModule } from './advertise';
import { CartModule } from './cart';
import { CheckoutModule } from './checkout';
import { CurrencyModule } from './currency';
import { ProductCatalogModule } from './productcatalog';
import { RecommendationModule } from './recommendation';
import { ShippingModule } from './shipping';
import { UserModule } from './user';

export const appModule = new GraphQLModule({
  name: 'app',
  imports: [
    AdModule,
    CartModule,
    CheckoutModule,
    CurrencyModule,
    ProductCatalogModule,
    RecommendationModule,
    ShippingModule,
    UserModule,
  ]
});