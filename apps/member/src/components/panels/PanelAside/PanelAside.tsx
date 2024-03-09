import AttendanceFairyPanel from '@components/panels/AttendanceFairyPanel/AttendanceFairyPanel';
import ProfilePanel from '@components/panels/ProfilePanel/ProfilePanel';
import AlarmPanel from '../AlarmPanel/AlarmPanel';
import ActivityPanel from '../ActivityPanel/ActivityPanel';
import BookPanel from '../BookPanel/BookPanel';
import AccountPanel from '../AccountPanel/AccountPanel';
import { useMyNotifications } from '@hooks/queries';
import { useMyBookLoan } from '@hooks/queries/useMyBookLoan';
import { useMyActivity } from '@hooks/queries/useMyActivity';
import { useMyProfile } from '@hooks/queries/useMyProfile';

const PanelAside = () => {
  const { data: myNotificationsData } = useMyNotifications();
  const { data: myActivities } = useMyActivity();
  const { data: myProfile } = useMyProfile();
  const { data: myBooksData } = useMyBookLoan(0, 20, myProfile.id);

  return (
    <aside className="hidden xl:w-1/4 xl:block">
      <div className="space-y-4">
        <ProfilePanel
          name={myProfile.name}
          image={myProfile.imageUrl}
          createdAt={myProfile.createdAt}
        />
        <AttendanceFairyPanel />
        <AlarmPanel data={myNotificationsData.items} />
        <ActivityPanel data={myActivities.items} />
        <BookPanel data={myBooksData} memberId={myProfile.id} />
        <AccountPanel />
      </div>
    </aside>
  );
};

export default PanelAside;
