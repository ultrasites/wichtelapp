import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  isAdmin(facebookId: number): boolean {
    return process.env.ADMIN_FACEBOOK_ID === facebookId.toString();
  }
}
