package com.jsjn.jnf.service.assist;

import static org.junit.Assert.assertEquals;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.jdbc.BadSqlGrammarException;

import com.jsjn.jnf.service.assist.SequenceService;
import com.jsjn.panda.setup.ParseSpring;

/**
 * SequenceServiceImpl的测试类 测试的方法：validate 测试思路：
 * 1. SeqName存在时，能够返回正常值 
 * 2. SeqName不存在时，能够能够抛出异常 
 * 3. SeqName为空时，能够能够抛出异常
 * 
 */
public class TestSequenceServiceImpl {
	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
		System.out.println("global init");
	}

	@AfterClass
	public static void tearDownAfterClass() throws Exception {
		System.out.println("global tearDown");
	}

	@Before
	public void setUp() throws Exception {
		System.out.println("test init");
	}

	@After
	public void tearDown() throws Exception {
		System.out.println("test teardown");
	}

	/**
	 * 测试正常的sequence，能够返回正常值
	 */
	@Test
	public void testGetSeqNormal() {
		ApplicationContext context = ParseSpring.context;
		SequenceService sequenceService = (SequenceService) context.getBean("sequenceServiceImpl");
		int seqNo = Integer.parseInt(sequenceService.getSeq("JNF_SEQ_T1"));
		assertEquals(String.valueOf(seqNo + 1), sequenceService.getSeq("JNF_SEQ_T1"));
	}

	/**
	 * 测试不存在的sequence，能够抛出异常
	 */
	@Test(expected = BadSqlGrammarException.class)
	public void testGetSeqError() {
		ApplicationContext context = ParseSpring.context;
		SequenceService sequenceService = (SequenceService) context.getBean("sequenceServiceImpl");
		sequenceService.getSeq("Null");
	}

	/**
	 * 测试sequence name为空，能够抛出异常
	 */
	@Test(expected = BadSqlGrammarException.class)
	public void testGetSeqNullError() {
		ApplicationContext context = ParseSpring.context;
		SequenceService sequenceService = (SequenceService) context.getBean("sequenceServiceImpl");
		sequenceService.getSeq(null);
	}
}
