import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface IslamicEvent {
    name: string;
    description: string;
    hijriDate: string;
    gregorianDate: string;
}
export interface Hadith {
    topic: string;
    collection: string;
    arabicText: string;
    narrator: string;
    englishTranslation: string;
}
export interface PrayerTime {
    name: string;
    time: string;
}
export interface KnowledgeArticle {
    title: string;
    content: string;
    summary: string;
    category: string;
}
export interface QuranVerse {
    surahNumber: bigint;
    verseNumber: bigint;
    surahName: string;
    transliteration: string;
    arabicText: string;
    englishTranslation: string;
}
export interface backendInterface {
    addHadith(hadith: Hadith): Promise<bigint>;
    addKnowledgeArticle(article: KnowledgeArticle): Promise<bigint>;
    addQuranVerse(verse: QuranVerse): Promise<bigint>;
    getAllHadiths(): Promise<Array<Hadith>>;
    getAllIslamicEvents(): Promise<Array<IslamicEvent>>;
    getAllKnowledgeArticles(): Promise<Array<KnowledgeArticle>>;
    getAllPrayerTimes(): Promise<Array<PrayerTime>>;
    getAllQuranVerses(): Promise<Array<QuranVerse>>;
    getDailyVerse(): Promise<QuranVerse>;
    getHadith(id: bigint): Promise<Hadith | null>;
    getIslamicEvent(id: bigint): Promise<IslamicEvent | null>;
    getKnowledgeArticle(id: bigint): Promise<KnowledgeArticle | null>;
    getPrayerTime(id: bigint): Promise<PrayerTime | null>;
    getQuranVerse(id: bigint): Promise<QuranVerse | null>;
}
