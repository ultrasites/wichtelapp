import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/admin/:facebookId')
  async getIsAdmin(@Param() params): Promise<boolean> {
    return this.appService.isAdmin(params.facebookId);
  }
}
