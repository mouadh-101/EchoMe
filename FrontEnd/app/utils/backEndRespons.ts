interface BackendResponse<T> {
    status: "success" | "error" | "info" | "warning"
    data: T;
    message?: string;
  }
export type { BackendResponse };