import {
  AdminRole,
  DistributorRank,
  Product,
  KycStatus,
  MemberPackageTier,
} from '../types/mlm';

export type AppLanguage = 'lo' | 'en';

export interface TranslationDict {
  langSelectLabel: string;
  navMemberPortal: string;
  navStorefront: string;
  navInventory: string;
  navGenealogy: string;
  navCommissions: string;
  navAdmin: string;
  btnMemberSignInTop: string;
  btnAdminSignIn: string;
  btnControlPanel: string;
  activeOperator: string;
  activeMemberLabel: string;
  roleLabel: string;
  unilevelRatesLabel: string;
  authenticatedAdmin: string;
  signOut: string;
  localSession: string;
  connectGoogleCloud: string;
  kpiStockUnits: string;
  kpiValuation: string;
  kpiTotalSales: string;
  kpiActiveOrders: string;
  kpiCancelled: string;
  kpiNetworkPartners: string;
  kpiActiveAdmins: string;
  kpiCommissionLedger: string;
  kpiPendingTreasury: string;
  unitsLabel: string;
  skusLabel: string;
  partnersLabel: string;
  recordsLabel: string;
  ordersCountLabel: string;
  inStockLabel: string;
  optimalStockLabel: string;
  lowStockBadge: string;
  allFilter: string;
  healthyFilter: string;
  lowStockFilter: string;
  pendingStatus: string;
  paidStatus: string;
  voidedStatus: string;
  fulfilledStatus: string;
  cancelledStatus: string;
  processingStatus: string;
  activeStatus: string;
  suspendedStatus: string;
  levelWord: string;
  genWord: string;
  cancelBtn: string;
  saveProductBtn: string;
  add25StockBtn: string;
  copiedNotice: string;
  // Front-End User Member Sign-In Panel & Member Portal
  memberHeaderKicker: string;
  memberHeaderTitle: string;
  memberHeaderSubtitle: string;
  memberSignInBoxTitle: string;
  tabSignInMode: string;
  tabRegisterMode: string;
  memberSignInByCodeLabel: string;
  memberSignInByCodePlaceholder: string;
  btnMemberCodeLogin: string;
  memberQuickSwitchLabel: string;
  memberSelfEnrollTitle: string;
  memberSelfEnrollSubtitle: string;
  btnMemberSelfEnroll: string;
  memberWelcomeBadge: string;
  memberCodeLabel: string;
  memberRankLabel: string;
  memberReferralLinkLabel: string;
  btnCopyReferral: string;
  memberRankProgressLabel: string;
  memberMaxRankReached: string;
  memberQualifiedActive: string;
  memberNeedsPv: string;
  memberKpiPersonalPv: string;
  memberKpiGroupGv: string;
  memberKpiPendingWallet: string;
  memberKpiTotalEarned: string;
  memberPendingSplitsCount: string;
  memberPaidOutSub: string;
  memberQuickShopTitle: string;
  memberQuickShopSubtitle: string;
  memberSelectProductLabel: string;
  memberFirstTierReferrerLabel: string;
  memberOrderPvLabel: string;
  memberDownlineTitle: string;
  memberDownlineSubtitle: string;
  memberCommissionRateLabel: string;
  memberNoDownlineInTier: string;
  memberSignInAsThisPartner: string;
  memberEarningsHistoryTitle: string;
  memberOrdersHistoryTitle: string;
  memberNoCommissionsYet: string;
  memberNoOrdersYet: string;
  btnShopAsMember: string;
  googleCloudStatusLabel: string;
  googleConnectedBadge: string;
  // Member Dashboard Control Panel (Register -> Sign In -> Package, Bill Order, KYC, Sponsor Referral)
  memberSubTabOverview: string;
  memberSubTabPackage: string;
  memberSubTabBillOrder: string;
  memberSubTabKyc: string;
  memberSubTabReferral: string;
  btnSignOutMember: string;
  memberGateStep1Badge: string;
  memberGateStep2Badge: string;
  lblPhone: string;
  lblUsernameId: string;
  lblPassword: string;
  lblConfirmPassword: string;
  placeholderUsernameId: string;
  placeholderPassword: string;
  memberDemoCredentialHint: string;
  showPasswordBtn: string;
  hidePasswordBtn: string;
  lblNationalId: string;
  lblBankName: string;
  lblBankAccount: string;
  lblKycStatus: string;
  lblActivePackage: string;
  lblDirectUplineSponsor: string;
  pkgSectionTitle: string;
  pkgSectionSubtitle: string;
  btnActivatePackage: string;
  pkgActivatedBadge: string;
  pkgIncludesLabel: string;
  pkgInstantRankLabel: string;
  kycSectionTitle: string;
  kycSectionSubtitle: string;
  btnSubmitKycVerify: string;
  btnAdminVerifyKyc: string;
  billSectionTitle: string;
  billSectionSubtitle: string;
  billInvoiceHeader: string;
  billInvoiceSubheader: string;
  billNoLabel: string;
  billBuyerLabel: string;
  billSponsorCodeLabel: string;
  billProductItemLabel: string;
  billViewReceiptBtn: string;
  referralSectionTitle: string;
  referralSectionSubtitle: string;
  referralMySponsorTitle: string;
  referralDirectEnrollTitle: string;
  btnEnrollUnderMe: string;
  // Admin Control Panel
  adminHeaderKicker: string;
  adminHeaderTitle: string;
  adminHeaderSubtitle: string;
  adminSessionTitle: string;
  adminCloudVerified: string;
  adminSwitchProfile: string;
  adminSignInBoxTitle: string;
  adminTabSignIn: string;
  adminTabRegister: string;
  adminSignInByIdLabel: string;
  adminSignInByIdPlaceholder: string;
  adminPasswordLabel: string;
  adminDemoCredentialHint: string;
  btnAdminLoginSubmit: string;
  btnAdminLockSignOut: string;
  adminLockedNoticeTitle: string;
  adminLockedNoticeSubtitle: string;
  adminCreateUsernameLabel: string;
  adminCreatePasswordLabel: string;
  adminQuickSwitchHint: string;
  subTabOverview: string;
  subTabAdmins: string;
  subTabOrders: string;
  subTabPartners: string;
  subTabTreasury: string;
  subTabPlan: string;
  btnRestockLowSkus: string;
  btnDisburseAllPending: string;
  btnDownloadCsv: string;
  // Section 01 Admins
  sec1Kicker: string;
  sec1Title: string;
  colAdminEmail: string;
  colBackendRole: string;
  colControlScope: string;
  colStatus: string;
  colActions: string;
  btnUseProfile: string;
  formAddAdminTitle: string;
  formAdminName: string;
  formAdminEmail: string;
  formAdminRole: string;
  btnAddAdmin: string;
  // Section 02 Orders
  sec2Kicker: string;
  sec2Title: string;
  linkCreateOrderPos: string;
  colOrderRef: string;
  colCustomerTier: string;
  colProductQty: string;
  colReferrerL1: string;
  colAmount: string;
  colL1L4Split: string;
  btnCancelRestore: string;
  cancelledRestockedLabel: string;
  // Section 03 Partners
  sec3Kicker: string;
  sec3Title: string;
  linkOpenGenealogy: string;
  colPartnerCode: string;
  colTreeGen: string;
  colOverrideRank: string;
  colPvGv: string;
  colPendingWallet: string;
  colPaidOut: string;
  // Section 04 Treasury
  sec4Kicker: string;
  sec4Title: string;
  btnSettleAllPending: string;
  colUnilevelTier: string;
  colBeneficiary: string;
  colOriginatedBy: string;
  colCommission: string;
  btnDisburseNow: string;
  // Section 05 & 06 Plan & Simulator
  sec5Title: string;
  sec5Subtitle: string;
  lblBrandName: string;
  lblCurrency: string;
  lblTagline: string;
  lblMax4LevelPayout: string;
  btnSavePlan: string;
  sec6Title: string;
  sec6Subtitle: string;
  lblFrontlineWidth: string;
  lblAvgOrderPv: string;
  lblMonthlyOrders: string;
  simColLevel: string;
  simColPartners: string;
  simColGroupPv: string;
  simColRate: string;
  simColMonthlyEarnings: string;
  // Storefront
  storeKicker: string;
  storeTitle: string;
  posKicker: string;
  posTitle: string;
  lblPricingTier: string;
  btnRetailCustomer: string;
  btnMemberWholesale: string;
  lblCustomerName: string;
  lblQuantity: string;
  lblReferringPartner: string;
  lblInstantWaterfall: string;
  lblTotalAllocated: string;
  lblTotalOrderAmount: string;
  btnCompleteSale: string;
  // Inventory
  invKicker: string;
  invTitle: string;
  btnAddProduct: string;
  formEditProductTitle: string;
  formNewProductTitle: string;
  lblSkuCode: string;
  lblProductName: string;
  lblCategory: string;
  lblRetailPrice: string;
  lblMemberPrice: string;
  lblPvPoints: string;
  lblStockUnits: string;
  lblAlertLevel: string;
  lblDescription: string;
  lblProductImage: string;
  searchInventoryPlaceholder: string;
  colStockManage: string;
  alertBelowLabel: string;
  // Genealogy
  genKicker: string;
  genTitle: string;
  subtreeFromLabel: string;
  uplineSponsorsLabel: string;
  formEnrollPartnerTitle: string;
  lblPartnerFullName: string;
  lblReferralCode: string;
  lblUplineSponsor: string;
  btnEnrollPartner: string;
  // Commissions
  commKicker: string;
  commTitle: string;
  footerSummary: string;
}

