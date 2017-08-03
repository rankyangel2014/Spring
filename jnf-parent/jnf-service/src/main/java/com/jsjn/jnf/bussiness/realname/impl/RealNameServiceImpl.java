package com.jsjn.jnf.bussiness.realname.impl;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jsjn.jnf.bean.bo.cardBin.CardBinQueryReqBO;
import com.jsjn.jnf.bean.bo.cardBin.CardBinQueryReqDataBO;
import com.jsjn.jnf.bean.bo.cardBin.CardBinQueryResBO;
import com.jsjn.jnf.bean.bo.cardBin.CardBinQueryResDataBO;
import com.jsjn.jnf.bean.bo.integration.CardBinRspDto;
import com.jsjn.jnf.bean.bo.integration.SocialCreditRspDto;
import com.jsjn.jnf.bean.bo.integration.WhiteListSignReqDto;
import com.jsjn.jnf.bean.bo.integration.WhiteListSignRspDto;
import com.jsjn.jnf.bean.bo.realname.RealNameReqBO;
import com.jsjn.jnf.bean.bo.realname.RealNameResBO;
import com.jsjn.jnf.bean.dto.account.BindCardDto;
import com.jsjn.jnf.bean.dto.member.MemberDto;
import com.jsjn.jnf.bean.dto.member.FeeRealNameDto;
import com.jsjn.jnf.bussiness.realname.RealNameSerivce;
import com.jsjn.jnf.common.config.Global;
import com.jsjn.jnf.common.config.MenuCode;
import com.jsjn.jnf.common.config.ReturnCode;
import com.jsjn.jnf.common.config.TabsConstant;
import com.jsjn.jnf.common.security.Cryptos;
import com.jsjn.jnf.common.utils.IdGen;
import com.jsjn.jnf.common.utils.StringUtils;
import com.jsjn.jnf.common.utils.ValidatorUtil;
import com.jsjn.jnf.integration.interfaces.IntermediateSystem;
import com.jsjn.jnf.integration.realname.CardBinInterface;
import com.jsjn.jnf.integration.realname.RealNameInterface;
import com.jsjn.jnf.service.account.BindCardService;
import com.jsjn.jnf.service.assist.MenuService;
import com.jsjn.jnf.service.assist.ReqXmlService;
import com.jsjn.jnf.service.assist.utils.SequenceUtils;
import com.jsjn.jnf.service.member.MemberService;
import com.jsjn.jnf.service.member.RealNameFlowService;
import com.jsjn.panda.setup.ParseSpring;

@Service
@Transactional(readOnly = true)
public class RealNameServiceImpl implements RealNameSerivce {

	private final static Logger logger = Logger.getLogger(RealNameServiceImpl.class);
	private MemberService ms = (MemberService) ParseSpring.context.getBean("memberServiceImpl");
	private BindCardService bs = (BindCardService) ParseSpring.context.getBean("bindCardServiceImpl");
	private MenuService menu = (MenuService) ParseSpring.context.getBean("menuServiceImpl");
	private RealNameInterface ri = (RealNameInterface) ParseSpring.context.getBean("realNameInterfaceImpl");
	private CardBinInterface ci = (CardBinInterface) ParseSpring.context.getBean("cardBinInterfaceImpl");
	private RealNameFlowService rs = (RealNameFlowService)ParseSpring.context.getBean("realNameFlowServiceImpl");
	private ReqXmlService rxs = (ReqXmlService) ParseSpring.context.getBean("reqXmlServiceImpl");

