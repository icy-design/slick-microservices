import GRPCDataSource from 'apollo-datasource-grpc';
import { Injectable, ProviderScope } from '@graphql-modules/di';
import * as grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';
import camelcaseKeys from 'camelcase-keys';

const packageDefinition: any = protoLoader.loadSync(`${__dirname}/../../../proto/demo.proto`, { longs: Number });
const hipstershop: any = grpc.loadPackageDefinition(packageDefinition).hipstershop;
const client = new hipstershop.ProductCatalogService(process.env.PRODUCT_CATALOG_SERVICE_ADDR, grpc.credentials.createInsecure());

@Injectable({
  scope: ProviderScope.Session
})
export class ProductCatalogProvider extends GRPCDataSource {
  constructor() {
    super();
    this.client = client;
  }

  async listProducts() {
    const meta = new grpc.Metadata();
    const response = await this.callRPC(0, { args: { }, meta, rpcName: 'ListProducts' });
    return Array.isArray(response.products)? response.products.map(camelcaseKeys) : [];
  }

  async getProduct(id: string) {
    const meta = new grpc.Metadata();
    const response = await this.callRPC(0, { args: { id }, meta, rpcName: 'GetProduct' });
    return camelcaseKeys(response);
  }

  async searchProducts(query: string) {
    const meta = new grpc.Metadata();
    const response = await this.callRPC(0, { args: { query }, meta, rpcName: 'SearchProducts' });
    return Array.isArray(response.results)? response.results.map(camelcaseKeys) : [];
  }
}
