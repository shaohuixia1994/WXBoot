module.exports = {

  $callFun: callFunction,
  $add: add,
  $get: get,
  $update: update,
  $remove: remove,
  $count:count
}

//取数据库实例。一个数据库对应一个实例

/**
 * 封装查询操作
 * 增 查 改 删
 * 
 */

//增
async function add(collectionName, data, openParse = false) {
  if (openParse) {
    data = await parseQuery(data, this)
  }
  return this.$collection(collectionName).add({
    data
  }).then(res => {
    return res._id
  }).catch(res => {
    return ""
  })
}

//查询
//对应id取不到的时候，返回{}
async function get(collectionName, query, openParse = false) {
  switch (type(query)) {
    case "string":
      return this.$collection(collectionName).doc(query).get().then(res => {
        return res.data
      }).catch(res => {
        console.warn(`"collection":"${collectionName}","_id":"${query}"不存在`)
        return {}
      })
    case "object":
      const defaultOptions = {
        where: null,
        order: null,
        skip: 0,
        limit: 20,
        field: null,
        pageIndex: 1
      }
      const parsequery = setDefaultOptions(query, defaultOptions);
      let {
        where, order, skip, limit, field, pageIndex
      } = parsequery;
      let collectionGet = this.$collection(collectionName);
      if (where != null) {
        if (openParse) {
          where = await parseQuery(where, this)
        }
        collectionGet = collectionGet.where(where)
      }
      if (order != null) {
        if (type(order) == "object") {
          collectionGet = collectionGet.orderBy(order.name, order.value);
        }
        if (type(order) == "array") {
          order.forEach(orderItem => {
            collectionGet = collectionGet.orderBy(orderItem.name, orderItem.value);
          });
        }
      }
      if (field) {
        collectionGet = collectionGet.field(field);
      }
      if (pageIndex > 1) {
        collectionGet = collectionGet.skip((pageIndex - 1) * limit).limit(limit);
      } else {
        collectionGet = collectionGet.skip(skip).limit(limit);
      }
      return collectionGet.get().then(res => {
        return res.data
      }).catch(res => {
        console.warn(`"collection":"${collectionName}"不存在`)
        return []
      })
    default:
      console.warn(`"query":参数类型错误不存在`)
      return null;
  }
}

async function count(collectionName, query, openParse = false) {
  switch (type(query)) {
     
    case "object":
      let collectionUpdate = this.$collection(collectionName);
      if (openParse) {
        query = await parseQuery(query, this)
      }
      collectionUpdate = collectionUpdate.where(query)
      return collectionUpdate.count().then(res => {
        return res.total
      }).catch(res => {
        console.warn(`"collection":"${collectionName}"不存在`)
        return 0
      })
    default:
      return this.$collection(collectionName).count().then(res => {
        return res.total
      }).catch(res => {
        console.warn(`"collection":"${collectionName}"不存在`)
        return 0
      })
     
  }
}


//修改
async function update(collectionName, query, updata, openParse = false) {
  switch (type(query)) {
    case "string":
      return this.$collection(collectionName).doc(query).update({
        data: updata
      }).then(res => {
        return res.stats.updated
      }).catch(res => {
        console.warn(`"collection":"${collectionName}","_id":"${query}"不存在`)
        return 0
      })
    case "object":
      let collectionUpdate = this.$collection(collectionName);
      if (openParse) {
        query = await parseQuery(query, this)
      }
      collectionUpdate = collectionUpdate.where(query)
      return collectionUpdate.update({
        data: updata
      }).then(res => {
        return res.stats.updated
      }).catch(res => {
        console.warn(`"collection":"${collectionName}"不存在`)
        return 0
      })
    default:
      console.warn(`"query":参数类型错误不存在`)
      return 0
  }
}


//删除
async function remove(collectionName, query, openParse=false) {
  switch (type(query)) {
    case "string":
      return this.$collection(collectionName).doc(query).remove().then(res => {
        return res
      }).catch(res => {
        console.warn(`"collection":"${collectionName}","_id":"${query}"不存在`)
        return {}
      })
    case "object":
      let collectionRemove = this.$collection(collectionName);
      if (openParse) {
        query = await parseQuery(query, this)
      }
      collectionRemove = collectionRemove.where(query)
      return collectionRemove.remove().then(res => {
        return res
      }).catch(res => {
        console.warn(`"collection":"${collectionName}"不存在`)
        return []
      })
    default:
      console.warn(`"query":参数类型错误不存在`)
      return 0
  }
}


function setDefaultOptions(options = {}, defaultOptions = {}) {
  return Object.assign(defaultOptions, options);
}

function promisify(api) {
  return (options, ...query) => {
    return new Promise((resolve, reject) => {
      api(Object.assign({}, options, {
        success: resolve,
        fail: reject
      }), ...query);
    })
  }
}

async function callFunction(options) {
  return await this.cloud.callFunction(options)
}

var undef = void(0)
function type(obj) {
  if (obj === null) return 'null'
  else if (obj === undef) return 'undefined'
  var m = /\[object (\w+)\]/.exec(Object.prototype.toString.call(obj))
  return m ? m[1].toLowerCase() : ''
}
async function parseQuery(query, self) {
  let queryStr = JSON.stringify(query);
  if (queryStr.indexOf("{openid}") > -1) {
    let openid = await self.$getOpenid();
    return JSON.parse(queryStr.replace(/{openid}/g, openid));
  } else {
    return query
  }
}