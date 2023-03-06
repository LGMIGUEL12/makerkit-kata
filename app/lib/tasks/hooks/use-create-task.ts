import { collection } from 'firebase/firestore';
import { useCallback } from 'react';
import { useFirestore } from 'reactfire';
import useRequestState from '~/core/hooks/use-request-state';
import { TASKS_COLLECTION } from '~/lib/firestore-collections';

import type { task } from './../@types/task';

function useCreateTask() {
  const { state, setLoading, setData, setError } =
    useRequestState<WithId<task>>();

  const createTaskCallback = useCallback(
    async (title: string, description: string) => {
      const firestore = useFirestore();
      const tasksCollection = collection(firestore, TASKS_COLLECTION);

      //3 crear documento
      //4 guardar documento},
    },
    []
  );
}

export default useCreateTask;
