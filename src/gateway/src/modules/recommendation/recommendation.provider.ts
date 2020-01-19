import GRPCDataSource from 'apollo-datasource-grpc';
import { Injectable, ProviderScope } from '@graphql-modules/di';
import * as grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';

const packageDefinition: any = protoLoader.loadSync(`${__dirname}/../../../proto/demo.proto`, { longs: Number });
const hipstershop: any = grpc.loadPackageDefinition(packageDefinition).hipstershop;
const client = new hipstershop.RecommendationService(process.env.RECOMMENDATION_SERVICE_ADDR, grpc.credentials.createInsecure());

@Injectable({
  scope: ProviderScope.Session
})
export class RecommendationProvider extends GRPCDataSource {
  constructor() {
    super();
    this.client = client;
  }

  async listRecommendations() {
    const meta = new grpc.Metadata();
    const response = await this.callRPC(0, { args: { }, meta, rpcName: 'ListRecommendations' });
    return response.productIds || [];
  }
}
