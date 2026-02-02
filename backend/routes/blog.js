const express = require('express');
const router = express.Router();
const supabase = require('../services/supabase');
const { translateText } = require('../services/lingo');

// GET /api/blogs - Get all blogs
router.get('/', async (req, res) => {
    const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Supabase error:', error);
        return res.status(500).json({ error: error.message });
    }
    res.json(data);
});

// POST /api/blogs - Create a blog
router.post('/', async (req, res) => {
    const { title, content, language } = req.body;

    // Basic validation
    if (!title || !content || !language) {
        return res.status(400).json({ error: 'Title, content, and language are required.' });
    }

    const { data, error } = await supabase
        .from('blogs')
        .insert([{
            title,
            content,
            language,
            translations: {} // Initialize empty translations object
        }])
        .select();

    if (error) return res.status(500).json({ error: error.message });
    res.json(data[0]);
});

// GET /api/blogs/:id - Get blog details (with optional translation)
// Query param: ?lang=xyz
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const { lang } = req.query;

    // 1. Fetch original blog
    let { data: blog, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', id)
        .single();

    if (error) return res.status(500).json({ error: error.message });
    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    // 2. If no lang requested or it matches original, return original
    if (!lang || blog.language === lang) {
        return res.json(blog);
    }

    // 3. Check if translation exists in the JSONB column
    if (blog.translations && blog.translations[lang]) {
        console.log(`Serving cached translation for ${lang}`);
        return res.json({
            ...blog,
            title: blog.translations[lang].title,
            content: blog.translations[lang].content,
            language: lang,
            originalLanguage: blog.language
        });
    }

    // 4. Translate if missing
    try {
        console.log(`Translating to ${lang}...`);
        // Example: parallel translation
        const [translatedTitle, translatedContent] = await Promise.all([
            translateText(blog.title, lang),
            translateText(blog.content, lang)
        ]);

        const newTranslations = {
            ...blog.translations,
            [lang]: { title: translatedTitle, content: translatedContent }
        };

        // 5. Save back to Supabase (cache)
        const { error: updateError } = await supabase
            .from('blogs')
            .update({ translations: newTranslations })
            .eq('id', id);

        if (updateError) {
            console.error('Failed to save translation:', updateError);
            // We still return the translated content even if save failed
        }

        res.json({
            ...blog,
            title: translatedTitle,
            content: translatedContent,
            language: lang,
            originalLanguage: blog.language
        });

    } catch (err) {
        res.status(500).json({ error: 'Translation failed', details: err.message });
    }
});

module.exports = router;