const LO_DICT: TranslationDict = {
  langSelectLabel: 'ພາສາ',
  navMemberPortal: 'ລະບົບສະມາຊິກໜ້າບ້ານ',
  navStorefront: 'ໜ້າຮ້ານ & ຂາຍສິນຄ້າ',
  navInventory: 'ສາງສິນຄ້າ & ສະຕ໊ອກ',
  navGenealogy: 'ຜັງສາຍງານ 4 ຊັ້ນ',
  navCommissions: 'ບັນຊີຄ່າຄອມມິດຊັ່ນ',
  navAdmin: 'ລະບົບຫຼັງບ້ານ',
  btnMemberSignInTop: 'ເຂົ້າລະບົບສະມາຊິກ',
  btnAdminSignIn: 'ເຂົ້າສູ່ລະບົບຜູ້ບໍລິຫານ',
  btnControlPanel: 'ແຜງຄວບຄຸມຫຼັງບ້ານ',
  activeOperator: 'ຜູ້ບໍລິຫານຫຼັງບ້ານ',
  activeMemberLabel: 'ສະມາຊິກໜ້າບ້ານ',
  roleLabel: 'ຕຳແໜ່ງ',
  unilevelRatesLabel: 'ອັດຕາຄອມມິດຊັ່ນ 4 ຊັ້ນ',
  authenticatedAdmin: 'ບັນຊີທີ່ຢືນຢັນແລ້ວ',
  signOut: 'ອອກຈາກລະບົບ',
  localSession: 'ໂໝດທົດລອງໃຊ້ງານ',
  connectGoogleCloud: 'ເຂົ້າສູ່ລະບົບດ້ວຍ Google',
  kpiStockUnits: 'ຈຳນວນສິນຄ້າໃນສາງທັງໝົດ',
  kpiValuation: 'ມູນຄ່າສາງສິນຄ້າ',
  kpiTotalSales: 'ຍອດຂາຍສິນຄ້າລວມທັງໝົດ',
  kpiActiveOrders: 'ບິນສັ່ງຊື້ສຳເລັດ',
  kpiCancelled: 'ຍົກເລີກ',
  kpiNetworkPartners: 'ຕົວແທນຈຳໜ່າຍ 4 ຊັ້ນ',
  kpiActiveAdmins: 'ຜູ້ບໍລິຫານລະບົບຫຼັງບ້ານ',
  kpiCommissionLedger: 'ຄ່າຄອມມິດຊັ່ນລວມ 4 ຊັ້ນ',
  kpiPendingTreasury: 'ລໍຖ້າໂອນຈ່າຍ',
  unitsLabel: 'ໜ່ວຍ',
  skusLabel: 'ລາຍການ',
  partnersLabel: 'ຄົນ',
  recordsLabel: 'ລາຍການ',
  ordersCountLabel: 'ບິນ',
  inStockLabel: 'ມີໃນສາງ',
  optimalStockLabel: 'ພ້ອມສົ່ງ',
  lowStockBadge: 'ສະຕ໊ອກໃກ້ໝົດ',
  allFilter: 'ທັງໝົດ',
  healthyFilter: 'ພ້ອມສົ່ງ',
  lowStockFilter: 'ໃກ້ໝົດ',
  pendingStatus: 'ລໍຖ້າໂອນຈ່າຍ',
  paidStatus: 'ໂອນຈ່າຍແລ້ວ',
  voidedStatus: 'ຍົກເລີກແລ້ວ',
  fulfilledStatus: 'ສຳເລັດແລ້ວ',
  cancelledStatus: 'ຍົກເລີກແລ້ວ',
  processingStatus: 'ກຳລັງດຳເນີນການ',
  activeStatus: 'ປົກກະຕິ',
  suspendedStatus: 'ລະງັບຊົ່ວຄາວ',
  levelWord: 'ຊັ້ນທີ',
  genWord: 'ຊັ້ນ',
  cancelBtn: 'ຍົກເລີກ',
  saveProductBtn: 'ບັນທຶກຂໍ້ມູນສິນຄ້າ',
  add25StockBtn: '+25 ໜ່ວຍ',
  copiedNotice: 'ຄັດລອກລິ້ງແນະນຳແລ້ວ',
  // Member Portal
  memberHeaderKicker: 'PL Skincare Brand · ລະບົບສະມາຊິກ ແລະ ຕົວແທນຈຳໜ່າຍໜ້າບ້ານ',
  memberHeaderTitle: 'ໜ້າເຂົ້າສູ່ລະບົບສະມາຊິກ & ກະດານຕົວແທນຈຳໜ່າຍ',
  memberHeaderSubtitle:
    'ສະມາຊິກ ແລະ ຕົວແທນຈຳໜ່າຍສາມາດເຂົ້າສູ່ລະບົບດ້ວຍລະຫັດສະມາຊິກ ຫຼື ບັນຊີ Google ເພື່ອສັ່ງຊື້ສິນຄ້າລາຄາສະມາຊິກ, ຮັບລິ້ງແນະນຳລູກຄ້າ, ເບິ່ງທີມງານໃຕ້ສາຍງານ 4 ຊັ້ນ ແລະ ກວດສອບເງິນຄ່າຄອມມິດຊັ່ນ.',
  memberSignInBoxTitle: 'ເຂົ້າສູ່ລະບົບສຳລັບສະມາຊິກໜ້າບ້ານ',
  tabSignInMode: 'ເຂົ້າສູ່ລະບົບ',
  tabRegisterMode: 'ສະໝັກສະມາຊິກໃໝ່',
  memberSignInByCodeLabel: 'ຊື່ຜູ້ໃຊ້ / ລະຫັດສະມາຊິກ (Username ID)',
  memberSignInByCodePlaceholder: 'ຕົວຢ່າງ: PL-CLAIRE-L1 ຫຼື dalavanh99',
  btnMemberCodeLogin: 'ເຂົ້າສູ່ລະບົບແຜງຄວບຄຸມສະມາຊິກ',
  memberQuickSwitchLabel: 'ຫຼື ຄລິກເລືອກບັນຊີຕົວຢ່າງເພື່ອປ້ອນ Username & Password ອັດຕະໂນມັດ:',
  memberSelfEnrollTitle: 'ສະໝັກສະມາຊິກ / ຕົວແທນຈຳໜ່າຍໃໝ່ໜ້າບ້ານ',
  memberSelfEnrollSubtitle:
    'ຕັ້ງຊື່ຜູ້ໃຊ້ (Username ID) ແລະ ລະຫັດຜ່ານ (Password) ຂອງທ່ານເອງ ເພື່ອສະໝັກເປັນຕົວແທນ PL Skincare Brand ແລະ ເຂົ້າສູ່ລະບົບແຜງຄວບຄຸມສະມາຊິກ.',
  btnMemberSelfEnroll: 'ຢືນຢັນສະໝັກສະມາຊິກໃໝ່ & ເຂົ້າສູ່ລະບົບ',
  memberWelcomeBadge: 'ບັນຊີສະມາຊິກທີ່ກຳລັງໃຊ້ງານ',
  memberCodeLabel: 'ລະຫັດສະມາຊິກ',
  memberRankLabel: 'ຕຳແໜ່ງ',
  memberReferralLinkLabel: 'ລິ້ງແນະນຳລູກຄ້າ & ສະມາຊິກໃໝ່ຂອງທ່ານ:',
  btnCopyReferral: 'ຄັດລອກລິ້ງແນະນຳ',
  memberRankProgressLabel: 'ຄວາມຄືບໜ້າສູ່ຕຳແໜ່ງຖັດໄປ',
  memberMaxRankReached: 'ຕຳແໜ່ງສູງສຸດແລ້ວ',
  memberQualifiedActive: 'ມີສິດຮັບຄ່າຄອມມິດຊັ່ນຄົບ 4 ຊັ້ນແລ້ວ',
  memberNeedsPv: 'ຕ້ອງການຍອດຂາຍເພີ່ມເພື່ອຮັບຄອມມິດຊັ່ນຄົບ 4 ຊັ້ນ',
  memberKpiPersonalPv: 'ຍອດຂາຍສ່ວນຕົວ',
  memberKpiGroupGv: 'ຍອດຂາຍທີມລວມ 4 ຊັ້ນ',
  memberKpiPendingWallet: 'ຄອມມິດຊັ່ນລໍຖ້າໂອນເຂົ້າບັນຊີ',
  memberKpiTotalEarned: 'ລາຍໄດ້ຄອມມິດຊັ່ນສະສົມທັງໝົດ',
  memberPendingSplitsCount: 'ລາຍການລໍຖ້າໂອນ',
  memberPaidOutSub: 'ໂອນຈ່າຍແລ້ວ',
  memberQuickShopTitle: 'ສັ່ງຊື້ສິນຄ້າລາຄາສະມາຊິກ & ຮັບຄ່າຄອມມິດຊັ່ນ 4 ຊັ້ນທັນທີ',
  memberQuickShopSubtitle:
    'ທຸກບິນທີ່ສັ່ງຊື້ຜ່ານໜ້ານີ້ ລະບົບຈະຜູກລະຫັດຜູ້ແນະນຳຊັ້ນທີ 1 (L1) ແລະ ຄິດໄລ່ເງິນຄ່າຄອມມິດຊັ່ນ 4 ຊັ້ນໂດຍກົງທັນທີ.',
  memberSelectProductLabel: 'ເລືອກສິນຄ້າ PL Skincare Brand',
  memberFirstTierReferrerLabel: 'ຜູ້ຮັບຄອມມິດຊັ່ນຊັ້ນທີ 1 (L1):',
  memberOrderPvLabel: 'ຍອດຄິດໄລ່ຄ່າຄອມມິດຊັ່ນ:',
  memberDownlineTitle: 'ທີມງານໃຕ້ສາຍງານ 4 ຊັ້ນຂອງຂ້ອຍ',
  memberDownlineSubtitle:
    'ເບິ່ງລາຍຊື່ຕົວແທນທີ່ຢູ່ໃຕ້ສາຍງານຂອງທ່ານທັງ 4 ຊັ້ນ ພ້ອມອັດຕາຄ່າຄອມມິດຊັ່ນແຕ່ລະຊັ້ນ (L1 15% · L2 10% · L3 7% · L4 5%).',
  memberCommissionRateLabel: 'ອັດຕາຄອມມິດຊັ່ນ',
  memberNoDownlineInTier: 'ຍັງບໍ່ມີສະມາຊິກໃນຊັ້ນນີ້ຂອງ',
  memberSignInAsThisPartner: 'ເຂົ້າລະບົບບັນຊີນີ້',
  memberEarningsHistoryTitle: 'ປະຫວັດລາຍໄດ້ຄ່າຄອມມິດຊັ່ນຂອງຂ້ອຍ (ຊັ້ນທີ 1–4)',
  memberOrdersHistoryTitle: 'ປະຫວັດບິນສັ່ງຊື້ທີ່ຂ້ອຍແນະນຳ',
  memberNoCommissionsYet: 'ຍັງບໍ່ມີປະຫວັດຄ່າຄອມມິດຊັ່ນສຳລັບ',
  memberNoOrdersYet: 'ຍັງບໍ່ມີບິນສັ່ງຊື້ທີ່ແນະນຳໂດຍ',
  btnShopAsMember: 'ສັ່ງຊື້ໃນລາຄາສະມາຊິກ',
  googleCloudStatusLabel: 'ເຊື່ອມຕໍ່ບັນຊີ Google Cloud:',
  googleConnectedBadge: 'ເຊື່ອມຕໍ່ແລ້ວ',
  memberSubTabOverview: 'ແຜງຄວບຄຸມສະມາຊິກ',
  memberSubTabPackage: '4 ແພັກເກັດ · 4 ຊັ້ນ',
  memberSubTabBillOrder: 'ເປີດບິນສັ່ງຊື້ສິນຄ້າ & ໃບບິນ',
  memberSubTabKyc: 'ຢືນຢັນບັນຊີ KYC',
  memberSubTabReferral: 'ແນະນຳສະມາຊິກສາຍງານ',
  btnSignOutMember: 'ສະຫຼັບບັນຊີ / ລົງທະບຽນໃໝ່',
  memberGateStep1Badge: 'ຂັ້ນຕອນທີ 1: ລົງທະບຽນບັນຊີສະມາຊິກໃໝ່ (ຕັ້ງ Username ID & Password)',
  memberGateStep2Badge: 'ຂັ້ນຕອນທີ 2: ເຂົ້າສູ່ລະບົບແຜງຄວບຄຸມດ້ວຍ Username ID & Password',
  lblPhone: 'ເບີໂທລະສັບ / WhatsApp',
  lblUsernameId: 'ຕັ້ງຊື່ຜູ້ໃຊ້ / ລະຫັດສະມາຊິກ (Username ID)',
  lblPassword: 'ລະຫັດຜ່ານ (Password)',
  lblConfirmPassword: 'ຢືນຢັນລະຫັດຜ່ານ',
  placeholderUsernameId: 'ຕົວຢ່າງ: dalavanh99 ຫຼື PL-DALAVANH',
  placeholderPassword: 'ຕັ້ງລະຫັດຜ່ານຢ່າງໜ້ອຍ 4 ຕົວອັກສອນ',
  memberDemoCredentialHint: 'ລະຫັດຜ່ານຕົວຢ່າງສຳລັບບັນຊີທົດລອງ: 123456',
  showPasswordBtn: 'ສະແດງ',
  hidePasswordBtn: 'ເຊື່ອງ',
  lblNationalId: 'ເລກບັດປະຈຳຕົວ / Passport (KYC)',
  lblBankName: 'ທະນາຄານຮັບເງິນຄ່າຄອມມິດຊັ່ນ',
  lblBankAccount: 'ເລກບັນຊີທະນາຄານ',
  lblKycStatus: 'ສະຖານະບັນຊີ KYC',
  lblActivePackage: 'ແພັກເກັດສະມາຊິກປັດຈຸບັນ',
  lblDirectUplineSponsor: 'ຜູ້ແນະນຳໂດຍກົງ (Sponsor)',
  pkgSectionTitle: '4 ແພັກເກັດ · 4 ຊັ້ນສາຍງານ',
  pkgSectionSubtitle:
    'ເລືອກເປີດບິນ 4 ແພັກເກັດສຳລັບ 4 ຊັ້ນສາຍງານ — ບໍ່ໃຊ້ຄະແນນ PV, ຄິດໄລ່ຈ່າຍເງິນຄ່າຄອມມິດຊັ່ນ 4 ຊັ້ນໂດຍກົງທັນທີ.',
  btnActivatePackage: 'ເປີດແພັກເກັດນີ້ & ຮັບຄອມມິດຊັ່ນ 4 ຊັ້ນ',
  pkgActivatedBadge: 'ແພັກເກັດທີ່ໃຊ້ງານຢູ່',
  pkgIncludesLabel: 'ສິນຄ້າທີ່ໄດ້ຮັບໃນແພັກເກັດ:',
  pkgInstantRankLabel: 'ຮັບຕຳແໜ່ງທັນທີ:',
  kycSectionTitle: 'ຢືນຢັນຕົວຕົນ KYC & ບັນຊີທະນາຄານຮັບຄ່າຄອມມິດຊັ່ນ',
  kycSectionSubtitle:
    'ກະລຸນາປ້ອນຂໍ້ມູນບັດປະຈຳຕົວ ຫຼື ພາສປອດ ແລະ ເລກບັນຊີທະນາຄານ ເພື່ອຢືນຢັນບັນຊີ KYC ສຳລັບການໂອນຈ່າຍເງິນຄອມມິດຊັ່ນ 4 ຊັ້ນ.',
  btnSubmitKycVerify: 'ບັນທຶກ & ຢືນຢັນບັນຊີ KYC ທັນທີ',
  btnAdminVerifyKyc: 'ອະນຸມັດ KYC',
  billSectionTitle: 'ເປີດບິນສັ່ງຊື້ສິນຄ້າ (Order Bill) & ໃບບິນຮັບເງິນ',
  billSectionSubtitle:
    'ສັ່ງຊື້ສິນຄ້າໃນລາຄາສະມາຊິກ ຫຼື ລາຄາຂາຍຍ່ອຍ ພ້ອມອອກໃບບິນ ແລະ ແບ່ງຄ່າຄອມມິດຊັ່ນ 4 ຊັ້ນອັດຕະໂນມັດ.',
  billInvoiceHeader: 'ໃບບິນສັ່ງຊື້ສິນຄ້າ (OFFICIAL ORDER BILL)',
  billInvoiceSubheader: 'PL Skincare Brand · ໃບຢືນຢັນການສັ່ງຊື້ ແລະ ຄ່າຄອມມິດຊັ່ນ 4 ຊັ້ນ',
  billNoLabel: 'ເລກທີໃບບິນ',
  billBuyerLabel: 'ຊື່ຜູ້ຊື້ / ສະມາຊິກ',
  billSponsorCodeLabel: 'ລະຫັດສະມາຊິກຜູ້ແນະນຳ (L1)',
  billProductItemLabel: 'ລາຍການສິນຄ້າ & ຈຳນວນ',
  billViewReceiptBtn: 'ເບິ່ງໃບບິນ',
  referralSectionTitle: 'ລະບົບແນະນຳສະມາຊິກໃໝ່ (Sponsor Referral) & ຜັງສາຍງານ 4 ຊັ້ນ',
  referralSectionSubtitle:
    'ສົ່ງລິ້ງແນະນຳຂອງທ່ານ ຫຼື ລົງທະບຽນສະມາຊິກໃໝ່ຕິດຕົວໂດຍກົງ (ຊັ້ນທີ 1) ເພື່ອຮັບຄ່າຄອມມິດຊັ່ນ 4 ຊັ້ນ.',
  referralMySponsorTitle: 'ຂໍ້ມູນຜູ້ແນະນຳໂດຍກົງ (Upline Sponsor) ຂອງຂ້ອຍ',
  referralDirectEnrollTitle: 'ລົງທະບຽນສະມາຊິກໃໝ່ຕໍ່ໃຕ້ສາຍງານຂອງຂ້ອຍໂດຍກົງ',
  btnEnrollUnderMe: 'ຢືນຢັນສະໝັກສະມາຊິກໃຕ້ສາຍງານຂອງຂ້ອຍ',
  // Admin Control Panel
  adminHeaderKicker: 'PL Skincare Brand · ລະບົບບໍລິຫານຈັດການຫຼັງບ້ານຄົບວົງຈອນ',
  adminHeaderTitle: 'ແຜງຄວບຄຸມຫຼັງບ້ານສຳລັບຜູ້ບໍລິຫານທັງໝົດ',
  adminHeaderSubtitle:
    'ຜູ້ບໍລິຫານທຸກຄົນສາມາດເຂົ້າສູ່ລະບົບດ້ວຍຊື່ຜູ້ໃຊ້ (Admin Username ID / Email) ແລະ ລະຫັດຜ່ານ (Password) ຫຼື ບັນຊີ Google ເພື່ອຄວບຄຸມສາງສິນຄ້າ, ອໍເດີ້, ຜັງສາຍງານ 4 ຊັ້ນ ແລະ ອະນຸມັດຈ່າຍຄ່າຄອມມິດຊັ່ນ.',
  adminSessionTitle: 'ສະຖານະຜູ້ບໍລິຫານລະບົບຫຼັງບ້ານ',
  adminCloudVerified: 'ຢືນຢັນ Cloud ແລ້ວ',
  adminSwitchProfile: 'ເລືອກບັນຊີຜູ້ບໍລິຫານຫຼັງບ້ານ:',
  adminSignInBoxTitle: 'ເຂົ້າສູ່ລະບົບແຜງຄວບຄຸມຫຼັງບ້ານ (Admin Sign In)',
  adminTabSignIn: 'ເຂົ້າສູ່ລະບົບຜູ້ບໍລິຫານ',
  adminTabRegister: 'ເພີ່ມຜູ້ບໍລິຫານໃໝ່',
  adminSignInByIdLabel: 'ຊື່ຜູ້ໃຊ້ຜູ້ບໍລິຫານ (Admin Username ID) ຫຼື ອີເມວ',
  adminSignInByIdPlaceholder: 'ຕົວຢ່າງ: soukyathaichanthaly@gmail.com ຫຼື ADMIN-FOUNDER',
  adminPasswordLabel: 'ລະຫັດຜ່ານຜູ້ບໍລິຫານ (Admin Password)',
  adminDemoCredentialHint: 'ອີເມວຜູ້ບໍລິຫານຫຼັກ: soukyathaichanthaly@gmail.com (ID: ADMIN-FOUNDER)',
  btnAdminLoginSubmit: 'ເຂົ້າສູ່ລະບົບແຜງຄວບຄຸມຫຼັງບ້ານ',
  btnAdminLockSignOut: 'ອອກຈາກລະບົບຜູ້ບໍລິຫານ (Lock Panel)',
  adminLockedNoticeTitle: 'ແຜງຄວບຄຸມຫຼັງບ້ານຖືກລ໊ອກ — ກະລຸນາເຂົ້າສູ່ລະບົບຜູ້ບໍລິຫານ',
  adminLockedNoticeSubtitle:
    'ກະລຸນາປ້ອນອີເມວຜູ້ບໍລິຫານ (soukyathaichanthaly@gmail.com / ADMIN-FOUNDER) ແລະ ລະຫັດຜ່ານ ໃນກ່ອງເຂົ້າສູ່ລະບົບຂ້າງເທິງ ເພື່ອເປີດໃຊ້ງານແຜງຄວບຄຸມຫຼັງບ້ານ.',
  adminCreateUsernameLabel: 'ຕັ້ງຊື່ຜູ້ໃຊ້ຜູ້ບໍລິຫານ (Admin Username ID)',
  adminCreatePasswordLabel: 'ຕັ້ງລະຫັດຜ່ານຜູ້ບໍລິຫານ (Password)',
  adminQuickSwitchHint: 'ຫຼື ຄລິກເລືອກບັນຊີຜູ້ບໍລິຫານເພື່ອປ້ອນ Username ID & Password ອັດຕະໂນມັດ:',
  subTabOverview: 'ໜ້າຄວບຄຸມລວມທັງໝົດ',
  subTabAdmins: 'ຜູ້ບໍລິຫານລະບົບ',
  subTabOrders: 'ຄວບຄຸມອໍເດີ້ & ສະຕ໊ອກ',
  subTabPartners: 'ຄວບຄຸມຕົວແທນ & ຕຳແໜ່ງ',
  subTabTreasury: 'ຄັງຈ່າຍຄ່າຄອມມິດຊັ່ນ',
  subTabPlan: 'ຕັ້ງຄ່າເປີເຊັນ 4 ຊັ້ນ',
  btnRestockLowSkus: 'ເຕີມສະຕ໊ອກສິນຄ້າໃກ້ໝົດ (+50)',
  btnDisburseAllPending: 'ອະນຸມັດຈ່າຍຄອມມິດຊັ່ນທັງໝົດ',
  btnDownloadCsv: 'ດາວໂຫຼດລາຍງານ CSV',
  sec1Kicker: 'ການກຳນົດສິດຜູ້ບໍລິຫານຫຼັງບ້ານ · PL Skincare Brand',
  sec1Title: '01. ລາຍຊື່ຜູ້ບໍລິຫານລະບົບທັງໝົດ & ສິດການຄວບຄຸມ',
  colAdminEmail: 'ຊື່ຜູ້ບໍລິຫານ & ອີເມວ',
  colBackendRole: 'ຕຳແໜ່ງຫຼັງບ້ານ',
  colControlScope: 'ຂອບເຂດສິດການຄວບຄຸມ',
  colStatus: 'ສະຖານະ',
  colActions: 'ຈັດການ',
  btnUseProfile: 'ໃຊ້ບັນຊີນີ້',
  formAddAdminTitle: 'ເພີ່ມຜູ້ບໍລິຫານລະບົບຫຼັງບ້ານໃໝ່',
  formAdminName: 'ຊື່ ແລະ ນາມສະກຸນຜູ້ບໍລິຫານ',
  formAdminEmail: 'ອີເມວສຳລັບເຂົ້າລະບົບ',
  formAdminRole: 'ຕຳແໜ່ງ ແລະ ສິດຄວບຄຸມ',
  btnAddAdmin: 'ບັນທຶກຜູ້ບໍລິຫານໃໝ່',
  sec2Kicker: 'ຄວບຄຸມການສັ່ງຊື້, ການຈັດສົ່ງ ແລະ ຄືນສະຕ໊ອກອັດຕະໂນມັດ',
  sec2Title: '02. ລະບົບຄວບຄຸມບິນສັ່ງຊື້ສິນຄ້າທັງໝົດ',
  linkCreateOrderPos: 'ໄປໜ້າເປີດບິນຂາຍສິນຄ້າໃໝ່',
  colOrderRef: 'ເລກບິນ',
  colCustomerTier: 'ລູກຄ້າ & ປະເພດລາຄາ',
  colProductQty: 'ສິນຄ້າ & ຈຳນວນ',
  colReferrerL1: 'ຜູ້ແນະນຳ (ຊັ້ນທີ 1)',
  colAmount: 'ຍອດຊຳລະ',
  colL1L4Split: 'ຄອມມິດຊັ່ນ L1–L4',
  btnCancelRestore: 'ຍົກເລີກບິນ & ຄືນສະຕ໊ອກ',
  cancelledRestockedLabel: 'ຍົກເລີກ / ຄືນສະຕ໊ອກແລ້ວ',
  sec3Kicker: 'ຈັດການສາຍງານຕົວແທນ · ປັບຕຳແໜ່ງ ແລະ ສະຖານະບັນຊີ',
  sec3Title: '03. ຄວບຄຸມຕົວແທນຈຳໜ່າຍ ແລະ ຕຳແໜ່ງ',
  linkOpenGenealogy: 'ເປີດເບິ່ງຜັງສາຍງານ 4 ຊັ້ນ',
  colPartnerCode: 'ຊື່ຕົວແທນ & ລະຫັດແນະນຳ',
  colTreeGen: 'ຊັ້ນສາຍງານ',
  colOverrideRank: 'ປັບຕຳແໜ່ງບໍລິຫານ',
  colPvGv: 'ຍອດຂາຍສ່ວນຕົວ / ທີມງານ',
  colPendingWallet: 'ຍອດລໍຖ້າໂອນ',
  colPaidOut: 'ໂອນຈ່າຍແລ້ວ',
  sec4Kicker: 'ຄັງການເງິນຄ່າຄອມມິດຊັ່ນ · ອະນຸມັດຈ່າຍທັງ 4 ຊັ້ນ',
  sec4Title: '04. ຄັງອະນຸມັດຈ່າຍຄ່າຄອມມິດຊັ່ນ 4 ຊັ້ນ',
  btnSettleAllPending: 'ຈ່າຍຍອດຄ້າງທັງໝົດທັນທີ',
  colUnilevelTier: 'ຊັ້ນສາຍງານ',
  colBeneficiary: 'ຜູ້ຮັບຄ່າຄອມມິດຊັ່ນ',
  colOriginatedBy: 'ມາຈາກຍອດຂາຍຂອງ',
  colCommission: 'ຈຳນວນເງິນຄອມມິດຊັ່ນ',
  btnDisburseNow: 'ອະນຸມັດຈ່າຍ',
  sec5Title: '05. ຕັ້ງຄ່າຊື່ແບຣນ, ສະກຸນເງິນ & ເປີເຊັນຄອມມິດຊັ່ນ 4 ຊັ້ນ',
  sec5Subtitle:
    'ຄິດໄລ່ເງິນຄ່າຄອມມິດຊັ່ນ 4 ຊັ້ນໂດຍກົງຈາກຍອດຂາຍ (ບໍ່ໃຊ້ຄະແນນ PV).',
  lblBrandName: 'ຊື່ແບຣນຂອງທ່ານ',
  lblCurrency: 'ສະກຸນເງິນ',
  lblTagline: 'ຄຳຂວັນແບຣນ',
  lblMax4LevelPayout: 'ຄ່າຄອມມິດຊັ່ນສູງສຸດລວມ 4 ຊັ້ນ:',
  btnSavePlan: 'ບັນທຶກການຕັ້ງຄ່າແບຣນ & ເປີເຊັນຄອມມິດຊັ່ນ 4 ຊັ້ນ',
  sec6Title: '06. ໂປຣແກຣມຄຳນວນລາຍໄດ້ຄ່າຄອມມິດຊັ່ນ 4 ຊັ້ນ',
  sec6Subtitle:
    'ຈຳລອງລາຍໄດ້ຄ່າຄອມມິດຊັ່ນຕໍ່ເດືອນ ເມື່ອຕົວແທນແຕ່ລະຄົນແນະນຳສະມາຊິກຕໍ່ລົງໄປຄົບ 4 ຊັ້ນ.',
  lblFrontlineWidth: 'ຈຳນວນຄົນແນະນຳຕິດຕົວ',
  lblAvgOrderPv: 'ຍອດຂາຍສະເລ່ຍຕໍ່ບິນ',
  lblMonthlyOrders: 'ຈຳນວນບິນຕໍ່ເດືອນ/ຄົນ',
  simColLevel: 'ຊັ້ນສາຍງານ',
  simColPartners: 'ຈຳນວນຕົວແທນ',
  simColGroupPv: 'ຍອດຂາຍລວມຂອງຊັ້ນ',
  simColRate: 'ເປີເຊັນຄອມມິດຊັ່ນ',
  simColMonthlyEarnings: 'ຄ່າຄອມມິດຊັ່ນຕໍ່ເດືອນ',
  storeKicker: 'PL Skincare Brand · ສິນຄ້າພ້ອມສົ່ງ & ລະບົບຄອມມິດຊັ່ນ 4 ຊັ້ນ',
  storeTitle: 'ຈຳໜ່າຍສິນຄ້າ PL Skincare Brand ພ້ອມແບ່ງຄ່າຄອມມິດຊັ່ນ 4 ຊັ້ນອັດຕະໂນມັດ',
  posKicker: 'ຈຸດເປີດບິນຂາຍສິນຄ້າ & ຄຳນວນຄ່າຄອມມິດຊັ່ນ 4 ຊັ້ນ',
  posTitle: 'ສ້າງບິນສັ່ງຊື້ & ເບິ່ງການແບ່ງຄອມມິດຊັ່ນ 4 ຊັ້ນ',
  lblPricingTier: 'ເລືອກປະເພດລາຄາສິນຄ້າ',
  btnRetailCustomer: 'ລາຄາຂາຍຍ່ອຍລູກຄ້າທົ່ວໄປ',
  btnMemberWholesale: 'ລາຄາສະມາຊິກ / ຕົວແທນ',
  lblCustomerName: 'ຊື່ລູກຄ້າ / ຜູ້ຊື້',
  lblQuantity: 'ຈຳນວນ',
  lblReferringPartner: 'ຕົວແທນຜູ້ແນະນຳການຂາຍ (ຮັບຄອມມິດຊັ່ນຊັ້ນທີ 1)',
  lblInstantWaterfall: 'ຕາຕະລາງແບ່ງຄ່າຄອມມິດຊັ່ນ 4 ຊັ້ນທັນທີ (L1–L4)',
  lblTotalAllocated: 'ລວມຄ່າຄອມມິດຊັ່ນທີ່ຈ່າຍອອກທັງ 4 ຊັ້ນ:',
  lblTotalOrderAmount: 'ຍອດຊຳລະລວມທັງໝົດ',
  btnCompleteSale: 'ຢືນຢັນການຂາຍ, ຕັດສະຕ໊ອກ & ຈ່າຍຄອມມິດຊັ່ນ 4 ຊັ້ນ',
  invKicker: 'ສາງສິນຄ້າ PL Skincare Brand · ຄວບຄຸມສະຕ໊ອກ, ລາຄາຂາຍ & ຄ່າຄອມມິດຊັ່ນ 4 ຊັ້ນ',
  invTitle: 'ບໍລິຫານສາງສິນຄ້າ ແລະ ລາຄາຈຳໜ່າຍ',
  btnAddProduct: 'ເພີ່ມສິນຄ້າໃໝ່ເຂົ້າສາງ',
  formEditProductTitle: 'ແກ້ໄຂຂໍ້ມູນສິນຄ້າ',
  formNewProductTitle: 'ເພີ່ມສິນຄ້າໃໝ່ເຂົ້າສາງ PL Skincare Brand',
  lblSkuCode: 'ລະຫັດສິນຄ້າ (SKU)',
  lblProductName: 'ຊື່ສິນຄ້າ',
  lblCategory: 'ໝວດໝູ່ສິນຄ້າ',
  lblRetailPrice: 'ລາຄາຂາຍຍ່ອຍ',
  lblMemberPrice: 'ລາຄາສະມາຊິກ',
  lblPvPoints: 'ຍອດຄິດໄລ່ຄອມມິດຊັ່ນ',
  lblStockUnits: 'ຈຳນວນໃນສາງ',
  lblAlertLevel: 'ຈຸດແຈ້ງເຕືອນສະຕ໊ອກຕ່ຳ',
  lblDescription: 'ລາຍລະອຽດສິນຄ້າ',
  lblProductImage: 'ຮູບພາບສິນຄ້າ',
  searchInventoryPlaceholder: 'ຄົ້ນຫາລະຫັດ SKU ຫຼື ຊື່ສິນຄ້າ...',
  colStockManage: 'ຈັດການສາງ',
  alertBelowLabel: 'ແຈ້ງເຕືອນເມື່ອຕ່ຳກວ່າ',
  genKicker: 'ໂຄງສ້າງສາຍງານ Unilevel · ແນະນຳຕິດຕົວບໍ່ຈຳກັດ & ຈ່າຍຄອມມິດຊັ່ນເລິກ 4 ຊັ້ນ',
  genTitle: 'ຜັງສາຍງານຕົວແທນ 4 ຊັ້ນ',
  subtreeFromLabel: 'ຜັງສາຍງານ 4 ຊັ້ນຂອງ',
  uplineSponsorsLabel: 'ຜູ້ແນະນຳຂ້າງເທິງ:',
  formEnrollPartnerTitle: 'ລົງທະບຽນຕົວແທນຈຳໜ່າຍໃໝ່',
  lblPartnerFullName: 'ຊື່ ແລະ ນາມສະກຸນຕົວແທນ',
  lblReferralCode: 'ລະຫັດຜູ້ແນະນຳ (ຖ້າມີ)',
  lblUplineSponsor: 'ຜູ້ແນະນຳໂດຍກົງ',
  btnEnrollPartner: 'ເພີ່ມຕົວແທນເຂົ້າຜັງສາຍງານ 4 ຊັ້ນ',
  commKicker: 'ບັນຊີຄ່າຄອມມິດຊັ່ນໂປ່ງໃສ · ກວດສອບລາຍໄດ້ຊັ້ນທີ 1 ຫາ ຊັ້ນທີ 4',
  commTitle: 'ບັນຊີຄ່າຄອມມິດຊັ່ນ 4 ຊັ້ນ & ການໂອນຈ່າຍເງິນ',
  footerSummary:
    'ລະບົບສະມາຊິກໜ້າບ້ານ, ບໍລິຫານສາງສິນຄ້າ ແລະ ການຕະຫຼາດ 4 ຊັ້ນຄົບວົງຈອນ',
};

