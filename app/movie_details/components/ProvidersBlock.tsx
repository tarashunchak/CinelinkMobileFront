import React from "react";
import { Image, ScrollView, Text, View } from "react-native";

interface Provider {

};

export default function ProvidersBlock({ providers }: { providers: any[] }) {
  return (
    <>
      {
        providers?.["US"]?.length &&
        (
          <View style={styles.view}>
            <Text style={[textStyle.yellow18]}>Providers</Text>
            <ScrollView horizontal={true}
              style={[styles.genreCellView, { height: 40 }]}
              contentContainerStyle={{ paddingHorizontal: 10 }}
              showsHorizontalScrollIndicator={false}
            >
              {
                movie?.providers?.["US"]?.flatrate?.map((flat: any, index: number) => (
                  <Image key={index} source={{ uri: "https://image.tmdb.org/t/p/w500" + flat?.logo_path }} style={{ height: 32, width: 32, borderRadius: 4, marginRight: "4" }} />
                ))
              }
            </ScrollView>
          </View>
        )
      }
    </>
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
};