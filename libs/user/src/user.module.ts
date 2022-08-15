import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './app';
import { UserModuleInjectToken } from './config';
import { UserInternalController } from './controller';
import { UserRepository } from './infra/database/user.repo.impl';
import { UserTable } from './infra/database/user.table';

const publishProvider = [
    {
        provide: UserModuleInjectToken.USER_SERVICE,
        useClass: UserService,
    },
    {
        provide: UserModuleInjectToken.USER_REPO,
        useClass: UserRepository,
    },
];

@Module({
    imports: [TypeOrmModule.forFeature([UserTable])],
    controllers: [UserInternalController],
    providers: publishProvider,
    // exports: [...publishProvider, TypeOrmModule]
    exports: [...publishProvider]
})
export class UserModule {}
