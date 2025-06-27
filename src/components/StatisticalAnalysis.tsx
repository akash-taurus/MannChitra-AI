import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  TrendingUp,
  Brain,
  Activity,
  Calendar,
  Download,
  Eye,
  EyeOff,
} from "lucide-react";
import MoodChart from "./charts/MoodChart";
import SleepChart from "./charts/SleepChart";
import TrendAnalysis from "./charts/TrendAnalysis";
import CorrelationMatrix from "./charts/CorrelationMatrix";
import { MoodEntry, SleepEntry } from "@/lib/statisticsUtils";

interface StatisticalAnalysisProps {
  moodData: MoodEntry[];
  sleepData: SleepEntry[];
}

const StatisticalAnalysis = ({
  moodData,
  sleepData,
}: StatisticalAnalysisProps) => {
  const [activeView, setActiveView] = useState<
    "overview" | "mood" | "sleep" | "trends" | "correlations"
  >("overview");
  const [isMinimized, setIsMinimized] = useState(false);

  const analysisOptions = [
    {
      id: "overview",
      label: "Overview",
      icon: BarChart3,
      description: "Complete wellbeing dashboard",
      color: "blue",
    },
    {
      id: "mood",
      label: "Mood Analysis",
      icon: Activity,
      description: "Detailed mood patterns and trends",
      color: "pink",
    },
    {
      id: "sleep",
      label: "Sleep Analysis",
      icon: Brain,
      description: "Sleep patterns and quality metrics",
      color: "indigo",
    },
    {
      id: "trends",
      label: "Trend Analysis",
      icon: TrendingUp,
      description: "Comprehensive trend insights",
      color: "green",
    },
    {
      id: "correlations",
      label: "Correlations",
      icon: Calendar,
      description: "Factor relationship analysis",
      color: "purple",
    },
  ];

  const handleExportData = () => {
    const exportData = {
      moodData: moodData.slice(0, 30),
      sleepData: sleepData.slice(0, 30),
      exportDate: new Date().toISOString(),
      summary: {
        totalMoodEntries: moodData.length,
        totalSleepEntries: sleepData.length,
        dataRange:
          moodData.length > 0
            ? {
                from: moodData[moodData.length - 1]?.date,
                to: moodData[0]?.date,
              }
            : null,
      },
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = `mannchitra-data-${new Date().toISOString().split("T")[0]}.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  if (isMinimized) {
    return (
      <Card className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-semibold text-gray-800">
                  Statistical Analysis
                </h3>
                <p className="text-sm text-gray-600">
                  {moodData.length + sleepData.length} data points tracked
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsMinimized(false)}
              className="hover:bg-blue-50"
            >
              <Eye className="w-4 h-4 mr-2" />
              Expand
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
      pink: "bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100",
      indigo:
        "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100",
      green: "bg-green-50 text-green-700 border-green-200 hover:bg-green-100",
      purple:
        "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100",
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  if (moodData.length === 0 && sleepData.length === 0) {
    return (
      <Card className="bg-white/80 backdrop-blur-md border border-gray-200">
        <CardContent className="p-8 text-center">
          <BarChart3 className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No Data Available
          </h3>
          <p className="text-gray-500 mb-6">
            Start tracking your mood and sleep patterns to see comprehensive
            statistical analysis.
          </p>
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            <Button
              variant="outline"
              className="border-pink-300 hover:bg-pink-50 text-pink-700"
              onClick={() => alert("Open mood tracker from the dashboard")}
            >
              Track Mood
            </Button>
            <Button
              variant="outline"
              className="border-indigo-300 hover:bg-indigo-50 text-indigo-700"
              onClick={() => alert("Open sleep logger from the dashboard")}
            >
              Log Sleep
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <Card className="bg-white/80 backdrop-blur-md border border-blue-100">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Statistical Analysis Dashboard
                </CardTitle>
                <p className="text-sm text-gray-600">
                  Comprehensive insights into your mental health patterns
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-blue-100 text-blue-700 border-blue-300">
                {moodData.length + sleepData.length} data points
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportData}
                className="hover:bg-blue-50"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsMinimized(true)}
                className="hover:bg-gray-50"
              >
                <EyeOff className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Analysis Type Selector */}
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {analysisOptions.map((option) => {
              const Icon = option.icon;
              const isActive = activeView === option.id;

              return (
                <button
                  key={option.id}
                  onClick={() => setActiveView(option.id as any)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                    isActive
                      ? `${getColorClasses(option.color)} shadow-lg scale-105`
                      : "border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50"
                  }`}
                >
                  <div className="text-center space-y-2">
                    <Icon
                      className={`w-6 h-6 mx-auto ${isActive ? "" : "text-gray-500"}`}
                    />
                    <div>
                      <p
                        className={`text-sm font-medium ${isActive ? "" : "text-gray-700"}`}
                      >
                        {option.label}
                      </p>
                      <p
                        className={`text-xs ${isActive ? "opacity-80" : "text-gray-500"}`}
                      >
                        {option.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Analysis Content */}
      <div className="space-y-6">
        {activeView === "overview" && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-pink-700">
                    <Activity className="w-5 h-5 mr-2" />
                    Mood Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-pink-700">
                        {moodData.length > 0 ? moodData[0].mood : 0}/10
                      </p>
                      <p className="text-sm text-pink-600">Latest Mood Score</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-lg font-semibold text-pink-700">
                          {moodData.length}
                        </p>
                        <p className="text-xs text-pink-600">Total Entries</p>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-pink-700">
                          {moodData.length > 0
                            ? (
                                moodData.reduce(
                                  (sum, entry) => sum + entry.mood,
                                  0,
                                ) / moodData.length
                              ).toFixed(1)
                            : "0"}
                        </p>
                        <p className="text-xs text-pink-600">Average</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-indigo-700">
                    <Brain className="w-5 h-5 mr-2" />
                    Sleep Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-indigo-700">
                        {sleepData.length > 0 ? sleepData[0].hours : 0}h
                      </p>
                      <p className="text-sm text-indigo-600">
                        Latest Sleep Duration
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-lg font-semibold text-indigo-700">
                          {sleepData.length}
                        </p>
                        <p className="text-xs text-indigo-600">Total Entries</p>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-indigo-700">
                          {sleepData.length > 0
                            ? (
                                sleepData.reduce(
                                  (sum, entry) => sum + entry.hours,
                                  0,
                                ) / sleepData.length
                              ).toFixed(1)
                            : "0"}
                          h
                        </p>
                        <p className="text-xs text-indigo-600">Average</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Insights */}
            {(moodData.length > 0 || sleepData.length > 0) && (
              <Card className="bg-white/80 backdrop-blur-md border border-green-100">
                <CardHeader>
                  <CardTitle className="flex items-center text-green-700">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Quick Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-800 mb-2">
                        🎯 Progress
                      </h4>
                      <p className="text-sm text-green-700">
                        You've been consistently tracking your wellbeing. Keep
                        up the excellent self-awareness!
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-2">
                        📊 Data Quality
                      </h4>
                      <p className="text-sm text-blue-700">
                        {moodData.length + sleepData.length >= 14
                          ? "Rich dataset available for meaningful insights."
                          : "Continue tracking to unlock deeper insights."}
                      </p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-medium text-purple-800 mb-2">
                        🔍 Recommendations
                      </h4>
                      <p className="text-sm text-purple-700">
                        Explore correlations to understand what factors most
                        impact your wellbeing.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeView === "mood" && <MoodChart data={moodData} />}
        {activeView === "sleep" && <SleepChart data={sleepData} />}
        {activeView === "trends" && (
          <TrendAnalysis moodData={moodData} sleepData={sleepData} />
        )}
        {activeView === "correlations" && (
          <CorrelationMatrix moodData={moodData} sleepData={sleepData} />
        )}
      </div>
    </div>
  );
};

export default StatisticalAnalysis;
