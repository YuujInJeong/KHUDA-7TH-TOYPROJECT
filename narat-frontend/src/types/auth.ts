// src/types/auth.ts
export interface User {
  google_id: string;
  email: string;
  display_name: string;
  study_level: 'S' | 'A' | 'B';
  created_at: string;
  last_login: string;
}

export interface Question {
  question_id: string;
  category_id: string;
  wrong_sentence: string;
  right_sentence: string;
  wrong_word: string;
  right_word: string;
  location: string;
  difficulty_level: number;
  explanation: string;
  is_active: boolean;
  total_attempts: number;
  correct_rate: number;
  avg_time_spent: number;
  dropout_rate: number;
  daily_stats: any;
  stats_updated_at: string;
  created_at: string;
}

export interface Category {
  category_id: string;
  name: string;
  description: string;
  created_at: string;
}

export interface UserLog {
  log_id: string;
  google_id: string;
  question_id: string;
  correct: boolean;
  delaytime: number;
  created_at: string;
}

export interface Recommendation {
  rec_id: string;
  google_id: string;
  rec_status: boolean;
  rec_type: number;
  created_at: string;
  questions?: Question[];
}

export interface RecommendationQuestion {
  index: string;
  rec_id: string;
  question_id: string;
  order: number;
}

export interface Session {
  session_id: string;
  google_id: string;
  created_at: string;
}

export interface StudyStats {
  category_stats: CategoryStat[];
  difficulty_stats: DifficultyLevelStat[];
  time_stats?: TimeStats;
}

export interface CategoryStat {
  category: string;
  total: number;
  correct: number;
  correct_rate: number;
}

export interface DifficultyLevelStat {
  level: number;
  total: number;
  correct: number;
  correct_rate: number;
}

export interface TimeStats {
  average_time: number;
  total_time: number;
  total_questions: number;
}

export interface RecentWrongAnswer {
  wrong_sentence: string;
  right_sentence: string;
  wrong_word: string;
  right_word: string;
  explanation: string;
  created_at: string;
}

export interface StudyHistory {
  question_id: string;
  wrong_sentence: string;
  right_sentence: string;
  correct: boolean;
  time_spent: number;
  created_at: string;
}