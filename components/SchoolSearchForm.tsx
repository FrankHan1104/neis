
import React from 'react';
import { EDUCATION_OFFICES } from '../constants';

interface SchoolSearchFormProps {
  officeCode: string;
  setOfficeCode: (val: string) => void;
  schoolName: string;
  setSchoolName: (val: string) => void;
  startDate: string;
  setStartDate: (val: string) => void;
  endDate: string;
  setEndDate: (val: string) => void;
  onSearch: () => void;
  loading: boolean;
}

const SchoolSearchForm: React.FC<SchoolSearchFormProps> = ({
  officeCode, setOfficeCode,
  schoolName, setSchoolName,
  startDate, setStartDate,
  endDate, setEndDate,
  onSearch,
  loading
}) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Office Selection */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-600 ml-1">교육청</label>
          <select
            value={officeCode}
            onChange={(e) => setOfficeCode(e.target.value)}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          >
            <option value="">전체</option>
            {EDUCATION_OFFICES.map(office => (
              <option key={office.code} value={office.code}>{office.name}</option>
            ))}
          </select>
        </div>

        {/* School Name */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-600 ml-1">학교명</label>
          <input
            type="text"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            placeholder="예: 서울초등학교"
            onKeyDown={(e) => e.key === 'Enter' && onSearch()}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>

        {/* Date From */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-600 ml-1">조회 시작일</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>

        {/* Date To */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-600 ml-1">조회 종료일</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>
      </div>

      <button
        onClick={onSearch}
        disabled={loading}
        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-md transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? (
          <i className="fa-solid fa-circle-notch fa-spin"></i>
        ) : (
          <i className="fa-solid fa-magnifying-glass"></i>
        )}
        급식 조회하기
      </button>
    </div>
  );
};

export default SchoolSearchForm;
