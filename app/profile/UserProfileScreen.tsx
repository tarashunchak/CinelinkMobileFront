import { CURRENT_USER, getUserProfileData } from "@/api/currentUser";
import LeafyReturnArrowButton from "@/components/ui/leafy-return-arrow-btn";
import { textStyle } from "@/styles/textStyles";
import React, { useCallback, useEffect, useState } from "react";
import { TouchableOpacity, Image, ImageBackground, Pressable, ScrollView, Text, View } from "react-native";
import BottomBar from "../bars/bottomBar";
import { userPage } from "./styles";
import { UserProfile_T } from "./types";
import { useFocusEffect, useNavigation } from "expo-router";
import { useAuthStore } from "@/local_storage/user/asyncStorage/store";
import { FollowUser } from "@/api/followers/followers";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export default async function UserProfileScreen({ route }: any) {
  let mainButtons;
  const [user, setUser] = useState<any>();
  const [followed, setFollowed] = useState<boolean>(false);
  const navigator = useNavigation()

  const userID = route.params?.userID ? route.params?.userID : useAuthStore.getState()?.user?.user_id;
  useFocusEffect(
    useCallback(() => {
      async function loadUser() {
        const data = await getUserProfileData(userID);
        if (!data) return;
        data.created_at = new Date(data.created_at).toLocaleDateString('ua-UA')
        setUser(data);
      }
      loadUser()
    }, [])
  );

  mainButtons = (userID == CURRENT_USER.UID) ?
    (
      <Pressable style={styles.editBtn}>
        <Text style={textStyle.white18}>Edit</Text>
      </Pressable>
    )
    :
    (
      <TouchableOpacity style={followed ? styles.editBtn : styles.followBtn} onPress={() => {
        setFollowed(FollowUser(userID));
      }}>
        <Text style={followed ? textStyle.white18 : textStyle.black18}>{followed ? "Unfollow" : "Follow"}</Text>
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
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <LeafyReturnArrowButton onPress={() => navigator.goBack()} />
          {userID == CURRENT_USER.UID ? (<TouchableOpacity
            onPress={() => useAuthStore.getState().logOut()}
          >
            <Image
              style={{
                height: 34,
                width: 34,
              }}
              source={require("@/app/profile/assets/logOut.png")}
            />
          </TouchableOpacity>) : null}
        </View>
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

          {
            user?.bio ? <View style={{ padding: 2, backgroundColor: "rgba(255, 255, 255, 0.05)", justifyContent: "center", borderRadius: 6, borderWidth: 0.5, borderColor: "rgba(255, 255, 255, 0.2)" }}>
              <Text style={styles.bio}>{user?.bio}</Text>
            </View> : null
          }

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

        <View style={styles.line}></View>

      </ScrollView >
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
  bio: [
    textStyle.white16, {
      margin: 10,
      textAlign: "left"
    }],
};