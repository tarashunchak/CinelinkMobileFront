import ReturnArrowButton from "@/components/ui/returnArrowButton";
import { textStyle } from "@/styles/textStyles";
import React, { useCallback, useEffect, useState } from "react";
import { TouchableOpacity, Image, ImageBackground, Pressable, ScrollView, Text, View } from "react-native";
import BottomBar from "../bars/bottomBar";
import { userPage } from "./styles";
import { UserProfile_T } from "./types";
import { useFocusEffect, useNavigation } from "expo-router";
import { useAuthStore } from "@/local_storage/user/asyncStorage/store";
import { FollowUser, UnfollowUser } from "@/api/followers/followers";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { getCurrentUserID } from "@/utils/utils";
import FollowingsList from "./components/followingsList";
import FollowersList from "./components/followersList";
import { useUserProfile } from "./hooks/useUserProfile";
import { ActionButton } from "./components/actionButton";
import { LogOutButton } from "./components/logOutButton";
import { ProfileHeader } from "./components/profileHeader";
import { ProfileMain } from "./components/profileMain";

export default function UserProfileScreen({ route }: any) {
  const navigator = useNavigation();
  const userID = route?.params?.userID ? route.params.userID : getCurrentUserID();
  const { user, loadUser } = useUserProfile(userID);
  const isCurrentUser = userID === getCurrentUserID();

  useFocusEffect(
    useCallback(() => {
      loadUser();
    }, [loadUser])
  )

  return (
    <ImageBackground
      source={require("@/assets/images/background.png")}
      style={{ flex: 1 }}
    >
      <View style={[{ padding: "2%" }]}>
        <ProfileHeader
          user={user}
          onBack={navigator.goBack}
        />
        <View style={{ flexDirection: "column", gap: 5 }}>
          <ProfileMain
            user={user}
            isCurrentUser={true}
            isFollowed={false}
            onEdit={() => { }}
            onToggleFollow={() => { }}
          />

          <View style={userPage.stats.view}>

            <TouchableOpacity style={userPage.stats.item}
              onPress={() => {
                setList("Followings");
              }}>
              <Text style={userPage.stats.itemText}>{user?.followings || "*"}</Text>
              <Text style={userPage.stats.itemText}>Followings</Text>
            </TouchableOpacity>

            <TouchableOpacity style={userPage.stats.item}
              onPress={() => {
              }}>
              <Text style={userPage.stats.itemText}>{user?.followers || "*"}</Text>
              <Text style={userPage.stats.itemText}>Followers</Text>
            </TouchableOpacity>

            <TouchableOpacity style={userPage.stats.item}>
              <Text style={userPage.stats.itemText}>{user?.posts || "*"}</Text>
              <Text style={userPage.stats.itemText}>Posts</Text>
            </TouchableOpacity>
          </View>

        </View>

        <View style={styles.line}>
        </View>

      </View >
      <BottomBar />
    </ImageBackground >
  );
};

const styles = {
  line: {
    width: wp(96),
    height: 0.5,
    backgroundColor: "#ACACAC",
    alignSelf: "center",
    borderRadius: 2,
    marginTop: 10,
  },
  editBtn: {
    flexDirection: "row",
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
  followBtn: {
    backgroundColor: "white",
    width: 110,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22,
    alignSelf: "flex-end",
  },
  bio: {
    view: {
      padding: 2,
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      justifyContent: "center",
      borderRadius: 6,
      borderWidth: 0.5,
      borderColor: "rgba(255, 255, 255, 0.2)"
    },
    text: [textStyle.white16, {
      margin: 10,
      textAlign: "left"
    }],
  },
};