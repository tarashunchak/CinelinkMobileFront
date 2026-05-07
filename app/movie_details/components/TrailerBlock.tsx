import React, { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { textStyle } from "@/styles/textStyles";

export default function TrailerBlock({ trailerKey }: { trailerKey: string }) {
  const [state, setState] = useState<boolean>(false);
  return (
    <View style={styles.view}>
      <Text style={[styles.title, textStyle.yellow20]}>Trailer</Text>
      <YoutubePlayer height={250} width={"100%"} play={false} videoId={trailerKey} onReady={() => { setState(true) }} />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    marginLeft: "0%",
    marginTop: "1%"
  },
  title: {
    marginLeft: "2%",
    marginTop: "5%",
  }
});