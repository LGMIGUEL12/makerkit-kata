import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Trans, useTranslation } from 'react-i18next';
import Button from '~/core/ui/Button';
import TextField from '~/core/ui/TextField';
import useCreateTask from '~/lib/tasks/hooks/use-create-task';

const CreateTaskImputs: React.FC<{}> = () => {
  const [createTask, createTaskState] = useCreateTask();
  const { loading } = createTaskState;
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
  return (
    <>
      <form
        onSubmit={handleSubmit((value) => {
          return onSubmit(value.title, value.description);
        })}
      >
        <div>
          <div>
            <TextField>
              <TextField.Label>
                <Trans i18nKey={'common:titleImputTabLabel'} />
                <TextField.Input
                  name={titleControl.name}
                  innerRef={titleControl.ref}
                  onChange={titleControl.onChange}
                  onBlur={titleControl.onBlur}
                  required
                  data-cy={'task-title-input'}
                  placeholder={'this will be the title of your rare'}
                />
              </TextField.Label>
            </TextField>
            <TextField>
              <TextField.Label>
                <Trans i18nKey={'common:descriptionImputTabLabel'} />
                <TextField.Input
                  name={descriptionControl.name}
                  innerRef={descriptionControl.ref}
                  onChange={descriptionControl.onChange}
                  onBlur={descriptionControl.onBlur}
                  required
                  data-cy={'task-description-input'}
                  placeholder={'add here the description of your task'}
                />
              </TextField.Label>
            </TextField>
            <div className={'flex justify-end'}>
              <Button
                className={'w-full md:w-auto'}
                data-cy={'create-task-submit-button'}
                loading={loading}
              >
                <Trans i18nKey={'common:createButtonSubmit'} />
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateTaskImputs;
