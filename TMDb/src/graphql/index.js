import { gql } from "apollo-boost";

export const GET_MOVIES = gql`
  query {
    movies {
      _id
      title
      overview
      posterPath
      popularity
      tags
    }
  }
`;

export const GET_TV = gql`
  query {
    tvAll {
      _id
      title
      overview
      posterPath
      popularity
      tags
    }
  }
`;

export const ADD_MOVIE = gql`
  mutation inputAddMovie(
    $title: String
    $overview: String
    $posterPath: String
    $popularity: Float
    $tags: [String]
  ) {
    addMovie(
      title: $title
      overview: $overview
      posterPath: $posterPath
      popularity: $popularity
      tags: $tags
    ) {
      _id
      title
      overview
      posterPath
      popularity
      tags
    }
  }
`;

export const ADD_TV = gql`
  mutation inputAddTv(
    $title: String
    $overview: String
    $posterPath: String
    $popularity: Float
    $tags: [String]
  ) {
    addTv(
      title: $title
      overview: $overview
      posterPath: $posterPath
      popularity: $popularity
      tags: $tags
    ) {
      _id
      title
      overview
      posterPath
      popularity
      tags
    }
  }
`;