const EN_DICT: TranslationDict = {
  langSelectLabel: 'Language',
  navMemberPortal: 'Member Portal',
  navStorefront: 'Storefront',
  navInventory: 'Stock & SKUs',
  navGenealogy: '4-Level Tree',
  navCommissions: 'Commissions',
  navAdmin: 'Admin Control',
  btnMemberSignInTop: 'Member Sign In',
  btnAdminSignIn: 'Admin Sign In',
  btnControlPanel: 'Backend Control Panel',
  activeOperator: 'Active Backend Operator',
  activeMemberLabel: 'Signed-In Member',
  roleLabel: 'Role',
  unilevelRatesLabel: '4-Level Unilevel Rates',
  authenticatedAdmin: 'Authenticated Account',
  signOut: 'Sign Out',
  localSession: 'Local Session',
  connectGoogleCloud: 'Sign In with Google',
  kpiStockUnits: 'In-Stock Inventory Units',
  kpiValuation: 'Valuation',
  kpiTotalSales: 'Cumulative Product Sales',
  kpiActiveOrders: 'Active Orders',
  kpiCancelled: 'Cancelled',
  kpiNetworkPartners: '4-Level Unilevel Network',
  kpiActiveAdmins: 'Active Backend Administrators',
  kpiCommissionLedger: 'Unilevel Commissions Ledger',
  kpiPendingTreasury: 'Pending Treasury',
  unitsLabel: 'units',
  skusLabel: 'SKUs',
  partnersLabel: 'Partners',
  recordsLabel: 'records',
  ordersCountLabel: 'orders',
  inStockLabel: 'in stock',
  optimalStockLabel: 'Optimal',
  lowStockBadge: 'Low Stock',
  allFilter: 'All',
  healthyFilter: 'Healthy',
  lowStockFilter: 'Low Stock',
  pendingStatus: 'Pending',
  paidStatus: 'Paid',
  voidedStatus: 'Voided',
  fulfilledStatus: 'Fulfilled',
  cancelledStatus: 'Cancelled',
  processingStatus: 'Processing',
  activeStatus: 'Active',
  suspendedStatus: 'Suspended',
  levelWord: 'Level',
  genWord: 'Gen',
  cancelBtn: 'Cancel',
  saveProductBtn: 'Save Product SKU',
  add25StockBtn: '+25 Stock',
  copiedNotice: 'Referral link copied to clipboard',
  // Member Portal
  memberHeaderKicker: 'PL Skincare Brand · Front-End Distributor & VIP Member Portal',
  memberHeaderTitle: 'Front-End User Member Sign-In Panel & Partner Workspace',
  memberHeaderSubtitle:
    'Sign in with your PL Skincare Member Code or Google Account to unlock wholesale member pricing, copy your personal referral link, track your 4-level downline team, and view real-time Unilevel commission earnings.',
  memberSignInBoxTitle: 'Front-End Member Sign In',
  tabSignInMode: 'Sign In',
  tabRegisterMode: 'Register New',
  memberSignInByCodeLabel: 'Username ID / Member Code',
  memberSignInByCodePlaceholder: 'e.g. PL-CLAIRE-L1 or dalavanh99',
  btnMemberCodeLogin: 'Sign In to Member Dashboard',
  memberQuickSwitchLabel: 'Or Quick-Select a Sample Member Account (Auto-Fills Username & Password):',
  memberSelfEnrollTitle: 'New Front-End Member Registration',
  memberSelfEnrollSubtitle:
    'Create your own custom Username ID and Password to join PL Skincare Brand, access member wholesale pricing, and earn 4-level Unilevel commissions.',
  btnMemberSelfEnroll: 'Register Account & Sign In Immediately',
  memberWelcomeBadge: 'Authenticated Member Session',
  memberCodeLabel: 'Member Code',
  memberRankLabel: 'Rank',
  memberReferralLinkLabel: 'Your Personal Referral Link & Sponsor Code:',
  btnCopyReferral: 'Copy Referral Link',
  memberRankProgressLabel: 'Career Rank Progression',
  memberMaxRankReached: 'Max Rank Achieved',
  memberQualifiedActive: 'Commission Qualification Met',
  memberNeedsPv: 'Additional sales needed for full 4-level commission',
  memberKpiPersonalPv: 'Personal Sales',
  memberKpiGroupGv: '4-Level Team Sales',
  memberKpiPendingWallet: 'Pending Commission Wallet',
  memberKpiTotalEarned: 'Lifetime Commission Earned',
  memberPendingSplitsCount: 'Pending Unilevel Splits',
  memberPaidOutSub: 'Paid Out',
  memberQuickShopTitle: 'Member Express Wholesale & 4-Level Commission Terminal',
  memberQuickShopSubtitle:
    'Every order placed here automatically credits your account as the Level 1 Direct Referrer (15% commission).',
  memberSelectProductLabel: 'Select PL Skincare Brand Product',
  memberFirstTierReferrerLabel: 'Level 1 Direct Referrer:',
  memberOrderPvLabel: 'Commission Base Amount:',
  memberDownlineTitle: 'My 4-Level Unilevel Downline Network (L1–L4)',
  memberDownlineSubtitle:
    'View partners sponsored across your 4 paid generations and switch into any downline account.',
  memberCommissionRateLabel: 'Commission Rate',
  memberNoDownlineInTier: 'No partners enrolled yet in this generation for',
  memberSignInAsThisPartner: 'Sign In as Partner',
  memberEarningsHistoryTitle: 'My Personal L1–L4 Commission Earnings',
  memberOrdersHistoryTitle: 'My Referred Customer & Member Orders',
  memberNoCommissionsYet: 'No commission history recorded yet for',
  memberNoOrdersYet: 'No orders referred yet by',
  btnShopAsMember: 'Order at Member Price',
  googleCloudStatusLabel: 'Connect Google Cloud Account:',
  googleConnectedBadge: 'Connected',
  memberSubTabOverview: 'Member Control Panel',
  memberSubTabPackage: '4 Packages · 4 Levels',
  memberSubTabBillOrder: 'Order Bill Products',
  memberSubTabKyc: 'KYC Account',
  memberSubTabReferral: 'Sponsor Referral',
  btnSignOutMember: 'Switch Account / Register New',
  memberGateStep1Badge: 'Step 1: Register New Member Account (Create Username ID & Password)',
  memberGateStep2Badge: 'Step 2: Sign In with Username ID & Password',
  lblPhone: 'Phone / WhatsApp Number',
  lblUsernameId: 'Create Username / Member ID',
  lblPassword: 'Password',
  lblConfirmPassword: 'Confirm Password',
  placeholderUsernameId: 'e.g. dalavanh99 or PL-DALAVANH',
  placeholderPassword: 'Create password (min 4 chars)',
  memberDemoCredentialHint: 'Default password for sample accounts: 123456',
  showPasswordBtn: 'Show',
  hidePasswordBtn: 'Hide',
  lblNationalId: 'National ID / Passport No. (KYC)',
  lblBankName: 'Commission Payout Bank Name',
  lblBankAccount: 'Bank Account Number',
  lblKycStatus: 'KYC Account Status',
  lblActivePackage: 'Active Member Package',
  lblDirectUplineSponsor: 'Direct Upline Sponsor',
  pkgSectionTitle: '4 Packages · 4 Levels Unilevel Commission',
  pkgSectionSubtitle:
    'Select one of our 4 Official Member Packages for 4 Unilevel Levels — no PV points needed, direct 4-level commission payouts.',
  btnActivatePackage: 'Activate Package & Pay 4-Level Commissions',
  pkgActivatedBadge: 'Current Active Package',
  pkgIncludesLabel: 'Package Product Bundle:',
  pkgInstantRankLabel: 'Instant Career Rank:',
  kycSectionTitle: 'KYC Identity Verification & Commission Payout Bank Account',
  kycSectionSubtitle:
    'Complete your KYC identity verification and register your bank account to receive 4-level Unilevel commission payouts.',
  btnSubmitKycVerify: 'Save & Verify KYC Account Now',
  btnAdminVerifyKyc: 'Approve KYC',
  billSectionTitle: 'Order Bill Products & Official Invoice Receipt',
  billSectionSubtitle:
    'Place product bill orders at Member Wholesale or Retail pricing with instant invoice generation, stock deduction, and 4-level Unilevel commission rollup.',
  billInvoiceHeader: 'OFFICIAL PRODUCT ORDER BILL RECEIPT',
  billInvoiceSubheader: 'PL Skincare Brand · Verified Order & 4-Level Commission Attribution',
  billNoLabel: 'Bill Invoice No.',
  billBuyerLabel: 'Buyer / Member Name',
  billSponsorCodeLabel: 'Referring Member Code (L1)',
  billProductItemLabel: 'Product Item & Quantity',
  billViewReceiptBtn: 'View Bill',
  referralSectionTitle: 'Sponsor Referral Center & 4-Level Downline Genealogy',
  referralSectionSubtitle:
    'Share your personal sponsor referral link or directly enroll new frontline partners under your Member Code.',
  referralMySponsorTitle: 'My Direct Upline Sponsor Account',
  referralDirectEnrollTitle: 'Directly Register New Sponsored Member Under My Code',
  btnEnrollUnderMe: 'Enroll Sponsored Member Under My Account',
  // Admin Control Panel
  adminHeaderKicker: 'PL Skincare Brand · Centralized Back-Office Operations',
  adminHeaderTitle: 'Backend Manager Master Control Panel',
  adminHeaderSubtitle:
    'Administrators can sign in with their Admin Username ID / Email and Password or Google Account to manage staff role permissions, fulfill or cancel orders, override distributor ranks, and disburse 4-level commissions.',
  adminSessionTitle: 'Backend Administrator Session',
  adminCloudVerified: 'Cloud Verified',
  adminSwitchProfile: 'Switch Active Backend Administrator Profile:',
  adminSignInBoxTitle: 'Backend Administrator Sign-In Panel',
  adminTabSignIn: 'Admin Sign In',
  adminTabRegister: 'Register New Admin',
  adminSignInByIdLabel: 'Admin Username ID or Email',
  adminSignInByIdPlaceholder: 'e.g. soukyathaichanthaly@gmail.com or ADMIN-FOUNDER',
  adminPasswordLabel: 'Admin Password',
  adminDemoCredentialHint: 'Primary Admin Email: soukyathaichanthaly@gmail.com (ID: ADMIN-FOUNDER)',
  btnAdminLoginSubmit: 'Sign In to Backend Control Panel',
  btnAdminLockSignOut: 'Sign Out / Lock Backend Panel',
  adminLockedNoticeTitle: 'Backend Control Panel Locked — Administrator Sign-In Required',
  adminLockedNoticeSubtitle:
    'Please enter your Administrator Email (soukyathaichanthaly@gmail.com / ADMIN-FOUNDER) and Password in the Administrator Sign-In Panel above to unlock full backend control panel operations.',
  adminCreateUsernameLabel: 'Create Admin Username ID',
  adminCreatePasswordLabel: 'Create Admin Password',
  adminQuickSwitchHint: 'Or Quick-Select an Administrator Account (Auto-Fills Username & Password):',
  subTabOverview: 'All-in-One Command Center',
  subTabAdmins: 'Administrators',
  subTabOrders: 'Order Control',
  subTabPartners: 'Partner & Rank Control',
  subTabTreasury: 'Batch Payout Treasury',
  subTabPlan: '4-Level Rates & Simulator',
  btnRestockLowSkus: 'Restock Low SKUs (+50)',
  btnDisburseAllPending: 'Disburse All Pending',
  btnDownloadCsv: 'Download CSV',
  sec1Kicker: 'Backend Access Governance · Role-Based Control Panel Staff',
  sec1Title: '01. All Administrators & Backend Role Permissions',
  colAdminEmail: 'Administrator & Email',
  colBackendRole: 'Backend Role',
  colControlScope: 'Control Scope',
  colStatus: 'Status',
  colActions: 'Actions',
  btnUseProfile: 'Use Profile',
  formAddAdminTitle: 'Authorize New Backend Administrator',
  formAdminName: 'Administrator Full Name',
  formAdminEmail: 'Sign-In Email Address',
  formAdminRole: 'Assigned Control Panel Role',
  btnAddAdmin: 'Add Backend Administrator',
  sec2Kicker: 'Order Fulfillment, Cancellation & Automatic Stock Restoration',
  sec2Title: '02. Master Order & Fulfillment Control',
  linkCreateOrderPos: 'Create New Order in POS Terminal',
  colOrderRef: 'Order Ref',
  colCustomerTier: 'Customer & Tier',
  colProductQty: 'Product & Qty',
  colReferrerL1: 'Referring Partner (L1)',
  colAmount: 'Amount',
  colL1L4Split: 'L1–L4 Split',
  btnCancelRestore: 'Cancel & Restore Stock',
  cancelledRestockedLabel: 'Cancelled / Restocked',
  sec3Kicker: 'Network Overrides · Career Rank Promotion & Account Status',
  sec3Title: '03. Master Distributor & Career Rank Control',
  linkOpenGenealogy: 'Open Interactive 4-Level Genealogy Tree',
  colPartnerCode: 'Partner & Referral Code',
  colTreeGen: 'Tree Gen',
  colOverrideRank: 'Override Career Rank',
  colPvGv: 'Personal / Team Sales',
  colPendingWallet: 'Pending Wallet',
  colPaidOut: 'Paid Out',
  sec4Kicker: 'Commission Treasury · L1–L4 Settlement & Audit Export',
  sec4Title: '04. Commission Treasury & Batch Payout Control',
  btnSettleAllPending: 'Settle All Pending',
  colUnilevelTier: 'Unilevel Tier',
  colBeneficiary: 'Beneficiary Earner',
  colOriginatedBy: 'Originated By',
  colCommission: 'Commission',
  btnDisburseNow: 'Disburse Now',
  sec5Title: '05. Configure PL Skincare Brand, Currency & 4-Level Commission Rates',
  sec5Subtitle:
    'Calculate 4-level Unilevel commissions directly from order & package sales without PV points.',
  lblBrandName: 'Your Own Brand Name',
  lblCurrency: 'Currency',
  lblTagline: 'Brand Positioning Tagline',
  lblMax4LevelPayout: 'Maximum Cumulative 4-Level Commission Rate:',
  btnSavePlan: 'Save Brand & 4-Level Commission Configuration',
  sec6Title: '06. 4-Level Geometric Duplication Commission Simulator',
  sec6Subtitle:
    'Simulate how much commission a distributor earns monthly across 4 levels.',
  lblFrontlineWidth: 'Frontline Width (Partners)',
  lblAvgOrderPv: 'Avg Order Price',
  lblMonthlyOrders: 'Monthly Orders / Partner',
  simColLevel: 'Level',
  simColPartners: 'Partners',
  simColGroupPv: 'Level Sales',
  simColRate: 'Commission Rate',
  simColMonthlyEarnings: 'Monthly Commission',
  storeKicker: 'PL Skincare Brand · In-Stock Collection & 4-Level Commission System',
  storeTitle: 'Sell PL Skincare Stock with Instant 4-Level Commission Rollup',
  posKicker: 'Direct Sales & 4-Level Commission Checkout Terminal',
  posTitle: 'Create Order & Preview 4-Level Commission Split',
  lblPricingTier: 'Pricing Tier',
  btnRetailCustomer: 'Retail Customer',
  btnMemberWholesale: 'Member Wholesale',
  lblCustomerName: 'Customer / Buyer Name',
  lblQuantity: 'Quantity',
  lblReferringPartner: 'Referring Distributor (Level 1 Direct Earner)',
  lblInstantWaterfall: 'Instant 4-Level Unilevel Commission Waterfall',
  lblTotalAllocated: 'Total 4-Level Commission Allocated:',
  lblTotalOrderAmount: 'Total Order Amount',
  btnCompleteSale: 'Complete Sale & Credit 4-Level Commissions',
  invKicker: 'PL Skincare Warehouse · Stock Control, Pricing & 4-Level Commissions',
  invTitle: 'PL Skincare Brand Product Inventory & Pricing',
  btnAddProduct: 'Add New Brand Product',
  formEditProductTitle: 'Edit Product',
  formNewProductTitle: 'Add New Product to PL Skincare Warehouse',
  lblSkuCode: 'SKU Code',
  lblProductName: 'Product Name',
  lblCategory: 'Category',
  lblRetailPrice: 'Retail Price',
  lblMemberPrice: 'Member Price',
  lblPvPoints: 'Commission Base',
  lblStockUnits: 'Stock Units',
  lblAlertLevel: 'Low Stock Alert Level',
  lblDescription: 'Product Description',
  lblProductImage: 'Product Image',
  searchInventoryPlaceholder: 'Search SKU code or product name...',
  colStockManage: 'Manage Stock',
  alertBelowLabel: 'Alert below',
  genKicker: 'Unilevel Sponsor Hierarchy · Unlimited Frontline Width & 4 Paid Generations',
  genTitle: '4-Level Unilevel Genealogy & Downline Explorer',
  subtreeFromLabel: '4-Level Subtree From',
  uplineSponsorsLabel: 'Upline Sponsors:',
  formEnrollPartnerTitle: 'Enroll New Brand Partner',
  lblPartnerFullName: 'Partner Full Name',
  lblReferralCode: 'Referral Code (Optional)',
  lblUplineSponsor: 'Direct Upline Sponsor',
  btnEnrollPartner: 'Enroll Partner into Unilevel Tree',
  commKicker: 'Transparent Multi-Level Audit Trail · L1, L2, L3 & L4 Overrides',
  commTitle: '4-Level Commission Ledger & Wallet Payouts',
  footerSummary:
    'Front-End Member Portal, Brand Warehouse Inventory & 4-Level Unilevel MLM Platform',
};

