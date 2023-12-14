import React, { useState } from "react";

const useDisclouse = () => {
  const [isOpen, SetIsOpen] = useState(false);

  const onOpen = () => {
    SetIsOpen(true);
  };

  const onClose = () => {
    SetIsOpen(false);
  };
  return { onClose, onOpen, isOpen };
};

export default useDisclouse;
