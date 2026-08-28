import { registerContentPack } from "../../features/content-packs/registry.ts";
import { originalDemoContentPack } from "./original-demo.ts";

export const activeContentPack=registerContentPack(originalDemoContentPack);
