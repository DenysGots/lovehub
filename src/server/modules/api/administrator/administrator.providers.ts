import { User } from '../users/user.entity';
import { UserProfile } from '../users-profile/user-profile.entity';
import { MailService } from '../services/mail.service';

export const AdministratorProviders = [
  {
    provide: 'UsersRepository',
    useValue: User
  },
  {
    provide: 'UsersProfileRepository',
    useValue: UserProfile
  },
  {
    provide: 'MailService',
    useValue: MailService
  }
];
