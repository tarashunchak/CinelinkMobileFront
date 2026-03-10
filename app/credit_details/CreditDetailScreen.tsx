import { getFilmographyByPerson } from "@/api/tmdbApi";
import BottomBar from "@/app/bars/bottomBar";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, ImageBackground, ScrollView, View } from "react-native";
import BiographyModal from "./components/BiographyModal";
import PhotosModal from "./components/PhotosModal";
import MainInfo from "./components/MainInfo";
import ActionButtonsBlock from "./components/ActionButtonsBlock";

export default function CreditDetailScreen({ creditID }: { creditID: number }) {
  const navigation = useNavigation();
  const [actor, setActor] = useState<any>(null);
  const [movies, setMovies] = useState<any>(null);
  const [images, setImages] = useState<any>(null);
  const [backdrop, setBackdrop] = useState<any>(null);


  useEffect(() => {
    async function loadActorDetails() {
      const data = await getFilmographyByPerson(creditID);
      if (data) {

        data?.filmography?.sort((a: object, b: object) => (b?.year - a?.year));

        setActor(data?.details);
        setMovies(data?.filmography);
        setImages(data?.images?.profiles);
        setBackdrop(data?.backdrop);
      }
    }
    loadActorDetails();

  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={require("@/assets/images/background.png")} style={{ flex: 1 }}>

        <ScrollView
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          style={{ padding: "1%", flex: 1 }}
        >
          <MainInfo credit={actor} />

          <ActionButtonsBlock />

          <BiographyModal bio={actor?.biography || "It`s empty here for now..."} />
          <PhotosModal images={images} backdrop={backdrop} />
        </ScrollView >
      </ImageBackground >
      <BottomBar />
    </View >
  );
}