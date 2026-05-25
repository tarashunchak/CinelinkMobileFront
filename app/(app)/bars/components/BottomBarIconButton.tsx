import { CommonActions } from "@react-navigation/native";
import React, { useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { PressableScale } from "react-native-pressable-scale";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Home, Library, Search, Hash, User } from "lucide-react-native";

const icons = {
  home: require('../assets/home.png'),
  search: require('../assets/search.png'),
  profile: require('../assets/profile.png'),
  social: require('../assets/social.png'),
  library: require('../assets/bookmark.png'),
};

export default function BottomBarButtons({onPress}: {onPress: (route: string) => void }){
  const router = useRouter();
  const handleLibrary = useCallback(()=>{
    router.navigate("/library");
    onPress("/library");
  },[]);
  const handleSearch = useCallback(()=>{
    router.navigate("/search");
    onPress("/search");
  },[]);
  const handleHome = useCallback(()=>{
    router.navigate("/home");
    onPress("/home");
  },[]);
  const handleSocial = useCallback(()=>{
    router.navigate("/social");
    onPress("/social");
  },[]);
  const handleProfile = useCallback(()=>{
    router.navigate({
      pathname: "/(app)/(tabs)/tab_profile",
      params: {
        isFromTab: "1",
      }
    });
    onPress("/tab_profile");
  },[]);
  return (
    <View style={styles_.view}>
      <PressableScale
        activeScale={0.9}
        onPress={handleLibrary} 
        style={styles.main}
      >
        <Library
          size={30}
          color="white"
          strokeWidth={1}
        />
      </PressableScale>
      <PressableScale
        activeScale={0.9}
        onPress={handleSearch} 
        style={styles.main}
      >
        <Search
          size={30}
          color="white"
          strokeWidth={1}
        />
      </PressableScale>
      <PressableScale
        activeScale={0.9}
        onPress={handleHome} 
        style={styles.main}
      >
        <Home
          size={30}
          color="white"
          strokeWidth={1}
        />
      </PressableScale>
      <PressableScale
        activeScale={0.9}
        onPress={handleSocial} 
        style={styles.main}
      >
        <Hash
          size={30}
          color="white"
          strokeWidth={1}
        />
      </PressableScale>
      <PressableScale
        activeScale={0.9}
        onPress={handleProfile} 
        style={styles.main}
      >
        <User
          size={30}
          color="white"
          strokeWidth={1}
        />
      </PressableScale>
    </View>
  );
};

const styles_ = StyleSheet.create({
  view: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    height: "100%",
    paddingHorizontal: 25,
    //borderColor: "rgba(180, 200, 210, 0.5)",
    //borderWidth: 0.5,
    //borderRadius: 999,
  },
});

function BottomBarButton({ source, onPress }: { source: string, onPress: ()=>void }) {
  /*const isSocial = source === "social" && false;
  let unSeenMessageCnt = 0;
  if(isSocial)
    unSeenMessageCnt = useUnseenMessagesCount();*/

  return (
    <PressableScale
      activeScale={0.9}
      onPress={onPress} 
      style={styles.main}
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
  },
  image: {
    width: 30,
    height: 30,
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