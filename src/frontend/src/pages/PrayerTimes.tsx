import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, MapPin, Moon, Sun, Sunrise, Sunset } from "lucide-react";
import { motion } from "motion/react";
import {
  GeometricPatternCorner,
  StarSeparator,
} from "../components/GeometricPattern";
import { usePrayerTimes } from "../hooks/useQueries";
import { formatHijriDate } from "../utils/hijri";

const PRAYER_DETAILS = [
  {
    name: "Fajr",
    defaultTime: "5:12 AM",
    icon: Sunrise,
    description: "The pre-dawn prayer, offered before sunrise",
    rakaat: 2,
    arabic: "الفجر",
  },
  {
    name: "Dhuhr",
    defaultTime: "12:30 PM",
    icon: Sun,
    description: "The midday prayer, offered after the sun passes its zenith",
    rakaat: 4,
    arabic: "الظهر",
  },
  {
    name: "Asr",
    defaultTime: "3:45 PM",
    icon: Sun,
    description: "The afternoon prayer, offered in the late afternoon",
    rakaat: 4,
    arabic: "العصر",
  },
  {
    name: "Maghrib",
    defaultTime: "6:23 PM",
    icon: Sunset,
    description: "The evening prayer, offered just after sunset",
    rakaat: 3,
    arabic: "المغرب",
  },
  {
    name: "Isha",
    defaultTime: "7:58 PM",
    icon: Moon,
    description: "The night prayer, offered after twilight fades",
    rakaat: 4,
    arabic: "العشاء",
  },
];

export default function PrayerTimesPage() {
  const { data: prayerTimes, isLoading } = usePrayerTimes();
  const today = new Date();

  const prayers = PRAYER_DETAILS.map((pd) => {
    const found = prayerTimes?.find(
      (p) => p.name.toLowerCase() === pd.name.toLowerCase(),
    );
    return { ...pd, time: found?.time ?? pd.defaultTime };
  });

  const now = new Date();
  const currentHour = now.getHours();
  const isCurrentPrayer = (time: string) => {
    const [hourStr, rest] = time.split(":");
    const isPM = rest?.includes("PM");
    let hour = Number.parseInt(hourStr);
    if (isPM && hour !== 12) hour += 12;
    if (!isPM && hour === 12) hour = 0;
    return Math.abs(hour - currentHour) <= 1;
  };

  return (
    <div>
      <div className="bg-forest-dark text-white py-12 relative overflow-hidden">
        <GeometricPatternCorner className="absolute top-0 right-0 w-48 h-48 text-gold opacity-20" />
        <div className="container mx-auto px-4 text-center">
          <Clock className="h-10 w-10 text-gold mx-auto mb-3" />
          <h1 className="font-serif text-4xl font-bold uppercase tracking-wide">
            Prayer Times
          </h1>
          <p className="text-white/60 mt-2">{formatHijriDate(today)}</p>
          <p className="text-white/40 text-sm">
            {today.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <StarSeparator className="mx-auto mt-4 w-32 text-gold" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-serif text-2xl font-bold text-forest-dark">
              Daily Prayer Schedule
            </h2>
            <div className="flex items-center gap-2 mt-1 text-muted-foreground text-sm">
              <MapPin className="h-4 w-4" />
              <span>Times may vary by location</span>
            </div>
          </div>
          <Badge className="bg-gold/10 text-gold border-gold/20">
            5 Daily Prayers
          </Badge>
        </div>

        {isLoading ? (
          <div className="grid gap-4" data-ocid="prayer.loading_state">
            {["a", "b", "c", "d", "e"].map((k) => (
              <Skeleton key={k} className="h-28 w-full" />
            ))}
          </div>
        ) : (
          <div className="grid gap-4">
            {prayers.map((p, i) => {
              const isCurrent = isCurrentPrayer(p.time);
              return (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  data-ocid={`prayer.item.${i + 1}`}
                  className={`flex items-center gap-6 p-6 rounded-lg border transition-all ${
                    isCurrent
                      ? "bg-forest-dark text-white border-forest shadow-green"
                      : "bg-white border-border hover:border-gold/40"
                  }`}
                >
                  <div
                    className={`h-14 w-14 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isCurrent ? "bg-gold" : "bg-forest/10"
                    }`}
                  >
                    <p.icon
                      className={`h-7 w-7 ${isCurrent ? "text-forest-dark" : "text-forest"}`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2">
                      <h3
                        className={`font-serif text-xl font-bold ${isCurrent ? "text-white" : "text-forest-dark"}`}
                      >
                        {p.name}
                      </h3>
                      <span
                        className={`font-arabic text-base ${isCurrent ? "text-gold" : "text-muted-foreground"}`}
                        dir="rtl"
                      >
                        {p.arabic}
                      </span>
                    </div>
                    <p
                      className={`text-sm mt-0.5 ${isCurrent ? "text-white/70" : "text-muted-foreground"}`}
                    >
                      {p.description}
                    </p>
                    <p
                      className={`text-xs mt-1 ${isCurrent ? "text-white/50" : "text-muted-foreground"}`}
                    >
                      {p.rakaat} rak'aat
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-2xl font-bold font-serif ${isCurrent ? "text-gold" : "text-forest-dark"}`}
                    >
                      {p.time}
                    </p>
                    {isCurrent && (
                      <Badge className="bg-gold text-forest-darker text-xs mt-1">
                        Current
                      </Badge>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Sunna context */}
        <div className="mt-10 bg-cream-dark border border-border rounded-lg p-6">
          <h3 className="font-serif text-lg font-bold text-forest-dark mb-3">
            About the Five Pillars of Prayer
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Salah (صلاة) is the second pillar of Islam. Muslims are required to
            pray five times a day as a direct link between the worshipper and
            Allah. Each prayer takes only a few minutes to perform and serves as
            a reminder of commitment to faith throughout the day.
          </p>
        </div>
      </div>
    </div>
  );
}
