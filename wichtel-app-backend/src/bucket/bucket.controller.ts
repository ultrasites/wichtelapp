import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BucketService } from './bucket.service';
import { User } from '../entities/user.entity';
import { CreateUserDTO } from '../dto/createUserDTO';
import { DeleteUserDTO } from '../dto/deleteUserDTO';

/**
 * BucketController
 */
@Controller('bucket')
export class BucketController {
  constructor(private readonly bucketService: BucketService) {}

  @Get()
  async list(): Promise<User[]> {
    return await this.bucketService.getAll();
  }

  @Get('/check/:facebookId')
  async isInBucket(@Param() params): Promise<boolean> {
    return await this.bucketService.isUserInBucket(params.facebookId);
  }

  @Post()
  async addUserInBucket(@Body() createUserDTO: CreateUserDTO) {
    return await this.bucketService.addUserInBucket(createUserDTO);
  }

  @Delete()
  async deleteUserInBucket(@Body() deleteUserDTO: DeleteUserDTO) {
    return await this.bucketService.deleteUserInBucket(deleteUserDTO);
  }
}
