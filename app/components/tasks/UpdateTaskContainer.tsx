import React, { useCallback, useContext, useEffect } from 'react';
import Button from '~/core/ui/Button';
import TextField from '~/core/ui/TextField';
import { useTranslation, Trans } from 'react-i18next';
import { useForm } from 'react-hook-form';
import useUpdateTask from '~/lib/tasks/hooks/use-update-task';
import toast from 'react-hot-toast';

import { useNavigate } from '@remix-run/react';
import useReadTask from '~/lib/tasks/hooks/use-read-task';
import SubHeading from '~/core/ui/SubHeading';
import If from '~/core/ui/If';

const UpdateTaskContainer: React.FC<{ taskId: string }> = ({ taskId }) => {
  const { t } = useTranslation();
  const navigation = useNavigate();
  const { data: task, error, status } = useReadTask(taskId);
  const [updateTask, requestState] = useUpdateTask();
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const titleControl = register('title', { required: true });
  const descriptionControl = register('description', { required: true });


  const onSubmit = async (title: string, description: string) => {
    return toast.promise(updateTask(taskId, title, description), {
      loading: t<string>('Loading task'),
      success: () => {
        reset({
          title: '',
          description: '',
        });
        navigation(-1);
        return t<string>('Task updated successfully');
      },
      error: t<string>('Error updating task'),
    });
  };

  useEffect(() => {
    reset({
      title: '',
      description: '',
    });
  }, [reset]);

  if (status === 'success') {
    if (task !== undefined) {
      setValue('title', task?.title);
      setValue('description', task?.description);
  
    }
  }

  return (
    <>
      <If condition={status === 'loading'}>
        <SubHeading>Loading...</SubHeading>
      </If>
      <If condition={status === 'error'}>
        <SubHeading>An error has occurred</SubHeading>
        <p>{error?.message}</p>
      </If>
      <If condition={status === 'success'}>
        <form
          className={'space-y-2'}
          data-cy={'update-task-form'}
          onSubmit={handleSubmit((value) => {
            return onSubmit(
              value.title,
              value.description
            );
          })}
        >
          <TextField>
            <TextField.Label>
              Title
              <TextField.Input
                innerRef={titleControl.ref}
                name={titleControl.name}
                required={titleControl.required}
                onBlur={titleControl.onBlur}
                onChange={titleControl.onChange}
                placeholder="Enter a task title"
                data-cy={'task-name-input'}
              />
            </TextField.Label>
          </TextField>

          <TextField>
            <TextField.Label>
              Description
              <TextField.Input
                innerRef={descriptionControl.ref}
                name={descriptionControl.name}
                required={descriptionControl.required}
                onBlur={descriptionControl.onBlur}
                onChange={descriptionControl.onChange}
                placeholder="Please enter a description"
                data-cy={'task-description-input'}
              />
            </TextField.Label>
          </TextField>


          <Button className="w-full" loading={requestState.loading}>
            <Trans i18nKey={'Update task'} />
          </Button>
        </form>
      </If>
    </>
  );
};

export default UpdateTaskContainer;
