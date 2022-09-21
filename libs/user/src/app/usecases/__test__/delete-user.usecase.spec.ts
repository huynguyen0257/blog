import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteUserDto, UserModuleInjectToken, UserUsecase, UserUsecaseType } from '@tommysg/user';
import { UserTable } from '@tommysg/user/infra';
import { Repository } from 'typeorm';
import { AppModule } from '../../../../../../src/app.module';

describe('Delete User Usecase', () => {
    let usecase: UserUsecase;
    let ormRepo: Repository<UserTable>;
    const input = new DeleteUserDto();
    input.deleteId = '16b70cb6-a02a-4911-adba-ede693115a11';
    const database = new UserTable();
    database.id = '16b70cb6-a02a-4911-adba-ede693115a11';
    database.firstName = 'Tommy';
    database.lastName = 'Nguyen';
    database.middleName = 'T';
    database.email = 'huynguyen@gmail.com';
    database.password = '123456';
    database.mobile = '1234567890';
    database.intro = 'Hello world';
    database.profile = 'https://google.com';

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        usecase = module.get<UserUsecase>(UserModuleInjectToken.USER_USECASE);
        const USER_REPO_TOKEN = getRepositoryToken(UserTable);
        ormRepo = module.get<Repository<UserTable>>(USER_REPO_TOKEN);
    });

    it('should be defined', async () => {
        expect(usecase).toBeDefined();
        expect(ormRepo).toBeDefined();
    });

    describe('execute', () => {
        it('should delete success', (done) => {
            jest.spyOn(ormRepo, 'findOneBy').mockResolvedValueOnce(database);
            jest.spyOn(ormRepo, 'delete').mockResolvedValueOnce(undefined);
            usecase.execute(UserUsecaseType.DELETE, input).subscribe({
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
    });
});
