import { textStyle } from "@/styles/textStyles";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { ImageBackground, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { PressableScale } from "react-native-pressable-scale";
import { heightPercentageToDP } from "react-native-responsive-screen";

export default function BiographyModal({ bio }: { bio: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <View style={styles.nonModalView}>
        <Text style={textStyle.yellow18}>Biography</Text>
        <Text
          onPress={() => setOpen(true)}
          style={[textStyle.white16]}
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
        <ImageBackground style={styles.imageBackground}>
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

            <PressableScale style={styles.closeButton}
              onPress={() => setOpen(false)}>
              <Text style={[textStyle.yellow22, { textAlign: "center" }]}>
                Close
              </Text>
            </PressableScale>
          </View>
        </ImageBackground>
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
  imageBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  view: {
    width: "90%",
    backgroundColor: "rgba(38, 37, 44, 0.95)",
    padding: "2%",
    borderRadius: 12,
    maxHeight: "80%",
    borderWidth: 0.5, borderColor: "rgba(255, 255, 255, 0.2)"
  },
  flatList: {
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  modalTextView: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: 8,
  },
  closeButton: {
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.5)",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    marginTop: 10,
    justifyContent: "center",
    width: "40%",
    alignSelf: "center",
    height: 42,
    borderRadius: 6,
  },
});