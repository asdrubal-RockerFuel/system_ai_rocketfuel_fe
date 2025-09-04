export interface ApiResponse {
  success: boolean;
  message: string;
  data: any;
  error_code?: string;
  errors?: Record<string, string[]>;
}
