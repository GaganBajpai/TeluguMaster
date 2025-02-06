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
        title: "Telugu Alphabet - Overview",
        type: "alphabet",
        content: JSON.stringify({
          characters: [
            "క", "ఖ", "గ", "ఘ", "ఙ",
            "చ", "ఛ", "జ", "ఝ", "ఞ",
            "ట", "ఠ", "డ", "ఢ", "ణ",
            "త", "థ", "ద", "ధ", "న",
            "ప", "ఫ", "బ", "భ", "మ",
            "య", "ర", "ల", "వ", "శ", 
            "ష", "స", "హ", "ళ", "క్ష"
          ],
          descriptions: [
            "ka", "kha", "ga", "gha", "nga",
            "ca", "cha", "ja", "jha", "nya",
            "ta", "tha", "da", "dha", "na",
            "ta", "tha", "da", "dha", "na",
            "pa", "pha", "ba", "bha", "ma",
            "ya", "ra", "la", "va", "sa",
            "sha", "sa", "ha", "la", "ksha"
          ]
        }),
        order: 1,
        audioUrl: "/audio/alphabet.mp3"
      },
      {
        title: "Telugu Vowels",
        type: "alphabet",
        content: JSON.stringify({
          characters: [
            "అ", "ఆ", "ఇ", "ఈ", "ఉ", "ఊ",
            "ఋ", "ౠ", "ఎ", "ఏ", "ఐ",
            "ఒ", "ఓ", "ఔ", "అం", "అః"
          ],
          descriptions: [
            "a", "aa", "i", "ee", "u", "oo",
            "ru", "ruu", "e", "ee", "ai",
            "o", "oo", "au", "am", "aha"
          ]
        }),
        order: 2,
        audioUrl: "/audio/vowels.mp3"
      },
      {
        title: "Basic Grammar - Sentence Construction",
        type: "grammar",
        content: JSON.stringify({
          rules: [
            "Telugu follows Subject-Object-Verb (SOV) word order",
            "Subject (కర్త) comes first: నేను (I), నువ్వు (you), అతను (he)",
            "Object (కర్మ) comes second: పుస్తకం (book), ఆపిల్ (apple)",
            "Verb (క్రియ) comes last: చదువుతున్నాను (reading), తింటున్నాను (eating)",
            "Time expressions usually come at the beginning"
          ],
          examples: [
            "నేను పుస్తకం చదువుతున్నాను - I am reading a book",
            "అతను ఆపిల్ తింటున్నాడు - He is eating an apple",
            "నిన్న నేను సినిమా చూశాను - Yesterday I watched a movie",
            "నువ్వు బడికి వెళ్తున్నావు - You are going to school",
            "ఆమె టీవీ చూస్తోంది - She is watching TV"
          ]
        }),
        order: 3,
        audioUrl: "/audio/grammar.mp3"
      }
    ];

    initialLessons.forEach(lesson => {
      const id = this.currentLessonId++;
      this.lessons.set(id, { 
        id, 
        title: lesson.title,
        type: lesson.type,
        content: lesson.content,
        order: lesson.order,
        audioUrl: lesson.audioUrl || null
      });
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