export function getTranslations(lang: AppLanguage): TranslationDict {
  return lang === 'lo' ? LO_DICT : EN_DICT;
}

/**
 * Pure-language localization helpers so that selecting Lao shows 100% Lao
 * and selecting English shows 100% English (never mixed side-by-side).
 */
export interface CustomRankOption {
  value: DistributorRank;
  labelLo: string;
  labelEn: string;
}

export const CUSTOM_RANK_STORAGE_KEY = 'pl_custom_rank_options_v1';

export const DEFAULT_CUSTOM_RANK_OPTIONS: CustomRankOption[] = [
  {
    value: 'Brand Partner',
    labelLo: 'ຕົວແທນຈຳໜ່າຍເລີ່ມຕົ້ນ',
    labelEn: 'Brand Partner',
  },
  {
    value: 'Silver Director',
    labelLo: 'ຜູ້ອຳນວຍການລະດັບເງິນ',
    labelEn: 'Silver Director',
  },
  {
    value: 'Gold Director',
    labelLo: 'ຜູ້ອຳນວຍການລະດັບຄຳ',
    labelEn: 'Gold Director',
  },
  {
    value: 'Emerald Executive',
    labelLo: 'ຜູ້ບໍລິຫານລະດັບມໍລະກົດ',
    labelEn: 'Emerald Executive',
  },
  {
    value: 'Diamond Ambassador',
    labelLo: 'ທູດແບຣນລະດັບເພັດ',
    labelEn: 'Diamond Ambassador',
  },
];

