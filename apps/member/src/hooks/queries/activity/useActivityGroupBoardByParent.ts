import { useSuspenseQuery } from '@tanstack/react-query';

import { getActivityBoardByParent } from '@api/activity';
import { ACTIVITY_QUERY_KEY } from '@constants/key';

import { WithPaginationParams } from '@type/api';

interface useActivityGroupBoardByParentProps extends WithPaginationParams {
  parentId: number;
}

/**
 * 부모 및 자식 게시판을 함께 반환합니다.
 */
export function useActivityGroupBoardByParent({
  parentId,
  page = 0,
  size = 99,
}: useActivityGroupBoardByParentProps) {
  return useSuspenseQuery({
    queryKey: [ACTIVITY_QUERY_KEY.BOARD({ id: parentId, parent: true })],
    queryFn: () => getActivityBoardByParent({ parentId, page, size }),
  });
}
