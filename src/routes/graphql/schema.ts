import {
    GraphQLSchema,
} from 'graphql';
import { User } from './types/user.js';
import { Post } from './types/post.js';
import { Profile } from './types/profile.js';
import { MemberType } from './types/member-type.js';

export const schema: GraphQLSchema = new GraphQLSchema({
    //query: RootQueryType,
    //mutation: Mutations,  
    types: [MemberType, Post, Profile, User],
});