export function getStoredCustomRankOptions(): CustomRankOption[] {
  if (typeof window === 'undefined') return DEFAULT_CUSTOM_RANK_OPTIONS;
  try {
    const raw = window.localStorage.getItem(CUSTOM_RANK_STORAGE_KEY);
    if (!raw) return DEFAULT_CUSTOM_RANK_OPTIONS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch {
    // ignore storage errors
  }
  return DEFAULT_CUSTOM_RANK_OPTIONS;
}

export interface CustomLevelSelectOption {
  level: 1 | 2 | 3 | 4 | 5;
  labelLo: string;
  labelEn: string;
}

export const CUSTOM_LEVEL_STORAGE_KEY = 'pl_custom_level_options_v2';

export const DEFAULT_CUSTOM_LEVEL_OPTIONS: CustomLevelSelectOption[] = [
  {
    level: 1,
    labelLo: 'L1 — ລາຄາ 350,000 ₭/1 (ຈຳນວນ 1–50)',
    labelEn: 'L1 — Price: 350,000 kip/1 (Qty 1–50)',
  },
  {
    level: 2,
    labelLo: 'L2 — ລາຄາ 300,000 ₭/1 (ຈຳນວນ 50)',
    labelEn: 'L2 — Price: 300,000 kip/1 (Qty 50)',
  },
  {
    level: 3,
    labelLo: 'L3 — ລາຄາ 250,000 ₭/1 (ຈຳນວນ 100)',
    labelEn: 'L3 — Price: 250,000 kip/1 (Qty 100)',
  },
  {
    level: 4,
    labelLo: 'L4 — ລາຄາ 200,000 ₭/1 (ຈຳນວນ 500)',
    labelEn: 'L4 — Price: 200,000 kip/1 (Qty 500)',
  },
  {
    level: 5,
    labelLo: 'L5 — ລາຄາ 380,000 ₭/1 (ຈຳນວນ 1,000 · ຊື້ທົ່ວໄປ 0%)',
    labelEn: 'L5 — Price: 380,000 kip/1 (Qty 1000 · 0% Commission)',
  },
];

export function getStoredCustomLevelOptions(): CustomLevelSelectOption[] {
  if (typeof window === 'undefined') return DEFAULT_CUSTOM_LEVEL_OPTIONS;
  try {
    const raw = window.localStorage.getItem(CUSTOM_LEVEL_STORAGE_KEY);
    if (!raw) return DEFAULT_CUSTOM_LEVEL_OPTIONS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length === 5) {
      return parsed;
    }
  } catch {
    // ignore storage errors
  }
  return DEFAULT_CUSTOM_LEVEL_OPTIONS;
}

