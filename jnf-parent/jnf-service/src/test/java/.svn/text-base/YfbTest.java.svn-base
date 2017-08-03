import java.math.BigDecimal;
import java.util.Date;

import org.junit.Assert;
import org.junit.Test;

import com.jsjn.jnf.bean.pojo.integration.SingleWithHoldPojo;
import com.jsjn.jnf.bean.pojo.integration.SingleWithHoldQueryPojo;
import com.jsjn.jnf.bean.pojo.integration.SingleWithHoldResPojo;
import com.jsjn.jnf.integration.bank.impl.YfbSingleWithHoldImpl;
import com.jsjn.panda.util.DateUtil;

public class YfbTest {

	@Test
	public void singleWithHold() {
		YfbSingleWithHoldImpl yfbSingleWithHoldImpl = new YfbSingleWithHoldImpl();

		String merchantNo = "70057166";
		String salerMerchantNo = "70057296";
		String orderNo = DateUtil.format(new Date(), "yyyyMMddHHmmss") + "001";
		String orderTime = DateUtil.format(new Date(), "yyyyMMddHHmmss");
		System.out.println("0、订单号：" + orderNo);
		String amount = "200";
		String goodsType = "380029"; // 商品类型
		String goodsName = "XXXX1";
		String remark = "xxx";
		 String bankCode = "TEST_KJ";
		 String cardHolderName = "黄晓明";
		 String certType = "01";
		 String certNo = "330726196507040016";
		 String mobileNo = "18651661234";
		 String cardNo = "8000000000000000994";
		String expYear = "";
		String expMonth = "";
		String cvv = "";

//		String bankCode = "CMB";
//		String cardHolderName = "马剑";
//		String certType = "01";
//		String certNo = "320104198002030433";
//		String mobileNo = "18951680158";
//		String cardNo = "6225880253398615";

		SingleWithHoldResPojo result = yfbSingleWithHoldImpl.singleWithHold(merchantNo,
				bankCode, orderNo, orderTime, amount, salerMerchantNo,
				goodsType, goodsName, remark, cardHolderName, certType, certNo,
				mobileNo, cardNo, expYear, expMonth, cvv);

		Assert.assertNotNull(result.getTradeCode());

	}

	@Test
	public void singleWithHold2() {
		YfbSingleWithHoldImpl yfbSingleWithHoldImpl = new YfbSingleWithHoldImpl();
		SingleWithHoldPojo pojo = new SingleWithHoldPojo();
		pojo.setAmount(new BigDecimal(2));
//		pojo.setBankCode("CMB");
//		pojo.setCardNo("6225880253398615");
//		pojo.setCustIdNo("320104198002030433");
//		pojo.setCustName("马剑");
//		pojo.setMobile("18951680158");
		

		
		pojo.setBankCode("CMB");
		pojo.setCardNo("6225881252201362");
		pojo.setCustIdNo("421023198612075717");
		pojo.setCustName("刘欣");
		pojo.setMobile("18061675317");
		
		pojo.setTradeTime(DateUtil.format(new Date(), "yyyyMMddHHmmss"));
		pojo.setTradeNo(DateUtil.format(new Date(), "yyyyMMddHHmmss") + "001");
		pojo.setInvestorAccount("70057296");
		SingleWithHoldResPojo res = yfbSingleWithHoldImpl.singleWithHold(pojo);
		System.out.println(res.getTradeCode());
	}

	@Test
	public void query() {
		YfbSingleWithHoldImpl yfbSingleWithHoldImpl = new YfbSingleWithHoldImpl();
		String merchantNo = "70057166";
		String outOrderNo = "20160902154550001";
		String orderTime = "20160902154550";

		SingleWithHoldResPojo resPojo = yfbSingleWithHoldImpl.query(merchantNo, outOrderNo,
				orderTime);
		Assert.assertNotNull(resPojo.getTradeCode());

	}
	
	@Test
	public void query2() {
//[JNLG6ef4eafbbc8c4995a368e50ece653c21] , [DEBUG], 2016-09-08 17:18:45 , 192.168.155.2,
		//com.jsjn.jnf.integration.bank.impl.YfbSingleWithHoldImpl,  JN1609081718453026OofJ|订单编号：20160908171845001 ,订单时间：20160908171845

		
		YfbSingleWithHoldImpl yfbSingleWithHoldImpl = new YfbSingleWithHoldImpl();
		String outOrderNo = "20160909101108001";
		String orderTime = "20160909101108";
		SingleWithHoldQueryPojo pojo = new SingleWithHoldQueryPojo();
		pojo.setTradeTime(orderTime);
		pojo.setTranNo(outOrderNo);
		SingleWithHoldResPojo resPojo = yfbSingleWithHoldImpl.withHoldResultQuery(pojo);
		System.out.println(resPojo.getTradeCode());
		Assert.assertNotNull(resPojo.getTradeCode());

	}
	
	@Test
	public void refundOrder(){
		YfbSingleWithHoldImpl yfbSingleWithHoldImpl = new YfbSingleWithHoldImpl();
		String origOutOrderNo ="20160909114209001";
		String origOrderTime = "20160909114209";
		BigDecimal money = new BigDecimal(2);
		String result = yfbSingleWithHoldImpl.refundOrder(origOutOrderNo, origOrderTime, money);
		System.out.println(result);
		Assert.assertNotNull(result);
	}
}
