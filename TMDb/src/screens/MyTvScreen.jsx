import React, { Component } from "react";
import { View, FlatList } from "react-native";
import { useQuery } from "@apollo/react-hooks";

import { GET_TV } from "../graphql";
import ListCard from "../components/ListCard";
import LoadingIndicator from "../components/LoadingIndicator";
import NothingAdded from "../components/NothingAdded";

export default function(props) {
  const { called, loading, data } = useQuery(GET_TV);
  if (loading) {
    return <LoadingIndicator></LoadingIndicator>;
  }
  return <MyTvScreen {...props} tvAll={data.tvAll} />;
}

class MyTvScreen extends Component {
  render() {
    const { loading, tvAll } = this.props;
    return loading ? (
      <LoadingIndicator></LoadingIndicator>
    ) : !tvAll.length ? (
      <NothingAdded></NothingAdded>
    ) : (
      <View style={{ flex: 1 }}>
        <FlatList
          data={tvAll}
          renderItem={({ item }) => <ListCard item={item} />}
          keyExtractor={item => item._id}
        />
      </View>
    );
  }
}
