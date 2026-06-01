import { useBlurTargetRef } from "@/src/hooks/useBackgroundBlur";
import { textStyle } from "@/styles/textStyles";
import { BlurView } from "expo-blur";
import React, { useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { PressableScale } from "react-native-pressable-scale";
import { heightPercentageToDP } from "react-native-responsive-screen";

export default function BiographyModal({ bio }: { bio: string }) {
  const [open, setOpen] = useState(false);

  const blurTargetRef = useBlurTargetRef();

  return (
    <>
      <View style={styles.nonModalView}>
        <Text style={textStyle.yellow18}>Biography</Text>
        <Text
          onPress={() => setOpen(true)}
          style={[textStyle.white16, styles.text]}
        >
          {bio}
        </Text>
      </View>

      <Modal
        statusBarTranslucent={true}
        visible={open}
        transparent={true}
        animationType="slide"
      >
        <BlurView 
          tint="systemChromeMaterialDark"
          intensity={90}
          blurReductionFactor={20}
          blurMethod="dimezisBlurView"
          blurTarget={blurTargetRef}
          style={styles.imageBackground}
        >
          <View style={styles.view}>
            <Text style={[textStyle.yellow22, { marginBottom: "2%" }]}>Biography</Text>
            <FlatList
              data={null}
              renderItem={() => ""}
              style={styles.flatList}
              ListHeaderComponent={
                <View style={styles.modalTextView}>
                  <Text style={textStyle.white16}>
                    {bio}
                  </Text>
                </View>
              }
            />
            <PressableScale 
            activeScale={0.98}
            style={styles.closeButton}
              onPress={() => setOpen(false)}>
              <Text style={[textStyle.yellow22, { textAlign: "center" }]}>
                Close
              </Text>
            </PressableScale>
          </View>
        </BlurView>
      </Modal >
    </>
  );
};

const styles = StyleSheet.create({
  nonModalView: {
    maxHeight: heightPercentageToDP("30%"),
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: 6,
    paddingTop: 0,
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12
  },
  text: {
    maxHeight: "90%"
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  view: {
    width: "96%",
    backgroundColor: "#2C394B",
    padding: "2%",
    borderRadius: 10,
    maxHeight: "80%",
    borderWidth: 0.5, borderColor: "rgba(255, 255, 255, 0.2)",
  },
  flatList: {
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: "rgba(0, 0, 0, 0.2)",
  },
  modalTextView: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    padding: 8,
  },
  closeButton: {
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.2)",
    elevation: 5,
    backgroundColor: "#595B83",
    marginTop: 10,
    justifyContent: "center",
    width: "40%",
    alignSelf: "center",
    height: 42,
    borderRadius: 6,
  },
});