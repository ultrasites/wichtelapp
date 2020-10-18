import { IsNotEmpty } from 'class-validator';

export class DeleteUserDTO {
  @IsNotEmpty()
  facebookId: number;
}
