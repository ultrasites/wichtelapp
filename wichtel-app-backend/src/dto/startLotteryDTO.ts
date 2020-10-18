import { IsNotEmpty } from 'class-validator';

export class StartLotteryDTO {
  @IsNotEmpty()
  facebookId: number;
}
