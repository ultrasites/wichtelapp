import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { LotteryService } from './lottery.service';
import { StartLotteryDTO } from '../dto/startLotteryDTO';
import { AppService } from '../app.service';
import { IsPresenterDTO } from '../dto/isPresenterDTO';
import { DeleteLotteryDTO } from '../dto/deleteLotteryDTO';

/**
 * LotteryController
 */
@Controller('lottery')
export class LotteryController {
  constructor(
    private readonly lotteryService: LotteryService,
    private readonly appService: AppService,
  ) {}

  @Get('/presenter')
  async getPresenter(@Body() isPresenterDTO: IsPresenterDTO) {
    return this.lotteryService.loadPresenter(isPresenterDTO.facebookId);
  }

  @Get('/saved')
  async isLotterySaved() {
    return this.lotteryService.isLotterySaved();
  }

  @Post('/start')
  async startLottery(@Body() startLotteryDTO: StartLotteryDTO) {
    if (!this.appService.isAdmin(startLotteryDTO.facebookId)) {
      throw new HttpException(
        "You don't have permissions to start the lottery",
        HttpStatus.UNAUTHORIZED,
      );
    }

    await this.lotteryService.startLottery();
  }

  @Delete()
  async deleteLottery(@Body() deleteLotteryDTO: DeleteLotteryDTO) {
    if (!this.appService.isAdmin(deleteLotteryDTO.facebookId)) {
      throw new HttpException(
        "You don't have permissions to start the lottery",
        HttpStatus.UNAUTHORIZED,
      );
    }

    await this.lotteryService.deleteLottery();
  }
}
