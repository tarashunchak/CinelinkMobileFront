import { widthPercentageToDP as wp } from "react-native-responsive-screen"

export const searchScreen = {
  collectionView: {
    view: {
      flexDirection: "column",
      marginTop: "2%",
      borderRadius: 10
    },
    scrollView: {
      padding: 4,
      borderWidth: 1,
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderColor: "rgba(255, 255, 255, 0.2)",
      borderRadius: 8
    },
    title: {
      color: "white",
      fontSize: 20,
    },
    item: {
      marginRight: 5,
      width: wp("32%"),
      height: wp("32%"),
      backgroundColor: "rgba(255, 255, 255, 0.03)",
      borderRadius: 6,
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 0.05)",
      padding: 4,
    },

  },
  input: {
    view: {
      height: 54,
      width: "96%",
      margin: "2%",
      marginTop: "1%",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 0.2)",
      borderRadius: 8,
      flexDirection: "row"
    },
    icon: {
      backgroundColor: "transparent",
      height: 34,
      width: 34,
      alignSelf: "center",
      marginLeft: 10
    },
    textInput: {
      textSize: 20,
      color: "white",
      marginLeft: 5
    }
  }
}