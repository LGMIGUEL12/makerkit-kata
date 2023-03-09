import { useNavigate } from '@remix-run/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '~/core/ui/Modal';
import UpdateTaskContainer from './UpdateTaskContainer';

const UpdateTaskModal: React.FCC<{ taskId: string }> = ({ taskId }) => {
  const [isOpen, setIsOpen] = useState(true);
  const { t } = useTranslation();
  const navigation = useNavigate();

  const onClose = (flag: boolean) => {
    navigation(-1);
    setIsOpen(flag);
  };

  return (
    <Modal
      heading={t<string>('Update task')}
      isOpen={isOpen}
      setIsOpen={onClose}
    >
      <UpdateTaskContainer taskId={taskId } />
    </Modal>
  );
};

export default UpdateTaskModal;
