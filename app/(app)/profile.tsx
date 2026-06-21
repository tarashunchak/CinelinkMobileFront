import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { heightPercentageToDP, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { getCurrentUserID, isCurrentUser } from "@/utils/utils";
import ProfileHeader from "@/src/features/profile/components/ProfileHeader";
import ProfileMain from "@/src/features/profile/components/ProfileMain";
import { FollowUser, UnfollowUser } from "@/api/followers/followers";
import { GetDirectChatID } from "@/api/chats";
import UserStats from "@/src/features/profile/components/Stats";
import { UsersManager, useUser, useUserStore } from "@/src/rt_client/managers/users_manager";
import { useFollowers, useFollowings } from "@/src/features/profile/hooks/useFollowers";
import FriendCard from "@/src/components/friend-card";
import Spacer from "@/src/components/ui/spacer";

type Params = {
  userID: number;
  avatarUrl: string;
};

function UserProfileScreen({ isFromTab = false }: { isFromTab: boolean }) {
  const router = useRouter();
  const params: Params = useLocalSearchParams();
  const userID: number = params.userID ?? getCurrentUserID();
  const user = useUserStore(s => s.userProfiles[userID]);
  const isCurrUser = isCurrentUser(userID);
  const [list, setList] = useState<string>("Followers");
  const [chatID, setChatID] = useState<number>(0);
  const followers = useFollowers(userID);
  const followings = useFollowings(userID);
  const posts: any = [];

  useEffect(() => {
    async function load() {
      //console.warn("LOAD DIRECT CHATID");
      await GetDirectChatID(userID).then(setChatID);
    };
    //console.warn("IsFromTab: ", isFromTab, " Type: ", typeof isFromTab);
    load();
  }, [user]);

  const data = useMemo(() => {
    switch (list) {
      case "Followers":
        return followers;
      case "Followings":
        return followings;
      case "Posts":
        return posts;
    };
  }, [list, followings, followers, posts]);

  const onFriendPress = useCallback((userID: number, avatarUrl: string, fullName: string) => {
    router.push({
      pathname: "/profile",
      params: {
        userID,
        avatarUrl,
      }
    })
  }, []);

  const renderItem = useCallback(({ item }: any) => {
    switch (list) {
      case "Followers":
        return <FriendCard user={item} onFollowingQuit={() => { }} onMessage={() => { }} onPress={onFriendPress} />;
      case "Followings":
        return <FriendCard user={item} onFollowingQuit={() => { }} onMessage={() => { }} onPress={onFriendPress} />;
      case "Posts":
        return null;
    };
  }, [list]);

  const header = useMemo(() =>
    <View>
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
            await UnfollowUser(userID).finally(() => {
              UsersManager.getInstance().load(userID);
              UsersManager.getInstance().load(getCurrentUserID());
            });
          else
            await FollowUser(userID).finally(() => {
              UsersManager.getInstance().load(userID);
              UsersManager.getInstance().load(getCurrentUserID());
            });
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
    </View>
    , [user]);

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(_: any, index: number) => String(index)}
      showsVerticalScrollIndicator={false}
      style={StyleSheet.absoluteFill}
      ListHeaderComponent={header}
      ListFooterComponent={<Spacer orientation="v" spacing={heightPercentageToDP(8)}/>}
    />
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
    marginVertical: 10,
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