import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type IBook = {
  __typename?: 'Book';
  author?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
};

export type IBusiness = {
  __typename?: 'Business';
  category?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['String']>;
  github?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  linkedin?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  professional?: Maybe<Scalars['String']>;
  sourceImage?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['String']>;
};

export type ICv = {
  __typename?: 'CV';
  employeeId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  source?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['Int']>;
};

export type ICertificate = {
  __typename?: 'Certificate';
  iig?: Maybe<IIig>;
};

export type IDefaultCv = {
  __typename?: 'DefaultCV';
  category?: Maybe<Scalars['Int']>;
  certificate?: Maybe<ICertificate>;
  email?: Maybe<Scalars['String']>;
  github?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  linkedin?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  professional?: Maybe<Scalars['String']>;
  skills?: Maybe<Array<Maybe<ISkill>>>;
  sourceImage?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['String']>;
};

export type IEmployee = {
  __typename?: 'Employee';
  email?: Maybe<Scalars['String']>;
  github?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  linkedin?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  professional?: Maybe<Scalars['String']>;
  sourceImage?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['String']>;
};

export type IIig = {
  __typename?: 'IIG';
  lr?: Maybe<ILr>;
  sw?: Maybe<ISw>;
};

export type IIigStatus = {
  __typename?: 'IIGStatus';
  lr?: Maybe<Scalars['Boolean']>;
  sw?: Maybe<Scalars['Boolean']>;
};

export type ILr = {
  __typename?: 'LR';
  employeeId?: Maybe<Scalars['Int']>;
  expireDate?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['Int']>;
  listeningScore?: Maybe<Scalars['Int']>;
  readingScore?: Maybe<Scalars['Int']>;
  shiftTest?: Maybe<Scalars['Int']>;
  testDate?: Maybe<Scalars['Date']>;
  time?: Maybe<Scalars['Date']>;
};

