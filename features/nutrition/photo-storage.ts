import { Directory, File, Paths } from "expo-file-system";

const mealPhotoDirectory=()=>new Directory(Paths.document,"meal-photos");
export function persistMealPhoto(sourceUri:string){const directory=mealPhotoDirectory();directory.create({idempotent:true,intermediates:true});const source=new File(sourceUri);const extension=source.extension||".jpg";const destination=new File(directory,`meal-${Date.now()}${extension}`);source.copy(destination);return destination.uri;}
export function deleteMealPhoto(uri?:string){if(!uri||!uri.startsWith(mealPhotoDirectory().uri))return;const file=new File(uri);if(file.exists)file.delete();}
