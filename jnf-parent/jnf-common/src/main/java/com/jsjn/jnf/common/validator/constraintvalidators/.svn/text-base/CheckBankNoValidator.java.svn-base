package com.jsjn.jnf.common.validator.constraintvalidators;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import com.jsjn.jnf.common.validator.constraints.CheckBankNo;

public class CheckBankNoValidator implements ConstraintValidator<CheckBankNo,String> {

	@Override
	public void initialize(CheckBankNo constraintAnnotation) {
	}

	@Override
	public boolean isValid(String value, ConstraintValidatorContext context) {
		return checkBankCard(value);
	}
	
	private static boolean checkBankCard(String cardId) {
		if (cardId==null||"".equals(cardId)){
			return false;
		}
		if(cardId.length() > 30){
			return false;
		}
		char bit = getBankCardCheckCode(cardId.substring(0, cardId.length() - 1));
		if (bit == 'N') {
			return false;
		}
		return cardId.charAt(cardId.length() - 1) == bit;
	}

	/**
	 * 从不含校验位的银行卡卡号采用 Luhm 校验算法获得校验位
	 * 
	 * @param nonCheckCodeCardId
	 * @return
	 */
	private static char getBankCardCheckCode(String nonCheckCodeCardId) {
		if (nonCheckCodeCardId == null
				|| nonCheckCodeCardId.trim().length() == 0
				|| !nonCheckCodeCardId.matches("\\d+")) {
			// 如果传的不是数据返回N
			return 'N';
		}
		char[] chs = nonCheckCodeCardId.trim().toCharArray();
		int luhmSum = 0;
		for (int i = chs.length - 1, j = 0; i >= 0; i--, j++) {
			int k = chs[i] - '0';
			if (j % 2 == 0) {
				k *= 2;
				k = k / 10 + k % 10;
			}
			luhmSum += k;
		}
		return (luhmSum % 10 == 0) ? '0' : (char) ((10 - luhmSum % 10) + '0');
	}
}
