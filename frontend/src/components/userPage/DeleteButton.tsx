import { Button } from '@/components/ui/button';
import { Trash, UserPen } from 'lucide-react';
import React from 'react'

interface DeleteButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const DeleteButton:React.FC<DeleteButtonProps> = ({onClick, disabled}) => {
  return (

      <Button variant={"destructive"} onClick={onClick} disabled={disabled}>
        Delete
        <Trash className="size-6" />
      </Button>
  );
}

export default DeleteButton