import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  posts: Array<Post>;
  post?: Maybe<Post>;
  me?: Maybe<Users>;
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  title: Scalars['String'];
};

export type Users = {
  __typename?: 'Users';
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  userName?: Maybe<Scalars['String']>;
  userPassword?: Maybe<Scalars['String']>;
  userEmail?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  updatePost?: Maybe<Post>;
  deletePost: Scalars['String'];
  createUser: UserResponse;
  loginUser: UserResponse;
  logout: Scalars['Boolean'];
  forgetPassword: Scalars['Boolean'];
  changePassword: UserResponse;
};


export type MutationCreatePostArgs = {
  title: Scalars['String'];
};


export type MutationUpdatePostArgs = {
  title: Scalars['String'];
  id: Scalars['Float'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Float'];
};


export type MutationCreateUserArgs = {
  options: UserInput;
};


export type MutationLoginUserArgs = {
  options: LoginInput;
};


export type MutationForgetPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'userResponse';
  ErrorMsg?: Maybe<Error>;
  user?: Maybe<Users>;
};

export type Error = {
  __typename?: 'Error';
  field: Scalars['String'];
  msg: Scalars['String'];
};

export type UserInput = {
  userName: Scalars['String'];
  userEmail: Scalars['String'];
  userPassword: Scalars['String'];
};

export type LoginInput = {
  nameOrEmail: Scalars['String'];
  userPassword: Scalars['String'];
};

export type RegularUserFragment = (
  { __typename?: 'userResponse' }
  & { ErrorMsg?: Maybe<(
    { __typename?: 'Error' }
    & Pick<Error, 'field' | 'msg'>
  )>, user?: Maybe<(
    { __typename?: 'Users' }
    & Pick<Users, 'id' | 'userName'>
  )> }
);

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'userResponse' }
    & RegularUserFragment
  ) }
);

export type ForgetPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgetPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgetPassword'>
);

export type LoginMutationVariables = Exact<{
  nameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { loginUser: (
    { __typename?: 'userResponse' }
    & RegularUserFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'userResponse' }
    & RegularUserFragment
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'Users' }
    & Pick<Users, 'id' | 'userName'>
  )> }
);

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'title'>
  )> }
);

export const RegularUserFragmentDoc = gql`
    fragment RegularUser on userResponse {
  ErrorMsg {
    field
    msg
  }
  user {
    id
    userName
  }
}
    `;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const ForgetPasswordDocument = gql`
    mutation ForgetPassword($email: String!) {
  forgetPassword(email: $email)
}
    `;

export function useForgetPasswordMutation() {
  return Urql.useMutation<ForgetPasswordMutation, ForgetPasswordMutationVariables>(ForgetPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($nameOrEmail: String!, $password: String!) {
  loginUser(options: {nameOrEmail: $nameOrEmail, userPassword: $password}) {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($name: String!, $email: String!, $password: String!) {
  createUser(
    options: {userName: $name, userEmail: $email, userPassword: $password}
  ) {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    id
    userName
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const PostsDocument = gql`
    query Posts {
  posts {
    title
  }
}
    `;

export function usePostsQuery(options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options });
};