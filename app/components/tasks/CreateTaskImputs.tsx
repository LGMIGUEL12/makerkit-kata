import { Trans } from 'react-i18next';
import Button from '~/core/ui/Button';
import TextField from '~/core/ui/TextField';

const CreateTaskImputs: React.FC<{}> = () => {
  return (
    <>
      <form>
        <div>
          <div>
            <TextField>
              <TextField.Label>
                <Trans i18nKey={'common:titleImputTabLabel'} />
                <TextField.Input
                  placeholder={'this will be the title of your rare'}
                />
              </TextField.Label>
            </TextField>
            <TextField>
              <TextField.Label>
                <Trans i18nKey={'common:descriptionImputTabLabel'} />
                <TextField.Input
                  placeholder={'add here the description of your task'}
                />
              </TextField.Label>
            </TextField>
            <div className={'flex justify-end'}>
              <Button className={'w-full md:w-auto'}>
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
