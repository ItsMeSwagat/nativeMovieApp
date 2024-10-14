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
import {
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  img500,
} from "../api/movieDB";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const topMargin = ios ? "" : " mt-4";

export default function MovieScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [isFavourite, setIsFavourite] = useState(false);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});
  let movieName = "Harold and the Purple Crayon";

  useEffect(() => {
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);
    if (data) {
      setMovie(data);
    }
    setLoading(false);
  };

  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);
    if (data && data.cast) {
      setCast(data.cast);
    }
  };

  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id);
    if (data && data.results) {
      setSimilarMovies(data.results);
    }
  };

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
                source={{ uri: img500(movie?.poster_path) }}
                style={{ width, height: height * 0.65 }}
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
              {movie?.title}
            </Text>

            {movie?.id ? (
              <Text className=" text-neutral-400 text-base text-center font-semibold">
                {movie?.status} • {movie?.release_date?.split("-")[0]} •{" "}
                {movie?.runtime} min
              </Text>
            ) : null}

            <View className=" flex-row justify-center mx-4 space-x-2">
              {movie?.genres?.map((genre, index) => {
                let showDot = index + 1 != movie.genres.length;
                return (
                  <Text
                    key={index}
                    className=" text-neutral-400 text-base text-center font-semibold"
                  >
                    {genre?.name} {showDot ? "•" : null}
                  </Text>
                );
              })}

              <Text className=" text-neutral-400 text-base text-center font-semibold">
                Thrill •
              </Text>
              <Text className=" text-neutral-400 text-base text-center font-semibold">
                Comedy
              </Text>
            </View>

            <Text className=" text-neutral-400 mx-4 tracking-wide text-justify">
              {movie?.overview}
            </Text>
          </View>

          {cast.length > 0 && <Cast navigation={navigation} cast={cast} />}

          {/* Similar Movies */}
          {similarMovies.length > 0 && (
            <MovieList
              title="Similar Movies"
              hideSeeAll={true}
              data={similarMovies}
            />
          )}
        </ScrollView>
      )}
    </>
  );
}
