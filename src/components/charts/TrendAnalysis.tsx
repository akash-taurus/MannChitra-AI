import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Area,
  Legend,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Target,
  Lightbulb,
  Calendar,
  BarChart3,
} from "lucide-react";
import {
  MoodEntry,
  SleepEntry,
  calculateMovingAverage,
  generateInsights,
  generateWeeklySummary,
} from "@/lib/statisticsUtils";

interface TrendAnalysisProps {
  moodData: MoodEntry[];
  sleepData: SleepEntry[];
}

const TrendAnalysis = ({ moodData, sleepData }: TrendAnalysisProps) => {
  // Combine and align data by date
  const combinedData = moodData
    .slice(0, 30)
    .map((moodEntry) => {
      const matchingSleep = sleepData.find(
        (sleepEntry) => sleepEntry.date === moodEntry.date,
      );
      return {
        date: new Date(moodEntry.date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
        }),
        fullDate: moodEntry.date,
        mood: moodEntry.mood,
        energy: moodEntry.energy,
        anxiety: 10 - moodEntry.anxiety, // Inverted for better visualization
        social: moodEntry.social,
        sleepHours: matchingSleep?.hours || null,
        sleepQuality: matchingSleep
          ? matchingSleep.quality === "Excellent"
            ? 5
            : matchingSleep.quality === "Good"
              ? 4
              : matchingSleep.quality === "Fair"
                ? 3
                : matchingSleep.quality === "Poor"
                  ? 2
                  : 1
          : null,
      };
    })
    .filter((entry) => entry.sleepHours !== null) // Only include entries with both mood and sleep data
    .reverse();

  // Calculate moving averages for trend analysis
  const moodValues = combinedData.map((d) => d.mood);
  const sleepValues = combinedData.map((d) => d.sleepHours || 0);
  const energyValues = combinedData.map((d) => d.energy);

  const moodTrend = calculateMovingAverage(moodValues, 7);
  const sleepTrend = calculateMovingAverage(sleepValues, 7);
  const energyTrend = calculateMovingAverage(energyValues, 7);

  const trendData = combinedData.map((item, index) => ({
    ...item,
    moodTrend: moodTrend[index],
    sleepTrend: sleepTrend[index],
    energyTrend: energyTrend[index],
    wellbeingScore: calculateWellbeingScore(item),
  }));

  function calculateWellbeingScore(entry: any): number {
    const moodWeight = 0.3;
    const energyWeight = 0.25;
    const anxietyWeight = 0.2; // Calm (inverted anxiety)
    const socialWeight = 0.15;
    const sleepWeight = 0.1;

    const score =
      entry.mood * moodWeight +
      entry.energy * energyWeight +
      entry.anxiety * anxietyWeight +
      entry.social * socialWeight +
      (entry.sleepHours ? Math.min((entry.sleepHours / 8) * 10, 10) : 5) *
        sleepWeight;

    return Math.round(score * 10) / 10;
  }

  // Weekly summary statistics
  const weeklySummary = generateWeeklySummary(moodData, sleepData);

  // Generate insights
  const insights = generateInsights(moodData, sleepData);

  // Calculate trend indicators
  const currentPeriod = trendData.slice(-7); // Last 7 days
  const previousPeriod = trendData.slice(-14, -7); // Previous 7 days

  const currentAvg =
    currentPeriod.length > 0
      ? currentPeriod.reduce((sum, item) => sum + item.wellbeingScore, 0) /
        currentPeriod.length
      : 0;

  const previousAvg =
    previousPeriod.length > 0
      ? previousPeriod.reduce((sum, item) => sum + item.wellbeingScore, 0) /
        previousPeriod.length
      : currentAvg;

  const trendDirection =
    currentAvg > previousAvg
      ? "up"
      : currentAvg < previousAvg
        ? "down"
        : "stable";
  const trendStrength = Math.abs(currentAvg - previousAvg);

  // Goal tracking
  const goals = [
    { name: "Mood", current: weeklySummary.mood, target: 7, unit: "/10" },
    { name: "Sleep", current: weeklySummary.sleep, target: 8, unit: "h" },
    { name: "Energy", current: weeklySummary.energy, target: 7, unit: "/10" },
    {
      name: "Calm",
      current: 10 - weeklySummary.anxiety,
      target: 7,
      unit: "/10",
    },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-xl border border-blue-200">
          <p className="font-semibold text-gray-800 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {Math.round(entry.value * 10) / 10}
              {entry.name.includes("Score") && "/10"}
              {entry.name.includes("Sleep") && "h"}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Trend Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">
                  Wellbeing Trend
                </p>
                <p className="text-2xl font-bold text-blue-700">
                  {currentAvg.toFixed(1)}/10
                </p>
                <div className="flex items-center mt-2">
                  {trendDirection === "up" && (
                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                  )}
                  {trendDirection === "down" && (
                    <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                  )}
                  <Badge
                    className={`text-xs ${
                      trendDirection === "up"
                        ? "bg-green-100 text-green-700 border-green-300"
                        : trendDirection === "down"
                          ? "bg-red-100 text-red-700 border-red-300"
                          : "bg-gray-100 text-gray-700 border-gray-300"
                    }`}
                  >
                    {trendDirection === "stable"
                      ? "Stable"
                      : `${trendDirection === "up" ? "+" : ""}${(currentAvg - previousAvg).toFixed(1)}`}
                  </Badge>
                </div>
              </div>
              <BarChart3 className="w-10 h-10 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">
                  Progress Score
                </p>
                <p className="text-2xl font-bold text-green-700">
                  {Math.round(
                    goals.reduce(
                      (sum, goal) => sum + (goal.current / goal.target) * 100,
                      0,
                    ) / goals.length,
                  )}
                  %
                </p>
                <p className="text-xs text-green-600 mt-1">of weekly goals</p>
              </div>
              <Target className="w-10 h-10 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">
                  Data Points
                </p>
                <p className="text-2xl font-bold text-purple-700">
                  {moodData.length + sleepData.length}
                </p>
                <p className="text-xs text-purple-600 mt-1">tracked entries</p>
              </div>
              <Calendar className="w-10 h-10 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Combined Wellbeing Trend */}
      <Card className="bg-white/80 backdrop-blur-md border border-blue-100">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-700">
            <TrendingUp className="w-5 h-5 mr-2" />
            Comprehensive Wellbeing Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                <XAxis
                  dataKey="date"
                  stroke="#3730a3"
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  yAxisId="left"
                  domain={[0, 10]}
                  stroke="#3730a3"
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  domain={[0, 12]}
                  stroke="#059669"
                  tick={{ fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />

                {/* Wellbeing score area */}
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="wellbeingScore"
                  fill="url(#wellbeingGradient)"
                  stroke="#6366f1"
                  strokeWidth={2}
                  name="Wellbeing Score"
                />

                {/* Individual metrics as lines */}
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="moodTrend"
                  stroke="#ec4899"
                  strokeWidth={2}
                  name="Mood Trend"
                  dot={false}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="energyTrend"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Energy Trend"
                  dot={false}
                />

                {/* Sleep as bars */}
                <Bar
                  yAxisId="right"
                  dataKey="sleepHours"
                  fill="#10b981"
                  opacity={0.6}
                  name="Sleep Hours"
                />

                <defs>
                  <linearGradient
                    id="wellbeingGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Goals Progress */}
      <Card className="bg-white/80 backdrop-blur-md border border-green-100">
        <CardHeader>
          <CardTitle className="flex items-center text-green-700">
            <Target className="w-5 h-5 mr-2" />
            Weekly Goals Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {goals.map((goal, index) => {
              const progress = (goal.current / goal.target) * 100;
              const isOnTrack = progress >= 85;

              return (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      {goal.name}
                    </span>
                    <Badge
                      className={`text-xs ${isOnTrack ? "bg-green-100 text-green-700 border-green-300" : "bg-orange-100 text-orange-700 border-orange-300"}`}
                    >
                      {Math.round(progress)}%
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>
                        {goal.current.toFixed(1)}
                        {goal.unit}
                      </span>
                      <span>
                        Target: {goal.target}
                        {goal.unit}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${isOnTrack ? "bg-green-500" : "bg-orange-500"}`}
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="bg-white/80 backdrop-blur-md border border-yellow-100">
        <CardHeader>
          <CardTitle className="flex items-center text-yellow-700">
            <Lightbulb className="w-5 h-5 mr-2" />
            Personalised Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insights.length > 0 ? (
              insights.map((insight, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200"
                >
                  <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-yellow-800">{insight}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Lightbulb className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>
                  Track more data to receive personalised insights about your
                  wellbeing patterns.
                </p>
              </div>
            )}

            {/* Additional insights based on current data */}
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-800 mb-2">
                  💡 Pattern Recognition
                </h4>
                <p className="text-sm text-blue-700">
                  {trendDirection === "up"
                    ? "Your wellbeing has been improving steadily. Keep up the positive habits!"
                    : trendDirection === "down"
                      ? "Consider reviewing recent changes in routine or reaching out for support."
                      : "Your wellbeing appears stable. Focus on maintaining current positive habits."}
                </p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-800 mb-2">
                  🎯 Recommendations
                </h4>
                <p className="text-sm text-green-700">
                  {weeklySummary.sleep < 7
                    ? "Prioritise sleep hygiene - aim for 7-9 hours nightly."
                    : weeklySummary.mood < 6
                      ? "Consider mindfulness or gratitude practices to boost mood."
                      : "You're doing well! Continue your current wellness routine."}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrendAnalysis;
