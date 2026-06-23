import { textStyle } from "@/styles/textStyles";
import React, { memo } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { View, Text, StyleSheet } from "react-native";
import { PressableScale } from "react-native-pressable-scale";
import { useUserStatus } from "@/src/rt_client/managers/users_manager";
import { Skeleton } from "react-native-skeletons";
import AnimatedFastImage from "@/src/components/ui/animated-fast-image";
import AnimatedFastText from "./ui/animated-fast-text";
import { UserRoundX } from "lucide-react-native";

interface Props {
  user: {
    user_id?: number;
    username?: string;
    first_name?: string;
    last_name?: string;
    avatar_url?: string;
  },
  onPress: (_: number) => void;
};

function UserCard({ user, onPress }: Props) {
  //const router = useRouter();
  const isOnline = useUserStatus(user?.user_id);
  if (user === undefined) return null;
  if (!user?.user_id) return <Skeleton style={styles.cardContainer} />
  //console.warn("user: ", user);
  return (
    <PressableScale
      activeScale={0.98}
      style={styles.cardContainer}
      onPress={() => onPress(user?.user_id)}
    >
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
          <AnimatedFastText
            style={textStyle.white18}
            sharedTransitionTag={`user-${user?.user_id}-full_name`}
          >
            {`${user?.first_name ?? ''} ${user?.last_name ?? ''}`}
          </AnimatedFastText >
          <Text style={textStyle.gray16}>
            {user?.username}
          </Text>
        </View>
      </View>
    </PressableScale >
  );
};
/*
<Image
        style={styles.chatIcon}
        source={require("@/app/(app)/social/assets/chatIcon.png")}
      />
*/

export default memo(UserCard);

const styles = StyleSheet.create({
  mainView: {
    flexDirection: "row",
    height: "100%",
    width: "60%",
    gap: 8,
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
    //backgroundColor: "#393E46",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 0.5,
    borderRadius: 10,
    justifyContent: "space-between",
    paddingLeft: "3%",
    marginBottom: 5,
    //flexDirection: "row",
    paddingHorizontal: "1%",
    paddingVertical: "3%",
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
    flexDirection: "row",
    paddingHorizontal: "1%",
    paddingVertical: "3%",
  },
  messageBtn: {
    height: 26,
    backgroundColor: "white",
    padding: "1%",
    paddingHorizontal: "4%",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
});