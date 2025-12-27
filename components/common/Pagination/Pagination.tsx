import styles from '@/components/common/Pagination/Pagination.module.css';
import ChevronIcon from '@/icons/ChevronIcon';

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  zeroBased?: boolean;
};

export type PaginationState = {
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  zeroBased = false,
}: PaginationProps) {
  const displayPage = zeroBased ? currentPage + 1 : currentPage;

  const handleChange = (page: number) => {
    onPageChange(zeroBased ? page - 1 : page);
  };

  const pageNumbers: (number | 'dots')[] = [];

  // 最初のページは常に表示
  pageNumbers.push(1);

  // 現在ページが2以上ならdotsを表示
  if (displayPage > 3) pageNumbers.push('dots');

  // 現在ページの前後2ページだけ表示
  for (let i = displayPage - 1; i <= displayPage + 1; i++) {
    if (i > 1 && i < totalPages) pageNumbers.push(i);
  }

  // 現在ページから2ページ以上離れた最後のページならdotsを表示
  if (displayPage < totalPages - 1) pageNumbers.push('dots');

  // 最後のページは常に表示
  if (totalPages > 1) pageNumbers.push(totalPages);

  return (
    <div className={styles.pagination_container}>
      <div className={styles.pagination}>
        <button
          className={styles.prev}
          onClick={() => handleChange(displayPage - 1)}
          disabled={displayPage === 1}
        >
          <ChevronIcon
            direction='right'
            stroke="var(--primary)"
            strokeWidth={2}
          />
          前へ
        </button>

        {pageNumbers.map((item, index) =>
          item === 'dots' ? (
            <span key={`dots-${index}`} className={styles.dots}>
              ...
            </span>
          ) : (
            <button
              key={item}
              onClick={() => handleChange(item)}
              className={item === displayPage ? styles.active : ''}
              disabled={item === displayPage}
            >
              {item}
            </button>
          )
        )}

        <button
          className={styles.next}
          onClick={() => handleChange(displayPage + 1)}
          disabled={displayPage === totalPages}
        >
          次へ
          <ChevronIcon
            direction='left'
            stroke="var(--primary)"
            strokeWidth={2}
          />
        </button>
      </div>
    </div>
  );
}
