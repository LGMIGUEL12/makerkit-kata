import { collection } from "firebase/firestore";
import { useFirestore } from "reactfire";
import { TASKS_COLLECTION } from "~/lib/firestore-collections";

function useCreateTask(){
    //1 traer referencia de firestore
    const firestore = useFirestore();
    //2 traer coleccion
    const tasksCollection = collection(firestore, TASKS_COLLECTION)
    //3 crear documento
    //4 guardar documento

}

export default useCreateTask;