import { Suspense } from 'react';

import CalendarSection from '@components/calendar/CalendarSection/CalendarSection';
import CalendarStatusSection from '@components/calendar/CalendarStatusSection/CalendarStatusSection';
import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';

const CalendarPage = () => {
  return (
    <Content>
      <Header title="일정" />
      <Suspense>
        <CalendarStatusSection />
      </Suspense>
      <Suspense>
        <CalendarSection />
      </Suspense>
    </Content>
  );
};

export default CalendarPage;
