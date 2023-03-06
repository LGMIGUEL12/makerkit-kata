import { doc } from 'firebase/firestore';
import { useFirestore, useFirestoreDocData } from 'reactfire';
import { TASKS_COLLECTION } from '~/lib/firestore-collections';

import type { Task } from '~/lib/tasks/@type/task';
import type { DocumentReference } from 'firebase/firestore';

function useReadTask(taskId: string) {
  const firestore = useFirestore();
  const docRef = doc(
    firestore,
    TASKS_COLLECTION,
    `/${taskId}`
  ) as DocumentReference<Task>;
  return useFirestoreDocData<Task>(docRef, {
    idField: 'id',
    initialData: undefined,
  });
}
export default useReadTask;
