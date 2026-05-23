import { textStyle } from "@/styles/textStyles";
import React, { useState } from "react";
import { View, Image, TouchableOpacity, TextInput, TextInputContentSizeChangeEvent, Platform } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RTClient } from "../../rt_client/rt_client";
import { getCurrentUserID } from "@/utils/utils";
import Animated from "react-native-reanimated";
import { StyleSheet } from "react-native";
import { PressableScale } from "react-native-pressable-scale";
import { useSafeAreaFrame, useSafeAreaInsets } from "react-native-safe-area-context";

export default function Input({ chatID }: { chatID: number }) {
    const [isFocused, setIsFocused] = useState(false);
    const [text, setText] = useState<string>("");
    const [height, setHeight] = useState<number>(40);

    async function handleFocus() {
        await RTClient.setTypingStatus(chatID, getCurrentUserID(), true);
        setIsFocused(true);
    };

    async function handleBlur() {
        await RTClient.setTypingStatus(chatID, getCurrentUserID(), false);
        setIsFocused(false);
    };

    function onContextSizeChange(e: TextInputContentSizeChangeEvent){
        setHeight(e.nativeEvent.contentSize.height)
    };

    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.view, {marginBottom: insets.bottom}]}>
            <TextInput
                value={text}
                onChangeText={setText}
                style={[styles.input]}
                placeholder="Message..."
                placeholderTextColor={"rgba(255, 255, 255, 0.3)"}
                onFocus={handleFocus}
                onBlur={handleBlur}
                multiline={true}
                numberOfLines={10}
                editable={true}
                scrollEnabled={true}
            />
            {isFocused && (
                <PressableScale
                    style={[styles.sendBtn.view, height < 50  ? openedStyles.closed : openedStyles.opened]}
                    onPress={() => {
                        RTClient.sendMessage(chatID, {
                            chat_id: chatID,
                            user_id: getCurrentUserID() ?? 0,
                            message_type: "text",
                            message: text,
                        });
                        setText("");
                    }}
                >
                    <Image 
                        style={styles.sendBtn.img}
                        source={require("@/app/(app)/direct_chat/assets/send-03.png")} 
                    />
                </PressableScale>
            )}
        </View>
    );
};

const openedStyles = StyleSheet.create({
    opened: {
        borderRadius: 21,
    },
    closed: {
        borderRadius: 21,
    },
});

const styles = {
    view: {
        width: "94%",
        position: "absolute",
        bottom: hp("1%"),
        zIndex: 2,
        minHeight: 42,
        backgroundColor: "rgba(20, 20, 20, 1)",
        borderColor: "rgba(255, 255, 255, 0.5)",
        borderWidth: 0.4,
        borderRadius: 21,
        padding:1,
        paddingLeft: "5%",
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent:"center",
        alignItems:"flex-end",
    },
    input: [textStyle.white18, {
        width: "88%",
        alignSelf: "center",
        alignContent:"center",
    }],
    sendBtn: {
        view: {
            backgroundColor: "#DEB522",
            width: 42,
            aspectRatio: 1,
            borderRadius: 999,
            justifyContent: "center",
            alignContent: "center",
            alignSelf: "flex-end"
        },
        img: {
            height: "65%",
            width: "65%",
            alignSelf: "center"
        },
    }
};