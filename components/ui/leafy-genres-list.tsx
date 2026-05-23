import { LoadGenresCached, useHomeStore } from "@/app/(app)/home/cache";
import { genreStyle, genresInfo } from "@/styles/genreStyle";
import React, { useEffect } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import { PressableScale } from "react-native-pressable-scale";
import { Skeleton } from "react-native-skeletons";


export default function GenresList({ setSelectedGenre }: { setSelectedGenre: (icon: number) => void }) {
  const genreItems = useHomeStore(s => s.genres);

  useEffect(()=>{
    async function load(){
      await LoadGenresCached();
    };
    load();
  }, [])

  return (
    <View style={genreStyle.genreCellView}>
      <FlatList
        data={genreItems}
        horizontal={true}
        style={styles.flatList}
        contentContainerStyle={styles.contentContainerStyle}
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
  );
};

const styles = StyleSheet.create({
  flatList: { 
    width: "100%", 
    margin: 0, 
    borderRadius: 22, 
    height: 44, 
    backgroundColor: "rgba(255, 255, 255, 0.03)" 
  },
  contentContainerStyle: {
    paddingHorizontal: 10 
  },
});