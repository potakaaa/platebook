import { getPlatelist } from "@/lib/services/api/platelistServices";
import { PlatelistItem } from "@/lib/types/platelistTypes";
import { useUserStore } from "@/store/user/UserStore";
import { useQuery } from "@tanstack/react-query";

export const useQueryPlatelist = () => {
  const { user, setPlateList } = useUserStore();

  const useQueryGetPlatelist = () => {
    return useQuery<PlatelistItem[]>({
      queryKey: ["platelist", user?.id],

      queryFn: async (): Promise<PlatelistItem[]> => {
        if (!user) return [];
        const response = await getPlatelist();
        console.log(response);
        const platelist = response[0]?.cooklist_items || [];

        setPlateList(platelist);
        return platelist;
      },
      enabled: !!user,
      staleTime: 1000 * 60 * 5,
    });
  };

  return {
    useQueryGetPlatelist,
  };
};

export default useQueryPlatelist;
