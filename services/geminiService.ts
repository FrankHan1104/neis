
import { GoogleGenAI } from "@google/genai";

export async function analyzeMeal(dishName: string): Promise<string> {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return "API Key not configured.";

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        다음은 한국 학교 급식 메뉴입니다: "${dishName}". 
        이 메뉴의 영양 균형과 학생들을 위한 추천 포인트를 한국어로 짧게 한 문단으로 분석해줘.
        HTML 태그 없이 텍스트만 출력해.
      `,
    });
    return response.text || "분석 결과를 가져올 수 없습니다.";
  } catch (error) {
    console.error("Gemini analysis error:", error);
    return "AI 분석 중 오류가 발생했습니다.";
  }
}
