import { useCallback } from 'react';

import { Table } from '@clab/design-system';

import { Section } from '@components/common/Section';

import useModal from '@hooks/common/useModal';
import { useSchedule } from '@hooks/queries';
import { formattedDate, formattedDatePeriod } from '@utils/date';

const CalendarTableSection = () => {
  const { openModal } = useModal();
  const { data } = useSchedule();

  const handleScheduleClick = useCallback(
    (detail: string, startDate: string, endDate: string) => {
      openModal({
        title: '📆 일정',
        content: `일시: ${formattedDatePeriod(startDate, endDate)}\n내용: ${detail}`,
      });
    },
    [openModal],
  );

  return (
    <Section>
      <Table head={['날짜', '일정명']} className="table-fixed">
        {data.items.map(({ id, title, detail, startDate, endDate }) => (
          <Table.Row
            key={id}
            onClick={() => handleScheduleClick(detail, startDate, endDate)}
          >
            <Table.Cell>{`${formattedDate(startDate)} ~ ${formattedDate(endDate)}`}</Table.Cell>
            <Table.Cell>{title}</Table.Cell>
          </Table.Row>
        ))}
      </Table>
    </Section>
  );
};

export default CalendarTableSection;
