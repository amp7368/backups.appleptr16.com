import { Module } from '@nestjs/common';
import { BackupController } from './backup/Backup.controller';
import { LoginController } from './user/Login.controller';
@Module({
    controllers: [LoginController, BackupController],
})
export class BaseModule {}
