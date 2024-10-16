import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { img185 } from "../api/movieDB";

const { width, height } = Dimensions.get("window");

const MovieList = ({ title, data, hideSeeAll }) => {
  let movieName = "Harold and the Purple Crayon";
  const navigation = useNavigation();
  return (
    <View className=" mx-2 mb-8 space-y-4">
      <View className=" flex-row justify-between items-center">
        <Text className=" text-white text-2xl font-medium pb-3">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text className=" text-[#eddb8e] text-lg">See All</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.push("Movie", item)}
            >
              <View className=" space-y-1 mr-4">
                <Image
                  source={{ uri: img185(item.poster_path) }}
                  className=" rounded-3xl"
                  style={{ width: width * 0.33, height: height * 0.22 }}
                ></Image>
                <Text className=" text-neutral-300 ml-1">
                  {item.title.length > 14
                    ? item.title.slice(0, 14) + "..."
                    : item.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MovieList;
