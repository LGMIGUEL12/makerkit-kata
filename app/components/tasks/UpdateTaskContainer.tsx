import React, { useCallback, useContext, useEffect } from 'react';
import Button from '~/core/ui/Button';
import Modal from '~/core/ui/Modal';
import TextField from '~/core/ui/TextField';
import { useTranslation, Trans } from 'react-i18next';
import { useForm } from 'react-hook-form';
import useUpdateTask from '~/lib/tasks/hooks/use-update-task';
import toast from 'react-hot-toast';
import OrganizationContext from '~/lib/contexts/organization';

import { Task } from '~/lib/tasks/@types/task';
import { title } from 'process';

const EditTaskButton: React.FC<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => unknown;
  task: Task;
}> = ({ isOpen, setIsOpen, task }) => {
  const { organization } = useContext(OrganizationContext);
  const { t } = useTranslation();
  const currentTaskTitle = task.title ?? '';
  const currentTaskDescripton = task.description ?? '';
  const [updateTask, updateTaskstate] = useUpdateTask();
  const { loading } = updateTaskstate;

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      taskTitle: currentTaskTitle,
      taskDescription: currentTaskDescripton,
    },
  });

  const taskTitleControl = register('taskTitle', { value: currentTaskTitle });
  const taskDescriptionControl = register('taskDescription', {value: currentTaskDescripton});

  const onError = useCallback(() => {
    toast.error(`Please write some text to task`);
  }, []);

  const onSubmit = async (taskTitle: string , taskDescription:string) => {
    const isTextInvalid = !taskTitle;
    const isDescriptionInvalid = !taskDescription;
    if (isTextInvalid || isDescriptionInvalid) {
      return onError();
    }

    await toast.promise(
      updateTask(
        task.id as string,
        task.title as string,
        task.description as string,
        task.isCompleted
      ),
      {
        success: () => {
          setIsOpen(false);
          return t<string>(`common:updateTaskSuccess`);
        },
        error: t<string>(`common:updateTaskError`),
        loading: t<string>(`common:updateTaskLoading`),
      }
    );
  };

  useEffect(() => {
    reset({
      taskTitle: currentTaskTitle,
      taskDescription: currentTaskDescripton,
    });
  }, [currentTaskTitle, currentTaskDescripton, reset]);

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      heading={t<string>('common:EditTaskButtonHeading')}
    >
      <form
        onSubmit={handleSubmit((value) => {
          return onSubmit(value.taskTitle, value.taskDescription );
        })}
      >
        <div className={'flex flex-col space-y-4'}>
          <TextField>
            <TextField.Label>
              <Trans i18nKey={'common:titleImputTabLabel'} />
              <TextField.Input
                name={taskTitleControl.name}
                innerRef={taskTitleControl.ref}
                onChange={taskTitleControl.onChange}
                onBlur={taskTitleControl.onBlur}
                required
                data-cy={'task-title-input'}
              />
            </TextField.Label>
          </TextField>
          <TextField>
            <TextField.Label>
              <Trans i18nKey={'common:descriptionInputTabLabel'} />
              <TextField.Input
                name={taskDescriptionControl.name}
                innerRef={taskDescriptionControl.ref}
                onChange={taskDescriptionControl.onChange}
                onBlur={taskDescriptionControl.onBlur}
                required
                data-cy={'task-description-input'}
              />
            </TextField.Label>
          </TextField>
          <Button
            data-cy={'create-task-submit-button'}
            className={'w-full md:w-auto'}
            loading={loading}
          >
            <Trans i18nKey={'common:createButtonSubmit'} />
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditTaskButton;
