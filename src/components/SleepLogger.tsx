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
  Moon,
  Clock,
  Calendar,
  MessageSquare,
  Save,
  Star,
} from "lucide-react";

interface SleepEntry {
  date: string;
  hours: number;
  quality: string;
  bedtime: string;
  wakeTime: string;
  notes: string;
}

interface SleepLoggerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (entry: SleepEntry) => void;
}

const SleepLogger = ({ isOpen, onClose, onSave }: SleepLoggerProps) => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [bedtime, setBedtime] = useState("22:00");
  const [wakeTime, setWakeTime] = useState("07:00");
  const [quality, setQuality] = useState("Good");
  const [notes, setNotes] = useState("");

  const calculateHours = () => {
    const bedDate = new Date(`${date} ${bedtime}`);
    let wakeDate = new Date(`${date} ${wakeTime}`);

    // If wake time is earlier than bedtime, assume it's the next day
    if (wakeDate <= bedDate) {
      wakeDate.setDate(wakeDate.getDate() + 1);
    }

    const diffMs = wakeDate.getTime() - bedDate.getTime();
    const hours = diffMs / (1000 * 60 * 60);
    return Math.round(hours * 10) / 10; // Round to 1 decimal place
  };

  const handleSave = () => {
    const entry: SleepEntry = {
      date,
      hours: calculateHours(),
      quality,
      bedtime,
      wakeTime,
      notes,
    };
    onSave(entry);
    // Reset form
    setDate(new Date().toISOString().split("T")[0]);
    setBedtime("22:00");
    setWakeTime("07:00");
    setQuality("Good");
    setNotes("");
  };

  const qualityOptions = [
    { value: "Excellent", colour: "bg-green-500", stars: 5 },
    { value: "Good", colour: "bg-blue-500", stars: 4 },
    { value: "Fair", colour: "bg-yellow-500", stars: 3 },
    { value: "Poor", colour: "bg-orange-500", stars: 2 },
    { value: "Very Poor", colour: "bg-red-500", stars: 1 },
  ];

  const getQualityColour = (qual: string) => {
    const option = qualityOptions.find((opt) => opt.value === qual);
    return option?.colour || "bg-gray-500";
  };

  const getQualityStars = (qual: string) => {
    const option = qualityOptions.find((opt) => opt.value === qual);
    return option?.stars || 3;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white/95 backdrop-blur-md shadow-2xl border-0 animate-in zoom-in-95 duration-300">
        <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-full">
                <Moon className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold">
                  Sleep Logger
                </CardTitle>
                <CardDescription className="text-indigo-100">
                  Track your sleep patterns
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
              <Calendar className="w-4 h-4 mr-2 text-indigo-600" />
              Sleep Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 border-2 border-indigo-200 rounded-xl focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-300"
            />
          </div>

          {/* Sleep Times */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <Moon className="w-4 h-4 mr-2 text-indigo-600" />
                Bedtime
              </label>
              <input
                type="time"
                value={bedtime}
                onChange={(e) => setBedtime(e.target.value)}
                className="w-full p-3 border-2 border-indigo-200 rounded-xl focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-300"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <Clock className="w-4 h-4 mr-2 text-indigo-600" />
                Wake Time
              </label>
              <input
                type="time"
                value={wakeTime}
                onChange={(e) => setWakeTime(e.target.value)}
                className="w-full p-3 border-2 border-indigo-200 rounded-xl focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-300"
              />
            </div>
          </div>

          {/* Sleep Duration Display */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl border border-indigo-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Total Sleep Duration
              </span>
              <Badge className="bg-indigo-500 text-white text-lg px-4 py-2">
                {calculateHours()} hours
              </Badge>
            </div>
          </div>

          {/* Sleep Quality */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <Star className="w-4 h-4 mr-2 text-indigo-600" />
              Sleep Quality
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {qualityOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setQuality(option.value)}
                  className={`p-3 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                    quality === option.value
                      ? `${option.colour} text-white border-transparent shadow-lg`
                      : "border-gray-200 hover:border-indigo-300 bg-white text-gray-700"
                  }`}
                >
                  <div className="flex flex-col items-center space-y-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < option.stars
                              ? quality === option.value
                                ? "text-yellow-300 fill-current"
                                : "text-yellow-500 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-medium">{option.value}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <MessageSquare className="w-4 h-4 mr-2 text-indigo-600" />
              Sleep Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="How did you sleep? Any factors that affected your rest?"
              className="w-full p-3 border-2 border-indigo-200 rounded-xl focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none resize-none transition-all duration-300"
              rows={3}
            />
          </div>

          {/* Sleep Tips */}
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
            <h4 className="font-medium text-blue-800 mb-2">💡 Sleep Tips</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Aim for 7-9 hours of sleep per night</li>
              <li>• Keep a consistent sleep schedule</li>
              <li>• Avoid screens 1 hour before bedtime</li>
              <li>• Create a calming bedtime routine</li>
            </ul>
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
              className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
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

export default SleepLogger;
