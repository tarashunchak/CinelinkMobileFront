import BottomBar from "@/app/bars/bottomBar";
import MovieCardList from "@/components/ui/movie-card-list";
import { textStyle } from "@/styles/textStyles";
import { useNavigation } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, Text } from "react-native";
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

export default function MovieDetailScreen({ route }: any) {
  const navigation = useNavigation();
  const [movie, setMovie] = useState<Movie>();
  const { movieID, inCinemas } = route?.params;
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

  const trailerKey = GetMovieYouTubeTrailerKey(movie?.videos);
  return (
    <ScreenBackground>
      <ScrollView showsVerticalScrollIndicator={false} style={{ padding: "1%" }}>
        <MainInfo movie={movie} inCinemas={inCinemas} />
        <ActionButtonsBlock
          movieID={movie?.id}
          onAddToWatchlist={sheetRef.current?.open}
          onRecommend={userSheetRef.current?.open}
        />
        <GenresBlock genres={movie?.genres} />
        <ProvidersBlock providers={movie?.providers} />

        <Text style={styles.title}>Trailer</Text>
        <TrailerBlock trailerKey={trailerKey} />

        <OverviewBlock text={movie?.overview} />
        <DetailsBlock movie={movie} />

        <Text style={styles.title}>Cast</Text>
        <CreditCardsList
          movieID={movieID}
          credits={movie?.credits?.cast}
          poster_path={movie?.poster_path}
        />

        <Text style={styles.title}>Crew</Text>
        <CreditCardsList
          movieID={movieID}
          credits={movie?.credits?.crew}
          poster_path={movie?.poster_path}
        />

        <Text style={styles.title}>Similar movies</Text>
        <MovieCardList
          movieID={movie?.id}
          movieGenre={movie?.genres?.[0]?.id}
        />
      </ScrollView >
      <WatchlistSheet ref={sheetRef} setIsActive={setIsActive} />
      <UserSheet ref={userSheetRef} setIsActive={setIsActiveUsers} />
      {isActive || isActiveUsers && <BottomBar />}
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