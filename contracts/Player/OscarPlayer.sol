pragma solidity ^0.4.23;

import "./Admin.sol";
import "./ITRC20.sol";
import "./SafeMath.sol";
contract OscarPlayer is Admin { 

    constructor ()
      public 
    {
        owner_ = msg.sender;
        administrators_[owner_] = true;
    }
  
    using SafeMath for uint64;
    /** player begin **/
    
    /** mint tokens begin **/
    address public tokenAddr = address(0x4107175085dca069a17198c84adae5e6e12cb10639);
    ITRC20  public Token = ITRC20(tokenAddr);
    
    function setTokenAddr(address tokenAddr_)
    public
    onlyAdministrator
    {
        tokenAddr = tokenAddr_;
        Token = ITRC20(tokenAddr);
    }

    bool public mintTokensEnable_ = true;
    
    function enableMintTokens ()
    onlyAdministrator
    public
    {
        mintTokensEnable_ = true;
    }
    
    function disableMintTokens ()
    onlyAdministrator
    public
    {
        mintTokensEnable_ = false;
    }
  
    function transferTokens (address _pAddr, uint64 _tokens)
    onlyAdministrator
    public
    {
        Token.transfer(_pAddr, _tokens);
    }
    
    uint64 public mintRate_ = 1000;

    function setMintRate(uint64 _mintRate)
    public
    onlyAdministrator
    {
        mintRate_ = _mintRate;
    }


    //阶段性挖矿数量
    uint64 public mintAmount_ = 2000000000000;

    function setMintAmount(uint64 _mintAmount)
    public
    onlyAdministrator
    {
        mintAmount_ = _mintAmount;
    }

    uint64 public mintLevel_ = 1;

    function setMintLevel(uint64 _mintLevel)
    public
    onlyAdministrator
    {
        mintLevel_ = _mintLevel;
    }

    //当前已挖矿总额
    uint64 public tokensMintedTotal_;

    function setTokensMintedTotal (uint64 _tokensMintedTotal)
    onlyAdministrator
    public
    {
        tokensMintedTotal_ = _tokensMintedTotal;
    }

    function getMintLevelAndOverage()
    public
    view
    returns (uint64,uint64,uint64,uint64)
    {
        return (mintLevel_,mintAmount_,mintAmount_.mul(mintLevel_).sub(tokensMintedTotal_),mintRate_);
    }

    mapping (address => bool) public pAddrBetStatus_; //用户地址对应平台下注情况

    function updatepAddrBetStatus(address _pAddr,bool status_)
    public 
    onlyAdministrator 
    {
        pAddrBetStatus_[_pAddr] = status_;
    }

    uint64 public  inviteRate_ = 15;//邀请人比率
   
    function setInviteRate(uint64 inviteRate)
    public 
    onlyAdministrator 
    {
        inviteRate_ = inviteRate;
    }

    uint64 public mintVariety_ = 40;//通缩变化量
    function setMintVariety(uint64 mintVariety)
    public 
    onlyAdministrator 
    {
        mintVariety_ = mintVariety;
    }

    //白名单地址投注
    mapping (address => bool) public whiteList_;
    uint64 public whiteRate_ = 200;
    function setWhiteRate(uint64 whiteRate)
    public 
    onlyAdministrator
    {
        whiteRate_ = whiteRate;
    }
    function setWhiteList(address pAddr,bool status_)
    public 
    onlyAdministrator
    {
        whiteList_[pAddr] = status_;
    }

    function mintTokens (address _pAddr, uint64 _token)
    public 
    onlyAdministrator 
    returns(uint64) 
    {
        if (!mintTokensEnable_) {
            return;
        }

        uint64 _tokensMinted;
        uint64 _inviteMinted;          

        if( whiteList_[_pAddr] == true) {
            _tokensMinted = _token.div(mintRate_).mul(whiteRate_).div(100);
        }else{
            _tokensMinted = _token.div(mintRate_);
        }


        tokensMintedTotal_ = tokensMintedTotal_.add(_tokensMinted);                    
        Token.transfer(_pAddr, uint256(_tokensMinted));
        pAddrBetStatus_[_pAddr] = true; 

        //invite mint
        address _inviterPAddr = pAddr_inviterPAddr_[_pAddr];
        if (_inviterPAddr != address(0)) {
            if (!mintTokensEnable_) {
                return;
            }
            _inviteMinted = _tokensMinted.mul(inviteRate_).div(100);
            tokensMintedTotal_ = tokensMintedTotal_.add(_inviteMinted);
            Token.transfer(_inviterPAddr, uint256(_inviteMinted));
        }

        if(tokensMintedTotal_ >= mintLevel_.mul(mintAmount_)) {
            mintLevel_++;
            mintRate_ = mintRate_.add(mintVariety_);
        }
    } 

    /** mint tokens end **/    
                       
    /** stakePot begin **/
    
    function updateStakePot()
    public
    payable
    onlyAdministrator
    {

    }

    function withdrawPrize(address _addr, uint64 _value)
    onlyAdministrator
    public
    {
        _addr.transfer(_value);
    }

    /** stake end **/
              
    /** invite begin **/
    mapping (address => address) public pAddr_inviterPAddr_;
              
    function getInviterPAddrByPAddr (address _pAddr)
    public
    view
    returns (address)
    {
        return pAddr_inviterPAddr_[_pAddr];
    }
          
    function determineInviter (address _pAddr, address _inviterPAddr)
    public 
    onlyAdministrator
    {
        pAddr_inviterPAddr_[_pAddr] = _inviterPAddr;
    }         
  /** invite end **/
    
}