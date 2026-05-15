import React, { memo, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ActionButton } from "./ActionButton";
import { UserProfile_T } from "../types";
import { textStyle } from "@/styles/textStyles";
import ProfilePhotoModal from "./ProfilePhotoModal";
import { PressableScale } from "react-native-pressable-scale";
import { Image } from "expo-image";
import AnimatedFastImage from "@/components/ui/animated-fast-image";
import { useUserStatus } from "@/app/rt_client/managers/users_manager";

type Props = {
  isLoading: boolean;
  user: UserProfile_T | undefined;
  isCurrentUser: boolean;
  isFollowed: boolean;
  onEdit: () => void,
  onToggleFollow: () => void,
  onChat: () => void;
  ref: any;
};

function ProfileMain({
  isLoading,
  user,
  isCurrentUser,
  isFollowed,
  onEdit,
  onToggleFollow,
  onChat,
  ref,
}: Props) {

  const isOnline = useUserStatus(user?.user_id);

  const fullName = useMemo(() => {
    if (isLoading)
      return "**** ****";
    else
      return user?.first_name && `${user?.first_name} ${user?.last_name}`;
  }, [isLoading])

  const username: string = isLoading ? "********" : user?.username;

  const fetchJoinedAt = useMemo(() => {
    const date = new Date(user?.created_at ?? null);
    return new Intl.DateTimeFormat('en-US').format(date ?? new Date())
  }, [isLoading]);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <View style={{ padding: "1%" }}>
      <View style={styles.view}>
        <PressableScale
          style={styles.avatar}
          onPress={() => setIsOpen(true)}
        >
          <AnimatedFastImage
            sharedTransitionTag={`user-${user?.user_id}-avatar`}
            source={user?.avatar_url}
            style={{ width: "100%", height: "100%", borderRadius: 999 }}
            cachePolicy="memory"
          />
          {isOnline && <View style={styles.isOnlineDot}></View>}
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
        ref={ref}
      />
    </View>
  );
};

export default memo(ProfileMain);

const styles = StyleSheet.create({
  view: {
    width: "100%",
    marginTop: "40%",
    height: 100,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 999,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderColor: "rgba(255, 255, 255, 0.5)",
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
    height: 18,
    width: 18,
    backgroundColor: "#329E4F",
    borderRadius: 999,
    position: "absolute",
    right: 2,
    bottom: 5,
    borderColor: "white",
    borderWidth: 1,
  }
});