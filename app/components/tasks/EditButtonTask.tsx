import IconButton from '~/core/ui/IconButton';
import { PencilIcon } from '@heroicons/react/24/outline';

const EditButtonTask: React.FC<{}> = () => {
  return (
    <>
      <IconButton>
        <PencilIcon className="dark h-6" />
      </IconButton>
    </>
  );
};

export default EditButtonTask;
