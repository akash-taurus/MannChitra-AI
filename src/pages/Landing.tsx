import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  ArrowRight,
  Sparkles,
  Heart,
  Shield,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-48 h-48 bg-purple-200/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-32 w-24 h-24 bg-indigo-200/40 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 container mx-auto px-4 py-8">
        <nav className="flex items-center justify-between">
          <div
            className="flex items-center space-x-3 cursor-pointer transform hover:scale-105 transition-all duration-300"
            onClick={() => window.location.reload()}
          >
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MannChitra
              </h1>
              <p className="text-xs text-blue-600 font-medium">
                AI Mental Health Support
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Button
              variant="ghost"
              className="hover:bg-blue-100 hover:text-blue-700 transition-all duration-300 hover:scale-105"
              onClick={() =>
                alert(
                  "About MannChitra: Pioneering AI-powered mental health solutions for India",
                )
              }
            >
              About
            </Button>
            <Button
              variant="ghost"
              className="hover:bg-blue-100 hover:text-blue-700 transition-all duration-300 hover:scale-105"
              onClick={() =>
                alert(
                  "Contact: support@mannchitra.ai | 24/7 Helpline: 1800-WELLNESS",
                )
              }
            >
              Contact
            </Button>
            <Button
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={handleGetStarted}
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Badge */}
          <Badge
            className="mb-6 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-200 hover:scale-105 transition-all duration-300 cursor-pointer px-6 py-2"
            onClick={() =>
              alert(
                "AI-Powered Mental Health Detection for India - Leading the way in mental wellness technology",
              )
            }
          >
            <Sparkles className="w-4 h-4 mr-2" />
            AI Mental Health Support - India
          </Badge>

          {/* Hero Title */}
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              MannChitra
            </span>
            <br />
            <span className="text-4xl md:text-5xl text-gray-700">
              Your Mental Wellness Companion
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
            Advanced AI system that monitors multiple indicators to detect early
            signs of mental health issues, ensuring privacy whilst providing
            timely interventions and personalised support for your wellbeing
            journey.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-12 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              onClick={handleGetStarted}
            >
              <Brain className="mr-3 h-6 w-6" />
              Start Your Journey
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-blue-300 text-blue-700 hover:bg-blue-50 px-12 py-4 text-lg font-semibold rounded-xl hover:border-blue-400 transform hover:scale-105 transition-all duration-300"
              onClick={() => navigate("/dashboard")}
            >
              Explore Features
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card
              className="bg-white/80 backdrop-blur-sm border-blue-200 hover:border-blue-300 transition-all duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer"
              onClick={() =>
                alert(
                  "Privacy First: End-to-end encryption and GDPR compliance ensure your data stays secure",
                )
              }
            >
              <CardContent className="p-8 text-center">
                <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-fit mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Privacy First
                </h3>
                <p className="text-gray-600">
                  Your data is protected with enterprise-grade security and
                  complete confidentiality
                </p>
              </CardContent>
            </Card>

            <Card
              className="bg-white/80 backdrop-blur-sm border-purple-200 hover:border-purple-300 transition-all duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer"
              onClick={() =>
                alert(
                  "AI-Powered Insights: Machine learning algorithms analyse patterns for early detection",
                )
              }
            >
              <CardContent className="p-8 text-center">
                <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full w-fit mx-auto mb-4">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  AI-Powered Insights
                </h3>
                <p className="text-gray-600">
                  Advanced algorithms provide personalised recommendations for
                  your mental wellbeing
                </p>
              </CardContent>
            </Card>

            <Card
              className="bg-white/80 backdrop-blur-sm border-pink-200 hover:border-pink-300 transition-all duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer"
              onClick={() =>
                alert(
                  "24/7 Support: Professional mental health support available round the clock",
                )
              }
            >
              <CardContent className="p-8 text-center">
                <div className="p-4 bg-gradient-to-r from-pink-500 to-red-600 rounded-full w-fit mx-auto mb-4">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  24/7 Support
                </h3>
                <p className="text-gray-600">
                  Round-the-clock assistance with qualified mental health
                  professionals
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Bottom CTA */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white shadow-2xl">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Mental Health Journey?
            </h2>
            <p className="text-xl mb-6 text-blue-100">
              Join thousands of users who trust MannChitra for their mental
              wellness
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg font-semibold rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg"
              onClick={handleGetStarted}
            >
              <Users className="mr-2 h-5 w-5" />
              Join MannChitra Today
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-gray-600">
        <p
          className="cursor-pointer hover:text-blue-600 transition-colors duration-300"
          onClick={() =>
            alert(
              "© 2024 MannChitra. Revolutionising mental healthcare in India. All rights reserved.",
            )
          }
        >
          © 2024 MannChitra. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Landing;
