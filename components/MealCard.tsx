
import React, { useState } from 'react';
import { Meal } from '../types';
import { analyzeMeal } from '../services/geminiService';

interface MealCardProps {
  meal: Meal;
}

const MealCard: React.FC<MealCardProps> = ({ meal }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const formattedDate = (ymd: string) => {
    const year = ymd.substring(0, 4);
    const month = ymd.substring(4, 6);
    const day = ymd.substring(6, 8);
    const dateObj = new Date(`${year}-${month}-${day}`);
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return `${month}월 ${day}일 (${days[dateObj.getDay()]})`;
  };

  const dishes = meal.DDISH_NM.split('<br/>').map(dish => {
    // Remove (1.2.3.4) allergen numbers
    return dish.replace(/\([^)]*\)/g, '').trim();
  }).filter(Boolean);

  const handleAnalysis = async () => {
    if (analysis) return;
    setLoading(true);
    const result = await analyzeMeal(dishes.join(', '));
    setAnalysis(result);
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all hover:shadow-md flex flex-col h-full">
      <div className="bg-blue-50 px-4 py-3 border-b border-blue-100 flex justify-between items-center">
        <span className="font-bold text-blue-800">{formattedDate(meal.MLSV_YMD)}</span>
        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">{meal.MMEAL_SC_NM}</span>
      </div>
      
      <div className="p-4 flex-grow">
        <ul className="space-y-1.5 mb-4">
          {dishes.map((dish, idx) => (
            <li key={idx} className="text-slate-700 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
              {dish}
            </li>
          ))}
        </ul>

        <div className="pt-3 border-t border-slate-100">
          <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
            <i className="fa-solid fa-bolt text-yellow-500"></i>
            {meal.CAL_INFO}
          </p>
        </div>
      </div>

      <div className="p-4 bg-slate-50 mt-auto">
        <button 
          onClick={handleAnalysis}
          disabled={loading}
          className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 mb-2"
        >
          {loading ? (
            <i className="fa-solid fa-spinner fa-spin"></i>
          ) : (
            <i className="fa-solid fa-wand-magic-sparkles"></i>
          )}
          {analysis ? 'AI 영양 분석' : 'AI 영양 분석 받아보기'}
        </button>
        {analysis && (
          <p className="text-[11px] leading-relaxed text-slate-600 bg-white p-2 rounded-lg border border-slate-200">
            {analysis}
          </p>
        )}
      </div>
    </div>
  );
};

export default MealCard;
