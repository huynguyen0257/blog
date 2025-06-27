import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class FilterUserGraphQL {
    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    email?: string;
}
