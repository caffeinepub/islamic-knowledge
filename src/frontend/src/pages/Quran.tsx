import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, Search } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { QuranVerse } from "../backend.d";
import {
  GeometricPatternCorner,
  StarSeparator,
} from "../components/GeometricPattern";
import { useAllVerses } from "../hooks/useQueries";

const SAMPLE_VERSES: QuranVerse[] = [
  {
    surahNumber: 1n,
    verseNumber: 1n,
    surahName: "Al-Fatihah",
    transliteration: "Bismillahir-Rahmanir-Raheem",
    arabicText: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    englishTranslation:
      "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
  },
  {
    surahNumber: 1n,
    verseNumber: 2n,
    surahName: "Al-Fatihah",
    transliteration: "Alhamdu lillahi rabbil-'aalameen",
    arabicText: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    englishTranslation: "All praise is due to Allah, Lord of the worlds.",
  },
  {
    surahNumber: 1n,
    verseNumber: 3n,
    surahName: "Al-Fatihah",
    transliteration: "Ar-Rahmanir-Raheem",
    arabicText: "الرَّحْمَٰنِ الرَّحِيمِ",
    englishTranslation: "The Entirely Merciful, the Especially Merciful.",
  },
  {
    surahNumber: 2n,
    verseNumber: 1n,
    surahName: "Al-Baqarah",
    transliteration: "Alif-Lam-Meem",
    arabicText: "الٓمٓ",
    englishTranslation: "Alif, Lam, Meem.",
  },
  {
    surahNumber: 2n,
    verseNumber: 255n,
    surahName: "Al-Baqarah",
    transliteration: "Allahu la ilaha illa huwal-hayyul-qayyum",
    arabicText: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ",
    englishTranslation:
      "Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence.",
  },
  {
    surahNumber: 3n,
    verseNumber: 185n,
    surahName: "Ali 'Imran",
    transliteration: "Kullu nafsin dha'iqatul-mawt",
    arabicText: "كُلُّ نَفْسٍ ذَائِقَةُ الْمَوْتِ",
    englishTranslation: "Every soul will taste death.",
  },
  {
    surahNumber: 94n,
    verseNumber: 5n,
    surahName: "Ash-Sharh",
    transliteration: "Fa-inna ma'al-'usri yusra",
    arabicText: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
    englishTranslation: "For indeed, with hardship will be ease.",
  },
  {
    surahNumber: 94n,
    verseNumber: 6n,
    surahName: "Ash-Sharh",
    transliteration: "Inna ma'al-'usri yusra",
    arabicText: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    englishTranslation: "Indeed, with hardship will be ease.",
  },
];

export default function QuranPage() {
  const { data: verses, isLoading } = useAllVerses();
  const [search, setSearch] = useState("");
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);

  const allVerses = verses && verses.length > 0 ? verses : SAMPLE_VERSES;

  const surahs = [
    ...new Map(
      allVerses.map((v) => [Number(v.surahNumber), v.surahName]),
    ).entries(),
  ]
    .map(([num, name]) => ({ num, name }))
    .sort((a, b) => a.num - b.num);

  const filtered = allVerses.filter((v) => {
    const matchesSurah =
      selectedSurah === null || Number(v.surahNumber) === selectedSurah;
    const matchesSearch =
      !search ||
      v.englishTranslation.toLowerCase().includes(search.toLowerCase()) ||
      v.surahName.toLowerCase().includes(search.toLowerCase()) ||
      v.transliteration.toLowerCase().includes(search.toLowerCase());
    return matchesSurah && matchesSearch;
  });

  return (
    <div>
      {/* Page Header */}
      <div className="bg-forest-dark text-white py-12 relative overflow-hidden">
        <GeometricPatternCorner className="absolute top-0 right-0 w-48 h-48 text-gold opacity-20" />
        <div className="container mx-auto px-4 text-center">
          <BookOpen className="h-10 w-10 text-gold mx-auto mb-3" />
          <h1 className="font-serif text-4xl font-bold uppercase tracking-wide">
            The Holy Quran
          </h1>
          <p className="text-white/60 mt-2">
            Browse verses by surah or search for specific content
          </p>
          <StarSeparator className="mx-auto mt-4 w-32 text-gold" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              data-ocid="quran.search_input"
              placeholder="Search verses, surahs, translations..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Surah sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <h3 className="font-semibold text-forest-dark mb-3 text-sm uppercase tracking-wider">
              Surahs
            </h3>
            <ScrollArea className="h-64 lg:h-[600px] border rounded-lg">
              <div className="p-2">
                <button
                  type="button"
                  data-ocid="quran.all_surahs.tab"
                  onClick={() => setSelectedSurah(null)}
                  className={`w-full text-left px-3 py-2 rounded text-sm transition-colors mb-1 ${
                    selectedSurah === null
                      ? "bg-forest text-white"
                      : "hover:bg-muted"
                  }`}
                >
                  All Surahs
                </button>
                {surahs.map((s) => (
                  <button
                    type="button"
                    key={s.num}
                    onClick={() => setSelectedSurah(s.num)}
                    className={`w-full text-left px-3 py-2 rounded text-sm transition-colors mb-1 ${
                      selectedSurah === s.num
                        ? "bg-forest text-white"
                        : "hover:bg-muted"
                    }`}
                  >
                    <span className="text-gold font-bold text-xs mr-2">
                      {s.num}.
                    </span>
                    {s.name}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Verses */}
          <div className="flex-1">
            {isLoading ? (
              <div className="space-y-4" data-ocid="quran.loading_state">
                {["a", "b", "c", "d", "e"].map((k) => (
                  <Skeleton key={k} className="h-32 w-full" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground mb-4">
                  {filtered.length} verse{filtered.length !== 1 ? "s" : ""}{" "}
                  found
                </p>
                {filtered.length === 0 ? (
                  <div
                    data-ocid="quran.empty_state"
                    className="text-center py-12 text-muted-foreground"
                  >
                    No verses found matching your search.
                  </div>
                ) : (
                  filtered.map((v, i) => (
                    <motion.div
                      key={`${v.surahNumber}-${v.verseNumber}`}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(i * 0.05, 0.5) }}
                      data-ocid={`quran.item.${i + 1}`}
                      className="bg-white border border-border rounded-lg p-6 hover:border-gold/50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <Badge
                          variant="outline"
                          className="text-gold border-gold/30 text-xs"
                        >
                          {v.surahName} · {v.surahNumber.toString()}:
                          {v.verseNumber.toString()}
                        </Badge>
                      </div>
                      <div
                        className="font-arabic text-2xl leading-loose text-forest-dark text-right mb-3"
                        dir="rtl"
                      >
                        {v.arabicText}
                      </div>
                      <p className="text-muted-foreground text-sm italic mb-2">
                        {v.transliteration}
                      </p>
                      <p className="text-foreground text-sm leading-relaxed">
                        &ldquo;{v.englishTranslation}&rdquo;
                      </p>
                    </motion.div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
