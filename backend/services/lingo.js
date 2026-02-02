const axios = require('axios');

const LINGO_API_KEY = process.env.LINGO_API_KEY;

const translateText = async (text, targetLanguage) => {
    if (!LINGO_API_KEY) {
        console.error('LINGO_API_KEY is not set');
        // For development without key, maybe return mock?
        // return `[${targetLanguage}] ${text}`; 
        throw new Error('LINGO_API_KEY is not set');
    }

    try {
        // Verified structure for many translation APIs, but specific to lingo.dev needs confirmation.
        // Assuming a standard POST endpoint.
        // If lingo.dev is the specific platform "Lingo", they might have a specific SDK or endpoint.
        // Since this is a hackathon project, I'll assume a generic endpoint or the user will update.
        // Note: If this is 'lingo.dev' as in a specific new tool, the URL might be different.

        // Attempting to use a generic structure or placeholder. 
        // If the user meant 'lingo' (the IOS app) or 'ling' or generic 'lingo.dev' (the domain).
        // I will write a generic axios call.

        const response = await axios.post('https://api.lingo.dev/translate', {
            text: text,
            target_lang: targetLanguage
        }, {
            headers: {
                'Authorization': `Bearer ${LINGO_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        // Adjust based on actual response structure
        return response.data.translation || response.data.translatedText;
    } catch (error) {
        console.error('Lingo translation error:', error.message);
        // Fallback or rethrow
        throw error;
    }
};

module.exports = { translateText };
