import React, { memo, useCallback, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import BottomBar from "../bars/bottomBar";
import { useFocusEffect, useNavigation } from "expo-router";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { getCurrentUserID, isCurrentUser } from "@/utils/utils";
import { useUserProfile } from "./hooks/useUserProfile";
import ProfileHeader from "./components/ProfileHeader";
import ProfileMain from "./components/ProfileMain";
import { FollowUser, UnfollowUser } from "@/api/followers/followers";
import FollowingsList from "./components/FollowingsList";
import FollowersList from "./components/FollowersList";
import { useFollowings } from "./hooks/useFollowings";
import { useFollowers } from "./hooks/useFollowers";
import { GetDirectChatID } from "../../api/chats";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import ScreenBackground from "@/components/ui/screen-background";
import UserStats from "./components/Stats";
import { BlurTargetView } from "expo-blur";
import { useUser } from "../rt_client/managers/users_manager";

function UserProfileScreen({ route }: any) {
  const navigator = useNavigation();
  const userID = route?.params?.userID ?? getCurrentUserID();
  const { user, loadUser, userLoading } = useUserProfile(userID);
  const { followings, loadFollowings, followingsLoading } = useFollowings(userID);
  const { followers, loadFollowers, followersLoading } = useFollowers(userID);
  const [isCurrUser, setIsCurrUser] = useState<boolean>(false);
  const [list, setList] = useState<string>("Followers");
  const [chatID, setChatID] = useState<number>(0);
  const cachedUser = useUser(userID);

  useFocusEffect(
    useCallback(() => {
      loadUser();
      loadFollowings();
      loadFollowers();
      setIsCurrUser(isCurrentUser(userID))
      console.warn(`User info: ${user?.followings}`);
      async function load() {
        console.warn("LOAD DIRECT CHATID");
        const chatID = await GetDirectChatID(userID);
        setChatID(chatID);
      };
      load();
    }, [])
  );

  const sections = [
    { type: "header" },
    { type: "main" },
    { type: "stats" },
    { type: "line" },
    { type: "list" },
  ];

  const renterItem = useCallback(({ item }: any) => {
    switch (item.type) {
      case "main":
        return
      case "stats":
        return
      case "line":
        return
      case "list":
        return <>

        </>
    }
  }, []);


  const ref = useRef<View | null>(null);

  return (
    <GestureHandlerRootView>
      <BlurTargetView ref={ref} style={{ flex: 1 }}>
        <ScreenBackground>
          <ScrollView
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
          >
            <ProfileHeader
              bgUrl={user?.bg_img_url}
              onBack={navigator.goBack}
              isCurrentUser={isCurrUser}
            />
            <ProfileMain
              isLoading={(userLoading ?? false) && true}
              user={{ ...user, ...{ user_id: userID }, ...cachedUser }}
              isCurrentUser={isCurrUser}
              isFollowed={user?.is_following}
              onEdit={() => { }}
              onToggleFollow={async () => {
                if (user?.is_following)
                  await UnfollowUser(userID) && loadUser();
                else
                  await FollowUser(userID) && loadUser();
              }}
              onChat={() => {
                console.warn("On chat");
                navigator.navigate("DirectChatScreen", { chatID: chatID });
              }}
              ref={ref}
            />
            <UserStats
              followersCnt={followers?.length}
              followingsCnt={followings?.length}
              postsCnt={user?.posts?.length}
              onPress={setList}
            />
            <View style={styles.line} />
            {
              list === "Followings"
              && <FollowingsList userID={userID} />
            }
            {
              list === "Followers"
              && <FollowersList userID={userID} />
            }
          </ScrollView>
          <BottomBar />
        </ScreenBackground >
      </BlurTargetView>
    </GestureHandlerRootView >
  );
};

export default memo(UserProfileScreen);

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
  },
  activeStatsView: {
    flexDirection: "row",
    paddingHorizontal: 5,
    paddingBottom: 1,
    gap: 5,
    borderRadius: 999,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  inactiveStatsView: {
    flexDirection: "row",
    paddingHorizontal: 5,
    paddingBottom: 1,
    gap: 5,
    backgroundColor: "transparent",
  },
});