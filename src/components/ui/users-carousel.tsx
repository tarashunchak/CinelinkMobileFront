import { API_URL } from "@/api/API_CONFIG";
import { jwtHeaders } from "@/utils/utils";
import { View } from "lucide-react-native";
import React, { memo, useCallback, useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import AnimatedFastImage from "./animated-fast-image";
import { UsersManager, useUser, useUserStore } from "@/src/rt_client/managers/users_manager";
import { textStyle } from "@/styles/textStyles";
import { PressableScale } from "react-native-pressable-scale";
import { useRouter } from "expo-router";
import { FollowUser } from "@/api/followers";

interface User {
  user_id: number;
  mutual_count: number;
};

async function GetUserSuggestions(){
  const resp = await fetch(`${API_URL}/users/suggestions`, {
    headers: jwtHeaders(undefined),
  });
  const data = await resp.json();
  console.warn("Suggestions: ", data?.results);
  return data?.results;
}

const UserCard = memo(({item, onPress, onFollow}: any)=>{
  const userID = item?.user_id;
  const user = useUser(userID);

  useEffect(()=>{
    UsersManager.getInstance().load(userID);
  }, []);

  return (
    <PressableScale 
      style={styles.cardView}
      onPress={()=>onPress({userID, avatarUrl: user?.avatar_url})}
    >
        <AnimatedFastImage
          source={{uri: user?.avatar_url}}
          style={styles.avatarImage}
          cachePolicy="disk"
        />
        {user?.first_name && <Text style={textStyle.white16}>{`${user?.first_name} ${user?.last_name}`}</Text>}
        <Text style={textStyle.gray14}>{`@${user?.username}`}</Text>
        <Text style={textStyle.yellow12}>{`${item?.count} mutual`}</Text>
      <PressableScale style={styles.followBtn} onPress={()=>onFollow(userID)}>
        <Text style={[textStyle.white16, {fontWeight: "bold"}]}>{"Follow"}</Text>
      </PressableScale>
    </PressableScale >
  );
});

function UsersCarousel(){
  const [users, setUsers] = useState<any[]>([]);
  const router = useRouter();

  useEffect(()=>{
    async function load(){
      const data = await GetUserSuggestions();
      if(data?.users) setUsers(data?.users);
    };
    load();
  }, []);

  const handleFollow = useCallback(async (userID: number)=>{
    await FollowUser(userID).finally(()=>{
      setUsers(prev=> prev.filter(u => u.user_id !== userID));
    });
  }, []);

  const handlePress = useCallback(({userID, avatarUrl}: any)=>{
    router.push({
      pathname: "profile",
      params: {
        userID,
        avatarUrl,
      }
    });
  }, []);

  const renderItem = useCallback(({item}: any)=>
    <UserCard item={item} onPress={handlePress} onFollow={handleFollow}/>
    , []);

  return (
    <FlatList
      horizontal
      data={users}
      renderItem={renderItem}
      indicatorStyle={{}}
      style={styles.flatList}
      keyExtractor={(item, index) => item?.user?.user_id ? `user-${item?.user?.user_id}`: String(index)}
      contentContainerStyle={{gap: 1}}
    />
  );
};

export default memo(UsersCarousel);

const styles = StyleSheet.create({
  flatList: {
    minHeight: 175,
    maxHeight: 195,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    paddingVertical: 4,
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 18,
    marginTop: "3%",
    paddingHorizontal: "1%",
  },
  cardView: {
    marginRight: 5,
    height: "99%",
    aspectRatio: 0.9,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: 14,
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.2)",
    padding: "3%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  avatarImage: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderColor: "white",
    borderWidth: 0.5,
  },
  followBtn: {
    width: "94%",
    height: 34,
    backgroundColor: "#F0A500",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
});