import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  BookMarked,
  BookOpen,
  CalendarDays,
  Clock,
  GraduationCap,
  Moon,
  Star,
} from "lucide-react";
import { motion } from "motion/react";
import {
  GeometricPatternCorner,
  StarSeparator,
} from "../components/GeometricPattern";
import {
  useCalendarEvents,
  useDailyVerse,
  usePrayerTimes,
} from "../hooks/useQueries";
import {
  HIJRI_MONTHS,
  formatHijriDate,
  gregorianToHijri,
} from "../utils/hijri";

const DEFAULT_PRAYERS = [
  { name: "Fajr", time: "5:12 AM" },
  { name: "Dhuhr", time: "12:30 PM" },
  { name: "Asr", time: "3:45 PM" },
  { name: "Maghrib", time: "6:23 PM" },
  { name: "Isha", time: "7:58 PM" },
];

const FEATURES = [
  {
    icon: BookOpen,
    label: "The Holy Quran",
    desc: "Read & reflect on divine revelation",
    to: "/quran",
  },
  {
    icon: BookMarked,
    label: "Sahih Hadith",
    desc: "Authenticated Prophetic traditions",
    to: "/hadith",
  },
  {
    icon: CalendarDays,
    label: "Islamic Calendar",
    desc: "Hijri dates & upcoming events",
    to: "/calendar",
  },
  {
    icon: GraduationCap,
    label: "Knowledge Hub",
    desc: "Articles on Aqeedah, Fiqh & more",
    to: "/knowledge",
  },
];

