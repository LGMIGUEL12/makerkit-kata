import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Trans, useTranslation } from 'react-i18next';
import Button from '~/core/ui/Button';
import TextField from '~/core/ui/TextField';
import useCreateTask from '~/lib/tasks/hooks/use-create-task';

const TaskInputsContainer: React.FC<{}> = () => {
  const [createTask, requestState] = useCreateTask();
  const { t } = useTranslation();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const titleControl = register('title', { required: true });
  const descriptionControl = register('description', { required: true });

  const onError = useCallback(() => {
    toast.error('Error: please fill in all the required fields');
  }, []);

  const onSubmit = async (title: string, description: string) => {
    console.log(title);
    console.log(description);

    if (!title || !description) {
      return onError();
    }
    await toast.promise(createTask(title, description), {
      success: t<string>(`task:createTaskSuccess`),
      error: t<string>(`task:createTaskError`),
      loading: t<string>(`task:createTaskLoading`),
    });
  };
  useEffect(() => {
    reset({
      title: '',
      description: '',
    });
  }, [reset]);
  return (
    <>
      <form
        onSubmit={handleSubmit((value) => {
          return onSubmit(value.title, value.description);
        })}
      >
        <div className={'mb-2 flex flex-col space-y-4'}>
          <TextField>
            <TextField.Label>
              <Trans i18nKey={'common:titleFormTask'} />
              <TextField.Input
                name={titleControl.name}
                innerRef={titleControl.ref}
                onChange={titleControl.onChange}
                onBlur={titleControl.onBlur}
                required
                placeholder={'title form task'}
                data-cy={'task-title-input'}
              />
            </TextField.Label>
          </TextField>
          <TextField>
            <TextField.Label>
              <Trans i18nKey={'common:descriptionFormTask'} />
              <TextField.Input
                name={descriptionControl.name}
                innerRef={descriptionControl.ref}
                onChange={descriptionControl.onChange}
                onBlur={descriptionControl.onBlur}
                required
                placeholder={'description form task'}
                data-cy={'task-description-input'}
              />
            </TextField.Label>
          </TextField>

          <div className={'flex justify-end'}>
            <Button
              className={'w-full md:w-auto'}
              data-cy={'create-task-submit-button'}
              loading={requestState.loading}
            >
              <Trans i18nKey={'common:buttonCreateTask'} />
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default TaskInputsContainer;
