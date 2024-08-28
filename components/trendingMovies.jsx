import {
  Dimensions,
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import React from "react";

const { width, height } = Dimensions.get("window");

const trendingMovies = ({ data }) => {
  return (
    <View className=" mb-8">
      <Text className=" text-white text-2xl font-medium">Trending</Text>
      <Carousel
        loop
        mode="parallax"
        parallaxScrollScale={0.5}
        parallaxScrollingOffset={20}
        width={width}
        height={height*.6}
        autoPlay={true}
        data={data}
        scrollAnimationDuration={4000}
        renderItem={({ item }) => <MovieCard item={item} />}
      />
    </View>
  );
};

const MovieCard = ({ item }) => {
  return (
    <View className=' flex-1 justify-center items-center'>
      <TouchableWithoutFeedback>
        <Image
          source={require("../assets/poster1.jpg")}
          style={{ width: width*0.9, height: height*0.65 }}
          className=' rounded-lg overflow-hidden'
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default trendingMovies;
