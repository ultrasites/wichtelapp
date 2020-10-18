import { IsNotEmpty } from 'class-validator';

export class IsPresenterDTO {
  @IsNotEmpty()
  facebookId: number;
}
