import { getPlatelist } from '@/lib/services/api/platelistServices';
import { useQuery } from '@tanstack/react-query';
import React from 'react'

const useQueryPlatelist = () => {
  const useQueryGetPlatelist = () => {
    return useQuery({
      queryKey: ['platelist'],
      queryFn: () => getPlatelist(),
    });
  }


    return {
        useQueryGetPlatelist
    }
}

export default useQueryPlatelist