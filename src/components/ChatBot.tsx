import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Heart,
  Shield,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm MannChitra's AI assistant. I'm here to support your mental wellness journey. How are you feeling today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const mentalHealthResponses = {
    greeting: [
      "Hello! I'm here to listen and support you. What's on your mind today?",
      "Hi there! How are you feeling right now? I'm here to help.",
      "Welcome! I'm glad you're here. How can I support your wellness today?",
    ],
    stress: [
      "I understand you're feeling stressed. Let's try some deep breathing together. Breathe in for 4 counts, hold for 4, and out for 4. 🌸",
      "Stress can feel overwhelming. Remember, you're not alone. Would you like to try a quick mindfulness exercise?",
      "It's completely normal to feel stressed sometimes. What's one small thing that usually helps you feel calmer?",
    ],
    anxiety: [
      "Anxiety can be really challenging. Remember: this feeling is temporary and you are safe right now. ✨",
      "When anxiety hits, try the 5-4-3-2-1 technique: Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.",
      "Your feelings are valid. Anxiety is your mind trying to protect you, but you're safe right now. Take it one breath at a time.",
    ],
    sad: [
      "I hear that you're feeling sad. It's okay to feel this way - emotions are temporary visitors. 💙",
      "Sadness is a natural part of being human. Would you like to talk about what's making you feel this way?",
      "Thank you for sharing how you feel. Remember, it's brave to acknowledge difficult emotions. You're stronger than you know.",
    ],
    support: [
      "Remember: You are not alone. There are people who care about you and want to help.",
      "If you're having thoughts of self-harm, please reach out to a mental health professional immediately. Your life matters. 💚",
      "Would you like me to share some mental health resources or coping strategies that might help?",
    ],
    positive: [
      "I'm so glad to hear you're doing well! What's been helping you feel positive lately?",
      "That's wonderful! It's important to celebrate the good moments. What made today special?",
      "Your positive energy is beautiful! Keep nurturing the things that bring you joy. ✨",
    ],
  };

  const getRandomResponse = (category: keyof typeof mentalHealthResponses) => {
    const responses = mentalHealthResponses[category];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    if (
      message.includes("hello") ||
      message.includes("hi") ||
      message.includes("hey")
    ) {
      return getRandomResponse("greeting");
    }

    if (
      message.includes("stress") ||
      message.includes("overwhelm") ||
      message.includes("pressure")
    ) {
      return getRandomResponse("stress");
    }

    if (
      message.includes("anxious") ||
      message.includes("anxiety") ||
      message.includes("worry") ||
      message.includes("nervous")
    ) {
      return getRandomResponse("anxiety");
    }

    if (
      message.includes("sad") ||
      message.includes("depressed") ||
      message.includes("down") ||
      message.includes("low")
    ) {
      return getRandomResponse("sad");
    }

    if (
      message.includes("good") ||
      message.includes("great") ||
      message.includes("happy") ||
      message.includes("well")
    ) {
      return getRandomResponse("positive");
    }

    if (
      message.includes("help") ||
      message.includes("support") ||
      message.includes("crisis")
    ) {
      return getRandomResponse("support");
    }

    // Default responses
    return "I'm here to listen and support you. Can you tell me more about how you're feeling right now? Remember, every feeling is valid and temporary. 🌟";
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputText),
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          size="icon"
        >
          {isOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <MessageCircle className="h-6 w-6 text-white animate-pulse" />
          )}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-80 md:w-96">
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-lg">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/20 rounded-full">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">MannChitra AI</h3>
                    <p className="text-sm text-blue-100">
                      Mental Wellness Support
                    </p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white">
                  <Heart className="h-3 w-3 mr-1" />
                  Online
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              {/* Messages */}
              <div className="h-80 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-3",
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start",
                    )}
                  >
                    {message.sender === "bot" && (
                      <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex-shrink-0">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                    )}

                    <div
                      className={cn(
                        "max-w-[70%] p-3 rounded-2xl",
                        message.sender === "user"
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md"
                          : "bg-gray-100 text-gray-800 rounded-bl-md",
                      )}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <p
                        className={cn(
                          "text-xs mt-1",
                          message.sender === "user"
                            ? "text-blue-100"
                            : "text-gray-500",
                        )}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>

                    {message.sender === "user" && (
                      <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex-shrink-0">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-md">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t bg-gray-50">
                <div className="flex space-x-2">
                  <div className="flex-1 relative">
                    <textarea
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Share how you're feeling..."
                      className="w-full p-3 pr-12 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none resize-none bg-white"
                      rows={1}
                    />
                  </div>
                  <Button
                    onClick={sendMessage}
                    disabled={!inputText.trim() || isTyping}
                    className="h-12 w-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    size="icon"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-center mt-2 text-xs text-gray-500 space-x-4">
                  <div className="flex items-center space-x-1">
                    <Shield className="h-3 w-3" />
                    <span>Private & Secure</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>24/7 Support</span>
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
