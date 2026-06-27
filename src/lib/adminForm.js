/** Turn Supabase / network errors into admin-friendly copy. */
export function friendlyDbError(error) {
  if (!error) return 'Something went wrong saving your changes. Please try again.';

  const message = typeof error === 'string' ? error : error.message;
  const code = typeof error === 'object' ? error.code : undefined;

  if (code === '23505') return 'That record already exists.';
  if (message?.includes('JWT')) return 'Your session expired. Refresh the page and sign in again.';
  if (message?.toLowerCase().includes('fetch')) {
    return 'Could not reach the server. Check your connection and try again.';
  }

  return message ? `Save failed: ${message}` : 'Something went wrong saving your changes. Please try again.';
}

/** Keep draft values on failure; refresh page data only after a successful save. */
export function preserveDraftOnFailure({ onSuccess, onFailure } = {}) {
  return () => {
    return async ({ result, update }) => {
      if (result.type === 'success') {
        await update();
        onSuccess?.(result.data);
        return;
      }

      if (result.type === 'failure') {
        await update({ reset: false });
        onFailure?.(result.data);
        return;
      }

      if (result.type === 'error') {
        onFailure?.({
          message: 'Could not reach the server. Check your connection and try again.'
        });
      }
    };
  };
}
