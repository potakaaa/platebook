import { Button } from '@/components/ui/button';
import useMutationInteraction from '@/hooks/tanstack/interaction/useMutationInteraction';
import { UserPen, UserRoundCheckIcon, UserRoundPlusIcon } from 'lucide-react';
import React from 'react'
import { set } from 'zod';


interface FollowButtonProps {
    id: string;
    isFollowing: boolean;
}

const FollowButton:React.FC<FollowButtonProps> = ({id, isFollowing: initialIsFollowing}) => {

    const {useMutationFollowUser, useMutationUnfollowUser} = useMutationInteraction();
    const {mutate: follow, isPending: FollowPending} = useMutationFollowUser();
    const {mutate: unfollow, isPending: UnfollowPending} = useMutationUnfollowUser();

    const [isFollowing, setIsFollowing] = React.useState(initialIsFollowing);

    const handleClick = async () => {
        if(!isFollowing){
            follow(id,{
                onSuccess: () => {
                    setIsFollowing(true);
                },
                onError: (error) => {
                    console.error("Follow Error:", error);
                }

            });
        } else if (isFollowing){
            unfollow(id, {
                onSuccess: () => {
                    setIsFollowing(false);
                },
                onError: (error) => {
                    console.error("Unfollow Error:", error);
                }
            });
        }
    }



  return (
    <Button variant={isFollowing? "default": "outline"} onClick={handleClick}>
      Follow{isFollowing ? "ing" : ""}
      {isFollowing ? (
        <UserRoundCheckIcon className="size-6" />
      ) : (
        <UserRoundPlusIcon className="size-6" />
      )}
    </Button>
  );
}

export default FollowButton