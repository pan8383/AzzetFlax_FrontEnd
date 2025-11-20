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
