import React, { Component } from "react";
import { View, Dimensions, Image, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import Carousel from "react-native-snap-carousel";
import { gql } from "apollo-boost";

import apolloClient from "../config/graphql";
import MovieCard from "../components/MovieCard";
import PosterImage from "../components/PosterImage";
import LoadingIndicator from "../components/LoadingIndicator";

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
        id
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
      indexImage: -1,
      page: 1
    };
  }

  fetchQuery() {
    apolloClient
      .query({ query, variables: { page: 1 } })
      .then(response => {
        const { loading, data } = response;
        this.setState({
          movies: [...this.state.movies, ...data.nowPlaying],
          isLoading: loading,
          indexImage: 0,
          page: 1
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.fetchQuery();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.indexImage !== nextState.indexImage;
  }

  render() {
    const { navigation } = this.props;
    const { width } = Dimensions.get("window");

    return (
      <View style={{ flex: 1 }}>
        {this.state.isLoading ? (
          <LoadingIndicator></LoadingIndicator>
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
                right: 0,
                backgroundColor: "white"
              }}
            >
              <TouchableOpacity onPress={navigation.openDrawer}>
                <Image
                  source={require("../../assets/drawer.png")}
                  style={{
                    height: 35,
                    width: 35,
                    alignSelf: "flex-start",
                    tintColor: "black"
                  }}
                />
              </TouchableOpacity>
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
                data={this.state.movies.slice(0, this.state.indexImage + 3)}
                renderItem={({ item }) => (
                  <MovieCard
                    item={item}
                    poster={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                  />
                )}
                sliderWidth={width}
                itemWidth={width - 80}
                // onEndReached={() => console.log("END")}
                removeClippedSubviews={true}
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
