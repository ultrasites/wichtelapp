import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { Settings } from '../entities/settings.entity';
import { SettingsDTO } from '../dto/settingsDTO';
import { SettingEventKey, SettingsKey } from './settings.utils';

@Injectable()
export class SettingsService {
  async getAll(): Promise<Settings[]> {
    return await getRepository(Settings).find();
  }

  async addOrUpdateSettings(settingsDTO: SettingsDTO) {
    const settings: Settings[] = this._mapDTOtoSettings(settingsDTO);

    try {
      return await getRepository(Settings).save(settings);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  _mapDTOtoSettings(settingsDTO: SettingsDTO): Settings[] {
    const settings: Settings[] = [];

    if (settingsDTO.christmasPartyEvent) {
      Object.values(SettingEventKey).map(key => {
        if (key === SettingEventKey.EVENTTITLE) {
          settings.push({
            key,
            value: settingsDTO.christmasPartyEvent.title,
          });
        }

        if (key === SettingEventKey.EVENTDATE) {
          settings.push({
            key,
            value: settingsDTO.christmasPartyEvent.startDate,
          });
        }

        if (key === SettingEventKey.EVENTLOCATION) {
          settings.push({
            key,
            value: settingsDTO.christmasPartyEvent.location,
          });
        }

        if (key === SettingEventKey.EVENTTIME) {
          settings.push({
            key,
            value: settingsDTO.christmasPartyEvent.startTime,
          });
        }
      });
    }

    settings.push({
      key: SettingsKey.FIRSTSCREENTEXT,
      value: settingsDTO.firstScreenText,
    });

    settings.push({
      key: SettingsKey.SECONDSCREENTEXT,
      value: settingsDTO.secondScreenText,
    });

    if (settingsDTO.secondScreenAdditionalText) {
      settings.push({
        key: SettingsKey.SECONDSCREENADDITIONALTEXT,
        value: settingsDTO.secondScreenAdditionalText,
      });
    }

    return settings;
  }
}
