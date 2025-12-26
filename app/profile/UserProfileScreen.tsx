import { CURRENT_USER, getUserProfileData } from "@/api/currentUser";
import LeafyReturnArrowButton from "@/components/ui/leafy-return-arrow-btn";
import { textStyle } from "@/styles/textStyles";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, Image, ImageBackground, Pressable, ScrollView, Text, View } from "react-native";
import BottomBar from "../bars/bottomBar";
import { userPage } from "./styles";
import { UserProfile_T } from "./types";
import { useNavigation } from "expo-router";
import { useAuthStore } from "@/local_storage/user/asyncStorage/store";

export default async function UserProfileScreen({ route }: any) {
  let mainButtons;
  const [user, setUser] = useState<any>();
  const navigator = useNavigation()

  const userID = route.params?.userID;
  useEffect(() => {
    async function loadUser() {
      if (userID == CURRENT_USER.UID) {
        setUser(useAuthStore.getState().user)
        return
      } else {
        const data = await getUserProfileData(userID);
        if (!data) return;
        data.created_at = new Date(data.created_at).toLocaleDateString('ua-UA')
      }
      setUser(data);
    }
    loadUser()
  }, []);

  mainButtons = (userID == CURRENT_USER.UID) ?
    (
      <Pressable style={styles.editBtn}>
        <Text style={textStyle.white18}>Edit</Text>
      </Pressable>
    )
    :
    (
      <TouchableOpacity style={styles.followBtn}>
        <Text style={textStyle.black18}>Follow</Text>
      </TouchableOpacity>
    )

  return (
    <ImageBackground source={require("@/assets/images/background.png")} style={{ flex: 1 }}>
      <ScrollView style={[{ padding: "2%" }]}>
        <ImageBackground
          source={user?.bg_img_url
            ? { uri: user?.bg_img_url }
            : require("@/assets/images/profileBackground.png")}
          style={userPage.imageBackground}
        />
        <LeafyReturnArrowButton onPress={() => navigator.goBack()} />
        <View style={{ flexDirection: "column", gap: 5 }}>
          <View style={{ width: "100%", marginTop: "45%", height: 100, flexDirection: "row", justifyContent: "space-between" }}>
            <View style={userPage.profilPic.view}>
              <Image
                source={{ uri: user?.avatar_url }}
                style={userPage.profilPic.picture}
              />
            </View>
            {
              mainButtons
            }
          </View>

          <Text style={textStyle.white20}>{user ? `${user?.first_name} ${user?.last_name}` : "Gigga Nigga"}</Text>
          <Text style={textStyle.gray12}>{`@${user?.username}` || "@username"}</Text>

          <Text style={styles.bio}>{user?.bio}</Text>

          <View style={userPage.joinedAt.view}>
            <Image source={require("@/assets/images/Calendar.png")}></Image>
            <Text style={textStyle.gray14}>Joined {user?.created_at}</Text>
          </View>

          <View style={userPage.stats.view}>
            <View style={userPage.stats.item}>
              <Text style={userPage.stats.itemText}>{user?.followings}</Text>
              <Text style={userPage.stats.itemText}>Following</Text>
            </View>
            <View style={userPage.stats.item}>
              <Text style={userPage.stats.itemText}>{user?.followers}</Text>
              <Text style={userPage.stats.itemText}>Followers</Text>
            </View>
            <View style={userPage.stats.item}>
              <Text style={userPage.stats.itemText}>{user?.posts}</Text>
              <Text style={userPage.stats.itemText}>Posts</Text>
            </View>
          </View>

        </View>

        <View style={userPage.post.view}>
          <View style={userPage.post.profilInfo.view}>
            <Image style={userPage.post.profilInfo.picture}
              source={
                user?.avatar_url
                  ? { uri: user?.avatar_url }
                  : require("@/assets/images/giggaNigga.png")}
            />
            <Text style={userPage.post.profilInfo.name}>{`${user?.first_name} ${user?.last_name}`}</Text>
          </View>
        </View>
      </ScrollView >
      <BottomBar />
    </ImageBackground >
  );
};


const styles = {
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
  },
  followBtn: {
    backgroundColor: "white",
    width: 110,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22
  },
  bio: [
    textStyle.white16, {
      marginTop: 10,
      marginLeft: 10,
      textAlign: "left"
    }],
};