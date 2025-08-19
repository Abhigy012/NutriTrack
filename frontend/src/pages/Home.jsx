import useUser from "../contexts/UserContext.jsx";
import { Link } from "react-router-dom";
import { IoFastFoodSharp } from "react-icons/io5";
import { TbReportSearch } from "react-icons/tb";
import { MdOutlineDashboard } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

export default function Home() {
  const { user, loading } = useUser();

  const ctaPrimary = user ? (
    <Link
      to="/dashboard"
      className="px-5 py-3 rounded-md bg-black text-white font-semibold hover:bg-gray-800"
    >
      Go to Dashboard
    </Link>
  ) : (
    <Link
      to="/auth"
      className="px-5 py-3 rounded-md bg-black text-white font-semibold hover:bg-gray-800"
    >
      Get Started
    </Link>
  );

  const ctaSecondary = (
    <a
      href="#features"
      className="px-5 py-3 rounded-md border border-black text-black font-semibold hover:bg-gray-50"
    >
      Explore Features
    </a>
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-slate-100 text-black">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 pt-4 pb-10 md:pt-12 md:pb-14">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <img
                src="/images/Logo.png"
                alt="NutriTrack"
                className="h-16 w-auto"
              />
              <span className="text-lg font-semibold">NutriTrack</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
              Track your nutrition. Get daily insights. Improve smarter.
            </h1>
            <p className="mt-3 text-gray-600 md:text-lg">
              A simple health-tracking app with smart food logging, daily
              summaries, report-based avoid alerts, and a personalized profile.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {ctaPrimary}
              {ctaSecondary}
            </div>
            <p className="mt-3 text-xs text-gray-500">
              Not for clinical use. Consult doctors for proper diet.
            </p>
          </div>
          {/* Visual/Showcase card */}
          <div className="relative">
            <div className="rounded-2xl bg-white shadow p-4 border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Today's Calories</p>
                  <p className="text-2xl font-bold">1,480 / 2,100 kcal</p>
                </div>
                <span className="text-xs px-2 py-1 rounded bg-emerald-100 text-emerald-700">
                  Sample
                </span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-3">
                <div className="rounded-lg p-3 bg-blue-50">
                  <p className="text-xs text-gray-600">Proteins</p>
                  <p className="font-semibold">72g / 130g</p>
                </div>
                <div className="rounded-lg p-3 bg-amber-50">
                  <p className="text-xs text-gray-600">Carbs</p>
                  <p className="font-semibold">160g / 250g</p>
                </div>
                <div className="rounded-lg p-3 bg-rose-50">
                  <p className="text-xs text-gray-600">Fats</p>
                  <p className="font-semibold">48g / 70g</p>
                </div>
              </div>
              <div className="mt-3 h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-black" style={{ width: "60%" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="w-9 h-9 rounded bg-blue-100 flex items-center justify-center mb-3">
              <MdOutlineDashboard size={18} className="text-blue-600" />
            </div>
            <h3 className="font-semibold">Dashboard Overview</h3>
            <p className="text-sm text-gray-600 mt-1">
              Daily calories, macros, and a clean summary of your day.
            </p>
          </div>
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="w-9 h-9 rounded bg-emerald-100 flex items-center justify-center mb-3">
              <IoFastFoodSharp size={18} className="text-emerald-600" />
            </div>
            <h3 className="font-semibold">Food Logging</h3>
            <p className="text-sm text-gray-600 mt-1">
              Log meals quickly. Smart macro estimation with AI help.
            </p>
          </div>
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="w-9 h-9 rounded bg-amber-100 flex items-center justify-center mb-3">
              <TbReportSearch size={18} className="text-amber-600" />
            </div>
            <h3 className="font-semibold">Reports & Alerts</h3>
            <p className="text-sm text-gray-600 mt-1">
              Upload PDFs to generate critical avoid lists and get alerts.
            </p>
          </div>
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="w-9 h-9 rounded bg-purple-100 flex items-center justify-center mb-3">
              <FaUserCircle size={18} className="text-purple-600" />
            </div>
            <h3 className="font-semibold">Profile & Goals</h3>
            <p className="text-sm text-gray-600 mt-1">
              Update your height, weight, goal and activity level easily.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-4 pb-12 md:pb-16">
        <div className="rounded-2xl bg-white border shadow p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold">How it works</h2>
          <div className="mt-6 grid md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs uppercase text-gray-500">Step 1</p>
              <p className="font-semibold">Sign up</p>
              <p className="text-sm text-gray-600">
                We prepare your daily plan in the background.
              </p>
            </div>
            <div>
              <p className="text-xs uppercase text-gray-500">Step 2</p>
              <p className="font-semibold">Log food</p>
              <p className="text-sm text-gray-600">
                Use the simple form to add your meals.
              </p>
            </div>
            <div>
              <p className="text-xs uppercase text-gray-500">Step 3</p>
              <p className="font-semibold">See insights</p>
              <p className="text-sm text-gray-600">
                Check your daily macros and calories vs required.
              </p>
            </div>
            <div>
              <p className="text-xs uppercase text-gray-500">Step 4</p>
              <p className="font-semibold">Upload report</p>
              <p className="text-sm text-gray-600">
                Get critical avoid alerts tailored to your report.
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {ctaPrimary}
            <Link
              to="/dashboard/foodlog"
              className="px-5 py-3 rounded-md border border-black text-black font-semibold hover:bg-gray-50"
            >
              Try Food Log
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