	@Override
	public RealNameResBO validate(RealNameReqBO req) {
		/**
		 * majian add 2016/3/24 15:16 
		 * 1、使用validation方法对dto进行校验(部分字段进行校验)
		 * 2、不需要判断商户是否合法，因为不合法的商户不会进到这里，在open直接过滤掉,商户权限也在open统一控制 
		 * 3、根据商户号、身份证、姓名、银行卡号 从bindcardservice检查是否已经在系统中绑卡（绑卡状态是有效），如果已绑卡则返回失败“该银行卡已经被绑定！” 
		 * 4、根据cardNo获取卡所在银行，如果银行不在支持范围内，提示“暂不支持xxx银行”
		 *    银行只支持MENU表中 type = REAL_NAME_BANK_LIST 的银行 -->插入数据库flow记录本次操作,状态设置为处理中 
		 * 5、根据商户号、身份证、姓名从memberservice检查是否已存在该用户 
		 * 5.1、如果存在说明用户身份证姓名输入正确，不需要去征信系统检查用户姓名和身份证是否合法 
		 * 5.2、如果不存在调用 集成层creditsysteminteface进行身份证和姓名核实， 如果验证失败则提示“绑定失败，用户信息输入验证失败！” 
		 * 5.3、如果验证通过，调用 memberservice注册该用户信息(写操作),并返回会员id，如果异常提示“系统异常，请联系管理员！” 
		 * 6、记录本次操作token(flow表中要增加一个字段存储token) 
		 * 7、调用集成层 realnameinterface校验四要素是否正确，返回true or false，false="绑定失败，用户信息输入验证失败！" 
		 * --->更新数据库flow记录本次操作，状态设置为验证的结果 
		 * 8、返回out对象，out对象中要对token进行赋值
		 * 注：全程写日志，要写清楚失败原因 注:四要素信息存用户表和日志表时均要加密存储,调用SignUtils.aes方法加密
		 * 
		 * flow状态：0=发起验证请求 1=验证通过已发送验证码 2=验证处理中 3=验证成功 9=异常
		 */
		String custName = req.getReqData().getCustName();
		String idNo = req.getReqData().getIdNo();
		String bankCardNo = req.getReqData().getBankCardNo();
		String mobile = req.getReqData().getMobile();
		String mId = req.getMid();
		
		String token = "";
		String orgNo = "";
		MemberDto memberDto = null;
		String custId = "";
		
		// 插入报文表，防止一次报文多次发送（防直接调用SERVICE层）
		if(!rxs.insertReqXML(req.getXml())){
			logger.error("插入请求报文表失败：" +  req.getXml());
			return returnError(ReturnCode.FAIL_REPEAT_SUBMIT,"请不要重复提交！");
		}

		String[] propertys = { "custName", "idNo", "bankCardNo", "mobile" };
		String errMsg = ValidatorUtil.validpropertys(req.getReqData(), propertys);
		if (!StringUtils.isBlank(errMsg)) {
		    logger.error("请求参数格式有误："+errMsg);
			return returnError(ReturnCode.FAIL_VALIDATE,errMsg);
		}
		try {
			/**
			 * 检查银行卡是否绑定
			 */
			Boolean bcFlag = bs.isBindCard(mId, custName, idNo, bankCardNo);
			if (bcFlag) {
			    logger.error("该银行卡已经被绑定！");
				return returnError(ReturnCode.FAIL_BINDED,"该银行卡已经被绑定！");
			}
			/**
			 * 根据银行卡号查询银行名称
			 */
			CardBinRspDto cardbinObj = ci.query(bankCardNo);
			String bankName = cardbinObj.getBankName();
			String bankCode = cardbinObj.getBankCode();
			String cardKind = cardbinObj.getCardKind();
			if (StringUtils.isBlank(bankName)) {
			    logger.error("卡BIN库未能查询到该卡所对应的银行！");
				return returnError(ReturnCode.FAIL_INVALIDCARD,"卡BIN库未能查询到该卡所对应的银行！");
			}
			if(TabsConstant.CARD_KIND_CREDIT.val().equals(cardKind)){
			    logger.error("不支持信用卡！");
				return returnError(ReturnCode.FAIL_UNSUPPORTCARD,"不支持信用卡！");
			}
			/**
			 * 检查当前用户银行卡是否在我们支持的实名认证列表中
			 */
			boolean isInBankList = menu.inKey(MenuCode.REAL_NAME_BANK_LIST, bankCode);
			if (!isInBankList) {
			    logger.error("实名认证暂不支持该银行！");
				return returnError(ReturnCode.FAIL_UNSUPPORTBANK,"实名认证暂不支持该银行！");
			}
			
			/**
             * 根据mId获取机构码。发送人行征信和4要素查询时用到。 jianglai yige shanghu keneng you duoge touziren,muqianzhiyou yige
             */
            orgNo = ms.findOrgNo(mId);

			/**
			 * 写flow表
			 */
			int flowId = rs.insertFlow(mId, custName, idNo, bankCardNo, mobile, bankName, bankCode,orgNo);
			if (flowId <= 0) {
			    logger.error("插入flow流水表失败！");
				return returnError(ReturnCode.FAIL_DATABASE,"系统繁忙，请稍后！");
			}

			/**
			 * 检测是否已注册会员 如没注册会员，首先校验身份信息，再注册新会员
			 */
			memberDto = ms.findCust(mId, idNo);
			custId = memberDto == null ? "" : memberDto.getCustId();
			if ( memberDto == null) {
			    /**
			     * 用户姓名和身份证必为有效，此处不需要校验
			     */
//				SocialCreditRspDto isResObj = CreditSystem.idValidate(idNo, custName, orgNo);
//				if (!isResObj.getValid()) {
//					return returnError("用户身份证和姓名核实错误");
//				}
				MemberDto member = buildMemberData(mId, custName, idNo, mobile);
				custId = ms.regMember(member);
				if ("".equals(custId)) {
				    logger.error("注册会员失败！");
					return returnError(ReturnCode.FAIL_REGIST,"注册会员失败！");
				}
			}
			
			/**
			 * 创建token,token用于提供给商户，在提交时将token带过来 同时，插入custId
			 */
			token = IdGen.uuid();
			int n = rs.updateToken(token, flowId + "", custId);
			if (n <= 0) {
				logger.error("更新token失败");
				return returnError(ReturnCode.FAIL_DATABASE,"系统繁忙，请稍后！");
			}
			
		} catch (Exception e) {
            logger.error("调用validate接口之前系统异常，realnameservice error ", e);
            return returnError(ReturnCode.FAILBEFORE,"系统繁忙，请稍后！");
        }
		
		try{
			/**
			 * 调用集成层验证&发送短信验证码
			 */
		    SocialCreditRspDto result = ri.validate(custName, idNo, bankCardNo, mobile, orgNo, token,mId);
			if (!result.getValid()) {
				rs.updateStatus(token, TabsConstant.REALNAME_FLOW_STATUS_SENDCODE_FAIL.val(),result.getReturnMsg(),result.getReturnCode());
				logger.error("发送短信验证码失败："+result.getReturnMsg());
				return returnError(ReturnCode.FAIL_BINDERROR,result.getReturnMsg());
			} else {
				rs.updateStatus(token, TabsConstant.REALNAME_FLOW_STATUS_SENDCODE_SUCC.val(),result.getReturnMsg(),result.getReturnCode());
				logger.info("调用集成层，发送短信验证码成功！");
			}
			/**
			 * 如果已经是会员（同一个人，不同手机号，银行卡号注册）
			 */
			if(memberDto != null && !memberDto.getMobile().equals(Cryptos.aesEncrypt(mobile))){
				String mobileTemp = Cryptos.aesEncrypt(mobile);
				memberDto.setMobile(mobileTemp);
				String digestTemp = memberDto.buildDigest();
				int updateMember = ms.updateMobile(custId,mobileTemp,digestTemp);
				if( updateMember < 0 ){
					logger.info("更新会员手机号码失败！");
				}
			}
			return new RealNameResBO(ReturnCode.SUCCESS, token, "实名认证验证成功！");

		} catch (Exception e) {
			logger.error("系统异常，realnameservice error ", e);
			return returnError(ReturnCode.FAIL_AUTH,"四要素认证异常！");
		}

	}

