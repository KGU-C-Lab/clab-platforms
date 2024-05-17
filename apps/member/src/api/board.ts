import { END_POINT } from '@constants/api';
import { createCommonPagination } from '@utils/api';

import { BaseResponse, ResponsePagination } from '@type/api';
import type {
  CommunityCategoryType,
  CommunityPostDetailItem,
  CommunityPostItem,
  CommunityWriteItem,
  IBoard,
} from '@type/community';

import { server } from './server';
import { postUploadedFileBoard, uploadFiles } from './uploadedFile';

export interface PostBoardsWriteParams extends CommunityWriteItem {
  file?: File;
}

export interface PatchBoardsParams extends CommunityWriteItem {
  id: number;
  file?: File;
}

/**
 * 내가 작성한 커뮤니티 게시글 조회
 */
export async function getMyBoards(page: number, size: number) {
  const { data } = await server.get<ResponsePagination<IBoard>>({
    url: createCommonPagination(END_POINT.MY_BOARDS, { page, size }),
  });

  return data;
}
/**
 * 커뮤니티 게시글 목록 조회
 */
export async function getBoards(page: number, size: number) {
  const { data } = await server.get<ResponsePagination<IBoard>>({
    url: createCommonPagination(END_POINT.BOARDS, { page, size }),
  });

  return data;
}
/**
 * 커뮤니티 게시글 카테고리별 조회
 */
export async function getBoardsList(
  category: CommunityCategoryType,
  page: number,
  size: number,
) {
  const { data } = await server.get<ResponsePagination<CommunityPostItem>>({
    url: createCommonPagination(END_POINT.BOARDS_LIST, {
      category: category.toUpperCase(), // 백엔드 Enum 타입에 맞춰 대문자로 변경
      page,
      size,
    }),
  });

  return data;
}
/**
 * 커뮤니티 게시글 작성
 */
export async function postBoardsWrite(data: PostBoardsWriteParams) {
  if (data.file) {
    const files = await uploadFiles([data.file], postUploadedFileBoard);
    data.imageUrl = files[0].fileUrl;
  }

  return server.post<CommunityWriteItem, BaseResponse<CommunityCategoryType>>({
    url: END_POINT.BOARDS,
    body: {
      ...data,
      category: data.category.toUpperCase(), // 백엔드 Enum 타입에 맞춰 대문자로 변경
    },
  });
}
/**
 * 커뮤니티 게시글 상세 조회
 */
export function getBoardsDetail(id: number) {
  return server.get<BaseResponse<CommunityPostDetailItem>>({
    url: END_POINT.BOARDERS_ITEM(id),
  });
}
/**
 * 커뮤니티 게시글 수정
 */
export async function patchBoards({ id, file, ...data }: PatchBoardsParams) {
  if (file) {
    const uploadedFile = await uploadFiles([file], postUploadedFileBoard);
    data.imageUrl = uploadedFile[0].fileUrl;
  }

  return server.patch<CommunityWriteItem, BaseResponse<CommunityCategoryType>>({
    url: END_POINT.BOARDERS_ITEM(id),
    body: {
      ...data,
      category: data.category.toUpperCase(),
    },
  });
}
/**
 * 커뮤니티 게시글 삭제
 */
export function deleteBoards(id: number) {
  return server.del<never, BaseResponse<CommunityCategoryType>>({
    url: END_POINT.BOARDERS_ITEM(id),
  });
}
