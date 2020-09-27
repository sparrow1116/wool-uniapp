import config from './config'

const BaseUrl = config.baseDemain

export function http(opt){
	
	const url = opt.url;
	const method = opt.method?opt.method:"POST"
	const data = opt.data?opt.data:{}
	return new Promise((res,rej)=>{
		uni.request({
			url:BaseUrl + url,
			method,
			data:data,
			success:(dd)=>{
				// console.log(dd);
				if(dd.statusCode==200){
					if(dd.data.msg.code == 0){
						res(dd.data.msg.data)
					}else{
						console.log("平台数据错误")
					} 
				}else{
					console.log('链接平台错误')
				}
			}
		})
	})
}
