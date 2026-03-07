import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { textStyle } from "@/styles/textStyles";
import { genresInfo } from "@/styles/genreStyle";

interface Genre {
  id: number;
  name: string;
};

export default function GenresBlock({ genres }: { genres: Genre[] | undefined }) {
  return (
    <View style={styles.view}>
      <Text style={[textStyle.yellow18, { padding: 0, marginBottom: 5 }]}>Genres</Text>
      <ScrollView horizontal={true}
        style={styles.genreCellView}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        showsHorizontalScrollIndicator={false}
      >
        {
          genres?.map((genre, index) => {
            const name: string = genre.name;
            return (
              <TouchableOpacity key={index}
                style={
                  [
                    styles.genreCell,
                    {
                      backgroundColor: genresInfo[name]?.color,
                      borderColor: genresInfo[name]?.borderColor
                    }
                  ]
                }>
                <Text style={[styles.genreCellText]}>{name}</Text>
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
    </View>
  )
}

const styles = {
  view: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: 6,
    paddingTop: 0,
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
    marginTop: "3%",
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