import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { GraduationCap, Search } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { KnowledgeArticle } from "../backend.d";
import {
  GeometricPatternCorner,
  StarSeparator,
} from "../components/GeometricPattern";
import { useKnowledgeArticles } from "../hooks/useQueries";

const CATEGORIES = [
  "All",
  "Aqeedah",
  "Fiqh",
  "Seerah",
  "Tafseer",
  "Hadith Sciences",
  "Islamic History",
];

const SAMPLE_ARTICLES: KnowledgeArticle[] = [
  {
    category: "Aqeedah",
    title: "The Six Pillars of Iman",
    summary:
      "A comprehensive overview of the six articles of faith that every Muslim must believe in.",
    content:
      "Iman consists of belief in Allah, His angels, His books, His messengers, the Last Day, and divine decree (qadar). These pillars form the foundation of Islamic belief and are established in the Quran and Sunnah.",
  },
  {
    category: "Fiqh",
    title: "Understanding Wudu (Ritual Purification)",
    summary:
      "A detailed guide to the conditions and steps of performing proper wudu before prayer.",
    content:
      "Wudu is a ritual purification required before performing salah. It involves washing specific body parts in a prescribed manner as ordained by Allah in Surah Al-Maidah (5:6).",
  },
  {
    category: "Seerah",
    title: "The Early Life of Prophet Muhammad ﷺ",
    summary:
      "An account of the noble Prophet's birth, childhood, and youth in Mecca before prophethood.",
    content:
      "Prophet Muhammad ﷺ was born in Mecca in 570 CE in the Year of the Elephant. He was born into the noble Banu Hashim clan of the Quraysh tribe.",
  },
  {
    category: "Tafseer",
    title: "Tafseer of Surah Al-Fatihah",
    summary:
      "A deep dive into the meaning and lessons of the opening chapter of the Quran.",
    content:
      "Surah Al-Fatihah, 'The Opening', is recited in every unit of prayer. It contains praise of Allah, acknowledgment of His mercy and sovereignty, and a supplication for guidance.",
  },
  {
    category: "Hadith Sciences",
    title: "Introduction to the Sciences of Hadith",
    summary:
      "Learn about isnad, matn, and the classification of hadiths as sahih, hasan, or daif.",
    content:
      "Hadith sciences ('Ulum al-Hadith) is the discipline of evaluating and authenticating the sayings of the Prophet ﷺ. Scholars developed rigorous methods to verify both the chain of narrators (isnad) and the text (matn).",
  },
  {
    category: "Islamic History",
    title: "The Golden Age of Islamic Civilization",
    summary:
      "Explore the remarkable achievements of Muslim scholars in science, medicine, mathematics, and philosophy during the 8th–13th centuries.",
    content:
      "From the 8th to 13th centuries, the Islamic world was the global centre of knowledge. Muslim scholars made groundbreaking contributions to algebra, optics, medicine, astronomy, and philosophy.",
  },
];

export default function KnowledgePage() {
  const { data: articles, isLoading } = useKnowledgeArticles();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const allArticles =
    articles && articles.length > 0 ? articles : SAMPLE_ARTICLES;

  const filtered = allArticles.filter((a) => {
    const matchesCategory =
      activeCategory === "All" || a.category === activeCategory;
    const matchesSearch =
      !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.summary.toLowerCase().includes(search.toLowerCase()) ||
      a.category.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <div className="bg-forest-dark text-white py-12 relative overflow-hidden">
        <GeometricPatternCorner className="absolute top-0 right-0 w-48 h-48 text-gold opacity-20" />
        <div className="container mx-auto px-4 text-center">
          <GraduationCap className="h-10 w-10 text-gold mx-auto mb-3" />
          <h1 className="font-serif text-4xl font-bold uppercase tracking-wide">
            Knowledge Hub
          </h1>
          <p className="text-white/60 mt-2">
            Articles on Aqeedah, Fiqh, Seerah and Islamic sciences
          </p>
          <StarSeparator className="mx-auto mt-4 w-32 text-gold" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              data-ocid="knowledge.search_input"
              placeholder="Search articles, topics, categories..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              type="button"
              key={cat}
              data-ocid={"knowledge.category.tab"}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 text-sm rounded-full border transition-colors ${
                activeCategory === cat
                  ? "bg-forest text-white border-forest"
                  : "border-border hover:border-forest/40 text-muted-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            data-ocid="knowledge.loading_state"
          >
            {["a", "b", "c", "d", "e", "f"].map((k) => (
              <Skeleton key={k} className="h-48 w-full" />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.length === 0 ? (
              <div
                data-ocid="knowledge.empty_state"
                className="col-span-full text-center py-12 text-muted-foreground"
              >
                No articles found.
              </div>
            ) : (
              filtered.map((article, i) => (
                <motion.div
                  key={article.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.08, 0.5) }}
                  data-ocid={`knowledge.item.${i + 1}`}
                >
                  <Card className="h-full hover:border-gold/50 hover:shadow-gold transition-all cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge
                          variant="outline"
                          className="text-forest border-forest/30 text-xs"
                        >
                          {article.category}
                        </Badge>
                      </div>
                      <CardTitle className="font-serif text-forest-dark text-base leading-snug">
                        {article.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {article.summary}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
