export interface ActionResult {
  success: boolean;
  message: string;
  data?: unknown;
  errors?: Record<string, string>;
  error?: string; // For backward compatibility with auth.ts
}
