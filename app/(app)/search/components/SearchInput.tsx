import React from "react";
import { View, TextInput, Image, StyleSheet } from "react-native";
import ReturnArrowButton from "@/components/ui/returnArrowButton";
import { textStyle } from "@/styles/textStyles";
import { useNavigation } from "expo-router";
import { PressableScale } from "react-native-pressable-scale";

interface Props {
  placeholder: string;
  value: string;
  setValue: (_: string) => void;
  onChangeText: () => void;
}

export default function SearchInput(
  { value, setValue, placeholder, onChangeText }: Props
) {

  const navigator = useNavigation();

  return (
    <View style={styles.inputView}>
      <ReturnArrowButton onPress={navigator.goBack} />
      <TextInput
        placeholderTextColor={"#A0A0A0"}
        placeholder={placeholder}
        style={[textStyle.white20,
        {
          marginLeft: 5,
          height: "100%",
          width: "73%"
        }
        ]}
        value={value}
        onChangeText={text => {
          setValue(text);
          onChangeText();
        }}
      />
      <PressableScale style={
        {
          height: "90%",
          width: "90%",
          justifyContent: "center"
        }
      }>
        <Image
          source={require("@/app/(app)/search/assets/filter.png")}
          style={{ height: 34, width: 34 }}
        />
      </PressableScale >
    </View>
  );
};

const styles = StyleSheet.create({
  inputView: {
    height: 50,
    width: "96%",
    margin: "2%",
    marginTop: "1%",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: 999,
    borderWidth: 0.1,
    borderColor: 'white',
    flexDirection: "row",
    alignItems: "center",
  },
  inputIcon: {
    backgroundColor: "transparent",
    height: 34,
    width: 34,
    alignSelf: "center",
    marginLeft: 10
  },
});