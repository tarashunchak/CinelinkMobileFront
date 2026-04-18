import React, { useCallback, useState } from "react";
import { TouchableOpacity, ImageBackground, Text, View, StyleSheet, Platform } from "react-native";
import BottomBar from "../bars/bottomBar";
import { userPage } from "./styles";
import { useFocusEffect, useNavigation } from "expo-router";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { getCurrentUserID, isCurrentUser } from "@/utils/utils";
import { useUserProfile } from "./hooks/useUserProfile";
import { ProfileHeader } from "./components/ProfileHeader";
import { ProfileMain } from "./components/ProfileMain";
import { FollowUser, UnfollowUser } from "@/api/followers/followers";
import FollowingsList from "./components/FollowingsList";
import FollowersList from "./components/FollowersList";
import { useFollowings } from "./hooks/useFollowings";
import { useFollowers } from "./hooks/useFollowers";
import { GetChatMessages } from "@/api/chats/chats";
import { GetDirectChatID } from "../direct_chat/utils/utils";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";

export default function UserProfileScreen({ route }: any) {
  const navigator = useNavigation();
  const userID = route?.params?.userID ?? getCurrentUserID();
  const { user, loadUser, userLoading } = useUserProfile(userID);
  const { followings, loadFollowings, followingsLoading } = useFollowings(userID);
  const { followers, loadFollowers, followersLoading } = useFollowers(userID);
  const [isCurrUser, setIsCurrUser] = useState<boolean>(false);
  const [list, setList] = useState<string>("Followers");

  useFocusEffect(
    useCallback(() => {
      loadUser();
      loadFollowings();
      loadFollowers();
      setIsCurrUser(isCurrentUser(userID))
      console.warn(`User info: ${user?.followings}`);
    }, [])
  );


  return (
    <GestureHandlerRootView>
      <ImageBackground
        source={require("@/assets/images/background.png")}
        style={{ flex: 1, backgroundColor: "black" }}
      >
        <ScrollView style={[{ padding: "2%", paddingTop: Platform.OS === "ios" ? "5%" : "2%" }]}>
          <ProfileHeader
            user={user}
            onBack={navigator.goBack}
            isCurrentUser={isCurrUser}
          />
          <View style={{ flexDirection: "column", gap: 5 }}>
            <ProfileMain
              isLoading={(userLoading ?? false) && true}
              user={user}
              isCurrentUser={isCurrUser}
              isFollowed={user?.is_following}
              onEdit={() => { }}
              onToggleFollow={async () => {
                if (user?.is_following)
                  await UnfollowUser(userID) && loadUser();
                else
                  await FollowUser(userID) && loadUser();
              }}
              onChat={async () => {
                console.warn("On chat");
                navigator.navigate("DirectChatScreen", { chatID: await GetDirectChatID(getCurrentUserID(), userID) });
              }}
            />

            <View style={userPage.stats.view}>

              <TouchableOpacity style={userPage.stats.item}
                onPress={() => {
                  setList("Followings");
                }}>
                <Text style={userPage.stats.itemText}>{followings?.length || "*"}</Text>
                <Text style={userPage.stats.itemText}>Followings</Text>
              </TouchableOpacity>

              <TouchableOpacity style={userPage.stats.item}
                onPress={() => {
                  setList("Followers");
                }}>
                <Text style={userPage.stats.itemText}>{followers?.length || "*"}</Text>
                <Text style={userPage.stats.itemText}>Followers</Text>
              </TouchableOpacity>

              <TouchableOpacity style={userPage.stats.item}>
                <Text style={userPage.stats.itemText}>{user?.posts || "*"}</Text>
                <Text style={userPage.stats.itemText}>Posts</Text>
              </TouchableOpacity>
            </View>

          </View>

          <View style={styles.line}></View>
          {
            list === "Followings"
            && <FollowingsList userID={userID} />
          }
          {
            list === "Followers"
            && <FollowersList userID={userID} />
          }

        </ScrollView >

        <BottomBar />
      </ImageBackground >
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
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
  bioView: {
    padding: 2,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.2)"
  },
  bioText: {
    margin: 10,
    textAlign: "left"
  }
});