	@Override
	public RealNameResBO submit(RealNameReqBO req) {
		/**
		 * majian add 2016/3/24 20:09 
		 * 1、使用validation方法对dto进行校验(部分字段进行校验) 
		 * 2、update flow set status = 2 where status = 1 and token = token //update，防并发和重复发送，如果update结果==0返回失败 
		 * 2、根据token读取数据库，获取用户第一次填写的信息
		 * 2.1、如果根据token查无结果，返回“token值无效” 
		 * 2.2、如果token数据和上次时长相比超过5分钟（在global定义常量），提示“token有效时间为5分钟，已超时”
		 * 3、根据数据库中查出的4要素对比,不同则提示“两次发送数据不一致” 
		 * 4、调用集成层 realnameinterface 验证验证码是否正确，如果错误，提示“验证码输入错误” 
		 * 5、调用集成层白名单验证接口验证白名单，如果错误，提示“系统异常” 
		 * 6、调用 memberservice 对用户进行实名认证签约，如果错误，提示“系统异常”
		 * 7、如果成功，更新flow表，更改状态为3（验证成功），如果失败，更新flow表状态改为1（允许下次继续发起验证） 
		 * 8、返回最终状态
		 * 
		 */
		String custName = req.getReqData().getCustName();
		String idNo = req.getReqData().getIdNo();
		String bankCardNo = req.getReqData().getBankCardNo();
		String mobile = req.getReqData().getMobile();
		String code = req.getReqData().getCode();
		String token = req.getReqData().getToken();
		String mId = req.getMid();
		String flag = req.getReqData().getFlag();
		
		// 插入报文表，防止一次报文多次发送（防直接调用SERVICE层）
		if(!rxs.insertReqXML(req.getXml())){
			logger.error("插入请求报文表失败" +  req.getXml());
			return returnError(ReturnCode.FAIL_REPEAT_SUBMIT,"请不要重复提交！","","");
		}
		
		String[] propertys = { "custName", "idNo", "bankCardNo", "mobile", "code", "token" };
		String errMsg = ValidatorUtil.validpropertys(req.getReqData(), propertys);
		if (!StringUtils.isBlank(errMsg)) {
		    logger.error("请求参数格式有误："+errMsg);
			return returnError(ReturnCode.FAIL_VALIDATE,errMsg,"","");
		}
		try {
			
			/**
			 * 根据token读取第一次用户输入数据
			 */
			FeeRealNameDto flow = rs.selectByToken(token);
			/**
			 * 如果返回对象为空，说明token无效
			 */
			if (flow == null) {
				logger.error("token值无效");
				return returnError(ReturnCode.FAIL_TOKEN,"TOKEN值无效！","","");
			}
			
			/**
			 * 更新state状态，防止并发和重复提交。
			 */
			int n = rs.updateStateValidating(token);
			if (n <= 0) {
				logger.error("用户重复提交");
				return returnError(ReturnCode.FAIL_REPEAT_SUBMIT,"请不要重复提交！","","");
			}
			
			/**
			 * 如果返回token插入时间，距离现在超过5分钟，则为token超时。
			 */
			String modifyTime = flow.getModified();
			boolean timeFlag = isOverTime(modifyTime, Global.OVERTIME);
			if (!timeFlag) {
				rs.updateStatus(token, TabsConstant.REALNAME_FLOW_STATUS_SENDCODE_SUCC.val(),"","");
				logger.error("token有效期为5分钟，已超时！");
				return returnError(ReturnCode.FAIL_TOKENOVERTIME,"TOKEN有效时间为5分钟，已超时！","","");
			}
			/**
			 * 比较4要素信息是否被篡改
			 */
			String newInput = Cryptos.aesEncrypt(custName) + Cryptos.aesEncrypt(idNo) + Cryptos.aesEncrypt(bankCardNo)
					+ Cryptos.aesEncrypt(mobile);
			String oldInput = flow.getCustName() + flow.getIdNo() + flow.getBankCardNo() + flow.getMobile();
			if (!newInput.equals(oldInput)) {
				rs.updateStatus(token, TabsConstant.REALNAME_FLOW_STATUS_SENDCODE_SUCC.val(),"","");
				logger.error("两次发送数据不一致，数据被篡改！");
				return returnError(ReturnCode.FAIL_DIFFER,"两次发送数据不一致！","","");
			}
			/**
			 * 验证验证码
			 */
			boolean result = ri.submit(custName, idNo, bankCardNo, mobile, code, token);
			if (!result) {
				rs.updateStatus(token, TabsConstant.REALNAME_FLOW_STATUS_SENDCODE_SUCC.val(),"","");
				logger.error("验证码输入错误！");
				return returnError(ReturnCode.FAIL_CODE,"验证码输入错误！","","");
			}
			
			/**
             * 根据mId获取机构码,白名单签约用到
             */
            String orgNo = ms.findOrgNo(mId);
            
            /**
             * 判断是否做代扣签约，根据接口标志判断 0:做代扣，1：不做代扣，""：老数据，不做代扣
             */
            String bankName ="";
            String bankCode ="";
            WhiteListSignRspDto whiteSignDto = new WhiteListSignRspDto();
            if(StringUtils.equals("0", flag)){
                /**
                 * 中间业务平台白名单签约
                 */
                bankName = flow.getBankName();
                bankCode = flow.getBankCode();
                whiteSignDto = addWhitePer(custName, idNo, flow.getCustId(), bankCode, bankName, bankCardNo, mobile,orgNo);
                if (!StringUtils.equals(ReturnCode.SUCCESS, whiteSignDto.getResCode())) {
                    rs.updateStatus(token, TabsConstant.REALNAME_FLOW_STATUS_SENDCODE_SUCC.val(),"","");
                    logger.error("白名单添加失败！");
                    return returnError(ReturnCode.FAIL_WHITELIST,"添加白名单失败！","","");
                }
            }
			
			/**
			 * 签约
			 */
			String custId = flow.getCustId();
			BindCardDto signDto = buildSignDto(custId, mId, bankName, bankCardNo, mobile, custName, idNo,whiteSignDto.getSignNo(),flag);
			boolean isSign = bs.signAgree(signDto);
			if (!isSign) {
			    logger.error("签约失败！签约号为："+whiteSignDto.getSignNo());
				rs.updateStatus(token, TabsConstant.REALNAME_FLOW_STATUS_SENDCODE_SUCC.val(),"","");
				return returnError(ReturnCode.FAIL_SIGN,"系统异常，签约失败！","","");
			} else {
			    logger.error("签约成功！签约号为："+whiteSignDto.getSignNo());
				rs.updateStatus(token, TabsConstant.REALNAME_FLOW_STATUS_VALIDATE_SUCC.val(),"","");
			}
			// 返回custId 和 签约号
			String outMessage = "";
			if(StringUtils.equals("0", flag)){
			    outMessage = "实名认证短信验证成功,已开通代扣签约业务。";
			}else{
			    outMessage = "实名认证短信验证成功,未开通代扣签约业务。";
			}
			return new RealNameResBO(ReturnCode.SUCCESS, signDto.getAid(), custId, outMessage);
		} catch (Exception e) {
			rs.updateStatus(token, TabsConstant.REALNAME_FLOW_STATUS_SENDCODE_SUCC.val(),"","");
			logger.error("系统异常，realnameservice error ", e);
			return returnError(ReturnCode.FAIL,"系统异常！","","");
		}

	}

