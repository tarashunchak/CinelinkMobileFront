import React, { memo } from "react";
import { genresInfo } from "@/styles/genreStyle";
import { View, Text, StyleSheet } from "react-native";
import { textStyle } from "@/styles/textStyles";
import { PressableScale } from "react-native-pressable-scale";

const GenreItem = memo(({ name }: { name: string }) => {
  const info = genresInfo[name] || { color: "#ccc", borderColor: "#999" };
  const dynamicStyle = {
    backgroundColor: info?.color,
    borderColor: info?.borderColor
  };
  return (
    <PressableScale style={[styles.item, dynamicStyle]}>
      <Text style={textStyle?.white14}>{name}</Text>
    </PressableScale >
  );
});


function GenresLayout({ genres }: { genres: any[] }) {
  if (!genres || genres.length === 0) return null;

  return (
    <View style={styles.view}>
      {genres?.map((genre: any, index: number) => {
        if (index >= 3) return null;
        return (
          <GenreItem
            key={genre.id ?? index}
            name={genre.name}
          />
        )
      })}
    </View >
  );
};

export default memo(GenresLayout);

const styles = StyleSheet.create({
  view: {
    flexDirection: "row",
    height: "20%",
  },
  item: {
    flexDirection: "column",
    height: "100%",
    borderRadius: 6,
    minWidth: 50,
    alignItems: "center",
    paddingLeft: 6,
    paddingRight: 6,
    marginRight: 8,
    borderWidth: 1,
    justifyContent: "center",
  },
});