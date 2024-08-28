import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import TrendingMovies from "../components/trendingMovies";

const ios = Platform.OS == "ios";

const HomeScreen = () => {
  const [trending, setTrending] = useState([1, 2, 3]);
  return (
    <View className="flex-1 bg-neutral-900">
      <SafeAreaView className={ios ? " -mb-2" : " mb-3"}>
        <View className=" flex-row justify-between items-center mx-3">
          <TouchableOpacity>
            <Bars3CenterLeftIcon size={30} color={"#fff"} />
          </TouchableOpacity>
          <Text className=" text-white text-3xl font-semibold">
            <Text className=" text-[#eddb8e]">M</Text>ovies
          </Text>
          <TouchableOpacity>
            <MagnifyingGlassIcon color={"#fff"} size={30} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 10 }}
      >
        {/* Trending moviews carasoul */}
        <TrendingMovies data={trending} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
