import { useFocusEffect, useNavigation } from "expo-router";
import LeafyReturnArrowButton from "@/components/ui/leafy-return-arrow-btn";
import React, { useCallback, useEffect, useState } from "react";
import { TouchableOpacity, Image, ImageBackground, Pressable, ScrollView, Text, View } from "react-native";
import { textStyle } from "@/styles/textStyles";
import { UserProfile_T } from "./types";

type Props = {
  user: UserProfile_T;
  followed: boolean;
  onFollow: () => void;
};

export function UserProfileView({ user, followed, onFollow }: Props) {

  return (
    <ImageBackground
      source={require("@/assets/images/background.png")}
      style={{ flex: 1 }}
    >
      <View style={[{ padding: "2%" }]}>
        <ImageBackground
          source={user?.bg_img_url
            ? { uri: user?.bg_img_url }
            : require("@/assets/images/profileBackground.png")}
          style={userPage.imageBackground}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <LeafyReturnArrowButton onPress={() => navigator.goBack()} />
          {
            isCurrentUser(userID) &&
            <TouchableOpacity
              onPress={() => useAuthStore.getState().logOut()}
            >
              <Image
                style={{
                  height: 34,
                  width: 34,
                }}
                source={require("@/app/profile/assets/logOut.png")}
              />
            </TouchableOpacity>
          }
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
            user?.bio && <View style={styles.bio.view}>
              <Text style={styles.bio.text}>{user?.bio}</Text>
            </View>
          }

          <View style={userPage.joinedAt.view}>
            <Image source={require("@/assets/images/Calendar.png")}></Image>
            <Text style={textStyle.gray14}>Joined {user?.created_at}</Text>
          </View>

          <View style={userPage.stats.view}>

            <TouchableOpacity style={userPage.stats.item}
              onPress={() => {
                setList("Followings");
              }}>
              <Text style={userPage.stats.itemText}>{user?.followings}</Text>
              <Text style={userPage.stats.itemText}>Followings</Text>
            </TouchableOpacity>

            <TouchableOpacity style={userPage.stats.item}
              onPress={() => {
                setList("Followers");
              }}>
              <Text style={userPage.stats.itemText}>{user?.followers}</Text>
              <Text style={userPage.stats.itemText}>Followers</Text>
            </TouchableOpacity>
            <View style={userPage.stats.item}>
              <Text style={userPage.stats.itemText}>{user?.posts}</Text>
              <Text style={userPage.stats.itemText}>Posts</Text>
            </View>
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

};