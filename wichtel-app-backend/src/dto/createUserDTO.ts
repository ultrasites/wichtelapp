import { IsNotEmpty } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  facebookId: number;

  @IsNotEmpty()
  name: string;
}
