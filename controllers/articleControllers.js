import Article from "../models/Article.js";
import performScraping from "../scrapers/scraper1.js";
import scraperFilter from "../utils/scraperFilter.js";

// Admin create one Article
//  @route POST news/api/articles
//  @access Public
// Info: header, pictureURL, Description, href, author, websiteName, id, isShown, category
const postOneArticle = async (req, res, next) => {
  try {
    const article = await Article.create(req.body);
    res.status(201).json({
      success: true,
      data: article,
    });
  } catch (error) {
    next(error);
  }
};

// Automatically create articles
//  @route POST news/api/articles
//  @access Public
// Info: header, pictureURL, Description, href, author, websiteName, id, isShown, category
const postManyArticles = async (req, res, next) => {
  try {
    let createdArticles = [];
    const scrapedArticles = await performScraping();

    for (const article of scrapedArticles) {
      if (scraperFilter(article)) {
        const newArticle = await Article.create(article);
        createdArticles.push(newArticle);
      }

      res.status(201).json({
        success: true,
        data: createdArticles,
      });
    }
  } catch (error) {
    next(error);
  }
};

// Get all articles
//  @route GET news/api/articles
//  @access Public
// Info: header, pictureURL, Description, href, author, websiteName, id, isShown, category

const getAllArticles = async (req, res, next) => {
  try {
    const { isInHomePage } = req.body;
    const filter = {};
    if (isInHomePage !== undefined) {
      filter.isInHomePage = isInHomePage;
    }

    const articles = await Article.find(filter);

    res
      .status(200)
      .json({ success: true, count: articles.length, data: articles });
  } catch (error) {
    // res.status(400).json({ success: false });
    next(error);
  }
};

// view single article
//  @route GET news/api/articles/:id
//  @access Public
// Info: header, pictureURL, Description, href, author, websiteName, id, isShown, category

const getOneArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ success: false });
    }
    res.status(200).json({ success: true, data: article });
  } catch (error) {
    // res.status(400).send(error);
    next(error);
  }
};

// update one article
//  @route PUT news/api/articles/:id
//  @access Private
// Info: header, pictureURL, Description, href, author, websiteName, id, isShown, category

const updateOneArticle = async (req, res, next) => {
  try {
    const { isInHomePage, category  } = req.body;
    const filter = {};
    if (isInHomePage !== undefined) {
      filter.isInHomePage = isInHomePage;
    }
    if (category !== undefined) {
      filter.category = category;
    }

    const article = await Article.findByIdAndUpdate(req.params.id, filter, {
      new: true,
      runValidators: true,
    });
    if (!article) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: article });
  } catch (error) {
    next(error);
  }
};

// delete one article
//  @route PUT news/api/articles/:id
//  @access Private

const deleteOneArticle = async (req, res, next) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
// delete all articles
//  @route PUT news/api/articles/
//  @access Private

const deleteManyArticles = async (req, res, next) => {
  try {
    await Article.deleteMany();

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

export {
  postOneArticle,
  postManyArticles,
  getAllArticles,
  getOneArticle,
  updateOneArticle,
  deleteOneArticle,
  deleteManyArticles,
};
