import AnimatedFastImage from "@/src/components/ui/animated-fast-image";
import { textStyle } from "@/styles/textStyles";
import { Image } from "expo-image";
import React, { useState, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { PressableScale } from "react-native-pressable-scale";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function WatchlistCard({ watchlist, onPick }: { watchlist: any, onPick: (id: number, state: boolean) => void }) {
  const [status, setStatus] = useState<boolean>(false);

  /*const styles = useMemo(() => {
    if (status) return picked;
    else return notPicked;
  }, [status]);*/

  return (
    <PressableScale style={[styles.view, {backgroundColor: (status ? "rgba(255, 255, 255, 0.2)" : "")}]} onPress={() => {
      const newStatus = !status;
      setStatus(newStatus)
      onPick(watchlist?.id, newStatus);
    }}>
      <View style={styles.leftContainer}>
        <Image
          source={{ uri: watchlist?.fg_img_url }}
          cachePolicy="memory"
          style={styles.img}
        />
        <View>
          <Text style={textStyle.white20}>
            {watchlist.name}
          </Text>
          <Text style={textStyle.gray18}>
            {watchlist.description}
          </Text>
        </View>
      </View>
    </PressableScale>
  );
};

const styles = StyleSheet.create({
  view: {
    minHeight: 44,
    maxHeight: 64,
    //width: wp(27),
    borderRadius: 8,
    //opacity: 0.4,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    width: wp(98),
    alignItems: "center",
    flexDirection: "row",
    padding: "1%",
  },
  img: {
    height: "100%",
    aspectRatio: 1,
    borderRadius: 8,
  },
  leftContainer: {
    flexDirection: "row",
    gap: 10,
  },
});

const picked = StyleSheet.create({
  view: {
    height: wp(27),
    width: wp(27),
    margin: wp(6.3333 / 2),
    borderRadius: 10,
    borderColor: "#9090900f",
    borderWidth: 2,
    padding: 4,
  },
  img: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 6,
  },
});