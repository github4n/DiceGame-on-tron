## Dice投注验证
curl https://www.tronoscar.pro/backend/verifyRandom\?BetId\=2

## 返回
      
{
    "betId":2,
    "addr":"TWTRec8CQUF64U9D7mY5TZbMbJZxhMDAzV",
    "betNum":95,
    "betAmt":1000000000,
    "timestamp":1558778241000,
    "combSeed":"TWTRec8CQUF64U9D7mY5TZbMbJZxhMDAzV29510000000001558778241000",
    "combSeedSha3":"0xb842afe989e1784eb0d01d1e528007b96b1818e30b7b22afefff95190261f21e",
    "publicKey":"047B4E4108DB01E92AAB05F46A471BA6C89A818E5ABA8D12E6E3C59E21A8DD1D5C834820D448A31C8571CF587BCE1730A40E24BAFD37A3931598A1D11EDF3820B4",
    "publicKeyAddr":"TPL6a5CKYWFqU82JoTaMLhm5YCdHnSD8j9",
    "sign":"0xcf9bb1ac2fe3a5f9ac21cd97b363eb71159a7ec31c82593d58f126411c2bc1a226c6d10ca83992f97637e45c78c35a4248ac67257cfff5efc8740f03ee73cfc61c",
    "sha3Sig":"0x35b88e1f06fd8bf18c54d411b08356e13d7f1a3785ac8b6b83692bf9e9abb1c1",
    "last6digits":"abb1c1(11252161)",
    "luckNum":62
}


## Ring投注验证
curl http://192.168.12.190:3000/ringBackend/verifyRandom?GId=2191
## 返回
      
{ 
    "gID":"2191",
    "combSeed":"CvQmzKEMvvHyUxl9dYKIqQIKygjYT4lF2191",
    "combSeedSha3":"0x4ab0930f99f7c839e15d8461fc8dada7eb992edd527a750002ffcefe807c72cc",
    "publicKey":"047B4E4108DB01E92AAB05F46A471BA6C89A818E5ABA8D12E6E3C59E21A8DD1D5C834820D448A31C8571CF587BCE1730A40E24BAFD37A3931598A1D11EDF3820B4",
    "publicKeyAddr":"TPL6a5CKYWFqU82JoTaMLhm5YCdHnSD8j9",
    "sign":"0x758705931a1c883edeb31387385ba4d07d4d9d591bd8f25097e451d6aeae97cf02448607037c229a917fc4aedd15a094875b07910e0f3719de293da47e04ec6f1b",
    "sha3Sig":"0xe8278d01dbcfe514ff51f8edcafd0374cf38e623027dfb330b545055cb4f03e7",
    "last6digits":"4f03e7(5178343)",
    "luckNum":8
}


## 获取邀请人活动基本信息
curl http://192.168.12.190/backend/getInviteTopInfo
## 返回
{
    "endTime":"1559404800000", //分红倒计时
    "totalPrize":0  //累积分红总量
}


## 获取邀请人活动排行榜
curl http://192.168.12.190/backend/getInviteTop?Count=10
## 返回
[
    {
        "addr":"TCiGREKREpbLQjbm9YgWbYLxDdsW1tL5dV", //用户地址
        "amt":100,      //总分数
        "amtBet":60,    //下注额分数
        "amtUser":40,   //活跃用户分数
        "prize":0       //预计奖励
    }
]


## 获取邀请人活动 我的邀请详情
curl http://192.168.12.190/backend/getMyInviteTop?Addr=TCiGREKREpbLQjbm9YgWbYLxDdsW1tL5dV
## 返回
{
    "activeUserCnt":1,                                      //本周活跃用户数
    "totalBetThisWeek":2481480,                             //本周累积下注额
    "details":[
        {
            "addr":"TWTRec8CQUF64U9D7mY5TZbMbJZxhMDAzV",    //用户地址
            "totalBetAmt":37037,                            //累积下注额
            "betAmtThisWeek":2481480                        //当周下注额
        }
    ]
}