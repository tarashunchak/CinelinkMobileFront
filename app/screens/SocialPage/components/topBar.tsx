import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./style";
import { textStyle } from "@/styles/textStyles";

export default function SocialPageTopBar() {
  return (
    <View style={styles.topBar.view}>
      <TouchableOpacity>
        <Text style={textStyle.white18}>Friends</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={textStyle.white18}>Recommendations</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={textStyle.white18}>Activity</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={textStyle.white18}>Chats</Text>
      </TouchableOpacity>
    </View>
  )
}