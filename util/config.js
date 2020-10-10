
const isServer = true;

 export default {
	baseDemain:isServer ? 'http://47.103.124.76:3000' : 'https://192.168.1.5:3000',
	picDomain:isServer ? 'https://bankpictur.oss-cn-shanghai.aliyuncs.com' : 'http://192.168.10.7:7777',
	bankIconDomain: 'https://wollpic.oss-cn-shanghai.aliyuncs.com/bank/'
}
