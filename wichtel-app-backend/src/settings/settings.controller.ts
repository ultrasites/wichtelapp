import { Body, Controller, Get, Put } from '@nestjs/common';
import { Settings } from '../entities/settings.entity';
import { SettingsService } from './settings.service';
import { SettingsDTO } from '../dto/settingsDTO';

/**
 * SettingsController
 */
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  async list(): Promise<Settings[]> {
    return await this.settingsService.getAll();
  }

  @Put()
  async addOrUpdateSettings(@Body() settingsDTO: SettingsDTO) {
    return await this.settingsService.addOrUpdateSettings(settingsDTO);
  }
}
