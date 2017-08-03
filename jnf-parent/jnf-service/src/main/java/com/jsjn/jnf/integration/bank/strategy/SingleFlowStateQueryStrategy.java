package com.jsjn.jnf.integration.bank.strategy;

import com.jsjn.jnf.bean.bo.bank.SingleFlowStateQueryReqBO;
import com.jsjn.jnf.bean.bo.bank.SingleFlowStateQueryResBO;
import com.jsjn.jnf.integration.bank.SingleFlowStateQueryInterface;

/**
 * 单笔支付流水状态查询    策略类
 * @author yincy
 *
 */
public class SingleFlowStateQueryStrategy {
    private SingleFlowStateQueryInterface impl;
    
    public SingleFlowStateQueryStrategy(SingleFlowStateQueryInterface impl){
    	this.impl = impl;
    }
    
    public SingleFlowStateQueryResBO query(SingleFlowStateQueryReqBO req){
    	return this.impl.singleFlowStateQuery(req);
    }
}
