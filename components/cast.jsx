import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { fallbackCastImg, img185 } from "../api/movieDB";

export default function Cast({ cast, navigation }) {
  let personName = "Keanu Reeves";
  let characterName = "John Wick";

  return (
    <View className=" my-6">
      <Text className=" text-white text-xl mx-4 mb-5">Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      >
        {cast &&
          cast.map((person, i) => {
            return (
              <TouchableOpacity
                key={i}
                className=" mr-4 items-center"
                onPress={() => navigation.navigate("Person", person)}
              >
                <View className=" overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500">
                  <Image
                    source={{
                      uri: img185(person?.profile_path) || fallbackCastImg,
                    }}
                    className=" rounded-2xl h-24 w-20"
                  />
                </View>
                <Text className=" text-white text-xs mt-1">
                  {person?.character.length > 10
                    ? person?.character.slice(0, 10) + "..."
                    : person?.character}
                </Text>

                <Text className=" text-white text-xs mt-1">
                  {person?.original_name.length > 10
                    ? person?.original_name.slice(0, 10) + "..."
                    : person?.original_name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
}
