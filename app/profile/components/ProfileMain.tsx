import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { ActionButton } from "./ActionButton";
import { UserProfile_T } from "../types";
import { textStyle } from "@/styles/textStyles";
import ProfilePhotoModal from "./ProfilePhotoModal";

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

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <View style={styles.view}>
        <TouchableOpacity
          style={styles.avatar}
          onPress={() => setIsOpen(true)}
        >
          <Image
            source={{ uri: user?.avatar_url }}
            style={{ width: "100%", height: "100%", borderRadius: 999 }}
          />
        </TouchableOpacity>

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
      <ProfilePhotoModal onClose={()=>setIsOpen(false)} isOpen={isOpen} avatarUrl={user?.avatar_url} />
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