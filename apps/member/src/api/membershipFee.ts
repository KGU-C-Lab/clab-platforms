import { END_POINT } from '@constants/api';
import { createCommonPagination } from '@utils/api';

import type {
  ArgsWithFiles,
  BaseResponse,
  PaginationPramsType,
  PaginationType,
} from '@type/api';
import type {
  MembershipFeePatchBody,
  MembershipFeeRequestType,
  MembershipFeeType,
} from '@type/membershipFee';

import { server } from './server';
import { postUploadedFileMembershipFee } from './uploadedFile';

interface GetMembershipFeeParamsType extends PaginationPramsType {
  memberId?: string;
  memberName?: string;
  category?: string;
}

interface PostMembershipFeePramsType extends ArgsWithFiles {
  body: MembershipFeeRequestType;
}

export interface PathMembershipFeePrams {
  id: number;
  body: MembershipFeePatchBody;
}
/**
 * 회비 정보 조회
 */
export const getMembershipFee = async ({
  memberId,
  memberName,
  category,
  page,
  size,
}: GetMembershipFeeParamsType) => {
  const { data } = await server.get<PaginationType<MembershipFeeType>>({
    url: createCommonPagination(END_POINT.MEMBERSHIP_FEE, {
      memberId,
      memberName,
      category,
      page,
      size,
    }),
  });

  return data;
};
/**
 * 회비 신청
 */
export const postMembershipFee = async ({
  body,
  multipartFile,
}: PostMembershipFeePramsType) => {
  if (multipartFile) {
    const data = await postUploadedFileMembershipFee({
      storagePeriod: 365,
      multipartFile: multipartFile,
    });
    body['imageUrl'] = data[0].fileUrl;
  }

  return await server.post<MembershipFeeRequestType, BaseResponse<number>>({
    url: END_POINT.MEMBERSHIP_FEE,
    body: body,
  });
};
/**
 * 회비 정보 수정
 */
export const pathMembershipFee = async ({
  id,
  body,
}: PathMembershipFeePrams) => {
  const { data } = await server.patch<
    MembershipFeePatchBody,
    BaseResponse<number>
  >({
    url: END_POINT.MEMBERSHIP_FEE_ID(id),
    body: body,
  });

  return data;
};
