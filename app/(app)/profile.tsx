import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { getCurrentUserID, isCurrentUser } from "@/utils/utils";
import { useUserProfile } from "@/src/features/profile/hooks/useUserProfile";
import ProfileHeader from "@/src/features/profile/components/ProfileHeader";
import ProfileMain from "@/src/features/profile/components/ProfileMain";
import { FollowUser, UnfollowUser } from "@/api/followers/followers";
import FollowingsList from "@/src/features/profile/components/FollowingsList";
import FollowersList from "@/src/features/profile/components/FollowersList";
import { useFollowings } from "@/src/features/profile/hooks/useFollowings";
import { useFollowers } from "@/src/features/profile/hooks/useFollowers";
import { GetDirectChatID } from "@/api/chats";
import { ScrollView } from "react-native-gesture-handler";
import UserStats from "@/src/features/profile/components/Stats";
import { UsersManager, useUser } from "@/src/rt_client/managers/users_manager";
import PostsList from "@/src/features/profile/components/PostsList";
import { BlurTargetView, BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBlurTargetRef } from "@/src/hooks/useBackgroundBlur";

type Params = {
  userID: number;
  avatarUrl: string;
};

function UserProfileScreen({ isFromTab = false }: { isFromTab: boolean }) {
  const router = useRouter();
  const params: Params = useLocalSearchParams();
  const userID: number = params.userID ?? getCurrentUserID();
  const isCurrUser = isCurrentUser(userID ?? 0);
  //const { user, loadUser, userLoading } = useUserProfile(userID);
  //const { followings, loadFollowings, followingsLoading } = useFollowings(userID);
  //const { followers, loadFollowers, followersLoading } = useFollowers(userID);
  //const [isCurrUser, setIsCurrUser] = useState<boolean>(false);
  const [list, setList] = useState<string>("Followers");
  const [chatID, setChatID] = useState<number>(0);
  const user = useUser(userID);

  useFocusEffect(
    useCallback(() => {
      async function load() {
        //console.warn("LOAD DIRECT CHATID");
        await GetDirectChatID(userID).then(setChatID);
      };
      //console.warn("IsFromTab: ", isFromTab, " Type: ", typeof isFromTab);
      load();
    }, []));

  const currentList = useMemo(() => {
    return <>{
      list === "Followings"
      && <FollowingsList userID={userID} />
    }
      {
        list === "Followers"
        && <FollowersList userID={userID} />
      }
      {
        list === "Posts"
        && <PostsList userID={userID} />
      }</>
  }, [list]);

  return (
    <ScrollView
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}
      style={StyleSheet.absoluteFill}
    >
      <ProfileHeader
        bgUrl={user?.bg_img_url}
        isCurrentUser={isCurrUser}
        isFromTab={isFromTab}
      />
      <ProfileMain
        isLoading={/*(userLoading ?? false) && true*/ false}
        user={user}
        isCurrentUser={isCurrUser}
        isFollowed={user?.is_following}
        onEdit={() => { }}
        onToggleFollow={async () => {
          if (user?.is_following)
            await UnfollowUser(userID).finally(()=> UsersManager.getInstance().load(userID));
          else
            await FollowUser(userID).finally(()=> UsersManager.getInstance().load(userID));
        }}
        onChat={() => {
          router.navigate({
            pathname: "/direct_chat",
            params: {
              chatID: chatID,
              imgUrl: user?.avatar_url,
              name: `${user?.first_name} ${user?.last_name}`,
              peerID: userID,
            }
          });
        }}
      />
      <UserStats
        followersCnt={user?.followers_ids?.length}
        followingsCnt={user?.followings_ids?.length}
        postsCnt={user?.posts?.length}
        onPress={setList}
      />
      <View style={styles.line} />
      {currentList}
    </ScrollView>
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