import type { Timestamp } from 'firebase/firestore';

export interface Task {
  taskText: string;
  id?: string;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  createdBy?: string;
}