export function localizeRank(rank: DistributorRank, lang: AppLanguage): string {
  const customOptions = getStoredCustomRankOptions();
  const matched = customOptions.find((opt) => opt.value === rank);
  if (matched) {
    return lang === 'lo' ? matched.labelLo || matched.value : matched.labelEn || matched.value;
  }
  if (lang === 'en') return rank;
  const map: Record<string, string> = {
    'Brand Partner': 'ຕົວແທນຈຳໜ່າຍເລີ່ມຕົ້ນ',
    'Silver Director': 'ຜູ້ອຳນວຍການລະດັບເງິນ',
    'Gold Director': 'ຜູ້ອຳນວຍການລະດັບຄຳ',
    'Emerald Executive': 'ຜູ້ບໍລິຫານລະດັບມໍລະກົດ',
    'Diamond Ambassador': 'ທູດແບຣນລະດັບເພັດ',
  };
  return map[rank] || rank;
}

export function localizeAdminRole(role: AdminRole, lang: AppLanguage): string {
  if (lang === 'en') return role;
  const map: Record<AdminRole, string> = {
    'Super Admin': 'ຜູ້ບໍລິຫານສູງສຸດ',
    'Inventory Manager': 'ຜູ້ຈັດການສາງສິນຄ້າ',
    'Payout Controller': 'ຝ່າຍການເງິນຄອມມິດຊັ່ນ',
    'Network Director': 'ຜູ້ອຳນວຍການສາຍງານ',
  };
  return map[role] || role;
}

