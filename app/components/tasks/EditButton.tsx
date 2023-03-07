import IconButton from '~/core/ui/IconButton';
import { TrashIcon } from '@heroicons/react/24/outline';

const EditButton: React.FC<{}> = () => {
  return (
    <>
      <IconButton>
        <TrashIcon className="dark h-6" />
      </IconButton>
    </>
  );
};

export default EditButton;
