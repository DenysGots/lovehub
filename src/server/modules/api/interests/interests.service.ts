import { Component, Inject } from '@nestjs/common';

import { UserProfile } from '../users-profile/user-profile.entity';
import { UserProfileInterest } from '../users-profile/user-profile-interest.entity';
import { Interest } from '../users-profile/interest.entity';

import { usersInterests } from './mock-users-interests';   // For testing TODO: delete

interface ConnectedUser {
  clientId: string;
  userId: string;
}

@Component()
export class InterestsServiceComponent {
  currentUserInterests: any[] = [];
  connectedUsers: any[] = [];
  interests: any[] = [];
  // interests: any[] = usersInterests;       // For testing TODO: delete

  constructor(
    @Inject('UsersProfileRepository') private readonly userProfileRepository: typeof UserProfile,
    @Inject('UserProfileInterestRepository') private readonly userProfileInterestRepository: typeof UserProfileInterest,
    @Inject('InterestRepository') private readonly interestRepository: typeof Interest
  ) {
  }

  async getAllInterests() {
    // this.interests = usersInterests;       // For testing TODO: delete

    this.interests = [];

    return await this.interestRepository
      .findAll({ attributes: ['name'], raw: true })
      .then(result => {
        const interests = [];

        for (const elem of result) {
          for (const p in elem) {
            if (elem.hasOwnProperty(p)) {
              interests.push(elem[p]);
            }
          }
        }

        return this.interests = interests;
      });
  }

  async getInterests(client) {
    // const interests = this.interests;       // For testing TODO: delete
    const clientId = client.id;
    const connectedUsers = this.connectedUsers;
    const connectedUsersLength = connectedUsers.length;

    let currentUserId;

    for (let i = 0; i < connectedUsersLength; i += 1) {
      if (connectedUsers[i] && (connectedUsers[i].clientId === clientId)) {
        currentUserId = connectedUsers[i].userId;
        break;
      }
    }

    // for (let i = 0; i < interests.length; i += 1) {       // For testing TODO: delete
    //   if (interests[i].id === currentUserId) {
    //     this.currentUserInterests = interests[i].interests;
    //     break;
    //   }
    // }

    return await this.userProfileRepository
      .findAll({
        where: { userId: currentUserId },
        attributes: ['userId'],
        raw: true,
        include: [{
          model: this.interestRepository,
          through: {
            attributes: ['name']
          }
        }]
      })
      .then(result => {
        const currentUserInterests = [];

        for (const p of result) {
          currentUserInterests.push(p['authors.name']);
        }

        return this.currentUserInterests = currentUserInterests;
      });
  }

  async changeInterests(client, interests) {
    const clientId = client.id;
    const connectedUsers = this.connectedUsers;
    const connectedUsersLength = connectedUsers.length;

    let currentUserId;

    for (let i = 0; i < connectedUsersLength; i += 1) {
      if (connectedUsers[i] && (connectedUsers[i].clientId === clientId)) {
        currentUserId = connectedUsers[i].userId;
        break;
      }
    }

    // for (let i = 0; i < this.interests.length; i += 1) {       // For testing TODO: delete
    //   if (this.interests[i].clientId === client.id) {
    //     this.interests[i].interests = interests;
    //     break;
    //   }
    // }

    for (const interest of interests.interestsToSave) {
      await this.interestRepository
          .findOrCreate({
            where: {name: interest},
            raw: true
          })
          .then(async result => {
            let interestId;

            if (result[0].id) {
              interestId = result[0].id;
            } else if (result[0].dataValues) {
              interestId = result[0].dataValues.id;
            }

            await this.userProfileInterestRepository
                .findOrCreate({
                  where: {
                    interestId: interestId,
                    userProfileId: currentUserId
                  }
                });
          });
    }

    for (const interest of interests.interestsToDelete) {
      await this.interestRepository
          .findOne({
            where: { name: interest },
            attributes: ['id'],
            raw: true
          })
          .then(async result => {
          const interestId = result.id;

          await this.userProfileInterestRepository
                .destroy({
                  where: {interestId: interestId}
                })
          });
    }
  }

  async createHints(userInput) {
    const interests = this.interests;
    const findConcurrences = new RegExp(`^${userInput}`, 'i');

    let hints: any [];

    await this.getAllInterests();

    hints = interests
      .map(hint => hint.toLowerCase())
      .sort((a, b) => a.localeCompare(b));

    hints = [...new Set(hints)];

    if (userInput) {
      hints = hints.filter(hint => findConcurrences.test(hint));
    }

    if (hints.length > 5) {
      hints = hints.splice(0, 5);
    }

    return hints;
  }

  addConnectedUser(client, userId): void {
    const user: ConnectedUser = {
      clientId: client.id,
      userId: userId
    };

    this.connectedUsers.push(user);
  }

  removeConnectedUser(client): void {
    const connectedUsers = this.connectedUsers;
    const connectedUsersLength = this.connectedUsers.length;

    let clientId;

    if (client) {
      clientId = client.id;

      for (let i = 0; i < connectedUsersLength; i += 1) {
        if (connectedUsers[i] && connectedUsers[i].clientId === clientId) {
          connectedUsers.splice(i, 1);
          break;
        }
      }
    }
  }

}
