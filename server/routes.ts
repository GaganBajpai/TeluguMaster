import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export function registerRoutes(app: Express): Server {
  app.get("/api/lessons", async (_req, res) => {
    const lessons = await storage.getLessons();
    res.json(lessons);
  });

  app.get("/api/lessons/:id", async (req, res) => {
    const lesson = await storage.getLesson(parseInt(req.params.id));
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }
    res.json(lesson);
  });

  app.get("/api/lessons/type/:type", async (req, res) => {
    const lessons = await storage.getLessonsByType(req.params.type);
    res.json(lessons);
  });

  app.get("/api/progress", async (_req, res) => {
    const progress = await storage.getProgress();
    res.json(progress);
  });

  app.post("/api/progress/:lessonId", async (req, res) => {
    const { completed, score } = req.body;
    const progress = await storage.updateProgress(
      parseInt(req.params.lessonId),
      completed,
      score
    );
    res.json(progress);
  });

  const httpServer = createServer(app);
  return httpServer;
}
