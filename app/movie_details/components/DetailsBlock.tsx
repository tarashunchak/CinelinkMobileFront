import React from "react";
import { Text, View } from "react-native";
import { textStyle } from "@/styles/textStyles";
import InfoRow from "./InfoRow";
import { Movie } from "../types";

export default function DetailsBlock({ movie }: { movie: Movie }) {
  return (
    <View style={styles.view}>
      <Text style={[textStyle.yellow20]}>Details</Text>
      <View style={{ flexDirection: "column" }}>
        <InfoRow left="Release date" right={movie?.release_date} />
        <InfoRow left="Spoken languages" right={movie?.spoken_languages.map(sl => sl.english_name)} />
        <InfoRow left="Countries" right={movie?.production_countries.map(pc => pc.name)} />
        <InfoRow left="Companies" right={movie?.production_companies.map(pc => pc.name)} />
        <InfoRow left="Revenue" right={movie?.revenue + "$"} />
        <InfoRow left="Tagline" right={movie?.tagline || "Nothing"} />
        <InfoRow left="IMDb ID" right={movie?.imdb_id || "Not available"} />
      </View>
    </View>
  )
}

const styles = {
  view: {
    marginTop: "5%",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: 6,
    paddingTop: 0,
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12
  }
}