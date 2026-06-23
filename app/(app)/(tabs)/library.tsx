import React, { memo, useCallback } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen"
import WatchlistCard from "@/src/features/library/components/WatchlistCard";
import LibraryHeader from "@/src/features/library/components/LibraryHeader";
import { useUserWatchlists } from "@/src/rt_client/src/managers/watchlists_manager";
import Spacer from "@/src/components/ui/spacer";
import { FlashList } from "@shopify/flash-list";

function LibraryScreen() {
  const watchlists = useUserWatchlists();
  const renderItem = useCallback(({ item }:any) =>
    <WatchlistCard watchlist={item} />
, []);
  return (
    <View style={StyleSheet.absoluteFill}>
      <LibraryHeader />
      <FlashList
        data={watchlists}
        contentContainerStyle={{paddingTop: "1%"}}
        keyExtractor={(item: any, index: number) => item?.id ? `watchlist-${item.id}` : String(index)}
        renderItem={renderItem}
        ListFooterComponent={<Spacer orientation="v" spacing={hp(9)} />}
      />
    </View>
  );
};

export default memo(LibraryScreen);