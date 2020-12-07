// 云函数入口文件
const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db  = cloud.database();

exports.main = async (event, context) => {
    let params = event.queryStringParameters;
    let pageIndex = parseInt(params.pageIndex)||1;
    let pageSize = parseInt(params.pageSize)||20;

    let articleName = params.articleName||"";
    console.log(articleName)
    return await db.collection("wms-article").where({articleName: db.RegExp({
      regexp: articleName,
      options: 'i',
    })}).skip((pageIndex-1)*pageSize).limit(pageSize).get().then(function(res){
        return  db.collection("wms-article").where({articleName: db.RegExp({
          regexp: articleName+"",
          options: 'i',
        })}).count().then(function(res2){
          const result = {}
          result.total = res2.total;
          result.rows = res.data
            return result;
        })
    });
};
