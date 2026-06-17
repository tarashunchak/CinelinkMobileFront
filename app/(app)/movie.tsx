import MovieCardList from "@/src/components/ui/movie-card-list";
import { textStyle } from "../../styles/textStyles";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Text, View } from "react-native";
import { Movie } from "@/src/features/movie_details/types";
import MainInfo from "@/src/features/movie_details/components/MainInfo";
import DetailsBlock from "@/src/features/movie_details/components/DetailsBlock";
import OverviewBlock from "@/src/features/movie_details/components/OverviewBlock";
import ActionButtonsBlock from "@/src/features/movie_details/components/ActionButtonsBlock";
import GenresBlock from "@/src/features/movie_details/components/GenresBlock";
import ProvidersBlock from "@/src/features/movie_details/components/ProvidersBlock";
import CreditCardsList from "@/src/features/movie_details/components/CreditCardsList";
import { GetMovieYouTubeTrailerKey } from "@/src/features/movie_details/services/services";
import { FlatList } from "react-native-gesture-handler";
import Spacer from "@/src/components/ui/spacer";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { GetMovieDetailsCached } from "@/src/features/movie_details/cache";
import { useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import TrailerBlock from "@/src/features/movie_details/components/TrailerBlock";
import WatchlistSheet, { WatchlistSheetRef } from "@/src/features/movie_details/components/add-to-watchlist-modal/AddToWatchlistModal";
import UserSheet, { UserSheetRef } from "@/src/features/movie_details/components/recommend-to-user-modal/RecommendToUser";
import { BlurTargetView } from "expo-blur";
import Header from "@/src/features/movie_details/components/Header";

const sections = [
  { type: "actions" },
  { type: "genres" },
  { type: "providers" },
  { type: "trailer" },
  { type: "overview" },
  { type: "details" },
  { type: "cast" },
  { type: "crew" },
  { type: "similar" },
];

export default function MovieDetailScreen() {
  const { movieID, inCinemas, maximum, backdropPath, posterPath, title } = useLocalSearchParams();
  const [movie, setMovie] = useState<Movie>();
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isActiveUsers, setIsActiveUsers] = useState<boolean>(false);
  const [credits, setCredits] = useState<any[]>([]);
  const [backdropUrl, setBackdropPath] = useState<string>(
    `https://image.tmdb.org/t/p/w500${backdropPath}`
  );

  const ref = useRef<WatchlistSheetRef>(null);
  const recommendationsRef = useRef<UserSheetRef>(null);

  useEffect(() => {
    async function load() {
      const data = await GetMovieDetailsCached(movieID);
      if (data) {
        setMovie(data.movie);
        setCredits(data.credits);
        if (!backdropPath || backdropPath.length === 0)
          setBackdropPath(data.backdropPath);
      };
      await Image.prefetch(`https://image.tmdb.org/t/p/w500${posterPath}`);
    }
    load();
  }, [movieID]);

  const trailerKey = GetMovieYouTubeTrailerKey(movie?.videos || null);

  const renderItem = useCallback(({ item }: any) => {
    switch (item.type) {
      case "actions":
        return <ActionButtonsBlock
          movieID={movie?.id}
          onAddToWatchlist={() => {
            setIsActive(true);
            ref.current?.open();
          }}
          onRecommend={() => {
            setIsActiveUsers(true);
            recommendationsRef.current?.open();
          }}
        />
      case "genres":
        return <GenresBlock genres={movie?.genres} />
      case "providers":
        return <ProvidersBlock providers={movie?.providers} />
      case "trailer":
        return <TrailerBlock trailerKey={trailerKey} />
      case "overview":
        return <OverviewBlock text={movie?.overview} />
      case "details":
        return <DetailsBlock movie={movie} />
      case "cast":
        if (movie?.credits?.cast?.length === 0) return null;
        return (
          <>
            <Text style={styles.title}>Cast</Text>
            <CreditCardsList
              movieID={movieID}
              credits={credits?.cast}
              posterPath={movie?.poster_path}
              title={movie?.title}
            />
          </>)
      case "crew":
        return (<>
          <Text style={styles.title}>Crew</Text>
          <CreditCardsList
            movieID={movieID}
            credits={credits?.crew}
            posterPath={movie?.poster_path}
            title={movie?.title}
          /></>)
      case "similar":
        return (<>
          <Text style={styles.title}>{"Similar movies"}</Text>
          <MovieCardList
            movieID={movie?.id}
            movieGenre={movie?.genres?.[0]?.id}
            posterPath={posterPath}
          /></>)
    };
  }, [movieID, credits, movie]);

  const topCast = useMemo(() =>
    credits?.cast?.slice(0, Math.min(4, credits?.cast?.length)),
    [credits?.cast?.length]
  );

  const header = useMemo(() => {
    return <MainInfo
      movie={movie}
      inCinemas={inCinemas}
      maximum={maximum}
      posterPath={posterPath}
      backdropPath={backdropUrl}
      title={title}
      cast={topCast}
    />
  }, [
    movieID,
    movie,
    posterPath,
    backdropPath,
    title,
    topCast,
  ]);

  return (
    <>
      <FlatList
        contentContainerStyle={{
          paddingHorizontal: "1%",
          backgroundColor: "transparent",
        }}
        data={sections}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        initialNumToRender={2}
        ListHeaderComponent={header}
        ListFooterComponent={<Spacer orientation="v" spacing={heightPercentageToDP(10)} />}
      />
      {isActive && <WatchlistSheet setIsActive={(state) => setIsActive(state)} ref={ref} />}
      {isActiveUsers && <UserSheet setIsActive={(state) => setIsActiveUsers(state)} ref={recommendationsRef} />}
    </>
  );
};


const styles = {
  title: [
    textStyle.yellow20,
    {
      marginLeft: "2%",
      marginTop: "5%",
    }
  ],
};