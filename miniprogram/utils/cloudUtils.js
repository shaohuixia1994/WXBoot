module.exports = {
  collection: collection,
  getById:getById,
  getByParams:getByParams,
  callFunction:callFunction
}


//取数据库实例。一个数据库对应一个实例
function collection(collectionName) {
  if (!this.collectionList.hasOwnProperty(collectionName)) {
    this.collectionList[collectionName] = this.db.collection(collectionName)
  }
  return this.collectionList[collectionName]
}
/**
 * 封装查询操作
 * 
 * 
 */
//对应id取不到的时候，返回{}
async function getById(collectionName,id) {
  return this.collection(collectionName).doc(id).get().then(res=>{
    return res.data
  }).catch(res=>{ 
    console.warn(`"collection":"${collectionName}","_id":"${id}"不存在`)
    return {}
  })
}


//{_openid:"{openid}"}  键值对 name value
async function getByParams(collectionName,params) {
  const defaultOptions = {where:null,order:null,skip:0,limit:20,field:null,pageIndex:1}
  const parseParams = setDefaultOptions(params,defaultOptions);
  const {where,order,skip,limit,field,pageIndex} = parseParams;
  let collectionGet = this.collection(collectionName);

  if(where!=null){
    if(where._openid=="{openid}"){
      where._openid = await this.$getOpenid();
    }
    collectionGet = collectionGet.where(where)
  }
  if(order!=null){
    if(Object.prototype.toString.call(order)=="[object Object]"){
     
      collectionGet = collectionGet.orderBy(order.name,order.value);
    }
    if(Object.prototype.toString.call(order)=="[object Array]"){
    order.forEach(orderItem => {
      collectionGet = collectionGet.orderBy(orderItem.name,orderItem.value);
    });}
  }
  if(field){
    collectionGet = collectionGet.field(field);
  }
  if(pageIndex>1){
    collectionGet = collectionGet.skip((pageIndex-1)*limit).limit(limit);
  } else {
    collectionGet = collectionGet.skip(skip).limit(limit);
  }
  return collectionGet.get().then(res=>{
    return res.data
  }).catch(res=>{ 
    console.warn(`"collection":"${collectionName}"不存在`)
    return []
  })
}


function setDefaultOptions(options={}, defaultOptions={}) {
  return Object.assign(defaultOptions, options);
}

function promisify(api) {
  return (options, ...params) => {
    return new Promise((resolve, reject) => {
      api(Object.assign({}, options, {
        success: resolve,
        fail: reject
      }), ...params);
    })
  }
}

async function callFunction(options){
  return await this.cloud.callFunction(options)
}