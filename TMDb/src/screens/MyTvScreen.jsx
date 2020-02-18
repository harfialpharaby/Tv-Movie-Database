import React, { Component } from "react";
import { View, FlatList } from "react-native";

import apolloClient from "../config/graphql";
import ListCard from "../components/ListCard";
import LoadingIndicator from "../components/LoadingIndicator";
import { GET_TV } from "../graphql";

export default class MyTvScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      tvAll: []
    };
  }

  async fetchQuery() {
    const { loading, data } = await apolloClient.query({ query: GET_TV });
    this.setState({
      tvAll: [...this.state.tvAll, ...data.tvAll],
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
          data={this.state.tvAll}
          renderItem={({ item }) => <ListCard item={item} />}
          keyExtractor={item => item._id}
        />
      </View>
    );
  }
}
