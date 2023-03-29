import axios from "axios";
import cheerio from "cheerio";
import { TIMES_OF_ISRAEL } from "./constants.js";
const websiteName = "Times of Israel";

const performScraping = async () => {
  // downloading the target web page
  // by performing an HTTP GET request in Axios

  const axiosResponse = await axios.request({
    method: "GET",
    url: TIMES_OF_ISRAEL,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
    },
  });
  const articles = [];
  const $ = cheerio.load(await axiosResponse.data);

  //using cheerio methods on the load functions to scrap certain html elements
  const headlines = $(".template1").each((idx, el) => {
    const articleURL = $(el).find(".media").children().attr("href");
    const title = $(el).find(".item-content").find(".headline").text();
    const desc = $(el).find(".item-content").find(".underline").text();
    const author = $(el).find(".item-content").find(".byline").text();
    const date = $(el).find(".item-content").find(".date").text();
    const imageURL = $(el).find(".media").children().children().attr("src");
    const imageDesc = $(el).find(".media").children().children().attr("alt");

    if (title && desc && articleURL) {
      const article = {
        websiteName: websiteName,
        articleURL: articleURL,
        title: title.replace(/(\r\n|\n|\r|\t)/gm, ""),
        description: desc.replace(/(\r\n|\n|\r|\t)/gm, ""),
        author: author.replace(/(\r\n|\n|\r|\t|By|)/gm, "").slice(1),
        date: date,
        imageUrl: imageURL,
        imageDesc: imageDesc,
      };
      articles.push(article);
    }
  });
  // console.log(articles.length);
  return articles;
};

export default performScraping
