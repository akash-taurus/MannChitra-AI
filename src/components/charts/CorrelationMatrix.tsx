import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Activity, Brain, Heart, TrendingUp, Zap } from "lucide-react";
import {
  MoodEntry,
  SleepEntry,
  calculateCorrelation,
  sleepQualityToNumber,
} from "@/lib/statisticsUtils";

interface CorrelationMatrixProps {
  moodData: MoodEntry[];
  sleepData: SleepEntry[];
}

interface CorrelationData {
  factor1: string;
  factor2: string;
  correlation: number;
  strength: string;
  color: string;
  description: string;
}

const CorrelationMatrix = ({ moodData, sleepData }: CorrelationMatrixProps) => {
  // Prepare aligned data for correlation analysis
  const alignedData = moodData
    .map((moodEntry) => {
      const matchingSleep = sleepData.find(
        (sleepEntry) => sleepEntry.date === moodEntry.date,
      );
      if (!matchingSleep) return null;

      return {
        date: moodEntry.date,
        mood: moodEntry.mood,
        energy: moodEntry.energy,
        anxiety: moodEntry.anxiety,
        social: moodEntry.social,
        sleepHours: matchingSleep.hours,
        sleepQuality: sleepQualityToNumber(matchingSleep.quality),
      };
    })
    .filter(Boolean)
    .slice(0, 30); // Last 30 days with complete data

  if (alignedData.length < 3) {
    return (
      <Card className="bg-white/80 backdrop-blur-md border border-gray-200">
        <CardContent className="p-8 text-center">
          <Brain className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            Insufficient Data
          </h3>
          <p className="text-gray-500">
            Track more mood and sleep data to see correlation analysis. We need
            at least 3 days of complete data.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Extract data arrays for correlation calculations
  const moodValues = alignedData.map((d) => d.mood);
  const energyValues = alignedData.map((d) => d.energy);
  const anxietyValues = alignedData.map((d) => d.anxiety);
  const socialValues = alignedData.map((d) => d.social);
  const sleepHoursValues = alignedData.map((d) => d.sleepHours);
  const sleepQualityValues = alignedData.map((d) => d.sleepQuality);

  // Calculate correlations
  const correlations: CorrelationData[] = [
    {
      factor1: "Sleep Hours",
      factor2: "Mood",
      correlation: calculateCorrelation(sleepHoursValues, moodValues),
      strength: "",
      color: "",
      description: "How sleep duration affects your mood",
    },
    {
      factor1: "Sleep Quality",
      factor2: "Mood",
      correlation: calculateCorrelation(sleepQualityValues, moodValues),
      strength: "",
      color: "",
      description: "How sleep quality impacts your emotional state",
    },
    {
      factor1: "Sleep Hours",
      factor2: "Energy",
      correlation: calculateCorrelation(sleepHoursValues, energyValues),
      strength: "",
      color: "",
      description: "Relationship between sleep and energy levels",
    },
    {
      factor1: "Energy",
      factor2: "Mood",
      correlation: calculateCorrelation(energyValues, moodValues),
      strength: "",
      color: "",
      description: "How energy levels correlate with mood",
    },
    {
      factor1: "Social",
      factor2: "Mood",
      correlation: calculateCorrelation(socialValues, moodValues),
      strength: "",
      color: "",
      description: "Impact of social connections on mood",
    },
    {
      factor1: "Anxiety",
      factor2: "Mood",
      correlation: calculateCorrelation(anxietyValues, moodValues),
      strength: "",
      color: "",
      description: "How anxiety levels relate to overall mood",
    },
    {
      factor1: "Sleep Quality",
      factor2: "Energy",
      correlation: calculateCorrelation(sleepQualityValues, energyValues),
      strength: "",
      color: "",
      description: "How sleep quality affects daily energy",
    },
    {
      factor1: "Social",
      factor2: "Energy",
      correlation: calculateCorrelation(socialValues, energyValues),
      strength: "",
      color: "",
      description: "Social activity impact on energy levels",
    },
  ];

  // Add strength and color based on correlation value
  correlations.forEach((corr) => {
    const absCorr = Math.abs(corr.correlation);
    if (absCorr >= 0.7) {
      corr.strength = "Strong";
      corr.color = corr.correlation > 0 ? "#10b981" : "#ef4444";
    } else if (absCorr >= 0.4) {
      corr.strength = "Moderate";
      corr.color = corr.correlation > 0 ? "#f59e0b" : "#f97316";
    } else {
      corr.strength = "Weak";
      corr.color = "#6b7280";
    }
  });

  // Prepare scatter plot data for significant correlations
  const scatterData = [
    {
      name: "Sleep vs Mood",
      data: alignedData.map((d) => ({
        x: d.sleepHours,
        y: d.mood,
        date: d.date,
      })),
      xLabel: "Sleep Hours",
      yLabel: "Mood Score",
      correlation:
        correlations.find(
          (c) => c.factor1 === "Sleep Hours" && c.factor2 === "Mood",
        )?.correlation || 0,
    },
    {
      name: "Energy vs Mood",
      data: alignedData.map((d) => ({ x: d.energy, y: d.mood, date: d.date })),
      xLabel: "Energy Level",
      yLabel: "Mood Score",
      correlation:
        correlations.find((c) => c.factor1 === "Energy" && c.factor2 === "Mood")
          ?.correlation || 0,
    },
  ];

  const getCorrelationIcon = (factor1: string, factor2: string) => {
    if (factor1.includes("Sleep") || factor2.includes("Sleep")) return Brain;
    if (factor1.includes("Energy") || factor2.includes("Energy")) return Zap;
    if (factor1.includes("Social") || factor2.includes("Social")) return Heart;
    return Activity;
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-xl border border-purple-200">
          <p className="font-semibold text-gray-800 mb-2">
            {new Date(data.date).toLocaleDateString("en-GB")}
          </p>
          <p className="text-sm text-purple-700">X: {data.x}</p>
          <p className="text-sm text-purple-700">Y: {data.y}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Correlation Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {correlations.slice(0, 4).map((corr, index) => {
          const Icon = getCorrelationIcon(corr.factor1, corr.factor2);
          return (
            <Card
              key={index}
              className="bg-white/80 backdrop-blur-md border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <Icon className="w-6 h-6 text-purple-600" />
                  <Badge
                    className="text-xs"
                    style={{
                      backgroundColor: `${corr.color}20`,
                      color: corr.color,
                      borderColor: corr.color,
                    }}
                  >
                    {corr.strength}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-800">
                    {corr.factor1} → {corr.factor2}
                  </p>
                  <p className="text-xs text-gray-600">{corr.description}</p>
                  <div className="flex items-center justify-between">
                    <span
                      className="text-lg font-bold"
                      style={{ color: corr.color }}
                    >
                      {corr.correlation >= 0 ? "+" : ""}
                      {corr.correlation.toFixed(2)}
                    </span>
                    <div className="flex items-center">
                      <TrendingUp
                        className={`w-4 h-4 ${corr.correlation > 0 ? "text-green-600" : "text-red-600 rotate-180"}`}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Correlation Matrix Heatmap */}
      <Card className="bg-white/80 backdrop-blur-md border border-purple-100">
        <CardHeader>
          <CardTitle className="flex items-center text-purple-700">
            <Brain className="w-5 h-5 mr-2" />
            Correlation Strength Matrix
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {correlations.map((corr, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-gray-800">
                      {corr.factor1}
                    </span>
                    <span className="text-gray-500">↔</span>
                    <span className="font-medium text-gray-800">
                      {corr.factor2}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">{corr.description}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge
                    className="text-xs"
                    style={{
                      backgroundColor: `${corr.color}20`,
                      color: corr.color,
                      borderColor: corr.color,
                    }}
                  >
                    {corr.strength}
                  </Badge>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.abs(corr.correlation) * 100}%`,
                        backgroundColor: corr.color,
                      }}
                    />
                  </div>
                  <span
                    className="text-sm font-bold w-12 text-right"
                    style={{ color: corr.color }}
                  >
                    {corr.correlation >= 0 ? "+" : ""}
                    {corr.correlation.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Scatter Plot Analysis */}
      <div className="grid md:grid-cols-2 gap-6">
        {scatterData.map((scatter, index) => (
          <Card
            key={index}
            className="bg-white/80 backdrop-blur-md border border-blue-100"
          >
            <CardHeader>
              <CardTitle className="flex items-center text-blue-700">
                <Activity className="w-5 h-5 mr-2" />
                {scatter.name} Relationship
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Badge
                  className={`text-xs ${
                    Math.abs(scatter.correlation) >= 0.7
                      ? "bg-green-100 text-green-700 border-green-300"
                      : Math.abs(scatter.correlation) >= 0.4
                        ? "bg-yellow-100 text-yellow-700 border-yellow-300"
                        : "bg-gray-100 text-gray-700 border-gray-300"
                  }`}
                >
                  r = {scatter.correlation.toFixed(2)}
                </Badge>
                <span className="text-xs text-gray-600">
                  {Math.abs(scatter.correlation) >= 0.7
                    ? "Strong"
                    : Math.abs(scatter.correlation) >= 0.4
                      ? "Moderate"
                      : "Weak"}{" "}
                  correlation
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart data={scatter.data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                    <XAxis
                      dataKey="x"
                      name={scatter.xLabel}
                      stroke="#3730a3"
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis
                      dataKey="y"
                      name={scatter.yLabel}
                      stroke="#3730a3"
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Scatter
                      name={scatter.name}
                      fill="#6366f1"
                      fillOpacity={0.7}
                    >
                      {scatter.data.map((entry, idx) => (
                        <Cell
                          key={`cell-${idx}`}
                          fill={`hsl(${240 + (entry.y / 10) * 120}, 70%, 50%)`}
                        />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Insights Panel */}
      <Card className="bg-white/80 backdrop-blur-md border border-green-100">
        <CardHeader>
          <CardTitle className="flex items-center text-green-700">
            <TrendingUp className="w-5 h-5 mr-2" />
            Correlation Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-800">
                Strongest Positive Correlations
              </h4>
              {correlations
                .filter((c) => c.correlation > 0.3)
                .sort((a, b) => b.correlation - a.correlation)
                .slice(0, 3)
                .map((corr, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg"
                  >
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-green-800">
                        {corr.factor1} → {corr.factor2}
                      </p>
                      <p className="text-xs text-green-600">
                        +{corr.correlation.toFixed(2)} correlation strength
                      </p>
                    </div>
                  </div>
                ))}
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-800">Areas for Attention</h4>
              {correlations
                .filter((c) => c.correlation < -0.2)
                .sort((a, b) => a.correlation - b.correlation)
                .slice(0, 3)
                .map((corr, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg"
                  >
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-orange-800">
                        {corr.factor1} → {corr.factor2}
                      </p>
                      <p className="text-xs text-orange-600">
                        {corr.correlation.toFixed(2)} negative correlation
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-800 mb-2">
              💡 Understanding Correlations
            </h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>
                • <strong>Strong (±0.7 to ±1.0):</strong> Very predictable
                relationship
              </li>
              <li>
                • <strong>Moderate (±0.4 to ±0.7):</strong> Noticeable
                relationship
              </li>
              <li>
                • <strong>Weak (±0.0 to ±0.4):</strong> Little to no predictable
                relationship
              </li>
              <li>
                • <strong>Positive:</strong> Both factors tend to increase
                together
              </li>
              <li>
                • <strong>Negative:</strong> One increases as the other
                decreases
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CorrelationMatrix;
