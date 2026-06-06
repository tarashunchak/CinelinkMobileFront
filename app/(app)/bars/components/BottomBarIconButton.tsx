import { CommonActions } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";
import { PressableScale } from "react-native-pressable-scale";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Home, Library, Search, Hash, User } from "lucide-react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";

/*const icons = {
  home: require('../assets/home.png'),
  search: require('../assets/search.png'),
  profile: require('../assets/profile.png'),
  social: require('../assets/social.png'),
  library: require('../assets/bookmark.png'),
};*/

const TABS_CONFIG = [
  { route: "/library", Icon: Library },
  { route: "/search", Icon: Search },
  { route: "/home", Icon: Home },
  { route: "/social", Icon: Hash },
  { route: "/tab_profile", Icon: User },
];

const tabs = ["/library", "/search", "/home", "/social", "/tab_profile"];

export default function BottomBarButtons({ onPress }: { onPress: (route: string) => void }) {
  const [activeTab, setActiveTab] = useState<string>("/home");
  const router = useRouter();
  const handleTabPress = useCallback((route: string) => {
    router.navigate({
      pathname: route,
      params: { isFromTab: "1" }
    });
    onPress(route);
    setActiveTab(route);
    //requestAnimationFrame(() => {

    //});
  }, []);

  tabs.map((tab: string, index: number) => {
    return () => {
      onPress(tab);
      setActiveTab(tab);
      requestAnimationFrame(() => {
        router.navigate({
          pathname: tab,
          params: { isFromTab: "1" }
        });
      });
    };
  });
  /*const handleLibrary = useCallback(()=>{
    onPress("/library");
    setActiveTab("/library");
    requestAnimationFrame(()=>{
      router.navigate("/library");
    });
  },[]);
  const handleSearch = useCallback(()=>{
    onPress("/search");
    requestAnimationFrame(()=>{
      router.navigate("/search");
    });
  },[]);
  const handleHome = useCallback(()=>{
    onPress("/home");
    requestAnimationFrame(()=>{
      router.navigate("/home");
    });
  },[]);
  const handleSocial = useCallback(()=>{
    onPress("/social");
    requestAnimationFrame(()=>{
      router.navigate("/social");
    });
  },[]);
  const handleProfile = useCallback(()=>{
    onPress("/tab_profile");
    requestAnimationFrame(()=>{
      router.navigate({
        pathname: "/(app)/(tabs)/tab_profile",
        params: {
          isFromTab: "1",
        }
      });
    });
  },[]);*/
  return (
    <View style={styles_.view}>
      {
        TABS_CONFIG.map(({ route, Icon }) => (
          <PressableScale
            activeScale={0.85}
            onPress={() => handleTabPress(route)}
            style={styles_.main}
          >
            <Icon
              size={30}
              color={route === activeTab ? "gray" : "white"}
              strokeWidth={1}
            />
          </PressableScale>
        ))
      }
    </View>
  );
};

const styles_ = StyleSheet.create({
  view: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: "100%",
    //borderColor: "rgba(180, 200, 210, 0.5)",
    //borderWidth: 0.5,
    //borderRadius: 999,
  },
  main: {
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    width: (widthPercentageToDP(92) / 5),
    height: "100%",
  },
  button: {
  },
  image: {
    width: 30,
    height: 30,
    alignSelf: "center",
  },
});

function BottomBarButton({ source, onPress }: { source: string, onPress: () => void }) {
  /*const isSocial = source === "social" && false;
  let unSeenMessageCnt = 0;
  if(isSocial)
    unSeenMessageCnt = useUnseenMessagesCount();*/

  return (
    <PressableScale
      activeScale={0.9}
      onPress={onPress}
      style={styles_.main}
    >
      <Home
        size={30}
        color="white"
        strokeWidth={1}
      />
    </PressableScale>
  )
};

//export default memo(BottomBarButton);

const styles = StyleSheet.create({
  main: {
    alignItems: "center",
    justifyContent: "center",
    width: widthPercentageToDP(92) / 5,
    height: "100%",
  },
  button: {
  },
  image: {
    width: 30,
    height: 30,
    alignSelf: "center",
  },
});


/**
 * {
        isSocial && 
        <View style={{
          backgroundColor: "white",
          borderRadius: 999,
          height: 10,
          width: 10,
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          position: "absolute",
          top: -3,
          right: -5,
        }}>
        </View>
      }
 */