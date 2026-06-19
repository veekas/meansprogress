export const FEED_PAGE_SIZE = 10;
export const PHOTOS_PAGE_SIZE = 12;

export function getPage(url, param = 'page') {
  const raw = url.searchParams.get(param);
  const page = parseInt(raw ?? '1', 10);
  return Number.isFinite(page) && page > 0 ? page : 1;
}

export function paginate(page, pageSize, totalCount) {
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const currentPage = Math.min(page, totalPages);
  const from = (currentPage - 1) * pageSize;
  const to = from + pageSize - 1;
  return { currentPage, totalPages, from, to, pageSize, totalCount };
}
