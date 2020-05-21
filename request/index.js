let ajksTimes=0;
export const request = (params) =>{
// 判断是否需要token
let header = {...params.header};
if(params.url.includes("/my/")) {
    header["Authorization"] = wx.getStorageSync("token");
}

    ajksTimes++;
    // 显示加载效果
    wx.showLoading({
        title: '加载中',
        mask:true
      })
  const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve, reject)=>{
        wx.request({
            ...params,
            header,
          url: baseUrl + params.url,
            success:(result)=>{
                resolve(result);
            },
            fail:(err)=>{
                reject(err);
            },
            complete:()=>{
                ajksTimes--
                if(ajksTimes===0) {
                    wx.hideLoading()
                }
            }
        });
    })
}