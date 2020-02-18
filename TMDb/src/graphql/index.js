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

export const DEL_MOVIE = gql`
  mutation inputDeletion($_id: String) {
    deleteMovie(_id: $_id) {
      status
    }
  }
`;

export const DEL_TV = gql`
  mutation inputDeletion($_id: String) {
    deleteTv(_id: $_id) {
      status
    }
  }
`;

export const UPDATE_MOVIE = gql`
  mutation($_id: String, $title: String, $overview: String, $tags: [String]) {
    updateMovie(_id: $_id, title: $title, overview: $overview, tags: $tags) {
      _id
      title
      overview
      posterPath
      popularity
      tags
    }
  }
`;

export const UPDATE_TV = gql`
  mutation($_id: String, $title: String, $overview: String, $tags: [String]) {
    updateTv(_id: $_id, title: $title, overview: $overview, tags: $tags) {
      _id
      title
      overview
      posterPath
      popularity
      tags
    }
  }
`;
