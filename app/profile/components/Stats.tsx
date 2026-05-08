import React, { memo, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { PressableScale } from "react-native-pressable-scale";
import { textStyle } from "@/styles/textStyles";
import { Skeleton } from "react-native-skeletons";

interface Props {
  followersCnt?: number;
  followingsCnt?: number;
  postsCnt?: number;
  onPress: (list: string) => void;
};

function UserStats(props: Props) {
  const [list, setList] = useState<string>("Followers");

  const statsStyle = (statName: string) => {
    return statName === list
      ? styles.activeStatsView
      : styles.inactiveStatsView;
  };

  if (!props) return (
    <View style={styles.mainView}>
      <Skeleton style={styles.activeStatsView} />
      <Skeleton style={styles.activeStatsView} />
      <Skeleton style={styles.activeStatsView} />
    </View>
  );

  const {
    followersCnt,
    followingsCnt,
    postsCnt,
    onPress
  } = props;

  return (
    <View style={styles.mainView}>
      <PressableScale
        activeScale={0.9}
        style={statsStyle("Followings")}
        onPress={() => {
          onPress("Followings");
          setList("Followings");
        }}>
        <Text style={textStyle.white16}>{followingsCnt || "*"}</Text>
        <Text style={textStyle.white16}>Followings</Text>
      </PressableScale>

      <PressableScale
        activeScale={0.9}
        style={statsStyle("Followers")}
        onPress={() => {
          onPress("Followers");
          setList("Followers");
        }}>
        <Text style={textStyle.white16}>{followersCnt || "*"}</Text>
        <Text style={textStyle.white16}>Followers</Text>
      </PressableScale>

      <PressableScale
        activeScale={0.9}
        style={statsStyle("Posts")}
      >
        <Text style={textStyle.white16}>{postsCnt || "*"}</Text>
        <Text style={textStyle.white16}>Posts</Text>
      </PressableScale>
    </View>
  );
};

export default memo(UserStats);

const styles = StyleSheet.create({
  mainView: {
    marginTop: 10,
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-evenly",
    width: "98%",
  },
  activeStatsView: {
    flexDirection: "row",
    paddingHorizontal: 5,
    paddingBottom: 1,
    gap: 5,
    borderRadius: 999,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  inactiveStatsView: {
    flexDirection: "row",
    paddingHorizontal: 5,
    paddingBottom: 1,
    gap: 5,
    backgroundColor: "transparent",
  },
});