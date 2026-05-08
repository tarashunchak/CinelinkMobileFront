import BottomBar from "@/app/bars/bottomBar";
import MovieCardList from "@/components/ui/movie-card-list";
import { textStyle } from "@/styles/textStyles";
import { useNavigation } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Text } from "react-native";
import { Movie } from "./types";
import MainInfo from "./components/MainInfo";
import DetailsBlock from "./components/DetailsBlock";
import OverviewBlock from "./components/OverviewBlock";
import ActionButtonsBlock from "./components/ActionButtonsBlock";
import GenresBlock from "./components/GenresBlock";
import ProvidersBlock from "./components/ProvidersBlock";
import TrailerBlock from "./components/TrailerBlock";
import CreditCardsList from "./components/CreditCardsList";
import { GetMovieYouTubeTrailerKey, LoadMovieDetails } from "./services/services";
import WatchlistSheet, { WatchlistSheetRef } from "./components/add-to-watchlist-modal/AddToWatchlistModal";
import ScreenBackground from "@/components/ui/screen-background";
import UserSheet, { UserSheetRef } from "./components/recommend-to-user-modal/RecommendToUser";
import { FlatList } from "react-native-gesture-handler";

export default function MovieDetailScreen({ route }: any) {
  const navigation = useNavigation();
  const [movie, setMovie] = useState<Movie>();
  const { movieID, inCinemas, maximum } = route?.params;
  const [isActive, setIsActive] = useState<boolean>(true);
  const [isActiveUsers, setIsActiveUsers] = useState<boolean>(true);

  const sheetRef = useRef<WatchlistSheetRef>(null);
  const userSheetRef = useRef<UserSheetRef>(null);

  useEffect(() => {
    async function load() {
      const data = await LoadMovieDetails(movieID);
      if (data) setMovie(data);
    }
    load();
  }, [movieID]);

  const trailerKey = GetMovieYouTubeTrailerKey(movie?.videos || null);

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

  const renderItem = useCallback(({ item }: any) => {
    switch (item.type) {
      case "actions":
        return <ActionButtonsBlock
          movieID={movie?.id}
          onAddToWatchlist={sheetRef.current?.open}
          onRecommend={userSheetRef.current?.open}
        />
      case "genres":
        return <GenresBlock genres={movie?.genres} />
      case "providers":
        return <ProvidersBlock providers={movie?.providers} />
      case "trailer":
        return <TrailerBlock trailerKey={trailerKey} />;
      case "overview":
        return <OverviewBlock text={movie?.overview} />
      case "detailes":
        return <DetailsBlock movie={movie} />
      case "cast":
        return (<>
          <Text style={styles.title}>Cast</Text>
          <CreditCardsList
            movieID={movieID}
            credits={movie?.credits?.cast}
            poster_path={movie?.poster_path}
          /></>)
      case "crew":
        return (<>
          <Text style={styles.title}>Crew</Text>
          <CreditCardsList
            movieID={movieID}
            credits={movie?.credits?.crew}
            poster_path={movie?.poster_path}
          /></>)
      case "similar":
        return (<>
          <Text style={styles.title}>Similar movies</Text>
          <MovieCardList
            movieID={movie?.id}
            movieGenre={movie?.genres?.[0]?.id}
          /></>)
    };
  }, []);

  return (
    <ScreenBackground>
      <FlatList
        contentContainerStyle={{ padding: "1%" }}
        data={sections}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<MainInfo movie={movie} inCinemas={inCinemas} maximum={maximum} />}
      />

      <WatchlistSheet ref={sheetRef} setIsActive={(state) => setIsActive(state)} />
      <UserSheet ref={userSheetRef} setIsActive={(state) => setIsActiveUsers(state)} />

      {(isActive || isActiveUsers) && <BottomBar />}
    </ScreenBackground>
  );
}

const styles = {
  title: [
    textStyle.yellow20,
    {
      marginLeft: "2%",
      marginTop: "5%",
    }
  ],
};