import { RouterProvider, createRouter } from "@tanstack/react-router";
import { createRootRoute, createRoute } from "@tanstack/react-router";
import Layout from "./components/Layout";
import CalendarPage from "./pages/Calendar";
import HadithPage from "./pages/Hadith";
import HomePage from "./pages/Home";
import KnowledgePage from "./pages/Knowledge";
import PrayerTimesPage from "./pages/PrayerTimes";
import QuranPage from "./pages/Quran";

const rootRoute = createRootRoute({
  component: Layout,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const quranRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/quran",
  component: QuranPage,
});

const hadithRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/hadith",
  component: HadithPage,
});

const prayerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/prayer",
  component: PrayerTimesPage,
});

const calendarRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calendar",
  component: CalendarPage,
});

const knowledgeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/knowledge",
  component: KnowledgePage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  quranRoute,
  hadithRoute,
  prayerRoute,
  calendarRoute,
  knowledgeRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
