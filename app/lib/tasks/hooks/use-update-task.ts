import useRequestState from '~/core/hooks/use-request-state';

import { collection, doc, Timestamp, updateDoc } from 'firebase/firestore';
import { useCallback } from 'react';
import { useFirestore } from 'reactfire';
import { TASKS_COLLECTION } from '~/lib/firestore-collections';

import type { FirebaseError } from 'firebase/app';
import type { Task } from '../@types/task';

function useUpdateTask() {
  const { state, setData, setError, setLoading } =
    useRequestState<WithId<Task>>();
  // TODO: write down the steps you will follow to update a task.
  //1 referencia de firestore

  //2 referencia del documento
  //3 actualizar el documento

  const updateTask = useCallback(
    async (
      taskId: string,
      title: string,
      description: string,
      isCompleted: boolean
    ) => {
      const firestore = useFirestore();

      try {
        setLoading(true);

        const taskCollection = collection(firestore, TASKS_COLLECTION);

        const docRef = doc(firestore, TASKS_COLLECTION, `/${taskId}`);
        const taskUpdate = { id: taskId, title, description, isCompleted };
        await updateDoc(docRef, taskUpdate);
        setData(taskUpdate);
      } catch (error) {
        setError((error as FirebaseError).message);
      }
    },
    [setData, setError, setLoading]
  );

  return [updateTask, state] as [typeof updateTask, typeof state];
}

export default useUpdateTask;
