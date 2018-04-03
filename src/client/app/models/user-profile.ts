export class UserProfile {

  constructor(public id: number = 1,
              public firstName: string = '',
              public lastName: string = '',
              public phoneNumber: number = 987654321,
              public age: number = 20,
              public role: string = '',
              public sex: string = '',
              public orientation: string = '',
              public preference: string = '',
              public location: string = '',
              public isBaned: boolean = false,
              public isActive: boolean = false,
              public avatar: string = '',
              public userId: number = 1) {}
}
