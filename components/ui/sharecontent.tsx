import { CURRENT_USER } from "@/api/currentUser";
import { GetUserFollowers } from "@/api/followers/followers";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";

export default function ShareContent() {
  const [chats, setChats] = useState();

  useFocusEffect(
    useCallback(() => {
      async function loadContent() {
        const data = GetUserFollowers(CURRENT_USER?.UID);
        if (!data) return;

        setChats(data);
      }

      loadContent();
    }, [])
  )

  return (
    <>
    </>
  );
}