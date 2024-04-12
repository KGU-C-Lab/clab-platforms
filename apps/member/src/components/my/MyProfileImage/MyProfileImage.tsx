import { useCallback, useEffect, useRef, useState } from 'react';

import { Input } from '@clab/design-system';

import Image from '@components/common/Image/Image';

import { createImageUrl } from '@utils/api';
import { getProfileRingStyle } from '@utils/style';
import classNames from 'classnames';

import type { MemberProfileType } from '@type/member';

interface MyProfileImageProps {
  data: MemberProfileType;
  isEdit: boolean;
  onChange: React.Dispatch<React.SetStateAction<MemberProfileType>>;
}

const MyProfileImage = ({ isEdit, data, onChange }: MyProfileImageProps) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(data.imageUrl);
  /**
   * 사진 변경 버튼 클릭 이벤트
   */
  const handleChangeButtonClick = useCallback(() => {
    imageInputRef.current?.click();
  }, []);
  /**
   * 삭제 버튼 클릭 이벤트
   */
  const onClickRemoveProfileImage = useCallback(() => {
    setImage(null);
  }, []);
  /**
   * 프로필 이미지 변경 이벤트
   */
  const handleProfileImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result as string);
        }
      };
      if (e.target.files && e.target.files.length > 0) {
        reader.readAsDataURL(e.target.files[0]);
      }
    },
    [],
  );
  /**
   * 이미지 변경 시 상위 상태 업데이트
   */
  useEffect(() => {
    onChange((prev) => ({ ...prev, imageUrl: image }));
  }, [onChange, image]);

  return (
    <div className="flex flex-col items-center text-center">
      <label
        htmlFor="imageUrl"
        className={classNames(
          'rounded-full ring ring-offset-1',
          getProfileRingStyle(data.roleLevel),
        )}
      >
        <Image
          width="w-32"
          height="h-32"
          src={createImageUrl(image)}
          alt={data.name}
          className={classNames('rounded-full bg-white object-cover', {
            'cursor-pointer': isEdit,
          })}
        />
      </label>
      <Input
        ref={imageInputRef}
        id="imageUrl"
        name="imageUrl"
        type="file"
        className="hidden"
        onChange={handleProfileImageChange}
        disabled={!isEdit}
      />
      <div className="mt-4">
        {isEdit && (
          <div className="space-x-2 text-xs text-sky-500">
            <button onClick={handleChangeButtonClick}>사진 변경</button>
            <button onClick={onClickRemoveProfileImage}>삭제</button>
          </div>
        )}
        <p className="text-xl font-bold">{data.name}</p>
        <p className="text-sm font-semibold text-gray-500">{data.id}</p>
      </div>
    </div>
  );
};

export default MyProfileImage;
