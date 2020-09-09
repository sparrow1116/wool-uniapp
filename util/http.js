
const BaseUrl = "http://localhost:3000"

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
				console.log(dd);
				res(dd);
			}
		})
	})
}
