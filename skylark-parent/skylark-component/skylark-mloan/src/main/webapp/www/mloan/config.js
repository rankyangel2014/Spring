if (window.DEV_MODE) {
    angular.module('ngCordova').factory('$cordovaFileTransfer', function () {
        return {};
    });

    angular.module('ngCordova').factory('$cordovaDevice', function () {
        return {
            getPlatform: function () {
                return 'Desktop';
            },
        };
    });

    window.cordova = {
        file: {},
    };
}

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving
// Angular modules
// 'starter' is the name of this angular module example (also set in a <body>
// attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('app', ['ionic','ionicLazyLoad','ngCordova', 'LocalStorageModule', 'jnappServices', 'common', 'remind', 'search.customer','settings','todos','notices', 'util.repayCalc','advances','loan','loanCalc','blackList','comprehensiveQry','creditLimit','contacts','myBusiness','myCustomer','custDetail','custSearch','custOtherList','entCustDetail','custOtherDetail','custEdit','aboutUs','custDetail1','warning','loanApply','tabSlideBox','ion-autocomplete'])

.config(['$stateProvider', '$urlRouterProvider','$ionicConfigProvider', function ($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

	// ionic 通用配置
	$ionicConfigProvider.platform.ios.tabs.style('standard');
	$ionicConfigProvider.platform.android.tabs.style('standard');

	$ionicConfigProvider.platform.ios.tabs.position('bottom');
	$ionicConfigProvider.platform.android.tabs.position('standard');

	$ionicConfigProvider.platform.ios.navBar.alignTitle('center');
	$ionicConfigProvider.platform.android.navBar.alignTitle('center');

 // $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-left');
 // $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-ios-arrow-left');

	$ionicConfigProvider.platform.ios.views.transition('ios');
	$ionicConfigProvider.platform.android.views.transition('android');

    // 禁止ios下滑动返回手势操作
    $ionicConfigProvider.views.swipeBackEnabled(false);
    // 禁用ios下ionic自带的滚动条实现。
    // $ionicConfigProvider.platform.ios.scrolling.jsScrolling(false);

    // $ionicConfigProvider.views.maxCache(0); // 取消缓存

    $stateProvider
    .state('search', {
        url: '/search',
        templateUrl: 'app/search/entry.html',

    })
    .state('searchCustomer', {
        url: '/search/customer',
        templateUrl: 'app/search/customer/search.html',
        controller: 'search.customer.SearchCtrl',
        controllerAs: 'ctrl',

    })
    .state('searchCustomerList', {
        url: '/search/customer/list?deptId&custName&custManagerNo&custType&paperType&paperNo&custClass&isBlack&grntFlag&loanFlag&loiFlag&orgNo',
        templateUrl: 'app/search/customer/list.html',
        controller: 'search.customer.ListCtrl',
        controllerAs: 'ctrl',
    })
    .state('util', {
        url: '/util',
        templateUrl: 'app/util/entry.html',
    })
    .state('utilRepayCalc', {
        url: '/util/repayCalc',
        templateUrl: 'app/util/repayCalc/search.html',
        controller: 'util.repayCalc.SearchCtrl',
        controllerAs: 'ctrl',
    })
    .state('utilRepayCalcList', {
        cache:false,
        url: '/util/repayCalc/list?custName&contNoExt&actvDtFrom&actvDtTo',
        templateUrl: 'app/util/repayCalc/list.html',
        controller: 'util.repayCalc.ListCtrl',
        controllerAs: 'ctrl',
    })
    .state('utilRepayCalcCalc', {
        url: '/util/repayCalc/calc?custNo&loanNo&repayTyp&intStartDt&contNoExt',
        templateUrl: 'app/util/repayCalc/calc.html',
        controller: 'util.repayCalc.CalcCtrl',
        controllerAs: 'ctrl',
    })
    .state('utilRepayCalcResult', {
        url: '/util/repayCalc/result?custNo&loanNo&setlDt&setlTyp&schedAdjTyp&aheadSetlPrcp',
        templateUrl: 'app/util/repayCalc/result.html',
        controller: 'util.repayCalc.ResultCtrl',
        controllerAs: 'ctrl',
    })
    .state('utilRepayCalcPrepay', {
        url: '/util/repayCalc/prepay?loanNo&setlDt&aheadSetlPrcp&schedAdjTyp',
        templateUrl: 'app/util/repayCalc/prepay.html',
        controller: 'util.repayCalc.PrepayCtrl',
        controllerAs: 'ctrl',
    })
    .state('remind', {
        url: '/remind',
        templateUrl: 'app/remind/entry.html',
        controller: 'remind.EntryCtrl',
        controllerAs: 'ctrl',

    })
    .state('remindTabs', {
        url: '/remind/tabs?messageType&messageName?backTo',
        templateUrl: 'app/remind/tabs.html',
        jnVirtual: true,
    })
    .state('remindTabs.unread', {
        url: '/unread?stat',
        views: {
            unread: {
                templateUrl: 'app/remind/list.html',
                controller: 'remind.ListCtrl',
                controllerAs: 'ctrl',
            }
        },
        jnBackTo: 'remind',
    })
    .state('remindTabs.read', {
        url: '/read?stat',
        views: {
            read: {
                templateUrl: 'app/remind/list.html',
                controller: 'remind.ListCtrl',
                controllerAs: 'ctrl',
            }
        },
        jnBackTo: 'remind',
    })
    .state('remindTabs.all', {
        url: '/all?stat',
        views: {
            all: {
                templateUrl: 'app/remind/list.html',
                controller: 'remind.ListCtrl',
                controllerAs: 'ctrl',
            }
        },
        jnBackTo: 'remind',
    })
    .state('main', {
        url: '/main',
        cache:'false',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        controllerAs: 'ctrl',
        jnBackTo: '',
    })
    .state('blackListQry', {
        url: '/search/blackList',
        templateUrl: 'app/search/blackList/blackListQry.html',
        controller: 'blackList.blackListSearchCtrl',
        controllerAs: 'blackListSearchCtrl',

    })
    .state('blackListReq',{
        url:'/search/blackList/blackListReq?blackType&custType&idType&idNo',
        templateUrl:'app/search/blackList/blackListReq.html',
        controller:'blackList.blackListCtrl',
        controllerAs:'blackListCtrl',
    })
    .state('creditLimit',{
        url:'/search/creditLimit',
        templateUrl:'app/search/creditLimit/creditLimitQry.html',
        controller:'creditLimit.paramsCtrl',
        controllerAs:'paramsCtrl',
    })
     .state('creditLimitList',{
        url:'/search/creditLimit/creditLimitList?deptId&orgNo&isUseCurOrgNo&custName&'
            +'custType&contTyp&paperType&paperNo&contNoExt&exapCreAmtFrom&exapCreAmtTo&'
            +'startDtFrom&startDtTo&endDtFrom&endDtTo&custManagerNo',
        templateUrl:'app/search/creditLimit/creditLimitReq.html',
        controller:'creditLimit.creditListCtrl',
        controllerAs:'creditListCtrl',
    })
    .state('creditLimitDetail',{
        url:'/search/creditLimit/creditLimitDetail?crdtNo',
        templateUrl:'app/search/creditLimit/creditLimitDetail.html',
        controller:'creditLimit.creditDetailCtrl',
        controllerAs:'creditDetailCtrl',
    })
    .state('dbxxDetail',{
        url:'/search/creditLimit/dbxxDetail?custNo&contNo&contType&optFlag&applSeq',
        templateUrl:'app/search/creditLimit/dbxxDetail.html',
        controller:'creditLimit.dbxxDetailCtrl',
        controllerAs:'dbxxDetailCtrl',
    })
    .state('symxDetail',{
        url:'/search/creditLimit/symxDetail?crdtNo',
        templateUrl:'app/search/creditLimit/symxDetail.html',
        controller:'creditLimit.symxDetailCtrl',
        controllerAs:'symxDetailCtrl',
    })
    .state('compQry',{
        url:'/search/comprehensiveQry',
        templateUrl:'app/search/comprehensiveQry/compQry.html',
        controller:'compQry.paramsCtrl',
        controllerAs:'paramsCtrl',
    })
    .state('compQryList',{
        url:'/search/comprehensiveQry/compQryList?deptId&queryDt&custName&contType'+
        '&loanGrd&loanPerdFrom&loanPerdTo&intStartDtFrom&intStartDtTo'+
        '&intRateFrom&intRateTo&contNoExt&capitalDirection&loanStatus'+
        '&exapAmtFrom&exapAmtTo&lastDueDtFrom&lastDueDtTo&setlFlg&loanNo'+
        '&prdctCdeName&loanDestorySts&custType&mainGurTyp&compoNo&prdctTyp&custManagerId',
        templateUrl:'app/search/comprehensiveQry/compQryList.html',
        controller:'compQry.listCtrl',
        controllerAs:'compQryListCtrl',
    })
    .state('compQryDetail',{
    	url:'/search/comprehensiveQry/compQryDetail?custNo&loanNo&contType',
    	templateUrl:'app/search/comprehensiveQry/compQryDetail.html',
    	controller:'compQry.DetailCtrl',
    	controllerAs:'compQryDetailCtrl',
    })
    .state('compQryXx',{
        url:'/search/comprehensiveQry/compQryXx?custNo&loanNo',
        templateUrl:'app/search/comprehensiveQry/compQryXx.html',
        controller:'compQry.xxCtrl',
        controllerAs:'compQryxxCtrl',
    })
    .state('compQryDb',{
        url:'/search/comprehensiveQry/compQryDb?custNo&contNo&contType',
        templateUrl:'app/search/comprehensiveQry/compQryDb.html',
        controller:'compQry.dbCtrl',
        controllerAs:'compQrydbCtrl',
    })
    .state('compQryHk',{
        url:'/search/comprehensiveQry/compQryHk?custNo&loanNo',
        templateUrl:'app/search/comprehensiveQry/compQryHk.html',
        controller:'compQry.hkCtrl',
        controllerAs:'compQryhkCtrl',
    })
    .state('todosList',{
        cache:false,
        url:'/todos/list',
        templateUrl:'app/todos/todos.html',
        controller:'TodosQueryAllCtrl',
        controllerAs:'TodosQueryAllCtrl',
        jnBackTo:'main',

    })
    .state('todosAssign',{
        cache:false,
        url:'/todos/assign?operType&pendType&pendName',
        templateUrl:'app/todos/assign/assignList.html',
        controller:'TodosQueryAssignCtrl',
        controllerAs:'Ctrl',
    })
    .state('notices',{
        url:'/notices/list',
        templateUrl:'app/notices/notices.html',
        controller:'NoticesQueryAllCtrl',
        controllerAs:'NoticesQueryAllCtrl',
    })
    .state('noticesAssign',{
        url:'/notices/assign?noticeId',
        templateUrl:'app/notices/assign/assignList.html',
        controller:'NoticesQueryAssignCtrl',
        controllerAs:'NoticesQueryAssignCtrl',
    })
    .state('advances',{
        url:'/advances/query',
        templateUrl:'app/search/advances/advances.html',
        controller:'AdvancesCtrl',
        controllerAs:'Ctrl',
    })
    .state('advancesList',{
        url:'/advances/query/list?deptId&custName&contNoExt&dtStart&dtEnd&custManagerNo',
        templateUrl:'app/search/advances/list/advancesList.html',
        controller:'AdvancesListCtrl',
        controllerAs:'Ctrl',
    })
    .state('advancesDetail',{
        url:'/advances/list/detail?loanNo&contNoExt&custNo&custName&prcpOrig&prcpBal&intRate&prdctDesc&repayTyp&actvDt&intStartDt&lastDueDt&custManagerName&actvOperName&actvReviewName',
        templateUrl:'app/search/advances/list/detail/advancesDetail.html',
        controller:'AdvancesDetailCtrl',
        controllerAs:'Ctrl',
    })
    .state('advancesLoanDetail',{
        url:'/advances/loan/detail?custNo&loanNo',
        templateUrl:'app/search/advances/list/loan/detail/loanDetail.html',
        controller:'AdvancesLoanDetailCtrl',
        controllerAs:'Ctrl',
    })
    .state('advancesLoanInfo',{
        url:'/advances/loan/info?custNo&loanNo',
        templateUrl:'app/search/advances/list/loan/loanInfo.html',
        controller:'AdvancesLoanCtrl',
        controllerAs:'Ctrl',
    })
    .state('advancesRepaymentSchedule',{
        url:'/advances/repayment/schedule?custNo&loanNo',
        templateUrl:'app/search/advances/list/loan/detail/repaymentSchedule.html',
        controller:'RepaymentScheduleCtrl',
        controllerAs:'Ctrl',
    })
    .state('advancesLoanGuarantee',{
        url:'/advances/loan/guarantee?custNo&contNo&contTyp',
        templateUrl:'app/search/advances/list/loan/detail/guaranteeDetail.html',
        controller:'GuaranteeDetailCtrl',
        controllerAs:'Ctrl',
    })
    .state('loan',{
        url:'/loan/query',
        templateUrl:'app/search/loan/loan.html',
        controller:'LoanQueryCtrl',
        controllerAs:'Ctrl',
    })
    .state('loanList',{
        url:'/loan/list?deptId&custName&custType&txType&txNoAcc&contNoExt&dtStart&dtEnd&custManagerNo',
        templateUrl:'app/search/loan/list/loanList.html',
        controller:'LoanListCtrl',
        controllerAs:'Ctrl',
    })
    .state('singleCustomerLoanInfo',{// 单客户
        url:'/loan/list/detail/singleCustomer/loanInfo?crtTxNo&crtDt&custNo',
        templateUrl:'app/search/loan/list/detail/singleCustomer/loanInfo.html',
        controller:'SingleCustomerLoanInfoCtrl',
        controllerAs:'Ctrl',
    })
    .state('singleCustomerBalanceTreatment',{
        url:'/loan/list/detail/singleCustomer/balanceTreatment?crtTxNo&crtDt&custNo',
        templateUrl:'app/search/loan/list/detail/singleCustomer/balanceTreatment.html',
        controller:'SingleCustomerBalanceTreatmentCtrl',
        controllerAs:'Ctrl',
    })
    .state('singleCustomerPaymentRecord',{
        url:'/loan/list/detail/singleCustomer/paymentRecord?crtTxNo&crtDt&custNo',
        templateUrl:'app/search/loan/list/detail/singleCustomer/paymentRecord.html',
        controller:'SingleCustomerPaymentRecordCtrl',
        controllerAs:'Ctrl',
    })
    .state('singleCustomerLoanDetail',{
        url:'/loan/list/detail/singleCustomer/loanDetail?crtTxNo&crtDt&custNo',
        templateUrl:'app/search/loan/list/detail/singleCustomer/loanDetail.html',
        controller:'SingleCustomerLoanDetailCtrl',
        controllerAs:'Ctrl',
    })
    .state('singleDebtLoanInfo',{// 单借据
        url:'/loan/list/detail/singleDebt/loanInfo?crtTxNo&crtDt&custNo&loanNo',
        templateUrl:'app/search/loan/list/detail/singleDebt/loanInfo.html',
        controller:'SingleDebtLoanInfoCtrl',
        controllerAs:'Ctrl',
    })
    .state('singleDebtBalanceTreatment',{
        url:'/loan/list/detail/singleDebt/balanceTreatment?crtTxNo&crtDt&custNo&loanNo',
        templateUrl:'app/search/loan/list/detail/singleDebt/balanceTreatment.html',
        controller:'SingleDebtBalanceTreatmentCtrl',
        controllerAs:'Ctrl',
    })
    .state('singleDebtPaymentRecord',{
        url:'/loan/list/detail/singleDebt/paymentRecord?crtTxNo&crtDt&custNo&loanNo',
        templateUrl:'app/search/loan/list/detail/singleDebt/paymentRecord.html',
        controller:'SingleDebtPaymentRecordCtrl',
        controllerAs:'Ctrl',
    })
    .state('singleDebtLoanDetail',{
        url:'/loan/list/detail/singleDebt/loanDetail?crtTxNo&crtDt&custNo&loanNo',
        templateUrl:'app/search/loan/list/detail/singleDebt/loanDetail.html',
        controller:'SingleDebtLoanDetailCtrl',
        controllerAs:'Ctrl',
    })
    .state('singleDebtLoanDetailInfo',{
        url:'/loan/list/detail/singleDebt/loanDetailInfo?crtTxNo&crtDt&custNo&loanNo',
        templateUrl:'app/search/loan/list/detail/singleDebt/loanDetailInfo.html',
        controller:'SingleDebtLoanDetailInfoCtrl',
        controllerAs:'Ctrl',
    })
    .state('writeBackLoanInfo',{// 核销赎回
        url:'/loan/list/writeBack/loanInfo?crtTxNo&crtDt&loanNo',
        templateUrl:'app/search/loan/list/detail/writeBack/loanInfo.html',
        controller:'WriteBackLoanInfoCtrl',
        controllerAs:'Ctrl',
    })
    .state('writeBackBalanceTreatment',{
        url:'/loan/list/detail/writeBack/balanceTreatment?crtTxNo&crtDt&loanNo',
        templateUrl:'app/search/loan/list/detail/writeBack/balanceTreatment.html',
        controller:'WriteBackBalanceTreatmentCtrl',
        controllerAs:'Ctrl',
    })
    .state('writeBackPaymentRecord',{
        url:'/loan/list/detail/writeBack/paymentRecord?crtTxNo&crtDt&loanNo',
        templateUrl:'app/search/loan/list/detail/writeBack/paymentRecord.html',
        controller:'WriteBackPaymentRecordCtrl',
        controllerAs:'Ctrl',
    })
    .state('writeBackRiskReserve',{
        url:'/loan/list/detail/writeBack/riskReserve?crtTxNo&crtDt&loanNo',
        templateUrl:'app/search/loan/list/detail/writeBack/riskReserve.html',
        controller:'WriteBackRiskReserveCtrl',
        controllerAs:'Ctrl',
    })
    .state('batchLoanInfo',{// 批量
        url:'/loan/list/batch/loanInfo?crtTxNo&crtDt&custNo&loanNo',
        templateUrl:'app/search/loan/list/detail/batch/loanInfo.html',
        controller:'BatchLoanInfoCtrl',
        controllerAs:'Ctrl',
    })
    .state('loanCalc',{
    	url:'/util/loanCalc',
    	templateUrl:'app/util/loanCalc/loanCalcQry.html',
    	controller:'loanCalcCtrl',
    	controllerAs:'loanCalcCtrl',
    })
    .state('loanCalcList',{
    	url:'/util/loanCalc/loanCalcList?intRate&exapAmt&intStartDt&lastDueDt&fstPaymDt&dueDay&repayTyp&rateType&balloonPerdAmt',
    	templateUrl:'app/util/loanCalc/loanCalcList.html',
    	controller:'loanCalc.ListCtrl',
    	controllerAs:'loanCalcListCtrl',
    })
    .state('contacts', {
        url: '/contacts',
        templateUrl: 'app/contacts/list.html',
        controller: 'ContactsListCtrl',
        controllerAs: 'Ctrl',
    })
    .state('contactsView', {
        url: '/contacts/view?head&name&gender&birthday&title&mobile&groupNo&phoneNo&email&weiChatId&qq',
        templateUrl: 'app/contacts/view.html',
        controller: 'ContactsViewCtrl',
        controllerAs: 'Ctrl',
    })
    .state('myBusiness',{
    	url:'/myBusiness?ref&custManagerNo&deptId&custName&custNo&phoneNo&contNoExt&contTyp&status&applAmtFrom&applAmtTo&applDtFrom&applDtTo&loanNo&custType',
    	templateUrl:'app/myBusiness/myBusinessList.html',
    	controller:'myBusiness.ListCtrl',
    	controllerAs:'myBusinessListCtrl',
    })
    .state('myBusinessQry',{
    	url:'/myBusiness/myBusinessQry',
    	templateUrl:'app/myBusiness/myBusinessQry.html',
    	controller:'myBusinessQry.paramsCtrl',
    	controllerAs:'paramsCtrl',
    })
    .state('myBusinessReq',{
    	url:'/myBusiness/myBusinessReq?custManagerNo&deptId&custName&custNo&phoneNo&contNoExt&contTyp&status&applAmtFrom&applAmtTo&applDtFrom&applDtTo&loanNo&custType',
    	templateUrl:'app/myBusiness/myBusinessReq.html',
    	controller:'myBusinessReq.paramsCtrl',
    	controllerAs:'paramsCtrl',
    })
    .state('myBusinessDetail',{
        cache:false,
    	url:'/myBusiness/myBusinessDetail?custNo&custName&custType&loanNo&contTypId&contTyp&applAmt&crdtNo&custManagerNo',
    	templateUrl:'app/myBusiness/myBusinessDetail.html',
    	controller:'myBusiness.detailCtrl',
    	controllerAs:'detailCtrl',
    })
    .state('dkxq',{
    	url:'/myBusiness/dkxq?custNo&loanNo',
    	templateUrl:'app/myBusiness/loanDkxq.html',
    	controller:'dkxq.Ctrl',
    	controllerAs:'dkxqCtrl',
    })
    .state('dbxx',{
    	url:'/myBusiness/dbxx?custNo&contNo&contTyp',
    	templateUrl:'app/myBusiness/loanDbxx.html',
    	controller:'dbxx.Ctrl',
    	controllerAs:'dbxxCtrl',
    })
    .state('symx',{
    	url:'/myBusiness/symx?crdtNo',
    	templateUrl:'app/myBusiness/creditSymx.html',
    	controller:'symx.Ctrl',
    	controllerAs:'symxCtrl',
    })
    .state('hkSheet',{
    	url:'/myBusiness/hkSheet?custNo&loanNo',
    	templateUrl:'app/myBusiness/hkSheet.html',
    	controller:'hkSheet.Ctrl',
    	controllerAs:'hkSheetCtrl',
    })
    .state('myBusinessLog',{
    	url:'/myBusiness/myBusinessLog?loanNo&custType&custNo',
    	templateUrl:'app/myBusiness/myBusinessLog.html',
    	controller:'myBusiness.logCtrl',
    	controllerAs:'logCtrl',
    })
    .state('creditDbxx',{
    	url:'/myBusiness/creditDbxx?custNo&contNo&contTyp&status&optFlag&applSeq',
    	templateUrl:'app/myBusiness/creditDbxx.html',
    	controller:'creditDbxx.Ctrl',
    	controllerAs:'creditDbxxCtrl',
    })
    .state('myBusinessTrial',{
        url:'/myBusiness/trial',
        templateUrl:'app/myBusiness/trial/trial.html',
        controller:'myBusiness.TrialCtrl',
        controllerAs:'ctrl',
        cache: false,
    })
    .state('myCustomer',{
    	cache:false,
    	url:'/myCustomer?deptId&custManagerNo&custName&paperType&paperNo&adTypeId&userId&asgnStatus&custType&custClass&phoneNo&setlFlag',
    	templateUrl:'app/myCustomer/valid/myCustomerList.html',
    	controller:'myCustomer.listCtrl',
    	controllerAs:'listCtrl',
        jnBackTo: 'main',
    })
    .state('custDetail',{
    	url:'/myCustomer/valid/per/custDetail?custNo&custType&custManagerNo&isDetail&from&asgnStatus',
    	templateUrl:'app/myCustomer/valid/per/custDetail.html',
    	controller:'custDetail.paramsCtrl',
    	controllerAs:'paramsCtrl',
        cache:false,
    })
    .state('custSearch',{
    	url:'/myCustomer/custSearch',
    	templateUrl:'app/myCustomer/valid/custSearch.html',
    	controller:'custSearch.SearchCtrl',
    	controllerAs:'ctrl',
        cache:false,
    })
    .state('custOtherList',{
    	cache:false,
    	url:'/myCustomer/valid/per/custOtherList?custNo&operType&actionFlag&custType&qCustNo&orgNo&isDetail&entCustNo',
    	templateUrl:'app/myCustomer/valid/per/custOtherList.html',
    	controller:'custOtherList.listCtrl',
    	controllerAs:'ctrl',
    })
    .state('entCustDetail',{
    	url:'/myCustomer/valid/ent/entCustDetail?custNo&custType&custManagerNo&isDetail&from&asgnStatus',
    	templateUrl:'app/myCustomer/valid/ent/entCustDetail.html',
    	controller:'entCustDetail.paramsCtrl',
    	controllerAs:'ctrl',
    })
    .state('entCustImportantTarget',{
    	url:'/myCustomer/valid/ent/detailInfo/importantTarget?custNo&operType',
    	templateUrl:'app/myCustomer/valid/ent/detailInfo/importantTarget.html',
    	controller:'importantTarget.Ctrl',
    	controllerAs:'ctrl',
    })
    .state('entInfoDetail',{
    	url:'/myCustomer/valid/ent/detailInfo/entInfoDetail?custNo&operType&isDetail',
    	templateUrl:'app/myCustomer/valid/ent/detailInfo/enterpriseInfo.html',
    	controller:'entInfoDetail.Ctrl',
    	controllerAs:'ctrl',
        cache:false,
    })
    .state('entContactInfo',{// 我的客户-企业联系人
    	cache:false,
    	url:'/myCustomer/valid/ent/detailInfo/entContactInfo?custNo&operType&isDetail',
    	templateUrl:'app/myCustomer/valid/ent/detailInfo/contactInfo.html',
    	controller:'entContactInfo.Ctrl',
    	controllerAs:'ctrl',
    })
    .state('entPartnerInfo',{// 我的客户-股东信息列表
    	url:'/myCustomer/valid/ent/partner/partnerList?custNo&linkType&orgNo&isDetail',
    	templateUrl:'app/myCustomer/valid/ent/partner/list.html',
    	controller:'entPartnerInfo.Ctrl',
    	controllerAs:'ctrl',
        cache:false,
    })
    .state('entActualControl',{
    	url:'/myCustomer/valid/ent/detailInfo/actualControl?custNo&orgNo&isDetail',
    	templateUrl:'app/myCustomer/valid/ent/detailInfo/actualControlList.html',
    	controller:'entActualControl.Ctrl',
    	controllerAs:'ctrl',
        cache:false,
    })
    .state('entContextControl',{// 企业关联人列表
    	cache:false,
    	url:'/myCustomer/valid/ent/detailInfo/contextControl?custNo&orgNo&isDetail',
    	templateUrl:'app/myCustomer/valid/ent/detailInfo/contextControl.html',
    	controller:'entContextControl.Ctrl',
    	controllerAs:'ctrl',
    })
    .state('custOtherDetail',{
    	cache:false,
    	url:'/myCustomer/valid/per/custOtherDetail?custNo&operType&actionFlag&custType&qCustNo&orgNo&isDetail&index&start&entCustNo&sex',
    	templateUrl:'app/myCustomer/valid/per/custOtherDetail.html',
    	controller:'custOtherDetail.paramsCtrl',
    	controllerAs:'ctrl',
    })
    .state('customer-glr-list',{
        cache: false,
        url: '/myCustomer/valid/per/glr/list?custNo&custType&orgNo&editable',
        templateUrl: 'app/myCustomer/valid/per/glr/list.html',
        controller: 'customer.GLRListCtrl',
        controllerAs: 'ctrl',
    })
    .state('customer-glr-per-view',{
        cache: false,
        url: '/myCustomer/valid/per/glr/perView?pCustNo&custNo&linkType&linkTypeName&editable',
        templateUrl: 'app/myCustomer/valid/per/glr/perView.html',
        controller: 'customer.GLRViewCtrl',
        controllerAs: 'ctrl',
    })
    .state('customer-glr-ent-view',{
        cache: false,
        url: '/myCustomer/valid/per/glr/entView?pCustNo&custNo&linkType&linkTypeName&editable',
        templateUrl: 'app/myCustomer/valid/per/glr/entView.html',
        controller: 'customer.GLRViewCtrl',
        controllerAs: 'ctrl',
    })
    .state('customer-glr-per-add',{
        cache: false,
        url: '/myCustomer/valid/per/glr/perAdd?pCustNo',
        templateUrl: 'app/myCustomer/valid/per/glr/perAdd.html',
        controller: 'customer.GLRPerAddCtrl',
        controllerAs: 'ctrl',
    })
    .state('customer-glr-ent-add',{
        cache: false,
        url: '/myCustomer/valid/per/glr/entAdd?pCustNo',
        templateUrl: 'app/myCustomer/valid/per/glr/entAdd.html',
        controller: 'customer.GLREntAddCtrl',
        controllerAs: 'ctrl',
    })
    .state('customer-glr-per-edit',{
        cache: false,
        url: '/myCustomer/valid/per/glr/perEdit?pCustNo&custNo&linkType',
        templateUrl: 'app/myCustomer/valid/per/glr/perEdit.html',
        controller: 'customer.GLRPerEditCtrl',
        controllerAs: 'ctrl',
    })
    .state('customer-glr-ent-edit',{
        cache: false,
        url: '/myCustomer/valid/per/glr/entEdit?pCustNo&custNo&linkType',
        templateUrl: 'app/myCustomer/valid/per/glr/entEdit.html',
        controller: 'customer.GLREntEditCtrl',
        controllerAs: 'ctrl',
    })
    .state('customer-jjlxr-list',{
        cache: false,
        url: '/myCustomer/valid/per/jjlxr/list?custNo&editable',
        templateUrl: 'app/myCustomer/valid/per/jjlxr/list.html',
        controller: 'customer.JJLXRListCtrl',
        controllerAs: 'ctrl',
    })
    .state('customer-jjlxr-view',{
        cache: false,
        url: '/myCustomer/valid/per/jjlxr/view?pCustNo&custNo&editable',
        templateUrl: 'app/myCustomer/valid/per/jjlxr/view.html',
        controller: 'customer.JJLXRViewCtrl',
        controllerAs: 'ctrl',
    })
    .state('customer-jjlxr-add',{
        cache: false,
        url: '/myCustomer/valid/per/jjlxr/add?pCustNo',
        templateUrl: 'app/myCustomer/valid/per/jjlxr/add.html',
        controller: 'customer.JJLXRAddCtrl',
        controllerAs: 'ctrl',
    })
    .state('customer-jjlxr-edit',{
        cache: false,
        url: '/myCustomer/valid/per/jjlxr/edit?pCustNo&custNo',
        templateUrl: 'app/myCustomer/valid/per/jjlxr/edit.html',
        controller: 'customer.JJLXREditCtrl',
        controllerAs: 'ctrl',
    })
    .state('customer-lxr-list',{
        cache: false,
        url: '/myCustomer/valid/ent/lxr/list?custNo&editable',
        templateUrl: 'app/myCustomer/valid/ent/lxr/list.html',
        controller: 'customer.LXRListCtrl',
        controllerAs: 'ctrl',
    })
    .state('customer-lxr-view',{
        cache: false,
        url: '/myCustomer/valid/ent/lxr/view?pCustNo&custNo&editable',
        templateUrl: 'app/myCustomer/valid/ent/lxr/view.html',
        controller: 'customer.LXRViewCtrl',
        controllerAs: 'ctrl',
    })
    .state('customer-lxr-add',{
        cache: false,
        url: '/myCustomer/valid/ent/lxr/add?pCustNo',
        templateUrl: 'app/myCustomer/valid/ent/lxr/add.html',
        controller: 'customer.LXRAddCtrl',
        controllerAs: 'ctrl',
    })
    .state('customer-lxr-edit',{
        cache: false,
        url: '/myCustomer/valid/ent/lxr/edit?pCustNo&custNo',
        templateUrl: 'app/myCustomer/valid/ent/lxr/edit.html',
        controller: 'customer.LXREditCtrl',
        controllerAs: 'ctrl',
    })
    .state('custEdit',{
    	url:'/myCustomer/custEdit?custNo&linkType&actionFlag',
    	templateUrl:'app/myCustomer/custEdit.html',
    	controller:'custEdit.paramsCtrl',
    	controllerAs:'ctrl',
    })
    .state('custAssign',{// 正式客户移交
        cache:false,
        url:'/myCustomer/valid/custAssign?custNo',
        templateUrl:'app/myCustomer/valid/assign.html',
        controller:'custAssign.paramCtrl',
        controllerAs:'ctrl',
    })
    .state('custAssignHistory',{// 正式客户管户历史
    	cache:false,
    	url:'/myCustomer/valid/custAssignHistory?custNo&custType',
    	templateUrl:'app/myCustomer/valid/assignHistory.html',
    	controller:'custAssignHistory.paramCtrl',
    	controllerAs:'ctrl',
    })
    .state('custOtherAdd',{// 正式客户添加部分
    	cache:false,
    	url:'/myCustomer/valid/per/custOtherAdd?pCustNo&actionFlag&entCustNo&custNo&isDetail',
    	templateUrl:'app/myCustomer/valid/per/custOtherAdd.html',
    	controller:'custOtherAdd.paramCtrl',
    	controllerAs:'ctrl',
    })
     .state('custEntityAdd',{// 正式个人客户--实体信息新增
    	cache:false,
    	url:'/myCustomer/valid/per/custEntityAdd?pCustNo&entCustNo&custNo&isDetail',
    	templateUrl:'app/myCustomer/valid/per/entityInfo/add.html',
    	controller:'custEntityAddCtrl',
    	controllerAs:'ctrl',
    })
     .state('custEntityEdit',{// 正式个人客户--实体信息修改
        cache:false,
        url:'/myCustomer/valid/per/custEntityEdit?pCustNo&entCustNo&custNo&isDetail',
        templateUrl:'app/myCustomer/valid/per/entityInfo/edit.html',
        controller:'custEntityEditCtrl',
        controllerAs:'ctrl',
    })
     .state('custEntityList',{// 正式个人客户--实体信息列表
        cache:false,
        url:'/myCustomer/valid/per/custEntityList?pCustNo&entCustNo&custNo&isDetail',
        templateUrl:'app/myCustomer/valid/per/entityInfo/list.html',
        controller:'custEntityListCtrl',
        controllerAs:'ctrl',
    })
    .state('custEntityView',{// 正式个人客户--实体信息详情
        cache:false,
        url:'/myCustomer/valid/per/custEntityView?pCustNo&entCustNo&custNo&isDetail',
        templateUrl:'app/myCustomer/valid/per/entityInfo/view.html',
        controller:'custEntityViewCtrl',
        controllerAs:'ctrl',
    })
    .state('custActualList',{// 正式企业客户--实际控制人列表
        cache:false,
        url:'/myCustomer/valid/per/custActualList?custNo&orgNo&isDetail',
        templateUrl:'app/myCustomer/valid/ent/actualControl/list.html',
        controller:'custActualListCtrl',
        controllerAs:'ctrl',
    })
    .state('perCustActualView',{// 正式企业客户--实际控制人详情（个人）
        cache:false,
        url:'/myCustomer/valid/per/custActualView?pCustNo&custNo&orgNo&isDetail',
        templateUrl:'app/myCustomer/valid/ent/actualControl/perView.html',
        controller:'perCustActualViewCtrl',
        controllerAs:'ctrl',
    })
    .state('entCustActualView',{// 正式企业客户--实际控制人详情（企业）
        cache:false,
        url:'/myCustomer/valid/per/entCustActualView?pCustNo&custNo&orgNo&isDetail',
        templateUrl:'app/myCustomer/valid/ent/actualControl/entView.html',
        controller:'entCustActualViewCtrl',
        controllerAs:'ctrl',
    })
    .state('perCustActualEdit',{// 正式企业客户--实际控制人修改（个人）
        cache:false,
        url:'/myCustomer/valid/per/perCustActualEdit?pCustNo&custNo&orgNo&isDetail',
        templateUrl:'app/myCustomer/valid/ent/actualControl/perEdit.html',
        controller:'perCustActualEditCtrl',
        controllerAs:'ctrl',
    })
    .state('entCustActualEdit',{// 正式企业客户--实际控制人修改（企业）
        cache:false,
        url:'/myCustomer/valid/per/entCustActualEdit?pCustNo&custNo&orgNo&isDetail',
        templateUrl:'app/myCustomer/valid/ent/actualControl/entEdit.html',
        controller:'entCustActualEditCtrl',
        controllerAs:'ctrl',
    })
    .state('perCustActualAdd',{// 正式企业客户--实际控制人新增（个人）
        cache:false,
        url:'/myCustomer/valid/per/perCustActualAdd?custNo&orgNo&isDetail',
        templateUrl:'app/myCustomer/valid/ent/actualControl/perAdd.html',
        controller:'perCustActualAddCtrl',
        controllerAs:'ctrl',
    })
    .state('entCustActualAdd',{// 正式企业客户--实际控制人新增（企业）
        cache:false,
        url:'/myCustomer/valid/per/entCustActualAdd?custNo&orgNo&isDetail',
        templateUrl:'app/myCustomer/valid/ent/actualControl/entAdd.html',
        controller:'entCustActualAddCtrl',
        controllerAs:'ctrl',
    })
    .state('custOtherEdit',{// 正式客户修改
    	cache:false,
    	url:'/myCustomer/valid/per/custOtherEdit?custNo&operType&actionFlag&custType&qCustNo&orgNo&isDetail&index&start&entCustNo&sex',
    	templateUrl:'app/myCustomer/valid/per/custOtherEdit.html',
    	controller:'custOtherEdit.paramCtrl',
    	controllerAs:'ctrl',
    })
    .state('entDetailEdit',{// 正式客户企业信息修改
    	url:'/myCustomer/valid/ent/edit/entDetailEdit?custNo&isDetail',
    	templateUrl:'app/myCustomer/valid/ent/edit/entDetailEdit.html',
    	controller:'entDetailEdit.paramCtrl',
    	controllerAs:'ctrl',
    })
    .state('partnerPerAdd',{// 股东信息新增(个人)
        url:'/myCustomer/valid/ent/person/add?custNo&pCustNo&custName&paperType&paperNo&phoneNo&custAddr&sharePct&isDetail',
        templateUrl:'app/myCustomer/valid/ent/partner/person/add.html',
        controller:'partnerAdd.paramCtrl',
        controllerAs:'ctrl',
    })
    .state('partnerPerEdit',{// 股东信息修改(个人)
        url:'/myCustomer/valid/ent/person/edit?custNo&pCustNo&custName&paperType&paperNo&phoneNo&custAddr&sharePct&isDetail&custType',
        templateUrl:'app/myCustomer/valid/ent/partner/person/edit.html',
        controller:'partnerEdit.paramCtrl',
        controllerAs:'ctrl',
    })
    .state('partnerPerDetail',{// 股东信息详情(个人)
        url:'/myCustomer/valid/ent/person/detail?pCustNo&custNo&custName&paperType&paperNo&phoneNo&custAddr&sharePct&isDetail&custType&orgNo',
        templateUrl:'app/myCustomer/valid/ent/partner/person/detail.html',
        controller:'partnerDetail.paramCtrl',
        controllerAs:'ctrl',
        cache:false,
    })
    .state('partnerEntAdd',{// 股东信息新增(企业)
        url:'/myCustomer/valid/ent/add?custNo&pCustNo&custName&paperType&paperNo&phoneNo&custAddr&sharePct&isDetail',
        templateUrl:'app/myCustomer/valid/ent/partner/enterprise/add.html',
        controller:'partnerAdd.paramCtrl',
        controllerAs:'ctrl',
    })
    .state('partnerEntEdit',{// 股东信息修改(企业)
    	url:'/myCustomer/valid/ent/edit?custNo&pCustNo&custName&paperType&paperNo&phoneNo&custAddr&sharePct&isDetail&custType',
    	templateUrl:'app/myCustomer/valid/ent/partner/enterprise/edit.html',
    	controller:'partnerEdit.paramCtrl',
    	controllerAs:'ctrl',
    })
    .state('partnerEntDetail',{// 股东信息详情(企业)
    	url:'/myCustomer/valid/ent/detail?pCustNo&custNo&custName&paperType&paperNo&phoneNo&custAddr&sharePct&isDetail&custType&orgNo',
    	templateUrl:'app/myCustomer/valid/ent/partner/enterprise/detail.html',
    	controller:'partnerDetail.paramCtrl',
    	controllerAs:'ctrl',
        cache:false,
    })
    .state('relationPerDetail',{// 关联人信息详情
    	url:'/myCustomer/valid/ent/view/relationPerDetail?custNo&pCustNo&linkType&isDetail&linkTypeName&orgNo',
    	templateUrl:'app/myCustomer/valid/ent/view/relationPerDetail.html',
    	controller:'relationPerDetail.paramCtrl',
    	controllerAs:'ctrl',
        cache:false,
    })
    .state('relationEntDetail',{// 关联人信息详情
    	url:'/myCustomer/valid/ent/view/relationEntDetail?custNo&pCustNo&linkType&isDetail&linkTypeName&orgNo',
    	templateUrl:'app/myCustomer/valid/ent/view/relationEntDetail.html',
    	controller:'relationEntDetail.paramCtrl',
    	controllerAs:'ctrl',
        cache:false,
    })
    .state('relationPerEdit',{// 关联人信息修改
    	url:'/myCustomer/valid/ent/edit/relationPerEdit?custNo&pCustNo&custType&linkType&custName&paperType&paperNo&sharePct&isDetail&orgNo',
    	templateUrl:'app/myCustomer/valid/ent/edit/relationPerEdit.html',
    	controller:'relationPerEdit.paramCtrl',
    	controllerAs:'ctrl',
    })
    .state('relationEntEdit',{// 关联人信息修改
    	url:'/myCustomer/valid/ent/edit/relationEntEdit?custNo&pCustNo&custType&linkType&custName&paperType&paperNo&sharePct&isDetail&orgNo',
    	templateUrl:'app/myCustomer/valid/ent/edit/relationEntEdit.html',
    	controller:'relationEntEdit.paramCtrl',
    	controllerAs:'ctrl',
    })
    .state('relationEntAdd',{// 关联人新增
    	url:'/myCustomer/valid/ent/add/relationEntAdd?custNo&orgNo&isDetail',
    	templateUrl:'app/myCustomer/valid/ent/add/relationEntAdd.html',
    	controller:'relationEntAdd.paramCtrl',
    	controllerAs:'ctrl',
        cache:false,
    })
    .state('relationPerAdd',{// 关联人新增
    	url:'/myCustomer/valid/ent/add/relationPerAdd?custNo&orgNo&isDetail',
    	templateUrl:'app/myCustomer/valid/ent/add/relationPerAdd.html',
    	controller:'relationPerAdd.paramCtrl',
    	controllerAs:'ctrl',
        cache:false,
    })
    .state('controlEdit',{// 控制人信息修改
        cache:false,
    	url:'/myCustomer/valid/ent/edit/controlEdit?custNo&isDetai&orgNo',
    	templateUrl:'app/myCustomer/valid/ent/edit/controlEdit.html',
    	controller:'controlEdit.paramCtrl',
    	controllerAs:'ctrl',
    })
     .state('contactDetail',{// 联系人信息详情
    	url:'/myCustomer/valid/ent/view/contactDetail?custNo&isDetail&index',
    	templateUrl:'app/myCustomer/valid/ent/view/contactDetail.html',
    	controller:'contactDetail.paramCtrl',
    	controllerAs:'ctrl',
        cache:false,
    })
    .state('contactAdd',{// 联系人信息新增
    	url:'/myCustomer/valid/ent/add/contactAdd?custNo&isDetail',
    	templateUrl:'app/myCustomer/valid/ent/add/contactAdd.html',
    	controller:'contactAdd.paramCtrl',
    	controllerAs:'ctrl',
    })
    .state('contactEdit',{// 联系人信息修改
    	url:'/myCustomer/valid/ent/edit/contactEdit?custNo&isDetail&index',
    	templateUrl:'app/myCustomer/valid/ent/edit/contactEdit.html',
    	controller:'contactEdit.paramCtrl',
    	controllerAs:'ctrl',
    })
    .state('blackOperateHistory',{// 黑名单操作历史
    	url:'/myCustomer/valid/blackOperateHistory?custNo&custName',
    	templateUrl:'app/myCustomer/valid/blackOperateHistory.html',
    	controller:'blackOperateHistory.paramCtrl',
    	controllerAs:'ctrl',
    })
    .state('reserveCustomerQuery',{// 储备客户查询
        url:'/myCustomer/reserveCustomer/query',
        templateUrl:'app/myCustomer/reserveCustomer/query.html',
        controller:'ReserveCustomerQueryCtrl',
        controllerAs:'Ctrl',
        cache:false,
    })
    .state('reserveCustomerList',{// 储备客户列表
        cache:false,
        url:'/myCustomer/reserveCustomer/list?custManagerNo&deptId&phoneNo&custName&custType&adTypeId&asgnStatus&fstContactForm&fstContactTo&visitResult',
        templateUrl:'app/myCustomer/reserveCustomer/list.html',
        controller:'ReserveCustomerCtrl',
        controllerAs:'Ctrl',
        jnBackTo: 'main',
    })
    .state('reserveCustomerDetail',{// 储备客户详情
        cache:false,
        url:'/myCustomer/reserveCustomer/detail?custNo&asgnStatus',
        templateUrl:'app/myCustomer/reserveCustomer/detail.html',
        controller:'ReserveCustomerDetailCtrl',
        controllerAs:'Ctrl',
    })
    .state('reserveCustomerAssign',{// 储备客户分配历史
        url:'/myCustomer/reserveCustomer/assignList?custNo',
        templateUrl:'app/myCustomer/reserveCustomer/assignList.html',
        controller:'ReserveCustomerAssignCtrl',
        controllerAs:'Ctrl',
    })
    .state('reserveCustomerAdd',{// 储备客户新增
        cache:false,
        url:'/myCustomer/reserveCustomer/add',
        templateUrl:'app/myCustomer/reserveCustomer/add.html',
        controller:'ReserveCustomerAddCtrl',
        controllerAs:'Ctrl',
    })
    .state('reserveCustomerEdit',{// 储备客户编辑
        cache:false,
        url:'/myCustomer/reserveCustomer/edit?custNo',
        templateUrl:'app/myCustomer/reserveCustomer/edit.html',
        controller:'ReserveCustomerEditCtrl',
        controllerAs:'Ctrl',
    })
    .state('reserveCustomerTransfer',{// 储备客户移交
        cache:false,
        url:'/myCustomer/reserveCustomer/transfer?custNo&custType&todos&custClass',
        templateUrl:'app/myCustomer/reserveCustomer/transfer.html',
        controller:'ReserveCustomerTransferCtrl',
        controllerAs:'Ctrl',
    })
    .state('reserveCustomerReturnVisitList',{// 储备客户回访列表
        cache:false,
        url:'/myCustomer/reserveCustomer/returnVisit?custNo&custManagerName',
        templateUrl:'app/myCustomer/reserveCustomer/returnVisit.html',
        controller:'ReserveCustomerReturnVisitListCtrl',
        controllerAs:'Ctrl',
    })
    .state('reserveCustomerReturnVisitAdd',{// 储备客户回访新增
        url:'/myCustomer/reserveCustomer/returnVisitAdd?custNo&custManagerName',
        templateUrl:'app/myCustomer/reserveCustomer/returnVisitAdd.html',
        controller:'ReserveCustomerReturnVisitAddCtrl',
        controllerAs:'Ctrl',
    })
    .state('reserveCustomerReturnVisitEdit',{// 储备客户回访修改
        url:'/myCustomer/reserveCustomer/returnVisitEdit?custNo&recId&visitType&visitResult&remark&custManagerName',
        templateUrl:'app/myCustomer/reserveCustomer/returnVisitEdit.html',
        controller:'ReserveCustomerReturnVisitEditCtrl',
        controllerAs:'Ctrl',
    })
    .state('reserveCustomerAssignedList',{// 储备客户分配列表
        url:'/myCustomer/reserveCustomer/customerAssignList?custNo&custType&todos&pendId',
        templateUrl:'app/myCustomer/reserveCustomer/customerAssignList.html',
        controller:'ReserveCustomerAssignedListCtrl',
        controllerAs:'Ctrl',
    })
    .state('reserveCustomerTransferList',{// 储备客户移交列表
        url:'/myCustomer/reserveCustomer/tranferList?custNo&custType&todos&pendId',
        templateUrl:'app/myCustomer/reserveCustomer/tranferList.html',
        controller:'ReserveCustomerTransferListCtrl',
        controllerAs:'Ctrl',
    })
    .state('reserveCustomerAssigned',{// 储备客户分配
        url:'/myCustomer/reserveCustomer/customerAssign?custNo&custType&todos',
        templateUrl:'app/myCustomer/customerAssign.html',
        controller:'ReserveCustomerAssignedCtrl',
        controllerAs:'Ctrl',
    })
    // fangzheng
    .state('creditRecordQryResult',{// 贷款申请-征信记录-筛查结果
    	url:'/loanApply/creditRecord?loanNo&custNo&moduleId&isReadOnly',
    	templateUrl:'app/loanApply/creditRecord/qryResult.html',
    	controller:'qryResultCtrl',
    	controllerAs:'Ctrl'
    })
    // fangzheng
    .state('creditRecordQryCount',{// 贷款申请-征信记录-征信查询次数
    	url:'/loanApply/qryCount?loanNo&custNo&type&isReadOnly',
    	templateUrl:'app/loanApply/creditRecord/qryCount.html',
    	controller:'qryCountCtrl',
    	controllerAs:'Ctrl'
    })
    // fangzheng
    .state('investigationSave',{// 贷款申请-综合评价-保存
    	url:'/loanApply/investigationSave?loanNo&custNo&operType&subType0&outlineTmp&details0&subjectTmp&recId&subject',
    	templateUrl:'app/loanApply/investigation/investigationSave.html',
    	controller:'invsetSaveCtrl',
    	controllerAs:'Ctrl'
    })
    .state('aboutUs', {
        url: '/aboutUs/tabs',
        templateUrl: 'app/aboutUs/tabs.html',
        jnVirtual: true,
    })
    .state('aboutUs.company', {
        url: '/company?stat',
        views: {
        	company: {
                templateUrl: 'app/aboutUs/list.html',
                controller: 'aboutUs.ListCtrl',
                controllerAs: 'ctrl',
            }
        },
        jnBackTo: 'main',
    })
    .state('custDetail1',{// 储备客户分配
        cache:false,
    	url:'/myBusiness/apply/custDetail',
    	templateUrl:'app/myBusiness/apply/custDetail.html',
    	controller:'custDetail1.paramsCtrl',
    	controllerAs:'ctrl',
    })
    .state('loanApply',{// 贷款预判审批
        cache:true,
    	url:'/myBusiness/apply/loanApply?loanNo&custNo&eventId',
    	templateUrl:'app/myBusiness/loanApply/loanApply.html',
    	controller:'loanApplyCtrl',
    	controllerAs:'ctrl',
    })
    .state('share', {
        cache:false,
        url:'/share',
        templateUrl:'app/main/share.html',
        controller:'ShareCtrl',
        controllerAs:'ctrl',
    })
    .state('aboutUs.self', {
        url: '/self?stat',
        views: {
            self: {
                templateUrl: 'app/aboutUs/list.html',
                controller: 'aboutUs.ListCtrl',
                controllerAs: 'ctrl',
            }
        },
        jnBackTo: 'main',
    })
    .state('warning', {
        url: '/warning/query',
        templateUrl: 'app/search/warning/warning.html',
        controller: 'warningQueryCtrl',
        controllerAs: 'Ctrl',
    })
    .state('warningList', {
        url: '/warning/list?custManagerNo&deptId&custName&contNoExt&loanNo&overdueDays&dueDate&oper',
        templateUrl: 'app/search/warning/list/warningList.html',
        controller: 'warningListCtrl',
        controllerAs: 'Ctrl',
    })
    .state('loanBaseInfo', {// 贷款基本信息填写
        url: '/loanApply/loanBaseInfo',
        templateUrl: 'app/loanApply/loanBaseInfo.html',
        controller: 'loanBaseInfoCtrl',
        controllerAs: 'loanBaseInfoCtrl',
    })
    .state('loanDetailInfo', {// 贷款详细信息填写
        url: '/loanApply/loanDetailInfo?custNo&loanNo&custType&loanState',
        templateUrl: 'app/loanApply/loanDetailInfo.html',
        resolve: {
            resolveLoanDetailInfo:  function(LoanDetailInfoService, $stateParams){
                return LoanDetailInfoService.getLoanInfo({
                    loanNo: $stateParams.loanNo
                });
            },
        },
        controller: 'loanDetailInfoCtrl',
        controllerAs: 'loanDetailInfoCtrl',
    })
    .state('loanCheck', {// 贷后检查查询页面
        url: '/loanCheck',
        templateUrl: 'app/loanCheck/query.html',
        controller: 'loanCheckQueryCtrl',
        controllerAs: 'ctrl',
    })
    .state('loanCheckList', {// 贷后检查列表页面
        url: '/loanCheck/list?ref&loanNo&custNo&contTyp&loanStatus&custName&applAmt&custManagerNo',
        templateUrl: 'app/loanCheck/list.html',
        controller: 'loanCheckListCtrl',
        controllerAs: 'ctrl',
    })
    /*
	 * .state('loanCheckAdd', {//检查登记新增页面 url:
	 * '/loanCheck/add?loanNo&checkDate&remark&realCheckDate&checkStatus',
	 * templateUrl: 'app/loanCheck/addCheck.html', controller:
	 * 'loanCheckAddCtrl', controllerAs: 'ctrl', })
	 */
    .state('loanCheckDetail', {// 检查登记详情页面
        url: '/loanCheck/detail?loanNo&checkDate',
        templateUrl: 'app/loanCheck/detailCheck.html',
        controller: 'loanCheckDetailCtrl',
        controllerAs: 'ctrl',
    })

    .state('creditLoanApplyAdd', {// 添加用信申请
        url: '/loanApply/creditLoanApplyAdd?custNo&crdtNo&loanNo&custType',
        templateUrl: 'app/loanApply/creditLoanApply/creditLoanApplyAdd.html',
        controller: 'creditLoanApplyAddCtrl',
        cache:false,
        controllerAs: 'ctrl',
    })

    .state('creditLoanApplyView', {// 用信申请详情
        url: '/loanApply/creditLoanApplyView?custNo&crdtNo&loanNo&custType',
        templateUrl: 'app/loanApply/creditLoanApply/creditLoanApplyView.html',
        controller: 'creditLoanApplyViewCtrl',
        cache:false,
        controllerAs: 'ctrl',
    })
    /*
	 * .state('loanApplyCurrLoanView', {//信贷记录当前融资 url:
	 * '/loanApply/loanApplyCurrLoanView?custNo&loanNo&isReadOnly', templateUrl:
	 * 'app/loanApply/loanHisRecord/currLoan.html', controller:
	 * 'loanApplyCurrLoanCtrl', cache:false, controllerAs: 'ctrl', })
	 */
    .state('loanApplyHisLoanView', {// 信贷记录历史融资
        url: '/loanApply/loanApplyHisLoanView?custNo&loanNo&isReadOnly',
        templateUrl: 'app/loanApply/loanHisRecord/hisLoan.html',
        controller: 'loanApplyHisLoanCtrl',
        cache:false,
        controllerAs: 'ctrl',
    })
    /*
	 * .state('loanApplyExtGuarView', {//信贷记录对外担保 url:
	 * '/loanApply/loanApplyExtGuarView?custNo&loanNo&isReadOnly', templateUrl:
	 * 'app/loanApply/loanHisRecord/extGuar.html', controller:
	 * 'loanApplyExtGuarCtrl', cache:false, controllerAs: 'ctrl', })
	 */
    .state('loanApplyCreditInfoView', {// 信贷记录信用卡信息
        url: '/loanApply/loanApplyCreditInfoView?custNo&loanNo&isReadOnly',
        templateUrl: 'app/loanApply/loanHisRecord/creditInfo.html',
        controller: 'loanApplyCreditInfoCtrl',
        cache:false,
        controllerAs: 'ctrl',
    })
    .state('shareMessage', {// 分享
        url: '/shareMessage',
        templateUrl: 'app/search/warning/share/share.html',
        controller: 'shareMessageCtrl',
        controllerAs: 'ctrl',
    })
    .state('personalRelated', {// 【配偶】【法人代表】
        url: '/loanApply/loanDetailInfoViews/personalRelated?custNo&pCustNo&pSex&loanNo&isReadOnly&pageFlag',
        templateUrl: 'app/loanApply/loanDetailInfoViews/personalRelated.html',
        controller: 'personalRelatedCtrl',
        controllerAs: 'personalRelatedCtrl',
    })

    .state('togetherOperator', {// 共同经营者,股东
        url: '/loanApply/loanDetailInfoViews/togetherOperator?custNo&pCustNo&loanNo&equityHis&isReadOnly&pageFlag',
        templateUrl: 'app/loanApply/loanDetailInfoViews/togetherOperator.html',
        controller: 'togetherOperatorCtrl',
        controllerAs: 'togetherOperatorCtrl',
    })

    .state('addRelatedPsn', {// 新增共同经营者,股东,关联人
        url: '/loanApply/loanDetailInfoViews/addRelatedPsn?custNo&pCustNo&pCustType&loanNo&isReadOnly&pageFlag&custType&linkType&shareAmt&sharePct&relationRemark&conditionInfo&equityHis',
        templateUrl: 'app/loanApply/loanDetailInfoViews/addRelatedPsn.html',
        controller: 'addRelatedPsnCtrl',
        controllerAs: 'addRelatedPsnCtrl',
    })

    .state('guaranteeWay', {// 担保方式
        url: '/loanApply/loanDetailInfoViews/guaranteeWay?loanNo&custNo&isReadOnly',
        templateUrl: 'app/loanApply/loanDetailInfoViews/guaranteeWay.html',
        controller: 'guaranteeWayCtrl',
        controllerAs: 'guaranteeWayCtrl',
    })

    .state('loanApplyPopup', {// 贷款审批页面
        url: '/loanApply/apply?custNo&loanNo',
        templateUrl: 'app/loanApply/loanApplyApproved.html',
        controller: 'loanApplyApprovedCtrl',
        controllerAs: 'ctrl',
    })
    ;
}])
.run([
    '$state',
    '$timeout',
    '$ionicPlatform',
    'jnApp',
    'jnHttp',
    'jnHelper',
    'jnLogin',
    'jnLoginPopover',
    'jnGestureLoginPopover',
    'jnStorage',
    'jnConstant', // 需要在此注入以触发初始化代码，勿删
    'jnPush', // 需要在此注入以触发初始化代码，勿删
    'jnAnalysis', // 需要在此注入以触发初始化代码，勿删
    'jnSetGesturePwdPopover', // 需要在此注入以触发初始化代码，勿删
    '$filter',
    function (
        $state,
        $timeout,
        $ionicPlatform,
        jnApp,
        jnHttp,
        jnHelper,
        jnLogin,
        jnLoginPopover,
        jnGestureLoginPopover,
        jnStorage,
        jnConstant,
        jnPush,
        jnAnalysis,
        jnSetGesturePwdPopover,
        $filter
    ) {
    	var messageReaded  = jnStorage.app.get('NOTICE_MESSAGES');
        var showMessage = function (message) {
            if (angular.isDefined(message)) {
                message.buttons.forEach(function (btn, i, buttons) {
                    if (btn.btnType == 'linkBtn') {
                        btn.onTap = function (e) {
                            // 打开外部链接
                            window.openOuterUrl(btn.url, '_system');
                            e.preventDefault();
                        };
                    }
                    else {
                        btn.onTap = function () {
                        };
                    }
                    btn.type = 'button-positive button-clear';
                });

                if(message.version){//升级公告
                	jnHelper.show({
                        title: message.title,
                        template: message.content,
                        buttons: message.buttons,
                    });
                }else{// 信息提示
                	if(!messageReaded || messageReaded.mid != message.mid || messageReaded.content != message.content){
	                    jnHelper.show({
	                        title: message.title,
	                        template: message.content,
	                        buttons: message.buttons,
	                    }).then(function () {
	                        if(message.messageType=='once'){// 已读
	                            jnStorage.app.set('NOTICE_MESSAGES',{mid:message.mid,content:message.content});
	                        }
	                    });
                	}
                    
                }
            }
        };

		jnHttp.post('/skylark/message/getMessage.do', {},{quiet : true,})
		.then(function(rsp) {
			if (rsp && rsp.length > 0) {
				var obj = $filter("orderBy")(rsp, 'order');// 取最高优先级弹出提示
				for ( var i = 0; i < obj.length; i++) {
					var e = obj[i];
					if (e.modId != window.APP_ID) {
						continue;
					}else if (e.version && e.version == window.HTML_VERSION) {
						continue;
					}else if(new Date(e.expireDate) < Date.now()){
						continue;
					}else{
						showMessage(e);
						break;
					}
				}
			}
		});

        (function () {
            var LEAVE_INTERVAL = 60000; // 1 分钟

            var leaveTime = 0;

            var blurFocused = function () {
                var focused = document.querySelector(':focus');
                if (focused) {
                    focused.blur();
                }
            };

            $ionicPlatform.on('pause', function () {
                leaveTime = Date.now();
            });

            $ionicPlatform.on('resume', function () {
                var timeout = LEAVE_INTERVAL < Date.now() - leaveTime;
                var notBootstrap = $state.current.name !== 'bootstrap';

                if (notBootstrap && timeout) {
                    // 防止登录页面被键盘等系统控件遮挡
                    blurFocused();

                    if (jnLogin.isGestureSet()) {
                        jnGestureLoginPopover.open();
                    } else {
                        jnLoginPopover.open();
                    }
                }
            });
        })();

      $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory
		// bar above the keyboard
        // for form inputs).
        // The reason we default this to hidden is that native apps don't
		// usually show an accessory bar, at
        // least on iOS. It's a dead giveaway that an app is using a Web View.
		// However, it's sometimes
        // useful especially with forms, though we would prefer giving the user
		// a little more room
        // to interact with the app.
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
          cordova.plugins.Keyboard.disableScroll(true);
        }

        if (window.StatusBar) {
          // Set the statusbar to use the default style, tweak this to
          // remove the status bar on iOS or change it to use white instead of
			// dark colors.
          StatusBar.styleDefault();
        }
      });
    }]
);

angular.module('common', []);
angular.module('remind', []);
angular.module('search.customer', []);
angular.module('util.repayCalc', []);
angular.module('loanCalc',[]);
angular.module('blackList',[]);
angular.module('comprehensiveQry',[]);
angular.module('creditLimit',[]);
angular.module('settings',[]);
angular.module('todos',[]);
angular.module('advances',[]);
angular.module('loan',[]);
angular.module('notices',[]);
angular.module('contacts',[]);
angular.module('myBusiness',[]);
angular.module('myCustomer',[]);
angular.module('custDetail',[]);
angular.module('custDetail1',[]);

angular.module('custSearch',[]);
angular.module('custOtherList',[]);
angular.module('entCustDetail',[]);
angular.module('custOtherDetail',[]);
angular.module('custEdit',[]);
angular.module('aboutUs',[]);
angular.module('warning',[]);
angular.module('loanApply',[]);// 贷款申请模块
