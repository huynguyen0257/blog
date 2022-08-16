import { BaseEntity } from '@tommysg/core';
import { IsDate, IsOptional, IsString } from 'class-validator';

export type UserEntityProps = {
    // id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    mobile?: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt?: Date;
    lastLogin?: Date;
    intro?: string;
    profile?: string;
};

export type CreateUserEntity = Partial<Omit<UserEntityProps, 'createdAt'>> & {
    id?: string;
};
export type UpdateUserEntity = Partial<
    Pick<
        UserEntityProps,
        'firstName' | 'middleName' | 'lastName' | 'mobile' | 'lastLogin' | 'intro' | 'profile'
    >
> & {
    id?: string;
};

export class UserEntity extends BaseEntity<string, UserEntityProps> {
    protected _name = 'UserEntity';

    // ----------------- { BUSINESS LOGIC } -----------------
    public static async create(payload: CreateUserEntity) {
        const entity = new UserEntity(payload.id, { ...payload } as any);
        if (!entity._props.createdAt) entity.setCreatedAt();
        await entity.validate();
        return entity;
    }

    public async update(payload: UpdateUserEntity) {
        this.setFirstName(payload.firstName);
        this.setMiddleName(payload.middleName);
        this.setLastName(payload.lastName);
        this.setMobile(payload.mobile);
        this.setLastLogin(payload.lastLogin);
        this.setIntro(payload.intro);
        this.setProfile(payload.profile);
        this.setUpdatedAt();
        await this.validate();
    }

    private setId(payload?: string) {
        if (payload) this._id = payload;
    }
    private setFirstName(payload?: string) {
        if (payload) this._props.firstName = payload;
    }
    private setMiddleName(payload?: string) {
        if (payload) this._props.middleName = payload;
    }
    private setLastName(payload?: string) {
        if (payload) this._props.lastName = payload;
    }
    private setMobile(payload?: string) {
        if (payload) this._props.mobile = payload;
    }
    private setEmail(payload?: string) {
        if (payload) this._props.email = payload;
    }
    private setPassword(payload?: string) {
        // TODO: Hash password here
        if (payload) this._props.password = payload;
    }
    private setLastLogin(payload?: Date) {
        if (payload) this._props.lastLogin = payload;
    }
    private setIntro(payload?: string) {
        if (payload) this._props.intro = payload;
    }
    private setProfile(payload?: string) {
        if (payload) this._props.profile = payload;
    }
    private setCreatedAt() {
        this._props.createdAt = new Date();
    }
    private setUpdatedAt() {
        this._props.updatedAt = new Date();
    }

    public checkPassword(payload: string) {
        // TODO: Check hash password here
        this._props.password = payload;
    }

    // ----------------- { GETTER } -----------------
    @IsString()
    public get firstName(): string {
        return this._props.firstName;
    }

    @IsString()
    public get middleName(): string {
        return this._props.middleName;
    }

    @IsString()
    public get lastName(): string {
        return this._props.lastName;
    }

    @IsString()
    public get mobile(): string {
        return this._props.mobile;
    }

    @IsString()
    public get email(): string {
        return this._props.email;
    }

    @IsString()
    public get password(): string {
        return this._props.password;
    }

    @IsDate()
    public get createdAt(): Date {
        return this._props.createdAt;
    }

    @IsDate()
    @IsOptional()
    public get updatedAt(): Date {
        return this._props.updatedAt;
    }

    @IsDate()
    @IsOptional()
    public get lastLogin(): Date {
        return this._props.lastLogin;
    }

    @IsString()
    @IsOptional()
    public get intro(): string {
        return this._props.intro;
    }

    @IsString()
    @IsOptional()
    public get profile(): string {
        return this._props.profile;
    }
}
