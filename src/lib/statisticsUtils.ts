export interface MoodEntry {
  date: string;
  mood: number;
  energy: number;
  anxiety: number;
  social: number;
  notes: string;
}

export interface SleepEntry {
  date: string;
  hours: number;
  quality: string;
  bedtime: string;
  wakeTime: string;
  notes: string;
}

export interface TrendData {
  date: string;
  value: number;
  trend: "up" | "down" | "stable";
}

export interface CorrelationData {
  factor1: string;
  factor2: string;
  correlation: number;
  strength: "weak" | "moderate" | "strong";
}

// Calculate moving average for trend analysis
export const calculateMovingAverage = (
  data: number[],
  windowSize: number = 7,
): number[] => {
  const result: number[] = [];
  for (let i = 0; i < data.length; i++) {
    const start = Math.max(0, i - windowSize + 1);
    const window = data.slice(start, i + 1);
    const average = window.reduce((sum, val) => sum + val, 0) / window.length;
    result.push(Math.round(average * 100) / 100);
  }
  return result;
};

// Calculate correlation between two datasets
export const calculateCorrelation = (x: number[], y: number[]): number => {
  if (x.length !== y.length || x.length === 0) return 0;

  const n = x.length;
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((total, xi, i) => total + xi * y[i], 0);
  const sumXX = x.reduce((total, xi) => total + xi * xi, 0);
  const sumYY = y.reduce((total, yi) => total + yi * yi, 0);

  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt(
    (n * sumXX - sumX * sumX) * (n * sumYY - sumY * sumY),
  );

  return denominator === 0 ? 0 : numerator / denominator;
};

// Calculate trend direction
export const calculateTrend = (
  current: number,
  previous: number,
): "up" | "down" | "stable" => {
  const difference = current - previous;
  if (Math.abs(difference) < 0.1) return "stable";
  return difference > 0 ? "up" : "down";
};

// Generate weekly summary statistics
export const generateWeeklySummary = (
  moodData: MoodEntry[],
  sleepData: SleepEntry[],
) => {
  const recentMood = moodData.slice(0, 7);
  const recentSleep = sleepData.slice(0, 7);

  const avgMood =
    recentMood.length > 0
      ? recentMood.reduce((sum, entry) => sum + entry.mood, 0) /
        recentMood.length
      : 0;

  const avgEnergy =
    recentMood.length > 0
      ? recentMood.reduce((sum, entry) => sum + entry.energy, 0) /
        recentMood.length
      : 0;

  const avgAnxiety =
    recentMood.length > 0
      ? recentMood.reduce((sum, entry) => sum + entry.anxiety, 0) /
        recentMood.length
      : 0;

  const avgSocial =
    recentMood.length > 0
      ? recentMood.reduce((sum, entry) => sum + entry.social, 0) /
        recentMood.length
      : 0;

  const avgSleep =
    recentSleep.length > 0
      ? recentSleep.reduce((sum, entry) => sum + entry.hours, 0) /
        recentSleep.length
      : 0;

  return {
    mood: Math.round(avgMood * 10) / 10,
    energy: Math.round(avgEnergy * 10) / 10,
    anxiety: Math.round(avgAnxiety * 10) / 10,
    social: Math.round(avgSocial * 10) / 10,
    sleep: Math.round(avgSleep * 10) / 10,
  };
};

// Sleep quality to numeric conversion
export const sleepQualityToNumber = (quality: string): number => {
  const qualityMap: { [key: string]: number } = {
    Excellent: 5,
    Good: 4,
    Fair: 3,
    Poor: 2,
    "Very Poor": 1,
  };
  return qualityMap[quality] || 3;
};

// Generate pattern insights
export const generateInsights = (
  moodData: MoodEntry[],
  sleepData: SleepEntry[],
): string[] => {
  const insights: string[] = [];

  if (moodData.length >= 7 && sleepData.length >= 7) {
    const recentMoodAvg =
      moodData.slice(0, 7).reduce((sum, entry) => sum + entry.mood, 0) / 7;
    const recentSleepAvg =
      sleepData.slice(0, 7).reduce((sum, entry) => sum + entry.hours, 0) / 7;

    if (recentMoodAvg >= 7) {
      insights.push(
        "Your mood has been consistently positive this week! Keep up the good work.",
      );
    } else if (recentMoodAvg <= 4) {
      insights.push(
        "Your mood has been lower recently. Consider reaching out for support if needed.",
      );
    }

    if (recentSleepAvg >= 7.5) {
      insights.push(
        "Excellent sleep patterns! Good sleep is contributing to your wellbeing.",
      );
    } else if (recentSleepAvg <= 6) {
      insights.push(
        "Consider improving your sleep routine. Better sleep often leads to improved mood.",
      );
    }

    // Calculate correlation between sleep and mood
    const moodValues = moodData
      .slice(0, Math.min(moodData.length, sleepData.length))
      .map((entry) => entry.mood);
    const sleepValues = sleepData
      .slice(0, Math.min(moodData.length, sleepData.length))
      .map((entry) => entry.hours);

    const correlation = calculateCorrelation(sleepValues, moodValues);
    if (correlation > 0.5) {
      insights.push(
        "Strong positive correlation between your sleep and mood detected!",
      );
    } else if (correlation < -0.5) {
      insights.push(
        "There seems to be a negative correlation between sleep and mood. Let's explore this further.",
      );
    }
  }

  return insights;
};

// Generate color based on value and range
export const getValueColor = (
  value: number,
  type: "mood" | "sleep" | "energy" | "anxiety" | "social",
): string => {
  switch (type) {
    case "mood":
    case "energy":
    case "social":
      if (value >= 8) return "#10b981"; // green
      if (value >= 6) return "#f59e0b"; // yellow
      if (value >= 4) return "#f97316"; // orange
      return "#ef4444"; // red

    case "anxiety":
      if (value <= 3) return "#10b981"; // green (low anxiety is good)
      if (value <= 5) return "#f59e0b"; // yellow
      if (value <= 7) return "#f97316"; // orange
      return "#ef4444"; // red (high anxiety)

    case "sleep":
      if (value >= 7.5) return "#10b981"; // green
      if (value >= 6.5) return "#f59e0b"; // yellow
      if (value >= 5.5) return "#f97316"; // orange
      return "#ef4444"; // red

    default:
      return "#6b7280"; // gray
  }
};
