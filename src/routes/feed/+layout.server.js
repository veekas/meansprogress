import { requireFeedSession } from '$lib/server/feed';

export const load = async ({ locals: { safeGetSession } }) => {
  return requireFeedSession(safeGetSession);
};
