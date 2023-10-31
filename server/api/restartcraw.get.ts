import config from '~/config';
import { insert, insertError } from '../db';
import { getApi as biliData } from './bilibili.get';
import { getRealtime } from './baidu.get';
import { getWeb } from './weibo.get';
import { getApi as zhihuData } from './zhihu.get';

const FLAG = ['realtimehot', 'entrank', 'sport', 'game', 'socialevent'];
const domainArr = [
  '0',
  '100000',
  '100001',
  '100002',
  '100003',
  '100004',
  '100005',
  '100006',
  '100007',
  '100008',
  '100009',
  '100010',
  '100011',
  '100012',
  '100013',
  '100014',
  '100015',
  '100016',
  '100017',
  '100018',
  '100019',
  '100020',
  '100021',
  '100022',
  '100023',
  '100024',
  '100025',
  '100026',
  '100027',
  '100028',
  '100029',
];

let interval: NodeJS.Timeout;
let start = 0;
let isStart = false;

const addDataByBaidu = async () => {
  let data = await getRealtime();
  insert('baidu', data);
};
const addDataByBili = async (limit = 20) => {
  const query = { limit };
  let data = await biliData(limit);
  insert('bili', data, query);
};
const addDataByWeibo = async () => {
  const s = start;
  for (let item of FLAG) {
    if (s !== start) return;
    let data = await getWeb(item);
    insert('weibo', data, { cate: item });
    await wait();
  }
};
const addDataByZhihu = async () => {
  const s = start;
  for (let item of domainArr) {
    if (s !== start) return;
    let data = await zhihuData(item, 'hour');
    let q = { domain: item, period: 'hour', offset: 0, limit: 20 };
    insert('zhihu', data, q);
    await wait();
  }
};

const getNews = async () => {
  return new Promise((resolve, reject) => {
    console.log(new Date());
    Promise.allSettled([
      addDataByBaidu(),
      addDataByBili(),
      addDataByWeibo(),
      addDataByZhihu(),
    ])
      .then(resolve)
      .catch((e) => {
        insertError(e);
        reject(e);
      });
  });
};

export const startCraw = () => {
  if (isStart) return;
  isStart = true;
  start = new Date().getTime();
  getNews();
  interval = setInterval(
    () => {
      start = new Date().getTime();
      getNews();
    },
    config.server.interval > 600000 ? config.server.interval : 600000
  );
};

export default defineEventHandler(async (event) => {
  interval && clearInterval(interval);
  isStart = false;
  startCraw();
  return {
    code: '200',
    date: new Date(),
    message: '爬取程序重启成功！',
  };
});
