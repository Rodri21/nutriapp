export interface Patient {
  _id: string;
  name: string;
  age: number;
  gender: string;
  nutritionalGoals: {
    totalCalories: number;
    macroDistribution: {
      protein: number;
      carbs: number;
      fats: number;
    };
  };
  restrictions: string[];
}

export interface PatientTableData {
  _id: string;
  name: string;
  age: number;
  gender: string;
  totalCalories: number;
  restrictions: number;
}
