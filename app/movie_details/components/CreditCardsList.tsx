import React from "react";
import { ScrollView } from "react-native";
import CreditCard from "./CreditCard";

export default function CreditCardsList({ credits }: { credits: any[] }) {
  return (
    <ScrollView horizontal={true} style={styles.view}>
      {[
        credits?.slice(0, Math.min(6, credits?.length - 1)).map((person, index) =>
          <CreditCard key={index} credit={person} />
        ),
      ]}
    </ScrollView>
  )
}

const styles = {
  view: {
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    borderWidth: 1,
  },
}