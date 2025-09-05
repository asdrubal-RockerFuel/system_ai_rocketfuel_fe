export interface ApiResponse {
  status: boolean;
  message: string;
  data: any;
  error_code?: string;
  errors?: Record<string, string[]>;
}
