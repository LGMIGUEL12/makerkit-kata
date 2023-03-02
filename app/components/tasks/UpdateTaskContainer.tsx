import React, { useCallback, useContext, useEffect } from 'react';
import Button from '~/core/ui/Button';
import Modal from '~/core/ui/Modal';
import TextField from '~/core/ui/TextField';
import { useTranslation, Trans } from 'react-i18next';
import { useForm } from 'react-hook-form';
import useUpdateTask from '~/lib/tasks/hooks/use-update-task';
import toast from 'react-hot-toast';
import OrganizationContext from '~/lib/contexts/organization';

import type Task from '~/lib/tasks/@type/task';

const EditTaskButton: React.FC<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => unknown;
  task: Task;
}> = ({ isOpen, setIsOpen, task }) => {
  const { organization } = useContext(OrganizationContext);
  const { t } = useTranslation();
  const currentTaskText = task.taskText ?? '';
  const [updateTask, updateTaskstate] = useUpdateTask();
  const { loading } = updateTaskstate;

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      taskText: currentTaskText,
    },
  });

  const taskTextControl = register('taskText', { value: currentTaskText });

  const onError = useCallback(() => {
    toast.error(`Please write some text to post`);
  }, []);

  const onSubmit = async (taskText: string) => {
    const isTextInvalid = !taskText;
    if (isTextInvalid) {
      return onError();
    }

    await toast.promise(
      updateTask(task.id as string, taskText, organization?.id as string),
      {
        success: () => {
          setIsOpen(false);
          return t<string>(`post:updateTaskSuccess`);
        },
        error: t<string>(`post:updateTaskError`),
        loading: t<string>(`post:updateTaskLoading`),
      }
    );
  };

  useEffect(() => {
    reset({
      taskText: currentTaskText,
    });
  }, [currentTaskText, reset]);

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      heading={t<string>('post:EditTaskButtonHeading')}
    >
      <form
        onSubmit={handleSubmit((value) => {
          return onSubmit(value.taskText);
        })}
      >
        <div className={'flex flex-col space-y-4'}>
        <TextField>
              <TextField.Label>
                <Trans i18nKey={'task:titleInputLabel'} />
                <TextField.Input
                  name={taskTextControl.name}
                  innerRef={taskTextControl.ref}
                  onChange={taskTextControl.onChange}
                  onBlur={taskTextControl.onBlur}
                  required
                  data-cy={'task-title-input'}
                  placeholder={'Ex. "Do this by night"'}
                />
              </TextField.Label>
            </TextField>
          <TextField>
            <TextField.Label>
              <Trans i18nKey={'post:taskTextInputLabel'} />
              <TextField.Input
                data-cy={'task-title-input'}
                required
                name={taskTextControl.name}
                innerRef={taskTextControl.ref}
                onChange={taskTextControl.onChange}
                onBlur={taskTextControl.onBlur}
              />
            </TextField.Label>
          </TextField>
          <Button
            data-cy={'create-task-submit-button'}
            className={'w-full md:w-auto'}
            loading={loading}
          >
            <Trans i18nKey={'post:updateTaskSubmitLabel'} />
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditTaskButton;