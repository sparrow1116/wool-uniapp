
const isServer = true;

 export default {
	baseDemain:isServer ? 'https://www.yangmaoba.club' : 'https://192.168.1.5:3000',
	picDomain:isServer ? 'https://bankpictur.oss-cn-shanghai.aliyuncs.com' : 'http://192.168.10.7:7777',
	bankIconDomain: 'https://wollpic.oss-cn-shanghai.aliyuncs.com/bank/'
}
