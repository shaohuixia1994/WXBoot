module.exports = {
  collection: collection,
  add:addOne,
  getById:getById,
  getByParams:getByParams,
  updateById:updateById,
  updateByParams:updateByParams,
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
 * 增 查 改 删
 * 
 */

//
async function addOne(collectionName,data,openParse=false) {
  if(openParse){
    data = await parseQuery(data,this)
  }
  return this.collection(collectionName).add({data}).then(res=>{
    return res._id
  }).catch(res=>{ 
   
    return ""
  })
}



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
async function getByParams(collectionName,params,openParse=false) {
  const defaultOptions = {where:null,order:null,skip:0,limit:20,field:null,pageIndex:1}
  const parseParams = setDefaultOptions(params,defaultOptions);
  let {where,order,skip,limit,field,pageIndex} = parseParams;
  let collectionGet = this.collection(collectionName);

  if(where!=null){
    if(openParse){
      where = await parseQuery(where,this)
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

//修改
async function updateById(collectionName,id,data,openParse) {
  if(openParse){
    data = await parseQuery(data,this)
  }
  return this.collection(collectionName).doc(id).update({data}).then(res=>{
    return res.stats.updated
  }).catch(res=>{ 
    console.warn(`"collection":"${collectionName}","_id":"${id}"不存在`)
    return {}
  })
}
//_openid:"{openid}" 当使用自定义规则时 就可以直接用"{openid}"替换openid
async function updateByParams(collectionName,where,data,openParse=false) {
  
  let collectionUpdate = this.collection(collectionName);

  if(where!=null){
    if(openParse){
      where = await parseQuery(where,this)
    }
    
  }
  console.log(where)
  collectionUpdate = collectionUpdate.where(where)
  return collectionUpdate.update({data}).then(res=>{
    return res.stats.updated
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


async function parseQuery(where,self){
  let whereStr = JSON.stringify(where);
    if(whereStr.indexOf("{openid}")>-1){
      let openid = await self.$getOpenid();
      return JSON.parse(whereStr.replace(/{openid}/g,openid));
    } else{
      return where
    }

}