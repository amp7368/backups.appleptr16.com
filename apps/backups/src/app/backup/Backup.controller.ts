import { CreateDetailsRequest, Endpoints } from '@api/io-model';
import {
    Body,
    Controller,
    Post,
    Query,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import 'multer';

@Controller(Endpoints.backup.url)
export class BackupController {
    @Post(Endpoints.backup.create)
    async post(@Body() request: CreateDetailsRequest) {
        console.log(request);
    }
    @Post(Endpoints.backup.next)
    @UseInterceptors(FileInterceptor('file'))
    async next(
        @Query() uuid: string,
        @UploadedFile() file: Express.Multer.File
    ) {
        console.log(uuid);
        console.log(file);
    }
}
