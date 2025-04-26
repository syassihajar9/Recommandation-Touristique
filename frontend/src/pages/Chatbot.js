import React, { useState, useEffect, useRef } from "react";

function Chatbot() {
  const [messages, setMessages] = useState([
    {
      text: "Bonjour ! Je suis votre guide virtuel pour Marrakech. Posez-moi vos questions sur les activités, restaurants ou hôtels.",
      sender: "bot"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatboxRef = useRef(null);

  const quickQuestions = [
    "Quels sont les meilleurs restaurants?",
    "Où puis-je trouver des hôtels pas chers?",
    "Quelles activités recommandez-vous?"
  ];

  const sendMessage = async (userInput) => {
    const messageToSend = userInput?.trim() || input.trim();

    if (!messageToSend || loading) return;

    setMessages(prev => [...prev, { text: messageToSend, sender: "user" }]);
    setLoading(true);
    setInput("");

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPENROUTER_API_KEY}`,
          
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "Marrakech Guide Bot"
        },
        body: JSON.stringify({
          model: "openchat/openchat-3.5",
          messages: [
            { role: "system", content: "Tu es un guide touristique expert sur Marrakech." },
            { role: "user", content: messageToSend }
          ]
        })
      });

      const data = await response.json();
      const botResponse = data.choices?.[0]?.message?.content || "Je n’ai pas compris. Peux-tu reformuler ?";
      setMessages(prev => [...prev, { text: botResponse, sender: "bot" }]);
    } catch (error) {
      console.error("Erreur OpenRouter :", error);
      setMessages(prev => [...prev, {
        text: "Désolé, une erreur est survenue. Réessayez plus tard.",
        sender: "bot"
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickQuestion = (question) => {
    sendMessage(question);
  };

  useEffect(() => {
    chatboxRef.current?.scrollTo(0, chatboxRef.current.scrollHeight);
  }, [messages]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Guide Virtuel Marrakech</h1>
      <div style={styles.chatbox} ref={chatboxRef}>
        {messages.map((msg, index) => (
          <div key={index} style={msg.sender === "user" ? styles.userMessage : styles.botMessage}>
            {msg.text}
          </div>
        ))}
        {loading && <div style={styles.botMessage}>Je recherche la réponse...</div>}
      </div>

      <div style={styles.quickQuestions}>
        {quickQuestions.map((question, i) => (
          <button
            key={i}
            style={styles.quickBtn}
            onClick={() => handleQuickQuestion(question)}
            disabled={loading}
          >
            {question}
          </button>
        ))}
      </div>

      <div style={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage(input)}
          placeholder="Posez votre question sur Marrakech..."
          style={styles.input}
          disabled={loading}
        />
        <button
          onClick={() => sendMessage(input)}
          style={styles.button}
          disabled={loading || !input.trim()}
        >
          {loading ? "..." : "Envoyer"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  title: {
    color: "#e63946",
    textAlign: "center",
    marginBottom: "20px"
  },
  chatbox: {
    height: "300px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    overflowY: "auto",
    marginBottom: "15px",
    backgroundColor: "#f8f9fa",
  },
  userMessage: {
    backgroundColor: "#e63946",
    color: "white",
    padding: "10px 15px",
    borderRadius: "18px 188px 0 18px",
    margin: "8px 0",
    maxWidth: "80%",
    alignSelf: "flex-end",
    wordWrap: "break-word",
  },
  botMessage: {
    backgroundColor: "#f1f1f1",
    color: "#333",
    padding: "10px 15px",
    borderRadius: "18px 18px 18px 0",
    margin: "8px 0",
    maxWidth: "80%",
    wordWrap: "break-word",
  },
  inputContainer: {
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "16px",
  },
  button: {
    padding: "12px 20px",
    backgroundColor: "#e63946",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s",
  },
  quickQuestions: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "15px",
  },
  quickBtn: {
    padding: "8px 12px",
    backgroundColor: "#f8f9fa",
    border: "1px solid #ddd",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.3s",
  },
};

export default Chatbot;
