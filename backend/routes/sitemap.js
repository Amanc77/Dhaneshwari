const express = require('express');
const router = express.Router();
const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');
const Blog = require('../models/Blog');

router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true }, 'slug updatedAt');

    const staticLinks = [
      { url: '/', changefreq: 'daily', priority: 1.0 },
      { url: '/rooms', changefreq: 'weekly', priority: 0.8 },
      { url: '/about', changefreq: 'monthly', priority: 0.6 },
      { url: '/contact', changefreq: 'monthly', priority: 0.6 },
      { url: '/blog', changefreq: 'weekly', priority: 0.7 },
      { url: '/attractions', changefreq: 'weekly', priority: 0.7 },
      { url: '/booking', changefreq: 'weekly', priority: 0.9 },
    ];

    const blogLinks = blogs.map(blog => ({
      url: `/blog/${blog.slug}`,
      changefreq: 'weekly',
      priority: 0.6,
      lastmod: blog.updatedAt,
    }));

    const allLinks = [...staticLinks, ...blogLinks];

    const stream = new SitemapStream({
      hostname: process.env.SITE_URL || process.env.FRONTEND_URL || 'http://localhost:5173',
    });
    const data = await streamToPromise(Readable.from(allLinks).pipe(stream));

    res.header('Content-Type', 'application/xml');
    res.send(data.toString());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;