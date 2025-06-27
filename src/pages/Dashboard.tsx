import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  Home,
  BarChart3,
  Calendar,
  Settings,
  User,
  Plus,
  TrendingUp,
  Moon,
  Heart,
  Smartphone,
  MessageSquare,
  Activity,
  Clock,
  Eye,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ChatBot from "@/components/ChatBot";
import MoodTracker from "@/components/MoodTracker";
import SleepLogger from "@/components/SleepLogger";
import SocialMediaIntegration from "@/components/SocialMediaIntegration";
import UserGuidance from "@/components/UserGuidance";
import StatisticalAnalysis from "@/components/StatisticalAnalysis";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [showMoodTracker, setShowMoodTracker] = useState(false);
  const [showSleepLogger, setShowSleepLogger] = useState(false);
  const [showSocialMedia, setShowSocialMedia] = useState(false);

  // Mock data for demonstration
  const [moodData, setMoodData] = useState([
    { date: "2024-01-15", mood: 7, notes: "Feeling quite positive today" },
    { date: "2024-01-14", mood: 5, notes: "Average day, some stress at work" },
    { date: "2024-01-13", mood: 8, notes: "Great day with family" },
  ]);

  const [sleepData, setSleepData] = useState([
    { date: "2024-01-15", hours: 7.5, quality: "Good" },
    { date: "2024-01-14", hours: 6, quality: "Poor" },
    { date: "2024-01-13", hours: 8, quality: "Excellent" },
  ]);

  const sidebarItems = [
    {
      id: "overview",
      icon: Home,
      label: "Overview",
      onClick: () => setActiveTab("overview"),
    },
    {
      id: "mood",
      icon: Heart,
      label: "Mood Tracking",
      onClick: () => setActiveTab("mood"),
    },
    {
      id: "sleep",
      icon: Moon,
      label: "Sleep Patterns",
      onClick: () => setActiveTab("sleep"),
    },
    {
      id: "activity",
      icon: Activity,
      label: "Activity Log",
      onClick: () => setActiveTab("activity"),
    },
    {
      id: "social",
      icon: Smartphone,
      label: "Social Media",
      onClick: () => setActiveTab("social"),
    },
    {
      id: "analytics",
      icon: BarChart3,
      label: "Analytics",
      onClick: () => setActiveTab("analytics"),
    },
    {
      id: "settings",
      icon: Settings,
      label: "Settings",
      onClick: () => setActiveTab("settings"),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div
              className="flex items-center space-x-3 cursor-pointer transform hover:scale-105 transition-all duration-300"
              onClick={() => navigate("/")}
            >
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  MannChitra
                </h1>
                <p className="text-xs text-blue-600 font-medium">
                  Mental Wellness Dashboard
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Badge
                className="bg-green-100 text-green-700 border-green-200 cursor-pointer hover:scale-105 transition-all duration-300"
                onClick={() =>
                  alert(
                    "System Status: All monitoring systems operational and secure",
                  )
                }
              >
                <Activity className="w-3 h-3 mr-1 animate-pulse" />
                System Active
              </Badge>
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-blue-50 hover:border-blue-300 transform hover:scale-105 transition-all duration-300"
                onClick={() => navigate("/")}
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
              <div
                className="p-2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full cursor-pointer hover:from-blue-200 hover:to-purple-300 transition-all duration-300 transform hover:scale-110"
                onClick={() =>
                  alert(
                    "Profile settings coming soon! Personalise your mental health journey.",
                  )
                }
              >
                <User className="w-5 h-5 text-gray-600" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 flex gap-6">
        {/* Sidebar */}
        <aside className="w-64 bg-white/80 backdrop-blur-md rounded-2xl border border-blue-100 shadow-lg p-6 h-fit sticky top-24">
          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={item.onClick}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  activeTab === item.id
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : "hover:bg-blue-50 text-gray-700 hover:text-blue-700"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-6">
          {/* User Guidance */}
          <UserGuidance activeTab={activeTab} />

          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-gray-900">
                  Mental Health Overview
                </h2>
                <Button
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
                  onClick={() => setShowMoodTracker(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Log Entry
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid md:grid-cols-4 gap-6">
                <Card
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white transform hover:scale-105 transition-all duration-300 cursor-pointer"
                  onClick={() => setActiveTab("mood")}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100">Current Mood</p>
                        <p className="text-3xl font-bold">
                          {moodData[0]?.mood || 0}/10
                        </p>
                      </div>
                      <Heart className="w-8 h-8 text-blue-200" />
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className="bg-gradient-to-r from-purple-500 to-purple-600 text-white transform hover:scale-105 transition-all duration-300 cursor-pointer"
                  onClick={() => setActiveTab("sleep")}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100">Last Night Sleep</p>
                        <p className="text-3xl font-bold">
                          {sleepData[0]?.hours || 0}h
                        </p>
                      </div>
                      <Moon className="w-8 h-8 text-purple-200" />
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white transform hover:scale-105 transition-all duration-300 cursor-pointer"
                  onClick={() => setActiveTab("activity")}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100">Wellbeing Score</p>
                        <p className="text-3xl font-bold">82%</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-green-200" />
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white transform hover:scale-105 transition-all duration-300 cursor-pointer"
                  onClick={() => setActiveTab("social")}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-orange-100">Social Health</p>
                        <p className="text-3xl font-bold">Good</p>
                      </div>
                      <MessageSquare className="w-8 h-8 text-orange-200" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activities */}
              <Card className="bg-white/80 backdrop-blur-md border border-blue-100">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-blue-600" />
                    Recent Activities
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      action: "Mood logged",
                      time: "2 hours ago",
                      value: "7/10 - Feeling positive",
                    },
                    {
                      action: "Sleep recorded",
                      time: "8 hours ago",
                      value: "7.5 hours - Good quality",
                    },
                    {
                      action: "Meditation completed",
                      time: "1 day ago",
                      value: "15 minutes mindfulness",
                    },
                    {
                      action: "Journal entry",
                      time: "2 days ago",
                      value: "Reflected on gratitude",
                    },
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-300 cursor-pointer transform hover:scale-105"
                      onClick={() =>
                        alert(
                          `Activity Details: ${activity.action} - ${activity.value}`,
                        )
                      }
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          {activity.action}
                        </p>
                        <p className="text-sm text-gray-600">
                          {activity.value}
                        </p>
                      </div>
                      <span className="text-sm text-blue-600">
                        {activity.time}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "mood" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-gray-900">
                  Mood Tracking
                </h2>
                <Button
                  className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 transform hover:scale-105 transition-all duration-300"
                  onClick={() => setShowMoodTracker(true)}
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Log Mood
                </Button>
              </div>

              <Card className="bg-white/80 backdrop-blur-md border border-pink-100">
                <CardHeader>
                  <CardTitle>Mood History</CardTitle>
                  <CardDescription>
                    Track your emotional wellbeing over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {moodData.map((entry, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors duration-300 cursor-pointer transform hover:scale-105"
                        onClick={() =>
                          alert(
                            `Mood Entry: ${entry.date} - ${entry.mood}/10 - ${entry.notes}`,
                          )
                        }
                      >
                        <div>
                          <p className="font-medium">{entry.date}</p>
                          <p className="text-sm text-gray-600">{entry.notes}</p>
                        </div>
                        <Badge
                          className={`${entry.mood >= 7 ? "bg-green-100 text-green-700" : entry.mood >= 5 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}
                        >
                          {entry.mood}/10
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "sleep" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-gray-900">
                  Sleep Patterns
                </h2>
                <Button
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
                  onClick={() => setShowSleepLogger(true)}
                >
                  <Moon className="w-4 h-4 mr-2" />
                  Log Sleep
                </Button>
              </div>

              <Card className="bg-white/80 backdrop-blur-md border border-indigo-100">
                <CardHeader>
                  <CardTitle>Sleep History</CardTitle>
                  <CardDescription>
                    Monitor your sleep patterns for better mental health
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sleepData.map((entry, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors duration-300 cursor-pointer transform hover:scale-105"
                        onClick={() =>
                          alert(
                            `Sleep Entry: ${entry.date} - ${entry.hours} hours - Quality: ${entry.quality}`,
                          )
                        }
                      >
                        <div>
                          <p className="font-medium">{entry.date}</p>
                          <p className="text-sm text-gray-600">
                            {entry.hours} hours
                          </p>
                        </div>
                        <Badge
                          className={`${entry.quality === "Excellent" ? "bg-green-100 text-green-700" : entry.quality === "Good" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}
                        >
                          {entry.quality}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "social" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-gray-900">
                  Social Media Integration
                </h2>
                <Button
                  className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 transform hover:scale-105 transition-all duration-300"
                  onClick={() => setShowSocialMedia(true)}
                >
                  <Smartphone className="w-4 h-4 mr-2" />
                  Connect Accounts
                </Button>
              </div>

              <SocialMediaIntegration />
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-gray-900">
                  Advanced Analytics
                </h2>
                <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  AI-Powered Insights
                </Badge>
              </div>
              <StatisticalAnalysis moodData={moodData} sleepData={sleepData} />
            </div>
          )}

          {activeTab === "activity" && (
            <Card className="bg-white/80 backdrop-blur-md border border-blue-100">
              <CardHeader>
                <CardTitle>Activity Log</CardTitle>
                <CardDescription>
                  Track your daily activities and their impact on wellbeing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-600 py-8">
                  Activity tracking features coming soon! Monitor exercise,
                  social activities, and their correlation with mental health.
                </p>
              </CardContent>
            </Card>
          )}

          {activeTab === "settings" && (
            <Card className="bg-white/80 backdrop-blur-md border border-blue-100">
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>
                  Personalise your MannChitra experience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-600 py-8">
                  Settings panel coming soon! Customise notifications, goals,
                  and privacy preferences.
                </p>
              </CardContent>
            </Card>
          )}
        </main>
      </div>

      {/* Modals */}
      {showMoodTracker && (
        <MoodTracker
          isOpen={showMoodTracker}
          onClose={() => setShowMoodTracker(false)}
          onSave={(moodEntry) => {
            setMoodData([moodEntry, ...moodData]);
            setShowMoodTracker(false);
          }}
        />
      )}

      {showSleepLogger && (
        <SleepLogger
          isOpen={showSleepLogger}
          onClose={() => setShowSleepLogger(false)}
          onSave={(sleepEntry) => {
            setSleepData([sleepEntry, ...sleepData]);
            setShowSleepLogger(false);
          }}
        />
      )}

      {/* Enhanced ChatBot */}
      <ChatBot />
    </div>
  );
};

export default Dashboard;
