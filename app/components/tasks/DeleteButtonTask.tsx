import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import IconButton from '~/core/ui/IconButton';

const DeleteButtonTask: React.FC<{}> = () => {
  return (
    <>
      <IconButton>
        <TrashIcon className="dark h-6" />
      </IconButton>
    </>
  );
};

export default DeleteButtonTask;
