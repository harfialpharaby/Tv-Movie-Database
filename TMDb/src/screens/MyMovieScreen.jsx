import React, { Component } from "react";
import { View, FlatList } from "react-native";
import { useQuery } from "@apollo/react-hooks";

import { GET_MOVIES } from "../graphql";
import LoadingIndicator from "../components/LoadingIndicator";
import ListCard from "../components/ListCard";
import NothingAdded from "../components/NothingAdded";

export default function(props) {
  const { called, loading, data } = useQuery(GET_MOVIES);
  if (loading) {
    return <LoadingIndicator></LoadingIndicator>;
  }
  return <MyMovieScreen {...props} movies={data.movies} />;
}

class MyMovieScreen extends Component {
  render() {
    const { loading, movies } = this.props;
    return loading ? (
      <LoadingIndicator></LoadingIndicator>
    ) : !movies.length ? (
      <NothingAdded></NothingAdded>
    ) : (
      <View style={{ flex: 1 }}>
        <FlatList
          data={movies}
          renderItem={({ item }) => <ListCard item={item} />}
          keyExtractor={item => item._id}
        />
      </View>
    );
  }
}
