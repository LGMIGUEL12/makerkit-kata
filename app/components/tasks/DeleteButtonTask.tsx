import { TrashIcon } from '@heroicons/react/24/outline';
import IconButton from '~/core/ui/IconButton';
import toaster from 'react-hot-toast';
import React, { useCallback, useState } from 'react';
import useDeleteTask from '~/lib/tasks/hooks/use-delete-task';
import { Trans, useTranslation } from 'react-i18next';
import If from '~/core/ui/If';
import Modal from '~/core/ui/Modal';
import Button from '~/core/ui/Button';

const DeleteButtonTask: React.FCC<{ taskId: string }> = ({ taskId }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteTaskRequest = useDeleteTask();
  const { t } = useTranslation();

  const onTaskDeleteRequest = useCallback(async () => {
    const promise = deleteTaskRequest(taskId);

    await toaster.promise(promise, {
      success: t<string>(`post:deletePostSuccessMessage`),
      error: t<string>(`post:deletePostErrorMessage`),
      loading: t<string>(`post:deletePostLoadingMessage`),
    });

    setIsDeleting(false);
  }, [deleteTaskRequest, taskId, t]);

  return (
    <>
      <IconButton
        data-cy={'delete-post-button'}
        onClick={() => setIsDeleting(true)}
      >
        <TrashIcon className="dark h-6" />
      </IconButton>
      <If condition={isDeleting}>
        <Modal
          heading={<Trans i18nKey={'post:deletePostModalHeading'} />}
          isOpen={isDeleting}
          setIsOpen={setIsDeleting}
        >
          <div className={'flex flex-col space-y-4'}>
            <p>
              <Trans i18nKey={'common:modalConfirmationQuestion'} />
            </p>
            <Button
              data-cy={'confirm-delete-post-button'}
              color={'danger'}
              onClick={onTaskDeleteRequest}
            >
              <Trans i18nKey={'post:deletePostSubmitLabel'} />
            </Button>
          </div>
        </Modal>
      </If>
    </>
  );
};

export default DeleteButtonTask;
