import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { textStyle } from "@/styles/textStyles";
import InfoRow from "./InfoRow";
import { Movie } from "../types";

export default function DetailsBlock({ movie }: { movie: Movie }) {
  const countries = useMemo(() =>
    movie?.production_countries.map(pc => pc.name).join(', '),
    [movie?.id]);

  const companies = useMemo(() =>
    movie?.production_companies.map(pc => pc.name).join(', '),
    [movie?.id]);

  return (
    <View style={styles.view}>
      <Text style={textStyle.yellow20}>Details</Text>
      <InfoRow left="Release date" right={movie?.release_date} />
      <InfoRow left="Spoken languages" right={movie?.spoken_languages.map(sl => sl.english_name).join(', ')} />
      <InfoRow left="Countries" right={countries} />
      <InfoRow left="Companies" right={companies} />
      <InfoRow left="Revenue" right={movie?.revenue + "$"} />
      <InfoRow left="Tagline" right={movie?.tagline || "Nothing"} />
      <InfoRow left="IMDb ID" right={movie?.imdb_id || "Not available"} />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    marginTop: "5%",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: 6,
    paddingTop: 0,
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12
  },
});