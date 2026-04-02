import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

export default function RootLayout(){
    return(
        <View style={{
            flex:1,
            backgroundColor:"#000000"
        }}>
            <StatusBar translucent backgroundColor="transparent" style="light"/>
            <Slot/>
        </View>
    );
};