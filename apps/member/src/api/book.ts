import { server } from './server';
import { createCommonPagination } from '@utils/api';
import { END_POINT } from '@constants/api';
import type { BookItem, BookLoanRecordItem } from '@type/book';
import type { BaseResponse, PaginationType } from '@type/api';

// 도서 목록 조회
export const getBooks = async (page: number, size: number) => {
  const params = { page, size };
  const { data } = await server.get<PaginationType<BookItem>>({
    url: createCommonPagination(END_POINT.BOOK, params),
  });

  return data;
};

// 도서 상세 조회
export const getBookDetail = async (id: string) => {
  const { data } = await server.get<BaseResponse<BookItem>>({
    url: END_POINT.BOOK_DETAIL(id),
  });

  return data;
};

// 나의 대출내역 조회
export const getMyBooks = async (page: number, size: number, id: string) => {
  const params = { page, size };
  const { data } = await server.get<PaginationType<BookItem>>({
    url: createCommonPagination(END_POINT.BOOK, params),
  });

  return data.items.filter((book) => book.borrowerId === id);
};

// 도서 대출
export const postBorrowBook = async (body: BookLoanRecordItem) => {
  const borrowUrl = END_POINT.BOOK_LOAN + '/borrow';
  const { data } = await server.post<BookLoanRecordItem, BaseResponse<number>>({
    url: borrowUrl,
    body,
  });

  return data;
};

// 도서 반납
export const postReturnBook = async (body: BookLoanRecordItem) => {
  const returnUrl = END_POINT.BOOK_LOAN + '/return';
  const { data } = await server.post<BookLoanRecordItem, BaseResponse<number>>({
    url: returnUrl,
    body,
  });

  return data;
};

// 도서 연장
export const postExtendBook = async (body: BookLoanRecordItem) => {
  const extendUrl = END_POINT.BOOK_LOAN + '/extend';
  const { data } = await server.post<BookLoanRecordItem, BaseResponse<number>>({
    url: extendUrl,
    body,
  });

  return data;
};
