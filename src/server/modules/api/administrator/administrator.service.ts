import { Component } from '@nestjs/common';

@Component()
export class AdministratorServiceComponent {
  private readonly users = [
    {
      id: 'id_1',
      firstName: 'Admin',
      lastName: 'Admin',
      status: 'Active',
      membership: '11 years',
      role: 'Administrator',
      lastActive: '10/02/2018'
    },
    {
      id: 'id_247731',
      firstName: 'User0',
      lastName: 'User0',
      status: 'Active',
      membership: '1 year',
      role: 'User',
      lastActive: '10/02/2018'
    },
    {
      id: 'id_905741',
      firstName: 'User1',
      lastName: 'User1',
      status: 'Active',
      membership: '2 years',
      role: 'User',
      lastActive: '10/02/2018'
    },
    {
      id: 'id_438961',
      firstName: 'User2',
      lastName: 'User2',
      status: 'Active',
      membership: '7 years',
      role: 'User',
      lastActive: '10/02/2018'
    },
    {
      id: 'id_155452',
      firstName: 'User3',
      lastName: 'User3',
      status: 'Active',
      membership: '3 years',
      role: 'User',
      lastActive: '10/02/2018'
    },
    {
      id: 'id_669339',
      firstName: 'User4',
      lastName: 'User4',
      status: 'Active',
      membership: '3 years',
      role: 'User',
      lastActive: '10/02/2018'
    },
    {
      id: 'id_857314',
      firstName: 'User5',
      lastName: 'User5',
      status: 'Active',
      membership: '9 years',
      role: 'Moderator',
      lastActive: '10/02/2018'
    }
  ];

  getUsers(): any {
    return this.users;
  }
}
