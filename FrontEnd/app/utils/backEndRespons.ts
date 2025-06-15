interface BackendResponse<T> {
    status: 'success' | 'error';
    data: T;
    message?: string;
  }
export type { BackendResponse };