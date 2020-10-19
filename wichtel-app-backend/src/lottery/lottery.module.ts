import { Module } from '@nestjs/common';
import { LotteryController } from './lottery.controller';
import { LotteryService } from './lottery.service';
import { AppService } from '../app.service';

/**
 * LotteryModule
 */
@Module({
  imports: [AppService],
  controllers: [LotteryController],
  providers: [LotteryService, AppService],
  exports: [LotteryService],
})
export class LotteryModule {}
