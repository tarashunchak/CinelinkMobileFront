import { create } from "zustand";
import { EntityManager } from "./base_class";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { UserID } from "../models/models";
import { RTCLIENT_CONFIG } from "./../config";

type Recommendation_T = {
  id: number;
  name: string;
  fg_img_url?: string;
  bg_img_url?: string;
  creator_id?: number;
  creator_username?: string;
  recommendations_quanity?: number;
  is_public: boolean;
  description?: string;
} | any;

interface RecommendationState {
  recommendations: Record<number, Recommendation_T>;
  _add: (itemID: number, recommendation: Recommendation_T) => void;
  _addMany: (recommendations: Map<number, Recommendation_T>) => void;
  _remove: (itemID: number) => void;
  _update: (itemID: number, data: Partial<Recommendation_T>) => void;
};

const useRecommendationStore = create<RecommendationState>((set) => ({
  recommendations: {},
  _add: (itemID, recommendation) => set((s) => ({
    recommendations: { ...s.recommendations, [itemID]: recommendation }
  })),
  _addMany: (newRecommendations) => set((s) => ({
    recommendations: { ...s.recommendations, ...Object.fromEntries(newRecommendations) }
  })),
  _remove: (itemID) => set((s) => {
    const { [itemID]: _, ...remainingRecommendations } = s.recommendations;
    return { recommendations: remainingRecommendations }
  }),
  _update: (itemID, data) => set((s) => ({
  })),
}));

export class RecommendationsManager extends EntityManager<Recommendation_T> {
  public static instance: RecommendationsManager;
  private currUserID: number = 0;

  public static getInstance(): RecommendationsManager {
    if (!RecommendationsManager.instance)
      RecommendationsManager.instance = new RecommendationsManager();
    return RecommendationsManager.instance
  };

  public init(userID: number) {
    if (userID) {
      this.currUserID = userID;
      this.load(userID);
    }
  };

  public async load(userID: UserID) {
    try {
      if(!userID) return;
      const resp = await fetch(`${RTCLIENT_CONFIG.API_URL}/users/recommendations`, {
        headers: RTCLIENT_CONFIG.JWT_SELECTOR(undefined),
      });
      const data = await resp.json();
      if (!resp.ok || data?.status !== 200)
        return;

      const map = new Map<number, Recommendation_T>(data?.results?.map((item: Recommendation_T) => [item.movie_id, item]));
      useRecommendationStore.getState()._addMany(map);
    } catch (err) {
    }
  };

  public add(itemID: number, recommendation: any) {
    useRecommendationStore.getState()._add(itemID, recommendation);
  };

  public addMany(recommendations: Map<number, Recommendation_T>) {
    useRecommendationStore.getState()._addMany(recommendations);
  };

  public addArray(id: number, items: Recommendation_T[]): void {

  };

  public remove(itemID: number) {
    useRecommendationStore.getState()._remove(itemID);
  };

  public update(itemID: number, data: Partial<any>) {
    useRecommendationStore.getState()._update(itemID, data);
  };

  public get(id: number): void {

  };
};

async function load() {
  await RecommendationsManager.getInstance().load();
};

export function useUserRecommendations(): Recommendation_T[] {
  const recommendations = useRecommendationStore(useShallow(s => Object.values(s.recommendations)));
  useEffect(() => {
    if (recommendations.length === 0)
      load();
  }, [recommendations.length]);
  return recommendations;
};