	/**
	 * 构造一个BindCardDto 类
	 * 
	 * @param mId
	 * @param bankName
	 * @param bankCardNo
	 * @param mobile
	 * @return
	 */
	private BindCardDto buildSignDto(String custId, String mid, String bankName, String bankCardNo, String mobile,
			String custName, String idNo,String signNo,String flag) {
		BindCardDto bind = new BindCardDto();
		String aid = SequenceUtils.getSignAgree(mid);
		bind.setAid(aid);
		bind.setCustId(custId);
		bind.setMId(mid);
		bind.setType(TabsConstant.BIND_CARD_TYPE_RECEIVE.val());// 1=代收 2=代付
		bind.setBankName(bankName);
		bind.setBankCardNo(bankCardNo);
		if(StringUtils.equals("0", flag)){    //flag=0 做代扣
		    bind.setState(TabsConstant.BIND_CARD_STATE_OK.val());//0=未启用 1=正常 2=冻结
		}else{
		    bind.setState(TabsConstant.BIND_CARD_STATE_NOUSE.val());//0=未启用 1=正常 2=冻结
		}
		bind.setMobile(mobile);
		bind.setDigest(bind.buildDigest());
		bind.setCustName(custName);
		bind.setIdNo(idNo);
		bind.setSignNo(signNo);
		return bind;
	}

