import BottomBar from "./../../app/bars/bottomBar";
import MovieCardList from "./../../components/ui/movie-card-list";
import { textStyle } from "./../../styles/textStyles";
import { useNavigation } from "expo-router";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import { Movie } from "./types";
import MainInfo from "./components/MainInfo";
import DetailsBlock from "./components/DetailsBlock";
import OverviewBlock from "./components/OverviewBlock";
import ActionButtonsBlock from "./components/ActionButtonsBlock";
import GenresBlock from "./components/GenresBlock";
import ProvidersBlock from "./components/ProvidersBlock";
import CreditCardsList from "./components/CreditCardsList";
import { GetMovieYouTubeTrailerKey, LoadMovieDetails } from "./services/services";
import ScreenBackground from "./../../components/ui/screen-background";
import { FlatList } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurTargetView } from "expo-blur";
import Spacer from "@/components/ui/spacer";
import { heightPercentageToDP } from "react-native-responsive-screen";

export default function MovieDetailScreen({ route }: any) {
  const { movieID, inCinemas, maximum, backdropPath, posterPath, title } = route?.params;
  const [movie, setMovie] = useState<Movie>();
  const [isActive, setIsActive] = useState<boolean>(true);
  const [isActiveUsers, setIsActiveUsers] = useState<boolean>(true);
  const [credits, setCredits] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const data = await LoadMovieDetails(movieID);
      if (data) {
        setMovie({ ...data, ...{ credits: {} } });
        setCredits(data?.credits);
      };
    }
    load();
  }, [movieID]);

  //const trailerKey = GetMovieYouTubeTrailerKey(movie?.videos || null);
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
          onAddToWatchlist={() => { }}
          onRecommend={() => { }}
        />
      case "genres":
        return <GenresBlock genres={movie?.genres} />
      case "providers":
        return <ProvidersBlock providers={movie?.providers} />
      case "overview":
        return <OverviewBlock text={movie?.overview} />
      case "detailes":
        return <DetailsBlock movie={movie} />
      case "cast":
        return (<>
          <Text style={styles.title}>Cast</Text>
          <CreditCardsList
            movieID={movieID}
            credits={credits?.cast}
            poster_path={movie?.poster_path}
          /></>)
      case "crew":
        return (<>
          <Text style={styles.title}>Crew</Text>
          <CreditCardsList
            movieID={movieID}
            credits={credits?.crew}
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
  }, [movieID, credits]);

  const ref = useRef<View | null>(null);

  return (
    <BlurTargetView ref={ref} style={{flex:1}}>
    <ScreenBackground>
        <FlatList
          contentContainerStyle={{ paddingHorizontal: "1%" }}
          data={sections}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          initialNumToRender={2}
          ListHeaderComponent={
            <MainInfo
              movie={movie}
              inCinemas={inCinemas}
              maximum={maximum}
              posterPath={posterPath}
              backdropPath={backdropPath}
              title={title}
              cast={credits?.cast}
              ref={ref}
            />
          }
          ListFooterComponent={<Spacer orientation="v" spacing={heightPercentageToDP(10) }/>}
        />
        {(isActive || isActiveUsers) && <BottomBar />}
    </ScreenBackground>
    </BlurTargetView>
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