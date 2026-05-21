import BottomBar from "./../../app/bars/bottomBar";
import MovieCardList from "./../../components/ui/movie-card-list";
import { textStyle } from "./../../styles/textStyles";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Text, View } from "react-native";
import { Movie } from "./types";
import MainInfo from "./components/MainInfo";
import DetailsBlock from "./components/DetailsBlock";
import OverviewBlock from "./components/OverviewBlock";
import ActionButtonsBlock from "./components/ActionButtonsBlock";
import GenresBlock from "./components/GenresBlock";
import ProvidersBlock from "./components/ProvidersBlock";
import CreditCardsList from "./components/CreditCardsList";
import { GetMovieYouTubeTrailerKey } from "./services/services";
import ScreenBackground from "./../../components/ui/screen-background";
import { FlatList } from "react-native-gesture-handler";
import { BlurTargetView } from "expo-blur";
import Spacer from "@/components/ui/spacer";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { GetMovieDetailsCached } from "./cache";

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

export default function MovieDetailScreen({ route }: any) {
  const { movieID, inCinemas, maximum, backdropPath, posterPath, title } = route?.params;
  const [movie, setMovie] = useState<Movie>();
  const [isActive, setIsActive] = useState<boolean>(true);
  const [isActiveUsers, setIsActiveUsers] = useState<boolean>(true);
  const [credits, setCredits] = useState<any[]>([]);
  const [backdropUrl , setBackdropPath] = useState<string>(
    `https://image.tmdb.org/t/p/w500${backdropPath}`
  );

  useEffect(() => {
    async function load() {
      const data = await GetMovieDetailsCached(movieID);
      if (data) {
        setMovie(data.movie);
        setCredits(data.credits);
        if(!backdropPath || backdropPath.length === 0)
          setBackdropPath(data.backdropPath);
      };
    }
    load();
  }, [movieID]);

  //const trailerKey = GetMovieYouTubeTrailerKey(movie?.videos || null);

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
      case "details":
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
      ref={ref}
    />
  }, [
    movieID,
    movie,
    posterPath,
    backdropPath,
    title,
    topCast,
  ]);

  const ref = useRef<View | null>(null);

  return (
    <BlurTargetView ref={ref} style={{ flex: 1 }}>
      <ScreenBackground>
        <FlatList
          contentContainerStyle={{ paddingHorizontal: "1%" }}
          data={sections}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          initialNumToRender={2}
          ListHeaderComponent={header}
          ListFooterComponent={<Spacer orientation="v" spacing={heightPercentageToDP(10)} />}
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