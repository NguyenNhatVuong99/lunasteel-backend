import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class MyElasticsearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async createIndex(index: string) {
    return this.elasticsearchService.indices.create({
      index,
    });
  }

  async indexData(index: string, id: string, body: any) {
    return this.elasticsearchService.index({
      index,
      id,
      body,
    });
  }

  async search( query: any) {
    const result = await this.elasticsearchService.search(query)
    return result.hits.hits
  }
}
