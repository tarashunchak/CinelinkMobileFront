import { Image } from "expo-image";
import React, { useState, useMemo } from "react";
import { StyleSheet } from "react-native";
import { PressableScale } from "react-native-pressable-scale";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function WatchlistCard({ watchlist }: { watchlist: any }) {
  const [status, setStatus] = useState<boolean>(false);

  const styles = useMemo(() => {
    if (status) return picked;
    else return notPicked;
  }, [status]);

  return (
    <PressableScale style={styles.view} onPress={() => { setStatus(!status) }}>
      <Image
        source={{ uri: "" }}
        cachePolicy={"memory"}
        style={styles.img}
      />
    </PressableScale>
  );
};

const notPicked = StyleSheet.create({
  view: {
    height: wp(27),
    width: wp(27),
    margin: wp(6.3333 / 2),
    borderRadius: 6,
  },
  img: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 6,
  },
});

const picked = StyleSheet.create({
  view: {
    height: wp(27),
    width: wp(27),
    margin: wp(6.3333 / 2),
    borderRadius: 6,
    borderColor: "#329E4F",
    borderWidth: 2,
    padding: 5,
  },
  img: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 3,
  },
});