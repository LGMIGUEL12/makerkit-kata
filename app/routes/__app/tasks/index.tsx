import { Trans } from 'react-i18next';
import AppContainer from '~/components/AppContainer';
import AppHeader from '~/components/AppHeader';
import TasksContainer from '~/components/tasks/TasksContainer';
import ClientOnly from '~/core/ui/ClientOnly';

function TasksPage() {
  return (
    <>
      <AppHeader>
        <Trans i18nKey={'common:tasksTabLabel'} />
      </AppHeader>
      <ClientOnly>
        <AppContainer>
          <TasksContainer />
        </AppContainer>
      </ClientOnly>
    </>
  );
}

export default TasksPage;
