import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  imports: [DatabaseModule, UtilsModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
