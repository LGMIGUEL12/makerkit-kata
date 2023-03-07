import { useFirestore } from 'reactfire';
import { doc, deleteDoc } from 'firebase/firestore';
import { TASKS_COLLECTION } from '~/lib/firestore-collections';

import type { DocumentReference } from 'firebase/firestore';
import type { Task } from '../@types/task';
import { useCallback } from 'react';

/**
 * @name useDeleteTask
 * @description Returns a stream with the posts which belong to the selected organization
 * @param organizationId
 */

function useDeleteTask() {
  const firestore = useFirestore();

  const deletePostCallback = useCallback(
    (taskId: string) => {
      const deleteRef = doc(
        firestore,
        TASKS_COLLECTION,
        taskId
      ) as DocumentReference<Task>;

      return deleteDoc(deleteRef);
    },
    [firestore]
  );

  return deletePostCallback;
}

export default useDeleteTask;
