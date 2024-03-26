import type { IDType } from '@type/api';

export const SERVER_BASE_URL: string = import.meta.env.VITE_SERVER_BASE_URL;
export const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

export const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN';
export const REFRESH_TOKEN_KEY = 'REFRESH_TOKEN';
export const FORM_DATA_KEY = 'multipartFile';
export const STORAGE_PERIOD = (period: number) => `?storagePeriod=${period}`;

export const END_POINT = {
  LOGIN_REISSUE: '/v1/login/reissue',
  // -- 마이페이지
  MY_PROFILE: '/v1/members/my-profile',
  MY_BOARDS: '/v1/boards/my-boards',
  MY_NOTIFICATION: '/v1/notifications',
  MY_COMMENTS: '/v1/comments/my-comments',
  MY_INFO_EDIT: (id: IDType) => `/v1/members/${id}`,
  // -- 커뮤니티
  BOARDS: `/v1/boards`,
  BOARDS_LIST: `/v1/boards/list`,
  BOARDERS_ITEM: (id: IDType) => `/v1/boards/${id}`,
  // -- 도서
  BOOK: `/v1/books`,
  BOOK_DETAIL: (id: number) => `/v1/books/${id}`,
  BOOK_LOAN: `/v1/book-loan-records`,
  BOOK_LOAN_CONDITIONS: `/v1/book-loan-records/conditions`,
  BOOK_LOAN_BORROW: `/v1/book-loan-records/borrow`,
  BOOK_LOAN_EXTEND: `/v1/book-loan-records/extend`,
  BOOK_LOAN_RETURN: `/v1/book-loan-records/return`,
  ACCUSES: '/v1/accuses',
  MY_NEWS: `/v1/news`,
  MY_BLOG: `/v1/blogs`,
  MY_HIRE: `/v1/job-postings`,
  MY_BIRTHDAY: `/v1/members/birthday`,
  MY_ACTIVITY: `/v1/schedule/activity`,
  MAIN_SCHEDULE: `/v1/schedule`,
  MAIN_ACTIVITY_PHOTO: `/v1/activity-photos`,
  MEMBERSHIP_FEE: `/v1/membership-fees`,
  UPLOADEDFILE_MEMBERSHIP_FEE: '/v1/files/membership-fee',
  UPLOADEDFILE_PROFILES: '/v1/files/profiles',
  SHARED_ACCOUNT: `/v1/shared-accounts`,
  SHARED_ACCOUNT_STATUS: (usageId: number) =>
    `/v1/shared-accounts/usage/${usageId}`,
  UPLOADEDFILE_ACTIVITY_ASSIGNMENT: (groupId: IDType, boardId: IDType) =>
    `/v1/files/assignment/${groupId}/${boardId}`,
  COMMENTS: (id: IDType) => `/v1/comments/${id}`,
  HIRE: (id: IDType) => `/v1/job-postings/${id}`,
  NEWS: (id: IDType) => `/v1/news/${id}`,
  ACTIVITY_GROUP_MEMBER_STATUS: `/v1/activity-group/member/status`,
  ACTIVITY_GROUP_MEMBER: (id: IDType) => `/v1/activity-group/member/${id}`,
  ACTIVITY_GROUP_BOARD_BY_CATEGORY: `/v1/activity-group/boards/by-category`,
  ACTIVITY_GROUP_MEMBER_APPLY: `/v1/activity-group/member/apply`,
  ACTIVITY_GROUP_BOARD_BY_PARENT: `/v1/activity-group/boards/by-parent`,
  ACTIVITY_GROUP_MEMBER_MEMBERS: `/v1/activity-group/member/members`,
  ACTIVITY_GROUP_ADMIN_MEMBERS: `/v1/activity-group/admin/members`,
  ACTIVITY_GROUP_ADMIN_ACCEPT: `/v1/activity-group/admin/accept`,
  ACTIVITY_GROUP_BOARDS: `/v1/activity-group/boards`,
  ACTIVITY_GROUP_BOARDS_MY_ASSIGNMENT: `/v1/activity-group/boards/my-assignment`,
  ACTIVITY_GROUP_BOARD: `/v1/activity-group/boards`,
} as const;

export const HTTP_STATUS_CODE = {
  SUCCESS: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONTENT_TOO_LARGE: 413,
  INTERNAL_SERVER_ERROR: 500,
  CLAB_AUTH_SUCCESS: 1200,
} as const;
