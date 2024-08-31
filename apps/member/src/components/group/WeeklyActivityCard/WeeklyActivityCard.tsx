import { useNavigate } from 'react-router-dom';

import { RegularFileAltOutline } from '@clab-platforms/icon';

import File from '@components/common/File/File';

import { PATH_FINDER } from '@constants/path';
import useToast from '@hooks/common/useToast';

import { ActivityBoardType } from '@type/activity';
import type { ResponseFile } from '@type/api';

interface WeeklyActivityCardProps {
  index: number;
  title?: string;
  content: string;
  assignments?: Array<ActivityBoardType>;
  isParticipant: boolean;
  groupId: number;
  files?: Array<ResponseFile>;
}

const WeeklyActivityCard = ({
  index,
  title,
  content,
  assignments,
  isParticipant,
  groupId,
  files,
}: WeeklyActivityCardProps) => {
  const navigate = useNavigate();
  const toast = useToast();

  const onClick = (assignmentId: number, state: Array<string | undefined>) => {
    if (isParticipant) {
      navigate(PATH_FINDER.ACTIVITY_ASSIGNMENT(groupId, assignmentId), {
        state: { name: state },
      });
    } else {
      toast({
        state: 'error',
        message: '참여자만 열람이 가능해요.',
      });
    }
  };

  return (
    <div key={index + 1}>
      <div className="flex items-center justify-between pt-2">
        <div className="flex gap-2 font-semibold">
          <span>{index + 1}.</span>
          <span>{title}</span>
        </div>
      </div>
      <div className="overflow-hidden transition duration-500 ease-in-out">
        <div className="mt-2 space-y-4">
          <p className="whitespace-pre-line break-keep text-sm">{content}</p>
          {files?.map((file) => (
            <File key={file.fileUrl} href={file.fileUrl}>
              <p className="mt-4 text-gray-700 ">{file.originalFileName}</p>
            </File>
          ))}
          {assignments?.map(({ id: assignmentId, title: assignmentTitle }) => (
            <div
              key={assignmentId}
              onClick={() => onClick(assignmentId, [title, assignmentTitle])}
              className="flex cursor-pointer items-center rounded-lg transition-colors duration-300 ease-in-out hover:bg-gray-100"
            >
              <RegularFileAltOutline
                width={25}
                height={25}
                className="flex items-center justify-center p-1 text-red-500"
              />
              <span>{assignmentTitle}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeeklyActivityCard;
