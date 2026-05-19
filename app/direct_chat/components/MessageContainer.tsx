import React, { useEffect } from "react";
import * as Haptics from "expo-haptics";
import { View, Pressable, StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { PressableScale } from "react-native-pressable-scale";
import { useEditMode } from "../hooks";
import AnimatedFastImage from "@/components/ui/animated-fast-image";

export default function MessageContainer({
  style,
  children,
  isEditMode,
  enableEditMode,
  isSelected,
  toggleSelect,
}: any) {

  const { enable, disable, toggle } = useEditMode(3);

  useEffect(() => {
    //console.warn("isEditMode: ", isEditMode)
  }, []);

  return (
    <Pressable
      style={isSelected ? picked.mainView : notPicked.mainView}
      onPress={() => {
        if (isEditMode) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          enable();
        }
      }}
      onLongPress={() => {
        if (!isEditMode) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          enable();
        }
      }
      }
    >
      <PressableScale
        style={style}

        delayLongPress={350}
      >
        {children}
      </PressableScale>
      {
        <View 
          style={isSelected ? 
            picked.pickedToggle : 
            notPicked.pickedToggle
          }
        >
          {
            isSelected && 
            <AnimatedFastImage 
              sharedTransitionTag="message-picked"
              source={require("")}
              style={picked.pickedImage}
            />
          }
        </View>
      }
    </Pressable >
  );
};

const picked = StyleSheet.create({
  mainView: {
    width: wp(100),
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    flexDirection: "column",
    justifyContent:"space-between",
    paddingVertical: "1%",
    marginVertical: "1%",
  },
  pickedToggle: {
    width: 20,
    height: 20,
    borderRadius: 999,
    borderWidth: 0.5,
    borderColor: "white",
    marginLeft: 20,
    marginBottom :"2%",
    backgroundColor: "green"
  },
  pickedImage: {

  },
});

const notPicked = StyleSheet.create({
  mainView: {
    width: wp(100),
    backgroundColor: "transparent",
    flexDirection: "column",
    paddingVertical: "1%",
    marginVertical: "1%",
  },
pickedToggle: {
    width: 20,
    height: 20,
    borderRadius: 999,
    borderWidth: 0.5,
    borderColor: "white",
    marginLeft: 20,
    marginBottom :"2%",
  },
});