import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookMarked, Search } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { Hadith } from "../backend.d";
import {
  GeometricPatternCorner,
  StarSeparator,
} from "../components/GeometricPattern";
import { useAllHadiths } from "../hooks/useQueries";

const SAMPLE_HADITHS: Hadith[] = [
  {
    collection: "Sahih al-Bukhari",
    topic: "Intentions",
    narrator: "Umar ibn al-Khattab",
    arabicText: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ",
    englishTranslation:
      "Actions are judged by intentions, and every person will get what they intend.",
  },
  {
    collection: "Sahih Muslim",
    topic: "Faith",
    narrator: "Abu Hurairah",
    arabicText: "الإِيمَانُ بِضْعٌ وَسَبْعُونَ شُعْبَةً",
    englishTranslation:
      "Faith has over seventy branches, the uppermost being saying 'La ilaha ill-Allah' and the least is removing harm from the road.",
  },
  {
    collection: "Sahih al-Bukhari",
    topic: "Kindness",
    narrator: "Anas ibn Malik",
    arabicText: "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
    englishTranslation:
      "None of you truly believes until he loves for his brother what he loves for himself.",
  },
  {
    collection: "Sunan Abu Dawud",
    topic: "Cleanliness",
    narrator: "Abu Malik al-Ash'ari",
    arabicText: "الطَّهُورُ شَطْرُ الإِيمَانِ",
    englishTranslation: "Cleanliness is half of faith.",
  },
  {
    collection: "Sahih Muslim",
    topic: "Remembrance",
    narrator: "Abu Hurairah",
    arabicText: "كَلِمَتَانِ خَفِيفَتَانِ عَلَى اللِّسَانِ",
    englishTranslation:
      "Two phrases are light on the tongue but heavy in the scale: SubhanAllahi wa bihamdihi, SubhanAllahil-Azeem.",
  },
  {
    collection: "Sunan Ibn Majah",
    topic: "Knowledge",
    narrator: "Anas ibn Malik",
    arabicText: "طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ",
    englishTranslation: "Seeking knowledge is an obligation upon every Muslim.",
  },
];

export default function HadithPage() {
  const { data: hadiths, isLoading } = useAllHadiths();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const allHadiths = hadiths && hadiths.length > 0 ? hadiths : SAMPLE_HADITHS;

  const collections = ["All", ...new Set(allHadiths.map((h) => h.collection))];
  const topics = ["All", ...new Set(allHadiths.map((h) => h.topic))];

  const filtered = allHadiths.filter((h) => {
    const matchesCategory =
      activeCategory === "All" ||
      h.collection === activeCategory ||
      h.topic === activeCategory;
    const matchesSearch =
      !search ||
      h.englishTranslation.toLowerCase().includes(search.toLowerCase()) ||
      h.narrator.toLowerCase().includes(search.toLowerCase()) ||
      h.topic.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <div className="bg-forest-dark text-white py-12 relative overflow-hidden">
        <GeometricPatternCorner className="absolute top-0 right-0 w-48 h-48 text-gold opacity-20" />
        <div className="container mx-auto px-4 text-center">
          <BookMarked className="h-10 w-10 text-gold mx-auto mb-3" />
          <h1 className="font-serif text-4xl font-bold uppercase tracking-wide">
            Hadith Collections
          </h1>
          <p className="text-white/60 mt-2">
            Authenticated sayings and traditions of the Prophet ﷺ
          </p>
          <StarSeparator className="mx-auto mt-4 w-32 text-gold" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              data-ocid="hadith.search_input"
              placeholder="Search hadiths, narrators, topics..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Collections filter */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Collections
          </h3>
          <div className="flex flex-wrap gap-2">
            {collections.map((col) => (
              <button
                type="button"
                key={col}
                data-ocid={"hadith.collection.tab"}
                onClick={() => setActiveCategory(col)}
                className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                  activeCategory === col
                    ? "bg-forest text-white border-forest"
                    : "border-border hover:border-forest/40 text-muted-foreground"
                }`}
              >
                {col}
              </button>
            ))}
          </div>
        </div>

        {/* Topics filter */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Topics
          </h3>
          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="h-auto flex-wrap gap-1">
              {topics.slice(0, 8).map((t) => (
                <TabsTrigger key={t} value={t} data-ocid={"hadith.topic.tab"}>
                  {t}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {isLoading ? (
          <div className="space-y-4" data-ocid="hadith.loading_state">
            {["a", "b", "c", "d"].map((k) => (
              <Skeleton key={k} className="h-40 w-full" />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {filtered.length} hadith{filtered.length !== 1 ? "s" : ""} found
            </p>
            {filtered.length === 0 ? (
              <div
                data-ocid="hadith.empty_state"
                className="text-center py-12 text-muted-foreground"
              >
                No hadiths found matching your search.
              </div>
            ) : (
              filtered.map((h, i) => (
                <motion.div
                  key={`${h.collection}-${h.narrator}-${i}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.05, 0.4) }}
                  data-ocid={`hadith.item.${i + 1}`}
                  className="bg-white border border-border rounded-lg p-6 hover:border-gold/50 transition-colors"
                >
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge
                      variant="outline"
                      className="text-forest border-forest/30 text-xs"
                    >
                      {h.collection}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-gold border-gold/30 text-xs"
                    >
                      {h.topic}
                    </Badge>
                  </div>
                  <div
                    className="font-arabic text-xl leading-loose text-forest-dark text-right mb-3"
                    dir="rtl"
                  >
                    {h.arabicText}
                  </div>
                  <p className="text-foreground text-sm leading-relaxed mb-2">
                    &ldquo;{h.englishTranslation}&rdquo;
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Narrated by:{" "}
                    <span className="font-medium">{h.narrator}</span>
                  </p>
                </motion.div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
