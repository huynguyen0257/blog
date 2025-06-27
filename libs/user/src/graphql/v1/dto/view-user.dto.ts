import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'user' })
export class ViewUserGraphQL {
    @Field((type) => ID)
    id: string;

    @Field()
    firstName: string;

    @Field()
    middleName: string;

    @Field()
    lastName: string;

    @Field()
    mobile: string;

    @Field()
    email: string;

    @Field({ nullable: true })
    intro: string;

    @Field({ nullable: true })
    profile: string;
}

@ObjectType({ description: 'Get all user' })
export class GetAllUserGraphQL {
    @Field((type) => [ViewUserGraphQL])
    data: ViewUserGraphQL[];
}
@ObjectType({ description: 'Get by id user' })
export class GetByIdUserGraphQL {
    @Field((type) => ViewUserGraphQL)
    data: ViewUserGraphQL;
}
