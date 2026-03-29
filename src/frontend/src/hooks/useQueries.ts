import { useQuery } from "@tanstack/react-query";
import type {
  Hadith,
  IslamicEvent,
  KnowledgeArticle,
  PrayerTime,
  QuranVerse,
} from "../backend.d";
import { useActor } from "./useActor";

export function useDailyVerse() {
  const { actor, isFetching } = useActor();
  return useQuery<QuranVerse>({
    queryKey: ["dailyVerse"],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.getDailyVerse();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllVerses() {
  const { actor, isFetching } = useActor();
  return useQuery<QuranVerse[]>({
    queryKey: ["allVerses"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllQuranVerses();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllHadiths() {
  const { actor, isFetching } = useActor();
  return useQuery<Hadith[]>({
    queryKey: ["allHadiths"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllHadiths();
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePrayerTimes() {
  const { actor, isFetching } = useActor();
  return useQuery<PrayerTime[]>({
    queryKey: ["prayerTimes"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPrayerTimes();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCalendarEvents() {
  const { actor, isFetching } = useActor();
  return useQuery<IslamicEvent[]>({
    queryKey: ["calendarEvents"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllIslamicEvents();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useKnowledgeArticles() {
  const { actor, isFetching } = useActor();
  return useQuery<KnowledgeArticle[]>({
    queryKey: ["knowledgeArticles"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllKnowledgeArticles();
    },
    enabled: !!actor && !isFetching,
  });
}
