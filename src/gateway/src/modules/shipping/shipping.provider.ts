import GRPCDataSource from 'apollo-datasource-grpc';
import { Injectable, ProviderScope } from '@graphql-modules/di';
import * as grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';

const packageDefinition: any = protoLoader.loadSync(`${__dirname}/../../../proto/demo.proto`, { longs: Number });
const hipstershop: any = grpc.loadPackageDefinition(packageDefinition).hipstershop;
const client = new hipstershop.ShippingService(process.env.SHIPPING_SERVICE_ADDR, grpc.credentials.createInsecure());

@Injectable({
  scope: ProviderScope.Session
})
export class ShippingProvider extends GRPCDataSource {
  constructor() {
    super();
    this.client = client;
  }

  async getQuote(address, items) {
    const meta = new grpc.Metadata();
    const response = await this.callRPC(0, { args: { address, items }, meta, rpcName: 'GetQuote' });
    return response.costUsd;
  }

  async shipOrder(address, items) {
    const meta = new grpc.Metadata();
    const response = await this.callRPC(0, { args: { address, items }, meta, rpcName: 'ShipOrder' });
    return response.trackingId;
  }
}
