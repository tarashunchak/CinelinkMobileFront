import React, { useCallback, useMemo, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ActionButton } from "./ActionButton";
import { UserProfile_T } from "../types";
import { textStyle } from "@/styles/textStyles";
import ProfilePhotoModal from "./ProfilePhotoModal";
import { PressableScale } from "react-native-pressable-scale";
import { useUserStatus } from "@/app/rt_client/rt_client";

type Props = {
  isLoading: boolean;
  user: UserProfile_T | undefined;
  isCurrentUser: boolean;
  isFollowed: boolean;
  onEdit: () => void,
  onToggleFollow: () => void,
  onChat: () => void;
};

export function ProfileMain({
  isLoading,
  user,
  isCurrentUser,
  isFollowed,
  onEdit,
  onToggleFollow,
  onChat,
}: Props) {

  const fullName: string =
    isLoading ? "**** ****"
      : user?.first_name && `${user?.first_name} ${user?.last_name}`;

  const username: string =
    isLoading ? "********" : user?.username;

  const fetchJoinedAt = useMemo(() => {
    const date = new Date(user?.joined_at ?? null);
    return new Intl.DateTimeFormat('en-US').format(date ?? new Date())
  }, [isLoading]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <View style={styles.view}>
        <PressableScale
          style={styles.avatar}
          onPress={() => setIsOpen(true)}
        >
          <Image
            source={
              user?.avatar_url
                ? { uri: user?.avatar_url }
                : require("../assets/oscar.jpg")
            }
            style={{ width: "100%", height: "100%", borderRadius: 999 }}
          />
          {useUserStatus(user?.user_id) && <View style={styles.isOnlineDot}></View>}
        </PressableScale>

        <ActionButton
          isCurrentUser={isCurrentUser}
          isFollowed={isFollowed}
          isLoading={isLoading}
          onEdit={onEdit}
          onToggleFollow={onToggleFollow}
          onChat={onChat}
        />

      </View>

      {
        fullName && <Text
          style={textStyle.white20}
        >
          {fullName}
        </Text>
      }
      <Text
        style={textStyle.gray14}
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
          {`Joined ${fetchJoinedAt}`}
        </Text>
      </View>
      <ProfilePhotoModal
        isCurrentUser={isCurrentUser}
        isOpen={isOpen}
        avatarUrl={user?.avatar_url}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};


const styles = StyleSheet.create({
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
  }
});