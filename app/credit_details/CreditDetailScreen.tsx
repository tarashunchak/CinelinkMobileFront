import { getFilmographyByPerson } from "@/api/tmdbApi";
import BottomBar from "@/app/bars/bottomBar";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { ImageBackground, ScrollView, View } from "react-native";
import BiographyModal from "./components/BiographyModal";
import PhotosModal from "./components/PhotosModal";
import MainInfo from "./components/MainInfo";
import ActionButtonsBlock from "./components/ActionButtonsBlock";

export default function CreditDetailScreen({ route }: any) {
  const { creditID } = route?.params;
  const navigation = useNavigation();
  const [credit, setCredit] = useState<any>(null);
  const [movies, setMovies] = useState<any>(null);
  const [images, setImages] = useState<any>(null);
  const [backdrop, setBackdrop] = useState<any>(null);

  useEffect(() => {
    async function loadCreditDetails() {
      const data = await getFilmographyByPerson(creditID);
      if (data) {

        data?.filmography?.sort((a: object, b: object) => (b?.year - a?.year));

        setCredit(data?.details);
        setMovies(data?.filmography);
        setImages(data?.images?.profiles);
        setBackdrop(data?.backdrop);
      }
    }
    loadCreditDetails();

  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={require("@/assets/images/background.png")} style={{ flex: 1 }}>

        <ScrollView
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          style={{ padding: "1%", flex: 1 }}
        >
          <MainInfo credit={credit} />

          <ActionButtonsBlock />

          <BiographyModal bio={credit?.biography || "It`s empty here for now..."} />
          <PhotosModal images={images} backdrop={backdrop} />
        </ScrollView >
      </ImageBackground >
      <BottomBar />
    </View >
  );
}