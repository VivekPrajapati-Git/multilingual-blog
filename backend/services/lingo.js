const { LingoDotDevEngine } = require('lingo.dev/sdk');

const LINGO_API_KEY = process.env.LINGO_API_KEY;

if (!LINGO_API_KEY) {
    console.warn('LINGO_API_KEY is not set in environment variables.');
}

const lingoDotDev = new LingoDotDevEngine({
    apiKey: LINGO_API_KEY,
});

/**
 * Translates text using lingo.dev SDK
 * @param {string} text - The text to translate
 * @param {string} targetLanguage - The target language code (e.g., 'es', 'fr', 'hi')
 * @returns {Promise<string>} - The translated text
 */
const translateText = async (text, targetLanguage) => {
    if (!LINGO_API_KEY) {
        throw new Error('LINGO_API_KEY is not set');
    }

    try {
        const translated = await lingoDotDev.localizeObject(
            { text },
            {
                sourceLocale: 'en', // Assuming English as source for now, could be passed as arg
                targetLocale: targetLanguage
            }
        );
        return translated.text;
    } catch (error) {
        console.error('Lingo translation error:', error.message);
        throw error;
    }
};

module.exports = { translateText };
