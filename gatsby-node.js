const path = require('path');

exports.createPages = ({ actions: { createPage } }) => {
  createPage({
    path: '/order/new',
    component: path.resolve('./src/components/OrderDetail.tsx')
  });

  createPage({
    path: '/order/',
    matchPath: '/order/:id',
    component: path.resolve('./src/components/OrderDetail.tsx')
  });
};

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html" || stage === "develop-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /firebase/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
};
