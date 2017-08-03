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
}

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('app', ['ionic','ionicLazyLoad','ngCordova', 'LocalStorageModule',
    'common', 'remind', 'search.customer','settings','todos','notices',
    'util.repayCalc','util.scanCard','advances','loan','loanCalc','blackList',
    'comprehensiveQry','creditLimit','contacts','myBusiness','myCustomer','custDetail','custSearch','custAdd','custAddCB','custOtherList','entCustDetail','entCustOtherList','custOtherDetail','custEdit','jnappServices'])
.config(['$stateProvider', '$urlRouterProvider','$ionicConfigProvider',
    function ($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
	  
	//ionic 通用配置
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
	    
    //禁止ios下滑动返回手势操作
    $ionicConfigProvider.views.swipeBackEnabled(false);
    //禁用ios下ionic自带的滚动条实现。
    //$ionicConfigProvider.platform.ios.scrolling.jsScrolling(false);

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
        url: '/search/customer/list?custName&custManagerNo&custType&paperType&paperNo&custClass&isBlack&grntFlag&loanFlag&loiFlag',
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
        url: '/util/repayCalc/result?custNo&setlDt',
        templateUrl: 'app/util/repayCalc/result.html',
        controller: 'util.repayCalc.ResultCtrl',
        controllerAs: 'ctrl',
    })
    .state('remind', {
        url: '/remind',
        templateUrl: 'app/remind/entry.html',
        controller: 'remind.EntryCtrl',
        controllerAs: 'ctrl',

    })
    .state('remindTabs', {
        url: '/remind/tabs?messageType&messageName',
        templateUrl: 'app/remind/tabs.html',

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
    })
    .state('bootstrap', {
        url: '/?refState&refParams',
        cache:'false',
        controller: 'BootstrapCtrl',
    })
    .state('main', {
        url: '/main',
        cache:'false', 
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        controllerAs: 'ctrl',
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
    .state('aboutUs',{
        url:'/aboutUs/introduction',
        templateUrl:'app/aboutUs/introduction.html',
    })
    .state('creditLimit',{
        url:'/search/creditLimit',
        templateUrl:'app/search/creditLimit/creditLimitQry.html',
        controller:'creditLimit.paramsCtrl',
        controllerAs:'paramsCtrl',
    })
     .state('creditLimitList',{
        url:'/search/creditLimit/creditLimitList?orgNo&isUseCurOrgNo&custName&'
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
        url:'/search/comprehensiveQry/compQryList?queryDt&custName&contType'+
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
        url:'/todos/list',
        templateUrl:'app/todos/todos.html',
        controller:'TodosQueryAllCtrl',
        controllerAs:'TodosQueryAllCtrl',
    })
    .state('todosAssign',{
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
        url:'/advances/query/list?custName&contNoExt&dtStart&dtEnd&custManagerNo',
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
        url:'/loan/list?custName&custType&txType&txNoAcc&contNoExt&dtStart&dtEnd&custManagerNo',
        templateUrl:'app/search/loan/list/loanList.html',
        controller:'LoanListCtrl',
        controllerAs:'Ctrl',
    })
    .state('singleCustomerLoanInfo',{//单客户
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
    .state('singleDebtLoanInfo',{//单借据
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
    .state('writeBackLoanInfo',{//核销赎回
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
    .state('batchLoanInfo',{//批量
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
    	url:'/util/loanCalc/loanCalcList?bj&rate&limit&type',
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
    	url:'/myBusiness',
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
    	url:'/myBusiness/myBusinessReq?custName&custNo&custManagerNo&phoneNo&contNoExt&'+
    		'busType&status&applAmtFrom&applAmtTo&applDtFrom&applDtTo',
    	templateUrl:'app/myBusiness/myBusinessReq.html',
    	controller:'myBusinessReq.paramsCtrl',
    	controllerAs:'paramsCtrl',
    })
    .state('myBusinessDetail',{
    	url:'/myBusiness/myBusinessDetail?busType&contNoExt&status&custName&phoneNo&custManagerName&applAmt&applDt&flowType&actvDt&custNo&loanNo&params&crdtNo&applSeq',
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
    	url:'/myBusiness/myBusinessLog?flowType&param',
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
    .state('myCustomer',{
        cache:false,
    	url:'/myCustomer?custName&custType&custClass&grntFlag&loanFlag&paperType&paperNo&tmp&custManagerNo',
    	templateUrl:'app/myCustomer/myCustomerList.html',
    	controller:'myCustomer.listCtrl',
    	controllerAs:'listCtrl',
    })
    .state('myCustomerLinkList', {
        url: '/myCustomer/link/list?custNo&editable',
        templateUrl: 'app/myCustomer/link/list.html',
        controller: 'myCustomer.link.ListCtrl',
        controllerAs: 'ctrl',
        cache: false,
    })

    .state('myCustomerLinkView', {
        url: '/myCustomer/link/view?custNo&recId&editable',
        templateUrl: 'app/myCustomer/link/view.html',
        controller: 'myCustomer.link.ViewCtrl',
        controllerAs: 'ctrl',
        cache: false,
    })
    .state('myCustomerLinkAdd', {
        url: '/myCustomer/link/add?custNo',
        templateUrl: 'app/myCustomer/link/add.html',
        controller: 'myCustomer.link.AddCtrl',
        controllerAs: 'ctrl',
        cache: false,
    })
    .state('myCustomerLinkEdit', {
        url: '/myCustomer/link/edit?custNo&recId',
        templateUrl: 'app/myCustomer/link/edit.html',
        controller: 'myCustomer.link.EditCtrl',
        controllerAs: 'ctrl',
        cache: false,
    })
    .state('addPerCust',{
        cache:false,
    	url:'/addPerCust',
    	templateUrl:'app/myCustomer/addPerCust.html',
    	controller:'addPerCustCtrl',
    	controllerAs:'ctrl',
    })
    .state('custDetail',{
        cache:false,
    	url:'/myCustomer/custDetail?custNo&flag&editable&isQry',
    	templateUrl:'app/myCustomer/custDetail.html',
    	controller:'custDetail.paramsCtrl',
    	controllerAs:'paramsCtrl',
    })
    .state('custSearch',{
    	url:'/myCustomer/custSearch',
    	templateUrl:'app/myCustomer/custSearch.html',
    	controller:'custSearch.SearchCtrl',
    	controllerAs:'ctrl',
    })
    .state('custAdd',{
    	url:'/myCustomer/custAdd?oprFlag',
    	templateUrl:'app/myCustomer/add/custAdd.html',
    	controller:'custAdd.AddCtrl',
    	controllerAs:'ctrl',
    })
    .state('custAddCB',{
    	url:'/myCustomer/custAddCB?oprFlag',
    	templateUrl:'app/myCustomer/add/custAddCB.html',
    	controller:'custAddCB.AddCBCtrl',
    	controllerAs:'ctrl',
    })
    .state('custOtherList',{
    	cache:false,
    	url:'/myCustomer/custOtherList?custNo&linkType&actionFlag&custClass&custPaperNo&isQry',
    	templateUrl:'app/myCustomer/custOtherList.html',
    	controller:'custOtherList.listCtrl',
    	controllerAs:'ctrl',
    })
    .state('entCustDetail',{
    	url:'/myCustomer/ent/entCustDetail?custNo&flag&editable&isQry',
    	templateUrl:'app/myCustomer/ent/entCustDetail.html',
    	controller:'entCustDetail.paramsCtrl',
    	controllerAs:'ctrl',
    })
    .state('entCustOtherList',{
        cache:false,
    	url:'/myCustomer/ent/entCustOtherList?custNo&linkType&actionFlag&defFlag',
    	templateUrl:'app/myCustomer/ent/entCustOtherList.html',
    	controller:'custOtherList.listCtrl',
    	controllerAs:'ctrl',
    })
    .state('custOtherDetail',{
    	cache:false,
    	url:'/myCustomer/custOtherDetail?custNo&index&linkType&actionFlag&start&custPaperNo&isQry',
    	templateUrl:'app/myCustomer/custOtherDetail.html',
    	controller:'custOtherDetail.paramsCtrl',
    	controllerAs:'ctrl',
    })
    .state('custEdit',{
        cache:false,
    	url:'/myCustomer/custEdit?custNo&linkType&actionFlag',
    	templateUrl:'app/myCustomer/custEdit.html',
    	controller:'custEdit.paramsCtrl',
    	controllerAs:'ctrl',
    })
    .state('custRelationAdd',{
    	url:'/myCustomer/custRelationAdd?custNo&custPaperNo',
    	templateUrl:'app/myCustomer/custRelationAdd.html',
    	controller:'custRelationAddCtrl',
    	controllerAs:'ctrl',
    })
    .state('custRelationEdit',{
    	url:'/myCustomer/custRelationEdit?linkCustNo&custNo&paperNo&custName&phoneNo&custPaperNo',
    	templateUrl:'app/myCustomer/custRelationEdit.html',
    	controller:'custRelationEditCtrl',
    	controllerAs:'ctrl',
    })
    .state('reserveCustomerQuery',{//储备客户查询
        url:'/myCustomer/reserveCustomer/query',
        templateUrl:'app/myCustomer/reserveCustomer/query.html',
        controller:'ReserveCustomerQueryCtrl',
        controllerAs:'Ctrl',
    })
    .state('reserveCustomerList',{//储备客户列表
        cache:false,
        url:'/myCustomer/reserveCustomer/list?phoneNo&custName&status&custManagerNo',
        templateUrl:'app/myCustomer/reserveCustomer/list.html',
        controller:'ReserveCustomerCtrl',
        controllerAs:'Ctrl',
    })
    .state('reserveCustomerDetail',{//储备客户详情
        cache:false,
        url:'/myCustomer/reserveCustomer/detail?custNo',
        templateUrl:'app/myCustomer/reserveCustomer/detail.html',
        controller:'ReserveCustomerDetailCtrl',
        controllerAs:'Ctrl',
    })
    .state('reserveCustomerEvent',{//储备客户事件
        url:'/myCustomer/reserveCustomer/eventList?custNo',
        templateUrl:'app/myCustomer/reserveCustomer/eventList.html',
        controller:'ReserveCustomerEventCtrl',
        controllerAs:'Ctrl',
    })
    .state('reserveCustomerEventDetail',{//储备客户事件详情
        url:'/myCustomer/reserveCustomer/eventDetail?eventId',
        templateUrl:'app/myCustomer/reserveCustomer/eventDetail.html',
        controller:'reserveCustomerEventDetail',
        controllerAs:'Ctrl',
    })
    .state('reserveCustomerAssign',{//储备客户分配历史
        url:'/myCustomer/reserveCustomer/assignList?custNo',
        templateUrl:'app/myCustomer/reserveCustomer/assignList.html',
        controller:'ReserveCustomerAssignCtrl',
        controllerAs:'Ctrl',
    })
    .state('reserveCustomerAdd',{//储备客户新增
        cache:false,
        url:'/myCustomer/reserveCustomer/add',
        templateUrl:'app/myCustomer/reserveCustomer/add.html',
        controller:'ReserveCustomerAddCtrl',
        controllerAs:'Ctrl',
    })
    .state('reserveCustomerEdit',{//储备客户编辑
        cache:false,
        url:'/myCustomer/reserveCustomer/edit?custNo',
        templateUrl:'app/myCustomer/reserveCustomer/edit.html',
        controller:'ReserveCustomerEditCtrl',
        controllerAs:'Ctrl',
    })
    .state('partnerAdd',{//合伙人添加部分
    	cache:false,
    	url:'/myCustomer/partner/addPartner?actionFlag&custNo&linkType',
    	templateUrl:'app/myCustomer/partner/addPartner.html',
    	controller:'partnerAdd.listCtrl',
    	controllerAs:'ctrl',
    })
    .state('partnerEdit',{//合伙人修改部分
    	cache:false,
    	url:'/myCustomer/partner/editPartner?actionFlag&custNo&index&linkType&start',
    	templateUrl:'app/myCustomer/partner/editPartner.html',
    	controller:'partnerEdit.listCtrl',
    	controllerAs:'ctrl',
    })
    .state('scanCardUtil',{//身份证扫描终端
        cache:false,
        url:'/util/scan/view',
        templateUrl:'app/util/scan/view.html',
        controller:'scanCardveiwCtrl',
        controllerAs:'Ctrl',
    });

    $urlRouterProvider.otherwise('/');
}])
.controller('BootstrapCtrl', [
    '$state',
    '$cordovaSplashscreen',
    'jnConstant',
    'jnGesturePwd',
    'jnLoginPopover',
    'jnSetGesturePwdPopover',
    function (
        $state,
        $cordovaSplashscreen,
        jnConstant,
        jnGesturePwd,
        jnLoginPopover,
        jnSetGesturePwdPopover
    ) {
        document.addEventListener('deviceready', function () {
            $cordovaSplashscreen.hide();
        });

        jnLoginPopover.show({
            onClose: function () {
                jnConstant.init();

                $state.go('main', {}, {
                    location: 'replace',
                });

                // 如果没有设置手势密码
                if (! jnGesturePwd.isSet()) {
                    jnSetGesturePwdPopover.show();
                }
            }
        });
    }
])
.run([
    '$rootScope',
    '$state',
    '$ionicPlatform',
    '$window',
    'jnAnalysis',
    'jnPage',
    'jnHelper',
    'jnHttp',
    'jnLoginPopover',
    'jnGestureLoginPopover',
    function (
        $rootScope,
        $state,
        $ionicPlatform,
        $window,
        jnAnalysis,
        jnPage,
        jnHelper,
        jnHttp,
        jnLoginPopover,
        jnGestureLoginPopover
    ) {
        var blurFocused = function () {
            var focused = document.querySelector(':focus');
            if (focused) {
                focused.blur();
            }
        };

        $rootScope.$on('$stateChangeSuccess', function () {
            jnAnalysis.send();
        });

        $ionicPlatform.registerBackButtonAction(function () {
            jnPage.back();
        }, 100);

        (function () {
            var LEAVE_INTERVAL = 60000; // 1 分钟

            var leaveTime = 0;

            $ionicPlatform.on('pause', function () {
                leaveTime = Date.now();
            });

            $ionicPlatform.on('resume', function () {
                var timeout = LEAVE_INTERVAL < Date.now() - leaveTime;
                var noBootstrap = $state.current.name !== 'bootstrap';
                if (noBootstrap && timeout) {
                    // 防止登录页面被键盘等系统控件遮挡
                    blurFocused();

                    // 检查 Session 是否过期
                    jnHttp.request('POST', '/skylark/AuthService.do', {
                        method: 'getAuthedMenu',
                        stationIds: '400',
                        ps: 'index',
                        modId:'mlsp'
                    }).then(
                        function notExpired() {
                            jnGestureLoginPopover.show();
                        }, function expired() {
                            jnLoginPopover.show();
                        }
                    );
                }
            });
        })();

      $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs).
        // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
        // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
        // useful especially with forms, though we would prefer giving the user a little more room
        // to interact with the app.
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
          cordova.plugins.Keyboard.disableScroll(true);
        }

        if (window.StatusBar) {
          // Set the statusbar to use the default style, tweak this to
          // remove the status bar on iOS or change it to use white instead of dark colors.
          StatusBar.styleDefault();
        }
      });
    }]
);

angular.module('common', []);
angular.module('remind', []);
angular.module('search.customer', []);
angular.module('util.repayCalc', []);
angular.module('util.scanCard', []);
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
angular.module('custSearch',[]); 
angular.module('custAdd',[]); 
angular.module('custAddCB',[]); 
angular.module('custOtherList',[]); 
angular.module('entCustDetail',[]); 
angular.module('entCustOtherList',[]); 
angular.module('custOtherDetail',[]); 
angular.module('custEdit',[]); 