export type IPost = {
  __typename?: 'Post';
  _id?: Maybe<Scalars['String']>;
  applied?: Maybe<Scalars['Boolean']>;
  businessId?: Maybe<Scalars['Int']>;
  businessImage?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  hashtag?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Maybe<Scalars['String']>>>;
  job?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['Date']>;
  videos?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type IQuery = {
  __typename?: 'Query';
  book?: Maybe<IBook>;
  books?: Maybe<Array<Maybe<IBook>>>;
  business?: Maybe<IBusiness>;
  businessByUser?: Maybe<IBusiness>;
  cv?: Maybe<ICv>;
  cvs?: Maybe<Array<Maybe<ICv>>>;
  defaultCV?: Maybe<IDefaultCv>;
  employee?: Maybe<IEmployee>;
  employeeByUser?: Maybe<IEmployee>;
  employees?: Maybe<Array<Maybe<IEmployee>>>;
  post?: Maybe<IPost>;
  prediction?: Maybe<Array<Maybe<IPost>>>;
  requestStatus?: Maybe<IIigStatus>;
  skillsByEmployee?: Maybe<Array<Maybe<ISkill>>>;
};


export type IQueryBookArgs = {
  id: Scalars['Int'];
};


export type IQueryBusinessArgs = {
  id: Scalars['Int'];
};


export type IQueryBusinessByUserArgs = {
  user?: InputMaybe<Scalars['String']>;
};


export type IQueryDefaultCvArgs = {
  employeeId: Scalars['Int'];
};


export type IQueryEmployeeArgs = {
  id: Scalars['Int'];
};


export type IQueryEmployeeByUserArgs = {
  user?: InputMaybe<Scalars['String']>;
};


export type IQueryPostArgs = {
  employeeId?: InputMaybe<Scalars['Int']>;
  id: Scalars['String'];
};


export type IQueryPredictionArgs = {
  id: Scalars['Int'];
};


export type IQueryRequestStatusArgs = {
  employeeId: Scalars['Int'];
};


export type IQuerySkillsByEmployeeArgs = {
  employeeId: Scalars['Int'];
};

export type ISw = {
  __typename?: 'SW';
  employeeId?: Maybe<Scalars['Int']>;
  expireDate?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['Int']>;
  shiftTest?: Maybe<Scalars['Int']>;
  speakingScore?: Maybe<Scalars['Int']>;
  testDate?: Maybe<Scalars['Date']>;
  time?: Maybe<Scalars['Date']>;
  writingScore?: Maybe<Scalars['Int']>;
};

export type ISkill = {
  __typename?: 'Skill';
  employeeId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  level?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
};

export type IGetBusinessByUserQueryVariables = Exact<{
  user: Scalars['String'];
}>;


export type IGetBusinessByUserQuery = { __typename?: 'Query', businessByUser?: { __typename?: 'Business', id?: number | null, user?: string | null, name?: string | null, phone?: string | null, professional?: string | null, email?: string | null, github?: string | null, linkedin?: string | null, sourceImage?: string | null, category?: number | null } | null };

export type IGetBusinessQueryVariables = Exact<{
  businessId: Scalars['Int'];
}>;


export type IGetBusinessQuery = { __typename?: 'Query', business?: { __typename?: 'Business', id?: number | null, user?: string | null, name?: string | null, phone?: string | null, professional?: string | null, email?: string | null, github?: string | null, linkedin?: string | null, sourceImage?: string | null, category?: number | null } | null };

export type IGetEmployeeByUserQueryVariables = Exact<{
  user?: InputMaybe<Scalars['String']>;
}>;


export type IGetEmployeeByUserQuery = { __typename?: 'Query', employeeByUser?: { __typename?: 'Employee', id?: number | null, user?: string | null, name?: string | null, phone?: string | null, professional?: string | null, email?: string | null, github?: string | null, linkedin?: string | null, sourceImage?: string | null } | null };

export type IGetEmployeeIdByUserQueryVariables = Exact<{
  user?: InputMaybe<Scalars['String']>;
}>;


export type IGetEmployeeIdByUserQuery = { __typename?: 'Query', employeeByUser?: { __typename?: 'Employee', id?: number | null } | null };

export type IGetEmployeeQueryVariables = Exact<{
  employeeId: Scalars['Int'];
}>;


export type IGetEmployeeQuery = { __typename?: 'Query', employee?: { __typename?: 'Employee', id?: number | null, user?: string | null, name?: string | null, phone?: string | null, professional?: string | null, email?: string | null, github?: string | null, linkedin?: string | null, sourceImage?: string | null } | null };

export type IGetDefaultCvQueryVariables = Exact<{
  employeeId: Scalars['Int'];
}>;


export type IGetDefaultCvQuery = { __typename?: 'Query', defaultCV?: { __typename?: 'DefaultCV', id?: number | null, user?: string | null, name?: string | null, phone?: string | null, professional?: string | null, email?: string | null, github?: string | null, linkedin?: string | null, sourceImage?: string | null, skills?: Array<{ __typename?: 'Skill', id?: number | null, employeeId?: number | null, title?: string | null, level?: number | null } | null> | null, certificate?: { __typename?: 'Certificate', iig?: { __typename?: 'IIG', lr?: { __typename?: 'LR', id?: number | null, employeeId?: number | null, testDate?: any | null, shiftTest?: number | null, expireDate?: any | null, listeningScore?: number | null, readingScore?: number | null, time?: any | null } | null, sw?: { __typename?: 'SW', id?: number | null, employeeId?: number | null, testDate?: any | null, shiftTest?: number | null, expireDate?: any | null, speakingScore?: number | null, writingScore?: number | null, time?: any | null } | null } | null } | null } | null };

export type IGetIigRequestStatusQueryVariables = Exact<{
  employeeId: Scalars['Int'];
}>;


export type IGetIigRequestStatusQuery = { __typename?: 'Query', requestStatus?: { __typename?: 'IIGStatus', lr?: boolean | null, sw?: boolean | null } | null };

export type IGetPostQueryVariables = Exact<{
  postId: Scalars['String'];
  employeeId?: InputMaybe<Scalars['Int']>;
}>;


export type IGetPostQuery = { __typename?: 'Query', post?: { __typename?: 'Post', _id?: string | null, businessId?: number | null, images?: Array<string | null> | null, videos?: Array<string | null> | null, content?: string | null, hashtag?: string | null, status?: number | null, job?: string | null, applied?: boolean | null, businessImage?: string | null, createdAt?: any | null, updatedAt?: any | null } | null };

export type IGetPredictQueryVariables = Exact<{
  employeeId: Scalars['Int'];
}>;


export type IGetPredictQuery = { __typename?: 'Query', prediction?: Array<{ __typename?: 'Post', _id?: string | null } | null> | null };

export type IGetSkillsByEmployeeQueryVariables = Exact<{
  employeeId: Scalars['Int'];
}>;


export type IGetSkillsByEmployeeQuery = { __typename?: 'Query', skillsByEmployee?: Array<{ __typename?: 'Skill', id?: number | null, employeeId?: number | null, title?: string | null, level?: number | null } | null> | null };


export const GetBusinessByUserDocument = gql`
    query GetBusinessByUser($user: String!) {
  businessByUser(user: $user) {
    id
    user
    name
    phone
    professional
    email
    github
    linkedin
    sourceImage
    category
  }
}
    `;

/**
 * __useGetBusinessByUserQuery__
 *
 * To run a query within a React component, call `useGetBusinessByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBusinessByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBusinessByUserQuery({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useGetBusinessByUserQuery(baseOptions: Apollo.QueryHookOptions<IGetBusinessByUserQuery, IGetBusinessByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IGetBusinessByUserQuery, IGetBusinessByUserQueryVariables>(GetBusinessByUserDocument, options);
      }
export function useGetBusinessByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IGetBusinessByUserQuery, IGetBusinessByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IGetBusinessByUserQuery, IGetBusinessByUserQueryVariables>(GetBusinessByUserDocument, options);
        }
export type GetBusinessByUserQueryHookResult = ReturnType<typeof useGetBusinessByUserQuery>;
export type GetBusinessByUserLazyQueryHookResult = ReturnType<typeof useGetBusinessByUserLazyQuery>;
export type GetBusinessByUserQueryResult = Apollo.QueryResult<IGetBusinessByUserQuery, IGetBusinessByUserQueryVariables>;
export const GetBusinessDocument = gql`
    query GetBusiness($businessId: Int!) {
  business(id: $businessId) {
    id
    user
    name
    phone
    professional
    email
    github
    linkedin
    sourceImage
    category
  }
}
    `;

/**
 * __useGetBusinessQuery__
 *
 * To run a query within a React component, call `useGetBusinessQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBusinessQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBusinessQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *   },
 * });
 */
export function useGetBusinessQuery(baseOptions: Apollo.QueryHookOptions<IGetBusinessQuery, IGetBusinessQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IGetBusinessQuery, IGetBusinessQueryVariables>(GetBusinessDocument, options);
      }
export function useGetBusinessLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IGetBusinessQuery, IGetBusinessQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IGetBusinessQuery, IGetBusinessQueryVariables>(GetBusinessDocument, options);
        }
