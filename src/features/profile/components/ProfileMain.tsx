import React, { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ActionButton } from "./ActionButton";
import { UserProfile_T } from "../types";
import { textStyle } from "@/styles/textStyles";
import ProfilePhotoModal from "./ProfilePhotoModal";
import { PressableScale } from "react-native-pressable-scale";
import { Image } from "expo-image";
import AnimatedFastImage from "@/src/components/ui/animated-fast-image";
import { useUserStatus } from "@/src/rt_client/managers/users_manager";
import AnimatedFastText from "@/src/components/ui/animated-fast-text";

type Props = {
  isLoading: boolean;
  user: UserProfile_T | undefined;
  isCurrentUser: boolean;
  isFollowed: boolean;
  onEdit: () => void,
  onToggleFollow: () => void,
  onChat: () => void;
};

export default function ProfileMain({
  isLoading,
  user,
  isCurrentUser,
  isFollowed,
  onEdit,
  onToggleFollow,
  onChat,
}: Props) {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isOnline = useUserStatus(user?.user_id);

  const fullName = useMemo(() => {
    return user?.first_name ? `${user?.first_name} ${user?.last_name}` : "*******";
  }, [isLoading]);

  const username: string = useMemo(()=>{
    return user?.username ?? "********";
  }, [isLoading, user?.user_id]);

  const fetchJoinedAt = useMemo(() => {
    const date = new Date(user?.created_at ?? null);
    return new Intl.DateTimeFormat('en-US').format(date ?? new Date())
  }, [isLoading, user?.user_id]);


  return (
    <View style={{ paddingHorizontal: "1%", backgroundColor: "transparent" }}>
      <View style={styles.view}>
        <PressableScale
          style={styles.avatar}
          onPress={() => { setIsOpen(true)}}
        >
          <AnimatedFastImage
            sharedTransitionTag={`user-${user?.user_id}-avatar`}
            source={user?.avatar_url}
            style={{ width: "100%", height: "100%", borderRadius: 999 }}
            cachePolicy="disk"
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
          bgUrl={user?.bg_img_url}
        />
      </View>

      <AnimatedFastText 
        style={textStyle.white22} 
        sharedTransitionTag={`user-${user?.user_id}-full_name`}
      >
        {fullName}
      </AnimatedFastText >
      <Text style={textStyle.gray16} >
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
      {isOpen && <ProfilePhotoModal
        avatarUrl={user?.avatar_url}
        isOpen={isOpen}
        onClose={()=>setIsOpen(false)}
        isCurrentUser={isCurrentUser}
      />}
    </View>
  );
};

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