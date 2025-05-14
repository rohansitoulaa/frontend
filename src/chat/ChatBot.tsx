import React, { useEffect, useRef, useState } from "react";
import { chatbotQuestions } from "./questions";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

type QuestionNode = {
  id: string;
  question: string;
  answer?: string;
  children?: QuestionNode[];
};

type ChatMessage = {
  id: string;
  sender: "user" | "bot";
  text: string;
  animated?: boolean;
};

export default function ChatBot() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [availableQuestions, setAvailableQuestions] =
    useState<QuestionNode[]>(chatbotQuestions);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleQuestionClick = (node: QuestionNode) => {
    if (isTyping) return;

    const userMessage: ChatMessage = {
      id: `${node.id}_user`,
      sender: "user",
      text: node.question,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      if (node.answer) {
        const botMessage: ChatMessage = {
          id: `${node.id}_bot`,
          sender: "bot",
          text: node.answer!,
          animated: true,
        };
        setMessages((prev) => [...prev, botMessage]);
      }

      setAvailableQuestions(node.children ?? []);
      setIsTyping(false);
    }, 1000);
  };

  const handleRestart = () => {
    setMessages([]);
    setAvailableQuestions(chatbotQuestions);
  };

  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  return (
    <div className="h-screen w-screen dark:bg-[#1e1e1e] flex items-center justify-center">
      <div className="w-full max-w-4xl h-full flex flex-col dark:bg-[#2b2b2b] sm:rounded-xl ">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto px-4 flex flex-col gap-2"
          >
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <motion.img
                  src="/images/chatbot.png"
                  alt="Chatbot"
                  className="w-40 h-40 mb-4"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                  }}
                />
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">
                  Hi, I’m PaperBot 👋
                </h2>
                <p className="text-md sm:text-lg text-gray-600 dark:text-gray-300 mt-2">
                  How can I help you with Paper Talk?
                </p>
              </div>
            ) : (
              <>
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                  >
                    <div className="mb-1">
                      {msg.sender === "bot" ? (
                        <img
                          src="/images/chatbot.png"
                          alt="Bot"
                          className="w-8 h-8 rounded-full"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-black"></div>
                      )}
                    </div>
                    <div
                      className={`p-3 rounded-xl max-w-[80%] ${
                        msg.sender === "user"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                      }`}
                    >
                      {msg.sender === "bot" && msg.animated ? (
                        <TypeAnimation
                          sequence={[msg.text]}
                          wrapper="span"
                          speed={70}
                          cursor={false}
                        />
                      ) : (
                        msg.text
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="self-start px-4 py-2 rounded-xl bg-gray-300 dark:bg-gray-700 text-sm text-gray-800 dark:text-gray-100 max-w-[80%]">
                    <TypeAnimation
                      sequence={[
                        "Typing",
                        300,
                        "Typing.",
                        300,
                        "Typing..",
                        300,
                        "Typing...",
                        300,
                      ]}
                      wrapper="span"
                      speed={50}
                      repeat={Infinity}
                    />
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          <div
            className={`p-4 border-t border-gray-300 dark:border-gray-700 dark:bg-[#2b2b2b] ${
              isTyping ? "pointer-events-none opacity-50" : ""
            }`}
          >
            <div className="flex flex-col gap-4 border-t-2 pt-5 border-[#826f6f]">
              <button
                onClick={handleRestart}
                className="px-4 py-2 text-start rounded  "
              >
                🔄 Restart Chat
              </button>
              <div className="flex flex-col gap-4">
                {/* Question Buttons */}
                {availableQuestions.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {availableQuestions.map((q) => (
                      <button
                        key={q.id}
                        className="bg-white dark:bg-gray-800 dark:hover:bg-gray-700 text-left p-3 rounded-4xl text-sm transition disabled:opacity-60"
                        onClick={() => handleQuestionClick(q)}
                        disabled={isTyping}
                      >
                        {q.question}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
