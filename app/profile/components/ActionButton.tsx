import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { textStyle } from "@/styles/textStyles";
import React, { useEffect } from "react";
import { useNavigation } from "expo-router";

type Props = {
  isLoading: boolean;
  isCurrentUser: boolean;
  isFollowed: boolean;
  onEdit: () => void;
  onToggleFollow: () => void;
  onChat: () => void;
};

export function ActionButton({
  isLoading,
  isCurrentUser,
  isFollowed,
  onEdit,
  onToggleFollow,
  onChat,
}: Props) {

  let text;
  const navigator = useNavigation();

  if (isLoading)
    text = "* * *";
  else if (isCurrentUser)
    text = "Edit";
  else if (!isCurrentUser)
    text = isFollowed ? "Unfollow" : "Follow";

  return (
    <View style={{ flexDirection: "row", gap: 10 }}>
      {
        (isCurrentUser) ?
          (<TouchableOpacity
            style={styles.transparent}
            onPress={onEdit}
          >
            <Text
              style={textStyle.white18}
            >
              {text}
            </Text>
          </TouchableOpacity >)
          :
          (<TouchableOpacity
            style={isFollowed ? styles.transparent : styles.white}
            onPress={async () => await onToggleFollow()}
          >
            <Text
              style={isFollowed ? textStyle.white18 : textStyle.black18}
            >
              {text}
            </Text>
          </TouchableOpacity>)
      }
      {
        (isFollowed) ?
          (<TouchableOpacity
            style={styles.chatBtnView}
            onPress={onChat}
          >
            <Text style={textStyle.white18}>
              {"Chat"}
            </Text>
          </TouchableOpacity>)
          : null
      }
    </View>
  )
};

const styles = StyleSheet.create({
  transparent: {
    gap: 10,
    backgroundColor: "transparent",
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "white",
    alignSelf: "flex-end",
  },
  white: {
    gap: 10,
    backgroundColor: "white",
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "white",
    alignSelf: "flex-end",
  },
  chatBtnView: {
    gap: 10,
    backgroundColor: "transparent",
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "white",
    alignSelf: "flex-end",
  },
});