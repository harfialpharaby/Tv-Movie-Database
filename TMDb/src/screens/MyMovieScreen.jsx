import React, { Component } from "react";
import { View, FlatList } from "react-native";

import apolloClient from "../config/graphql";
import LoadingIndicator from "../components/LoadingIndicator";
import ListCard from "../components/ListCard";
import { GET_MOVIES } from "../graphql";

export default class MyMovieScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      movies: []
    };
  }

  async fetchQuery() {
    const { loading, data } = await apolloClient.query({ query: GET_MOVIES });
    this.setState({
      movies: [...this.state.movies, ...data.movies],
      isLoading: loading
    });
  }

  componentDidMount() {
    this.fetchQuery();
  }

  render() {
    return this.state.isLoading ? (
      <LoadingIndicator></LoadingIndicator>
    ) : (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.movies}
          renderItem={({ item }) => <ListCard item={item} />}
          keyExtractor={item => item._id}
        />
      </View>
    );
  }
}
