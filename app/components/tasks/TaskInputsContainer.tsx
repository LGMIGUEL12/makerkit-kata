import { Trans } from 'react-i18next';
import Button from '~/core/ui/Button';
import TextField from '~/core/ui/TextField';

const TaskInputsContainer: React.FC<{}> = () => {
  return (
    <>
      <form>
        <div className={'flex flex-col space-y-4'}>
          <TextField>
            <TextField.Label>
              <Trans i18nKey={'common:titleFormTask'} />

              <TextField.Input
                data-cy={''}
                required
                placeholder={'title form task'}
                name={'title'}
              />
            </TextField.Label>
          </TextField>
          <TextField>
            <TextField.Label>
              <Trans i18nKey={'common:descriptionFormTask'} />

              <TextField.Input
                data-cy={''}
                required
                placeholder={'description form task'}
                name={'description'}
              />
            </TextField.Label>
          </TextField>

          <Button>
            <Trans i18nKey={'common:buttonCreateTask'} />
          </Button>
        </div>
      </form>
    </>
  );
};

export default TaskInputsContainer;
