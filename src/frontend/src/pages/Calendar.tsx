import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarDays, Moon, Star } from "lucide-react";
import { motion } from "motion/react";
import type { IslamicEvent } from "../backend.d";
import {
  GeometricPatternCorner,
  StarSeparator,
} from "../components/GeometricPattern";
import { useCalendarEvents } from "../hooks/useQueries";
import {
  HIJRI_MONTHS,
  formatHijriDate,
  gregorianToHijri,
} from "../utils/hijri";

const SAMPLE_EVENTS: IslamicEvent[] = [
  {
    name: "Islamic New Year",
    hijriDate: "1 Muharram 1447",
    gregorianDate: "July 7, 2025",
    description: "The beginning of the Islamic lunar calendar year",
  },
  {
    name: "Day of Ashura",
    hijriDate: "10 Muharram 1447",
    gregorianDate: "July 16, 2025",
    description:
      "A day of fasting commemorating the day Musa (AS) was saved from Pharaoh",
  },
  {
    name: "Mawlid al-Nabi",
    hijriDate: "12 Rabi al-Awwal 1447",
    gregorianDate: "September 4, 2025",
    description: "Celebration of the birth of Prophet Muhammad ﷺ",
  },
  {
    name: "Laylat al-Miraj",
    hijriDate: "27 Rajab 1447",
    gregorianDate: "January 26, 2026",
    description: "The Night Journey and Ascension of the Prophet ﷺ",
  },
  {
    name: "Laylat al-Bara'at",
    hijriDate: "15 Sha'ban 1447",
    gregorianDate: "February 12, 2026",
    description: "The Night of Forgiveness",
  },
  {
    name: "First Day of Ramadan",
    hijriDate: "1 Ramadan 1447",
    gregorianDate: "February 28, 2026",
    description: "The blessed month of fasting begins",
  },
  {
    name: "Laylat al-Qadr",
    hijriDate: "27 Ramadan 1447",
    gregorianDate: "March 26, 2026",
    description: "The Night of Power, better than a thousand months",
  },
  {
    name: "Eid al-Fitr",
    hijriDate: "1 Shawwal 1447",
    gregorianDate: "March 30, 2026",
    description: "Festival of Breaking Fast — marking the end of Ramadan",
  },
  {
    name: "Day of Arafah",
    hijriDate: "9 Dhu al-Hijjah 1447",
    gregorianDate: "June 25, 2026",
    description: "The greatest day of the Hajj pilgrimage",
  },
  {
    name: "Eid al-Adha",
    hijriDate: "10 Dhu al-Hijjah 1447",
    gregorianDate: "June 26, 2026",
    description: "Festival of Sacrifice — commemorating Ibrahim's devotion",
  },
];

export default function CalendarPage() {
  const { data: events, isLoading } = useCalendarEvents();
  const today = new Date();
  const hijri = gregorianToHijri(today);

  const allEvents = events && events.length > 0 ? events : SAMPLE_EVENTS;

  return (
    <div>
      <div className="bg-forest-dark text-white py-12 relative overflow-hidden">
        <GeometricPatternCorner className="absolute top-0 right-0 w-48 h-48 text-gold opacity-20" />
        <div className="container mx-auto px-4 text-center">
          <CalendarDays className="h-10 w-10 text-gold mx-auto mb-3" />
          <h1 className="font-serif text-4xl font-bold uppercase tracking-wide">
            Islamic Calendar
          </h1>
          <p className="text-white/60 mt-2">
            Hijri dates, Islamic months & important events
          </p>
          <StarSeparator className="mx-auto mt-4 w-32 text-gold" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Current date card */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="md:col-span-1 bg-forest-dark text-white rounded-lg p-8 flex flex-col justify-center">
            <Moon className="h-8 w-8 text-gold mb-4" />
            <p className="text-white/50 text-xs uppercase tracking-widest mb-1">
              Today — Hijri
            </p>
            <p className="text-gold font-serif text-xl font-bold">
              {hijri.day} {HIJRI_MONTHS[hijri.month - 1]}
            </p>
            <p className="text-white text-3xl font-bold font-serif">
              {hijri.year} AH
            </p>
          </div>
          <div className="md:col-span-2 bg-white border border-border rounded-lg p-8">
            <h3 className="font-serif text-lg font-bold text-forest-dark mb-1">
              Today — Gregorian
            </h3>
            <p className="text-3xl font-bold text-forest-dark mb-2">
              {today.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-muted-foreground text-sm">
              {formatHijriDate(today)}
            </p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {HIJRI_MONTHS.map((m, i) => (
                <div
                  key={m}
                  className={`p-2 rounded text-xs text-center border transition-colors ${
                    i + 1 === hijri.month
                      ? "bg-forest text-white border-forest font-semibold"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {m}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Events */}
        <div>
          <h2 className="font-serif text-2xl font-bold text-forest-dark mb-6">
            Islamic Events Calendar
          </h2>
          {isLoading ? (
            <div className="space-y-4" data-ocid="calendar.loading_state">
              {["a", "b", "c", "d", "e"].map((k) => (
                <Skeleton key={k} className="h-20 w-full" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {allEvents.map((evt, i) => (
                <motion.div
                  key={evt.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.06, 0.5) }}
                  data-ocid={`calendar.event.${i + 1}`}
                  className="bg-white border border-border rounded-lg p-5 flex items-start gap-4 hover:border-gold/40 transition-colors"
                >
                  <div className="h-10 w-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Star className="h-5 w-5 text-gold" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-forest-dark">
                      {evt.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {evt.description}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <Badge
                      variant="outline"
                      className="text-gold border-gold/30 text-xs mb-1 block"
                    >
                      {evt.hijriDate}
                    </Badge>
                    <p className="text-xs text-muted-foreground">
                      {evt.gregorianDate}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
