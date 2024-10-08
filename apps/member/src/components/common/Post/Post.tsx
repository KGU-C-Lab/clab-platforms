import { cn, toDecodeHTMLEntities } from '@clab-platforms/utils';

import { SERVICE_NAME } from '@constants/environment';
import { ROLE_LEVEL } from '@constants/state';
import { formattedDate } from '@utils/date';

import { StrictPropsWithChildren } from '@type/component';
import type { RoleLevelType } from '@type/member';

import Avatar from '../Avatar/Avatar';
import Share from '../Share/Share';

interface Props extends StrictPropsWithChildren {
  className?: string;
}

interface PostHeaderProps {
  title: string;
  createdAt: string;
  src?: string | null;
  writer?: string;
  roleLevel?: RoleLevelType;
}

const Post = ({ className, children }: Props) => {
  return <div className={cn('flex flex-col gap-4', className)}>{children}</div>;
};

const PostHead = ({
  title,
  src,
  writer = SERVICE_NAME,
  roleLevel = ROLE_LEVEL.USER,
  createdAt,
}: PostHeaderProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{toDecodeHTMLEntities(title)}</h2>
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <Avatar src={src} roleLevel={roleLevel} />
          <div className="text-sm">
            <p className="font-semibold">{writer}</p>
            <p>{formattedDate(createdAt)}</p>
          </div>
        </div>
        <Share />
      </div>
      <hr />
    </div>
  );
};

const PostBody = ({ className, children }: Props) => {
  return (
    <div className={cn('whitespace-pre-wrap break-words', className)}>
      {typeof children === 'string' ? toDecodeHTMLEntities(children) : children}
    </div>
  );
};

const PostFooter = ({ className, children }: Props) => {
  return (
    <div className={cn('flex justify-end gap-2', className)}>{children}</div>
  );
};

PostHead.displayName = 'PostHead';
PostBody.displayName = 'PostBody';
PostFooter.displayName = 'PostFooter';

Post.Head = PostHead;
Post.Body = PostBody;
Post.Footer = PostFooter;

export default Post;
