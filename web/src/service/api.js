import http from "./http.js";

// 获取下注记录
export const betRecords = params => http.get('https://www.tronoscar.pro/eiffelTowerBackend/betRecords', params);

// 获取个人下注记录
export const myBets = params => http.get('https://www.tronoscar.pro/eiffelTowerBackend/myBets', params);

// 获取当前游戏下注情况
export const getBetting = params => http.get('https://www.tronoscar.pro/ringBackend/getBetting', params);

// 获取直播列表
export const getRoomList = params => http.postFormData('/room/page', params);

// 获取历史记录
export const getHistory = params => http.get('https://www.tronoscar.pro/ringBackend/getHistory?Count=16', params);

// 获取卡牌排序列表
export const getRing = params => http.postFormData('ringBackend/getRing', params);

// 获取玛莎拉蒂活动倒计时
export const getLotteryTicketInfo = params => http.postFormData('ringBackend/getLotteryTicketInfo', params);

// 获取奖券持有数排行榜
export const getUserLotteryTicketTop = params => http.postFormData('ringBackend/getUserLotteryTicketTop?Count=6', params);

//0416 shif 获取开奖结果
export const getLotteryResult = params => http.postFormData('ringBackend/getTicketResult', params);

// 0417 shif 获取用户奖券持有详情
export const getLotteryTicketDetails = params => http.postFormData('ringBackend/getUserLotteryTicketDetail'+'?pAddr='+params.pAddr, params);

//0416 shif 获取上次开奖结果
export const getLastTime = params => http.postFormData('ringBackend/getLastRoundTicketResult', params);

//0416 shif 获取上次开奖结果
export const getUserLotteryDetail = params => http.postFormData('ringBackend/getUserLotteryDetail'+'?pAddr='+params.pAddr, params);

//0424 shif 获取聊天历史记录30
export const getChatHistory = params => http.get('https://www.tronoscar.pro/ringBackend/getChatHistory?Count=30',params);


// 倒计时
export const getNextDividendTime = params => http.get('https://www.tronoscar.pro/backend/getNextDividendTime', params);

//总分红
export const getShareAmtTotal = params => http.get('https://www.tronoscar.pro/backend/getShareAmtTotal', params);

//周成交额排行榜
export const getWeeklyAmountTop = params => http.get('https://www.tronoscar.pro/backend/getWeeklyAmountTop', params);

//周成交额排行榜
export const getInviteTopList = params => http.get('https://www.tronoscar.pro/backend/getInviteTop'+'?Count='+params.Count, params);

export const getPrizeRecords = params => http.get('https://www.tronoscar.pro/backend/prizeRecords', params);

export const getMyPrizes = params => http.get('https://www.tronoscar.pro/backend/myPrizes', params);

export const withdrawPrizes = params => http.get('https://www.tronoscar.pro/backend/withdraw', params);

export const getInviteTopEndTime = params => http.get('https://www.tronoscar.pro/backend/getInviteTopEndTime', params);

export const getInviteTop = params => http.get('https://www.tronoscar.pro/backend/getInviteTop', params);

export const getVerifyRandom = params => http.get('https://www.tronoscar.pro/backend/verifyRandom', params);

export const ringGetVerifyRandom = params => http.get('https://www.tronoscar.pro/ringBackend/verifyRandom', params);

export const diceGetVerifyRandom = params => http.get('https://www.tronoscar.pro/backend/verifyRandom', params);

export const getMyBetList = params => http.get('https://www.tronoscar.pro/backend/myBets', params);

export const getBetRecordList = params => http.get('https://www.tronoscar.pro/backend/betRecords' + '?Count=' + params.Count, params);


export const getBannerPC = params => http.get('https://www.tronoscar.pro/backend/getBannerPC', params);



export const getBannerList = params => http.get('https://www.tronoscar.pro/backend/getBanner', params);

/* 邀請人活動接口 shif 05-30 */

/* 获取邀请人活动基本信息 */
export const getInviteTopInfo = params => http.get('https://www.tronoscar.pro/backend/getInviteTopInfo', params);

/* 获取邀请人活动排行榜 */
export const getInviteTopYqr = params => http.get('https://www.tronoscar.pro/backend/getInviteTop'+ '?Count=5', params);

/* 获取邀请人活动 我的邀请详情 */
export const getMyInviteTop = params => http.get('https://www.tronoscar.pro/backend/getMyInviteTop', params);

/* 郵箱對接 0531 shif 发送验证码*/
export const bindEmail = params => http.get('https://www.tronoscar.pro/eiffelTowerBackend/bindEmail', params);


/* 郵箱對接 0531 shif 验证 */
export const validateEmail = params => http.get('https://www.tronoscar.pro/eiffelTowerBackend/validateEmail', params);

export const getPrizePot = params => http.get('https://www.tronoscar.pro/backend/getPrizePot', params);

/* 邮箱信息 */
export const getUserEmailInfo = params => http.get('https://www.tronoscar.pro/eiffelTowerBackend/getUserEmailInfo', params);

/* 多动奖励 */
export const getOdinPrize = params => http.get('https://www.tronoscar.pro/eiffelTowerBackend/getOdinPrize', params);