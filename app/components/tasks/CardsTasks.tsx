import EditButton from './EditButton';
import DeleteButton from './DeleteButton';

import type { Task } from '~/lib/tasks/@types/task';
import { string } from 'zod';

const CardsTasks: React.FC<{ task: Task }> = ({ task }) => {
  return (
    <>
      <div className="h-30 p6 border-1 m-5 flex flex-col rounded border-inherit text-center">
        <h1 className="text-center text-base font-bold">{task.title}</h1>
        <p className="text-base">{task.description}</p>
        <div className="flex justify-around">
          <div>
            <EditButton task={task} />
          </div>
          <div>
            <DeleteButton  />
          </div>
        </div>
      </div>
    </>
  );
};

export default CardsTasks;
