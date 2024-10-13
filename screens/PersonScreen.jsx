import {
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import MovieList from "../components/movieList";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/loading";

var { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const verticalMargin = ios ? "" : " my-3";

export default function PersonScreen() {
  const navigation = useNavigation();
  const [isFavourite, setIsFavourite] = useState(false);
  const [personMovies, setPersonMovies] = useState([1, 2, 3, 4, 5]);
  const [loading, setLoading] = useState(false);
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
                source={require("../assets/cast1.webp")}
                style={{ width: width * 0.74, height: height * 0.43 }}
                className=""
              />
            </View>
          </View>

          <View className=" mt-5">
            <Text className=" text-3xl text-white font-bold text-center">
              Keanue Reeves
            </Text>
            <Text className=" text-center text-neutral-500 text-base">
              London, United Kingdom
            </Text>
          </View>

          <View className=" bg-neutral-700 rounded-3xl p-4 mt-6 flex-row justify-evenly items-center mx-3">
            <View className=" items-center border-r-2 border-neutral-400 px-2">
              <Text className=" font-semibold text-base text-white">
                Gender
              </Text>
              <Text className=" text-neutral-300 text-sm">Male</Text>
            </View>
            <View className=" items-center border-r-2 border-neutral-400 px-2">
              <Text className=" font-semibold text-base text-white">
                Birthday
              </Text>
              <Text className=" text-neutral-300 text-sm">1964-09-02</Text>
            </View>
            <View className=" items-center border-r-2 border-neutral-400 px-2">
              <Text className=" font-semibold text-base text-white">
                Known For
              </Text>
              <Text className=" text-neutral-300 text-sm">Acting</Text>
            </View>
            <View className=" items-center px-2">
              <Text className=" font-semibold text-base text-white">
                Popularity
              </Text>
              <Text className=" text-neutral-300 text-sm">72.63%</Text>
            </View>
          </View>

          <View className=" my-6 mx-4 space-y-2">
            <Text className=" text-white text-lg font-semibold">Biography</Text>
            <Text className=" text-neutral-400 text-justify tracking-wide">
              Zachary Levi Pugh (/ˈzækəri ˈliːvaɪ/; born September 29, 1980) is
              an American actor, comedian, and singer. He received critical
              acclaim for starring as Chuck Bartowski in the series Chuck, and
              as the title character in Shazam! and its 2022 sequel, as a part
              of the DC Extended Universe. He voiced Eugene Fitzherbert in the
              2010 animated film Tangled, where he performed "I See the Light"
              with Mandy Moore; the song won a Grammy Award for Best Song
              Written for Visual Media. He reprised the voice role in the 2012
              short film Tangled Ever After and in 2017, Rapunzel's Tangled
              Adventure, a Disney Channel television series based on the film.
              He has appeared in the Marvel Cinematic Universe films Thor: The
              Dark World and Thor: Ragnarok as Fandral. Levi starred as Georg
              Nowack in the 2016 Broadway revival of She Loves Me opposite Laura
              Benanti, for which he received a Tony Award nomination.
            </Text>
          </View>

          <MovieList title={"Movies"} hideSeeAll={true} data={personMovies} />
        </View>
      )}
    </ScrollView>
  );
}
