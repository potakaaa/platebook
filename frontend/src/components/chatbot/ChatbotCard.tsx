"use client";

import { IconMessageChatbot } from "@tabler/icons-react";
import React from "react";
import { useChat } from "@ai-sdk/react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import Image from "next/image";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Input } from "../ui/input";
import { CircleX, Loader2, SendHorizonal, X } from "lucide-react";
import { unstable_noStore as noStore } from "next/cache";

const ChatbotCard = () => {
  noStore();
  const [isChatOpen, setIsChatOpen] = React.useState(false);
  const chatIconRef = React.useRef<HTMLButtonElement>(null);

  const scrollRef = React.useRef<HTMLDivElement>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    reload,
    error,
  } = useChat({ api: "/api/gemini" });

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="fixed bottom-5 right-7 z-50">
      {!isChatOpen ? (
        <Button
          className="rounded-full bg-primary p-3 cursor-pointer"
          variant={"default"}
          size="lg"
          onClick={() => setIsChatOpen(true)}
        >
          <IconMessageChatbot className="size-6 text-white drop-shadow-md" />
        </Button>
      ) : (
        <Card className="w-[300px] sm:w-[350px] xl:w-[450px] p-0">
          <CardHeader className="py-3 xl:py-4 px-2 sm:px-4 xl:px-5 items-center sm:items-start space-y-1">
            <div className="flex flex-row justify-between w-full">
              <div className="flex flex-row gap-2 items-center">
                <Image
                  width={30}
                  height={30}
                  alt="Platebook Logo"
                  src="/platebook-logo-500.png"
                  className="object-cover size-6 items-center jsutify-center self-end mb-1 hidden sm:block"
                />
                <CardTitle className="text-sm xl:text-base line-clamp-1">
                  PlateBot - Your AI Platebook Assistant
                </CardTitle>
              </div>
              <Button
                variant={"ghost"}
                size={"icon"}
                className=""
                onClick={() => setIsChatOpen(false)}
              >
                <CircleX className="size-6 text-primary" />
              </Button>
            </div>

            <CardDescription className="text-xs xl:text-sm ml-0 sm:ml-1">
              Ask me anything about Platebook?
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full p-3">
            {/* <span className="border-b border-muted border w-full" /> */}
            <ScrollArea className="h-[350px] w-full">
              {messages?.length === 0 && (
                <div className="w-full h-[250px] flex flex-col gap-2 justify-center  items-center self-center">
                  <Image
                    src="/platebook-logo-500.png"
                    width={200}
                    height={200}
                    alt="Platebook Logo"
                    className="object-cover size-8 drop-shadow-md text-center"
                  />
                  <p className="text-xs">
                    Hello, I'm PlateBot. Ask me anything!
                  </p>
                </div>
              )}
              {messages?.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex flex-row gap-2 px-2 py-3 text-xs xl:text-sm xl:leading-snug",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {message.role !== "user" && (
                    <Image
                      width={30}
                      height={30}
                      alt="Platebook Logo"
                      src="/platebook-logo-500.png"
                      className="object-cover size-6 items-center justify-center self-end mb-1"
                    />
                  )}
                  <div
                    className={`inline-block max-w-[200px] xl:max-w-[300px] rounded-lg p-2 text-foreground ${
                      message.role === "user" ? "bg-muted mr-2" : "bg-secondary"
                    }`}
                  >
                    <ReactMarkdown
                      children={message.content}
                      remarkPlugins={[remarkGfm]}
                      components={{
                        code({
                          inline,
                          className,
                          children,
                          ...props
                        }: {
                          inline?: boolean;
                          className?: string;
                          children?: React.ReactNode;
                        }) {
                          return inline ? (
                            <code
                              {...props}
                              className="bg-grey-200 px-1 rounded "
                            >
                              {children}
                            </code>
                          ) : (
                            <pre
                              {...(props as React.HTMLAttributes<HTMLPreElement>)}
                              className="bg-grey-200 p-2 rounded"
                            >
                              <code>{children}</code>
                            </pre>
                          );
                        },
                        ul: ({ children }) => (
                          <ul className="list-disc ml-4">{children}</ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="list-decimal ml-4">{children}</ol>
                        ),
                      }}
                    />
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex flex-row justify-center mt-5">
                  <Loader2 className="size-4 animate-spin text-primary mr-2" />
                  <p className="text-xs">Loading...</p>
                  <p
                    className="text-xs underline cursor-pointer"
                    onClick={() => stop()}
                  >
                    Stop
                  </p>
                </div>
              )}
              {error && (
                <div className="flex flex-row gap-2 justify-center mt-5">
                  <p className="text-xs text-destructive">Error occured</p>
                  <p
                    className="text-xs hover:text-primary underline cursor-pointer"
                    onClick={() => reload()}
                  >
                    Retry
                  </p>
                </div>
              )}
              <div ref={scrollRef} />
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <form
              onSubmit={handleSubmit}
              className="flex w-full items-center space-x-2"
            >
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Type your question here..."
                className="flex-1 text-xs"
              />
              <Button type="submit" disabled={isLoading} size={"icon"}>
                <SendHorizonal className="size-5" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default ChatbotCard;
