import { useForm } from 'react-hook-form';
import { Trans } from 'react-i18next';
import Button from '~/core/ui/Button';
import TextField from '~/core/ui/TextField';
import useCreateTask from '~/lib/tasks/hooks/use-create-task';

const TaskInputsContainer: React.FC<{}> = () => {
  // const [createTask, createTaskState] = useCreateTask();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const titleControl = register('title', { required: true });
  const descriptionControl = register('description', { required: true });

  const onSubmit = async (title: string, description: string) => {
    console.log(title);
    console.log(description);
  };

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
