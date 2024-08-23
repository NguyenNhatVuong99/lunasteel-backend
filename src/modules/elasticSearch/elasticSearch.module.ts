import { Module } from '@nestjs/common';
import { MyElasticsearchController } from './elasticSearch.controller';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { MyElasticsearchService } from './elasticSearch.service';

@Module({
  imports: [
    ElasticsearchModule.register({
      node: 'https://localhost:9200',
    }),
  ],
  controllers:[MyElasticsearchController],
  providers: [MyElasticsearchService],
  exports: [ElasticsearchModule],
})
export class ElasticSearchModule {}