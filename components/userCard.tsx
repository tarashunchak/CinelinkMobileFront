import { textStyle } from "@/styles/textStyles";
import React, { memo } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "expo-router";
import { PressableScale } from "react-native-pressable-scale";
import { useUserStatus } from "@/app/rt_client/managers/users_manager";
import { Image } from "expo-image";
import { Skeleton } from "react-native-skeletons";
import AnimatedFastImage from "@/components/ui/animated-fast-image";

interface Props {
  user_id?: number;
  username?: string;
  first_name?: string | undefined;
  last_name?: string | undefined;
  avatar_url?: string | undefined;
}

function UserCard({ user }: { user: Props }) {
  const navigator = useNavigation();
  const isOnline = useUserStatus(user?.user_id);
  if (!user?.user_id) return <Skeleton style={styles.cardContainer} />
  return (
    <PressableScale
      activeScale={0.98}
      style={styles.cardContainer}
      onPress={() => {
        navigator?.push("UserProfileScreen", { userID: user?.user_id })
      }}>
      <View style={styles.mainView}>
        <View style={styles.infoView}>
          <AnimatedFastImage
            sharedTransitionTag={`user-${user?.user_id}-avatar`}
            style={styles.image}
            source={{ uri: user?.avatar_url }}
            cachePolicy="disk"
          />
          {isOnline && <View style={styles.isOnlineDot}></View>}
        </View>
        <View style={styles.textView}>
          <Text style={textStyle.white18}>
            {user?.username}
          </Text>
        </View>
      </View>
      <Image
        style={styles.chatIcon}
        source={require("@/app/social/assets/chatIcon.png")}
      />
    </PressableScale>
  );
};

export default memo(UserCard);

const styles = StyleSheet.create({
  mainView: {
    flexDirection: "row",
    height: "100%",
    gap: "6%",
    alignItems: "center",
  },
  image: {
    height: 58,
    width: 58,
    borderRadius: 999,
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderWidth: 0.5,
    padding: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  textView: {
    flexDirection: "column",
    height: hp(10) * 0.6,
    justifyContent: "space-between",
  },
  infoView: {
    flexDirection: "row",
    gap: 10,
  },
  isOnlineView: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center"
  },
  isOnlineDot: {
    height: 12,
    width: 12,
    backgroundColor: "#329E4F",
    borderRadius: 10,
    position: "absolute",
    right: 3,
    bottom: 3,
    borderColor: "white",
    borderWidth: 0.5,
  },
  text: {
    ...textStyle.white14,
    color: "#329E4F",
  },
  cardContainer: {
    flexDirection: "row",
    width: "100%",
    height: hp("8.5%"),
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 0.5,
    borderRadius: 15,
    justifyContent: "space-between",
    paddingLeft: "3%",
    marginBottom: 5,
  },
  avatar: {
    width: 60,
    height: 60,
    alignSelf: "center",
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 0.5,
    borderRadius: 999,
  },
  chatIcon: {
    width: 24,
    height: 24,
    margin: 5,
  },
  contentContainer: {
    paddingHorizontal: "1%",
    paddingTop: "3%",
  },
});