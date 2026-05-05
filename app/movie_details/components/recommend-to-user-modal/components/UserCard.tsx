import { useUserStatus } from "@/app/rt_client/rt_client";
import { Image } from "expo-image";
import React, { useState, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { PressableScale } from "react-native-pressable-scale";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function UserCard({ user, onPick }: { user: any, onPick: (id: number, state: boolean) => void }) {
  const [status, setStatus] = useState<boolean>(false);
  const isOnline = useUserStatus(user?.user_id);

  const styles = useMemo(() => {
    if (status) return picked;
    else return notPicked;
  }, [status]);

  return (
    <PressableScale style={styles.view} onPress={() => {
      const newStatus = !status;
      setStatus(newStatus)
      onPick(user?.id, newStatus);
    }}>
      <Image
        source={{ uri: user?.avatar_url }}
        cachePolicy={"memory"}
        style={styles.img}
      />
      {isOnline && <View style={isOnlineStyles.dot}></View>}
    </PressableScale>
  );
};

const isOnlineStyles = StyleSheet.create({
  dot: {
    height: 12,
    width: 12,
    backgroundColor: "#329E4F",
    borderRadius: 10,
    position: "absolute",
    right: 3,
    bottom: 3,
    borderColor: "white",
    borderWidth: 1,
  }
});

const notPicked = StyleSheet.create({
  view: {
    height: wp(22),
    width: wp(22),
    margin: wp(6.3333 / 2),
    borderRadius: 999,
    opacity: 0.4,
  },
  img: {
    flex: 1,
    borderRadius: 999,
  },
});

const picked = StyleSheet.create({
  view: {
    height: wp(22),
    width: wp(22),
    margin: wp(6.3333 / 2),
    borderRadius: 999,
    borderColor: "#909090",
    borderWidth: 2,
    padding: 5,
  },
  img: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 999,
  },
});