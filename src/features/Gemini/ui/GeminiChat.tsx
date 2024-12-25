"use client";
import { useState, useCallback, FormEvent } from "react";
import ReactMarkdown from "react-markdown";
import fetcher from "@shared/api/fetch";

const useChat = (defaultMessage: string = "") => {
  const [message, setMessage] = useState(defaultMessage);
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(async (message: string) => {
    setIsLoading(true);
    setError(null);
    setResponse("");

    const response = await fetcher<{ content: string }>(
      "/api/chat?message=" + encodeURIComponent(message),
    );

    setResponse(response.content);
    setIsLoading(false);
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
};

const ChatComponent = ({ value }: ChatComponentProps) => {
  const { message, setMessage, response, isLoading, error, sendMessage } =
    useChat(value);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    await sendMessage(message);
    setMessage("");
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded text-black"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
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
        <div className="geminichka p-4 border rounded bg-gray-50 text-black prose dark:prose-invert max-w-none">
          <ReactMarkdown
            components={{
              // Style code fences
              pre({ children, ...props }) {
                return (
                  <pre
                    className="bg-gray-100 p-4 rounded-lg overflow-auto"
                    {...props}
                  >
                    {children}
                  </pre>
                );
              },
              // Style links
              a({ children, ...props }) {
                return (
                  <a className="text-blue-500 hover:text-blue-600" {...props}>
                    {children}
                  </a>
                );
              },
              // Style headings
              h1: ({ ...props }) => (
                <h1 className="text-2xl font-bold mt-6 mb-4" {...props} />
              ),
              h2: ({ ...props }) => (
                <h2 className="text-xl font-bold mt-5 mb-3" {...props} />
              ),
              h3: ({ ...props }) => (
                <h3 className="text-lg font-bold mt-4 mb-2" {...props} />
              ),
            }}
          >
            {response}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default ChatComponent;
