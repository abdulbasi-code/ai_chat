// components/ImageGenerator.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DownloadIcon, SendIcon, Loader2 } from "lucide-react";
import { useToast } from "@/components/hooks/use-toast";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface Message {
  id: string;
  type: "text" | "image";
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface GenerateImageResponse {
  imageData?: string;
  text?: string;
  error?: string;
}

export function ImageGenerator() {
  const [prompt, setPrompt] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!prompt.trim()) {
      return;
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "text",
      content: prompt,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    // Store the prompt and clear input
    const currentPrompt = prompt;
    setPrompt("");

    try {
      const response = await fetch("/api/generateImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: currentPrompt }),
      });

      const data: GenerateImageResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate image");
      }

      if (data.imageData) {
        // Add AI image message
        const aiMessage: Message = {
          id: Date.now().toString(),
          type: "image",
          content: data.imageData,
          sender: "ai",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);
      } else if (data.text) {
        // Add AI text message
        const aiMessage: Message = {
          id: Date.now().toString(),
          type: "text",
          content: data.text || "I couldn't generate an image for that prompt.",
          sender: "ai",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);
      }
    } catch (err) {
      // Add error message
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: "text",
        content:
          err instanceof Error ? err.message : "Failed to generate image",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);

      toast({
        title: "Error",
        description:
          err instanceof Error ? err.message : "Failed to generate image",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = (imageData: string, index: number) => {
    const link = document.createElement("a");
    link.href = imageData;
    link.download = `ai-generated-image-${index}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Success",
      description: "Image downloaded successfully",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex flex-col h-[80vh] w-full max-w-3xl mx-auto border rounded-lg overflow-hidden bg-background">
      {/* Header */}
      <div className="p-4 border-b bg-muted/40">
        <h2 className="text-xl font-semibold">Image Generator Chat</h2>
        <p className="text-sm text-muted-foreground">
          Create images with simple text prompts using Gemini AI
        </p>
      </div>

      {/* Messages area */}
      <ScrollArea className="flex-1 p-4">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-center">
            <div className="max-w-md space-y-2">
              <h3 className="text-lg font-medium">
                Welcome to the AI Image Generator
              </h3>
              <p className="text-sm text-muted-foreground">
                Type a detailed description of the image you'd like to create.
                Be specific about content, style, colors, and mood.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-start gap-2 max-w-[80%] ${
                    message.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <Avatar className="h-8 w-8 mt-0.5">
                    <div
                      className={`h-full w-full rounded-full flex items-center justify-center ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {message.sender === "user" ? "U" : "AI"}
                    </div>
                  </Avatar>

                  <div>
                    <div
                      className={`px-4 py-2 rounded-lg ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {message.type === "text" ? (
                        <p>{message.content}</p>
                      ) : (
                        <div className="space-y-2">
                          <img
                            src={message.content}
                            alt="Generated by AI"
                            className="w-full h-auto rounded-md"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              downloadImage(message.content, index)
                            }
                            className="w-full"
                          >
                            <DownloadIcon className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 px-1">
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </ScrollArea>

      {/* Input area */}
      <div className="p-4 border-t bg-background">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            placeholder="Describe the image you want to generate..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={loading}
            className="flex-1"
          />
          <Button
            type="submit"
            size="icon"
            disabled={loading || !prompt.trim()}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <SendIcon className="h-4 w-4" />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
