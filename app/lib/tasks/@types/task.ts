import type { Timestamp } from 'firebase/firestore';

export interface Task {
  taskId?: string;
  title: string;
  description: string;
  isCompleted: boolean;
}
