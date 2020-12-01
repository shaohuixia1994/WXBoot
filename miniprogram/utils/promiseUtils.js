module.exports = {
  confirm: confirm,
  promisify: promisify,
  promiseApi:promiseApi,
  request:request,
  canUseXXX:canUseXXX
}


//method:GET dataType:json responseType:text header['content-type'] 为 application/json / post 注意改为application/x-www-form-urlencoded
async function request(options) {
  const host="";
  options.url =host+ (options.url||"");
  const defaultOptions = {url:host}

  const requestPro = promisify(wx.request);
  return await requestPro(setDefaultOptions(options,defaultOptions)).then(res => {
    return   Object.assign(res,{status:"success"}); 
  }).catch(res=>{ 
    return  Object.assign(res,{status:"fail"}); 
  })
}




async function confirm(options) {
  const defaultOptions = {title:"操作提示",content:"确认执行么？"}
  const showModalPro = promisify(wx.showModal);
  return await showModalPro(setDefaultOptions(options,defaultOptions)).then(res => {
    if (res.confirm) {
      return true;
    } else if (res.cancel) {
      return false;
    }
  })
}

async function canUseXXX(options) {
  const auth = this.$getStore("auth");

  if(!auth.canUseXXX){
  const defaultOptions = {title:"操作提示",content:"同意授权隐私？"}
  const showModalPro = promisify(wx.showModal);
  return await showModalPro(setDefaultOptions(options,defaultOptions)).then(res => {
    if (res.confirm) {
      auth.canUseXXX = true;
    } else if (res.cancel) {
      auth.canUseXXX = false;
    }
  })}
  return auth.canUseXXX;
}


async function promiseApi(api,option={},defaultOptions={}){
  const apiPromise = promisify(api);
  return await apiPromise(setDefaultOptions(option,defaultOptions)).then(res=>{
    return {status:"success",res:res}
  }).catch(res=>{ 
    return {status:"fail",res:res}
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