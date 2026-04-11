import { Platform } from "react-native";

export const bottomBar = {
  view: [
    {
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      backgroundColor: "rgba(13, 12, 28, 0.90)",
      height: Platform.OS === "ios" ? "7.5%" : "7%",
      width: "100%",
      position: "absolute",
      bottom: 0,
      borderWidth: 0.4,
      borderColor: "rgba(180, 190, 210, 0.1)"
    }
  ]
}