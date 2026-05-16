import React, { memo } from "react";
import { Text, View } from "react-native";
import { textStyle } from "@/styles/textStyles";
import { genresInfo } from "@/styles/genreStyle";
import { Skeleton } from "react-native-skeletons";
import { PressableScale } from "react-native-pressable-scale";

interface Genre {
  id: number;
  name: string;
};

const GenreItem = memo(({ name }: { name: string }) => {
  const info = genresInfo[name] || { color: "#ccc", borderColor: "#999" };
  const dynamicStyle = {
    backgroundColor: info?.color,
    borderColor: info?.borderColor
  };
  return (
    <PressableScale style={[styles.genreCell, dynamicStyle]}>
      <Text style={textStyle?.white14}>{name}</Text>
    </PressableScale >
  );
});

function GenresBlock({ genres }: { genres: Genre[] | undefined }) {
  if(!genres || genres.length === 0)
    return (
      <Skeleton style={[styles.view, {height: 60}]}>
        <Text style={[textStyle.yellow18, { padding: 0, marginBottom: 5 }]}>Genres</Text>
      </Skeleton>
    );

  return (
  <View style={styles.view}>
    <Text style={[textStyle.yellow18, { padding: 0, marginBottom: 5 }]}>Genres</Text>
    <View style={{flexDirection: "row"}}>
      {
        genres?.map((genre, index) => {
          return (
            <GenreItem 
              key={genre?.id ?? index} 
              name={genre.name}
            />
          );
        })
      }
    </View>
  </View>
  )
};

export default memo(GenresBlock);

const styles = {
  view: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: 6,
    paddingTop: 0,
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
    marginTop: "5%",
  },
  genreCellView: {
    height: 30,
    width: "100%",
    alignSelf: "left",
  },
  genreCell: {
    flexDirection: "column",
    height: 26,
    borderRadius: 6,
    minWidth: 50,
    alignItems: "center",
    paddingLeft: 6,
    paddingRight: 6,
    marginRight: 8,
    borderWidth: 1,
    justifyContent: "center",
  },
  genreCellText: {
    fontFamily: "sans-serif-condensed",
    color: "white",
    fontSize: 14,
    alignSelf: "center",
  },
};
