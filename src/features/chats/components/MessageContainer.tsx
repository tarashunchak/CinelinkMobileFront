import React, { useEffect } from "react";
import * as Haptics from "expo-haptics";
import { View, Pressable, StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { PressableScale } from "react-native-pressable-scale";
import { useEditMode } from "../hooks";
import AnimatedFastImage from "@/src/components/ui/animated-fast-image";

interface Props {
  style: {};
  children: any;
  isEditMode: boolean;
  enableEditMode: any;
  isSelected: boolean;
  toggleSelect: any;
};

export default function MessageContainer({
  style,
  children,
  isEditMode,
  enableEditMode,
  isSelected,
  toggleSelect,
}: Props) {

  const { enable, disable, toggle } = useEditMode(3);

  useEffect(() => {
    //console.warn("isEditMode: ", isEditMode)
  }, []);

  return (
    <Pressable
      style={isSelected ? picked.view : notPicked.view}
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
{
        isSelected && <View
          style={isSelected ?
            picked.pickedToggle :
            notPicked.pickedToggle
          }
        >
          {
            isSelected &&
            <AnimatedFastImage
              sharedTransitionTag="message-picked"
              source={{}}
              style={picked.pickedImage}
            />
          }
        </View>
      }
      <PressableScale
        style={style}
        delayLongPress={350}
        activeScale={0.99}
      >
        {children}
      </PressableScale>
      
    </Pressable >
  );
};

const picked = StyleSheet.create({
  view: {
    width: wp(100),
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    flexDirection: "row",
    alignItems: "flex-end",
    paddingVertical: 3,
    marginVertical: 2,
  },
  pickedToggle: {
    width: 20,
    height: 20,
    borderRadius: 999,
    borderWidth: 0.5,
    borderColor: "white",
    marginLeft: 20,
    marginBottom: "1%",
    backgroundColor: "green"
  },
  pickedImage: {

  },
});

const notPicked = StyleSheet.create({
  view: {
    width: wp(100),
    backgroundColor: "transparent",
    paddingVertical: "1%",
    marginVertical: "1%",
    //justifyContent: "space-between",
    //alignItems: "flex-end",
    paddingHorizontal: 5
  },
  pickedToggle: {
    width: 20,
    height: 20,
    borderRadius: 999,
    borderWidth: 0.5,
    borderColor: "white",
    marginLeft: 20,
    marginBottom: "1%",
  },
});