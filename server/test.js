const TronWeb = require('tronweb');
const utils = require('./utils');
const accounts = require('./config/account');

const TRONGRID_API = 'https://api.trongrid.io';
const PRIVATE_KEY = 'ea33739fb84733d7c94df967c3ddf37aad2ee6531b5848cd5ab41dab83a60d16'; //TDAjftXpwAAGN6pSDQQ8TTJv69xnY1V4bQ

//  /////////////setTronWeb//////////////////////////////////////////////////////////////
utils.setTronWeb(
	new TronWeb(
		TRONGRID_API,
		TRONGRID_API,
		TRONGRID_API,
		PRIVATE_KEY
	)
);

// {
// 	"privateKey":"853AB6911B025FEC99ADD99E38ABDECD3FBC50BF3B4E5B884665526464A316F4",
// 	"publicKey":"04BA516BCF142E6802009A701CEC433B34438BC717E3F552092927149D6143C326F8CB6BD1B098781FD89E7984BEE5A3F5528E6540D3F441E4C3250116F1F6C20F",
// 	"address":{
// 		"base58":"TC5qBm6nYS8W7CwYaNmnUToCHgaSgoWRJU",
// 		"hex":"411730F3E1290DF37EC1B0529F2A2DED846424D818"
// 	}
// },

(async function(){
	let sum = 0;
	for (let i = 0;i<accounts.users.length;i++){
		let account = accounts.users[i];
		let b = await utils.getBalanceByAddr(account.address.base58);
		sum += b;

		if (b > 10000){
			// let tronWeb = new TronWeb(
			// 	TRONGRID_API,
			// 	TRONGRID_API,
			// 	TRONGRID_API,
			// 	account.privateKey
			// );
			// tronWeb.trx.sendTrx('TC5qBm6nYS8W7CwYaNmnUToCHgaSgoWRJU',b - 10000);
		}
		console.log(i);
	}
	console.log(sum);
})();