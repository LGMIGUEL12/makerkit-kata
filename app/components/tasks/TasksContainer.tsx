import React from 'react';
import Heading from '~/core/ui/Heading';
import CreateTaskImputs from './CreateTaskImputs';
import CardTaskContainer from './CardTaskContainer';

const TasksContainer: React.FC<{}> = () => {
  return (
    <>
      <div className="flex flex-col ">
        <div>
          <CreateTaskImputs />
        </div>
        <hr className={'mt-3 mb-3'} />
        <div className="text-center">
          <Heading type={2}>Tasks To Do</Heading>
        </div>
        <div>
          <CardTaskContainer />
        </div>
      </div>
    </>
  );
};

export default TasksContainer;
