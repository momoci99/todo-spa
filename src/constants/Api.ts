export const API_URL = "http://localhost:3000";

const apiLoadingState = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCEEDED: "succeeded",
  FAILED: "failed",
} as const;

export type API_LOADING_STATE =
  (typeof apiLoadingState)[keyof typeof apiLoadingState];
