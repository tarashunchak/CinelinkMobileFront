import { getFilmographyByPerson } from "@/api/tmdbApi";
import BottomBar from "@/app/(app)/bars/bottomBar";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import BiographyModal from "@/src/features/credit_details/components/BiographyModal";
import PhotosModal from "@/src/features/credit_details/components/PhotosModal";
import MainInfo from "@/src/features/credit_details/components/MainInfo";
import ActionButtonsBlock from "@/src/features/credit_details/components/ActionButtonsBlock";
import ScreenBackground from "@/src/components/ui/screen-background";
import { FlatList } from "react-native-gesture-handler";
import { BlurTargetView } from "expo-blur";
import { View } from "react-native";

export default function CreditDetailScreen() {
  const { creditID, profilePath, creditName } = useLocalSearchParams();
  const [credit, setCredit] = useState<any>(null);
  //const [movies, setMovies] = useState<any>(null);
  const [images, setImages] = useState<any>(null);
  const [backdrop, setBackdrop] = useState<any>(null);

  const ref = useRef<View | null>(null);

  useEffect(() => {
    async function loadCreditDetails() {
      const data = await getFilmographyByPerson(creditID);
      if (data) {

        //data?.filmography?.sort((a: object, b: object) => (b?.year - a?.year));

        setCredit(data?.details);
        //setMovies(data?.filmography);
        setImages(data?.images?.profiles);
        setBackdrop(data?.backdrop);
      }
    }
    loadCreditDetails();

  }, []);

  const sections = [
    { type: "actions" },
    { type: "bio" },
    { type: "photos" },
  ];

  const renderItem = ({ item }: any) => {
    switch (item.type) {
      case "actions":
        return <ActionButtonsBlock />;
      case "bio":
        return <BiographyModal bio={credit?.biography || "It`s empty here for now..."} />;
      case "photos":
        return <PhotosModal images={images} backdrop={backdrop} />;
    }
  };

  return (
    <FlatList
      data={sections}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: "1%", }}
      ListHeaderComponent={
        <MainInfo
          creditID={creditID}
          credit={credit}
          creditName={creditName}
          backdrop={backdrop}
          profilePath={profilePath}
          ref={ref}
        />
      }
    />
  );
}