module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "WinkEat",
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    "gatsby-plugin-typescript",
    "gatsby-plugin-postcss",
    "gatsby-plugin-lodash",
    /*{
      resolve: "gatsby-plugin-react-redux-persist",
      options: {
        pathToCreateStoreModule: './src/redux/store',
      }
    },*/
  ],
};
