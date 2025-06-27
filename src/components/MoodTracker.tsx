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
  X,
  Heart,
  Calendar,
  MessageSquare,
  Save,
  Smile,
  Frown,
  Meh,
} from "lucide-react";

interface MoodEntry {
  date: string;
  mood: number;
  notes: string;
  energy: number;
  anxiety: number;
  social: number;
}

interface MoodTrackerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (entry: MoodEntry) => void;
}

const MoodTracker = ({ isOpen, onClose, onSave }: MoodTrackerProps) => {
  const [mood, setMood] = useState(5);
  const [energy, setEnergy] = useState(5);
  const [anxiety, setAnxiety] = useState(5);
  const [social, setSocial] = useState(5);
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const handleSave = () => {
    const entry: MoodEntry = {
      date,
      mood,
      notes,
      energy,
      anxiety,
      social,
    };
    onSave(entry);
    // Reset form
    setMood(5);
    setEnergy(5);
    setAnxiety(5);
    setSocial(5);
    setNotes("");
    setDate(new Date().toISOString().split("T")[0]);
  };

  const getMoodEmoji = (value: number) => {
    if (value >= 8) return "😊";
    if (value >= 6) return "🙂";
    if (value >= 4) return "😐";
    if (value >= 2) return "😕";
    return "😢";
  };

  const getMoodColour = (value: number) => {
    if (value >= 8) return "text-green-600";
    if (value >= 6) return "text-yellow-600";
    if (value >= 4) return "text-orange-600";
    return "text-red-600";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white/95 backdrop-blur-md shadow-2xl border-0 animate-in zoom-in-95 duration-300">
        <CardHeader className="bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-t-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-full">
                <Heart className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold">
                  Mood Tracker
                </CardTitle>
                <CardDescription className="text-pink-100">
                  Log your emotional wellbeing
                </CardDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Date Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-pink-600" />
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 border-2 border-pink-200 rounded-xl focus:border-pink-400 focus:ring-4 focus:ring-pink-100 outline-none transition-all duration-300"
            />
          </div>

          {/* Overall Mood */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700 flex items-center justify-between">
              <span className="flex items-center">
                <Heart className="w-4 h-4 mr-2 text-pink-600" />
                Overall Mood
              </span>
              <Badge
                className={`${getMoodColour(mood)} bg-transparent border-current text-lg`}
              >
                {getMoodEmoji(mood)} {mood}/10
              </Badge>
            </label>
            <div className="relative">
              <input
                type="range"
                min="1"
                max="10"
                value={mood}
                onChange={(e) => setMood(Number(e.target.value))}
                className="w-full h-3 bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-4 focus:ring-pink-100"
                style={{
                  background: `linear-gradient(to right, #fca5a5 0%, #fde047 50%, #86efac 100%)`,
                }}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Very Low</span>
                <span>Neutral</span>
                <span>Excellent</span>
              </div>
            </div>
          </div>

          {/* Energy Level */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700 flex items-center justify-between">
              <span>Energy Level</span>
              <Badge
                variant="outline"
                className="text-blue-600 border-blue-300"
              >
                {energy}/10
              </Badge>
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={energy}
              onChange={(e) => setEnergy(Number(e.target.value))}
              className="w-full h-3 bg-gradient-to-r from-blue-200 to-blue-400 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-100"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Exhausted</span>
              <span>Energised</span>
            </div>
          </div>

          {/* Anxiety Level */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700 flex items-center justify-between">
              <span>Anxiety Level</span>
              <Badge
                variant="outline"
                className="text-purple-600 border-purple-300"
              >
                {anxiety}/10
              </Badge>
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={anxiety}
              onChange={(e) => setAnxiety(Number(e.target.value))}
              className="w-full h-3 bg-gradient-to-r from-green-200 to-red-300 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-4 focus:ring-purple-100"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Calm</span>
              <span>Very Anxious</span>
            </div>
          </div>

          {/* Social Connection */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700 flex items-center justify-between">
              <span>Social Connection</span>
              <Badge
                variant="outline"
                className="text-green-600 border-green-300"
              >
                {social}/10
              </Badge>
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={social}
              onChange={(e) => setSocial(Number(e.target.value))}
              className="w-full h-3 bg-gradient-to-r from-orange-200 to-green-300 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-4 focus:ring-green-100"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Isolated</span>
              <span>Well Connected</span>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <MessageSquare className="w-4 h-4 mr-2 text-pink-600" />
              Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="How are you feeling today? What contributed to your mood?"
              className="w-full p-3 border-2 border-pink-200 rounded-xl focus:border-pink-400 focus:ring-4 focus:ring-pink-100 outline-none resize-none transition-all duration-300"
              rows={3}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-gray-300 hover:bg-gray-50 transform hover:scale-105 transition-all duration-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 transform hover:scale-105 transition-all duration-300"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Entry
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MoodTracker;
