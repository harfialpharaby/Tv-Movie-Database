import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator
} from "react-native";
import Constants from "expo-constants";
import Carousel from "react-native-snap-carousel";
import { gql } from "apollo-boost";

import apolloClient from "../config/graphql";
import MovieCard from "../components/MovieCard";
import PosterImage from "../components/PosterImage";

const query = gql`
  query getPopularMoviesOnPage($page: Int) {
    nowPlaying(page: $page) {
      id
      title
      original_title
      overview
      poster_path
      popularity
      tags {
        name
      }
    }
  }
`;

class MovieScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      isLoading: true,
      indexImage: 0,
      page: 1
    };
  }

  fetchQuery() {
    apolloClient
      .query({ query, variables: { page: this.state.page } })
      .then(response => {
        const { loading, data } = response;
        this.setState({
          movies: [...this.state.movies, ...data.nowPlaying],
          isLoading: loading,
          indexImage: 0
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.fetchQuery();
  }

  render() {
    const { navigation } = this.props;
    const { width } = Dimensions.get("window");
    return (
      <View style={{ flex: 1 }}>
        {this.state.isLoading ? (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <ActivityIndicator size="large" color="blue" />
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                marginTop: 10,
                letterSpacing: 5,
                textTransform: "uppercase"
              }}
            >
              Loading...
            </Text>
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <PosterImage
              poster_path={this.state.movies[this.state.indexImage].poster_path}
            ></PosterImage>
            <View
              style={{
                position: "absolute",
                width: 60,
                top: Constants.statusBarHeight * 2,
                backgroundColor: "white"
              }}
            >
              <TouchableWithoutFeedback onPress={navigation.openDrawer}>
                <Image
                  source={require("../../assets/drawer.png")}
                  style={{
                    height: 30,
                    width: 30,
                    alignSelf: "flex-end",
                    tintColor: "black"
                  }}
                />
              </TouchableWithoutFeedback>
            </View>
            <View
              style={{
                position: "absolute",
                height: 150,
                bottom: 0,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Carousel
                layout={"default"}
                ref={c => {
                  this._carousel = c;
                }}
                style={{ flex: 1 }}
                data={this.state.movies}
                renderItem={MovieCard}
                sliderWidth={width}
                itemWidth={width - 80}
                snapOnAndroid={true}
                onSnapToItem={index => {
                  this.setState({
                    indexImage: index
                  });
                }}
              />
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default MovieScreen;
