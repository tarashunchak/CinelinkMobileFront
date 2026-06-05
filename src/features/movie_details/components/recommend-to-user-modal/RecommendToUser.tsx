import React, { useState, forwardRef, useImperativeHandle, useMemo, useRef, useEffect } from "react";
import BottomSheet, { BottomSheetView, TouchableWithoutFeedback } from "@gorhom/bottom-sheet";
import { View, StyleSheet, TextInput, Keyboard } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import UserCard from "./components/UserCard";
import { getCurrentUserID } from "@/utils/utils";
import Button from "./components/Button";
import { GetUserFollowers } from "@/api/followers";
import { useBlurStore } from "@/src/components/ui/screen-background";

export type UserSheetRef = {
  open: () => void;
  close: () => void;
};

type UserSheetProps = {
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const snapPoints = ["50%", "90%"];

const UserSheet = forwardRef<UserSheetRef, UserSheetProps>(({ setIsActive }, ref: any) => {
  const sheetRef = useRef<BottomSheet>(null);
  const [state, setState] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [users, setUsers] = useState<any[]>([]);
  const [picked, setPicked] = useState<Map<number, boolean>>(new Map());
  const setBottomBarVisible = useBlurStore(state => state.setBottomBarVisible);

  useEffect(() => {
    async function loadContent() {
      const data = await GetUserFollowers(getCurrentUserID());
      if (data) setUsers(data);
      console.warn("users: ", data);
    };
    if(state)
      loadContent();
  }, [state]);

  useImperativeHandle(ref, () => ({
    open: () => {
      sheetRef.current?.snapToIndex(0);
      setState(true);
      setIsActive(false);
    },
    close: () => {
      sheetRef.current?.close();
      setState(false);
    },
  }));

  const backgroundColor = useMemo(() => {
    return state ? { backgroundColor: "rgba(0, 0, 0, 0.6)" } : { backgroundColor: "transparent" };
  }, [state]);

  return (
    <BottomSheet
      ref={sheetRef}
      index={0}
      enableBlurKeyboardOnGesture
      animateOnMount={true}
      animationConfigs={{
        stiffness: 100,
        damping: 15,
        mass: 1,
      }}
      onClose={() => {
        setIsActive(true);
        setBottomBarVisible(true);
        setState(false);
        Keyboard.dismiss();
      }}
      snapPoints={snapPoints}
      enablePanDownToClose
      handleIndicatorStyle={{
        backgroundColor: "#fff",
        width: 40,
        height: 6,
        elevation: 8,
      }}
      handleStyle={{
        backgroundColor: "#A27B5C",
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
      }}
      containerStyle={[styles.container]}
    >
      <BottomSheetView style={{
        height: "100%",
        backgroundColor: "#090405",
      }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ justifyContent: "space-between" }}>
          <View style={styles.mainView}>
            <TextInput
              placeholder="Search"
              placeholderTextColor={"grey"}
              style={styles.textInput}
            />
            <FlatList
              style={{ height: "100%" }}
              data={users}
              numColumns={3}
              keyExtractor={(item, index) => String(index)}
              renderItem={({ item }) => (
                <UserCard user={item} onPick={(id, state) => {
                }} />
              )}
            />
          </View>
          {<View style={{ zIndex: 10, backgroundColor: "white", height: hp(20), width: wp(100), position: "absolute", bottom: 0, left: 0 }}>
            <Button />
          </View>}
        </TouchableWithoutFeedback>
      </BottomSheetView>
    </BottomSheet >
  )
});

export default UserSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    flexDirection: "column",
  },
  textInput: {
    width: "80%",
    height: 46,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderColor: "rgba(255,255, 255, 0.3)",
    borderWidth: 1,
    borderRadius: 8,
    margin: "2%",
    paddingLeft: "2%",
  },
});