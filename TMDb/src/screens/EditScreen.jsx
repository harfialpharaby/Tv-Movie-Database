import React, { Component } from "react";
import { Platform, ToastAndroid } from "react-native";
import ApolloClient from "../config/graphql";
import _ from "lodash";

import { UPDATE_MOVIE, UPDATE_TV, GET_MOVIES, GET_TV } from "../graphql";
import EditContent from "../components/Edit";

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.route.params.item.__typename,
      newData: {
        _id: this.props.route.params.item._id,
        title: this.props.route.params.item.title,
        overview: this.props.route.params.item.overview,
        tags: this.props.route.params.item.tags
      }
    };
    this.onChangeTextDelayed = _.debounce(this.onChangeText, 500);
  }

  onChangeText = value => {
    if (value.tags) {
      const tags = value.tags.split(",").reduce((acc, tag) => {
        acc.push(tag.trim());
        return acc;
      }, []);

      this.setState({
        newData: {
          ...this.state.newData,
          tags
        }
      });
    } else {
      this.setState({
        newData: {
          ...this.state.newData,
          ...value
        }
      });
    }
  };

  handleSubmit = () => {
    this.state.type === "Movie" ? this.updateMovie() : this.updateTv();
  };

  updateMovie = async () => {
    const { data } = await ApolloClient.mutate({
      mutation: UPDATE_MOVIE,
      variables: this.state.newData,
      refetchQueries: [{ query: GET_MOVIES }]
    });
    Platform.OS === "android"
      ? ToastAndroid.show("Data successfully changed", ToastAndroid.SHORT)
      : null;
    this.props.navigation.navigate("MyMovies");
  };

  updateTv = async () => {
    const { data } = await ApolloClient.mutate({
      mutation: UPDATE_TV,
      variables: this.state.newData,
      refetchQueries: [{ query: GET_TV }]
    });
    Platform.OS === "android"
      ? ToastAndroid.show("Data successfully changed", ToastAndroid.SHORT)
      : null;
    this.props.navigation.navigate("MyTv");
  };

  render() {
    return (
      <EditContent
        {...this.props}
        state={this.state.newData}
        onChangeText={this.onChangeTextDelayed}
        handleSubmit={this.handleSubmit}
      ></EditContent>
    );
  }
}
