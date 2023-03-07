import { TASKS_COLLECTION } from './../../firestore-collections';
import { collection, CollectionReference, query } from 'firebase/firestore';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';

import type { Task } from '../@types/task';

/**
 * @name useListTasks
 * @description Returns a stream with the posts which belong to the selected organization.
 * @param organizationId
 */

function useListTask() {
  const firestore = useFirestore();

  const taskCollection = collection(
    firestore,
    TASKS_COLLECTION
  ) as CollectionReference<Task>;

  const listTaskQuery = query(taskCollection);

  return useFirestoreCollectionData(listTaskQuery, {
    initialData: [],
    idField: 'id',
  });
}

export default useListTask;
