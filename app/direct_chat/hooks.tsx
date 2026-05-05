import { useEffect, useState } from "react";

export function useEditMode(chatID: number = 0) {
  const [isEditMode, setEditMode] = useState(false);

  useEffect(() => {
    setEditMode(false);
  }, [chatID]);

  const enable = () => setEditMode(true);
  const disable = () => setEditMode(false);
  const toggle = () => setEditMode(prev => !prev);

  return {
    isEditMode,
    enable,
    disable,
    toggle,
  };
};