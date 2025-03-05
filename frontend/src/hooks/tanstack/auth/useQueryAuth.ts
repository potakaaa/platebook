import { getUserByID } from '@/lib/services/api/accountServices';
import { useQuery } from '@tanstack/react-query';
import React from 'react'

const useQueryAuth = () => {
  const useQueryGetUserbyID = (id: string) => {
    return useQuery({
      queryKey: ['user', id],
      queryFn: () => getUserByID(id),
      enabled: !!id,
      staleTime: 1000 * 60 * 5,
    });
  }


  return {
    useQueryGetUserbyID
  }
}

export default useQueryAuth