export async function gradeAnswer(
  baseUrl: string,
  apiKey: string,
  model: string,
  question: string,
  answer: string,
  reference: string,
  points: string[] = [],
) {
  if (!apiKey.trim()) return '未配置 API Key。你可以先依据采分点自评，或在设置中配置 OpenAI 兼容接口后重新批改。';
  const response = await fetch(`${baseUrl.replace(/\/$/, '')}/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: '你是考研环境学阅卷老师。请用中文，给出总评、得分建议、命中采分点、遗漏点和一条改写建议。只依据题目、参考答案和采分点，不编造教材外事实。' },
        { role: 'user', content: `题目：${question}\n参考答案：${reference}\n采分点：${points.join('、')}\n我的答案：${answer}` },
      ],
      temperature: 0.2,
    }),
  });
  if (!response.ok) throw new Error(`AI 请求失败（${response.status}）`);
  const data = await response.json() as { choices?: Array<{ message?: { content?: string } }> };
  return data.choices?.[0]?.message?.content || 'AI 没有返回有效批改结果。';
}

export async function chatWithCoach(
  baseUrl: string,
  apiKey: string,
  model: string,
  message: string,
  context: string,
) {
  if (!apiKey.trim() || !baseUrl.trim()) return '';
  const response = await fetch(`${baseUrl.replace(/\/$/, '')}/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: '你是 867 环境学考研学习教练。只依据提供的本地学习上下文回答。默认用简短反馈说明问题、原因和下一步行动；不要编造教材外事实。' },
        { role: 'user', content: `当前学习上下文：\n${context}\n\n用户请求：${message}` },
      ],
      temperature: 0.2,
    }),
  });
  if (!response.ok) throw new Error(`学习教练请求失败（${response.status}）`);
  const data = await response.json() as { choices?: Array<{ message?: { content?: string } }> };
  return data.choices?.[0]?.message?.content || '学习教练没有返回有效内容。';
}
