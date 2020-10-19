import { IsNotEmpty } from 'class-validator';
import { ChristmasPartyEvent } from '../model/christmasPartyEvent.model';

export class SettingsDTO {
  @IsNotEmpty()
  firstScreenText: string;

  @IsNotEmpty()
  secondScreenText: string;

  secondScreenAdditionalText?: string;

  christmasPartyEvent?: ChristmasPartyEvent;
}
