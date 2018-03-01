import {Module} from '@nestjs/common';
import { RecoverPassService} from './recover-pass.service';
import {RecoverPassController} from './recover-pass.controller';

@Module({
  controllers: [RecoverPassController],
  components: [RecoverPassService]
})

export class RecoverPassModule {}
