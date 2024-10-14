import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/loading";
import { debounce, set } from "lodash";
import { fetchSearchMovies, img185 } from "../api/movieDB";

var { width, height } = Dimensions.get("window");

export default function SearchScreen() {
  const [searchData, setSearchData] = useState([]);
  const navigation = useNavigation();
  const movieName = "Harold and the purple Crayon";
  const [loading, setLoading] = useState(false);

  const handleSearch = (value) => {
    if (value && value.length > 2) {
      setLoading(true);
      fetchSearchMovies({
        query: value,
        include_adult: "true",
        language: "em-US",
        page: "1",
      }).then((data) => {
        setLoading(false);
        if (data && data.results) {
          setSearchData(data.results);
        }
      });
    } else {
      setLoading(false);
      setSearchData([]);
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 500), []);

  return (
    <SafeAreaView className=" bg-neutral-900 flex-1">
      <View className=" mx-4 mt-5 mb-3 flex-row justify-between items-center border-2 border-neutral-500  rounded-full">
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search Movie"
          placeholderTextColor={"lightgray"}
          className=" p-3 flex-1 font-semibold text-base text-white tracking-wider"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          className=" rounded-full bg-red-500 p-3 m-1"
        >
          <XMarkIcon size={25} color="white" />
        </TouchableOpacity>
      </View>

      {/* Search Results */}
      {loading ? (
        <Loading />
      ) : searchData.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className=" space-y-3"
        >
          <Text className=" text-white font-semibold ml-2">
            Results ({searchData.length})
          </Text>
          <View className=" flex-row justify-between flex-wrap">
            {searchData.map((item, i) => {
              return (
                <TouchableWithoutFeedback
                  key={i}
                  onPress={() => navigation.push("Movie", item)}
                  className=""
                >
                  <View className=" space-y-3 mb-4">
                    <Image
                      source={{ uri: img185(item?.poster_path) }}
                      style={{ width: width * 0.44, height: height * 0.3 }}
                      className=" rounded-3xl"
                    />
                    <Text className=" text-neutral-300 text-base ml-2">
                      {item?.title.length > 20
                        ? item?.title.slice(0, 20) + "...."
                        : item?.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View className=" flex-row justify-center">
          <Image
            source={require("../assets/not-found.png")}
            className=" w-72 h-72 mt-5"
          />
        </View>
      )}
    </SafeAreaView>
  );
}
