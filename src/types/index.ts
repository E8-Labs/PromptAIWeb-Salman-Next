export namespace PromptSavvy {
  export type User = {
    file: string; // Base64 encoded string
    imagePreviewUrl: string;
    username: string;
    website: string;
    youtube: string;
    instagram: string;
    password: string;
    logo: string;
  };

  export enum IntractionType {
    Like = "Like",
    DisLike = "DisLike",
    View = "View",
    Flag = "Flag",
  }
}
