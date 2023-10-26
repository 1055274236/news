import { MongoClient, WithId, InsertOneResult } from 'mongodb';
const username = 'news';
const password = 'thisispassword';
const uri = `mongodb+srv://${username}:${password}@cluster0.ux78xzw.mongodb.net/?retryWrites=true&w=majority`;

let client: MongoClient = new MongoClient(uri, {
  maxPoolSize: 8,
  minPoolSize: 4,
  connectTimeoutMS: 3000,
});
type apiType = 'zhihu' | 'bili' | 'baidu' | 'weibo';
interface DATABASE<dataT> {
  date: number;
  data: dataT;
}

function reMainCol(coll: apiType) {
  const database = client.db('news');

  switch (coll) {
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
  coll: apiType,
  query: { [key: string]: number | string } = {}
): Promise<WithId<DATABASE<any>>> {
  return new Promise((resolve, reject) => {
    try {
      const date = ((new Date().getTime() / 1000 / 3600) | 0) * 3600;
      const mainC = reMainCol(coll);

      mainC
        .findOne({ date, ...query })
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
  coll: apiType,
  data: any,
  query: { [key: string]: number | string } = {}
): Promise<InsertOneResult<DATABASE<any>>> {
  return new Promise((resolve, reject) => {
    try {
      const date = ((new Date().getTime() / 1000 / 3600) | 0) * 3600;
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
