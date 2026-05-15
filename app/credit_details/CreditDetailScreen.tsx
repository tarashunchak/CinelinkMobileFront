import { getFilmographyByPerson } from "@/api/tmdbApi";
import BottomBar from "@/app/bars/bottomBar";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import BiographyModal from "./components/BiographyModal";
import PhotosModal from "./components/PhotosModal";
import MainInfo from "./components/MainInfo";
import ActionButtonsBlock from "./components/ActionButtonsBlock";
import ScreenBackground from "@/components/ui/screen-background";
import { FlatList } from "react-native-gesture-handler";

export default function CreditDetailScreen({ route }: any) {
  const { creditID, profilePath, creditName } = route?.params;
  console.warn("Credit id at CreditDetailScreen after Credit Card: ", creditID)
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
    <ScreenBackground>
      <FlatList
        data={sections}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: "1%", }}
        ListHeaderComponent={
          <MainInfo 
            creditID={creditID}
            credit={credit} 
            creditName={creditName}
            backdrop={backdrop} 
            profilePath={profilePath}
          />
        }
      />
      <BottomBar />
    </ScreenBackground>
  );
}