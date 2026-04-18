import { Platform } from "react-native";

export const bottomBar = {
  view: [
    {
      zIndex: 5,
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      backgroundColor: "rgba(23, 23, 23, 1)",
      //backgroundColor: "rgba(13, 12, 28, 0.90)",
      height: Platform.OS === "ios" ? "7.5%" : "7%",
      margin: "2%",
      width: "94%",
      position: "absolute",
      bottom: 0,
      alignSelf: "center",
      borderWidth: 1,
      borderColor: "rgba(180, 190, 210, 0.5)",
      borderRadius: 999,
    }
  ]
}