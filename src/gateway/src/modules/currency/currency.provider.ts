import GRPCDataSource from 'apollo-datasource-grpc';
import { Injectable, ProviderScope } from '@graphql-modules/di';
import * as grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';

const packageDefinition: any = protoLoader.loadSync(`${__dirname}/../../../proto/demo.proto`, { longs: Number });
const hipstershop: any = grpc.loadPackageDefinition(packageDefinition).hipstershop;
const client = new hipstershop.CurrencyService(process.env.CURRENCY_SERVICE_ADDR, grpc.credentials.createInsecure());

@Injectable({
  scope: ProviderScope.Session
})
export class CurrencyProvider extends GRPCDataSource {
  constructor() {
    super();
    this.client = client;
  }

  async getCurrencies() {
    const meta = new grpc.Metadata();
    const response = await this.callRPC(0, { args: { }, meta, rpcName: 'GetSupportedCurrencies' });
    return response.currencyCodes || [];
  }

  async convertCurrency(from, toCode) {
    const meta = new grpc.Metadata();
    const response = await this.callRPC(0, { args: { from, toCode }, meta, rpcName: 'Convert' });
    return response;
  }
}
