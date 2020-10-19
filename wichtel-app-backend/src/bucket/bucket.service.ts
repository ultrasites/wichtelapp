import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { getRepository } from 'typeorm';
import { CreateUserDTO } from '../dto/createUserDTO';
import { DeleteUserDTO } from '../dto/deleteUserDTO';

/**
 * BucketService
 */
@Injectable()
export class BucketService {
  async getAll(): Promise<User[]> {
    return await getRepository(User).find();
  }

  async isUserInBucket(facebookId: number) {
    const result = await getRepository(User).findOne({
      where: { facebookId: facebookId },
    });
    return result !== undefined;
  }

  async addUserInBucket(createUserDTO: CreateUserDTO) {
    const user: User = {
      facebookId: createUserDTO.facebookId,
      name: createUserDTO.name,
    };
    try {
      return await getRepository(User).save(user);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteUserInBucket(deleteUserDTO: DeleteUserDTO) {
    return await getRepository(User).delete({
      facebookId: deleteUserDTO.facebookId,
    });
  }
}
