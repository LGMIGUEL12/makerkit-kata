import { TASKS_COLLECTION } from '../../firestore-collections';
import { useCallback } from 'react';
import useRequestState from '~/core/hooks/use-request-state';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import type Task from '../@type/task';
import type { FirebaseError } from 'firebase/app';

/**
 * @name useCreateTask
 * @description Hook to create a brand new task
 */

function useCreateTask() {
    
  const { state, setLoading, setData, setError } =
    useRequestState<WithId<Task>>();

  const createTaskCallback = useCallback(
    async (title: string, description: string) => {
      const firestore = getFirestore();
      const tasksCollection = collection(firestore, TASKS_COLLECTION);

      try {
        setLoading(true);
        const data: Task = {
          title: title,
          description: description,
          isCompleted: false,
          taskText: '',
        };

        const docRef = await addDoc(tasksCollection, data);

        setData({
          id: docRef.id,
          title: title,
          description: description,
          isCompleted: data.isCompleted,
          taskText: '',
        });
      } catch (error) {
        setError((error as FirebaseError).message);
      }
    },
    [setData, setError, setLoading]
  );

  return [createTaskCallback, state] as [
    typeof createTaskCallback,
    typeof state
  ];
}

export default useCreateTask;
