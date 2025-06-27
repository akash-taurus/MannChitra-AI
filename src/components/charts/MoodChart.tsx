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
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { Heart, TrendingUp, TrendingDown, Activity, Brain } from "lucide-react";
import {
  MoodEntry,
  calculateMovingAverage,
  getValueColor,
} from "@/lib/statisticsUtils";

interface MoodChartProps {
  data: MoodEntry[];
}

const MoodChart = ({ data }: MoodChartProps) => {
  // Prepare data for different chart types
  const chartData = data
    .slice(0, 30) // Last 30 days
    .reverse()
    .map((entry, index) => ({
      date: new Date(entry.date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
      }),
      mood: entry.mood,
      energy: entry.energy,
      anxiety: 10 - entry.anxiety, // Invert anxiety for better visualization
      social: entry.social,
      index,
    }));

  // Calculate trend data with moving averages
  const moodValues = chartData.map((d) => d.mood);
  const movingAverage = calculateMovingAverage(moodValues, 7);

  const trendData = chartData.map((item, index) => ({
    ...item,
    movingAverage: movingAverage[index],
    trend:
      index > 0
        ? movingAverage[index] > movingAverage[index - 1]
          ? "up"
          : movingAverage[index] < movingAverage[index - 1]
            ? "down"
            : "stable"
        : "stable",
  }));

  // Radar chart data for latest mental health snapshot
  const latestEntry = data[0];
  const radarData = latestEntry
    ? [
        { factor: "Mood", value: latestEntry.mood, fullMark: 10 },
        { factor: "Energy", value: latestEntry.energy, fullMark: 10 },
        { factor: "Calm", value: 10 - latestEntry.anxiety, fullMark: 10 }, // Inverted anxiety
        { factor: "Social", value: latestEntry.social, fullMark: 10 },
      ]
    : [];

  // Weekly comparison data
  const weeklyData = [];
  for (let i = 0; i < Math.min(data.length, 28); i += 7) {
    const weekData = data.slice(i, i + 7);
    if (weekData.length > 0) {
      const weekAvg = {
        week: `Week ${Math.floor(i / 7) + 1}`,
        mood:
          weekData.reduce((sum, entry) => sum + entry.mood, 0) /
          weekData.length,
        energy:
          weekData.reduce((sum, entry) => sum + entry.energy, 0) /
          weekData.length,
        anxiety:
          weekData.reduce((sum, entry) => sum + (10 - entry.anxiety), 0) /
          weekData.length,
        social:
          weekData.reduce((sum, entry) => sum + entry.social, 0) /
          weekData.length,
      };
      weeklyData.unshift(weekAvg); // Newest week first
    }
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-xl border border-pink-200">
          <p className="font-semibold text-gray-800 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {Math.round(entry.value * 10) / 10}
              {entry.name === "Mood" && " 😊"}
              {entry.name === "Energy" && " ⚡"}
              {entry.name === "Calm" && " 🧘"}
              {entry.name === "Social" && " 👥"}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const currentMood = data[0]?.mood || 0;
  const previousMood = data[1]?.mood || currentMood;
  const moodTrend =
    currentMood > previousMood
      ? "up"
      : currentMood < previousMood
        ? "down"
        : "stable";

  return (
    <div className="space-y-6">
      {/* Summary Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-pink-600 font-medium">
                  Current Mood
                </p>
                <p className="text-2xl font-bold text-pink-700">
                  {currentMood}/10
                </p>
                <div className="flex items-center mt-1">
                  {moodTrend === "up" && (
                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                  )}
                  {moodTrend === "down" && (
                    <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                  )}
                  <span
                    className={`text-xs ${moodTrend === "up" ? "text-green-600" : moodTrend === "down" ? "text-red-600" : "text-gray-600"}`}
                  >
                    {moodTrend === "stable"
                      ? "Stable"
                      : `${Math.abs(currentMood - previousMood).toFixed(1)} pts`}
                  </span>
                </div>
              </div>
              <Heart className="w-8 h-8 text-pink-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">
                  Energy Level
                </p>
                <p className="text-2xl font-bold text-blue-700">
                  {data[0]?.energy || 0}/10
                </p>
                <Badge className="mt-1 text-xs bg-blue-100 text-blue-700 border-blue-300">
                  {data[0]?.energy >= 7
                    ? "High"
                    : data[0]?.energy >= 5
                      ? "Medium"
                      : "Low"}
                </Badge>
              </div>
              <Activity className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Calmness</p>
                <p className="text-2xl font-bold text-green-700">
                  {data[0] ? 10 - data[0].anxiety : 0}/10
                </p>
                <Badge className="mt-1 text-xs bg-green-100 text-green-700 border-green-300">
                  {data[0] && data[0].anxiety <= 3
                    ? "Very Calm"
                    : data[0] && data[0].anxiety <= 6
                      ? "Calm"
                      : "Anxious"}
                </Badge>
              </div>
              <Brain className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">Social</p>
                <p className="text-2xl font-bold text-purple-700">
                  {data[0]?.social || 0}/10
                </p>
                <Badge className="mt-1 text-xs bg-purple-100 text-purple-700 border-purple-300">
                  {data[0]?.social >= 7
                    ? "Connected"
                    : data[0]?.social >= 5
                      ? "Moderate"
                      : "Isolated"}
                </Badge>
              </div>
              <Heart className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Mood Trend Chart */}
      <Card className="bg-white/80 backdrop-blur-md border border-pink-100">
        <CardHeader>
          <CardTitle className="flex items-center text-pink-700">
            <Heart className="w-5 h-5 mr-2" />
            Mood Trends (Last 30 Days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient
                    id="trendGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#fce7f3" />
                <XAxis
                  dataKey="date"
                  stroke="#be185d"
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  domain={[0, 10]}
                  stroke="#be185d"
                  tick={{ fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="mood"
                  stroke="#ec4899"
                  strokeWidth={3}
                  fill="url(#moodGradient)"
                  name="Mood"
                />
                <Line
                  type="monotone"
                  dataKey="movingAverage"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="7-Day Average"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Multi-Factor Analysis */}
      <Card className="bg-white/80 backdrop-blur-md border border-blue-100">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-700">
            <Activity className="w-5 h-5 mr-2" />
            Mental Health Factors Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                <XAxis
                  dataKey="date"
                  stroke="#3730a3"
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  domain={[0, 10]}
                  stroke="#3730a3"
                  tick={{ fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="mood"
                  stroke="#ec4899"
                  strokeWidth={2}
                  name="Mood"
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="energy"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Energy"
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="anxiety"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Calm"
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="social"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  name="Social"
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Current Mental Health Snapshot (Radar Chart) */}
      {latestEntry && (
        <Card className="bg-white/80 backdrop-blur-md border border-purple-100">
          <CardHeader>
            <CardTitle className="flex items-center text-purple-700">
              <Brain className="w-5 h-5 mr-2" />
              Current Mental Health Snapshot
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e879f9" />
                  <PolarAngleAxis
                    tick={{ fontSize: 12, fill: "#7c3aed" }}
                    className="font-medium"
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 10]}
                    tick={{ fontSize: 10, fill: "#a855f7" }}
                  />
                  <Radar
                    name="Current State"
                    dataKey="value"
                    stroke="#8b5cf6"
                    fill="#a855f7"
                    fillOpacity={0.3}
                    strokeWidth={2}
                    dot={{ r: 6, fill: "#7c3aed" }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Weekly Comparison */}
      {weeklyData.length > 1 && (
        <Card className="bg-white/80 backdrop-blur-md border border-orange-100">
          <CardHeader>
            <CardTitle className="flex items-center text-orange-700">
              <TrendingUp className="w-5 h-5 mr-2" />
              Weekly Progress Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#fed7aa" />
                  <XAxis
                    dataKey="week"
                    stroke="#c2410c"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    domain={[0, 10]}
                    stroke="#c2410c"
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar
                    dataKey="mood"
                    fill="#ec4899"
                    name="Mood"
                    radius={[2, 2, 0, 0]}
                  />
                  <Bar
                    dataKey="energy"
                    fill="#3b82f6"
                    name="Energy"
                    radius={[2, 2, 0, 0]}
                  />
                  <Bar
                    dataKey="anxiety"
                    fill="#10b981"
                    name="Calm"
                    radius={[2, 2, 0, 0]}
                  />
                  <Bar
                    dataKey="social"
                    fill="#f59e0b"
                    name="Social"
                    radius={[2, 2, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MoodChart;