export type GetBusinessQueryHookResult = ReturnType<typeof useGetBusinessQuery>;
export type GetBusinessLazyQueryHookResult = ReturnType<typeof useGetBusinessLazyQuery>;
export type GetBusinessQueryResult = Apollo.QueryResult<IGetBusinessQuery, IGetBusinessQueryVariables>;
export const GetEmployeeByUserDocument = gql`
    query GetEmployeeByUser($user: String) {
  employeeByUser(user: $user) {
    id
    user
    name
    phone
    professional
    email
    github
    linkedin
    sourceImage
  }
}
    `;

/**
 * __useGetEmployeeByUserQuery__
 *
 * To run a query within a React component, call `useGetEmployeeByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEmployeeByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEmployeeByUserQuery({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useGetEmployeeByUserQuery(baseOptions?: Apollo.QueryHookOptions<IGetEmployeeByUserQuery, IGetEmployeeByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IGetEmployeeByUserQuery, IGetEmployeeByUserQueryVariables>(GetEmployeeByUserDocument, options);
      }
export function useGetEmployeeByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IGetEmployeeByUserQuery, IGetEmployeeByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IGetEmployeeByUserQuery, IGetEmployeeByUserQueryVariables>(GetEmployeeByUserDocument, options);
        }
export type GetEmployeeByUserQueryHookResult = ReturnType<typeof useGetEmployeeByUserQuery>;
export type GetEmployeeByUserLazyQueryHookResult = ReturnType<typeof useGetEmployeeByUserLazyQuery>;
export type GetEmployeeByUserQueryResult = Apollo.QueryResult<IGetEmployeeByUserQuery, IGetEmployeeByUserQueryVariables>;
export const GetEmployeeIdByUserDocument = gql`
    query GetEmployeeIdByUser($user: String) {
  employeeByUser(user: $user) {
    id
  }
}
    `;

/**
 * __useGetEmployeeIdByUserQuery__
 *
 * To run a query within a React component, call `useGetEmployeeIdByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEmployeeIdByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEmployeeIdByUserQuery({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useGetEmployeeIdByUserQuery(baseOptions?: Apollo.QueryHookOptions<IGetEmployeeIdByUserQuery, IGetEmployeeIdByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IGetEmployeeIdByUserQuery, IGetEmployeeIdByUserQueryVariables>(GetEmployeeIdByUserDocument, options);
      }
export function useGetEmployeeIdByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IGetEmployeeIdByUserQuery, IGetEmployeeIdByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IGetEmployeeIdByUserQuery, IGetEmployeeIdByUserQueryVariables>(GetEmployeeIdByUserDocument, options);
        }
export type GetEmployeeIdByUserQueryHookResult = ReturnType<typeof useGetEmployeeIdByUserQuery>;
export type GetEmployeeIdByUserLazyQueryHookResult = ReturnType<typeof useGetEmployeeIdByUserLazyQuery>;
export type GetEmployeeIdByUserQueryResult = Apollo.QueryResult<IGetEmployeeIdByUserQuery, IGetEmployeeIdByUserQueryVariables>;
export const GetEmployeeDocument = gql`
    query GetEmployee($employeeId: Int!) {
  employee(id: $employeeId) {
    id
    user
    name
    phone
    professional
    email
    github
    linkedin
    sourceImage
  }
}
    `;

/**
 * __useGetEmployeeQuery__
 *
 * To run a query within a React component, call `useGetEmployeeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEmployeeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEmployeeQuery({
 *   variables: {
 *      employeeId: // value for 'employeeId'
 *   },
 * });
 */
