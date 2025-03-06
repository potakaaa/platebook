import { Button } from '@/components/ui/button';
import { UserPen } from 'lucide-react';
import React from 'react'



interface EditButtonProps {
  onClick: () => void;
}
      
const EditButton: React.FC<EditButtonProps> = ({ onClick }) => {
  return (

      <Button variant={"outline"} onClick={onClick}>
        Edit
        <UserPen className="size-6" />
      </Button>
  );
}

export default EditButton