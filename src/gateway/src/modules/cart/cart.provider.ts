import GRPCDataSource from 'apollo-datasource-grpc';
import { Injectable, ProviderScope } from '@graphql-modules/di';
import * as grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';

const packageDefinition: any = protoLoader.loadSync(`${__dirname}/../../../proto/demo.proto`, { longs: Number });
const hipstershop: any = grpc.loadPackageDefinition(packageDefinition).hipstershop;
const client = new hipstershop.CartService(process.env.CART_SERVICE_ADDR, grpc.credentials.createInsecure());

@Injectable({
  scope: ProviderScope.Session
})
export class CartProvider extends GRPCDataSource {
  constructor() {
    super();
    this.client = client;
  }

  async addItem(userId: string, productId: string, quantity: number) {
    const meta = new grpc.Metadata();
    const response = await this.callRPC(0, { args: { userId, item: { productId, quantity } }, meta, rpcName: 'AddItem' });
    return !!response;
  }

  async getCart(userId: string) {
    const meta = new grpc.Metadata();
    const response = await this.callRPC(0, { args: { userId }, meta, rpcName: 'GetCart' });
    return {
      ...response,
      items: response.items || []
    };
  }

  async emptyCart(userId: string) {
    const meta = new grpc.Metadata();
    const response = await this.callRPC(0, { args: { userId }, meta, rpcName: 'EmptyCart' });
    return !!response;
  }
}
