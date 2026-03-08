import React from "react";
import { Text, View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { textStyle } from "@/styles/textStyles";

export default function TrailerBlock({ trailerKey }: { trailerKey: string }) {
  return (
    <View style={styles.view}>
      <YoutubePlayer height={250} width={"100%"} play={false} videoId={trailerKey} />
    </View>
  )
}

const styles = {
  title: [
    textStyle.yellow20,
    {
      width: "80%",
      marginTop: "5%"
    },
  ],
  view: {
    marginLeft: "0%",
    marginTop: "1%"
  }
}