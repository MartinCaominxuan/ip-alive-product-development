import { assertValidLocalContentManifest, type LocalContentManifest } from "../features/admin/content-manifest.ts";
import { activeContentPack } from "./content-packs/active.ts";

export const localContentManifest:LocalContentManifest=activeContentPack;
export const localContentValidation=assertValidLocalContentManifest(localContentManifest);
