import { PaginationProps } from '@/types/pagination';
import styles from '@/components/common/Pagination/Pagination.module.css';

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const pageNumbers: (number | 'dots')[] = [];

    pageNumbers.push(1);

    if (currentPage > 4) {
        pageNumbers.push('dots');
    }

    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        if (i > 1 && i < totalPages) {
            pageNumbers.push(i);
        }
    }

    if (currentPage < totalPages - 3) {
        pageNumbers.push('dots');
    }

    if (totalPages > 1) {
        pageNumbers.push(totalPages);
    }

    return (
        <div className={styles.pagination_container}>
            <div className={styles.pagination}>
                <button className={styles.prev} onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                    &lt;
                </button>

                {pageNumbers.map((item, index) =>
                    item === 'dots' ? (
                        <span key={`dots-${index}`} className={styles.dots}>
                            ...
                        </span>
                    ) : (
                        <button key={item} onClick={() => onPageChange(item)} className={item === currentPage ? styles.active : ''}>
                            {item}
                        </button>
                    )
                )}

                <button
                    className={styles.next}
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    &gt;
                </button>
            </div>
        </div>
    );
}
