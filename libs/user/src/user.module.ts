import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './app';
import { UserModuleInjectToken } from './config';
import { UserInternalController } from './controller';
import { UserEntity } from './entities';

const publishProvider = [
    {
        provide: UserModuleInjectToken.USER_SERVICE,
        useClass: UserService,
    },
];

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [UserInternalController],
    providers: publishProvider,
    exports: [...publishProvider, TypeOrmModule]
})
export class UserModule {}
