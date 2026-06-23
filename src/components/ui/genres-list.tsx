import { LoadGenresCached, useHomeStore } from "@/src/features/home/cache";
import { genreStyle, genresInfo } from "@/styles/genreStyle";
import { getCurrentUserID } from "@/utils/utils";
import React, { useEffect } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import { PressableScale } from "react-native-pressable-scale";

export default function GenresList({ setSelectedGenre }: { setSelectedGenre: (icon: number) => void }) {
  const genreItems = useHomeStore(s => s.genres);
  const currentUserID = getCurrentUserID();

  useEffect(()=>{
    async function load(){
      await LoadGenresCached();
    };
    load();
  }, [currentUserID]);

  return (
    <View style={genreStyle.genreCellView}>
      <FlatList
        data={genreItems}
        horizontal
        style={styles.flatList}
        contentContainerStyle={styles.contentContainerStyle}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item: any, index: number) => String(item?.id ?? index)}
        renderItem={({ item }) => (
            <PressableScale
              style={[genreStyle.genreCell, { backgroundColor: genresInfo[item?.name]?.color, borderColor: genresInfo[item?.name]?.borderColor }]}
              onPress={() => { console.log(`Genre: ${item?.id}\n`); setSelectedGenre(item?.id); }}
            >
              <Text style={[genreStyle.genreCellText]}>{item?.name}</Text>
            </PressableScale>
          )}
      />
    </View >
  );
};

const styles = StyleSheet.create({
  flatList: { 
    width: "100%", 
    borderRadius: 22, 
    height: 44, 
    backgroundColor: "rgba(58, 53, 53, 0.03)" 
  },
  contentContainerStyle: {
    paddingHorizontal: 10,
  },
});