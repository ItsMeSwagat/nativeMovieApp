import { View, Text, TouchableWithoutFeedback, Image } from "react-native";
import React from "react";


export default function TrendingMovies({ data }) {
  return (
    <View className=" mb-8">
      <Text className=" text-white text-xl font-medium">Trending</Text>
     
    </View>
  );
}

const MovieCard = ({ item }) => {
  return (
    <TouchableWithoutFeedback>
        {/* <Image source={require('')} /> */}
    </TouchableWithoutFeedback>
  );
};
