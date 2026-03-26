import { textStyle } from "@/styles/textStyles";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { TouchableOpacity, View, Text, Image } from "react-native";
import { useNavigation } from "expo-router";

interface Props {
  user_id: number;
  username: string;
  first_name: string | undefined;
  last_name: string | undefined;
  avatar_url: string | undefined;
  is_online: boolean;
}

export default function FriendCard({ friend }: { friend: Props }) {
  const navigator = useNavigation();
  return (
    <TouchableOpacity style={styles.card.view}
      onPress={() => {
        navigator?.push("UserProfileScreen", { userID: friend?.user_id })
      }}>
      <View style={styles.card.info.view}>
        <View style={styles.chatInfo.view}>
          <Image
            style={styles.chatInfo.img}
            source={{ uri: friend?.avatar_url }}
          />
          {friend?.is_online && <View style={styles.isOnline.dot}></View>}
        </View>
        <View style={styles.card.info.text.view}>
          <Text style={styles.card.info.text.name}>
            {friend?.username}
          </Text>
        </View>
      </View>
      <Image
        style={styles.card.chatIcon}
        source={require("@/app/social/assets/chatIcon.png")}
      />
    </TouchableOpacity>
  );
};

const styles = {
  chatInfo: {
    view: {
      flexDirection: "row",
      height: "100%",
      gap: "6%",
      alignItems: "center",
    },
    img: {
      height: 58,
      width: 58,
      borderRadius: 999,
      borderColor: "rgba(255, 255, 255, 0.3)",
      borderWidth: 0.5,
      padding: 2,
      alignItems: "center",
      justifyContent: "center",
    },

    text: {
      view: {
        flexDirection: "column",
        height: hp(10) * 0.6,
        justifyContent: "space-between",
      },
      name: [textStyle.white18, {

      }],
      lastSeen: [textStyle.gray14, {

      }],
    }
  },
  isOnline: {
    view: {
      flexDirection: "row",
      gap: 5,
      alignItems: "center"
    },
    dot: {
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
    text: [textStyle.white14, {
      color: "#329E4F",
    }],
  },
  card: {
    view: {
      flexDirection: "row",
      width: "100%",
      height: hp("8.5%"),
      backgroundColor: "rgba(255, 255, 255, 0.03)",
      borderColor: "rgba(255, 255, 255, 0.2)",
      borderWidth: 0.5,
      borderRadius: 4,
      justifyContent: "space-between",
      paddingLeft: "3%",
      marginBottom: 5,
    },
    info: {
      view: {
        flexDirection: "row",
        gap: 10,
      },
      avatar: {
        width: 60,
        height: 60,
        alignSelf: "center",
        borderColor: "rgba(255, 255, 255, 0.2)",
        borderWidth: 0.5,
        borderRadius: 999,
      },
      text: {
        view: {
          flexDirection: "column",
          justifyContent: "space-evenly",
        },
        name: [textStyle.white18, {
        }],
        rank: [textStyle.gray14, {

        }],
        lastWatched: [textStyle.white14, {

        }],
      },
    },
    chatIcon: {
      width: 24,
      height: 24,
      margin: 5,
    }
  }
};