	/**
	 * 实名认证4要素验证：统一的error处理
	 * 
	 * @param errMsg
	 * @return
	 */
	private RealNameResBO returnError(String errCode,String errMsg) {
		RealNameResBO res = new RealNameResBO(errCode, "", errMsg);
		logger.info(errMsg);
		return res;
	}
	
	/**
	 * 实名认证短信验证：统一的error处理
	 * 
	 * @param errMsg
	 * @return
	 */
	private RealNameResBO returnError(String errCode,String errMsg,String aid,String custId) {
		RealNameResBO res = new RealNameResBO(errCode, aid,custId, errMsg);
		logger.info(errMsg);
		return res;
	}


	/**
	 * 构造一个会员Dto
	 * 
	 * @param mId
	 * @param custName
	 * @param idNo
	 * @param mobile
	 * @return
	 */
	private MemberDto buildMemberData(String mId, String custName, String idNo, String mobile) {
		MemberDto member = new MemberDto();
		member.setIdType(Global.IDTYPE);// 身份证，写死
		member.setIdNo(idNo);
		member.setCustName(custName);
		member.setMobile(mobile);
		member.setMId(mId);
		return member;
	}

	/**
	 * 判断是否超时
	 * 
	 * @param insertTime
	 * @param minute
	 * @return
	 * @throws Exception
	 */
	private boolean isOverTime(String insertTime, int minute) throws Exception {
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date dt1 = df.parse(insertTime);
		Date dt2 = new Date();
		if (dt2.getTime() - dt1.getTime() >= minute * 60000) {
			return false;
		}
		return true;
	}

