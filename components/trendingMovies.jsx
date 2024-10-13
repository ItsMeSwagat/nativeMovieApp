import {
  Dimensions,
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { img500 } from "../api/movieDB";

const { width, height } = Dimensions.get("window");

const trendingMovies = ({ data }) => {
  const navigation = useNavigation();
  const handleClick = (item) => {
    navigation.navigate("Movie", item);
  };
  return (
    <View className=" justify-center mb-8">
      <Text className=" text-white text-2xl font-medium">Trending</Text>
      <Carousel
        loop
        mode="parallax"
        parallaxScrollScale={0.5}
        parallaxScrollingOffset={20}
        width={width}
        height={height * 0.65}
        autoPlay={true}
        data={data}
        scrollAnimationDuration={5000}
        renderItem={({ item }) => (
          <MovieCard item={item} handleClick={handleClick} />
        )}
      />
    </View>
  );
};

const MovieCard = ({ item, handleClick }) => {
  return (
    <View className=" flex-1 justify-center items-center rounded-3xl overflow-hidden">
      <TouchableWithoutFeedback onPress={() => handleClick(item)}>
        <Image
          source={{ uri: img500(item.poster_path) }}
          style={{ width: width, height: height }}
          className=" rounded-3xl overflow-hidden"
          resizeMode="contain"
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default trendingMovies;
