import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory leads storage for demo session persistence
  const leadsStorage: any[] = [];

  // API Health Check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Server-side Gemini AI Chatbot Endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, conversationHistory = [] } = req.body;

      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message is required" });
      }

      const apiKey = process.env.GEMINI_API_KEY;

      const systemInstruction = `You are "Ahsan AI", an elite AI Assistant for Ahsan Durrani's Digital Experience Portfolio.
Ahsan Durrani is a Senior Web Developer & Digital Solution Engineer specializing in:
- WordPress Development (Custom themes, plugins, WooCommerce, memberships, speed optimization)
- Full Stack & Laravel Development (Custom web apps, dashboards, REST APIs, databases)
- AI & Automation Solutions (AI chatbots, workflow automation, API integration)
- UI/UX Design & Frontend Engineering (React, Next.js, Tailwind CSS, GSAP, 3D WebGL)
- SEO & Website Security (Technical SEO, speed optimization, malware removal, server hardening)

Contact Info:
- Email: AhsanDurraniHR@gmail.com
- Phone: +92 3180598980
- Facebook: https://www.facebook.com/AhsanDurrani907/
- LinkedIn: https://pk.linkedin.com/in/ahsan-durrani

Pricing Packages:
1. Starter Package: $499 - For small businesses & landing pages (Responsive design, basic SEO, contact form, speed optimization).
2. Professional Package (Most Popular): $1,299 - Custom Business Website / CMS / E-commerce (Custom design, animations, CMS, advanced SEO, performance tuning).
3. Enterprise Package: $2,999+ - Full-Stack Web Apps, Laravel Systems, AI Integration, Dashboards, Custom APIs, Hardened Security.

Tone & Behavior:
- Be highly professional, friendly, confident, and helpful.
- Provide clear concise answers, highlight Ahsan's technical capabilities, and proactively offer to guide the user to portfolio projects, services, cost calculation, or scheduling a consultation.
- Answer technical questions about WordPress, Laravel, React, AI, and SEO with authority.`;

      if (apiKey) {
        try {
          const ai = new GoogleGenAI({
            apiKey,
            httpOptions: {
              headers: {
                "User-Agent": "aistudio-build",
              },
            },
          });

          // Build prompt context with conversation history
          const formattedHistory = conversationHistory
            .map((h: { sender: string; text: string }) => `${h.sender === "user" ? "User" : "Ahsan AI"}: ${h.text}`)
            .join("\n");

          const prompt = `${formattedHistory}\nUser: ${message}\nAhsan AI:`;

          const response = await ai.models.generateContent({
            model: "gemini-3.6-flash",
            contents: prompt,
            config: {
              systemInstruction,
              temperature: 0.7,
            },
          });

          const reply = response.text || "I'm ready to assist you with Ahsan Durrani's services and custom development solutions!";
          return res.json({ reply, source: "gemini" });
        } catch (genError: any) {
          console.error("Gemini API call failed, falling back to smart responder:", genError.message);
        }
      }

      // Fallback response generator if GEMINI_API_KEY is not set
      const lowerMsg = message.toLowerCase();
      let reply = "";

      if (lowerMsg.includes("who") || lowerMsg.includes("about") || lowerMsg.includes("ahsan")) {
        reply = "Ahsan Durrani is a Senior Web Developer & Digital Solution Engineer with 5+ years of experience in custom WordPress development, Laravel web apps, AI automation, and high-performance frontend engineering.";
      } else if (lowerMsg.includes("service") || lowerMsg.includes("what can you do") || lowerMsg.includes("offer")) {
        reply = "Ahsan provides 6 core services: 1) Custom Website Development, 2) WordPress Theme & Plugin Dev, 3) Laravel Web Applications & APIs, 4) AI Solutions & Chatbots, 5) Website Security & Malware Removal, and 6) SEO & Speed Optimization.";
      } else if (lowerMsg.includes("price") || lowerMsg.includes("cost") || lowerMsg.includes("package") || lowerMsg.includes("rate")) {
        reply = "Packages range from $499 (Starter Landing Pages), $1,299 (Professional CMS & E-commerce), to $2,999+ for Enterprise Custom Laravel Apps & AI Systems. You can also use our interactive AI Cost Calculator on the site!";
      } else if (lowerMsg.includes("contact") || lowerMsg.includes("hire") || lowerMsg.includes("email") || lowerMsg.includes("phone")) {
        reply = "You can reach Ahsan directly at AhsanDurraniHR@gmail.com or via WhatsApp/Phone at +92 3180598980. You can also submit the Contact form below!";
      } else if (lowerMsg.includes("wordpress") || lowerMsg.includes("laravel") || lowerMsg.includes("react") || lowerMsg.includes("stack")) {
        reply = "Ahsan specializes in modern tech stacks including React, Next.js, Tailwind CSS, GSAP, WordPress (Custom PHP/WooCommerce), Laravel, Node.js, MySQL, and OpenAI / Gemini API integrations.";
      } else {
        reply = `Thank you for asking about "${message}"! As Ahsan AI, I can help you evaluate project scopes, check Ahsan's past work, estimate budgets, or connect you directly for a consultation. Would you like to check out Ahsan's Portfolio or Services?`;
      }

      return res.json({ reply, source: "fallback" });
    } catch (err: any) {
      console.error("Chat error:", err);
      res.status(500).json({ error: "Failed to process message" });
    }
  });

  // Server-side AI Project Consultant & Scope Generator
  app.post("/api/ai-consultant", async (req, res) => {
    try {
      const { projectType, projectSize, timeline, features = [] } = req.body;

      const apiKey = process.env.GEMINI_API_KEY;

      if (apiKey) {
        try {
          const ai = new GoogleGenAI({
            apiKey,
            httpOptions: {
              headers: { "User-Agent": "aistudio-build" },
            },
          });

          const prompt = `Act as an expert technical consultant for Ahsan Durrani. Analyze the following client project requirements:
- Project Type: ${projectType}
- Size/Scope: ${projectSize}
- Timeline: ${timeline}
- Selected Features: ${features.join(", ") || "Standard"}

Provide a structured, high-value JSON proposal response containing:
1. "recommendation": A 2-3 sentence strategic recommendation.
2. "suggestedStack": Array of 4-5 recommended technologies.
3. "estimatedBudget": A string budget range (e.g., "$1,200 - $1,800").
4. "estimatedTimeframe": A string timeline (e.g., "2-3 weeks").
5. "keyDeliverables": Array of 4 bullet deliverables.`;

          const response = await ai.models.generateContent({
            model: "gemini-3.6-flash",
            contents: prompt,
            config: {
              responseMimeType: "application/json",
            },
          });

          if (response.text) {
            const parsed = JSON.parse(response.text);
            return res.json(parsed);
          }
        } catch (e) {
          console.error("Gemini Consultant failed, sending calculated scope:", e);
        }
      }

      // Default smart calculation fallback
      let baseBudget = 800;
      if (projectSize === "Medium") baseBudget = 1500;
      if (projectSize === "Enterprise") baseBudget = 3200;
      if (projectType?.includes("Laravel") || projectType?.includes("AI")) baseBudget += 600;

      res.json({
        recommendation: `Based on your request for a ${projectSize} ${projectType}, Ahsan recommends a modular architecture ensuring scalable performance, custom UI design, and responsive optimizations.`,
        suggestedStack: [projectType?.includes("WordPress") ? "WordPress" : "React/Next.js", "Tailwind CSS", "Laravel/Node", "REST APIs", "Cloudflare Security"],
        estimatedBudget: `$${baseBudget} - $${Math.round(baseBudget * 1.35)}`,
        estimatedTimeframe: timeline === "Urgent" ? "7 - 10 Days" : "2 - 4 Weeks",
        keyDeliverables: [
          "Custom Responsive Design & Animations",
          "SEO Readiness & Core Web Vitals Optimization",
          "Secure Backend Integration & Database Setup",
          "30 Days Post-Launch Support & Maintenance"
        ]
      });
    } catch (err) {
      res.status(500).json({ error: "Consultant calculation error" });
    }
  });

  // Lead capture endpoint
  app.post("/api/lead", (req, res) => {
    const { name, email, phone, projectType, budget, message } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    const newLead = {
      id: "lead_" + Date.now(),
      name,
      email,
      phone: phone || "Not provided",
      projectType: projectType || "General Inquiry",
      budget: budget || "Not specified",
      message: message || "No message",
      createdAt: new Date().toISOString()
    };

    leadsStorage.push(newLead);

    res.json({
      success: true,
      message: "Lead recorded successfully. Ahsan Durrani will get back to you shortly!",
      leadId: newLead.id
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Ahsan Durrani Portfolio Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
