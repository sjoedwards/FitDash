export interface APIFitbitCaloriesData {
  calories: Array<FitbitData>;
  activityCalories: Array<FitbitData>;
}
export interface FitbitData {
  value: string;
  dateTime: string;
}

export interface FitbitCaloriesData {
  weekEnd: string;
  calories: string;
  activityCalories: string;
}

export interface FitbitMacrosData {
  weekEnd: string;
  protein: string;
  carbs: string;
  fat: string;
}

export interface FitbitActivityData {
  distance: string;
  pace: string;
  originalStartTime: string;
  activeDuration: string;
  activityName: string;
}

export interface FitbitWeightData {
  weekEnd: string;
  weight: string;
}
