import Heading from '~/core/ui/Heading';
import ListTask from './ListTask';
import TaskInputsContainer from './TaskInputsContainer';

const TasksLayout: React.FC<{}> = () => {
  return (
    <>
      <div className="flex flex-col ">
        <div>
          <TaskInputsContainer />
        </div>
      </div>
      <hr className={'mt-3 mb-3'} />
      <div className="text-center">
        <Heading type={2}>Tasks To Do</Heading>
      </div>
      <div>
        <ListTask />
      </div>
    </>
  );
};

export default TasksLayout;
