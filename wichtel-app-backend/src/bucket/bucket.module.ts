import { Module } from '@nestjs/common';
import { BucketController } from './bucket.controller';
import { BucketService } from './bucket.service';

@Module({
  imports: [],
  controllers: [BucketController],
  providers: [BucketService],
  exports: [BucketService],
})
export class BucketModule {}
