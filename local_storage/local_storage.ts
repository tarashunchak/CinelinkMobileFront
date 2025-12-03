import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getHistory() {
  const json = await AsyncStorage.getItem("search_history")
  return json ? JSON.parse(json) : []
};

export async function addToHistory(query: string) {
  let arr = await getHistory();
  arr = arr.filter((item: string) => item !== query);
  arr.unshift(query);
  arr = arr.slice(0, 20);
  await AsyncStorage.setItem("search_history", JSON.stringify(arr));
}

export function removeFromHistory(query: string) {

}