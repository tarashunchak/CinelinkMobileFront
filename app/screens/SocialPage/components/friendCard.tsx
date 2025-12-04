import { textStyle } from "@/styles/textStyles";
import React from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";

export default function FriendCard({ friend }: { friend: any }) {
  return (
    <TouchableOpacity style={styles.card.view}>
      <View style={styles.card.info.view}>
        <Image style={styles.card.info.avatar} source={require("@/assets/images/giggaNigga.png")} />
        <View style={styles.card.info.text.view}>
          <Text style={styles.card.info.text.name}>{friend.full_name}</Text>
          <Text style={styles.card.info.text.rank}>{`#${friend.rank} user globally`}</Text>
          <Text style={styles.card.info.text.lastWatched}>{`Last watched: ${friend.last_watched}`}</Text>
        </View>
      </View>
      <Image style={styles.card.chatIcon} source={require("@/app/screens/SocialPage/assets/chatIcon.png")} />
    </TouchableOpacity>
  );
};

const styles = {
  card: {
    view: {
      flexDirection: "row",
      width: "100%",
      height: 74,
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderColor: "rgba(255, 255, 255, 0.2)",
      borderWidth: 0.5,
      borderRadius: 4,
      justifyContent: "space-between",
      paddingLeft: "3%",
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
        borderRadius: 28,
      },
      text: {
        view: {
          flexDirection: "column",
          justifyContent: "space-evenly",
        },
        name: [textStyle.yellow18, {
        }],
        rank: [textStyle.gray12, {

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