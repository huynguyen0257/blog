import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserTable extends BaseEntity {
    @PrimaryColumn({ name: 'id' })
    id: string;

    @Column({ name: 'first_name' })
    firstName: string;

    @Column({ name: 'middle_name' })
    middleName: string;

    @Column({ name: 'last_name' })
    lastName: string;

    @Column({ length: 15, name: 'mobile' })
    mobile: string | null;

    @Column({ name: 'email' })
    email: string;

    @Column({ length: 32, name: 'password' })
    password: string;

    @Column({ type: 'timestamp with time zone', name: 'created_at' })
    createdAt: Date;

    @Column({ type: 'timestamp with time zone', name: 'updated_at', nullable: true })
    updatedAt: Date | null;

    @Column({ type: 'timestamp with time zone', name: 'last_login', nullable: true })
    lastLogin: Date | null;

    @Column({ type: 'text', name: 'intro', nullable: true })
    intro: string | null;

    @Column({ type: 'text', name: 'profile', nullable: true })
    profile: string | null;
}
