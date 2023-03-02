import DeleteButtonTask from './DeleteButtonTask';
import EditButtonTask from './EditButtonTask';

import type Task from '~/lib/tasks/@type/task';

const CardTaskContainer: React.FC<{ task: Task }> = ({ task }) => {
  return (
    <div className="h-30 p6 border-1 m-5 flex flex-col rounded border-inherit text-center">
      <h1 className="text-center text-base font-bold">{task.title}</h1>
      <p className="text-base">{task.description}</p>
      <div className="flex justify-around">
        <div>
          <EditButtonTask task={task} />
        </div>
        <div>
          <DeleteButtonTask taskId={task.id as string} />
        </div>
      </div>
    </div>
  );
};

export default CardTaskContainer;
