import GRPCDataSource from 'apollo-datasource-grpc';
import { Injectable, ProviderScope } from '@graphql-modules/di';
import * as grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';

const packageDefinition: any = protoLoader.loadSync(`${__dirname}/../../../proto/demo.proto`, { longs: Number });
const hipstershop: any = grpc.loadPackageDefinition(packageDefinition).hipstershop;
const client = new hipstershop.CheckoutService(process.env.CHECKOUT_SERVICE_ADDR, grpc.credentials.createInsecure());

@Injectable({
  scope: ProviderScope.Session
})
export class CheckoutProvider extends GRPCDataSource {
  constructor() {
    super();
    this.client = client;
  }

  async placeOrder(userId, userCurrency, email, creditCard, address) {
    const meta = new grpc.Metadata();
    creditCard = {
      creditCardNumber: creditCard.cardNumber,
      creditCardCvv: creditCard.cardCvv,
      creditCardExpirationYear: creditCard.expirationYear,
      creditCardExpirationMonth: creditCard.expirationMonth,
    }
    const response = await this.callRPC(0, { args: {
      userId, userCurrency, email, creditCard, address
    }, meta, rpcName: 'PlaceOrder' });
    return response.order;
  }
}
