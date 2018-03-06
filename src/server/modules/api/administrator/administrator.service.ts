import { Component, Inject } from '@nestjs/common';

import { usersList } from './mock-users';   // TODO: delete when ready

import { UserProfile } from '../users-profile/user-profile.entity';
import { UserProfileDto } from '../users-profile/dto/user-profile.dto';

@Component()
export class AdministratorServiceComponent {
  originalUsersList = [];

  constructor(@Inject('UsersProfileRepository') private readonly userProfileRepository: typeof UserProfile) {}

  async getUsers() {
    return await this.userProfileRepository
      .findAll<UserProfile>({ raw: true })
      .then(result => this.originalUsersList = result);
  }

  async updateUser(id: number, options: {}) {
    return await this.userProfileRepository
      .update(options, {where: {id: id}});
  }

  async deleteUser(id: number) {
    return await this.userProfileRepository
      .destroy({where: {id: id}});
  }

  async manageUsersList(getUsersEnquiryDto) {
    const sortingColumn = getUsersEnquiryDto.sortingOptions.tableColumn;
    const sortingOption = getUsersEnquiryDto.sortingOptions.sortingOption;
    const userRole = getUsersEnquiryDto.userRole;
    const userStatus = getUsersEnquiryDto.userStatus;
    const usersPerPage = getUsersEnquiryDto.usersPerPage;
    const nextPage = getUsersEnquiryDto.nextPage;
    const startingUserPosition = (nextPage - 1) * usersPerPage;
    const processedResponse = {
      users: [],
      currentUser: {},
      numberOfPages: 0
    };

    let processedUsersList;
    let endingUserPosition;

    // Stop executing while acquiring usersList from DB
    await this.getUsers();

    processedUsersList = this.originalUsersList.slice(0);

    endingUserPosition = (
      (startingUserPosition + usersPerPage) <= (this.originalUsersList.length - 1)
    ) ? (usersPerPage) : (this.originalUsersList.length - startingUserPosition);

    // Filter usersList
    processedUsersList = processedUsersList.filter(user => {
      return ((userRole === 'any' || user.role === userRole) && (userStatus === 'any' || user.status === userStatus));
    });

    // Calculate number of pages for pagination
    processedResponse.numberOfPages = Math.ceil(processedUsersList.length / usersPerPage);

    // Assign usersList users missing properties, necessary for the view
    if (processedUsersList) {
      processedUsersList.map((obj, i, arr) => {
        arr[i].status = arr[i].isBaned ? 'Baned' : 'Active';
        arr[i].membership = Math.floor((Date.now() - Date.parse(arr[i].registrationDate)) / (1000 * 60 * 60 * 24 * 365));
      });

      for (const user of processedUsersList) {
        if (user.role === 'Administrator') {
          processedResponse.currentUser = user;
        }
      }
    }

    // Sort usersList
    if (sortingOption !== 'none') {
      processedUsersList = this.originalUsersList.sort((userA, userB) => {
        switch (sortingOption) {
          case 'ascending':
            if (userA[sortingColumn] < userB[sortingColumn]) {
              return -1;
            } else if (userA[sortingColumn] > userB[sortingColumn]) {
              return 1;
            } else {
              return 0;
            }

          case 'descending':
            if (userA[sortingColumn] < userB[sortingColumn]) {
              return 1;
            } else if (userA[sortingColumn] > userB[sortingColumn]) {
              return -1;
            } else {
              return 0;
            }
        }
      });
    }

    if (processedUsersList) {
      processedUsersList.map((obj, i, arr) => {
        (arr[i].membership < 1) ? (arr[i].membership = 'Less than a year') : (
          (arr[i].membership === 1) ? (arr[i].membership += ' year') : (arr[i].membership += ' years')
        );
      });
    }

    // Trim sorted and filtered usersList to show predefined page
    processedUsersList = processedUsersList.splice(startingUserPosition, endingUserPosition);

    processedResponse.users = processedUsersList;

    // // Use to fill DB with mock users from './mock-users'
    // this.originalUsersList.forEach((user) => {
    //   const userProfile = new UserProfile();
    //
    //   userProfile.firstName = user.firstName;
    //   userProfile.lastName = user.lastName;
    //   userProfile.id = user.id;
    //   userProfile.role = user.role;
    //   userProfile.isActive = true;
    //   userProfile.isBaned = false;
    //   userProfile.registrationDate = new Date(user.registrationDate);
    //   userProfile.lastActiveDate = new Date(user.lastActive);
    //
    //   userProfile.save();
    // });

    return processedResponse;
  }

  async updateUsersList(updateUsersEnquiryDto) {
    const usersToUpdate = updateUsersEnquiryDto.usersList;
    const appliedAction = updateUsersEnquiryDto.appliedAction;

    switch (appliedAction) {
      case 'ban':
        usersToUpdate.forEach(async id => {
          await this.updateUser(id, {isActive: false, isBaned: true});
        });
        break;

      case 'restore':
        usersToUpdate.forEach(async id => {
          await this.updateUser(id, {isActive: true, isBaned: false});
        });
        break;

      case 'delete':
        usersToUpdate.forEach(async id => {
          await this.deleteUser(id);
        });
        break;
    }
  }

}
