import { BaseResponse, PaginationType } from '@type/api';
import { server } from './server';
import { createPagination } from '@utils/api';
import { END_POINT } from '@constants/api';
import type { NewsItem } from '@type/news';

// 뉴스 조회
export const getNews = async (page: number, size: number) => {
  const { data } = await server.get<PaginationType<NewsItem>>({
    url: createPagination(END_POINT.MY_NEWS, page, size),
  });

  return data;
};

export const getNewsPost = async (id: number) => {
  const { data } = await server.get<BaseResponse<NewsItem>>({
    url: END_POINT.NEWS(id),
  });
  return data;
};
