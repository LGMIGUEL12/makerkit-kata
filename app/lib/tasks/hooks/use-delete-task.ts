import { useFirestore } from 'reactfire';
import { doc, deleteDoc } from 'firebase/firestore';
import { TASKS_COLLECTION } from '~/lib/firestore-collections';

import type { DocumentReference } from 'firebase/firestore';
import type Task from '../@type/task';
import { useCallback } from 'react';

/**
 * @name useeleteTask
 * @description Returns a stream with the posts which belong to the selected organization
 * @param organizationId
 */

function useDeleteTask() {
    const firestore = useFirestore();

    const deletePostCallback = useCallback(
        (taskId: string) => {
          const postRef = doc(
            firestore,
            TASKS_COLLECTION,
            taskId
          ) as DocumentReference<Task>;
    
          return deleteDoc(postRef);
        },
        [firestore]
      );
    
      return deletePostCallback;
}

export default useDeleteTask;
