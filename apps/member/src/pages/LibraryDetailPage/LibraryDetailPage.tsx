import { useParams } from 'react-router-dom';
import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import BookDetailSection from '@components/library/BookDetailSection/BookDetailSection';
import { useBookDetails } from '@hooks/queries/useBookDetails';
import { LIBRARY_MESSAGE } from '@constants/message';

const LibraryDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useBookDetails(id);

  if (!data) throw new Error(LIBRARY_MESSAGE.NO_BOOK);

  return (
    <Content>
      <Header title={['도서관', data.title]} />
      <BookDetailSection data={data} />
      <Header title="대출내역" />
    </Content>
  );
};

export default LibraryDetailPage;
