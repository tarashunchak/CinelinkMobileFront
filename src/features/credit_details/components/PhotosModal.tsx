import { textStyle } from "@/styles/textStyles";
import React, { useState } from "react";
import { FlatList, Modal, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { PressableScale } from "react-native-pressable-scale";
import { BlurView } from "expo-blur";
import { useBlurTargetRef } from "@/src/hooks/useBackgroundBlur";
import { widthPercentageToDP } from "react-native-responsive-screen";
//import { FlashList } from "@shopify/flash-list";

interface Image_I {
  h: number;
  w: number | string;
  aspectRatio: number;
  filePath: string;
};

export default function PhotosModal({ images, backdrop }: { images: Image_I[], backdrop: string[] }) {
  const [open, setOpen] = useState(false);
  const [currImg, setCurrImg] = useState<Image_I>();
  const blurTargetRef = useBlurTargetRef();

  const imageHeight = 124;
  const [h, w] = [120, 220];

  return (
    <>
      <View style={styles.mainView}>
        <Text style={textStyle.yellow20}>
          {`Photos ${images?.length + backdrop?.length}`}
        </Text>
        <FlatList
          data={images}
          initialNumToRender={5}
          horizontal
          renderItem={({ item }: any) => (
            <PressableScale onPress={() => {
              setOpen(true);
              setCurrImg({ filePath: item?.file_path, w: "90%", h: 0, aspectRatio: item.aspect_ratio });
            }}
              style={{ height: imageHeight, width: imageHeight * item?.aspect_ratio, borderRadius: 4, marginRight: 5 }}  >
              <Image
                source={{ uri: "https://image.tmdb.org/t/p/w200" + item?.file_path }}
                style={{ width: "100%", height: "100%" }}
                cachePolicy="memory-disk"
              />
            </PressableScale>
          )}
        />
        <FlatList
          data={backdrop}
          horizontal
          initialNumToRender={5}
          renderItem={({ item }: any) => {
            return (
              <PressableScale onPress={() => { setOpen(true); setCurrImg({ filePath: item.file_path, h, w, aspectRatio: item.aspect_ratio }); }}
                style={{ height: h, width: w, borderRadius: 4, marginRight: 5 }}  >
                <Image
                  source={{ uri: "https://image.tmdb.org/t/p/w300" + item }}
                  style={{ width: "100%", height: "100%" }}
                  cachePolicy="memory-disk"
                />
              </PressableScale>
            );
          }}
        />
      </View>

      <Modal
        visible={open}
        transparent={true}
        animationType="fade"
        statusBarTranslucent
      >
        <BlurView
          style={[styles.modalView, StyleSheet.absoluteFill]}
          tint="systemChromeMaterialDark"
          intensity={40}
          blurMethod="dimezisBlurView"
          blurTarget={blurTargetRef}
        >
          <View style={{
            width: "90%",
            //backgroundColor: "#0F0E1A",
            padding: 15,
            borderRadius: 12,
            maxHeight: "80%"
          }}>
            <Image
              source={{ uri: "https://image.tmdb.org/t/p/w500" + currImg?.filePath }}
              style={{ width: "100%", height: 500 }}
              cachePolicy="memory-disk"
            />

            <PressableScale style={styles.cancelBtn}
              onPress={() => setOpen(false)}>
              <Text style={[textStyle.black22, { textAlign: "center", fontWeight: "bold" }]}>
                Close
              </Text>
            </PressableScale>
          </View>
        </BlurView >
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  mainView: {
    maxHeight: 500,
    maxWidth: "100%",
    marginTop: "5%",
    marginBottom: 80,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: 6,
    paddingTop: 0,
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12
  },
  modalView: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  cancelBtn: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    marginTop: 10,
    justifyContent: "center",
    width: "40%",
    alignSelf: "center",
    height: 42,
    borderRadius: 6,
    elevation: 5
  }
});