	/**
	 * 调用增加白名单接口
	 * 
	 * @param dto
	 * @return
	 * @throws IOException
	 */
	private WhiteListSignRspDto addWhitePer(String name, String idNo, String custSignNo, String bankCode, String bankName,
			String accountNo, String phoneNo,String orgNo) throws Exception {
		WhiteListSignReqDto dto = new WhiteListSignReqDto();
		dto.setSignFlag(TabsConstant.WHITELIST_SIGN_IN.val());// 签约标示
		dto.setCustSignNo(custSignNo);// 客户签约号
		dto.setName(name);// 客户姓名
		dto.setBankCode(bankCode);// 开户行行号
		dto.setBankName(bankName);// 开户行名称
		dto.setCardType(TabsConstant.WHITELIST_CARDTYPE_CARD.val());// 卡折标志
		dto.setAccountNo(accountNo);// 持卡人卡号
		dto.setIdType(Global.IDTYPE);// 证件类型
		dto.setIdNo(idNo);// 证件号码
		dto.setPhoneNo(phoneNo);// 联系电话
		dto.setOrgNo(orgNo);
		WhiteListSignRspDto rsp = IntermediateSystem.WhiteListSign(dto);
		return rsp;
	}

	@Override
	public CardBinQueryResBO cardBinQuery(CardBinQueryReqBO dto) {
		CardBinQueryReqDataBO reqDataDto = dto.getReqData();
		
		CardBinQueryResBO resDto = new CardBinQueryResBO();
		CardBinQueryResDataBO resDataDto = new CardBinQueryResDataBO();
		String[] propertys = { "bankCardNo"};
		String errMsg = ValidatorUtil.validpropertys(reqDataDto, propertys);
		if (!StringUtils.isBlank(errMsg)) {
			resDto.setResCode(ReturnCode.FAIL);
			resDto.setResMsg("传入参数不合法！");
			resDto.setResData(resDataDto);
			return resDto;
		}
		
		
		CardBinInterface cardBinInterface = (CardBinInterface) ParseSpring.context.getBean("cardBinInterfaceImpl");
		CardBinRspDto tmpDto = new CardBinRspDto();
		try{
			tmpDto =  cardBinInterface.query(reqDataDto.getBankCardNo());
		}catch(Exception e){
			resDto.setResCode(ReturnCode.FAIL);
			resDto.setResMsg("查询卡BIN失败！");
			resDto.setResData(resDataDto);
			return resDto;
		}
		String cardKind = tmpDto.getCardKind();
		if(StringUtils.equals(TabsConstant.CARD_KIND_DEBIT.val(), cardKind)){
			resDataDto.setBankCode(tmpDto.getBankCode());
			resDataDto.setBankName(tmpDto.getBankName());
			
			resDto.setResCode(ReturnCode.SUCCESS);
			resDto.setResMsg("查询卡BIN成功！");
			resDto.setResData(resDataDto);
			return resDto;
		}else if(StringUtils.equals(TabsConstant.CARD_KIND_CREDIT.val(), cardKind)){
			resDto.setResCode(ReturnCode.FAIL);
			resDto.setResMsg("不支持信用卡！");
			resDto.setResData(resDataDto);
			return resDto;
		}else{
			resDto.setResCode(ReturnCode.FAIL);
			resDto.setResMsg("不支持的银行卡！");
			resDto.setResData(resDataDto);
			return resDto;
		}
		
	}
	
}
