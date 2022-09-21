import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserModuleInjectToken } from '@tommysg/user/config';
import { UserTable } from '@tommysg/user/infra/database/user.table';
import { Repository } from 'typeorm';
import { AppModule } from '../../../../../../src/app.module';
import { CreateUserDto } from '../../dto';
import { UserUsecase, UserUsecaseType } from '../user.usecase';

describe('Create User Usecase', () => {
    let usecase: UserUsecase;
    let ormRepo: Repository<UserTable>;
    const input = new CreateUserDto();
    input.firstName = 'Tommy';
    input.lastName = 'Nguyen';
    input.middleName = 'T';
    input.email = 'huynguyen@gmail.com';
    input.password = '123456';
    input.mobile = '1234567890';
    input.intro = 'Hello world';
    input.profile = 'https://google.com';

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        usecase = module.get<UserUsecase>(UserModuleInjectToken.USER_USECASE);
        const USER_REPO_TOKEN = getRepositoryToken(UserTable);
        ormRepo = module.get<Repository<UserTable>>(USER_REPO_TOKEN);
    });

    describe('execute', () => {
        it('should create user', (done) => {
            jest.spyOn(ormRepo, 'insert').mockResolvedValueOnce(undefined);
            usecase.execute(UserUsecaseType.CREATE, input).subscribe({
                complete: () => {
                    done();
                },
                error: (err) => {
                    console.error(err);
                    done(err);
                },
            });

            setTimeout(() => {
                done('Error: Time out');
            }, 1500);
        });
        it('should not create user', (done) => {
            usecase.execute(UserUsecaseType.CREATE, { ...input, middleName: undefined }).subscribe({
                complete: () => {
                    done('Error: should not create user');
                },
                error: (err) => {
                    done();
                },
            });

            setTimeout(() => {
                done('Error: Time out');
            }, 1500);
        });
    });
});
