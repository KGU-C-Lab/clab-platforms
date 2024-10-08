import { Badge, type BadgeColorVariant } from '@clab-platforms/design-system';

import { BOOK_STATE } from '@constants/state';

import type { BookLoanRecordConditionType } from '@type/book';

interface BookLoanConditionStatusBadgeProps
  extends Pick<BookLoanRecordConditionType, 'borrowedAt' | 'returnedAt'> {}

const BookLoanConditionStatusBadge = ({
  borrowedAt,
  returnedAt,
}: BookLoanConditionStatusBadgeProps) => {
  const text = !borrowedAt
    ? BOOK_STATE.WAIT
    : !returnedAt
      ? BOOK_STATE.BORROWED
      : BOOK_STATE.RETURN;
  const color: BadgeColorVariant = !borrowedAt
    ? 'red'
    : !returnedAt
      ? 'yellow'
      : 'green';

  return <Badge color={color}>{text}</Badge>;
};

export default BookLoanConditionStatusBadge;
