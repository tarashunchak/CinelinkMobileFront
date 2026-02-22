import { textStyle } from "@/styles/textStyles";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { TouchableOpacity, View, Text, Image } from "react-native";
import { useNavigation } from "expo-router";
import { UserCard_T } from "@/app/types/user";

export default function UserCard({ user }: { user: UserCard_T }) {
  const navigator = useNavigation();
  return (
    <TouchableOpacity style={styles.card.view}
      onPress={() => {
        navigator?.push("UserProfileScreen", { userID: user?.user_id })
      }}>
      <View style={styles.card.info.view}>
        <Image
          style={styles.card.info.avatar}
          source={user?.avatar_url
            ? { uri: user?.avatar_url }
            : require("@/assets/images/giggaNigga.png")}
        />
        <View style={styles.card.info.text.view}>
          <Text style={styles.card.info.text.name}>
            {user?.username}
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