export function useGetEmployeeQuery(baseOptions: Apollo.QueryHookOptions<IGetEmployeeQuery, IGetEmployeeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IGetEmployeeQuery, IGetEmployeeQueryVariables>(GetEmployeeDocument, options);
      }
export function useGetEmployeeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IGetEmployeeQuery, IGetEmployeeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IGetEmployeeQuery, IGetEmployeeQueryVariables>(GetEmployeeDocument, options);
        }
export type GetEmployeeQueryHookResult = ReturnType<typeof useGetEmployeeQuery>;
export type GetEmployeeLazyQueryHookResult = ReturnType<typeof useGetEmployeeLazyQuery>;
export type GetEmployeeQueryResult = Apollo.QueryResult<IGetEmployeeQuery, IGetEmployeeQueryVariables>;
export const GetDefaultCvDocument = gql`
    query GetDefaultCV($employeeId: Int!) {
  defaultCV(employeeId: $employeeId) {
    id
    user
    name
    phone
    professional
    email
    github
    linkedin
    sourceImage
    skills {
      id
      employeeId
      title
      level
    }
    certificate {
      iig {
        lr {
          id
          employeeId
          testDate
          shiftTest
          expireDate
          listeningScore
          readingScore
          time
        }
        sw {
          id
          employeeId
          testDate
          shiftTest
          expireDate
          speakingScore
          writingScore
          time
        }
      }
    }
  }
}
    `;

/**
 * __useGetDefaultCvQuery__
 *
 * To run a query within a React component, call `useGetDefaultCvQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDefaultCvQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDefaultCvQuery({
 *   variables: {
 *      employeeId: // value for 'employeeId'
 *   },
 * });
 */
export function useGetDefaultCvQuery(baseOptions: Apollo.QueryHookOptions<IGetDefaultCvQuery, IGetDefaultCvQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IGetDefaultCvQuery, IGetDefaultCvQueryVariables>(GetDefaultCvDocument, options);
      }
export function useGetDefaultCvLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IGetDefaultCvQuery, IGetDefaultCvQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IGetDefaultCvQuery, IGetDefaultCvQueryVariables>(GetDefaultCvDocument, options);
        }
export type GetDefaultCvQueryHookResult = ReturnType<typeof useGetDefaultCvQuery>;
export type GetDefaultCvLazyQueryHookResult = ReturnType<typeof useGetDefaultCvLazyQuery>;
export type GetDefaultCvQueryResult = Apollo.QueryResult<IGetDefaultCvQuery, IGetDefaultCvQueryVariables>;
export const GetIigRequestStatusDocument = gql`
    query GetIIGRequestStatus($employeeId: Int!) {
  requestStatus(employeeId: $employeeId) {
    lr
    sw
  }
}
    `;

/**
 * __useGetIigRequestStatusQuery__
 *
 * To run a query within a React component, call `useGetIigRequestStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetIigRequestStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetIigRequestStatusQuery({
 *   variables: {
 *      employeeId: // value for 'employeeId'
 *   },
 * });
 */
export function useGetIigRequestStatusQuery(baseOptions: Apollo.QueryHookOptions<IGetIigRequestStatusQuery, IGetIigRequestStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IGetIigRequestStatusQuery, IGetIigRequestStatusQueryVariables>(GetIigRequestStatusDocument, options);
      }
