export type PostModel = {
  id: string;
  title: string;
  content: string;
};

export type UserModel = {
  id: string;
  name: string;
  balance: number;
  profileId?: string;
  posts: PostModel[];
  userSubscribedToIds: string[];
  subscribedToUserIds: string[];
};

export type MemberTypeId = 'BASIC' | 'BUSINESS';

export type ProfileModel = {
  id: string;
  isMale: boolean;
  yearOfBirth: number;
  memberTypeId: MemberTypeId;
};
