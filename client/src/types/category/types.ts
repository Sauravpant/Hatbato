export interface CategoryDetails {
  id:number;
  name:string;
  slogan:string;
  description:string;
  slug:string;
  updatedAt:Date;
  createdAt:Date;
} 

export interface ApiResponse<T> {
  success: boolean;
  statusCode: string;
  message: string;
  data: T;
}