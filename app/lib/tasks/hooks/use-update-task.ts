import { useCallback } from 'react';
import { useUser } from 'reactfire';
import {
  getFirestore,
  collection,
  doc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import useRequestState from '~/core/hooks/use-request-state';
import {
  TASKS_COLLECTION,
  USERS_COLLECTION,
} from '~/lib/firestore-collections';

import type { FirebaseError } from 'firebase/app';
import type { DocumentReference, Timestamp } from 'firebase/firestore';
import type Task from '../@type/task';
import type UserData from '~/core/session/types/user-data';

/**
 * @name useUpdateTask
 * @description Update a task
 * @param taskId
 */
function useUpdateTask() {
  const user = useUser();
  const userId = user.data?.uid as string;

  const { state, setError, setData, setLoading } =
    useRequestState<WithId<Task>>();

  const createTaskCallback = useCallback(
    async (taskId: string, taskText: string, organizationId: string) => {
      const firestore = getFirestore();

      try {
        setLoading(true);

        const tasksCollection = collection(firestore, TASKS_COLLECTION);

        const userDoc = doc(
          firestore,
          USERS_COLLECTION,
          userId
        ) as DocumentReference<UserData>;

        const taskDoc = doc(tasksCollection, `/${taskId}`);

        const updatedAt = serverTimestamp() as Timestamp;

        const taskData = {
          taskText,
          userId: userDoc.id,
          updatedAt,
        };

        updateDoc(taskDoc, taskData);

        setData({
          id: taskDoc.id,
          taskText,
          userId: userDoc.id,
          //   organizationId: organizationId,
          updatedAt,
        });
      } catch (e) {
        console.error((e as FirebaseError).message);
        setError((e as FirebaseError).message);
      }
    },
    [setData, setError, setLoading, userId]
  );

  return [createTaskCallback, state] as [
    typeof createTaskCallback,
    typeof state
  ];
}

export default useUpdateTask;