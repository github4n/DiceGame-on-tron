#### Ring
1. getWager --> getRingWager
2. getGameBetNumberAmt --> getRingGameBetNumberAmt
3. bet --> ringBet

#### Dice
1. getWager --> getDiceWager
2. bet --> diceBet(_betNumber, _betValue,_type,_inviterPAddr) 多了个_type under默认为0 over默认为1
3. 添加接口 getDiceMinimal 前端下注的最小值
4. getTotalSupply  --> getCirculatingSupply
5. getMintLevelAndOverage返回值 mintRate 是1000 指的是1000TRX挖矿获得1个ODIN