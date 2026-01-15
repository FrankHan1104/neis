
import { NEIS_API_KEY } from '../constants';
import { NeisSchoolResponse, NeisMealResponse, School, Meal } from '../types';

const BASE_URL = "https://open.neis.go.kr/hub";

export async function searchSchools(officeCode: string, schoolName: string): Promise<School[]> {
  const params = new URLSearchParams({
    KEY: NEIS_API_KEY,
    Type: 'json',
    pIndex: '1',
    pSize: '100',
    SCHUL_NM: schoolName,
  });

  if (officeCode) {
    params.append('ATPT_OFCDC_SC_CODE', officeCode);
  }

  const response = await fetch(`${BASE_URL}/schoolInfo?${params.toString()}`);
  const data: NeisSchoolResponse = await response.json();

  if (data.schoolInfo && data.schoolInfo[1].row) {
    return data.schoolInfo[1].row;
  }
  return [];
}

export async function getMeals(
  officeCode: string, 
  schoolCode: string, 
  startDate: string, 
  endDate: string
): Promise<Meal[]> {
  const params = new URLSearchParams({
    KEY: NEIS_API_KEY,
    Type: 'json',
    ATPT_OFCDC_SC_CODE: officeCode,
    SD_SCHUL_CODE: schoolCode,
    MLSV_FROM_YMD: startDate.replace(/-/g, ''),
    MLSV_TO_YMD: endDate.replace(/-/g, ''),
  });

  const response = await fetch(`${BASE_URL}/mealServiceDietInfo?${params.toString()}`);
  const data: NeisMealResponse = await response.json();

  if (data.mealServiceDietInfo && data.mealServiceDietInfo[1].row) {
    return data.mealServiceDietInfo[1].row;
  }
  return [];
}
