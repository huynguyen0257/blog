import { InternalServerErrorException } from '@nestjs/common';
import { IsDate, IsOptional, IsString, validateOrReject } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// TODO: Move to common libs
export class DomainValidationError extends InternalServerErrorException {
    constructor(entity: string, error?: Error) {
        super(
            {
                ...error,
                error: 'VALIDATION-ERR:70000',
            },
            `Validate Constrain ${entity}`,
        );
    }
}

export type UserEntityProps = {
    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    mobile: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    lastLogin: Date;
    intro: string;
    profile: string;
};

export type CreateUserEntity = Partial<Omit<UserEntityProps, 'createdAt'>>;
export type UpdateUserEntity = Partial<
    Pick<UserEntityProps, 'firstName' | 'middleName' | 'lastName' | 'mobile' | 'lastLogin' | 'intro' | 'profile'>
>;

// TODO: Create BaseEntity<ID: string | number>
@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    @IsString()
    @IsOptional()
    private _id: string;

    @Column({ name: 'first_name' })
    @IsString()
    private _firstName: string;

    @Column({ name: 'middle_name' })
    @IsString()
    private _middleName: string;

    @Column({ name: 'last_name' })
    @IsString()
    private _lastName: string;

    @Column({ length: 15, name: 'mobile' })
    @IsString()
    private _mobile: string;

    @Column({ name: 'email' })
    @IsString()
    private _email: string;

    @Column({ length: 32, name: 'password' })
    @IsString()
    private _password: string;

    @Column({ type: 'timestamp with time zone', name: 'created_at' })
    @IsDate()
    private _createdAt: Date;

    @Column({ type: 'timestamp with time zone', name: 'updated_at', nullable: true })
    @IsDate()
    @IsOptional()
    private _updatedAt: Date;

    @Column({ type: 'timestamp with time zone', name: 'last_login', nullable: true })
    @IsDate()
    @IsOptional()
    private _lastLogin: Date;

    @Column({ type: 'text', name: 'intro', nullable: true })
    @IsString()
    @IsOptional()
    private _intro: string;

    @Column({ type: 'text', name: 'profile', nullable: true })
    @IsString()
    @IsOptional()
    private _profile: string;

    private async validate() {
        try {
            await validateOrReject(this, { whitelist: true });
        } catch (error) {
            throw new DomainValidationError('UserEntity', error);
        }
    }

    public static async create(payload: CreateUserEntity) {
        const entity = new UserEntity();
        entity.setId(payload.id);
        entity.setFirstName(payload.firstName);
        entity.setMiddleName(payload.middleName);
        entity.setLastName(payload.lastName);
        entity.setMobile(payload.mobile);
        entity.setEmail(payload.email);
        entity.setPassword(payload.password);
        entity.setLastLogin(payload.lastLogin);
        entity.setIntro(payload.intro);
        entity.setProfile(payload.profile);
        if (!entity._createdAt) entity.setCreatedAt();
        await entity.validate();
        return entity;
    }

    public update(payload: UpdateUserEntity) {
        this.setFirstName(payload.firstName);
        this.setMiddleName(payload.middleName);
        this.setLastName(payload.lastName);
        this.setMobile(payload.mobile);
        this.setLastLogin(payload.lastLogin);
        this.setIntro(payload.intro);
        this.setProfile(payload.profile);
        this.setUpdatedAt();
    }

    private setId(payload?: string) {
        this._id = payload;
    }
    private setFirstName(payload?: string) {
        this._firstName = payload;
    }
    private setMiddleName(payload?: string) {
        this._middleName = payload;
    }
    private setLastName(payload?: string) {
        this._lastName = payload;
    }
    private setMobile(payload?: string) {
        this._mobile = payload;
    }
    private setEmail(payload?: string) {
        this._email = payload;
    }
    private setPassword(payload?: string) {
        // TODO: Hash password here
        this._password = payload;
    }
    private setLastLogin(payload?: Date) {
        this._lastLogin = payload;
    }
    private setIntro(payload?: string) {
        this._intro = payload;
    }
    private setProfile(payload?: string) {
        this._profile = payload;
    }
    private setCreatedAt() {
        this._createdAt = new Date();
    }
    private setUpdatedAt() {
        this._updatedAt = new Date();
    }

    // ----------------- { GETTER } -----------------
    public get id(): string {
        return this._id;
    }

    public get firstName(): string {
        return this._firstName;
    }

    public get middleName(): string {
        return this._middleName;
    }
    public get lastName(): string {
        return this._lastName;
    }
    public get mobile(): string {
        return this._mobile;
    }
    public get email(): string {
        return this._email;
    }
    public get password(): string {
        return this._password;
    }
    public get createdAt(): Date {
        return this._createdAt;
    }
    public get updatedAt(): Date {
        return this._updatedAt;
    }
    public get lastLogin(): Date {
        return this._lastLogin;
    }
    public get intro(): string {
        return this._intro;
    }
    public get profile(): string {
        return this._profile;
    }

    // ----------------- { METHODS } -----------------
    public checkPassword(payload: string) {
        // TODO: Check hash password here
        this._password = payload;
    }
}
