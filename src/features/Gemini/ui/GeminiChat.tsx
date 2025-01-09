"use client";
import { useState, useCallback, FormEvent } from "react";
import fetcher from "@shared/api/fetch";
import { Button } from "@ui/button";
import css from "./GeminiChat.module.css";
import { cn } from "@shared/lib/utils";

type Args = {
  defaultValue?: string;
  defaultResponse: string | null;
};

const useChat = ({ defaultValue = "", defaultResponse = "" }: Args) => {
  const [message, setMessage] = useState(defaultValue);
  const [response, setResponse] = useState(defaultResponse);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (message: string) => {
    setIsLoading(true);
    setError(null);
    setResponse("");

    try {
      const res = await fetch(
        "/api/chat?message=" + encodeURIComponent(message),
      );
      if (!res.body) throw new Error("No stream available in response");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let result = "";

      while (!done) {
        const { value, done: chunkDone } = await reader.read();
        done = chunkDone;
        result += decoder.decode(value, { stream: true });

        setResponse(result);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Error while streaming response");
    } finally {
      setIsLoading(false);
    }
  }, []);
  return {
    message,
    setMessage,
    response,
    isLoading,
    error,
    sendMessage,
  };
};

type ChatComponentProps = {
  value?: string;
  wordId: string;
  explanation: string | null;
};

const ChatComponent = ({ value, explanation, wordId }: ChatComponentProps) => {
  const { message, setMessage, response, isLoading, error, sendMessage } =
    useChat({ defaultValue: value, defaultResponse: explanation });
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "loading" | "success" | "reject"
  >("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    await sendMessage(message);
    // setMessage("");
    setSaveStatus("idle");
  };

  const handleSave = async () => {
    try {
      setSaveStatus("loading");

      await fetcher(`/api/words/${wordId}/explanation`, {
        method: "PUT",
        body: { content: response },
      });
      setSaveStatus("success");
    } catch (err) {
      setSaveStatus("reject");

      console.error("Failed to save explanation:", err);
    }
  };

  const getSaveButtonContent = () => {
    if (saveStatus === "loading") {
      return "Saving...";
    }
    if (saveStatus === "success") {
      return "Saved!";
    }
    if (saveStatus === "reject") {
      return "Unable to save :(";
    }
    return "Save";
  };

  return (
    <div className="max-w-4xl mx-auto py-4 md:p-4">
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none min-h-[100px] text-black bg-white placeholder-gray-400 transition-all outline-none"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 h-fit self-end transition-colors"
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </div>
      </form>

      {error && (
        <div className="p-4 mb-4 border rounded bg-red-50 text-red-600">
          {error}
        </div>
      )}

      {response && (
        <div className="space-y-4">
          <div
            dangerouslySetInnerHTML={{ __html: response }}
            className={cn(
              css.response,
              "p-4 border rounded bg-gray-50 text-black prose dark:prose-invert max-w-none",
            )}
          ></div>

          {isLoading || (
            <div className="flex items-center justify-end gap-2">
              <span className="text-sm text-gray-600">
                Like the explanation?
              </span>
              <Button
                onClick={handleSave}
                disabled={saveStatus === "loading" || saveStatus === "success"}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {getSaveButtonContent()}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatComponent;
