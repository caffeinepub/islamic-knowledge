import Map "mo:core/Map";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Int "mo:core/Int";

actor {
  type QuranVerse = {
    surahName : Text;
    surahNumber : Nat;
    verseNumber : Nat;
    arabicText : Text;
    englishTranslation : Text;
    transliteration : Text;
  };

  type Hadith = {
    collection : Text;
    narrator : Text;
    arabicText : Text;
    englishTranslation : Text;
    topic : Text;
  };

  type PrayerTime = {
    name : Text;
    time : Text;
  };

  type IslamicEvent = {
    name : Text;
    hijriDate : Text;
    gregorianDate : Text;
    description : Text;
  };

  type KnowledgeArticle = {
    title : Text;
    category : Text;
    summary : Text;
    content : Text;
  };

  module QuranVerse {
    public func compare(a : QuranVerse, b : QuranVerse) : Order.Order {
      switch (Text.compare(a.surahName, b.surahName)) {
        case (#equal) { Nat.compare(a.surahNumber, b.surahNumber) };
        case (order) { order };
      };
    };
  };

  module Hadith {
    public func compare(a : Hadith, b : Hadith) : Order.Order {
      switch (Text.compare(a.collection, b.collection)) {
        case (#equal) { Text.compare(a.narrator, b.narrator) };
        case (order) { order };
      };
    };
  };

  module PrayerTime {
    public func compare(a : PrayerTime, b : PrayerTime) : Order.Order {
      Text.compare(a.name, b.name);
    };
  };

  module IslamicEvent {
    public func compare(a : IslamicEvent, b : IslamicEvent) : Order.Order {
      Text.compare(a.gregorianDate, b.gregorianDate);
    };
  };

  module KnowledgeArticle {
    public func compare(a : KnowledgeArticle, b : KnowledgeArticle) : Order.Order {
      Text.compare(a.title, b.title);
    };
  };

  let quranVerses = Map.empty<Nat, QuranVerse>();
  let hadiths = Map.empty<Nat, Hadith>();
  let prayerTimes = Map.empty<Nat, PrayerTime>();
  let islamicEvents = Map.empty<Nat, IslamicEvent>();
  let knowledgeArticles = Map.empty<Nat, KnowledgeArticle>();

  var nextVerseId = 1;
  var nextHadithId = 1;
  var nextPrayerTimeId = 1;
  var nextEventId = 1;
  var nextArticleId = 1;

  let initialVerses : [(Nat, QuranVerse)] = [
    (
      1,
      {
        surahName = "Al-Fatiha";
        surahNumber = 1;
        verseNumber = 1;
        arabicText = "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";
        englishTranslation = "In the name of Allah, the Most Gracious, the Most Merciful.";
        transliteration = "Bismillahir Rahmanir Raheem";
      },
    ),
    (
      2,
      {
        surahName = "Al-Baqarah";
        surahNumber = 2;
        verseNumber = 255;
        arabicText = "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...";
        englishTranslation = "Allah! There is no deity except Him, the Ever-Living, the Sustainer of [all] existence...";
        transliteration = "Allahu la ilaha illa Huwa, Al-Hayyul-Qayyum...";
      },
    ),
    (
      3,
      {
        surahName = "Al-Ikhlas";
        surahNumber = 112;
        verseNumber = 1;
        arabicText = "قُلْ هُوَ اللَّهُ أَحَدٌ";
        englishTranslation = "Say, 'He is Allah, [who is] One";
        transliteration = "Qul huwal-lahu ahad";
      },
    ),
  ];

  let prayerTimesData : [(Nat, PrayerTime)] = [
    (1, { name = "Fajr"; time = "05:00 AM" }),
    (2, { name = "Dhuhr"; time = "12:30 PM" }),
    (3, { name = "Asr"; time = "04:00 PM" }),
    (4, { name = "Maghrib"; time = "06:30 PM" }),
    (5, { name = "Isha"; time = "08:00 PM" }),
  ];

  let islamicEventsData : [(Nat, IslamicEvent)] = [
    (
      1,
      {
        name = "Ramadan";
        hijriDate = "9th Month";
        gregorianDate = "Varies Annually";
        description = "Month of fasting and spiritual reflection.";
      },
    ),
    (
      2,
      {
        name = "Eid al-Fitr";
        hijriDate = "1 Shawwal";
        gregorianDate = "Varies Annually";
        description = "Celebration after the fasting month of Ramadan.";
      },
    ),
  ];

  let initialArticles : [(Nat, KnowledgeArticle)] = [
    (
      1,
      {
        title = "Introduction to Aqeedah";
        category = "Aqeedah";
        summary = "Understanding the fundamentals of Islamic belief.";
        content = "Aqeedah is the core foundation of a Muslim's faith...";
      },
    ),
    (
      2,
      {
        title = "Fiqh of Salah";
        category = "Fiqh";
        summary = "Rules and regulations of prayer in Islam.";
        content = "Salah is one of the five pillars of Islam...";
      },
    ),
  ];

  let initialHadiths : [(Nat, Hadith)] = [
    (
      1,
      {
        collection = "Bukhari";
        narrator = "Abu Huraira";
        arabicText = "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ";
        englishTranslation = "Actions are judged by intentions.";
        topic = "Intentions";
      },
    ),
    (
      2,
      {
        collection = "Muslim";
        narrator = "Anas bin Malik";
        arabicText = "لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه";
        englishTranslation = "None of you truly believes until he loves for his brother what he loves for himself.";
        topic = "Brotherhood";
      },
    ),
  ];

  system func preupgrade() {
    let versesArray = initialVerses.concat(quranVerses.toArray());
    let hadithsArray = initialHadiths.concat(hadiths.toArray());
    let prayerTimesArray = prayerTimesData.concat(prayerTimes.toArray());
    let eventsArray = islamicEventsData.concat(islamicEvents.toArray());
    let articlesArray = initialArticles.concat(knowledgeArticles.toArray());

    versesArray.forEach(func((id, verse)) { quranVerses.add(id, verse) });
    hadithsArray.forEach(func((id, hadith)) { hadiths.add(id, hadith) });
    prayerTimesArray.forEach(func((id, prayerTime)) { prayerTimes.add(id, prayerTime) });
    eventsArray.forEach(func((id, event)) { islamicEvents.add(id, event) });
    articlesArray.forEach(func((id, article)) { knowledgeArticles.add(id, article) });
  };

  public shared ({ caller }) func addQuranVerse(verse : QuranVerse) : async Nat {
    let id = nextVerseId;
    nextVerseId += 1;
    quranVerses.add(id, verse);
    id;
  };

  public shared ({ caller }) func addHadith(hadith : Hadith) : async Nat {
    let id = nextHadithId;
    nextHadithId += 1;
    hadiths.add(id, hadith);
    id;
  };

  public shared ({ caller }) func addKnowledgeArticle(article : KnowledgeArticle) : async Nat {
    let id = nextArticleId;
    nextArticleId += 1;
    knowledgeArticles.add(id, article);
    id;
  };

  public query ({ caller }) func getQuranVerse(id : Nat) : async ?QuranVerse {
    quranVerses.get(id);
  };

  public query ({ caller }) func getHadith(id : Nat) : async ?Hadith {
    hadiths.get(id);
  };

  public query ({ caller }) func getPrayerTime(id : Nat) : async ?PrayerTime {
    prayerTimes.get(id);
  };

  public query ({ caller }) func getIslamicEvent(id : Nat) : async ?IslamicEvent {
    islamicEvents.get(id);
  };

  public query ({ caller }) func getKnowledgeArticle(id : Nat) : async ?KnowledgeArticle {
    knowledgeArticles.get(id);
  };

  public query ({ caller }) func getAllQuranVerses() : async [QuranVerse] {
    quranVerses.values().toArray().sort();
  };

  public query ({ caller }) func getAllHadiths() : async [Hadith] {
    hadiths.values().toArray().sort();
  };

  public query ({ caller }) func getAllPrayerTimes() : async [PrayerTime] {
    prayerTimes.values().toArray().sort();
  };

  public query ({ caller }) func getAllIslamicEvents() : async [IslamicEvent] {
    islamicEvents.values().toArray().sort();
  };

  public query ({ caller }) func getAllKnowledgeArticles() : async [KnowledgeArticle] {
    knowledgeArticles.values().toArray().sort();
  };

  public query ({ caller }) func getDailyVerse() : async QuranVerse {
    let indexInt = (Time.now() / 86_400_000_000_000) % 3;
    let index = indexInt.toNat() + 1;
    switch (quranVerses.get(index)) {
      case (null) {
        {
          surahName = "Al-Fatiha";
          surahNumber = 1;
          verseNumber = 1;
          arabicText = "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";
          englishTranslation = "In the name of Allah, the Most Gracious, the Most Merciful.";
          transliteration = "Bismillahir Rahmanir Raheem";
        };
      };
      case (?verse) { verse };
    };
  };
};
