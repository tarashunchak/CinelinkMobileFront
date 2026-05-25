import { useNavigation } from "expo-router";
import React from "react";
import { View, Text, Image, TouchableOpacity, Platform, StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { EllipsisVertical } from "lucide-react-native";

export default function EditHeader() {
  const navigator = useNavigation();
  return (
    <View style={styles.mainView}>
      <View style={{ flexDirection: "row", gap: wp(5) }}>
        <View style={{}}>
          <TouchableOpacity
            style={{}}
            onPress={() => {
              navigator.push("UserProfileScreen", {
                userID: 0,
              });
            }}
          >
            <Image
              style={{}}
              source={{ uri: "" }}
            />

          </TouchableOpacity>

          <View style={{}}>
            <Text style={{}}>
              { }
            </Text>
          </View>
        </View>

      </View>

      <TouchableOpacity style={{}}>
        <EllipsisVertical size={48} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    height: Platform.OS === "ios" ? hp(10) : hp(12),
    backgroundColor: "rgba(20, 20, 20, 1)",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingLeft: "2%",
    paddingRight: "3%",
    paddingBottom: "3%",
    zIndex: 2,
  },
});