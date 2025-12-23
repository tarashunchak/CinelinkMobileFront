import React from "react";
import { genresInfo } from "@/styles/genreStyle";
import { View, Text, Pressable } from "react-native";
import { textStyle } from "@/styles/textStyles";

export default function GenresLayout({ genres }: { genres: any }) {
  return (
    < View style={styles.view} >
      {
        genres?.slice(0, 3)?.map((genre: any, index: number) => {
          const name: string = genre.name;
          return (
            <Pressable key={index}
              style={
                [
                  styles.item,
                  {
                    backgroundColor: genresInfo[name]?.color,
                    borderColor: genresInfo[name]?.borderColor
                  }
                ]
              }>
              <Text style={[textStyle?.white14]}>{name}</Text>
            </Pressable>
          )
        })
      }
    </View >
  );
};

const styles = {
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
};