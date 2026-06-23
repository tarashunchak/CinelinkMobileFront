import { API_URL } from "@/api/API_CONFIG";
import { useAuthStore } from "@/local_storage/user/asyncStorage/store";
import { UsersManager } from "@/src/rt_client/src/managers/users_manager";
import { getCurrentUserID, jwtHeaders } from "@/utils/utils";

export async function GetUserFollowers(userID: number): Promise<any> {
  try {
    //console.log("USER ID followers: ", userID)
    const response = await fetch(`${API_URL}/users/${userID}/followers`, {
      headers: jwtHeaders(undefined)
    })
    const text = await response.text();
    const data = await JSON.parse(text);
    return data?.results;
  } catch (err) {
  }
};

export async function GetUserFollowings(userID: number): Promise<any> {
  //console.log("USER ID followings: ", userID)
  try {
    const response = await fetch(`${API_URL}/users/${userID}/followings`, {
      headers: jwtHeaders(undefined)
    })
    const text = await response.text();
    const data = await JSON.parse(text);
    return data?.results;
  } catch (err) {
  }
};

export async function FollowUser(userID: number): Promise<boolean> {
  //console.log("USER ID following: ", userID)
  try{
    const response = await fetch(`${API_URL}/users/${userID}/followers`, {
      method: "POST",
      headers: jwtHeaders(undefined),
    })
    const data = await response.json();
    const success = data?.status === 200;

    if (success){
      void UsersManager.getInstance().load(userID);
      void UsersManager.getInstance().load(getCurrentUserID());
    }

    return success;
  }catch(err) {
    return false;
  }
};

export async function UnfollowUser(userID: number): Promise<any> {
    //console.log("USER ID following: ", userID)
  try{
    const response = await fetch(`${API_URL}/users/${userID}/followers`, {
      method: "DELETE",
      headers: jwtHeaders(undefined),
    })
    const data = await response.json();
    const success = data?.status === 200;

    if (success){
      void UsersManager.getInstance().load(userID);
      void UsersManager.getInstance().load(getCurrentUserID());
    }

    return success;
  }catch(err) {
    return false;
  }
};