export function localizeAdminPermissions(
  role: AdminRole,
  lang: AppLanguage
): string {
  if (lang === 'lo') {
    const loMap: Record<AdminRole, string> = {
      'Super Admin':
        'ສິດຄວບຄຸມສູງສຸດທັງໝົດ: ຈັດການຜູ້ບໍລິຫານ, ສາງສິນຄ້າ, ຜັງສາຍງານ 4 ຊັ້ນ, ອໍເດີ້ ແລະ ການຈ່າຍຄອມມິດຊັ່ນ',
      'Inventory Manager':
        'ຜູ້ຈັດການສາງສິນຄ້າ: ເພີ່ມ/ແກ້ໄຂສິນຄ້າ, ເຕີມສະຕ໊ອກ, ຕັ້ງລາຄາຂາຍຍ່ອຍ ແລະ ລາຄາສະມາຊິກ',
      'Payout Controller':
        'ຝ່າຍການເງິນຄອມມິດຊັ່ນ: ກວດສອບບັນຊີຄອມມິດຊັ່ນ L1–L4, ອະນຸມັດໂອນຈ່າຍ ແລະ ດາວໂຫຼດລາຍງານ CSV',
      'Network Director':
        'ຜູ້ອຳນວຍການສາຍງານ: ລົງທະບຽນຕົວແທນໃໝ່, ປັບຕຳແໜ່ງບໍລິຫານ ແລະ ຄວບຄຸມສະຖານະບັນຊີຕົວແທນ',
    };
    return loMap[role];
  }
  const enMap: Record<AdminRole, string> = {
    'Super Admin':
      'Full backend control: Admins, Stock, 4-Level Tree, Orders & Payouts',
    'Inventory Manager':
      'Warehouse control: Add/Edit SKUs, Restock & Retail/Member Prices',
    'Payout Controller':
      'Treasury control: Audit L1–L4 Ledger, Batch Disburse & CSV Export',
    'Network Director':
      'Genealogy control: Enroll Partners, Override Ranks & Account Status',
  };
  return enMap[role];
}