export default function HomePage() {
  const { data: dailyVerse, isLoading: verseLoading } = useDailyVerse();
  const { data: prayerTimes, isLoading: prayerLoading } = usePrayerTimes();
  const { data: events } = useCalendarEvents();

  const today = new Date();
  const hijri = gregorianToHijri(today);
  const prayers =
    prayerTimes && prayerTimes.length > 0 ? prayerTimes : DEFAULT_PRAYERS;

  const upcomingEvents =
    events && events.length > 0
      ? events.slice(0, 3)
      : [
          {
            name: "Eid al-Fitr",
            hijriDate: "1 Shawwal",
            gregorianDate: "Mar 30, 2025",
            description: "Festival of Breaking Fast",
          },
          {
            name: "Day of Arafah",
            hijriDate: "9 Dhu al-Hijjah",
            gregorianDate: "Jun 5, 2025",
            description: "The greatest day of Hajj",
          },
          {
            name: "Eid al-Adha",
            hijriDate: "10 Dhu al-Hijjah",
            gregorianDate: "Jun 6, 2025",
            description: "Festival of Sacrifice",
          },
        ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <img
          src="/assets/generated/mosque-hero.dim_1920x1080.jpg"
          alt="Mosque"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />

        {/* Geometric decorations */}
        <GeometricPatternCorner className="absolute top-0 right-0 w-64 h-64 text-gold opacity-30" />
        <GeometricPatternCorner className="absolute bottom-0 left-0 w-48 h-48 text-gold opacity-20 rotate-180" />

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Badge className="mb-4 bg-gold/20 text-gold border-gold/30 font-arabic text-base px-4 py-1">
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
            </Badge>
            <h1 className="font-serif mb-3">
              <span className="block text-gold text-3xl md:text-5xl font-bold uppercase tracking-widest mb-2">
                JOURNEY OF FAITH.
              </span>
              <span className="block text-white text-2xl md:text-4xl font-bold uppercase tracking-wide leading-tight">
                DISCOVER AUTHENTIC
                <br />
                ISLAMIC KNOWLEDGE.
              </span>
            </h1>
            <p className="text-white/70 text-lg mt-4 mb-8 max-w-xl mx-auto">
              Explore the Quran, Hadith, prayer times and Islamic scholarship —
              all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                data-ocid="hero.start_learning.primary_button"
                className="bg-gold text-forest-darker font-bold uppercase tracking-wider hover:bg-gold-light px-8 py-6 text-base rounded"
              >
                <Link to="/quran">START LEARNING NOW</Link>
              </Button>
              <Button
                asChild
                data-ocid="hero.explore_quran.secondary_button"
                variant="outline"
                className="border-white/50 text-white hover:bg-white/10 uppercase tracking-wider px-8 py-6 text-base rounded"
              >
                <Link to="/quran">EXPLORE QURAN</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Daily Inspiration */}
      <section
        className="py-16 section-cream relative overflow-hidden"
        data-ocid="daily_verse.section"
      >
        <GeometricPatternCorner className="absolute top-0 left-0 w-40 h-40 text-forest opacity-10" />
        <GeometricPatternCorner className="absolute bottom-0 right-0 w-40 h-40 text-forest opacity-10 rotate-180" />
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-gold/10 text-gold border-gold/20 mb-3 uppercase tracking-widest text-xs">
            Verse of the Day
          </Badge>
          <h2 className="font-serif text-3xl font-bold text-forest-dark uppercase tracking-wide mb-8">
            DAILY INSPIRATION
          </h2>
          <StarSeparator className="mx-auto mb-8 w-32 text-gold" />

          {verseLoading ? (
            <div
              className="max-w-2xl mx-auto space-y-4"
              data-ocid="daily_verse.loading_state"
            >
              <Skeleton className="h-8 w-3/4 mx-auto" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-2/3 mx-auto" />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto bg-white border border-gold/20 rounded-lg shadow-gold p-8"
            >
              {dailyVerse ? (
                <>
                  <div
                    className="font-arabic text-3xl leading-loose text-forest-dark mb-4"
                    dir="rtl"
                  >
                    {dailyVerse.arabicText}
                  </div>
                  <p className="text-muted-foreground italic text-sm mb-3">
                    {dailyVerse.transliteration}
                  </p>
                  <p className="text-foreground text-base leading-relaxed">
                    &ldquo;{dailyVerse.englishTranslation}&rdquo;
                  </p>
                  <p className="mt-4 text-xs text-gold font-semibold uppercase tracking-widest">
                    Surah {dailyVerse.surahName} (
                    {dailyVerse.surahNumber.toString()}:
                    {dailyVerse.verseNumber.toString()})
                  </p>
                </>
              ) : (
                <>
                  <div
                    className="font-arabic text-3xl leading-loose text-forest-dark mb-4"
                    dir="rtl"
                  >
                    إِنَّ مَعَ الْعُسْرِ يُسْرًا
                  </div>
                  <p className="text-muted-foreground italic text-sm mb-3">
                    Inna ma'al-'usri yusra
                  </p>
                  <p className="text-foreground text-base leading-relaxed">
                    &ldquo;Indeed, with hardship comes ease.&rdquo;
                  </p>
                  <p className="mt-4 text-xs text-gold font-semibold uppercase tracking-widest">
                    Surah Ash-Sharh (94:6)
                  </p>
                </>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* Prayer Times */}
      <section
        className="py-16 bg-forest-dark"
        data-ocid="prayer_times.section"
      >
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-gold/20 text-gold border-gold/30 mb-3 uppercase tracking-widest text-xs">
            Today's Schedule
          </Badge>
          <h2 className="font-serif text-3xl font-bold text-white uppercase tracking-wide mb-10">
            PRAYER TIMES
          </h2>
          {prayerLoading ? (
            <div
              className="flex gap-4 justify-center flex-wrap"
              data-ocid="prayer_times.loading_state"
            >
              {["a", "b", "c", "d", "e"].map((k) => (
                <Skeleton key={k} className="h-32 w-36 bg-white/10" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {prayers.map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  data-ocid={`prayer_times.item.${i + 1}`}
                  className="bg-white/10 border border-white/10 rounded-lg p-5 text-center hover:bg-white/15 transition-colors"
                >
                  <Clock className="h-6 w-6 text-gold mx-auto mb-3" />
                  <p className="text-white font-semibold text-sm uppercase tracking-wide">
                    {p.name}
                  </p>
                  <p className="text-gold text-xl font-bold mt-1">{p.time}</p>
                </motion.div>
              ))}
            </div>
          )}
          <div className="mt-6">
            <Link
              to="/prayer"
              data-ocid="prayer_times.view_all.link"
              className="text-gold/80 hover:text-gold text-sm underline underline-offset-4"
            >
              View full schedule →
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Tiles */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl font-bold text-forest-dark uppercase tracking-wide">
              EXPLORE
            </h2>
            <StarSeparator className="mx-auto mt-4 w-32 text-gold" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={f.to}
                  data-ocid={`explore.feature.${i + 1}`}
                  className="block p-6 border border-border rounded-lg hover:border-gold hover:shadow-gold transition-all group"
                >
                  <div className="h-12 w-12 rounded-full bg-forest/10 group-hover:bg-gold/10 flex items-center justify-center mb-4 transition-colors">
                    <f.icon className="h-6 w-6 text-forest group-hover:text-gold transition-colors" />
                  </div>
                  <h3 className="font-serif font-bold text-forest-dark mb-1">
                    {f.label}
                  </h3>
                  <p className="text-muted-foreground text-sm">{f.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Islamic Calendar Preview */}
      <section className="py-16 section-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <Badge className="bg-gold/10 text-gold border-gold/20 mb-3 uppercase tracking-widest text-xs">
              Hijri Calendar
            </Badge>
            <h2 className="font-serif text-3xl font-bold text-forest-dark uppercase tracking-wide">
              ISLAMIC CALENDAR
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Current date */}
            <div className="bg-forest-dark text-white rounded-lg p-8 flex flex-col justify-center">
              <Moon className="h-8 w-8 text-gold mb-4" />
              <p className="text-white/60 text-sm uppercase tracking-widest mb-1">
                Today's Hijri Date
              </p>
              <p className="text-gold font-serif text-2xl font-bold">
                {hijri.day} {HIJRI_MONTHS[hijri.month - 1]}
              </p>
              <p className="text-white text-4xl font-bold font-serif">
                {hijri.year} AH
              </p>
              <p className="text-white/50 text-sm mt-2">
                {today.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            {/* Upcoming events */}
            <div className="bg-white rounded-lg p-6 border border-border">
              <h3 className="font-serif font-bold text-forest-dark mb-4 text-lg">
                Upcoming Islamic Events
              </h3>
              <div className="space-y-4">
                {upcomingEvents.map((evt, i) => (
                  <div
                    key={evt.name}
                    data-ocid={`calendar.event.${i + 1}`}
                    className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0"
                  >
                    <div className="h-8 w-8 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <Star className="h-4 w-4 text-gold" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">
                        {evt.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {evt.hijriDate} · {evt.gregorianDate}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/calendar"
                data-ocid="calendar.view_all.link"
                className="mt-4 inline-block text-gold text-sm hover:underline"
              >
                View full calendar →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
