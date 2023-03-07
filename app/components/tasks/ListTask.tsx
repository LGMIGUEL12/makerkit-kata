import { Trans } from 'react-i18next';
import Alert from '~/core/ui/Alert';
import If from '~/core/ui/If';
import SubHeading from '~/core/ui/SubHeading';
import useListTask from '~/lib/tasks/hooks/use-list-task';
import CardsTasks from './CardsTasks';

const ListTask: React.FC<{}> = () => {
  const { data: tasks, error, status } = useListTask();

  if (status === 'loading') {
    return <SubHeading>Loading ...</SubHeading>;
  }

  if (status === 'error') {
    return (
      <Alert type="error">
        <Trans i18nKey="task: loadTasksError" />
        <span>{error?.message}</span>
      </Alert>
    );
  }
  
  return (
    <>
      <div
        className={`flex flex-col space-y-4 md:space-y-0 lg:mt-8 lg:flex-row lg:space-x-14 xl:space-x-20`}
      >
        <div className={'grid grid-cols-4'}>
          <If condition={status === 'success'}>
            {tasks.map((task) => {
              return <CardsTasks key={task.id} task={task} />;
            })}
          </If>
        </div>
      </div>
    </>
  );
};

export default ListTask;
