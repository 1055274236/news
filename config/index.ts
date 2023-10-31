const config = {
  server: {
    useDB: true,
    crawling: false, // 是否持续爬取数据
    interval: 1800000, // 爬取间隔时间，crawling必须为true,30 min 必须大于 10 min
    dbcache: 432000,
    db: {
      uri: 'mongodb+srv://news:thisispassword@cluster0.ux78xzw.mongodb.net/?retryWrites=true&w=majority',
      maxConnecting: 6,
      maxPoolSize: 8,
      minPoolSize: 4,
      connectTimeoutMS: 3000,
    },
  },
};

export { config };

export default config;
