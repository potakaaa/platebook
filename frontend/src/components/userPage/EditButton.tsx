import { Button } from '@/components/ui/button';
import { UserPen } from 'lucide-react';
import React from 'react'

const EditButton = () => {
  return (

      <Button variant={"outline"}>
        Edit
        <UserPen className="size-6" />
      </Button>
  );
}

export default EditButton