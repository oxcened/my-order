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
