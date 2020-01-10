import GRPCDataSource from 'apollo-datasource-grpc';
import { Injectable, ProviderScope } from '@graphql-modules/di';
import * as grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';
import camelcaseKeys from 'camelcase-keys';

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

  async addItem(user_id: string, product_id: string, quantity: number) {
    const meta = new grpc.Metadata();
    const response = await this.callRPC(0, { args: { user_id, item: { product_id, quantity } }, meta, rpcName: 'AddItem' });
    return !!response;
  }

  async getCart(user_id: string) {
    const meta = new grpc.Metadata();
    const response = await this.callRPC(0, { args: { user_id }, meta, rpcName: 'getCart' });
    return Array.isArray(response.items)? response.items.map(camelcaseKeys) : [];
  }

  async emptyCart(user_id: string) {
    const meta = new grpc.Metadata();
    const response = await this.callRPC(0, { args: { user_id }, meta, rpcName: 'EmptyCart' });
    return !!response;
  }
}
