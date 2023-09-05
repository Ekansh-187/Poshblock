import React, { useState } from "react";
import { Button, Confirm, useRecordContext, useDelete } from "react-admin";
const ConfirmModal = () => {
  //   const record = useRecordContext();
  const [open, setOpen] = useState(false);

  const [loading, isLoading] = useState(true);

  const handleClick = () => setOpen(true);
  const handleDialogClose = () => setOpen(false);
  const handleConfirm = () => {
    setOpen(false);
  };
  return (
    <>
      <Button label="Delete" onClick={handleClick} />
      <Confirm
        isOpen={open}
        loading={isLoading}
        title={`Delete post`}
        content="Are you sure you want to delete this item?"
        onConfirm={handleConfirm}
        onClose={handleDialogClose}
      />
    </>
  );
};

export default ConfirmModal;
