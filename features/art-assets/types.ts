export type ArtAssetKind =
  | "character-avatar"
  | "character-pose"
  | "outfit-icon"
  | "outfit-preview"
  | "travel-background"
  | "postcard"
  | "match3-tile"
  | "event-banner";

export interface ArtAsset {
  id: string;
  kind: ArtAssetKind;
  uri: string;
  width?: number;
  height?: number;
  placeholder?: string;
}

export interface ArtAssetCatalog {
  get(assetId: string): ArtAsset | undefined;
}
