import {
    INestApplication,
    Module,
    NestApplicationOptions,
    PipeTransform,
    ValidationPipe,
} from '@nestjs/common';
import { APP_GUARD, NestFactory } from '@nestjs/core';

import { RolesGuard } from './app/auth/Role';
import { BaseModule } from './app/App.module';
import { MulterInit } from './MulterInit';

const PORT = 80;

@Module({
    imports: [BaseModule, MulterInit],
    providers: [{ provide: APP_GUARD, useClass: RolesGuard }],
})
class AppModule {}

async function bootstrap() {
    const nestOptions: NestApplicationOptions = {
        cors: true,
    };
    const pipes: PipeTransform[] = [
        new ValidationPipe({
            // whitelist: true,
            enableDebugMessages: true,
            whitelist: true,
        }),
    ];
    const nestApp: INestApplication = await NestFactory.create(
        AppModule,
        nestOptions
    );

    await nestApp.useGlobalPipes(...pipes).listen(PORT, () => {
        console.log(`Nest server running on port ${PORT}`);
    });
}
bootstrap();
