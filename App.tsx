
import React, { useState, useEffect } from 'react';
import SchoolSearchForm from './components/SchoolSearchForm';
import MealCard from './components/MealCard';
import { School, Meal } from './types';
import { searchSchools, getMeals } from './services/neisService';

const App: React.FC = () => {
  const today = new Date().toISOString().split('T')[0];
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  const nextWeekStr = nextWeek.toISOString().split('T')[0];

  const [officeCode, setOfficeCode] = useState<string>('');
  const [schoolName, setSchoolName] = useState<string>('');
  const [startDate, setStartDate] = useState<string>(today);
  const [endDate, setEndDate] = useState<string>(nextWeekStr);
  
  const [loading, setLoading] = useState(false);
  const [schools, setSchools] = useState<School[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!schoolName.trim()) {
      alert("학교명을 입력해주세요.");
      return;
    }
    
    setLoading(true);
    setError(null);
    setMeals([]);
    setSelectedSchool(null);
    
    try {
      const foundSchools = await searchSchools(officeCode, schoolName);
      setSchools(foundSchools);
      
      if (foundSchools.length === 0) {
        setError("검색된 학교가 없습니다.");
      } else if (foundSchools.length === 1) {
        // Auto-select if only one school
        const school = foundSchools[0];
        setSelectedSchool(school);
        await fetchMealsForSchool(school);
      }
    } catch (e) {
      setError("학교 검색 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const fetchMealsForSchool = async (school: School) => {
    setLoading(true);
    try {
      const mealList = await getMeals(
        school.ATPT_OFCDC_SC_CODE, 
        school.SD_SCHUL_CODE, 
        startDate, 
        endDate
      );
      setMeals(mealList);
      if (mealList.length === 0) {
        setError("해당 기간에 조회된 급식 정보가 없습니다.");
      }
    } catch (e) {
      setError("급식 정보를 가져오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleSchoolSelect = (school: School) => {
    setSelectedSchool(school);
    fetchMealsForSchool(school);
  };

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl">
              <i className="fa-solid fa-utensils text-white text-xl"></i>
            </div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight">
              맛있는 급식 <span className="text-blue-600">조회</span>
            </h1>
          </div>
          <p className="hidden sm:block text-sm text-slate-500 font-medium">
            전국 모든 학교의 급식을 간편하게 확인하세요
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 mt-8">
        <SchoolSearchForm 
          officeCode={officeCode} setOfficeCode={setOfficeCode}
          schoolName={schoolName} setSchoolName={setSchoolName}
          startDate={startDate} setStartDate={setStartDate}
          endDate={endDate} setEndDate={setEndDate}
          onSearch={handleSearch}
          loading={loading}
        />

        {/* School Selection List */}
        {!selectedSchool && schools.length > 1 && (
          <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <i className="fa-solid fa-list-check text-blue-500"></i>
              학교를 선택해 주세요 ({schools.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {schools.map((school) => (
                <button
                  key={school.SD_SCHUL_CODE}
                  onClick={() => handleSchoolSelect(school)}
                  className="bg-white p-4 rounded-xl border border-slate-200 text-left hover:border-blue-500 hover:bg-blue-50 transition-all flex flex-col gap-1"
                >
                  <span className="font-bold text-slate-800">{school.SCHUL_NM}</span>
                  <span className="text-xs text-slate-500">{school.ATPT_OFCDC_SC_NM} | {school.LCTN_SC_NM}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 text-red-700 p-6 rounded-2xl border border-red-100 flex items-center gap-4 mb-8">
            <i className="fa-solid fa-triangle-exclamation text-2xl"></i>
            <div>
              <p className="font-bold">앗! 문제가 발생했어요.</p>
              <p className="text-sm opacity-90">{error}</p>
            </div>
          </div>
        )}

        {/* Results */}
        {selectedSchool && (
          <div className="animate-in fade-in duration-500">
            <div className="flex items-end justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 text-blue-600 text-sm font-bold mb-1 uppercase tracking-wider">
                  <i className="fa-solid fa-school"></i>
                  {selectedSchool.ATPT_OFCDC_SC_NM}
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                  {selectedSchool.SCHUL_NM}
                </h2>
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-slate-500 text-sm font-medium">조회 기간</p>
                <p className="text-slate-800 font-bold">{startDate} ~ {endDate}</p>
              </div>
            </div>

            {meals.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {meals.map((meal, index) => (
                  <MealCard key={`${meal.MLSV_YMD}-${meal.MMEAL_SC_NM}-${index}`} meal={meal} />
                ))}
              </div>
            ) : (
              !loading && !error && (
                <div className="py-20 text-center flex flex-col items-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <i className="fa-solid fa-calendar-xmark text-slate-400 text-2xl"></i>
                  </div>
                  <p className="text-slate-500 font-medium">급식 정보가 없습니다.</p>
                </div>
              )
            )}
          </div>
        )}

        {/* Initial/Empty State */}
        {!selectedSchool && schools.length === 0 && !loading && !error && (
          <div className="py-20 text-center flex flex-col items-center">
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6">
              <i className="fa-solid fa-magnifying-glass text-blue-300 text-4xl"></i>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">어느 학교의 급식이 궁금하세요?</h3>
            <p className="text-slate-500 max-w-sm">
              상단의 교육청과 학교명을 입력하고 조회를 눌러주세요.<br/>오늘의 식단과 영양 분석을 한눈에 볼 수 있습니다.
            </p>
          </div>
        )}
      </main>

      <footer className="mt-20 border-t border-slate-200 pt-8 px-6 text-center text-slate-400 text-xs">
        <p className="mb-2">본 정보는 나이스(NEIS) 오픈 API를 통해 제공됩니다.</p>
        <p>© 2024 School Meal Explorer. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
