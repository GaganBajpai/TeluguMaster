import { type Lesson, type Progress, type InsertLesson } from "@shared/schema";

export interface IStorage {
  getLessons(): Promise<Lesson[]>;
  getLesson(id: number): Promise<Lesson | undefined>;
  getLessonsByType(type: string): Promise<Lesson[]>;
  getProgress(): Promise<Progress[]>;
  updateProgress(lessonId: number, completed: boolean, score?: number): Promise<Progress>;
}

export class MemStorage implements IStorage {
  private lessons: Map<number, Lesson>;
  private progress: Map<number, Progress>;
  private currentLessonId: number;
  private currentProgressId: number;

  constructor() {
    this.lessons = new Map();
    this.progress = new Map();
    this.currentLessonId = 1;
    this.currentProgressId = 1;
    this.initializeData();
  }

  private initializeData() {
    const initialLessons: InsertLesson[] = [
      {
        title: "Telugu Alphabet - Vowels",
        type: "alphabet",
        content: JSON.stringify({
          characters: ["అ", "ఆ", "ఇ", "ఈ", "ఉ", "ఊ"],
          descriptions: ["a", "aa", "i", "ee", "u", "oo"]
        }),
        order: 1,
        audioUrl: "/audio/vowels.mp3"
      },
      {
        title: "Basic Grammar - Subject Pronouns",
        type: "grammar",
        content: JSON.stringify({
          rules: ["నేను (nenu) - I", "నువ్వు (nuvvu) - You", "అతను (atanu) - He"],
          examples: ["నేను వెళ్తాను - I will go"]
        }),
        order: 2,
        audioUrl: "/audio/pronouns.mp3"
      }
    ];

    initialLessons.forEach(lesson => {
      const id = this.currentLessonId++;
      this.lessons.set(id, { ...lesson, id });
    });
  }

  async getLessons(): Promise<Lesson[]> {
    return Array.from(this.lessons.values()).sort((a, b) => a.order - b.order);
  }

  async getLesson(id: number): Promise<Lesson | undefined> {
    return this.lessons.get(id);
  }

  async getLessonsByType(type: string): Promise<Lesson[]> {
    return Array.from(this.lessons.values())
      .filter(lesson => lesson.type === type)
      .sort((a, b) => a.order - b.order);
  }

  async getProgress(): Promise<Progress[]> {
    return Array.from(this.progress.values());
  }

  async updateProgress(lessonId: number, completed: boolean, score?: number): Promise<Progress> {
    const existingProgress = Array.from(this.progress.values())
      .find(p => p.lessonId === lessonId);

    if (existingProgress) {
      const updatedProgress = {
        ...existingProgress,
        completed,
        score: score ?? existingProgress.score
      };
      this.progress.set(existingProgress.id, updatedProgress);
      return updatedProgress;
    }

    const newProgress = {
      id: this.currentProgressId++,
      lessonId,
      completed,
      score
    };
    this.progress.set(newProgress.id, newProgress);
    return newProgress;
  }
}

export const storage = new MemStorage();
