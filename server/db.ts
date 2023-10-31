import { MongoClient, WithId, InsertOneResult } from 'mongodb';
import config from '@/config/index';
const uri = config.server.db.uri;

let client: MongoClient = new MongoClient(uri, {
  maxConnecting: config.server.db.maxConnecting || 6,
  maxPoolSize: config.server.db.maxPoolSize || 8,
  minPoolSize: config.server.db.minPoolSize || 4,
  connectTimeoutMS: config.server.db.connectTimeoutMS || 3000,
});
type colType = 'zhihu' | 'bili' | 'baidu' | 'weibo' | 'error';
interface DATABASE<dataT> {
  date: number;
  data: dataT;
}

function reMainCol(coll: colType) {
  const database = client.db('news');

  switch (coll) {
    case 'error':
      return database.collection<DATABASE<any>>('error');
    case 'baidu':
      return database.collection<DATABASE<any>>('baidu');
    case 'zhihu':
      return database.collection<DATABASE<any>>('zhihu');
    case 'bili':
      return database.collection<DATABASE<any>>('bili');
    default:
      return database.collection<DATABASE<any>>('weibo');
  }
}

export async function find(
  coll: colType,
  query: { [key: string]: number | string } = {}
): Promise<WithId<DATABASE<any>>> {
  return new Promise((resolve, reject) => {
    try {
      const date = (new Date().getTime() / 1000) | 0;
      const mainC = reMainCol(coll);

      mainC
        .findOne(
          { date: { $gt: date - 3600 }, ...query },
          { sort: { date: -1 } }
        )
        .then((ans) => {
          ans === null ? reject('Null') : resolve(ans);
        })
        .catch((e) => {
          reject(e);
        });
    } catch (e) {
      reject(e);
    }
  });
}

export function insert(
  coll: colType,
  data: any,
  query: { [key: string]: number | string } = {}
): Promise<InsertOneResult<DATABASE<any>>> {
  return new Promise((resolve, reject) => {
    try {
      const date = (new Date().getTime() / 1000) | 0;
      const mainC = reMainCol(coll);

      mainC
        .insertOne({ date, data, ...query })
        .then((ans) => {
          resolve(ans);
        })
        .catch((e) => {
          reject(e);
        });
    } catch (e) {
      reject(e);
    }
  });
}

export function deleteByDate() {
  return new Promise((resolve, reject) => {
    const date = ((new Date().getTime() / 1000) | 0) - config.server.dbcache;
    Promise.allSettled([
      reMainCol('baidu').deleteMany({ date: { $lt: date } }),
      reMainCol('zhihu').deleteMany({ date: { $lt: date } }),
      reMainCol('weibo').deleteMany({ date: { $lt: date } }),
      reMainCol('bili').deleteMany({ date: { $lt: date } }),
    ])
      .then(resolve)
      .catch(reject);
  });
}

export function insertError(data: any) {
  return new Promise((resolve, reject) => {
    try {
      const date = new Date().getTime();
      const mainC = reMainCol('error');

      mainC
        .insertOne({ date, data })
        .then((ans) => {
          resolve(ans);
        })
        .catch((e) => {
          reject(e);
        });
    } catch (e) {
      reject(e);
    }
  });
}
