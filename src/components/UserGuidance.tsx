import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  X,
  ArrowRight,
  Lightbulb,
  Heart,
  Moon,
  BarChart3,
  Smartphone,
  Activity,
} from "lucide-react";

interface UserGuidanceProps {
  activeTab: string;
}

const UserGuidance = ({ activeTab }: UserGuidanceProps) => {
  const [showGuidance, setShowGuidance] = useState(true);
  const [currentTip, setCurrentTip] = useState(0);

  const guidanceContent = {
    overview: {
      icon: Lightbulb,
      tips: [
        {
          title: "Welcome to MannChitra! 🌟",
          message:
            "Your mental wellness journey starts here. Begin by logging your current mood to establish a baseline.",
          action: "Log your mood now",
          actionType: "mood",
        },
        {
          title: "Track Your Sleep 💤",
          message:
            "Good sleep is fundamental to mental health. Log last night's sleep to start building patterns.",
          action: "Add sleep data",
          actionType: "sleep",
        },
        {
          title: "Complete Your Profile 📊",
          message:
            "The more data you provide, the better insights we can offer. Consider connecting social media for comprehensive tracking.",
          action: "Connect accounts",
          actionType: "social",
        },
      ],
    },
    mood: {
      icon: Heart,
      tips: [
        {
          title: "Daily Mood Tracking 📈",
          message:
            "Try to log your mood at the same time each day for consistent patterns. Evening reflections work well for most people.",
          action: "Set daily reminder",
          actionType: "settings",
        },
        {
          title: "Be Honest & Specific 💭",
          message:
            "Include notes about what influenced your mood. This helps identify triggers and positive factors.",
          action: "Add detailed notes",
          actionType: "mood",
        },
        {
          title: "Track Multiple Dimensions 🎯",
          message:
            "Don't forget to log energy, anxiety, and social connection levels for a complete picture.",
          action: "Log comprehensive entry",
          actionType: "mood",
        },
      ],
    },
    sleep: {
      icon: Moon,
      tips: [
        {
          title: "Consistent Sleep Schedule 🕒",
          message:
            "Try to maintain regular bedtime and wake times, even on weekends. This helps regulate your circadian rhythm.",
          action: "Set sleep goals",
          actionType: "settings",
        },
        {
          title: "Quality Over Quantity 🌙",
          message:
            "Focus on sleep quality ratings. Poor quality sleep for 8 hours is worse than good quality sleep for 7 hours.",
          action: "Rate sleep quality",
          actionType: "sleep",
        },
        {
          title: "Track Sleep Factors 📝",
          message:
            "Note factors affecting your sleep: caffeine, exercise, screen time, stress levels, or room temperature.",
          action: "Add sleep notes",
          actionType: "sleep",
        },
      ],
    },
    social: {
      icon: Smartphone,
      tips: [
        {
          title: "Connect Mindfully 🔗",
          message:
            "Social media integration helps track communication patterns and social health indicators automatically.",
          action: "Connect platforms",
          actionType: "social",
        },
        {
          title: "Privacy First 🛡️",
          message:
            "Your data is processed securely and locally. We only analyse patterns, never store personal content.",
          action: "Review privacy settings",
          actionType: "settings",
        },
        {
          title: "Balanced Usage 📱",
          message:
            "Monitor your social media usage patterns. Healthy boundaries lead to better mental wellbeing.",
          action: "View usage insights",
          actionType: "analytics",
        },
      ],
    },
    analytics: {
      icon: BarChart3,
      tips: [
        {
          title: "Understand Your Patterns 📊",
          message:
            "Look for correlations between sleep, mood, and social activity. These insights help identify what affects your wellbeing.",
          action: "Explore correlations",
          actionType: "analytics",
        },
        {
          title: "Weekly Reviews 📅",
          message:
            "Check your weekly summary every Sunday to reflect on patterns and plan improvements for the coming week.",
          action: "View weekly summary",
          actionType: "analytics",
        },
        {
          title: "Set Realistic Goals 🎯",
          message:
            "Use your data to set achievable mental health goals. Small, consistent improvements lead to lasting change.",
          action: "Set wellness goals",
          actionType: "settings",
        },
      ],
    },
    activity: {
      icon: Activity,
      tips: [
        {
          title: "Log Daily Activities 📋",
          message:
            "Track exercise, meditation, social interactions, and work stress to understand their impact on your mood.",
          action: "Add activity log",
          actionType: "activity",
        },
        {
          title: "Mindful Moments 🧘",
          message:
            "Record brief mindfulness or gratitude practices. Even 5 minutes of reflection can significantly impact wellbeing.",
          action: "Log mindfulness",
          actionType: "activity",
        },
        {
          title: "Physical Activity Matters 🏃",
          message:
            "Track your exercise and movement. Physical activity has a direct positive impact on mental health.",
          action: "Add exercise log",
          actionType: "activity",
        },
      ],
    },
  };

  const currentGuidance =
    guidanceContent[activeTab as keyof typeof guidanceContent] ||
    guidanceContent.overview;

  useEffect(() => {
    setCurrentTip(0);
    setShowGuidance(true);
  }, [activeTab]);

  const nextTip = () => {
    if (currentTip < currentGuidance.tips.length - 1) {
      setCurrentTip(currentTip + 1);
    } else {
      setCurrentTip(0);
    }
  };

  const handleAction = (actionType: string) => {
    const actions = {
      mood: () =>
        alert("Opening mood tracker... Track your current emotional state!"),
      sleep: () => alert("Opening sleep logger... Record your sleep patterns!"),
      social: () =>
        alert(
          "Opening social media integration... Connect your accounts securely!",
        ),
      analytics: () =>
        alert(
          "Opening analytics dashboard... Explore your mental health insights!",
        ),
      activity: () =>
        alert(
          "Opening activity logger... Track your daily wellness activities!",
        ),
      settings: () =>
        alert("Opening settings... Customise your MannChitra experience!"),
    };

    const action = actions[actionType as keyof typeof actions];
    if (action) action();
  };

  if (!showGuidance) return null;

  const Icon = currentGuidance.icon;
  const tip = currentGuidance.tips[currentTip];

  return (
    <div className="fixed top-24 right-6 z-30 w-80 animate-in slide-in-from-right-4 duration-500">
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-2xl border-0">
        <div className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-white/20 rounded-full">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Guidance</h3>
                <p className="text-xs text-blue-100">
                  Tip {currentTip + 1} of {currentGuidance.tips.length}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowGuidance(false)}
              className="text-white hover:bg-white/20 h-8 w-8 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="mb-4">
            <h4 className="font-medium mb-2">{tip.title}</h4>
            <p className="text-sm text-blue-100 leading-relaxed">
              {tip.message}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={nextTip}
              className="text-white hover:bg-white/20 text-xs"
            >
              Next Tip
              <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleAction(tip.actionType)}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30 text-xs transform hover:scale-105 transition-all duration-300"
            >
              {tip.action}
            </Button>
          </div>

          {/* Progress indicator */}
          <div className="flex space-x-1 mt-3">
            {currentGuidance.tips.map((_, index) => (
              <div
                key={index}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  index === currentTip ? "bg-white" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserGuidance;
