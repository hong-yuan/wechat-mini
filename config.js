import { ENV } from './profile.js'

var myHost = ENV.myHost;
var apiHost = ENV.apiHost;
var accountHost = ENV.accountHost;
var ssoHost = ENV.ssoHost;
var domainsApiHost = ENV.domainsApiHost;
var domdnsApiHost = ENV.domdnsApiHost;

var config = {
  service: {
    // General APIs
    order: `${apiHost}/v1/orders`,
    shoppers: `${apiHost}/v1.1/shoppers`,
    productsItem: `${apiHost}/v1/subscriptions`,
    domainsInfo: `${apiHost}/v1/domains`,
    appraisal: `${apiHost}/v1/appraisal/`,
    productGroups: `${apiHost}/v1/subscriptions/productGroups`,
    domainForward: `${apiHost}/v2/customers/$customerId/domains/forwards/`,
    addDNSHosting: `${apiHost}/v2/customers/$customerId/domains/createOffsite`,
    getDomains: `${domainsApiHost}/v1/customers/$customerId/domains/get`,
    getRecords: `${domdnsApiHost}/v1/customers/$customerId/zones/$zone`,
    cancelDNSHosting: `${domdnsApiHost}/v1/customers/$customerId/dnsRecords/cancelDNSHosting`,
    getSslCerts: `${apiHost}/v1/certificates?pageSize=100`,
    getCountries: `${apiHost}/v1/countries?marketid=`,
    getSslCertDetail: `${apiHost}/v1/certificates/`,
    getSslCertActions: `${apiHost}/v1/certificates/$certificateId/actions`,
    getSslCertEmailHistory: `${apiHost}/v1/certificates/$certificateId/email/history`,
    // MYA APIs
    subscriptions: `${accountHost}/platapi/v1/subscriptions`,
    // Auth APIs
    bindAccount: `${ssoHost}/v1/api/idp/social_login/wechatmini/link`,
    unbindAccount: `${ssoHost}/v1/api/idp/social_login/wechatmini/link`,
    login: `${ssoHost}/v1/api/idp/social_login/wechatmini/token`,
    receipt: `${ssoHost}/v1/api/idp/social_login/wechatmini/token`,
    twoFAChallenge: `${ssoHost}/v1/api/idp/my/factors/`,
    setUserPassword: `${ssoHost}/v1/api/idp/my/factors/password`,
    checkTwoFA: `${ssoHost}/v1/api/idp/my/factors`,
    transferJWT: `${ssoHost}/v1/api/token/transfer`,
    checkWechatBinding: `${ssoHost}/v1/api/my/social_login/wechat/user_info`,
    // Our own backend APIs
    removeJWT: `${myHost}/oa/cachedJWT`,
    getReceipt: `${myHost}/oa/api/v1/images/receipt`,
    getDomainCert: `${myHost}/oa/api/v1/images/certificate`,
    getUserAuth: `https://www.godaddycn.com/mp/api/v1/userAuth`,
    httpProxy: `${myHost}/mp/api/v1/httpProxy`,
    addUser: `https://www.godaddycn.com/mp/api/v1/users`,
    addLog: `${myHost}/mp/api/v1/logs`,
    getOpenId: `https://www.godaddycn.com/mp/api/v1/userAuth?code=`,
    manageFavorites: `${myHost}/mp/api/v1/shoppers/$shopperId/domainAppraisals/favorites`,
    saveESMAU: `${myHost}/mp/api/v1/mau`,
    malwareCheck: `https://sitecheck.sucuri.net/api/v3/?scan=`,
    getMalwareSubscriptions: `${myHost}/mp/api/v1/malwareCheck/shoppers/$shopperId/subscriptions`,
    cancelMalwareSubscriptions: `${myHost}/mp/api/v1/malwareCheck/shoppers/$shopperId/subscriptions/$uuid`,
    getMalwareSubscriptionsDetail: `${myHost}/mp/api/v1/malwareCheck/shoppers/$shopperId/subscriptions/$uuid/results`,
    setMalwareSubscriptions: `${myHost}/mp/api/v1/malwareCheck/shoppers/$shopperId/subscriptions`,
    // CCP API
    clickEventCallBack: `https://communications.api.cloud.godaddy.com/v1/track/WECHAT/$communicationId/activities/CLICKED`,
    ssoHost,
    accountHost
  },
  staticData: {
    twoFASuccessCode: 1,
    twoFAWithSMSCode: 2,
    twoFAWithoutSMSCode: 3
  },
  statusHideCode: {
    tip: 1, //control tip img hide or show
    download: 2, //control download bottom hide or show
    errorTip: 3, //
  },
  detailsResponseStatus: {
    detailsResponseSucceed: 1, // order details or domain details response succeed
    detailsResponseFail: 2, // order details or domain details response fail
  },
  toggleDomainLockStatus: {
    pending: 1,
    pending_verification_or_pending_transfer: 2,
    domainsLockFail: 3
  },
  sslCertlExternalId: {
    noSslCertlExternalId: -1,
  },
  throughIconArr: {
    throughIconGreen: 1,
    throughIconOrange: 2
  },
  redirAddPageArr: {
    refreshAccount: true,
    manage: true,
    domainCertificate: true,
    myCenter: true,
    productDetailItem: true,
    myDomainDetails: true,
    manageAutoRenew: true,
    appraisalHome: true,
    myAccountCenter: true,
    manageForwardHome: true,
    dnsManagement: true,
    domainLock: true,
    myOrders: true,
    myProducts: true,
  },
  reLaunchPages: {
    bindAccount: '/pages/accountCenter/myCenter/myCenter',
    receipt: '/pages/receipt/receipt',
    domainCertificate: '/pages/domainCertificate/domainCertificate',
    myCenter: '/pages/accountCenter/myCenter/myCenter',
    myProducts: '/pages/accountCenter/myProducts/myProducts',
    productDetailItem: '/pages/accountCenter/productDetailItem/productDetailItem',
    manageAutoRenew: '/pages/accountCenter/manageAutoRenew/manageAutoRenew',
    myDomainDetails: '/pages/accountCenter/myDomainDetails/myDomainDetails',
    myAccountCenter: '/pages/accountCenter/myAccountCenter/myAccountCenter',
    manage: '/pages/manage/manage',
    appraisalHome: '/pages/appraisalHome/appraisalHome',
    manageForwardHome: '/pages/manageForwardHome/manageForwardHome',
    dnsManagement: '/pages/dnsManagement/dnsManagement',
    domainLock: '/pages/domainLock/domainLock',
    myOrders: '/pages/accountCenter/myOrders/myOrders',
  },
  versionNumber: "v1.10.0",
  staticBackendToken: "eyJhbGciOiAiUlMyNTYiLCAia2lkIjogInBZNFBSU2lXQ1EifQ.eyJqdGkiOiAia242bUVmZ01DQ3pjQWg5dEZVaTFvQT09IiwgImlhdCI6IDE1NTQ2OTM3MjAsICJhdXRoIjogImJhc2ljIiwgInR5cCI6ICJjZXJ0IiwgImZhY3RvcnMiOiB7InBfY2VydCI6IDE1NTQ2OTM3MjB9LCAic2JqIjogeyJvIjogIiIsICJvdSI6ICJEb21haW4gQ29udHJvbCBWYWxpZGF0ZWQiLCAiY24iOiAiY2xpZW50LnBhcnRuZXJzLmRldi1nb2RhZGR5LmNvbSJ9fQ.Adx7nPGKJ4nAcJ9AGlqHNpNbaqARiZxzmUTGH_aGMzEiGmVXtToHf3Ah8vC258OAAGbMbIbVWpjHbviPI8B6a5Ywabs52S3QHOY6RMXoF1b7-__8-drqJlcSa65S52pMCHPmPSxN-neDx76Jc5pFDgbcZ59ANsRkKi8n7CXYKjU"
};

module.exports = config;