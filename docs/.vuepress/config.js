module.exports = {
  title: "Koa2",
  description: "🚀 Koa 学习笔记",
  base: "/koa2/",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  themeConfig: {
    nav: [
      {
        text: "MongoDB",
        link: "/mongodb/"
      }
    ],
    sidebar: {
      "/mongodb/": getMongoDBSiderBar()
    }
  }
};

function getMongoDBSiderBar() {
  return [
    {
      title: "MongoDB",
      collapsable: false,
      children: ["", "install"]
    }
  ];
}