export function localizeCategory(cat: string, lang: AppLanguage): string {
  const c = (cat || '').trim();
  if (!c) return lang === 'lo' ? 'ສິນຄ້າທົ່ວໄປ' : 'General';
  if (c.includes('/')) {
    const parts = c.split('/').map((s) => s.trim()).filter(Boolean);
    if (parts.length >= 2) {
      return lang === 'lo' ? parts[parts.length - 1] : parts[0];
    }
  }
  if (c.includes('Pearl Facial Cream') || c.includes('ຄຣີມໄຂ່ມຸກ')) {
    return lang === 'lo' ? 'ຄຣີມໄຂ່ມຸກບຳລຸງຜິວໜ້າ' : 'Pearl Facial Cream';
  }
  if (c.includes('Sunscreen') || c.includes('ຄຣີມກັນແດດ')) {
    return lang === 'lo' ? 'ຄຣີມກັນແດດບຳລຸງຜິວ' : 'Sunscreen & Isolation';
  }
  if (c.includes('Wholesale') || c.includes('ແພັກເກັດຕົວແທນ')) {
    return lang === 'lo' ? 'ແພັກເກັດຕົວແທນຈຳໜ່າຍ' : 'Wholesale Packages';
  }
  if (c.includes('Facial Skincare') || c.includes('ບຳລຸງຜິວໜ້າ')) {
    return lang === 'lo' ? 'ບຳລຸງຜິວໜ້າ' : 'Facial Skincare';
  }
  if (c.includes('Wellness & Beauty') || c.includes('ອາຫານເສີມຜິວ')) {
    return lang === 'lo' ? 'ອາຫານເສີມບຳລຸງຜິວ' : 'Wellness & Beauty';
  }
  if (c.includes('Skincare Sets') || c.includes('ຊຸດເຊັດບຳລຸງຜິວ')) {
    return lang === 'lo' ? 'ຊຸດເຊັດບຳລຸງຜິວ' : 'Skincare Sets';
  }
  return c;
}

export function localizeProductName(
  product: Pick<Product, 'id' | 'sku' | 'name'>,
  lang: AppLanguage
): string {
  const raw = (product.name || '').trim();
  if (!raw) return lang === 'lo' ? 'ຜະລິດຕະພັນ PL Skincare' : 'PL Skincare Product';

  // If product name contains "English Name (ຊື່ພາສາລາວ)" with Lao characters inside parentheses
  const match = raw.match(/^(.+?)\s*\(([\s\S]*?[\u0E80-\u0EFF][\s\S]*?)\)$/);
  if (match) {
    return lang === 'lo' ? match[2].trim() : match[1].trim();
  }

  // If product name contains "ຊື່ພາສາລາວ / English Name"
  if (raw.includes(' / ')) {
    const parts = raw.split(' / ').map((s) => s.trim()).filter(Boolean);
    if (parts.length >= 2) {
      const firstHasLao = /[\u0E80-\u0EFF]/.test(parts[0]);
      if (firstHasLao) {
        return lang === 'lo' ? parts[0] : parts[parts.length - 1];
      }
      return lang === 'lo' ? parts[parts.length - 1] : parts[0];
    }
  }

  return raw;
}

export function localizeProductNameByRaw(
  rawName: string,
  productId: string,
  lang: AppLanguage
): string {
  return localizeProductName({ id: productId, sku: '', name: rawName }, lang);
}

export function localizeProductDescription(
  product: Pick<Product, 'id' | 'description'>,
  lang: AppLanguage
): string {
  const raw = (product.description || '').trim();
  if (!raw) return '';
  if (raw.includes('·')) {
    const parts = raw.split('·').map((s) => s.trim()).filter(Boolean);
    if (parts.length >= 2) {
      const firstHasLao = /[\u0E80-\u0EFF]/.test(parts[0]);
      if (firstHasLao) {
        return lang === 'lo' ? parts[0] : parts[parts.length - 1];
      }
      return lang === 'lo' ? parts[parts.length - 1] : parts[0];
    }
  }
  return raw;
}

export function localizePersonName(rawName: string, lang: AppLanguage): string {
  // Strip any "(...)" bilingual suffix first, then add pure language role if known
  const baseName = rawName.replace(/\s*\(.*?\)\s*/g, '').trim();
  if (lang === 'en') {
    const enKnownNames: Record<string, string> = {
      'Pl Skincare1': 'Pl Skincare1 (L1 Member)',
      'Pl Skincare2': 'Pl Skincare2 (L2 Member)',
      'Pl Skincare3': 'Pl Skincare3 (L3 Member)',
      'Pl Skincare4': 'Pl Skincare4 (L4 Member)',
      'Pl Skincare5': 'Pl Skincare5 (L5 · General Buy — No Commission)',
      'Claire Vance': 'Pl Skincare1 (L1 Member)',
      'Elena Rostova': 'Pl Skincare2 (L2 Member)',
      'Sophia Lin': 'Pl Skincare3 (L3 Member)',
      'Lucas Moreau': 'Pl Skincare4 (L4 Member)',
      'Amara Chen': 'Pl Skincare5 (L5 · General Buy — No Commission)',
    };
    return enKnownNames[baseName] || baseName;
  }
  const loKnownNames: Record<string, string> = {
    'Narinrattana Phak': 'ນະຣິນຣັດຕະນະ ພັກ (ຜູ້ກໍ່ຕັ້ງແບຣນ)',
    'Pl Skincare1': 'Pl Skincare1 (ສະມາຊິກ L1 · ຊັ້ນທີ 1)',
    'Pl Skincare2': 'Pl Skincare2 (ສະມາຊິກ L2 · ຊັ້ນທີ 2)',
    'Pl Skincare3': 'Pl Skincare3 (ສະມາຊິກ L3 · ຊັ້ນທີ 3)',
    'Pl Skincare4': 'Pl Skincare4 (ສະມາຊິກ L4 · ຊັ້ນທີ 4)',
    'Pl Skincare5': 'Pl Skincare5 (L5 · ຊື້ທົ່ວໄປ — ບໍ່ມີຄ່າຄອມມິດຊັ່ນ)',
    'Claire Vance': 'Pl Skincare1 (ສະມາຊິກ L1 · ຊັ້ນທີ 1)',
    'Marcus Thorne': 'ມາຄັສ ທອນ (ຕົວແທນຊັ້ນທີ 1)',
    'Elena Rostova': 'Pl Skincare2 (ສະມາຊິກ L2 · ຊັ້ນທີ 2)',
    'David Kim': 'ເດວິດ ຄິມ (ຕົວແທນຊັ້ນທີ 2)',
    'Sophia Lin': 'Pl Skincare3 (ສະມາຊິກ L3 · ຊັ້ນທີ 3)',
    'Lucas Moreau': 'Pl Skincare4 (ສະມາຊິກ L4 · ຊັ້ນທີ 4)',
    'Amara Chen': 'Pl Skincare5 (L5 · ຊື້ທົ່ວໄປ — ບໍ່ມີຄ່າຄອມມິດຊັ່ນ)',
    'Somsak Charoen': 'ສົມສັກ ຈະເລີນ',
    'Alisa Wattana': 'ອະລິສາ ວັດທະນາ',
    'Kittisak Lom': 'ກິດຕິສັກ ລົມ',
  };
  return loKnownNames[baseName] || baseName;
}

export function localizeOrderType(
  orderType: 'retail' | 'member',
  lang: AppLanguage
): string {
  if (lang === 'lo') {
    return orderType === 'member' ? 'ລາຄາສະມາຊິກ' : 'ລາຄາຂາຍຍ່ອຍ';
  }
  return orderType === 'member' ? 'Member' : 'Retail';
}

export function localizeStatus(
  status: string,
  lang: AppLanguage,
  t: TranslationDict
): string {
  switch (status) {
    case 'active':
      return t.activeStatus;
    case 'suspended':
      return t.suspendedStatus;
    case 'pending':
      return t.pendingStatus;
    case 'paid':
      return t.paidStatus;
    case 'voided':
      return t.voidedStatus;
    case 'fulfilled':
      return t.fulfilledStatus;
    case 'cancelled':
      return t.cancelledStatus;
    case 'processing':
      return t.processingStatus;
    default:
      return lang === 'lo' ? status : status;
  }
}

export function localizeKycStatus(
  kycStatus: KycStatus | undefined,
  lang: AppLanguage
): string {
  const status = kycStatus || 'unverified';
  if (lang === 'lo') {
    if (status === 'verified') return 'ຢືນຢັນ KYC ແລ້ວ';
    if (status === 'pending') return 'ລໍຖ້າກວດສອບ KYC';
    return 'ຍັງບໍ່ທັນຢືນຢັນ KYC';
  }
  if (status === 'verified') return 'KYC Verified';
  if (status === 'pending') return 'KYC Pending';
  return 'KYC Unverified';
}

export function localizePackageTier(
  tier: MemberPackageTier | undefined,
  lang: AppLanguage,
  _currencyMode = '₭'
): string {
  const pkg = tier || 'None';
  if (lang === 'en') {
    const enMap: Record<string, string> = {
      None: 'No Active Package (General Buy 0%)',
      'Bronze Starter': 'Package L1 · 350,000 ₭/1 (Qty 1–50)',
      'Silver Builder': 'Package L2 · 300,000 ₭/1 (Qty 50)',
      'Gold Pro': 'Package L3 · 250,000 ₭/1 (Qty 100)',
      'Diamond Founder': 'Package L4 · 200,000 ₭/1 (Qty 500)',
      'L5 General Buy': 'Package L5 · 380,000 ₭/1 (Qty 1000 · 0% Commission)',
    };
    return enMap[pkg] || pkg;
  }
  const map: Record<string, string> = {
    None: 'ບໍ່ມີແພັກເກັດ (ຊື້ທົ່ວໄປ 0%)',
    'Bronze Starter': 'ແພັກເກັດ L1 · 350,000 ₭/1 (ຈຳນວນ 1–50)',
    'Silver Builder': 'ແພັກເກັດ L2 · 300,000 ₭/1 (ຈຳນວນ 50)',
    'Gold Pro': 'ແພັກເກັດ L3 · 250,000 ₭/1 (ຈຳນວນ 100)',
    'Diamond Founder': 'ແພັກເກັດ L4 · 200,000 ₭/1 (ຈຳນວນ 500)',
    'L5 General Buy': 'ແພັກເກັດ L5 · 380,000 ₭/1 (ຈຳນວນ 1,000 · 0%)',
  };
  return map[pkg] || pkg;
}

