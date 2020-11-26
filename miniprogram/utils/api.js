module.exports = {
  confirm: confirm,
  promisify: promisify,
  promiseApi:promiseApi
}
async function promiseApi(api,option={},defaultOptions={}){
  const apiPromise = promisify(api);
  return await apiPromise(setDefaultOptions(option,defaultOptions)).then(res=>{
    return {status:"success",res:res}
  }).catch(res=>{ 
    return {status:"fail",res:res}
  })
}

async function confirm(modal) {
  const defaultOptions = {title:"操作提示",content:"确认执行么？"}
  const showModalPro = promisify(wx.showModal);
  return await showModalPro(setDefaultOptions(modal,defaultOptions)).then(res => {
    if (res.confirm) {
      return true;
    } else if (res.cancel) {
      return false;
    }
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