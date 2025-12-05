import { backgroundStyle } from "@/styles/backgroundStyle";
import React from "react";
import { getFilmographyByPerson } from "@/api/tmdbApi";
import BottomBar from "@/app/screens/bars/bottomBar";
import LeafyReturnArrowButton from "@/components/ui/leafy-return-arrow-btn";
import { textStyle } from "@/styles/textStyles";
import { useNavigation } from "expo-router";
import { Dimensions, Image, ImageBackground, Linking, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { userProfileScreen } from "./new_styles";

const { width: screenW, height: screenH } = Dimensions.get("window");

export default function CurrentUserProfileScreen() {

  return (
    <View style={{ flex: 1 }}>

      <ImageBackground source={require("@/assets/images/background.png")} style={{ flex: 1 }}>

        <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false} style={{ padding: "2%", flex: 1 }} >
          <LeafyReturnArrowButton style={{ marginTop: "5%", zIndex: 2 }} onPress={() => navigation.goBack()} />

          <ImageBackground
            source={{ uri: "https://image.tmdb.org/t/p/w200" + images?.[images?.length - 1]?.file_path }}
            style={{ height: (screenH / 100) * 40, width: "104%", marginLeft: "-3%", marginRight: "-3%", marginTop: "-25%" }}>
            <View style={{ backgroundColor: "rgba(0, 0, 0, 0.75)", marginRight: "-2%", marginTop: "1%", height: heightPercentageToDP("40%") }}>

              <View style={{ flexDirection: "column", marginLeft: "3%", marginTop: "20%", justifyContent: "space-between" }}>

                <Text style={userProfileScreen.mainView.actorBasicInfo.title}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {actor?.name}
                </Text>

                <View style={userProfileScreen.mainView.actorBasicInfo.view}>

                  <View style={userProfileScreen.mainView.actorBasicInfo.posterView}>
                    <Image
                      source={actor?.profile_path ? { uri: "https://image.tmdb.org/t/p/w200" + actor?.profile_path } : require("@/assets/images/noPhoto.png")}
                      style={{ height: "100%", width: "100%" }} />
                  </View>

                  <View style={userProfileScreen.mainView.actorBasicInfo.infoView.view}>
                    <View style={userProfileScreen.mainView.actorBasicInfo.infoView.textInfoView}>
                      <View style={userProfileScreen.mainView.actorBasicInfo.infoView.bdayView}>
                        <Text style={textStyle.yellow16}>{"Birthday"}</Text>
                        <Text style={textStyle.white16}>{`: ${actor?.birthday || "Not available"}`}</Text>
                      </View>

                      <View style={userProfileScreen.mainView.actorBasicInfo.infoView.bdayView}>
                        <Text style={textStyle.yellow16}>{"Deathday"}</Text>
                        <Text style={textStyle.white16}>{`: ${actor?.deathday || "Still alive"}`}</Text>
                      </View>

                      <View style={userProfileScreen.mainView.actorBasicInfo.infoView.genderView}>
                        <Text style={textStyle.yellow16}>{"Gender"}</Text>
                        <Text style={textStyle.white16}>{`: ${actor?.gender === 1 ? "Female" : "Male"}`}</Text>
                      </View>

                      <View style={{ width: "100%", flexDirection: "column" }}>
                        <Text style={textStyle.yellow16}>{"Place of birth: "}</Text>

                        <Text style={[textStyle.white16, { width: "100%" }]}
                          numberOfLines={1} ellipsizeMode="tail">  {actor?.place_of_birth || "unknown"} </Text>
                      </View>

                      <View style={{ width: "100%", flexDirection: "row" }}>
                        <Text style={textStyle.yellow16}>{"Department: "}</Text>
                        <Text style={textStyle.white16}>{actor?.known_for_department} </Text>
                      </View>

                      <View style={{ width: "100%", flexDirection: "row" }}>
                        <Text style={textStyle.yellow16}>{"Popularity: "}</Text>
                        <Text style={textStyle.white16}>{actor?.popularity} </Text>
                      </View>

                      <TouchableOpacity style={userProfileScreen.mainView.actorBasicInfo.infoView.imdbText.view}
                        onPress={async () => {
                          const url = `https://www.imdb.com/name/${actor?.imdb_id}`;
                          const sup = await Linking.canOpenURL(url);
                          if (sup) Linking.openURL(url);
                        }}
                      >
                        <Text style={userProfileScreen.mainView.actorBasicInfo.infoView.imdbText.text}>IMDb</Text>
                      </TouchableOpacity>

                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ImageBackground>


          <View style={userProfileScreen.actionRow.view}>
            <Pressable style={userProfileScreen.actionRow.markAsWatchedBtn}>
              <Text style={[userProfileScreen.white18, { width: "100%", textAlign: "center" }]}>Subscribe</Text>
            </Pressable>

            <Pressable style={userProfileScreen.actionRow.saveBtn}>
              <Text style={[userProfileScreen.white18, { width: "100%", textAlign: "center" }]}>Mark as Favourite</Text>
            </Pressable>

            <Pressable style={userProfileScreen.actionRow.shareBtn}>
              <Text style={[userProfileScreen.white18, { width: "100%", textAlign: "center" }]}>Share</Text>
            </Pressable>
          </View>

          <BiographyModal bio={actor?.biography || "It`s empty here for now..."} />

          <PhotosModal images={images} backdrop={backdrop} />


        </ScrollView >
      </ImageBackground >

      <BottomBar />
    </View>
  );
}