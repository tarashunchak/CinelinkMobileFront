import React, { memo } from "react";
import { heightPercentageToDP as hp, } from "react-native-responsive-screen";
import { StyleSheet } from "react-native";
import Spacer from "@/src/components/ui/spacer";
import { FlatList } from "react-native-gesture-handler";
import { PostCard } from "@/src/components/ui/post-card";



export default function PostsList({ userID }: { userID: number }) {
  //const [followings, setFollowings] = useState<UserCard_T[]>([]);
  const posts = [{ type: "image" }, { type: "image" }];

  /*useFocusEffect(
    useCallback(() => {
      let mounted = true;
      async function loadContent() {
        const data: UserCard_T[] = await GetUserFollowings(userID);
        if (mounted && data) setFollowings(data);
      }
      loadContent();
      return () => {mounted = false}
    }, [userID])
  );*/

  const renderItem = ({ item }: any) => {
    return <PostCard post={item} />;
  };

  return (
    <FlatList
      scrollEnabled={false}
      style={styles.view}
      data={posts}
      keyExtractor={(item: any, index: number) => String(item?.user_id ?? index)}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
      ListFooterComponent={<Spacer orientation="v" spacing={hp(9)} />}
      contentContainerStyle={styles.contentContainer}
    />
  )
};

const styles = StyleSheet.create({
  view: {
    paddingTop: 5,
  },
  contentContainer: {
    gap: 10,
  },
});