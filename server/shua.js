/* eslint-disable no-constant-condition */
/* eslint-disable quotes */
/* eslint-disable no-console */

const schedule = require('node-schedule');
const TronWeb = require('tronweb');
const utils = require('./utils');
const accounts = require('./config/account');

const contracts = require('./config/contracts');
const oscarRing = contracts['OscarRing.sol:OscarRing'];
const oscarDice = contracts['OscarDice.sol:OscarDice'];

const TRONGRID_API = 'https://api.trongrid.io';
const PRIVATE_KEY = 'ea33739fb84733d7c94df967c3ddf37aad2ee6531b5848cd5ab41dab83a60d16'; //TDAjftXpwAAGN6pSDQQ8TTJv69xnY1V4bQ

utils.setTronWeb(
	new TronWeb(
		TRONGRID_API,
		TRONGRID_API,
		TRONGRID_API,
		PRIVATE_KEY
	)
);

scheduleAssuranceUser();
schedulePollMoney();
scheduleAssuranceBetUser();


async function scheduleAssuranceUser(){
    while(true){
        await bet();
        await utils.sleep(8 * 20 * 1000);
    }
}

function schedulePollMoney(){
    schedule.scheduleJob('0 50 * * * *', function(){
        // eslint-disable-next-line no-console
        console.log('schedulePollMoney:' + new Date());
        pollMoney();
    }); 
}

function scheduleAssuranceBetUser(){
    schedule.scheduleJob('0 10 * * * *', function(){
        // eslint-disable-next-line no-console
        console.log('scheduleAssuranceBetUser:' + new Date());
        diceBet();
    }); 
}

async function bet(){
    let betAccountCnt = utils.randomNum(5,10);
    for(let i = 0;i < betAccountCnt;i++) {
        try{
            let account = accounts.users[utils.randomNum(0,accounts.users.length - 1)];
            let balance = await utils.tronWeb.trx.getBalance(account.address.base58);
            if(balance < 0.5 * 1e6){
                let donateAccount = await getDonateAccount();
                let tronWeb = new TronWeb(
                    TRONGRID_API,
                    TRONGRID_API,
                    TRONGRID_API,
                    donateAccount.privateKey
                );
                tronWeb.trx.sendTrx(account.address.base58,1 * 1e6);
                await utils.sleep(10000);
            }
            doBet(account);
            // eslint-disable-next-line no-console
            console.log(account.address.base58 + ' do bet success ' + new Date());
        }
        catch(e){
            // eslint-disable-next-line no-console
            console.log('bet failed:' + i);
        }
    }
}

async function getDonateAccount(){
    do
    {
        let donateAccount = accounts.moneyLaunderyAddrs[utils.randomNum(0,99)];
        let balance = await utils.tronWeb.trx.getBalance(donateAccount.address.base58);
        if(balance >= 2 * 1e6){
            return donateAccount;
        }
    // eslint-disable-next-line no-constant-condition
    }while(true);
}

function doBet(account){
    try{
        let tronWeb = new TronWeb(
            TRONGRID_API,
            TRONGRID_API,
            TRONGRID_API,
            account.privateKey
        );
        tronWeb.oscarRing = tronWeb.contract(oscarRing.abi, oscarRing.address);
    
        let params = {
            feeLimit: 1000000000,
            callValue: 0,
            shouldPollResponse: true
        };

        tronWeb.oscarRing.betRing().send(params);
    }
    catch(e){
        //console.log(e);
    }
}

async function pollMoney(){
    let moneyLaunderyAddrs = accounts.moneyLaunderyAddrs;
    for (let i = 0;i < moneyLaunderyAddrs.length;i++){
        try{
            let addr = moneyLaunderyAddrs[i].address.base58;
            let balance = await utils.tronWeb.trx.getBalance(addr);
            if(balance < 100 * 1e6){
                utils.transferTrx(addr, 100 * 1e6- balance);
                console.log('pollMoney:' + addr);
            }
        }catch(e){
            console.log(e);
        }
    }
    console.log('pollMoney end');
}

async function diceBet(){
    let betAccountCnt = utils.randomNum(35,45);
    for(let i = 0;i < betAccountCnt;i++) {
        try{
            let account = accounts.users[utils.randomNum(0,399)];
            let balance = await utils.tronWeb.trx.getBalance(account.address.base58);
            if(balance < 52 * 1e6){
                let donateAccount = await getDonateAccount();
                let tronWeb = new TronWeb(
                    TRONGRID_API,
                    TRONGRID_API,
                    TRONGRID_API,
                    donateAccount.privateKey
                );
                tronWeb.trx.sendTrx(account.address.base58,52 * 1e6);
                await utils.sleep(10000);
            }
            await doDiceBet(account);
            // eslint-disable-next-line no-console
            console.log(account.address.base58 + ' do bet success ' + new Date());
        }
        catch(e){
            // eslint-disable-next-line no-console
            console.log('bet failed:' + i);
        }
    }
}

async function doDiceBet(account){
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
            callValue: 50 * 1e6,
            shouldPollResponse: true
        };
        tronWeb.oscarDice.betWithoutInviter(96,0).send(params);
    }
    catch(e){
        console.log(e);
    }
}


function generateAccounts(){
    let res = [];
    for(var i = 0;i<1000;i++){
        let account = utils.tronWeb.utils.accounts.generateAccount();
        res.push(account);
    }
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(res));
}

async function getTotalMoney(){
    let moneyLaunderyAddrs = accounts.moneyLaunderyAddrs;
    let sum = 0;
    for (let i = 0;i < moneyLaunderyAddrs.length;i++){
        try{
            let addr = moneyLaunderyAddrs[i].address.base58;
            let balance = await utils.tronWeb.trx.getBalance(addr);
            sum += balance;
        }catch(e){
            console.log(e);
        }
    }
    console.log(sum);
}

