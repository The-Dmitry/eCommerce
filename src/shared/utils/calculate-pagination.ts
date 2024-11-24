export default function calculatePagination(
  totalPages: number,
  currentPage: number
): number[] {
  currentPage = Math.max(1, Math.min(currentPage, totalPages));

  if (totalPages <= 3) {
    return Array.from({ length: totalPages }, (_, i) => i + 1); // [1, 2, ...totalPages]
  }

  if (currentPage === 1) {
    return [1, 2, 3];
  }

  if (currentPage === totalPages) {
    return [totalPages - 2, totalPages - 1, totalPages];
  }

  return [currentPage - 1, currentPage, currentPage + 1];
}
