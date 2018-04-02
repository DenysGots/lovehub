export class UserProfile {

  constructor(public id: number = 0,
              public firstName: string = '',
              public lastName: string = '',
              public phoneNumber: number = 0,
              public age: number = 0,
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
