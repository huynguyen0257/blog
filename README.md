## Description

My first node project with NestJS framework.
- The project apply DDD and Clean Architecture.
- Frameworks: [NestJS](https://nestjs.com/), Typeorm, Express.
- SOLID principles, Command design pattern.
- Postgres database, redis cache.
- Setup CI with docker & pm2
- Docker compose

## Usage
### Setup
1. Create .env file on root
2. Setup your environment in .env file base on ./src/config/config-schema.ts
3. Run docker compose
   ```bash
   $ docker compose up
   ```
4. Create database table
   ```bash
   $ npm install
   $ npm run migration:run
   ```
### Call API
- Start first request. POST http://localhost:3000/api/v1/user/internal
- View APIs documents in [Swagger](http://localhost:3000/api#/)

## Test

```bash
# unit tests
$ npm run test
```

## Migration
```bash
# Generate
npm run migration:generate --name=
# Create
npm run migration:create --name=
# Run
npm run migration:run
```


## Typeorm
### Usage repository pattern
- Load typeorm global
```bash
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async () => {
                return Object.assign(await getConnectionOptions(), {
                    autoLoadEntities: true,
                    entities: [join(__dirname, 'libs', '**', '*.entity.ts')],
                });
            },
        }),
        UserModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
```
- Inject typeorm repository to context
```bash
@Module({
    controllers: [UserInternalController],
    providers: publishProvider,
    exports: publishProvider,
    imports: [TypeOrmModule.forFeature([UserEntity])]
})
export class UserModule {}
```
- Use repository
```bash
@Injectable()
export class UserService implements IUserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly _userRepo: Repository<UserEntity>,
    ) {}
}
```
## Nest interceptor
- Usage globally
```bash
const app = await NestFactory.create(AppModule);
app.useGlobalInterceptors(new LoggingInterceptor());
```
More details: [link](https://docs.nestjs.com/interceptors#binding-interceptors)

## About Me

My name is Nguyen Gia Huy, you can call me Huy Nguyen or Tommy Nguyen.

- Linkedin https://www.linkedin.com/in/huynguyen0257/
- Facebook https://www.facebook.com/huy.nguyen0257/
- Instagram https://www.instagram.com/_tommy.ngggg/
- Email huynguyen0257.developer@gmail.com