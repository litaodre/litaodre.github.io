async function generatePrompt() {
    const userInput = document.getElementById('userInput').value;
    const apiKey = document.getElementById('apiKey').value;
    const resultDiv = document.getElementById('result');

    if (!userInput || !apiKey) {
        resultDiv.innerHTML = '<div class="error">请填写完整信息</div>';
        return;
    }

    const systemPrompt = `你是一个专业的提示词生成器，请根据用户的需求生成结构化的提示词，包含以下要素：
1. 情境描述：当前状态/环境/资源
2. 目标设定：具体且可衡量的期望结果
3. 限制条件：现有障碍/挑战/约束
4. 角色定位：建议的专业角色`;

    const userPrompt = `基于用户需求："${userInput}"，请生成结构化的提示词。`;

    try {
        resultDiv.innerHTML = "正在生成提示词...";

        const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt }
                ]
            })
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        const generatedPrompt = data.choices[0].message.content;
        resultDiv.innerHTML = generatedPrompt;

    } catch (error) {
        resultDiv.innerHTML = `<div class="error">生成失败：${error.message}</div>`;
    }
}