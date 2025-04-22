import axios from 'axios';

export async function sendPrompt(promptText: string) {
    try {
        const response = await axios.post('https://localhost:7212/generate',
         {prompt: promptText },
         { headers: { 'Content-Type': 'application/json' }});

        console.log('Ответ от сервера:', response.data.output);
    } catch (error) {
        console.error('Ошибка при запросе:', error);
    }
}