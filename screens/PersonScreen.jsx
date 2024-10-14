import {
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import MovieList from "../components/movieList";
import { useNavigation, useRoute } from "@react-navigation/native";
import Loading from "../components/loading";
import { fetchCastDetails, fetchCastMovies, img342 } from "../api/movieDB";

var { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const verticalMargin = ios ? "" : " my-3";

export default function PersonScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [isFavourite, setIsFavourite] = useState(false);
  const [personMovies, setPersonMovies] = useState([]);
  const [cast, setCast] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCastDetails(item.id);
    getCastMovies(item.id);
  }, [item]);

  const getCastDetails = async (id) => {
    const data = await fetchCastDetails(id);
    if (data) {
      setCast(data);
    }
    setLoading(false);
  };

  const getCastMovies = async (id) => {
    const data = await fetchCastMovies(id);
    if (data && data.cast) {
      setPersonMovies(data.cast);
    }
    setLoading(false);
  };

  return (
    <ScrollView
      className=" flex-1 bg-neutral-900"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <SafeAreaView
        className={
          "z-20 w-full flex-row justify-between items-center px-4" +
          verticalMargin
        }
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className=" rounded-xl p-1 bg-yellow-400"
        >
          <ChevronLeftIcon size={30} color="white" strokeWidth={2.5} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)}>
          <HeartIcon size={35} color={isFavourite ? "#eddb8e" : "white"} />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Cast Details */}
      {loading ? (
        <Loading />
      ) : (
        <View>
          <View
            className=" flex-row justify-center"
            style={{
              shadowColor: "gray",
              shadowRadius: 40,
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 1,
            }}
          >
            <View className=" rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-400">
              <Image
                source={{ uri: img342(cast.profile_path) }}
                style={{ width: width * 0.74, height: height * 0.43 }}
                className=""
              />
            </View>
          </View>

          <View className=" mt-5">
            <Text className=" text-3xl text-white font-bold text-center">
              {cast?.name}
            </Text>
            <Text className=" text-center text-neutral-500 text-base">
              {cast?.place_of_birth}
            </Text>
          </View>

          <View className=" bg-neutral-700 rounded-3xl p-4 mt-6 flex-row justify-evenly items-center mx-3">
            <View className=" items-center border-r-2 border-neutral-400 px-2">
              <Text className=" font-semibold text-base text-white">
                Gender
              </Text>
              <Text className=" text-neutral-300 text-sm">
                {cast?.gender == 1 ? "Female" : "Male"}
              </Text>
            </View>
            <View className=" items-center border-r-2 border-neutral-400 px-2">
              <Text className=" font-semibold text-base text-white">
                Birthday
              </Text>
              <Text className=" text-neutral-300 text-sm">
                {cast?.birthday}
              </Text>
            </View>
            <View className=" items-center border-r-2 border-neutral-400 px-2">
              <Text className=" font-semibold text-base text-white">
                Known For
              </Text>
              <Text className=" text-neutral-300 text-sm">
                {cast?.known_for_department}
              </Text>
            </View>
            <View className=" items-center px-2">
              <Text className=" font-semibold text-base text-white">
                Popularity
              </Text>
              <Text className=" text-neutral-300 text-sm">
                {cast?.popularity?.toFixed(2)}%
              </Text>
            </View>
          </View>

          <View className=" my-6 mx-4 space-y-2">
            <Text className=" text-white text-lg font-semibold">Biography</Text>
            <Text className=" text-neutral-400 text-justify tracking-wide">
              {cast?.biography || "N/A"}
            </Text>
          </View>

          <MovieList title={"Movies"} hideSeeAll={true} data={personMovies} />
        </View>
      )}
    </ScrollView>
  );
}
