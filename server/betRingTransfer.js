/* eslint-disable no-constant-condition */
/* eslint-disable quotes */
/* eslint-disable no-console */

const TronWeb = require('tronweb');
const utils = require('./utils');
const accounts = require('./config/account');
const schedule = require('node-schedule');
const contracts = require('./config/contracts');
const oscarRing = contracts['OscarRing.sol:OscarRing'];
const oscarDice = contracts['OscarDice.sol:OscarDice'];


const TRONGRID_API = 'https://api.trongrid.io'; 
const PRIVATE_KEY = '4c1ac3f8631b6376ea149c4e73e187fecf988fdb02e0fd3911d6e653839c4610'; //刷量总账户 TWtwAT81cVAhkoJVE8PzJa5GmoTyCLxc4P
const MoneyAddress = 'TWtwAT81cVAhkoJVE8PzJa5GmoTyCLxc4P';

utils.setTronWeb(
	new TronWeb(
		TRONGRID_API,
		TRONGRID_API,
		TRONGRID_API,
		PRIVATE_KEY
	)
);

scheduleBetTransfer();
scheduleBet();


function scheduleBet(){

    schedule.scheduleJob('0 10 * * * *', function(){
        // eslint-disable-next-line no-console
        doBet();
        console.log('scheduledoBet:' + new Date());
        
    }); 
}
   

function scheduleBetTransfer(){

    schedule.scheduleJob('0 40 * * * *', function(){
        // eslint-disable-next-line no-console
        doBetRingTransfer();
        console.log('scheduleBetTransfer:' + new Date());
    });    
}

async function  doBet(){
    try{
        let betAccountCnt = utils.randomNum(25,35);
        let account = accounts.betAddress[utils.randomNum(0,accounts.betAddress.length - 1)];
        
        utils.tronWeb.trx.sendTrx(account.address.base58,betAccountCnt * 10001 * 1e6);
        await utils.sleep(10000); 
        for(let i = 0;i < betAccountCnt;i++) {    
            bet(account);
            // eslint-disable-next-line no-console
            console.log(account.address.base58 + ' do bet success ' + new Date());    
        }

        let tronWeb = new TronWeb(
            TRONGRID_API,
            TRONGRID_API,
            TRONGRID_API,
            account.privateKey
        );
        await utils.sleep(50000);
        let balance = await utils.tronWeb.trx.getBalance(account.address.base58);
        if(balance > 0){
            tronWeb.trx.sendTrx(MoneyAddress,balance - 1e6);
            console.log(' Transfer success' + balance / 1e6);
        }
    }catch(e){
        // eslint-disable-next-line no-console
        console.log(e);
    }
}

async function bet(account){
    try{
        let tronWeb = new TronWeb(
            TRONGRID_API,
            TRONGRID_API,
            TRONGRID_API,
            account.privateKey
        );
        tronWeb.oscarDice = tronWeb.contract(oscarDice.abi, oscarDice.address);
    
        let params = {
            feeLimit: 1000000000,
            callValue: 10000 * 1e6,
            shouldPollResponse: true
        };

        tronWeb.oscarDice.betWithoutInviter(96,0).send(params);
    }
    catch(e){
        console.log(e);
    }
}

async function doBetRingTransfer(){
    try{
        let cnt = utils.randomNum(15,20);
        for(let i = 0;i < cnt;i++) {
            let balance = await utils.tronWeb.trx.getBalance(MoneyAddress) - 5*1e6;
            utils.tronWeb.OscarRing = utils.tronWeb.contract(oscarRing.abi, oscarRing.address);
            let params = {
                feeLimit: 1000000000,
                callValue: balance,
                shouldPollResponse: true
            };
            await utils.tronWeb.OscarRing.betRingTransfer().send(params);
            console.log("betRingTransfer success!!!");
        }
        await utils.sleep(5*1000);
    }catch(e){
        console.log("betRingTransfer error!!!");
    }
}