import { Module } from '@nestjs/common';
import { AdministratorController } from './administrator.controller';
import { AdministratorServiceComponent } from './administrator.service';

@Module({
  controllers: [AdministratorController],
  components: [AdministratorServiceComponent],
})
export class AdministratorModule {

}
