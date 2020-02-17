import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import { gql } from "apollo-boost";

import apolloClient from "../config/graphql";
import ListCard from "../components/ListCard";

const query = gql`
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

export default class MyTvScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      tvAll: []
    };
  }

  async fetchQuery() {
    const { loading, data } = await apolloClient.query({ query });
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
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={{ textAlignVertical: "center" }}>Loading...</Text>
      </View>
    ) : (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.tvAll}
          renderItem={({ item }) => <ListCard item={item} />}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}
