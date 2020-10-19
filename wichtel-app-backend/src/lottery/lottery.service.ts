import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Lottery } from '../entities/lottery.entity';

/**
 * LotteryService
 */
@Injectable()
export class LotteryService {
  /**
   * It starts the lottery
   *
   * An array of {@link User} will be randomized. Furthermore it iterates over the new array to map to a new {@link Lottery} entity.
   */
  async startLottery() {
    let users: User[] = await getRepository(User).find();
    const randomSortedUsers: User[] = [];

    if (users.length === 0) {
      throw new HttpException('The lottery pot is empty', HttpStatus.NOT_FOUND);
    }

    while (users.length !== 0) {
      const randomNumber = Math.floor(Math.random() * (users.length - 1 + 1));
      randomSortedUsers.push(users[randomNumber]);
      users = users.filter((_bucket, idx) => idx !== randomNumber);
    }

    const repository = getRepository(Lottery);
    await repository.save(this._mapToLottery(randomSortedUsers));
  }

  async loadPresenter(facebookId: number): Promise<User> {
    const lotteryRepository = getRepository(Lottery);
    const userRepository = getRepository(User);

    const presenterId: Lottery = await lotteryRepository.findOne({
      where: { facebookIdFirst: facebookId },
    });
    return await userRepository.findOne({
      where: { facebookId: presenterId.facebookIdSecond },
    });
  }

  async isLotterySaved() {
    const countOfLottery = await getRepository(Lottery).count();
    return countOfLottery > 0;
  }

  _mapToLottery(randomSortedUsers: User[]): Lottery[] {
    const lottery: Lottery[] = [];

    randomSortedUsers.map((_sortedUser, index) => {
      const lotteryItem: Lottery = new Lottery();
      if (index === randomSortedUsers.length - 1) {
        lotteryItem.facebookIdFirst = randomSortedUsers[index].facebookId;
        lotteryItem.facebookIdSecond = randomSortedUsers[0].facebookId;
      } else {
        lotteryItem.facebookIdFirst = randomSortedUsers[index].facebookId;
        lotteryItem.facebookIdSecond = randomSortedUsers[index + 1].facebookId;
      }

      lottery.push(lotteryItem);
    });
    return lottery;
  }

  async deleteLottery() {
    const repository = getRepository(Lottery);
    await repository.clear();
  }
}
