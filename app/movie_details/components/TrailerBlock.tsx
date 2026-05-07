import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

export default function TrailerBlock({ trailerKey }: { trailerKey: string }) {
  const [state, setState] = useState<boolean>(false);
  return (
    <View style={styles.view}>
      <YoutubePlayer height={250} width={"100%"} play={false} videoId={trailerKey} onReady={() => { setState(true) }} />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    marginLeft: "0%",
    marginTop: "1%"
  }
});