export function useGetIigRequestStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IGetIigRequestStatusQuery, IGetIigRequestStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IGetIigRequestStatusQuery, IGetIigRequestStatusQueryVariables>(GetIigRequestStatusDocument, options);
        }
export type GetIigRequestStatusQueryHookResult = ReturnType<typeof useGetIigRequestStatusQuery>;
export type GetIigRequestStatusLazyQueryHookResult = ReturnType<typeof useGetIigRequestStatusLazyQuery>;
export type GetIigRequestStatusQueryResult = Apollo.QueryResult<IGetIigRequestStatusQuery, IGetIigRequestStatusQueryVariables>;
export const GetPostDocument = gql`
    query GetPost($postId: String!, $employeeId: Int) {
  post(id: $postId, employeeId: $employeeId) {
    _id
    businessId
    images
    videos
    content
    hashtag
    status
    job
    applied
    businessImage
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetPostQuery__
 *
 * To run a query within a React component, call `useGetPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *      employeeId: // value for 'employeeId'
 *   },
 * });
 */
export function useGetPostQuery(baseOptions: Apollo.QueryHookOptions<IGetPostQuery, IGetPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IGetPostQuery, IGetPostQueryVariables>(GetPostDocument, options);
      }
export function useGetPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IGetPostQuery, IGetPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IGetPostQuery, IGetPostQueryVariables>(GetPostDocument, options);
        }
export type GetPostQueryHookResult = ReturnType<typeof useGetPostQuery>;
export type GetPostLazyQueryHookResult = ReturnType<typeof useGetPostLazyQuery>;
export type GetPostQueryResult = Apollo.QueryResult<IGetPostQuery, IGetPostQueryVariables>;
export const GetPredictDocument = gql`
    query GetPredict($employeeId: Int!) {
  prediction(id: $employeeId) {
    _id
  }
}
    `;

/**
 * __useGetPredictQuery__
 *
 * To run a query within a React component, call `useGetPredictQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPredictQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPredictQuery({
 *   variables: {
 *      employeeId: // value for 'employeeId'
 *   },
 * });
 */
export function useGetPredictQuery(baseOptions: Apollo.QueryHookOptions<IGetPredictQuery, IGetPredictQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IGetPredictQuery, IGetPredictQueryVariables>(GetPredictDocument, options);
      }
export function useGetPredictLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IGetPredictQuery, IGetPredictQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IGetPredictQuery, IGetPredictQueryVariables>(GetPredictDocument, options);
        }
export type GetPredictQueryHookResult = ReturnType<typeof useGetPredictQuery>;
export type GetPredictLazyQueryHookResult = ReturnType<typeof useGetPredictLazyQuery>;
export type GetPredictQueryResult = Apollo.QueryResult<IGetPredictQuery, IGetPredictQueryVariables>;
export const GetSkillsByEmployeeDocument = gql`
    query GetSkillsByEmployee($employeeId: Int!) {
  skillsByEmployee(employeeId: $employeeId) {
    id
    employeeId
    title
    level
  }
}
    `;

/**
 * __useGetSkillsByEmployeeQuery__
 *
 * To run a query within a React component, call `useGetSkillsByEmployeeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSkillsByEmployeeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSkillsByEmployeeQuery({
 *   variables: {
 *      employeeId: // value for 'employeeId'
 *   },
 * });
 */
export function useGetSkillsByEmployeeQuery(baseOptions: Apollo.QueryHookOptions<IGetSkillsByEmployeeQuery, IGetSkillsByEmployeeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IGetSkillsByEmployeeQuery, IGetSkillsByEmployeeQueryVariables>(GetSkillsByEmployeeDocument, options);
      }
export function useGetSkillsByEmployeeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IGetSkillsByEmployeeQuery, IGetSkillsByEmployeeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IGetSkillsByEmployeeQuery, IGetSkillsByEmployeeQueryVariables>(GetSkillsByEmployeeDocument, options);
        }
export type GetSkillsByEmployeeQueryHookResult = ReturnType<typeof useGetSkillsByEmployeeQuery>;
export type GetSkillsByEmployeeLazyQueryHookResult = ReturnType<typeof useGetSkillsByEmployeeLazyQuery>;
export type GetSkillsByEmployeeQueryResult = Apollo.QueryResult<IGetSkillsByEmployeeQuery, IGetSkillsByEmployeeQueryVariables>;