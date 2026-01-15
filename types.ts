
export interface EducationOffice {
  code: string;
  name: string;
}

export interface School {
  ATPT_OFCDC_SC_CODE: string; // Office Code
  ATPT_OFCDC_SC_NM: string;   // Office Name
  SD_SCHUL_CODE: string;      // School Code
  SCHUL_NM: string;           // School Name
  LCTN_SC_NM: string;         // Location
}

export interface Meal {
  MLSV_YMD: string;           // Date (YYYYMMDD)
  MMEAL_SC_NM: string;        // Meal type (Lunch/Dinner)
  DDISH_NM: string;           // Dish list
  ORPLC_INFO: string;         // Origin info
  NTR_INFO: string;           // Nutrition info
  CAL_INFO: string;           // Calories
}

export interface NeisSchoolResponse {
  schoolInfo?: [
    { head: any[] },
    { row: School[] }
  ];
}

export interface NeisMealResponse {
  mealServiceDietInfo?: [
    { head: any[] },
    { row: Meal[] }
  ];
}
