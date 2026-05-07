import { getMovieGenres } from "@/api/tmdbApi";
import { genreStyle, genresInfo } from "@/styles/genreStyle";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, Pressable, ScrollView, Text, View, FlatList } from "react-native";
import { PressableScale } from "react-native-pressable-scale";
import { Skeleton } from "react-native-skeletons";


export default function GenresList({ setSelectedGenre }: { setSelectedGenre: (icon: number) => void }) {
  let [genreItems, setGenres] = useState<any[]>(Array.from({ length: 6 }));

  useEffect(() => {
    async function loadMovies() {
      const data = await getMovieGenres();
      if (data)
        setGenres([{ name: "All" }, ...data]);
    }
    loadMovies();
  }, []);

  return (
    <View style={genreStyle.genreCellView}>
      <FlatList
        data={genreItems}
        horizontal={true}
        style={{ width: "100%", margin: 0, borderRadius: 22, height: 44, backgroundColor: "rgba(255, 255, 255, 0.03)" }}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item: any, index: number) => String(item?.id ?? index)}
        renderItem={({ item }) => {
          if (!item) return <Skeleton style={genreStyle.genreCell} />
          return (
            <PressableScale
              style={[genreStyle.genreCell, { backgroundColor: genresInfo[item?.name]?.color, borderColor: genresInfo[item?.name]?.borderColor }]}
              onPress={() => { console.log(`Genre: ${item?.id}\n`); setSelectedGenre(item?.id); }}
            >
              <Text style={[genreStyle.genreCellText]}>{item?.name}</Text>
            </PressableScale>
          )
        }}
      />
    </View >
  )
}