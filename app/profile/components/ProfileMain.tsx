import React from "react";
import { Image, Text, View } from "react-native";
import { ActionButton } from "./ActionButton";
import { UserProfile_T } from "../types";
import { textStyle } from "@/styles/textStyles";

type Props = {
  isLoading: boolean;
  user: UserProfile_T | undefined;
  isCurrentUser: boolean;
  isFollowed: boolean;
  onEdit: () => void,
  onToggleFollow: () => void,
};

export function ProfileMain({
  isLoading,
  user,
  isCurrentUser,
  isFollowed,
  onEdit,
  onToggleFollow
}: Props) {

  const fullName: string =
    isLoading ? "**** ****"
      : `${user?.first_name} ${user?.last_name}`;

  const username: string =
    isLoading ? "********" : user?.username || "********";

  return (
    <>
      <View style={styles.view}>
        <Image
          source={{ uri: user?.avatar_url }}
          style={styles.avatar}
        />

        <ActionButton
          isCurrentUser={isCurrentUser}
          isFollowed={isFollowed}
          isLoading={isLoading}
          onEdit={onEdit}
          onToggleFollow={onToggleFollow}
        />

      </View>

      <Text
        style={textStyle.white20}
      >
        {fullName}
      </Text>
      <Text
        style={textStyle.gray12}
      >
        {`@${username}`}
      </Text>

      {
        user?.bio &&
        <View style={styles.bio}>
          <Text style={textStyle.white16}>
            {user?.bio}
          </Text>
        </View>
      }

      <View style={styles.joinedAt}>
        <Image source={require("@/assets/images/Calendar.png")} />
        <Text style={textStyle.gray16}>
          Joined {isLoading ? "****.**.**" : user?.created_at || "****.**.**"}
        </Text>
      </View>
    </>
  );
};


const styles = {
  view: {
    width: "100%",
    marginTop: "45%",
    height: 100,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 999,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 0.5,
  },
  joinedAt: {
    marginTop: 10,
    flexDirection: "row",
    gap: 5,
  },
  bio: {
    padding: 5,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.2)"
  },
};