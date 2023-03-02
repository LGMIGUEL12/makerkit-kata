import { TASKS_COLLECTION } from './../../firestore-collections';
import { collection, query, where } from 'firebase/firestore';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';

import type { CollectionReference } from 'firebase/firestore';
import type Task from '../@type/task';

/**
 * @name useListTasks
 * @description Returns a stream with the posts which belong to the selected organization.
 * @param organizationId
 */

function useListTasks() {
  const firestore = useFirestore();

  const taskCollection = collection(
    firestore,
    TASKS_COLLECTION
  ) as CollectionReference<Task>;

  const listTaskQuery = query(
    taskCollection
    //  where('organizationId','==',organizationId)
    //  orderBy('createdAt','asc')
  );

  return useFirestoreCollectionData(listTaskQuery, {
    initialData: [],
    idField: 'id',
  });
}

export default useListTasks;
