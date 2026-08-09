"use client";

import { FormEvent, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type HeliosChatProps = {
  context?: string;
};

export default function HeliosChat({
  context = "El estudiante está explorando el módulo Aristarco vs. Ptolomeo.",
}: HeliosChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Observa antes de decidir. ¿Qué parte del modelo de Ptolomeo te resulta razonable desde la perspectiva de alguien de su época?",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(event: FormEvent) {
    event.preventDefault();

    const text = input.trim();

    if (!text || loading) return;

    const nextMessages: Message[] = [
      ...messages,
      {
        role: "user",
        content: text,
      },
    ];

    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/helios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: nextMessages,
          context,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al contactar con Helios");
      }

      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: data.message,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content:
            "No he podido responder en este momento. Intenta nuevamente.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <aside className="helios-chat">
      <header className="helios-chat-header">
        <div className="helios-avatar">☀</div>

        <div>
          <span className="helios-chat-role">GUÍA EPISTÉMICO</span>
          <h2>HELIOS</h2>
        </div>
      </header>

      <div className="helios-chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={
              message.role === "assistant"
                ? "chat-message helios-message"
                : "chat-message user-message"
            }
          >
            <span>{message.role === "assistant" ? "HELIOS" : "TÚ"}</span>
            <p>{message.content}</p>
          </div>
        ))}

        {loading && (
          <div className="chat-message helios-message">
            <span>HELIOS</span>
            <p>Pensando…</p>
          </div>
        )}
      </div>

      <form className="helios-chat-form" onSubmit={sendMessage}>
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Escribe a Helios..."
          disabled={loading}
        />

        <button type="submit" disabled={loading || !input.trim()}>
          →
        </button>
      </form>
    </aside>
  );
}