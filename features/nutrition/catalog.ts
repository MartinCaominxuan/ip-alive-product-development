export interface FoodReference { id:string; nameEn:string; nameZh:string; servingGrams:number; per100g:{calories:number;protein:number;carbs:number;fat:number}; source:"USDA FoodData Central generic reference"; }
export interface NutritionAmount { calories:number; protein:number; carbs:number; fat:number; }

export const FOOD_CATALOG:FoodReference[]=[
  ["rice-cooked","Cooked white rice","熟白米饭",150,130,2.7,28.2,.3], ["chicken-breast","Cooked chicken breast","熟鸡胸肉",100,165,31,0,3.6],
  ["egg","Whole egg","全蛋",50,155,12.6,1.1,10.6], ["salmon","Cooked salmon","熟三文鱼",100,208,20,0,13], ["tofu","Firm tofu","北豆腐",100,76,8,1.9,4.8],
  ["broccoli","Cooked broccoli","熟西兰花",100,35,2.4,7.2,.4], ["banana","Banana","香蕉",118,89,1.1,22.8,.3], ["apple","Apple with skin","带皮苹果",180,52,.3,13.8,.2],
  ["oats","Dry rolled oats","干燕麦片",40,379,13.2,67.7,6.5], ["milk","Whole milk","全脂牛奶",240,61,3.2,4.8,3.3],
  ["yogurt","Plain Greek yogurt, nonfat","原味脱脂希腊酸奶",170,59,10.3,3.6,.4], ["bread","Whole-wheat bread","全麦面包",35,252,12.5,43.1,3.5],
].map(([id,nameEn,nameZh,servingGrams,calories,protein,carbs,fat])=>({id,nameEn,nameZh,servingGrams,per100g:{calories,protein,carbs,fat},source:"USDA FoodData Central generic reference"})) as FoodReference[];

export function calculateNutrition(food:FoodReference,grams:number):NutritionAmount{const ratio=Math.max(0,grams)/100;return{calories:Math.round(food.per100g.calories*ratio),protein:Math.round(food.per100g.protein*ratio*10)/10,carbs:Math.round(food.per100g.carbs*ratio*10)/10,fat:Math.round(food.per100g.fat*ratio*10)/10}}
export function searchFoods(query:string,language:"en"|"zh"){const value=query.trim().toLocaleLowerCase();if(!value)return FOOD_CATALOG;return FOOD_CATALOG.filter((food)=>`${food.nameEn} ${food.nameZh}`.toLocaleLowerCase().includes(value))}
