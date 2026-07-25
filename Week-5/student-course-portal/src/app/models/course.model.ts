export interface Course {
  id: string;
  name: string;
  code: string;
  credits: number;
  gradeStatus: string;
  description?: string;
  instructor?: string;
  image?: string;
}