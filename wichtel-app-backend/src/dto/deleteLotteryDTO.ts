import { IsNotEmpty } from 'class-validator';

export class DeleteLotteryDTO {
  @IsNotEmpty()
  facebookId: number;
}
