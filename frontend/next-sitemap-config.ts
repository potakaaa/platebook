/** @type {import('next-sitemap').IConfig} */

const dev = process.env.NODE_ENV !== "production";

module.exports = {
  siteUrl: dev ? "http://127.0.0.1:3000" : "https://platebook.vercel.app",
};
