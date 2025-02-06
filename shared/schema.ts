import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  type: text("type").notNull(), // "alphabet", "grammar", "vocabulary", "sentences"
  content: text("content").notNull(),
  order: integer("order").notNull(),
  audioUrl: text("audio_url"),
});

export const progress = pgTable("progress", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id").notNull(),
  completed: boolean("completed").notNull().default(false),
  score: integer("score"),
});

export const insertLessonSchema = createInsertSchema(lessons).pick({
  title: true,
  type: true,
  content: true,
  order: true,
  audioUrl: true,
});

export const insertProgressSchema = createInsertSchema(progress).pick({
  lessonId: true,
  completed: true,
  score: true,
});

export type InsertLesson = z.infer<typeof insertLessonSchema>;
export type Lesson = typeof lessons.$inferSelect;
export type Progress = typeof progress.$inferSelect;
