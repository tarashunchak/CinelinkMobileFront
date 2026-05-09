import React, { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { textStyle } from "@/styles/textStyles";
import { Skeleton } from "react-native-skeletons";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import YoutubeIframe from "react-native-youtube-iframe";

export default function TrailerBlock({ trailerKey }: { trailerKey?: string }) {
  const [state, setState] = useState<boolean>(false);
  if (!trailerKey) return (
    <View style={styles.view}>
      <Text style={[styles.title, textStyle.yellow20]}>Trailer</Text>
      <Skeleton width={"100%"} height={250} style={[styles.view, { backgroundColor: "rgba(255, 255, 255, 0.05)" }]} />
    </View>
  );
  return (
    <View style={styles.view}>
      <Text style={[styles.title, textStyle.yellow20]}>Trailer</Text>
      <YoutubeIframe height={250} width={widthPercentageToDP(100)} play={false} videoId={trailerKey} />
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