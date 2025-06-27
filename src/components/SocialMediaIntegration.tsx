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
  Smartphone,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Youtube,
  Video,
  Link,
  Shield,
  Eye,
  BarChart3,
} from "lucide-react";

const SocialMediaIntegration = () => {
  const [connectedAccounts, setConnectedAccounts] = useState<string[]>([]);

  const socialPlatforms = [
    {
      name: "Instagram",
      icon: Instagram,
      colour: "from-pink-500 to-purple-600",
      description: "Track visual content engagement and mood patterns",
      metrics: ["Posting frequency", "Engagement levels", "Content themes"],
    },
    {
      name: "Twitter",
      icon: Twitter,
      colour: "from-blue-400 to-blue-600",
      description: "Analyse communication patterns and sentiment",
      metrics: ["Tweet frequency", "Interaction quality", "Mood indicators"],
    },
    {
      name: "Facebook",
      icon: Facebook,
      colour: "from-blue-600 to-indigo-700",
      description: "Monitor social connections and activity levels",
      metrics: [
        "Social interactions",
        "Group participation",
        "Content sharing",
      ],
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      colour: "from-blue-700 to-blue-800",
      description: "Track professional wellbeing and work-life balance",
      metrics: [
        "Professional activity",
        "Network growth",
        "Career stress indicators",
      ],
    },
    {
      name: "TikTok",
      icon: Video,
      colour: "from-black to-gray-800",
      description: "Understand entertainment patterns and engagement",
      metrics: [
        "Content consumption",
        "Creative expression",
        "Engagement patterns",
      ],
    },
    {
      name: "YouTube",
      icon: Youtube,
      colour: "from-red-500 to-red-600",
      description: "Analyse content consumption and interests",
      metrics: [
        "Watch time patterns",
        "Content preferences",
        "Mood correlation",
      ],
    },
  ];

  const toggleConnection = (platform: string) => {
    if (connectedAccounts.includes(platform)) {
      setConnectedAccounts((prev) => prev.filter((p) => p !== platform));
    } else {
      // Simulate OAuth flow
      alert(
        `Connecting to ${platform}... This would normally redirect to ${platform}'s authorisation page.`,
      );
      setConnectedAccounts((prev) => [...prev, platform]);
    }
  };

  const isConnected = (platform: string) =>
    connectedAccounts.includes(platform);

  return (
    <div className="space-y-6">
      {/* Privacy Notice */}
      <Card className="bg-gradient-to-r from-green-50 to-teal-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-green-500 rounded-full">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-green-800 mb-2">
                Privacy & Security
              </h3>
              <p className="text-sm text-green-700 mb-3">
                Your social media data is processed locally and encrypted. We
                only analyse patterns relevant to mental health insights. You
                maintain full control over your data and can disconnect at any
                time.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-green-100 text-green-700 border-green-300">
                  <Eye className="w-3 h-3 mr-1" />
                  No Personal Data Stored
                </Badge>
                <Badge className="bg-green-100 text-green-700 border-green-300">
                  <Shield className="w-3 h-3 mr-1" />
                  End-to-End Encryption
                </Badge>
                <Badge className="bg-green-100 text-green-700 border-green-300">
                  <Link className="w-3 h-3 mr-1" />
                  Revocable Access
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Connected Accounts Overview */}
      {connectedAccounts.length > 0 && (
        <Card className="bg-white/80 backdrop-blur-md border border-blue-100">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
              Social Health Insights
            </CardTitle>
            <CardDescription>
              Analysis from your connected social media accounts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800">
                  Communication Score
                </h4>
                <p className="text-2xl font-bold text-blue-600">8.2/10</p>
                <p className="text-xs text-blue-600">
                  Above average social engagement
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-800">
                  Positive Sentiment
                </h4>
                <p className="text-2xl font-bold text-green-600">74%</p>
                <p className="text-xs text-green-600">
                  Mostly positive interactions
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium text-purple-800">
                  Activity Balance
                </h4>
                <p className="text-2xl font-bold text-purple-600">Good</p>
                <p className="text-xs text-purple-600">
                  Healthy usage patterns
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Platform Integration Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {socialPlatforms.map((platform) => {
          const Icon = platform.icon;
          const connected = isConnected(platform.name);

          return (
            <Card
              key={platform.name}
              className={`transform hover:scale-105 transition-all duration-300 cursor-pointer border-2 ${
                connected
                  ? "border-green-300 bg-green-50/50"
                  : "border-gray-200 hover:border-blue-300 bg-white/80"
              } backdrop-blur-md`}
              onClick={() => toggleConnection(platform.name)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-3 bg-gradient-to-r ${platform.colour} rounded-full shadow-lg`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {platform.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {platform.description}
                      </p>
                    </div>
                  </div>

                  <Badge
                    className={`${
                      connected
                        ? "bg-green-100 text-green-700 border-green-300"
                        : "bg-gray-100 text-gray-600 border-gray-300"
                    } cursor-pointer hover:scale-105 transition-transform`}
                  >
                    {connected ? "Connected" : "Connect"}
                  </Badge>
                </div>

                {connected && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-700">
                      Tracking Metrics:
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {platform.metrics.map((metric, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-gray-600">• {metric}</span>
                          <Badge variant="outline" className="text-xs">
                            Active
                          </Badge>
                        </div>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        alert(
                          `Viewing detailed analytics for ${platform.name}...`,
                        );
                      }}
                      className="w-full mt-3 hover:bg-blue-50 hover:border-blue-300"
                    >
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Analytics
                    </Button>
                  </div>
                )}

                {!connected && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-700">
                      Will Track:
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {platform.metrics.map((metric, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                          {metric}
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full bg-gradient-to-r ${platform.colour} hover:opacity-90 transform hover:scale-105 transition-all duration-300`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleConnection(platform.name);
                      }}
                    >
                      <Link className="w-4 h-4 mr-2" />
                      Connect {platform.name}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Data Usage Info */}
      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-800 mb-3">
            How We Use Your Social Media Data
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">
                Behavioural Patterns
              </h4>
              <ul className="space-y-1">
                <li>• Posting frequency and timing</li>
                <li>• Engagement levels with others</li>
                <li>• Content themes and interests</li>
                <li>• Communication style changes</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">
                Mental Health Indicators
              </h4>
              <ul className="space-y-1">
                <li>• Social isolation patterns</li>
                <li>• Mood trends in posts</li>
                <li>• Sleep schedule indicators</li>
                <li>• Stress level correlations</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialMediaIntegration;
