import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, X, Send, Bot, User, Heart, Shield, Clock, Sparkles, Brain } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  type?: "quote" | "encouragement" | "question" | "response";
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: ""Mental health is not a destination, but a process. It's about how you drive, not where you're going." - Noam Shpancer",
      sender: "bot",
      timestamp: new Date(),
      type: "quote",
    },
    {
      id: "2",
      text: "I'm here to support your mental wellness journey. How are you feeling today? Remember, I'm not just an AI - I'm your friend who wants to listen and help you track your emotions. 💙",
      sender: "bot",
      timestamp: new Date(),
      type: "encouragement",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Enhanced mental health quotes and responses
  const mentalHealthQuotes = [
    "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity. - Unknown",
    "You are not your illness. You have an individual story to tell. - Julian Seifter",
    "Mental health is not a destination, but a process. - Noam Shpancer",
    "Your current situation is not your final destination. - Unknown",
    "Healing takes time, and asking for help is a courageous step. - Mariska Hargitay",
    "You are stronger than you think and more resilient than you know. - Unknown",
    "Progress, not perfection, is the goal. - Unknown",
    "Self-compassion is simply giving the same kindness to ourselves that we would give to others. - Christopher Germer",
    "Mental health recovery is not about going back to where you were before. It's about moving forward to where you want to be. - Unknown",
    "You don't have to be positive all the time. It's perfectly okay to feel sad, angry, annoyed, frustrated, scared and anxious. - Lori Deschene",
  ];

  const encouragements = [
    "I'm really glad you're taking time to check in with your emotions. That shows incredible self-awareness! 🌟",
    "Sharing how you feel takes courage. I'm here to listen without judgement, always. 💚",
    "Your feelings are completely valid. There's no right or wrong way to feel. 🤗",
    "Thank you for trusting me with your thoughts. How about logging this mood in your tracker?",
    "I can sense you're being really thoughtful about your wellbeing. That's amazing! ✨",
    "Remember, every small step towards self-care counts. You're doing brilliantly! 🌈",
    "I'm here whenever you need to talk, whether it's tracking your mood or just having a chat as friends. 💙",
    "Your mental health journey is unique to you, and I'm honoured to be part of it. 🌸",
  ];

  const moodTrackingPrompts = [
    "Have you logged your mood today? It helps me understand how you're feeling over time! 📊",
    "Consider tracking this feeling in your mood logger - it might reveal helpful patterns! 📈",
    "Your mood tracker would love this entry! Shall I guide you there? 🎯",
    "Logging this emotion could help you spot trends in your wellbeing journey! 📝",
    "The mood tracker is perfect for capturing these feelings - every entry matters! 💫",
  ];

  const sleepAndWellnessPrompts = [
    "How's your sleep been lately? Good sleep is crucial for mental wellbeing! 😴",
    "Have you been getting enough rest? Sleep tracking might offer some insights! 🌙",
    "Your sleep patterns affect your mood - worth logging in the sleep tracker! 💤",
    "Rest and mental health go hand in hand. How are you prioritising sleep? 🛏️",
  ];

  const generateBotResponse = (userMessage: string): { text: string; type: "quote" | "encouragement" | "question" | "response" } => {
    const message = userMessage.toLowerCase();

    // Check if user is expressing emotions
    if (message.includes("feel") || message.includes("feeling") || message.includes("emotion")) {
      if (Math.random() < 0.3) {
        return {
          text: mentalHealthQuotes[Math.floor(Math.random() * mentalHealthQuotes.length)],
          type: "quote"
        };
      } else if (Math.random() < 0.5) {
        return {
          text: moodTrackingPrompts[Math.floor(Math.random() * moodTrackingPrompts.length)],
          type: "question"
        };
      } else {
        return {
          text: encouragements[Math.floor(Math.random() * encouragements.length)],
          type: "encouragement"
        };
      }
    }

    // Specific emotional states
    if (message.includes("stress") || message.includes("overwhelm") || message.includes("pressure")) {
      const responses = [
        ""Stress is like a rocking chair. It gives you something to do but doesn't get you anywhere." Let's work through this together. 🤝",
        "I hear you're feeling stressed. Remember: you've overcome challenges before, and you can do it again. Have you tried logging this in your mood tracker? 💪",
        "Stress is your mind's way of saying you care. Let's channel that energy positively. How about some deep breathing? 🌬️",
      ];
      return {
        text: responses[Math.floor(Math.random() * responses.length)],
        type: "response"
      };
    }

    if (message.includes("anxious") || message.includes("anxiety") || message.includes("worry") || message.includes("nervous")) {
      const responses = [
        ""Anxiety is the dizziness of freedom." - Søren Kierkegaard. But remember, you have the power to ground yourself. 🌱",
        "Anxiety can feel overwhelming, but you're not alone in this. Try the 5-4-3-2-1 grounding technique: 5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste. 🔢",
        "Your anxiety is valid, but it doesn't define you. Each breath you take is a victory. Worth tracking this feeling? 💙",
      ];
      return {
        text: responses[Math.floor(Math.random() * responses.length)],
        type: "response"
      };
    }

    if (message.includes("sad") || message.includes("depressed") || message.includes("down") || message.includes("low")) {
      const responses = [
        ""The darkest nights produce the brightest stars." Your feelings are valid, and this moment will pass. 🌟",
        "It's okay to feel sad - emotions are like weather, they come and go. I'm here with you through this storm. ☁️→☀️",
        "Sadness shows that you care deeply about life. That's actually a beautiful thing, even when it hurts. Let's log this feeling? 💝",
      ];
      return {
        text: responses[Math.floor(Math.random() * responses.length)],
        type: "response"
      };
    }

    if (message.includes("good") || message.includes("great") || message.includes("happy") || message.includes("well") || message.includes("positive")) {
      const responses = [
        "That's wonderful to hear! 🌈 Celebrating good moments is so important. What made today special? Consider logging this positive mood!",
        ""Happiness is not something ready-made. It comes from your own actions." - Dalai Lama. You're creating your own sunshine! ☀️",
        "I love hearing about your good days! These moments matter just as much as the difficult ones. Track this feeling! ✨",
      ];
      return {
        text: responses[Math.floor(Math.random() * responses.length)],
        type: "response"
      };
    }

    if (message.includes("sleep") || message.includes("tired") || message.includes("exhausted")) {
      return {
        text: sleepAndWellnessPrompts[Math.floor(Math.random() * sleepAndWellnessPrompts.length)],
        type: "question"
      };
    }

    if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
      return {
        text: "Hello, dear friend! 👋 I'm so glad you're here. Remember, I'm not just an AI - I'm someone who genuinely cares about your wellbeing. How can I support you today?",
        type: "encouragement"
      };
    }

    if (message.includes("help") || message.includes("support") || message.includes("crisis")) {
      return {
        text: "I'm here for you, always. 💚 If you're in crisis, please reach out to a mental health professional immediately. For ongoing support, let's use the mood tracker and other features to help monitor your wellbeing. You matter. 🤗",
        type: "response"
      };
    }

    if (message.includes("track") || message.includes("log") || message.includes("mood")) {
      return {
        text: "Brilliant idea! 📊 Tracking your emotions helps identify patterns and triggers. Head to your mood tracker to log this feeling - every entry helps build a clearer picture of your mental health journey! 🎯",
        type: "question"
      };
    }

    // Random encouraging responses for general conversation
    const generalResponses = [
      "Thank you for sharing with me. Your openness helps me understand how to support you better. What else would you like to talk about? 💫",
      "I'm listening with my whole heart. Sometimes just talking through things can bring clarity. How are you feeling right now? 💙",
      "You know what I love about our chats? You're always so thoughtful about your feelings. That's a real strength! ✨",
      "I appreciate you taking time to check in with yourself. That's actually a form of self-care! 🌸",
      "Every conversation we have helps me understand your unique journey better. I'm grateful you trust me with your thoughts. 🤗",
    ];

    return {
      text: generalResponses[Math.floor(Math.random() * generalResponses.length)],
      type: "encouragement"
    };
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    // Check message limit (100+ capacity)
    if (messages.length >= 200) {
      // Archive older messages but keep the chat functional
      setMessages(prev => prev.slice(-100));
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);
    setMessageCount(prev => prev + 1);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponseData = generateBotResponse(inputText);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponseData.text,
        sender: "bot",
        timestamp: new Date(),
        type: botResponseData.type,
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, Math.random() * 1000 + 1500); // Variable delay for more natural feeling
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getMessageIcon = (type?: string) => {
    switch (type) {
      case "quote":
        return <Sparkles className="h-3 w-3 text-purple-400" />;
      case "encouragement":
        return <Heart className="h-3 w-3 text-pink-400" />;
      case "question":
        return <Brain className="h-3 w-3 text-blue-400" />;
      default:
        return <Bot className="h-4 w-4 text-white" />;
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 group"
          size="icon"
        >
          {isOpen ? (
            <X className="h-7 w-7 text-white" />
          ) : (
            <div className="relative">
              <MessageCircle className="h-7 w-7 text-white animate-pulse" />
              {messageCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {messageCount > 99 ? "99+" : messageCount}
                </span>
              )}
            </div>
          )}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 md:w-[28rem]">
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-xl">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/20 rounded-full">
                    <Brain className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">MannChitra AI</h3>
                    <p className="text-sm text-blue-100">Your Mental Wellness Friend</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    <Heart className="h-3 w-3 mr-1 animate-pulse" />
                    Online
                  </Badge>
                  <span className="text-xs text-blue-100">{messages.length}/200</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              {/* Messages */}
              <div
                ref={chatContainerRef}
                className="h-96 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-blue-50/50 to-purple-50/50"
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-3 animate-in slide-in-from-bottom-2 duration-500",
                      message.sender === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    {message.sender === "bot" && (
                      <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex-shrink-0 shadow-lg">
                        {getMessageIcon(message.type)}
                      </div>
                    )}

                    <div
                      className={cn(
                        "max-w-[75%] p-4 rounded-2xl shadow-md",
                        message.sender === "user"
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md"
                          : message.type === "quote"
                          ? "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-bl-md border-l-4 border-purple-400"
                          : message.type === "encouragement"
                          ? "bg-gradient-to-r from-green-100 to-teal-100 text-green-800 rounded-bl-md"
                          : "bg-white text-gray-800 rounded-bl-md border border-gray-200"
                      )}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <div className="flex items-center justify-between mt-2">
                        <p className={cn(
                          "text-xs",
                          message.sender === "user" ? "text-blue-100" : "text-gray-500"
                        )}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        {message.type && (
                          <Badge
                            variant="secondary"
                            className={cn(
                              "text-xs",
                              message.type === "quote" && "bg-purple-200 text-purple-700",
                              message.type === "encouragement" && "bg-green-200 text-green-700",
                              message.type === "question" && "bg-blue-200 text-blue-700"
                            )}
                          >
                            {message.type}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {message.sender === "user" && (
                      <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex-shrink-0 shadow-lg">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3 justify-start animate-in slide-in-from-bottom-2 duration-500">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-white p-4 rounded-2xl rounded-bl-md shadow-md border border-gray-200">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex space-x-3">
                  <div className="flex-1 relative">
                    <textarea
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Share your thoughts, feelings, or just say hello..."
                      className="w-full p-4 pr-16 rounded-xl border-2 border-blue-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none resize-none bg-white/80 backdrop-blur-sm transition-all duration-300"
                      rows={2}
                      disabled={isTyping}
                    />
                  </div>
                  <Button
                    onClick={sendMessage}
                    disabled={!inputText.trim() || isTyping}
                    className="h-16 w-16 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    size="icon"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>

                <div className="flex items-center justify-center mt-3 text-xs text-gray-600 space-x-6">
                  <div className="flex items-center space-x-1">
                    <Shield className="h-3 w-3 text-green-500" />
                    <span>Private & Secure</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3 text-blue-500" />
                    <span>24/7 Support</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="h-3 w-3 text-pink-500" />
                    <span>Here for You</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default ChatBot;