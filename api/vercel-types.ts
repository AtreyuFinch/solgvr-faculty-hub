// Minimal Vercel Node-function request/response typings so api/*.ts typechecks
// without pulling in the @vercel/node package.
export interface VercelRequest {
  query: Record<string, string | string[] | undefined>;
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: unknown;
}

export interface VercelResponse {
  status(code: number): VercelResponse;
  json(body: unknown): void;
  setHeader(name: string, value: string): void;
}
