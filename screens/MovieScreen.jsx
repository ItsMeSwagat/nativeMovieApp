import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/cast";
import MovieList from "../components/movieList";
import Loading from "../components/loading";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const topMargin = ios ? "" : " mt-4";

export default function MovieScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [isFavourite, setIsFavourite] = useState(false);
  const [cast, setCast] = useState([1, 2, 3, 4, 5]);
  const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4, 5]);
  const [loading, setLoading] = useState(false);
  let movieName = "Harold and the Purple Crayon";

  useEffect(() => {}, item);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          contentContainerStyle={{ paddingBottom: 20 }}
          className=" flex-1 z-20 bg-neutral-900"
        >
          <View className=" w-full">
            <SafeAreaView
              className={
                " absolute z-20 w-full flex-row justify-between items-center px-4" +
                topMargin
              }
            >
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                className=" rounded-xl p-1 bg-yellow-400"
              >
                <ChevronLeftIcon size={30} color="white" strokeWidth={2.5} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)}>
                <HeartIcon
                  size={35}
                  color={isFavourite ? "#eddb8e" : "white"}
                />
              </TouchableOpacity>
            </SafeAreaView>

            {/* Movie Poster */}

            <View>
              <Image
                source={require("../assets/poster1.jpg")}
                style={{ width, height: height * 0.55 }}
              />
              <LinearGradient
                colors={[
                  "transparent",
                  "rgba(23,23,23,0.8)",
                  "rgba(23,23,23,1)",
                ]}
                style={{ width, height: height * 0.4 }}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                className=" absolute bottom-0"
              />
            </View>
          </View>

          {/* Movie Details */}

          <View style={{ marginTop: -(height * 0.03) }} className=" space-y-3">
            <Text className=" text-white text-center text-3xl font-semibold tracking-wider px-4">
              {movieName}
            </Text>
            <Text className=" text-neutral-400 text-base text-center font-semibold">
              Released * 2020 * 170 min
            </Text>

            <View className=" flex-row justify-center mx-4 space-x-2">
              <Text className=" text-neutral-400 text-base text-center font-semibold">
                Action *
              </Text>
              <Text className=" text-neutral-400 text-base text-center font-semibold">
                Thrill *
              </Text>
              <Text className=" text-neutral-400 text-base text-center font-semibold">
                Comedy
              </Text>
            </View>

            <Text className=" text-neutral-400 mx-4 tracking-wide text-justify">
              There's something about Zachary Levi that I quite like. Like in
              "Shazam" (2019), he has a boyish charm to him that is engaging to
              watch. In this, admittedly the story is all pretty thin, but his
              characterisation has a friendliness to it that I found quite
              enjoyable. "Harold" is the human manifestation of a fellow who
              lives quite happily in the land of fiction, but who arrives in the
              real world to try and find his creator "the old man". Together
              with his more reluctant pal "Moose" (Lil Rel Howery) he starts
              approaching old gents in the park - and yes, well that just causes
              pain. Then he encounters the young "Mel" (Benjamin Bottani) and
              his mum "Terry" (Zooey Deschanel) after she hits him with her car.
              An overnight at their home sees the start of a rather daft bonding
              exercise that's completely devoid of jeopardy but thanks to the
              odd intervention from fantasy-obsessed librarian "Gary" (Jermaine
              Clement) and his straggling pal "Porcupine" (Tanya Reynolds) is
              quite fun. There's an innocence to the whole thing that is quite
              touchingly simple and honest. People with invisible friends -
              didn't we all? The animation is perfectly adequate and the purple
              crayon could teach a 3D printer a thing or two about creating an
              aeroplane or a car tyre. Sure, it's all forgettable fayre and I'm
              not too sure if it's in any way sophisticated enough for today's
              kids - but it's generally quite an entertaining vehicle for a star
              who looks every inch in his element. It's a summer movie that's as
              good as any of the more hyped animation's I've seen so far in
              2024.
            </Text>
          </View>

          <Cast navigation={navigation} cast={cast} />

          {/* Similar Movies */}
          <MovieList
            title="Similar Movies"
            hideSeeAll={true}
            data={similarMovies}
          />
        </ScrollView>
      )}
    </>
  );
}
