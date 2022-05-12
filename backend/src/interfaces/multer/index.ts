export type DestinationCallback = (
  error: Error | null,
  destination: string,
) => void;

export type FileNameCallback = (error: Error | null, filename: string) => void;
