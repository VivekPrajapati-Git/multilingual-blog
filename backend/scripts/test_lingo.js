const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const { translateText } = require('../services/lingo');

async function testTranslation() {
    const textToTranslate = "Hello, welcome to our multilingual blog!";
    const targetLang = "es"; // Spanish

    console.log(`Original: ${textToTranslate}`);
    console.log(`Translating to: ${targetLang}...`);

    try {
        const translatedText = await translateText(textToTranslate, targetLang);
        console.log(`Translated: ${translatedText}`);
    } catch (error) {
        console.error("Translation failed:", error);
    }
}

testTranslation();
