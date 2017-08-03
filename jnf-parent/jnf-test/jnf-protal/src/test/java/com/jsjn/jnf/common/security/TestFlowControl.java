package com.jsjn.jnf.common.security;


/**
 * FlowControl的测试类
 * 测试的方法：firstInsert
 * 说明:无
 * 预置条件：无
 * 测试思路：1. 验证向hashtable中根据key插入了一条记录
 * 测试的方法：validateOverFlowForIp
 * 说明:无
 * 预置条件：无
 * 测试思路：1. hashtable中不存在对应的key，会添加key和访问时间到hashtable中，返回true
 *        2. hashtable中key的记录数小于指定记录数，添加到hashtable中，返回true
 *        3. hashtable中的key的记录数大于指定记录数，且最近1分钟内的访问记录数小于指定记录数，添加到hashtable中，返回true
 *        4. hashtable中的key的记录数大于指定记录数，且最近1分钟内的访问记录数大于指定记录数，且没有达到冷却时间，将返回false
 *        5. hashtable中的key的记录数大于指定记录数，且最近1分钟内的访问记录数大于指定记录数，且达到冷却时间，将返回true，同时hashtable中的值会被清空
 * 测试的方法：validateOverFlowForSys
 * 说明:无
 * 预置条件：无
 * 测试思路：1. list中的记录数小于指定记录数，将记录添加到list中，返回true
 *        2. list中的记录数大于指定记录数，且最近1分钟内的访问记录数小于指定记录数，添加到list中，返回true
 *        3. list中的记录数大于指定记录数，且最近1分钟内的访问记录数大于指定记录数，且没有达到冷却时间，将返回false
 *        4. list的记录数大于指定记录数，且最近1分钟内的访问记录数大于指定记录数，且达到冷却时间，将返回true，同时list中的值会被清空
 */
public class TestFlowControl {

}
