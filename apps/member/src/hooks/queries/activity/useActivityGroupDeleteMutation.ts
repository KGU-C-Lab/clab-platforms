import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteActivityGroup } from '@api/activity';
import { ACTIVITY_QUERY_KEY } from '@constants/key';
import useToast from '@hooks/common/useToast';

/**
 * 활동을 삭제합니다.
 */
export function useActivityGroupDeleteMutation() {
  const queryClient = useQueryClient();
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: deleteActivityGroup,
    onSuccess: (data) => {
      if (!data) {
        toast({
          state: 'error',
          message: '활동 그룹 삭제에 실패했습니다.',
        });
      } else {
        toast({
          state: 'success',
          message: '활동 그룹 삭제에 성공했습니다.',
        });
      }

      queryClient.invalidateQueries({
        queryKey: ACTIVITY_QUERY_KEY.DETAIL(data),
      });
    },
  });

  return { activityGroupDeleteMutate: mutation.mutate };
}
