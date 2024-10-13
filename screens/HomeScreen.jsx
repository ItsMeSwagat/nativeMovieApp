import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import TrendingMovies from "../components/trendingMovies";
import MovieList from "../components/movieList";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/loading";
import {
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from "../api/movieDB";

const ios = Platform.OS == "ios";

const HomeScreen = () => {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();

    if (data && data.results) {
      setLoading(false);
      setTrending(data.results);
    }
  };

  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();

    if (data && data.results) {
      setLoading(false);
      setUpcoming(data.results);
    }
  };

  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();

    if (data && data.results) {
      setLoading(false);
      setTopRated(data.results);
    }
  };

  return (
    <View className="flex-1 bg-neutral-900">
      <SafeAreaView className={ios ? " -mb-2" : " mt-4"}>
        <View className=" flex-row justify-between items-center mx-3">
          <TouchableOpacity>
            <Bars3CenterLeftIcon size={30} color={"#fff"} />
          </TouchableOpacity>
          <Text className=" text-white text-3xl font-semibold">
            <Text className=" text-[#eddb8e]">T</Text>MDB
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon color={"#fff"} size={30} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 10 }}
        >
          {/* Trending moviews carasoul */}
          {trending.length > 0 && <TrendingMovies data={trending} />}

          {/* MovieList */}
          {upcoming.length > 0 && (
            <MovieList title="Upcoming" data={upcoming} />
          )}

          {/* Top Rated */}
          {topRated.length > 0 && (
            <MovieList title="Top Rated" data={topRated} />
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default HomeScreen;
