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
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  Legend,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import { Moon, Clock, Star, TrendingUp, BarChart3 } from "lucide-react";
import {
  SleepEntry,
  sleepQualityToNumber,
  calculateMovingAverage,
  getValueColor,
} from "@/lib/statisticsUtils";

interface SleepChartProps {
  data: SleepEntry[];
}

const SleepChart = ({ data }: SleepChartProps) => {
  // Prepare chart data
  const chartData = data
    .slice(0, 30)
    .reverse()
    .map((entry, index) => {
      const bedHour = parseInt(entry.bedtime.split(":")[0]);
      const bedMinute = parseInt(entry.bedtime.split(":")[1]);
      const wakeHour = parseInt(entry.wakeTime.split(":")[0]);
      const wakeMinute = parseInt(entry.wakeTime.split(":")[1]);

      // Convert to decimal hours for better visualization
      const bedtimeDecimal = bedHour + bedMinute / 60;
      const wakeTimeDecimal = wakeHour + wakeMinute / 60;

      return {
        date: new Date(entry.date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
        }),
        hours: entry.hours,
        quality: sleepQualityToNumber(entry.quality),
        qualityText: entry.quality,
        bedtimeDecimal:
          bedtimeDecimal > 12 ? bedtimeDecimal : bedtimeDecimal + 24, // Handle PM times
        wakeTimeDecimal,
        bedtime: entry.bedtime,
        wakeTime: entry.wakeTime,
        index,
      };
    });

  // Calculate sleep debt/surplus
  const idealSleep = 8;
  const sleepDebtData = chartData.map((item) => ({
    ...item,
    debt: item.hours - idealSleep,
    efficiency: (item.hours / 10) * item.quality * 2, // Sleep efficiency score
  }));

  // Sleep pattern analysis
  const avgSleep =
    chartData.length > 0
      ? chartData.reduce((sum, item) => sum + item.hours, 0) / chartData.length
      : 0;

  const avgQuality =
    chartData.length > 0
      ? chartData.reduce((sum, item) => sum + item.quality, 0) /
        chartData.length
      : 0;

  // Sleep quality distribution
  const qualityDistribution = data.reduce(
    (acc, entry) => {
      acc[entry.quality] = (acc[entry.quality] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const pieData = Object.entries(qualityDistribution).map(
    ([quality, count]) => ({
      name: quality,
      value: count,
      color: getValueColor(sleepQualityToNumber(quality), "sleep"),
    }),
  );

  // Weekly sleep patterns
  const weeklyData = [];
  for (let i = 0; i < Math.min(data.length, 28); i += 7) {
    const weekData = data.slice(i, i + 7);
    if (weekData.length > 0) {
      const weekStats = {
        week: `Week ${Math.floor(i / 7) + 1}`,
        avgHours:
          weekData.reduce((sum, entry) => sum + entry.hours, 0) /
          weekData.length,
        avgQuality:
          weekData.reduce(
            (sum, entry) => sum + sleepQualityToNumber(entry.quality),
            0,
          ) / weekData.length,
        consistency: calculateSleepConsistency(weekData),
      };
      weeklyData.unshift(weekStats);
    }
  }

  function calculateSleepConsistency(weekData: SleepEntry[]): number {
    if (weekData.length < 2) return 100;

    const hours = weekData.map((entry) => entry.hours);
    const avg = hours.reduce((sum, h) => sum + h, 0) / hours.length;
    const variance =
      hours.reduce((sum, h) => sum + Math.pow(h - avg, 2), 0) / hours.length;
    const stdDev = Math.sqrt(variance);

    // Convert to consistency percentage (lower std dev = higher consistency)
    return Math.max(0, Math.min(100, 100 - stdDev * 20));
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-xl border border-indigo-200">
          <p className="font-semibold text-gray-800 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}:{" "}
              {entry.name.includes("Time")
                ? entry.value
                : entry.name === "Quality"
                  ? `${Math.round(entry.value * 10) / 10}/5`
                  : `${Math.round(entry.value * 10) / 10}${entry.name.includes("Hours") ? "h" : ""}`}
              {entry.name === "Hours" && " 🛌"}
              {entry.name === "Quality" && " ⭐"}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const currentSleep = data[0]?.hours || 0;
  const sleepTrend =
    data.length > 1
      ? currentSleep > data[1].hours
        ? "up"
        : currentSleep < data[1].hours
          ? "down"
          : "stable"
      : "stable";

  return (
    <div className="space-y-6">
      {/* Sleep Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-indigo-600 font-medium">
                  Last Night
                </p>
                <p className="text-2xl font-bold text-indigo-700">
                  {currentSleep}h
                </p>
                <div className="flex items-center mt-1">
                  {sleepTrend === "up" && (
                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                  )}
                  {sleepTrend === "down" && (
                    <Clock className="w-4 h-4 text-red-600 mr-1" />
                  )}
                  <span
                    className={`text-xs ${sleepTrend === "up" ? "text-green-600" : sleepTrend === "down" ? "text-red-600" : "text-gray-600"}`}
                  >
                    {sleepTrend === "stable"
                      ? "Consistent"
                      : `${Math.abs(currentSleep - (data[1]?.hours || 0)).toFixed(1)}h`}
                  </span>
                </div>
              </div>
              <Moon className="w-8 h-8 text-indigo-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">
                  Avg Quality
                </p>
                <p className="text-2xl font-bold text-purple-700">
                  {avgQuality.toFixed(1)}/5
                </p>
                <Badge className="mt-1 text-xs bg-purple-100 text-purple-700 border-purple-300">
                  {data[0]?.quality || "N/A"}
                </Badge>
              </div>
              <Star className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">
                  Average Sleep
                </p>
                <p className="text-2xl font-bold text-blue-700">
                  {avgSleep.toFixed(1)}h
                </p>
                <Badge
                  className={`mt-1 text-xs ${avgSleep >= 7.5 ? "bg-green-100 text-green-700 border-green-300" : "bg-orange-100 text-orange-700 border-orange-300"}`}
                >
                  {avgSleep >= 7.5 ? "Optimal" : "Needs Improvement"}
                </Badge>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-600 font-medium">
                  Sleep Debt
                </p>
                <p
                  className={`text-2xl font-bold ${avgSleep >= idealSleep ? "text-green-700" : "text-red-700"}`}
                >
                  {avgSleep >= idealSleep ? "+" : ""}
                  {(avgSleep - idealSleep).toFixed(1)}h
                </p>
                <Badge
                  className={`mt-1 text-xs ${avgSleep >= idealSleep ? "bg-green-100 text-green-700 border-green-300" : "bg-red-100 text-red-700 border-red-300"}`}
                >
                  {avgSleep >= idealSleep ? "Surplus" : "Deficit"}
                </Badge>
              </div>
              <Clock className="w-8 h-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sleep Duration Trend */}
      <Card className="bg-white/80 backdrop-blur-md border border-indigo-100">
        <CardHeader>
          <CardTitle className="flex items-center text-indigo-700">
            <Moon className="w-5 h-5 mr-2" />
            Sleep Duration Trends (Last 30 Days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient
                    id="sleepGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                <XAxis
                  dataKey="date"
                  stroke="#4338ca"
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  domain={[0, 12]}
                  stroke="#4338ca"
                  tick={{ fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="hours"
                  stroke="#6366f1"
                  strokeWidth={3}
                  fill="url(#sleepGradient)"
                  name="Hours"
                />
                {/* Ideal sleep line */}
                <Line
                  type="monotone"
                  dataKey={() => idealSleep}
                  stroke="#10b981"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="Ideal (8h)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Sleep Quality vs Duration Scatter */}
      <Card className="bg-white/80 backdrop-blur-md border border-purple-100">
        <CardHeader>
          <CardTitle className="flex items-center text-purple-700">
            <Star className="w-5 h-5 mr-2" />
            Sleep Quality vs Duration Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3e8ff" />
                <XAxis
                  dataKey="hours"
                  name="Duration (hours)"
                  stroke="#7c3aed"
                  tick={{ fontSize: 12 }}
                  domain={[4, 12]}
                />
                <YAxis
                  dataKey="quality"
                  name="Quality"
                  stroke="#7c3aed"
                  tick={{ fontSize: 12 }}
                  domain={[1, 5]}
                />
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-xl border border-purple-200">
                          <p className="font-semibold text-gray-800 mb-2">
                            {data.date}
                          </p>
                          <p className="text-sm text-purple-700">
                            Duration: {data.hours}h
                          </p>
                          <p className="text-sm text-purple-700">
                            Quality: {data.qualityText}
                          </p>
                          <p className="text-sm text-purple-700">
                            Bedtime: {data.bedtime}
                          </p>
                          <p className="text-sm text-purple-700">
                            Wake: {data.wakeTime}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Scatter name="Sleep Sessions" fill="#8b5cf6" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Sleep Debt Analysis */}
      <Card className="bg-white/80 backdrop-blur-md border border-orange-100">
        <CardHeader>
          <CardTitle className="flex items-center text-orange-700">
            <BarChart3 className="w-5 h-5 mr-2" />
            Sleep Debt Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sleepDebtData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#fed7aa" />
                <XAxis
                  dataKey="date"
                  stroke="#c2410c"
                  tick={{ fontSize: 12 }}
                />
                <YAxis stroke="#c2410c" tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="debt"
                  name="Sleep Debt/Surplus"
                  radius={[2, 2, 0, 0]}
                >
                  {sleepDebtData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.debt >= 0 ? "#10b981" : "#ef4444"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Sleep Quality Distribution */}
        <Card className="bg-white/80 backdrop-blur-md border border-pink-100">
          <CardHeader>
            <CardTitle className="flex items-center text-pink-700">
              <Star className="w-5 h-5 mr-2" />
              Sleep Quality Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Sleep Patterns */}
        {weeklyData.length > 1 && (
          <Card className="bg-white/80 backdrop-blur-md border border-green-100">
            <CardHeader>
              <CardTitle className="flex items-center text-green-700">
                <TrendingUp className="w-5 h-5 mr-2" />
                Weekly Sleep Patterns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
                    <XAxis
                      dataKey="week"
                      stroke="#065f46"
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis stroke="#065f46" tick={{ fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="avgHours"
                      stroke="#10b981"
                      strokeWidth={3}
                      name="Avg Hours"
                      dot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="avgQuality"
                      stroke="#f59e0b"
                      strokeWidth={3}
                      name="Avg Quality"
                      dot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SleepChart;
