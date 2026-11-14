/**
 * Data models, blueprint validation bounds, and 4-Level Unilevel calculation engine.
 * Synchronized verbatim with firebase-blueprint.json and firestore.rules.
 */

export const VALIDATION_CONSTRAINTS = {
  ID_PATTERN: /^[a-zA-Z0-9_\-]+$/,
  ID_MAX_LENGTH: 128,
  PRODUCT: {
    SKU_MAX: 64,
    NAME_MAX: 120,
    CATEGORY_MAX: 60,
    DESCRIPTION_MAX: 600,
    IMAGE_URL_MAX: 350000,
    PRICE_MAX: 1000000000,
    STOCK_MAX: 1000000,
    REORDER_MAX: 100000,
  },
  DISTRIBUTOR: {
    CODE_MIN: 2,
    CODE_MAX: 32,
    FULL_NAME_MAX: 100,
    VOLUME_MAX: 10000000000,
    EMAIL_MAX: 120,
    PHONE_MAX: 40,
    NATIONAL_ID_MAX: 60,
    BANK_NAME_MAX: 80,
    BANK_ACCOUNT_MAX: 60,
    BANK_Account_NAME_MAX: 100,
    BANK_ACCOUNT_NAME_MAX: 100,
    BANK_QR_DATA_MAX: 2000,
    BANK_QR_MAX: 2000,
    KYC_DOC_TYPE_MAX: 40,
    KYC_DOC_NAME_MAX: 200,
    USERNAME_MAX: 40,
    PASSWORD_MAX: 64,
  },
  ORDER: {
    ORDER_NUMBER_MAX: 40,
    CUSTOMER_NAME_MAX: 100,
    QUANTITY_MAX: 10000,
    PAYMENT_METHOD_MAX: 40,
    PAYMENT_REF_MAX: 100,
  },
  SETTINGS: {
    BRAND_NAME_MAX: 80,
    BRAND_TAGLINE_MAX: 160,
    CURRENCY_MAX: 16,
    RATE_MAX: 50,
    MIN_ACTIVE_PV_MAX: 1000000000,
  },
  ADMIN: {
    FULL_NAME_MAX: 100,
    EMAIL_MIN: 3,
    EMAIL_MAX: 120,
    PERMISSIONS_MAX: 200,
    USERNAME_MAX: 40,
    PASSWORD_MAX: 64,
  },
} as const;

/**
 * Monetary multiplier constant for Lao Kip (₭ LAK).
 * All monetary amounts are formatted strictly in Lao Kip (₭ ກີບ) only.
 */
export const LAK_PER_THB = 600;

export function formatKip(amountBase: number): string {
  const kip = Math.round((Number(amountBase) || 0) * LAK_PER_THB);
  return `${kip.toLocaleString('en-US')} ₭`;
}

export function formatThb(amountBase: number): string {
  return formatKip(amountBase);
}

export function formatMoney(amountBase: number, _currencyMode = '₭'): string {
  return formatKip(amountBase);
}

export function sanitizeString(input: string, maxLength: number): string {
  const trimmed = input.trim();
  return trimmed.slice(0, maxLength);
}

export function sanitizeCode(input: string, maxLength = 32): string {
  const cleaned = input.trim().replace(/[^a-zA-Z0-9_\-]/g, '-');
  const sliced = cleaned.slice(0, maxLength);
  return sliced.length >= 2 ? sliced : 'PARTNER-01';
}

export type ProductStatus = 'active' | 'low_stock' | 'archived';

export interface Product {
  id: string;
  ownerId: string;
  sku: string;
  name: string;
  category: string;
  description: string;
  retailPrice: number;
  memberPrice: number;
  pv: number;
  stock: number;
  reorderLevel: number;
  imageUrl: string;
  status: ProductStatus;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export type DistributorRank =
  | 'Brand Partner'
  | 'Silver Director'
  | 'Gold Director'
  | 'Emerald Executive'
  | 'Diamond Ambassador'
  | (string & {});

export type KycStatus = 'unverified' | 'pending' | 'verified';

export type MemberPackageTier =
  | 'None'
  | 'Bronze Starter'
  | 'Silver Builder'
  | 'Gold Pro'
  | 'Diamond Founder'
  | 'L5 General Buy'
  | string;

export function toFirestoreSafePackageTier(
  tier?: string
): 'None' | 'Bronze Starter' | 'Silver Builder' | 'Gold Pro' | 'Diamond Founder' {
  if (
    tier === 'Bronze Starter' ||
    tier === 'Silver Builder' ||
    tier === 'Gold Pro' ||
    tier === 'Diamond Founder'
  ) {
    return tier;
  }
  return 'None';
}

export interface MemberPackagePlan {
  id: string;
  levelNumber: 1 | 2 | 3 | 4 | 5;
  tier: string;
  nameLo?: string;
  nameEn?: string;
  productId: string;
  quantity: number;
  price: number; // Base price in Thai Baht (THB)
  priceLak: number; // Price in Lao Kip (LAK)
  pv: number; // Synchronized to price (commissions calculated directly on price, no separate PV)
  grantedRank: DistributorRank;
  noCommissionL5?: boolean; // true for L5 General Buy (0% commission)
}

export const MEMBER_PACKAGES: MemberPackagePlan[] = [
  {
    id: 'pkg_l1_bronze',
    levelNumber: 1,
    tier: 'Bronze Starter',
    nameLo: 'ແພັກເກັດ L1 · ລາຄາ 350,000 ₭/1 (ຈຳນວນ 1–50)',
    nameEn: 'Package L1 · 350,000 ₭/1 (Qty 1–50)',
    productId: 'prod_botanical_serum',
    quantity: 50,
    price: 350000 / 600,
    priceLak: 350000,
    pv: 350000 / 600,
    grantedRank: 'Brand Partner',
    noCommissionL5: false,
  },
  {
    id: 'pkg_l2_silver',
    levelNumber: 2,
    tier: 'Silver Builder',
    nameLo: 'ແພັກເກັດ L2 · ລາຄາ 300,000 ₭/1 (ຈຳນວນ 50)',
    nameEn: 'Package L2 · 300,000 ₭/1 (Qty 50)',
    productId: 'prod_collagen_elixir',
    quantity: 50,
    price: 300000 / 600,
    priceLak: 300000,
    pv: 300000 / 600,
    grantedRank: 'Silver Director',
    noCommissionL5: false,
  },
  {
    id: 'pkg_l3_gold',
    levelNumber: 3,
    tier: 'Gold Pro',
    nameLo: 'ແພັກເກັດ L3 · ລາຄາ 250,000 ₭/1 (ຈຳນວນ 100)',
    nameEn: 'Package L3 · 250,000 ₭/1 (Qty 100)',
    productId: 'prod_hydrating_cream',
    quantity: 100,
    price: 250000 / 600,
    priceLak: 250000,
    pv: 250000 / 600,
    grantedRank: 'Gold Director',
    noCommissionL5: false,
  },
  {
    id: 'pkg_l4_diamond',
    levelNumber: 4,
    tier: 'Diamond Founder',
    nameLo: 'ແພັກເກັດ L4 · ລາຄາ 200,000 ₭/1 (ຈຳນວນ 500)',
    nameEn: 'Package L4 · 200,000 ₭/1 (Qty 500)',
    productId: 'prod_essential_oil_kit',
    quantity: 500,
    price: 200000 / 600,
    priceLak: 200000,
    pv: 200000 / 600,
    grantedRank: 'Emerald Executive',
    noCommissionL5: false,
  },
  {
    id: 'pkg_l5_general',
    levelNumber: 5,
    tier: 'L5 General Buy',
    nameLo: 'ແພັກເກັດ L5 · ລາຄາ 380,000 ₭/1 (ຈຳນວນ 1,000 · 0%)',
    nameEn: 'Package L5 · 380,000 ₭/1 (Qty 1000 · 0% Commission)',
    productId: 'prod_pearl_deluxe_spatula',
    quantity: 1000,
    price: 380000 / 600,
    priceLak: 380000,
    pv: 0,
    grantedRank: 'Brand Partner',
    noCommissionL5: true,
  },
];

export function getInitialPackages(): MemberPackagePlan[] {
  return MEMBER_PACKAGES.map((pkg) => ({ ...pkg }));
}

export interface CompanyBankQrMethod {
  id: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  currency: '₭';
  qrPayload: string;
  qrImageUrl?: string;
  status: 'active' | 'inactive';
}

export const DEFAULT_OFFICIAL_PAYMENT_QR_IMAGE_URL =
  './assets/aistudio/PL_Skincare_QR_Code_27bca55d.png';

export const DEFAULT_COMPANY_BANK_QR_METHODS: CompanyBankQrMethod[] = [
  {
    id: 'bank_qr_bcel',
    bankName: 'BCEL One QR',
    accountName: 'PING LAN TRADE IMPORT-EXPORT SOLE CO.,LTD',
    accountNumber: '162-12-xxxxx184',
    currency: '₭',
    qrPayload:
      'LAOQR|BCELONE|162-12-xxxxx184|PING_LAN_TRADE_IMPORT_EXPORT_SOLE_CO_LTD|LAK',
    qrImageUrl: DEFAULT_OFFICIAL_PAYMENT_QR_IMAGE_URL,
    status: 'active',
  },
  {
    id: 'bank_qr_ldb',
    bankName: 'LDB Trust QR',
    accountName: 'PING LAN TRADE IMPORT-EXPORT SOLE CO.,LTD',
    accountNumber: '030-10-00-556677-001',
    currency: '₭',
    qrPayload: 'LAOQR|LDBTRUST|030-10-00-556677-001|PL_SKINCARE_BRAND|LAK',
    qrImageUrl: DEFAULT_OFFICIAL_PAYMENT_QR_IMAGE_URL,
    status: 'active',
  },
  {
    id: 'bank_qr_jdb',
    bankName: 'JDB Yes QR',
    accountName: 'PING LAN TRADE IMPORT-EXPORT SOLE CO.,LTD',
    accountNumber: '010-20-99-334455-008',
    currency: '₭',
    qrPayload: 'LAOQR|JDBYES|010-20-99-334455-008|PL_SKINCARE_BRAND|LAK',
    qrImageUrl: DEFAULT_OFFICIAL_PAYMENT_QR_IMAGE_URL,
    status: 'active',
  },
  {
    id: 'bank_qr_apb',
    bankName: 'APB QR',
    accountName: 'PING LAN TRADE IMPORT-EXPORT SOLE CO.,LTD',
    accountNumber: '020-11-00-778899-001',
    currency: '₭',
    qrPayload: 'LAOQR|APBQR|020-11-00-778899-001|PL_SKINCARE_BRAND|LAK',
    qrImageUrl: DEFAULT_OFFICIAL_PAYMENT_QR_IMAGE_URL,
    status: 'active',
  },
];

export function getInitialBankQrMethods(): CompanyBankQrMethod[] {
  return DEFAULT_COMPANY_BANK_QR_METHODS.map((b) => ({ ...b }));
}

export interface ShippingLogisticsMethod {
  id: string;
  nameEn: string;
  nameLo: string;
  code: string;
  hotline: string;
  defaultBranches: string[];
  deliveryFeeThb: number;
  estimatedDaysLo: string;
  estimatedDaysEn: string;
  status: 'active' | 'inactive';
}

export const DEFAULT_SHIPPING_LOGISTICS_METHODS: ShippingLogisticsMethod[] = [
  {
    id: 'ship_anousith',
    nameEn: 'Anousith Logistics',
    nameLo: 'ອານຸສິດ ຂົນສົ່ງດ່ວນ (Anousith Express)',
    code: 'ANS',
    hotline: '1419 / 020 5555 8899',
    defaultBranches: [
      'ສາຂາ ນະຄອນຫຼວງວຽງຈັນ (Vientiane Capital Main Hub)',
      'ສາຂາ ຈັນທະບູລີ (Chanthabouly Branch)',
      'ສາຂາ ໄຊເສດຖາ (Xaysettha Branch)',
      'ສາຂາ ສີโคດຕະບອງ (Sikhottabong Branch)',
      'ສາຂາ ຫຼວງພະບາງ (Luang Prabang Branch)',
      'ສາຂາ ສະຫວັນນະເຂດ (Savannakhet Branch)',
      'ສາຂາ ປາກເຊ - ຈຳປາສັກ (Pakse Champasak Branch)',
      'ສາຂາ ວັງວຽງ (Vang Vieng Branch)',
    ],
    deliveryFeeThb: 0,
    estimatedDaysLo: 'ຈັດສົ່ງດ່ວນ 1–2 ມື້ທົ່ວປະເທດ',
    estimatedDaysEn: '1–2 Days Express Nationwide',
    status: 'active',
  },
  {
    id: 'ship_hal',
    nameEn: 'HAL Logistics',
    nameLo: 'ຮຸ່ງອາລຸນ ຂົນສົ່ງດ່ວນ (HAL Logistics)',
    code: 'HAL',
    hotline: '1418 / 020 9999 7788',
    defaultBranches: [
      'ສາຂາ ນະຄອນຫຼວງວຽງຈັນ (Vientiane Capital Main Hub)',
      'ສາຂາ ດົງໂດກ (Dongdok Branch)',
      'ສາຂາ ໜອງບອນ (Nongbone Branch)',
      'ສາຂາ ສີສັດຕະນາກ (Sisattanak Branch)',
      'ສາຂາ ຫຼວງພະບາງ (Luang Prabang Branch)',
      'ສາຂາ ສະຫວັນນະເຂດ (Savannakhet Branch)',
      'ສາຂາ ປາກເຊ - ຈຳປາສັກ (Pakse Champasak Branch)',
      'ສາຂາ ທ່າແຂກ - ຄຳມ່ວນ (Thakhek Khammouane Branch)',
    ],
    deliveryFeeThb: 0,
    estimatedDaysLo: 'ຈັດສົ່ງດ່ວນ 1–2 ມື້ທົ່ວປະເທດ',
    estimatedDaysEn: '1–2 Days Express Nationwide',
    status: 'active',
  },
];

export function getInitialShippingMethods(): ShippingLogisticsMethod[] {
  return DEFAULT_SHIPPING_LOGISTICS_METHODS.map((s) => ({
    ...s,
    defaultBranches: [...s.defaultBranches],
  }));
}

export const DEFAULT_COMPANY_LOGO_URL =
  './assets/aistudio/02_478ebe23.jpg';

export interface CompanyCorporateProfile {
  brandNameLo: string;
  brandNameEn: string;
  legalNameLo: string;
  legalNameEn: string;
  addressLo: string;
  addressEn: string;
  phone: string;
  email: string;
  website: string;
  registrationNo: string;
  businessLicenseNo: string;
  taxIdNumber: string;
  bankName: string;
  bankAccountName: string;
  bankAccountNumber: string;
  currencyLabel: string;
  taglineLo: string;
  taglineEn: string;
  aboutLo: string;
  aboutEn: string;
  visionLo: string;
  visionEn: string;
  missionLo: string;
  missionEn: string;
  coreValuesLo: string;
  coreValuesEn: string;
  logoUrl: string;
  qrCodeUrl: string;
}

export const OFFICIAL_DOMAIN_URL = 'https://plskincare.net';

export const DEFAULT_COMPANY_CORPORATE_PROFILE: CompanyCorporateProfile = {
  brandNameLo: 'ແບຣນເຄື່ອງສຳອາງ PL Skincare Brand',
  brandNameEn: 'PL Skincare Brand',
  legalNameLo: 'ບໍລິສັດ ປິ່ງລານ ການຄ້າ ຂາເຂົ້າ-ຂາອອກ ຈຳກັດຜູ້ດຽວ',
  legalNameEn: 'PING LAN TRADE IMPORT-EXPORT SOLE CO.,LTD',
  addressLo: 'ບ້ານຮ່ອງສຸພາບ, ເມືອງໄຊເສດຖາ, ນະຄອນຫຼວງວຽງຈັນ ສປປ ລາວ',
  addressEn: 'Hongsoupap village, Saysetha district, Vientiane Lao PDR',
  phone: '+856 2057759997',
  email: 'soukyathaichanthaly@gmail.com',
  website: 'https://plskincare.net',
  registrationNo: 'ENT-VTE-SAYSETHA-162184',
  businessLicenseNo: 'BL-VTE-01-00162184 / ຈທວ-ນວ',
  taxIdNumber: 'TIN-856-16212184-00',
  bankName: 'BCEL One QR (LAPNet LAO QR)',
  bankAccountName: 'PING LAN TRADE IMPORT-EXPORT SOLE CO.,LTD',
  bankAccountNumber: '162-12-xxxxx184',
  currencyLabel: '₭ ກີບລາວ / LAK / 老币 (Lao Kip Only)',
  taglineLo:
    'ຜະລິດຕະພັນບຳລຸງຜິວໜ້າຄຣີມໄຂ່ມຸກ ແລະ ສະໝຸນໄພທຳມະຊາດລະດັບພຣີມຽມ · ລະບົບຕົວແທນຈຳໜ່າຍ 4 ຊັ້ນ',
  taglineEn:
    'Luxury Pearl & Botanical Skincare · Official 4-Level Partner Distribution Network',
  aboutLo:
    'ບໍລິສັດ ປິ່ງລານ ການຄ້າ ຂາເຂົ້າ-ຂາອອກ ຈຳກັດຜູ້ດຽວ (PL Skincare Brand — https://plskincare.net) ຕັ້ງຢູ່ ບ້ານຮ່ອງສຸພາບ, ເມືອງໄຊເສດຖາ, ນະຄອນຫຼວງວຽງຈັນ ສປປ ລາວ (+856 2057759997). ພວກເຮົາເປັນຜູ້ນຳເຂົ້າ ແລະ ຈັດຈຳໜ່າຍຜະລິດຕະພັນບຳລຸງຜິວໜ້າລະດັບພຣີມຽມ ຄຣີມໄຂ່ມຸກແທ້ PL Pearl Care Face, ຄຣີມກັນແດດ SPF50 PA+++ ແລະ ເຊຣັ່ມບຳລຸງຜິວ ພ້ອມລະບົບຕົວແທນຈຳໜ່າຍ 4 ຊັ້ນ (L1–L4) ແລະ L5 ຊື້ທົ່ວໄປ ບໍລິສັດຂົນສົ່ງທາງການ (Logistics) ຈັດສົ່ງດ່ວນທົ່ວປະເທດ 1–2 ມື້ (L1–L5).',
  aboutEn:
    'PING LAN TRADE IMPORT-EXPORT SOLE CO.,LTD (PL Skincare Brand — https://plskincare.net), headquartered at Hongsoupap village, Saysetha district, Vientiane Lao PDR (+856 2057759997), is an official luxury skincare import-export enterprise in Laos. We specialize in authentic PL Pearl Care Face Creams, SPF50 PA+++ Sunscreens, and Botanical Serums powered by a 4-Level Unilevel Partner Network (L1–L4) and L5 Direct Retail with official nationwide express logistics (1–2 days delivery for L1–L5).',
  visionLo:
    'ກ້າວສູ່ການເປັນຜູ້ນຳອັນດັບ 1 ດ້ານຜະລິດຕະພັນບຳລຸງຜິວໜ້າລະດັບພຣີມຽມ ແລະ ເຄືອຂ່າຍທຸລະກິດຕົວແທນຈຳໜ່າຍທີ່ໝັ້ນຄົງ, ໂປ່ງໃສ ແລະ ຍືນຍົງທີ່ສຸດໃນ ສປປ ລາວ ແລະ ພາກພື້ນອາຊຽນ.',
  visionEn:
    'To become the #1 premier luxury pearl & botanical skincare brand and the most trusted, transparent, and sustainable partner distribution network in Lao PDR and the ASEAN region.',
  missionLo:
    '1) ຄັດສັນ ແລະ ນຳເຂົ້າຜະລິດຕະພັນບຳລຸງຜິວໜ້າຄຸນນະພາບສູງ ປອດໄພ ໄດ້ມາດຕະຖານສາກົນ · 2) ສ້າງອາຊີບ ແລະ ລາຍຮັບທີ່ຍືນຍົງດ້ວຍແຜນຄອມມິດຊັ່ນ 4 ຊັ້ນ (L1 10%, L2 6%, L3 4%, L4 2%) ເປັນເງິນກີບ (₭) · 3) ບໍລິການຈັດສົ່ງດ່ວນທົ່ວປະເທດ 18 ແຂວງ ພາຍໃນ 1–2 ມື້.',
  missionEn:
    '1) Deliver certified, safe, high-efficacy pearl and botanical skincare · 2) Empower Lao entrepreneurs with a fair 4-Level Unilevel compensation plan (L1 10%, L2 6%, L3 4%, L4 2%) in Lao Kip (₭) · 3) Provide 1–2 day express nationwide delivery across all 18 provinces.',
  coreValuesLo:
    'ຄຸນນະພາບແທ້ 100% (Authentic Quality) · ຄວາມໂປ່ງໃສຍຸຕິທຳ (Transparency) · ການເຕີບໂຕຮ່ວມກັນ 4 ຊັ້ນ (Shared Prosperity) · ບໍລິການວ່ອງໄວທົ່ວປະເທດ (Express Service)',
  coreValuesEn:
    '100% Authentic Quality · Transparent Unilevel Ledger · Shared 4-Level Partner Prosperity · Nationwide Express Fulfillment',
  logoUrl: DEFAULT_COMPANY_LOGO_URL,
  qrCodeUrl: DEFAULT_OFFICIAL_PAYMENT_QR_IMAGE_URL,
};

export function getInitialCompanyProfile(): CompanyCorporateProfile {
  return { ...DEFAULT_COMPANY_CORPORATE_PROFILE };
}

export interface SimpleCardQrItem {
  id: string;
  titleLo: string;
  titleEn: string;
  category: 'website' | 'whatsapp' | 'facebook' | 'vcard' | 'catalog';
  qrPayloadText: string;
  subtitleLo: string;
  subtitleEn: string;
  customImageUrl?: string;
}

export const DEFAULT_SIMPLE_CARD_QR_ITEMS: SimpleCardQrItem[] = [
  {
    id: 'sqr_official_website',
    titleLo: 'QR ເວັບໄຊທາງການ https://plskincare.net',
    titleEn: 'Official Website QR (https://plskincare.net)',
    category: 'website',
    qrPayloadText: 'https://plskincare.net',
    subtitleLo: 'ສະແກນເຂົ້າເວັບໄຊ https://plskincare.net',
    subtitleEn: 'Scan for https://plskincare.net',
  },
  {
    id: 'sqr_whatsapp_hotline',
    titleLo: 'QR ຕິດຕໍ່ສາຍດ່ວນ WhatsApp (+856 2057759997)',
    titleEn: 'Official WhatsApp Direct Contact QR (+856 2057759997)',
    category: 'whatsapp',
    qrPayloadText: 'https://wa.me/8562057759997',
    subtitleLo: 'ສະແກນແຊັດ WhatsApp ຝ່າຍບໍລິຫານໂດຍກົງ',
    subtitleEn: 'Scan to Chat on WhatsApp (+856 2057759997)',
  },
  {
    id: 'sqr_digital_vcard',
    titleLo: 'QR ນາມບັດດິຈິຕອນ & ແຜນທີ່ສຳນັກງານໃຫຍ່',
    titleEn: 'Executive Digital vCard & HQ Location QR',
    category: 'vcard',
    qrPayloadText:
      'PING LAN TRADE IMPORT-EXPORT SOLE CO.,LTD | Web: https://plskincare.net | Hongsoupap village, Saysetha district, Vientiane Lao PDR | Tel: +856 2057759997 | Email: soukyathaichanthaly@gmail.com',
    subtitleLo: 'ບັນທຶກເບີໂທ & ເວັບໄຊ https://plskincare.net',
    subtitleEn: 'Save Contact & https://plskincare.net',
  },
];

export function getInitialSimpleCardQrItems(): SimpleCardQrItem[] {
  return DEFAULT_SIMPLE_CARD_QR_ITEMS.map((item) => ({ ...item }));
}

export interface BusinessMarketingPlanStep {
  id: string;
  stepNumber: number;
  badgeLo: string;
  badgeEn: string;
  titleLo: string;
  titleEn: string;
  summaryLo: string;
  summaryEn: string;
  actionPointsLo: string;
  actionPointsEn: string;
  targetKpiLo: string;
  targetKpiEn: string;
  colorTheme: 'gold' | 'emerald' | 'sapphire' | 'crimson' | 'amethyst' | 'teal';
}

export const DEFAULT_BUSINESS_MARKETING_PLAN_STEPS: BusinessMarketingPlanStep[] = [
  {
    id: 'bmp_step_1',
    stepNumber: 1,
    badgeLo: 'ຂັ້ນຕອນທີ 1 · ຮາກຖານບໍລິສັດ & ຜະລິດຕະພັນຫຼັກ',
    badgeEn: 'STEP 01 · CORPORATE FOUNDATION & FLAGSHIP PRODUCTS',
    titleLo: 'ການຈົດທະບຽນຖືກຕ້ອງຕາມກົດໝາຍ ແລະ ຜະລິດຕະພັນຄຸນນະພາບສູງ PL Skincare',
    titleEn: 'Licensed Import-Export Enterprise & Authentic Pearl Skincare Portfolio',
    summaryLo:
      'ບໍລິສັດ ປິ່ງລານ ການຄ້າ ຂາເຂົ້າ-ຂາອອກ ຈຳກັດຜູ້ດຽວ ດຳເນີນທຸລະກິດຢ່າງຖືກຕ້ອງຕາມກົດໝາຍ ສປປ ລາວ ພ້ອມໃບທະບຽນວິສາຫະກິດ ແລະ ເລກປະຈຳຕົວຜູ້ເສຍອາກອນຄົບຖ້ວນ. ຄັດສັນສິນຄ້າຫຼັກທີ່ຕະຫຼາດຕ້ອງການສູງ ແລະ ຊື້ຊ້ຳຕໍ່ເນື່ອງ.',
    summaryEn:
      'PING LAN TRADE IMPORT-EXPORT SOLE CO.,LTD operates with full Business License and Tax ID compliance in Vientiane, Lao PDR, offering high-repeat-purchase luxury skincare products.',
    actionPointsLo:
      '• ຜະລິດຕະພັນເຮືອธງ: ຄຣີມໄຂ່ມຸກແທ້ PL Pearl Care Face Cream, ຄຣີມກັນແດດ SPF50 PA+++ ແລະ ເຊຣັ່ມຟື້ນຟູຜິວ\n• ກຳນົດລາຄາຂາຍຍ່ອຍ (Retail) ແລະ ລາຄາສະມາຊິກ (Member) ຢ່າງຊັດເຈນເປັນເງິນກີບລາວ (₭ LAK)\n• ຄວບຄຸມສະຕ໊ອກສິນຄ້າຈາກສາງໃຫຍ່ ບ້ານຮ່ອງສຸພາບ ເມືອງໄຊເສດຖາ ນະຄອນຫຼວງວຽງຈັນ',
    actionPointsEn:
      '• Flagship SKUs: PL Pearl Care Face Cream, SPF50 PA+++ Sunscreen, and Botanical Repair Serums\n• Transparent Retail Price vs. Member Price structure exclusively in Lao Kip (₭ LAK)\n• Centralized quality & stock control from Hongsoupap village, Saysetha district, Vientiane HQ',
    targetKpiLo: 'ມາດຕະຖານສິນຄ້າແທ້ 100% · ກຳໄລຂາຍຍ່ອຍທັນທີ 20%–35%',
    targetKpiEn: '100% Authentic SKUs · 20%–35% Instant Retail Margin',
    colorTheme: 'gold',
  },
  {
    id: 'bmp_step_2',
    stepNumber: 2,
    badgeLo: 'ຂັ້ນຕອນທີ 2 · ກົນລະຍຸດຂະຫຍາຍຖານລູກຄ້າ & ສະມາຊິກໃໝ່',
    badgeEn: 'STEP 02 · CUSTOMER ACQUISITION & MEMBER CONVERSION',
    titleLo: 'ປ່ຽນລູກຄ້າຊື້ທົ່ວໄປ (L5 Retail) ໃຫ້ກາຍເປັນຕົວແທນຈຳໜ່າຍ (L1–L4)',
    titleEn: 'Converting L5 Direct Retail Customers into Active Brand Partners',
    summaryLo:
      'ເລີ່ມຕົ້ນຈາກການໃຫ້ລູກຄ້າທົດລອງໃຊ້ຜະລິດຕະພັນ PL Skincare ໃນລະດັບ L5 (ຊື້ຍ່ອຍທົ່ວໄປ) ເມື່ອເຫັນຜົນລັບຜິວໜ້າກະຈ່າງໃສຈຶ່ງແນະນຳສິດທິພິເສດໃນການສະໝັກເປັນສະມາຊິກ ເພື່ອຮັບສ່ວນຫຼຸດລາຄາສະມາຊິກ ແລະ ລະຫັດແນະນຳສ່ວນຕົວ.',
    summaryEn:
      'Introduce customers through L5 Retail purchases. Once they experience visible skincare results, upgrade them to registered Members with wholesale pricing and a personal referral code.',
    actionPointsLo:
      '• ລູກຄ້າ L5 ຊື້ໃຊ້ເອງ ປະທັບໃຈຄຸນນະພາບ → ສະໝັກສະມາຊິກຟຣີ ຫຼື ເປີດບິນແພັກເກັດເລີ່ມຕົ້ນ\n• ສະມາຊິກທຸກຄົນໄດ້ຮັບລະຫັດປະຈຳຕົວ (Member ID) ພ້ອມນາມບັດດິຈິຕອນ ແລະ Simple QR Code\n• ຊື້ສິນຄ້າໃນລາຄາສະມາຊິກ (Member Price) ພ້ອມຮັບຄອມມິດຊັ່ນທຸກໃບບິນ',
    actionPointsEn:
      '• L5 Retail trial → High satisfaction → Upgrade to Member tier with wholesale discount\n• Every partner receives a dedicated Member ID, Digital Business Card & Simple QR Code\n• Unlock Member Price savings and earn direct commission on every order',
    targetKpiLo: 'ອັດຕາປ່ຽນລູກຄ້າເປັນຕົວແທນ ≥ 40% ຕໍ່ເດືອນ',
    targetKpiEn: '≥ 40% Retail-to-Partner Conversion Rate',
    colorTheme: 'emerald',
  },
  {
    id: 'bmp_step_3',
    stepNumber: 3,
    badgeLo: 'ຂັ້ນຕອນທີ 3 · ແຜນລາຍຮັບຄອມມິດຊັ່ນ 4 ຊັ້ນ (Unilevel L1–L4)',
    badgeEn: 'STEP 03 · 4-LEVEL UNILEVEL COMMISSION PLAN (L1–L4)',
    titleLo: 'ໂຄງສ້າງການຈ່າຍຄ່າແນະນຳ ແລະ ຄອມມິດຊັ່ນສາຍງານ 4 ຊັ້ນລຶກ ອັດຕະໂນມັດ',
    titleEn: 'Automated 4-Generation Unilevel Commission Distribution (37% Total Commission)',
    summaryLo:
      'ລະບົບຄຳນວນຄ່າຄອມມິດຊັ່ນອັດຕະໂນມັດທັນທີທີ່ມີການສັ່ງຊື້ສິນຄ້າໃນສາຍງານ 4 ຊັ້ນ (L1 ຫາ L4) ຈ່າຍເປັນເງິນກີບລາວ (₭ LAK) ໂປ່ງໃສ ກວດສອບໄດ້ທຸກລາຍການ.',
    summaryEn:
      'Every order automatically triggers real-time Unilevel commissions across up to 4 upline generations, paid transparently in Lao Kip (₭ LAK).',
    actionPointsLo:
      '• ຊັ້ນທີ 1 (L1 ແນະນຳກົງ / Direct Sponsor): ຮັບຄອມມິດຊັ່ນ 15%\n• ຊັ້ນທີ 2 (L2 ລູກທີມຊັ້ນທີ 2 / Generation 2): ຮັບຄອມມິດຊັ່ນ 10%\n• ຊັ້ນທີ 3 (L3 ລູກທີມຊັ້ນທີ 3 / Generation 3): ຮັບຄອມມິດຊັ່ນ 7%\n• ຊັ້ນທີ 4 (L4 ລູກທີມຊັ້ນທີ 4 / Generation 4): ຮັບຄອມມິດຊັ່ນ 5%',
    actionPointsEn:
      '• Tier L1 (Direct Frontline Sponsor): Earn 15% commission\n• Tier L2 (2nd Generation Downline): Earn 10% commission\n• Tier L3 (3rd Generation Downline): Earn 7% commission\n• Tier L4 (4th Generation Downline): Earn 5% commission',
    targetKpiLo: 'ລວມຈ່າຍຄອມມິດຊັ່ນສູງສຸດ 37% (L1: 15% + L2: 10% + L3: 7% + L4: 5%)',
    targetKpiEn: '37% Total Unilevel Commission (15% + 10% + 7% + 5%)',
    colorTheme: 'sapphire',
  },
  {
    id: 'bmp_step_4',
    stepNumber: 4,
    badgeLo: 'ຂັ້ນຕອນທີ 4 · ແພັກເກັດເປີດບິນ & ການເລື່ອນຕຳແໜ່ງຜູ້ນຳ',
    badgeEn: 'STEP 04 · STARTER PACKAGES & LEADERSHIP RANK ADVANCEMENT',
    titleLo: 'ແພັກເກັດເລີ່ມຕົ້ນທຸລະກິດ (Bronze → Diamond) ແລະ ຕຳແໜ່ງຜູ້ນຳ',
    titleEn: 'Business Starter Packages & Executive Career Path',
    summaryLo:
      'ສະມາຊິກສາມາດເລືອກເປີດບິນຕາມແພັກເກັດທີ່ເໝາະສົມ ເພື່ອຮັບສິນຄ້າໄປທຳຕະຫຼາດ ພ້ອມສະສົມຍອດຂາຍສ່ວນຕົວ ແລະ ຍອດຂາຍທີມງານ ເພື່ອຮັບຄອມມິດຊັ່ນ ແລະ ເລື່ອນຕຳແໜ່ງສູ່ຜູ້ນຳລະດັບສູງ.',
    summaryEn:
      'Partners select tailored starter packages to stock inventory and build Personal & Group Sales Volume toward prestigious leadership ranks.',
    actionPointsLo:
      '• 4 ແພັກເກັດເລີ່ມຕົ້ນ: Bronze Starter, Silver Builder, Gold Pro ແລະ Diamond Founder\n• 5 ຕຳແໜ່ງຜູ້ນຳ: Brand Partner → Silver Director → Gold Director → Emerald Executive → Diamond Ambassador\n• ຮັບຄອມມິດຊັ່ນຄົບທັງ 4 ຊັ້ນ (L1 15%, L2 10%, L3 7%, L4 5%) ເປັນເງິນກີບລາວ (₭ LAK)',
    actionPointsEn:
      '• 4 Enrollment Packages: Bronze Starter, Silver Builder, Gold Pro & Diamond Founder\n• 5 Career Ranks: Brand Partner → Silver Director → Gold Director → Emerald Executive → Diamond Ambassador\n• Earn full 4-Level commissions (L1 15%, L2 10%, L3 7%, L4 5%) paid in Lao Kip (₭ LAK)',
    targetKpiLo: 'ສ້າງຜູ້ນຳສາຍງານ Gold & Diamond ທົ່ວປະເທດ',
    targetKpiEn: 'Develop Gold & Diamond Leaders Nationwide',
    colorTheme: 'amethyst',
  },
  {
    id: 'bmp_step_5',
    stepNumber: 5,
    badgeLo: 'ຂັ້ນຕອນທີ 5 · ການຕະຫຼາດອອນລາຍ O2O & ເຄື່ອງມືດິຈິຕອນ',
    badgeEn: 'STEP 05 · OMNICHANNEL DIGITAL MARKETING & QR TOOLS',
    titleLo: 'ກົນລະຍຸດການຕະຫຼາດ Social Media ຄູ່ກັບນາມບັດ Simple QR & ໃບບິນມາດຕະຖານ',
    titleEn: 'Social Commerce, Custom QR Business Cards & Instant Digital Invoicing',
    summaryLo:
      'ສະໜັບສະໜູນຕົວແທນທຸກຄົນດ້ວຍສື່ໂຄສະນາ, ຮູບພາບສິນຄ້າຄົມຊັດ, ນາມບັດບໍລິສັດ 6 ໂທນສີພ້ອມ Simple QR Code (ເວັບໄຊ/WhatsApp/vCard) ແລະ ລະບົບພິມໃບບິນມາດຕະຖານ A4/Thermal 80mm.',
    summaryEn:
      'Equip every distributor with high-converting media assets, 6-theme Business Cards with Simple Contact QR Codes, and instant printable invoices.',
    actionPointsLo:
      '• ໂຄສະນາຜ່ານ Facebook Page, TikTok Live, WhatsApp (+856 2057759997) ແລະ ຕົວແທນແຕ່ລະແຂວງ\n• ໃຊ້ນາມບັດ PL Skincare ພ້ອມ Simple QR Code ໃຫ້ລູກຄ້າສະແກນຕິດຕໍ່ ຫຼື ເບິ່ງແຄັດຕາລ໊ອກທັນທີ\n• ສະມາຊິກສາມາດພິມ ແລະ ດາວໂຫຼດໃບບິນຮັບເງິນ (Print / Download Bill) ໃຫ້ລູກຄ້າໄດ້ທຸກອໍເດີ',
    actionPointsEn:
      '• Multi-channel campaigns across Facebook, TikTok Live, and WhatsApp (+856 2057759997)\n• Distribute luxury Business Cards with Simple Contact/Catalog QR Codes\n• Empower members to print and download official order bills & waybills for every customer',
    targetKpiLo: 'ຂະຫຍາຍການເຂົ້າເຖິງລູກຄ້າອອນລາຍ 100,000+ ຄົນ/ເດືອນ',
    targetKpiEn: '100,000+ Monthly Social & QR Reach',
    colorTheme: 'crimson',
  },
  {
    id: 'bmp_step_6',
    stepNumber: 6,
    badgeLo: 'ຂັ້ນຕອນທີ 6 · ບໍລິສັດຂົນສົ່ງທາງການ (Logistics) & ການບໍລິຫານການເງິນ',
    badgeEn: 'STEP 06 · OFFICIAL EXPRESS LOGISTICS & PAYOUT SETTLEMENT',
    titleLo: 'ບໍລິສັດຂົນສົ່ງທາງການ (Logistics) ຈັດສົ່ງດ່ວນທົ່ວປະເທດ 1–2 ມື້ (L1–L5)',
    titleEn: '1–2 Day Nationwide Express Delivery (L1–L5) & Fast Commission Withdrawal',
    summaryLo:
      'ບໍລິສັດຂົນສົ່ງທາງການ (Logistics) ຈັດສົ່ງດ່ວນທົ່ວປະເທດ 1–2 ມື້ (L1–L5) ພ້ອມລະບຸສາຂາປາຍທາງໃນໃບບິນທຸກໃບ ແລະ ລະບົບຖອນເງິນຄອມມິດຊັ່ນທີ່ໂປ່ງໃສ.',
    summaryEn:
      'Official Logistics partners dispatch orders nationwide within 1–2 days (L1–L5) with branch-level waybill tracking and fast commission settlements.',
    actionPointsLo:
      '• ບໍລິສັດຂົນສົ່ງທາງການ (Logistics) ຈັດສົ່ງດ່ວນທົ່ວປະເທດ 1–2 ມື້ (L1–L5)\n• ໃບບິນລະບຸຊື່ບໍລິສັດຂົນສົ່ງ, ສາຂາປາຍທາງ ແລະ ເບີໂທຜູ້ຮັບຢ່າງຊັດເຈນ\n• ສະມາຊິກສາມາດສົ່ງຄຳຮ້ອງຖອນເງິນຄອມມິດຊັ່ນ ແລະ ກວດສອບປະຫວັດການຈ່າຍເງິນຍ້ອນຫຼັງໄດ້ຕະຫຼອດ 24 ຊົ່ວໂມງ',
    actionPointsEn:
      '• Official Logistics: 1–2 day nationwide express shipping across all 18 provinces (L1–L5)\n• Every printed waybill displays carrier name, destination branch, and recipient phone\n• 24/7 commission ledger transparency and streamlined withdrawal approval in Lao Kip (₭)',
    targetKpiLo: 'ຈັດສົ່ງດ່ວນທົ່ວປະເທດ 1–2 ມື້ (L1–L5) · ເບີກຈ່າຍຄອມມິດຊັ່ນກົງເວລາ 100%',
    targetKpiEn: '1–2 Days Express Delivery (L1–L5) · 100% On-Time Commission Payouts',
    colorTheme: 'teal',
  },
];

export function getInitialBusinessMarketingPlanSteps(): BusinessMarketingPlanStep[] {
  return DEFAULT_BUSINESS_MARKETING_PLAN_STEPS.map((step) => ({ ...step }));
}

export interface ProductBrochureItem {
  id: string;
  sku: string;
  badgeLo: string;
  badgeEn: string;
  nameLo: string;
  nameEn: string;
  categoryLo: string;
  categoryEn: string;
  netWeight: string;
  retailPriceLak: number;
  memberPriceLak: number;
  commissionNoteLo: string;
  commissionNoteEn: string;
  highlightsLo: string;
  highlightsEn: string;
  ingredientsLo: string;
  ingredientsEn: string;
  howToUseLo: string;
  howToUseEn: string;
  imageUrl: string;
  colorTheme: 'gold' | 'emerald' | 'sapphire' | 'crimson' | 'amethyst' | 'teal';
}

export const DEFAULT_PRODUCT_BROCHURE_ITEMS: ProductBrochureItem[] = [
  {
    id: 'brochure_pearl_cream_20g',
    sku: 'PL-L1-PEARL',
    badgeLo: 'ຊັ້ນ L1 · ລາຄາ 350,000 ₭/1 · ຈຳນວນ 1–50',
    badgeEn: 'TIER L1 · 350,000 ₭/1 · QTY 1–50',
    nameLo: 'L1 ຄຣີມໄຂ່ມຸກ PL Pearl Care Face 20g (350,000 ₭/1 · ຈຳນວນ 1–50)',
    nameEn: 'L1 PL Pearl Care Face Cream 20g (350,000 ₭/1 · Qty 1–50)',
    categoryLo: 'ຄຣີມໄຂ່ມຸກບຳລຸງຜິວໜ້າ (Pearl Facial Cream)',
    categoryEn: 'Luxury Pearl Facial Rejuvenation Cream',
    netWeight: '20g · Qty: 1–50 (350,000 ₭/1)',
    retailPriceLak: 350000,
    memberPriceLak: 350000,
    commissionNoteLo:
      'ລາຄາ L1: 350,000 ₭/1 (ຈຳນວນ 1–50) · ຄອມມິດຊັ່ນ 4 ຊັ້ນຈ່າຍລາຍເດືອນ: L1 15% · L2 10% · L3 7% · L4 5%',
    commissionNoteEn:
      'L1 Price: 350,000 ₭/1 (Qty 1–50) · 4-Level Monthly Commission: L1 15% · L2 10% · L3 7% · L4 5%',
    highlightsLo:
      '• ຟື້ນຟູຜິວໜ້າທີ່หมອງຄ້ຳໃຫ້ຂາວກະຈ່າງໃສຢ່າງເປັນທຳມະຊາດ\n• ຫຼຸດเลือนຝ້າ, ກະ, ຈຸດດ່າງດຳ ແລະ ຮອຍສິວໃຫ້ຈາງລົງ\n• ກະຊັບຮູຂຸມຂົນ ປັບຜິວໜ້າໃຫ້ລຽບນຽນ ຊຸ່ມຊື່ນອิ่มນ້ຳ',
    highlightsEn:
      '• Restores radiant, luminous complexion with natural pearl extract\n• Visibly fades dark spots, melasma, freckles, and post-acne marks\n• Refines pore texture and locks in deep 24-hour hydration',
    ingredientsLo:
      'ສານສະກັດໄຂ່ມຸກທຳມະຊາດແທ້ 100%, ວິຕາມິນ B3 (Niacinamide), ຄອລລາເຈນເຂັ້ມຂຸ້ນ ແລະ ສານສະກັດດອກໄມ້ທຳມະຊາດ',
    ingredientsEn:
      '100% Pure Hydrolyzed Pearl Extract, Vitamin B3 (Niacinamide), Marine Collagen & Botanical Essences',
    howToUseLo:
      'ທາບຳລຸງທົ່ວໃບໜ້າ ແລະ ລຳຄໍ ຫຼັງລ້າງໜ້າທຸກເຊົ້າ ແລະ ກ່ອນນອນ ເປັນປະຈຳທຸກวัน',
    howToUseEn:
      'Apply gently over cleansed face and neck every morning and evening before bedtime.',
    imageUrl: './assets/aistudio/12_2f3b8bcc.jpg',
    colorTheme: 'gold',
  },
  {
    id: 'brochure_sunscreen_isolation',
    sku: 'PL-L2-PEARL',
    badgeLo: 'ຊັ້ນ L2 · ລາຄາ 300,000 ₭/1 · ຈຳນວນ 50',
    badgeEn: 'TIER L2 · 300,000 ₭/1 · QTY 50',
    nameLo: 'L2 ຄຣີມໄຂ່ມຸກ PL Pearl Care Face 20g (300,000 ₭/1 · ຈຳນວນ 50)',
    nameEn: 'L2 PL Pearl Care Face Cream 20g (300,000 ₭/1 · Qty 50)',
    categoryLo: 'ຄຣີມໄຂ່ມຸກບຳລຸງຜິວໜ້າ (Pearl Facial Cream)',
    categoryEn: 'Luxury Pearl Facial Rejuvenation Cream',
    netWeight: '20g · Qty: 50 (300,000 ₭/1)',
    retailPriceLak: 300000,
    memberPriceLak: 300000,
    commissionNoteLo:
      'ລາຄາ L2: 300,000 ₭/1 (ຈຳນວນ 50) · ຄອມມິດຊັ່ນ 4 ຊັ້ນຈ່າຍລາຍເດືອນ: L1 15% · L2 10% · L3 7% · L4 5%',
    commissionNoteEn:
      'L2 Price: 300,000 ₭/1 (Qty 50) · 4-Level Monthly Commission: L1 15% · L2 10% · L3 7% · L4 5%',
    highlightsLo:
      '• ປົກປ້ອງຜິວຈາກລັງສີ UVA/UVB ແລະ ມົນລະພິດຕະຫຼອດມື້\n• ປັບສີຜິວໃຫ້ຂາວໃສຂຶ້ນ 1 ລະດັບທັນທີທີ່ທາ ບໍ່ວອກ ບໍ່เหนียว\n• ເຕີມຄວາມຊຸ່ມຊື່ນ ແລະ ລ໊ອກເຄື່ອງສຳອາງໃຫ້ຕິດທົນນານ',
    highlightsEn:
      '• Broad-spectrum UVA/UVB shield against harsh tropical sunlight\n• Instant natural tone-up effect with featherlight, non-greasy finish\n• Doubles as a hydrating makeup primer for all-day radiance',
    ingredientsLo:
      'ສານກັນແດດປະສິດທິພາບສູງ SPF50 PA+++, ສານສະກັດໄຂ່ມຸກ, ไฮຍາລູໂຣນິກ (Hyaluronic Acid) ແລະ ວິຕາມິນ E',
    ingredientsEn:
      'Broad-Spectrum UV Filters SPF50 PA+++, Pearl Essence, Hyaluronic Acid & Vitamin E',
    howToUseLo:
      'ທາທົ່ວໃບໜ້າ ແລະ ລຳຄໍ ກ່ອນອອກແດດ 15 ນາທີ ທຸກເຊົ້າ (ສາມາດທaziທັບລະຫວ່າງມື້ໄດ້)',
    howToUseEn:
      'Smooth evenly over face and neck 15 minutes before sun exposure every morning.',
    imageUrl: './assets/aistudio/01_44092b0f.jpg',
    colorTheme: 'emerald',
  },
  {
    id: 'brochure_luxury_gift_box',
    sku: 'PL-L3-PEARL',
    badgeLo: 'ຊັ້ນ L3 · ລາຄາ 250,000 ₭/1 · ຈຳນວນ 100',
    badgeEn: 'TIER L3 · 250,000 ₭/1 · QTY 100',
    nameLo: 'L3 ຄຣີມໄຂ່ມຸກ PL Pearl Care Face 20g (250,000 ₭/1 · ຈຳນວນ 100)',
    nameEn: 'L3 PL Pearl Care Face Cream 20g (250,000 ₭/1 · Qty 100)',
    categoryLo: 'ຄຣີມໄຂ່ມຸກບຳລຸງຜິວໜ້າ (Luxury Gift Set)',
    categoryEn: 'Collector Pearl Cream & Gold-Embossed Box',
    netWeight: '20g · Qty: 100 (250,000 ₭/1)',
    retailPriceLak: 250000,
    memberPriceLak: 250000,
    commissionNoteLo:
      'ລາຄາ L3: 250,000 ₭/1 (ຈຳນວນ 100) · ຄອມມິດຊັ່ນ 4 ຊັ້ນຈ່າຍລາຍເດືອນ: L1 15% · L2 10% · L3 7% · L4 5%',
    commissionNoteEn:
      'L3 Price: 250,000 ₭/1 (Qty 100) · 4-Level Monthly Commission: L1 15% · L2 10% · L3 7% · L4 5%',
    highlightsLo:
      '• ບັນຈຸພັນກະປຸກຝາຄຣິສຕັດສີທອງ ມາພ້ອມບ່ວງຕັກຄຣີມສະອາດປອດໄພ\n• ຟື້ນຟູຜິວໜ້າລະດັບพรີມຽມ ໃຫ້ຜິວເດັ້ງ ອ່ອນเยາວ ກະຈ່າງໃສ\n• ເໝາະສຳລັບໃຊ້ເອງ ຫຼື ມອບເປັນຂອງຂວັນລະດັບ VIP',
    highlightsEn:
      '• Faceted crystal-gold jar paired with a hygienic gold spatula and embossed gift box\n• Intensive overnight cellular renewal for youthful, glass-skin glow\n• Ideal for personal luxury skincare or VIP gifting',
    ingredientsLo:
      'ໄຂ່ມຸກທະເລນ້ຳລຶກຄັດພິເສດ, ອາບູຕິນ (Alpha Arbutin), ຄອລລາເຈນທອງຄຳ ແລະ ເຊຣາໄມດ໌ (Ceramide)',
    ingredientsEn:
      'Deep-Sea Pearl Powder, Alpha Arbutin, Golden Peptides & Skin-Barrier Ceramides',
    howToUseLo:
      'ໃຊ້ບ່ວງຕັກເນື້ອຄຣີມຂະໜາດເທົ່າເມັດໄຂ່ມຸກ ແຕ້ມ 5 ຈຸດເທິງໃບໜ້າ ແລ້ວນວດເບົາໆຈົນຊຶມເຂົ້າຜິວ',
    howToUseEn:
      'Scoop a pearl-sized amount using the spatula, dot onto 5 facial zones, and massage gently.',
    imageUrl: './assets/aistudio/05_660aaf46.jpg',
    colorTheme: 'sapphire',
  },
  {
    id: 'brochure_signature_duo_set',
    sku: 'PL-L4-PEARL',
    badgeLo: 'ຊັ້ນ L4 · ລາຄາ 200,000 ₭/1 · ຈຳນວນ 500',
    badgeEn: 'TIER L4 · 200,000 ₭/1 · QTY 500',
    nameLo: 'L4 ຄຣີມໄຂ່ມຸກ PL Pearl Care Face 20g (200,000 ₭/1 · ຈຳນວນ 500)',
    nameEn: 'L4 PL Pearl Care Face Cream 20g (200,000 ₭/1 · Qty 500)',
    categoryLo: 'ແພັກເກັດຕົວແທນຈຳໜ່າຍ (Wholesale Packages)',
    categoryEn: 'Master Distributor Wholesale Tier',
    netWeight: '20g · Qty: 500 (200,000 ₭/1)',
    retailPriceLak: 200000,
    memberPriceLak: 200000,
    commissionNoteLo:
      'ລາຄາ L4: 200,000 ₭/1 (ຈຳນວນ 500) · ຄອມມິດຊັ່ນ 4 ຊັ້ນຈ່າຍລາຍເດືອນ: L1 15% · L2 10% · L3 7% · L4 5%',
    commissionNoteEn:
      'L4 Price: 200,000 ₭/1 (Qty 500) · 4-Level Monthly Commission: L1 15% · L2 10% · L3 7% · L4 5%',
    highlightsLo:
      '• ຈັບຄູ່ບຳລຸງຜິວໜ້າ + ປົກປ້ອງແສງແດດ ຄົບຈົບໃນເຊັດດຽວ ເຫັນຜົນໄວຂຶ້ນ 2 ເທົ່າ\n• ຕອນເຊົ້າບຳລຸງດ້ວຍຄຣີມໄຂ່ມຸກ + ທາທັບດ້ວຍກັນແດດ PL Sunscreen Isolation\n• ຕອນກາງຄືນຟື້ນຟູຜິວຢ່າງລ້ຳລຶກດ້ວຍຄຣີມໄຂ່ມຸກ PL Pearl Care Face',
    highlightsEn:
      '• Complete 24-hour regimen combining deep pearl nourishment and UV isolation\n• Morning: Apply Pearl Cream followed by Sunscreen Isolation for radiant protection\n• Night: Intensive Pearl Cream repair while you sleep',
    ingredientsLo:
      'ຄົບສູດສານສະກັດໄຂ່ມຸກແທ້ + ກັນແດດ SPF50 PA+++ + ວິຕາມິນບຳລຸງຜິວຂາວກະຈ່າງໃສ',
    ingredientsEn:
      'Full-spectrum Hydrolyzed Pearl Complex + SPF50 PA+++ UV Isolation + Multi-Vitamins',
    howToUseLo:
      'ໃຊ້ຄູ່ກັນທຸກເຊົ້າ (ຄຣີມໄຂ່ມຸກ + ກັນແດດ) ແລະ ກ່ອນນອນ (ຄຣີມໄຂ່ມຸກ) ເພື່ອຜົນລັບສູງສຸດ',
    howToUseEn:
      'Use together every morning (Pearl Cream + Sunscreen) and night (Pearl Cream) for maximum glow.',
    imageUrl: './assets/aistudio/9f777724-af65-4fc4-a8e9-70cfe3546b74_44092b0f.jpg',
    colorTheme: 'amethyst',
  },
  {
    id: 'brochure_silky_pearl_open',
    sku: 'PL-L5-PEARL',
    badgeLo: 'ຊັ້ນ L5 · ລາຄາ 380,000 ₭/1 · ຈຳນວນ 1,000',
    badgeEn: 'TIER L5 · 380,000 ₭/1 · QTY 1000',
    nameLo: 'L5 ຄຣີມໄຂ່ມຸກ PL Pearl Care Face 20g (380,000 ₭/1 · ຈຳນວນ 1,000)',
    nameEn: 'L5 PL Pearl Care Face Cream Retail (380,000 ₭/1 · Qty 1000)',
    categoryLo: 'ຄຣີມໄຂ່ມຸກບຳລຸງຜິວໜ້າ (Pearl Facial Cream)',
    categoryEn: 'Concentrated Velvety Pearl Formula',
    netWeight: '20g · Qty: 1,000 (380,000 ₭/1)',
    retailPriceLak: 380000,
    memberPriceLak: 380000,
    commissionNoteLo:
      'ລາຄາ L5: 380,000 ₭/1 (ຈຳນວນ 1,000 · ຊື້ທົ່ວໄປ 0% ຄອມມິດຊັ່ນ)',
    commissionNoteEn:
      'L5 Price: 380,000 ₭/1 (Qty 1000 · Direct Retail 0% Commission)',
    highlightsLo:
      '• ເນື້ອຄຣີມສີໄຂ່ມຸກນຽນລະອຽດ ຊຶມເຂົ້າສູ່ຜິວທັນທີ ບໍ່ອຸດຕັນຮູຂຸມຂົນ\n• ອ່ອນໂຍນຕໍ່ທຸກສະພາບຜິວ ລວມເຖິງຜິວແພ້ງ່າຍ\n• ຊ່ວຍໃຫ້ຜິວໜ້າອ່ອນເຍົາ ຕຶງກະຊັບ ແລະ ເງົາງາມ',
    highlightsEn:
      '• Ultra-fine velvety pearl emulsion absorbs rapidly without clogging pores\n• Gentle formulation suitable for all skin types including sensitive skin\n• Promotes firm, supple, and luminous complexion',
    ingredientsLo:
      'ໄຂ່ມຸກແທ້ບົດລະອຽດລະດັບນາໂນ, ສານສະກັດใบบัวบก (Centella) ແລະ ວິຕາມິນ B5',
    ingredientsEn:
      'Nano-Micronized Pearl Powder, Centella Asiatica Extract & Panthenol (Vitamin B5)',
    howToUseLo:
      'ທາບຳລຸງຜິວໜ້າເຊົ້າ-ແລງ ໂດຍເນັ້ນບໍລິເວນທີ່ມີຈຸດດ່າງດຳ ຫຼື ຜິວແຫ້ງກ້ານ',
    howToUseEn:
      'Apply morning and night, focusing extra care on areas with uneven tone or dryness.',
    imageUrl: './assets/aistudio/07_9f4fa4fd.jpg',
    colorTheme: 'crimson',
  },
];

export function getInitialProductBrochureItems(): ProductBrochureItem[] {
  return DEFAULT_PRODUCT_BROCHURE_ITEMS.map((item) => ({ ...item }));
}

export type KycDocType =
  | 'national_id'
  | 'id_card'
  | 'passport'
  | 'driver_license';

export interface Distributor {
  id: string;
  ownerId: string;
  code: string;
  fullName: string;
  rank: DistributorRank;
  sponsorId: string; // 'ROOT' or parent distributor ID
  levelDepth: number; // 0 = Brand Root / Frontline leader, 1..4+ = downline generations
  personalSalesVolume: number;
  groupSalesVolume: number;
  totalCommissionEarned: number;
  pendingPayout: number;
  paidOutTotal: number;
  status: 'active' | 'suspended';
  email?: string;
  phone?: string;
  nationalId?: string;
  bankName?: string;
  bankAccount?: string;
  bankAccountName?: string;
  bankQrData?: string;
  kycDocType?: KycDocType;
  kycDocName?: string;
  kycStatus?: KycStatus;
  activePackage?: MemberPackageTier;
  username?: string;
  password?: string;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface CartItem {
  id: string;
  kind: 'package' | 'product';
  packageTier?: string;
  productId: string;
  titleLo: string;
  titleEn: string;
  unitPrice: number; // in THB base
  quantity: number;
}

export interface WithdrawalRequest {
  id: string;
  memberId: string;
  memberCode: string;
  memberName: string;
  amountThb: number; // in THB base (converted via money() to Kip or THB)
  bankName: string;
  bankAccount: string;
  bankAccountName: string;
  bankQrData: string;
  note: string;
  status: 'pending' | 'approved_paid' | 'rejected';
  requestedAt: string;
}

export interface Order {
  id: string;
  ownerId: string;
  orderNumber: string;
  customerName: string;
  orderType: 'retail' | 'member';
  referringDistributorId: string;
  referringDistributorName: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  totalPv: number;
  totalCommissionGenerated: number;
  status: 'processing' | 'fulfilled' | 'cancelled';
  paymentMethod?: string;
  paymentRef?: string;
  shippingProvider?: string;
  shippingBranch?: string;
  shippingPhone?: string;
  shippingTrackingNo?: string;
  orderDate?: string; // YYYY-MM-DD date for Daily Order Bill Report
  createdAt?: unknown;
  updatedAt?: unknown;
}

export function getOrderDateString(order: Order): string {
  if (order.orderDate && /^\d{4}-\d{2}-\d{2}/.test(order.orderDate.trim())) {
    return order.orderDate.trim().slice(0, 10);
  }
  if (typeof order.createdAt === 'string' && /^\d{4}-\d{2}-\d{2}/.test(order.createdAt)) {
    return order.createdAt.slice(0, 10);
  }
  if (
    order.createdAt &&
    typeof order.createdAt === 'object' &&
    'toDate' in order.createdAt &&
    typeof (order.createdAt as { toDate: () => Date }).toDate === 'function'
  ) {
    try {
      return (order.createdAt as { toDate: () => Date })
        .toDate()
        .toISOString()
        .slice(0, 10);
    } catch {
      // fallback below
    }
  }
  return new Date().toISOString().slice(0, 10);
}

export function extractOrderShippingInfo(order: Order): {
  provider: string;
  branch: string;
  phone: string;
  trackingNo: string;
  cleanPaymentRef: string;
} {
  const rawRef = order.paymentRef || '';
  if (rawRef.includes('|SHIP:')) {
    const [payPart, shipPart] = rawRef.split('|SHIP:');
    const [prov, br, ph, trk] = (shipPart || '').split('~');
    return {
      provider: order.shippingProvider || prov || 'Anousith Logistics',
      branch:
        order.shippingBranch ||
        br ||
        'ສາຂາ ນະຄອນຫຼວງວຽງຈັນ (Vientiane Capital)',
      phone: order.shippingPhone || ph || '020 5588 9911',
      trackingNo:
        order.shippingTrackingNo ||
        trk ||
        `ANS-${order.orderNumber.replace(/[^0-9]/g, '') || '1001'}`,
      cleanPaymentRef: payPart || 'VERIFIED',
    };
  }
  const defaultProvider =
    order.shippingProvider ||
    (order.orderNumber.endsWith('2') ? 'HAL Logistics' : 'Anousith Logistics');
  const prefix = defaultProvider.toLowerCase().includes('hal') ? 'HAL' : 'ANS';
  return {
    provider: defaultProvider,
    branch:
      order.shippingBranch || 'ສາຂາ ນະຄອນຫຼວງວຽງຈັນ (Vientiane Main Hub)',
    phone: order.shippingPhone || '020 5588 9911',
    trackingNo:
      order.shippingTrackingNo ||
      `${prefix}-${order.orderNumber.replace(/[^0-9]/g, '') || '1001'}88`,
    cleanPaymentRef: rawRef || 'VERIFIED',
  };
}

export interface Commission {
  id: string;
  ownerId: string;
  orderId: string;
  orderNumber: string;
  beneficiaryId: string;
  beneficiaryName: string;
  sourceDistributorId: string;
  sourceDistributorName: string;
  unilevelTier: 1 | 2 | 3 | 4;
  percentageRate: number;
  basePv: number;
  commissionAmount: number;
  payoutStatus: 'pending' | 'paid' | 'voided';
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface BrandPlanSettings {
  id: string;
  ownerId: string;
  brandName: string;
  brandTagline: string;
  currencySymbol: string;
  level1Rate: number;
  level2Rate: number;
  level3Rate: number;
  level4Rate: number;
  minActivePv: number;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface CalculatedTierPayout {
  unilevelTier: 1 | 2 | 3 | 4;
  beneficiary: Distributor;
  percentageRate: number;
  basePv: number;
  commissionAmount: number;
}

/**
 * Walks up the Unilevel sponsor genealogy up to 4 levels from the referring distributor:
 * - Level 1: The direct referring distributor who made/referred the sale
 * - Level 2: The referring distributor's direct sponsor (upline 1)
 * - Level 3: Second-generation upline sponsor (upline 2)
 * - Level 4: Third-generation upline sponsor (upline 3)
 */
export function isGeneralBuyerL5(d?: Distributor | null): boolean {
  if (!d) return false;
  return (
    d.id === 'dist_l5_amara' ||
    (d.username || '').toUpperCase() === 'L5' ||
    d.code.toUpperCase().endsWith('-L5') ||
    d.levelDepth >= 5
  );
}

export function calculateUnilevelSplit(
  referringDistributorId: string,
  totalPv: number,
  distributors: Distributor[],
  settings: BrandPlanSettings
): CalculatedTierPayout[] {
  const distMap = new Map<string, Distributor>();
  distributors.forEach((d) => distMap.set(d.id, d));

  // L5 is for General Buy only — No Commission is generated or paid for L5
  const initialBuyer = distMap.get(referringDistributorId);
  if (isGeneralBuyerL5(initialBuyer)) {
    return [];
  }

  const rates: [1 | 2 | 3 | 4, number][] = [
    [1, settings.level1Rate],
    [2, settings.level2Rate],
    [3, settings.level3Rate],
    [4, settings.level4Rate],
  ];

  const payouts: CalculatedTierPayout[] = [];
  let currentId: string | undefined = referringDistributorId;

  const rootFallback =
    distMap.get('dist_root') ||
    distributors.find((d) => d.sponsorId === 'ROOT') ||
    distributors[0];

  for (const [tier, rate] of rates) {
    const distributor: Distributor | undefined =
      currentId && currentId !== 'ROOT'
        ? distMap.get(currentId) || rootFallback
        : rootFallback;
    if (!distributor) break;

    if (
      !isGeneralBuyerL5(distributor) &&
      distributor.status === 'active' &&
      rate > 0 &&
      totalPv > 0
    ) {
      const rawAmount = (totalPv * rate) / 100;
      const commissionAmount = Math.round(rawAmount * 100) / 100;
      payouts.push({
        unilevelTier: tier,
        beneficiary: distributor,
        percentageRate: rate,
        basePv: totalPv,
        commissionAmount,
      });
    }

    currentId =
      distributor.sponsorId && distributor.sponsorId !== 'ROOT'
        ? distributor.sponsorId
        : 'ROOT';
  }

  return payouts;
}

export function determineRank(
  personalSales: number,
  groupSales: number
): DistributorRank {
  const combined = personalSales + groupSales;
  if (combined >= 50000) return 'Diamond Ambassador';
  if (combined >= 25000) return 'Emerald Executive';
  if (combined >= 12000) return 'Gold Director';
  if (combined >= 4500) return 'Silver Director';
  return 'Brand Partner';
}

export function getInitialSettings(ownerId: string): BrandPlanSettings {
  return {
    id: 'default_plan',
    ownerId,
    brandName: 'PL Skincare Brand',
    brandTagline:
      'PL Skincare Brand · 4 ແພັກເກັດ 4 ຊັ້ນ · ລະບົບຄິດໄລ່ເງິນຄ່າຄອມມິດຊັ່ນ 4 ຊັ້ນ (15% / 10% / 7% / 5%)',
    currencySymbol: '₭',
    level1Rate: 15,
    level2Rate: 10,
    level3Rate: 7,
    level4Rate: 5,
    minActivePv: 350000 / 600,
  };
}

export const DEFAULT_PRODUCT_CATEGORIES: string[] = [
  'Pearl Facial Cream / ຄຣີມໄຂ່ມຸກບຳລຸງຜິວໜ້າ',
  'Sunscreen & Isolation / ຄຣີມກັນແດດບຳລຸງຜິວ',
  'Skincare Sets / ຊຸດເຊັດບຳລຸງຜິວ',
  'Wholesale Packages / ແພັກເກັດຕົວແທນຈຳໜ່າຍ',
];

export interface BrandGalleryAsset {
  url: string;
  labelLo: string;
  labelEn: string;
}

export const PL_BRAND_IMAGE_GALLERY: BrandGalleryAsset[] = [
  {
    url: './assets/aistudio/01_44092b0f.jpg',
    labelLo: 'PL Pearl Care Face & Sunscreen Isolation (ຮູບແຄມເປນຫຼັກ)',
    labelEn: 'PL Pearl Care Face & Sunscreen Isolation (Campaign Hero)',
  },
  {
    url: './assets/aistudio/12_2f3b8bcc.jpg',
    labelLo: 'PL Pearl Brightening Cream 20g (ກະປຸກຄຣິສຕັດທອງຄຳ)',
    labelEn: 'PL Pearl Brightening Cream 20g (Crystal Gold Jar)',
  },
  {
    url: './assets/aistudio/05_660aaf46.jpg',
    labelLo: 'PL Skincare Luxury ກະປຸກຄຣີມໄຂ່ມຸກ & ກ່ອງໄຂ່ມຸກ',
    labelEn: 'PL Skincare Luxury Jar on Pearl Shell Box',
  },
  {
    url: './assets/aistudio/07_9f4fa4fd.jpg',
    labelLo: 'PL Skincare Luxury ກະປຸກເປີດຝາພ້ອມບ່ວງຕັກຄຣີມ & ກ່ອງ',
    labelEn: 'PL Skincare Luxury Jar with Spatula & Gift Box',
  },
  {
    url: './assets/aistudio/08_a532a5c0.jpg',
    labelLo: 'PL Skincare Luxury ເນື້ອຄຣີມໄຂ່ມຸກແທ້ & ກ່ອງພຣີມຽມ',
    labelEn: 'PL Skincare Luxury Open Pearl Cream Texture & Box',
  },
  {
    url: './assets/aistudio/09_3c50ff26.jpg',
    labelLo: 'PL Pearl Cream ກະປຸກເປີດຝາຄຣິສຕັດ (Close-up)',
    labelEn: 'PL Pearl Cream Open Jar & Faceted Crystal Lid',
  },
  {
    url: './assets/aistudio/10_7e2cdb70.jpg',
    labelLo: 'PL Pearl Cream ກະປຸກແກ້ວສີທອງຝາຄຣິສຕັດ',
    labelEn: 'PL Pearl Cream Amber Gold Jar & Crystal Cap',
  },
  {
    url: './assets/aistudio/06_516d95d8.jpg',
    labelLo: 'PL Skincare ກ່ອງໄຂ່ມຸກແທ້ & ລັງສິນຄ້າສາງໃຫຍ່',
    labelEn: 'PL Skincare Pearl Box & Warehouse Master Cartons',
  },
  {
    url: './assets/aistudio/9f777724-af65-4fc4-a8e9-70cfe3546b74_44092b0f.jpg',
    labelLo: 'ຊຸດຄູ່ PL Pearl Care Face & Sunscreen Isolation Set',
    labelEn: 'PL Pearl Care Face & Sunscreen Isolation Duo Set',
  },
  {
    url: './assets/aistudio/03_c2cbb841.jpg',
    labelLo: 'ຜູ້ກໍ່ຕັ້ງແບຣນ PL Skincare & ຄັງສິນຄ້າລາຍໃຫຍ່',
    labelEn: 'PL Skincare Brand Founder & Master Stock Showcase',
  },
  {
    url: './assets/aistudio/04_32ba23a0.jpg',
    labelLo: 'ສາງສິນຄ້າລາຍໃຫຍ່ PL Skincare ພ້ອມຈັດສົ່ງທົ່ວປະເທດ',
    labelEn: 'PL Skincare Wholesale Distribution Center',
  },
  {
    url: './assets/aistudio/02_478ebe23.jpg',
    labelLo: 'ໂລໂກ້ທາງການ PL SKINCARE ສີທອງຄຳ',
    labelEn: 'PL SKINCARE Official Gold Crescent Emblem Logo',
  },
];

export function getInitialProducts(ownerId: string): Product[] {
  return [
    {
      id: 'prod_botanical_serum',
      ownerId,
      sku: 'PL-L1-PEARL',
      name: 'L1 ຄຣີມໄຂ່ມຸກ PL Pearl Care Face (350,000 ₭/1 · ຈຳນວນ 1–50) / L1 PL Pearl Care Face Cream (350,000 ₭/1 · Qty 1–50)',
      category: 'Pearl Facial Cream / ຄຣີມໄຂ່ມຸກບຳລຸງຜິວໜ້າ',
      description:
        'ຊັ້ນ L1 ລາຄາ 350,000 ກີບ/1 (ຈຳນວນ 1–50 ກ່ອງ) · ຄອມມິດຊັ່ນ 4 ຊັ້ນຈ່າຍລາຍເດືອນ: L1 15% · L2 10% · L3 7% · L4 5% · L1 Price: 350,000 kip/1 (Qty 1–50) with monthly commission.',
      retailPrice: 350000 / 600,
      memberPrice: 350000 / 600,
      pv: 350000 / 600,
      stock: 50,
      reorderLevel: 10,
      imageUrl: './assets/aistudio/12_2f3b8bcc.jpg',
      status: 'active',
    },
    {
      id: 'prod_collagen_elixir',
      ownerId,
      sku: 'PL-L2-PEARL',
      name: 'L2 ຄຣີມໄຂ່ມຸກ PL Pearl Care Face (300,000 ₭/1 · ຈຳນວນ 50) / L2 PL Pearl Care Face Cream (300,000 ₭/1 · Qty 50)',
      category: 'Pearl Facial Cream / ຄຣີມໄຂ່ມຸກບຳລຸງຜິວໜ້າ',
      description:
        'ຊັ້ນ L2 ລາຄາ 300,000 ກີບ/1 (ຈຳນວນ 50 ກ່ອງ) · ຄອມມິດຊັ່ນ 4 ຊັ້ນຈ່າຍລາຍເດືອນ: L1 15% · L2 10% · L3 7% · L4 5% · L2 Price: 300,000 kip/1 (Qty 50) with monthly commission.',
      retailPrice: 300000 / 600,
      memberPrice: 300000 / 600,
      pv: 300000 / 600,
      stock: 50,
      reorderLevel: 10,
      imageUrl: './assets/aistudio/01_44092b0f.jpg',
      status: 'active',
    },
    {
      id: 'prod_hydrating_cream',
      ownerId,
      sku: 'PL-L3-PEARL',
      name: 'L3 ຄຣີມໄຂ່ມຸກ PL Pearl Care Face (250,000 ₭/1 · ຈຳນວນ 100) / L3 PL Pearl Care Face Cream (250,000 ₭/1 · Qty 100)',
      category: 'Pearl Facial Cream / ຄຣີມໄຂ່ມຸກບຳລຸງຜິວໜ້າ',
      description:
        'ຊັ້ນ L3 ລາຄາ 250,000 ກີບ/1 (ຈຳນວນ 100 ກ່ອງ) · ຄອມມິດຊັ່ນ 4 ຊັ້ນຈ່າຍລາຍເດືອນ: L1 15% · L2 10% · L3 7% · L4 5% · L3 Price: 250,000 kip/1 (Qty 100) with monthly commission.',
      retailPrice: 250000 / 600,
      memberPrice: 250000 / 600,
      pv: 250000 / 600,
      stock: 100,
      reorderLevel: 15,
      imageUrl: './assets/aistudio/05_660aaf46.jpg',
      status: 'active',
    },
    {
      id: 'prod_essential_oil_kit',
      ownerId,
      sku: 'PL-L4-PEARL',
      name: 'L4 ຄຣີມໄຂ່ມຸກ PL Pearl Care Face (200,000 ₭/1 · ຈຳນວນ 500) / L4 PL Pearl Care Face Cream (200,000 ₭/1 · Qty 500)',
      category: 'Wholesale Packages / ແພັກເກັດຕົວແທນຈຳໜ່າຍ',
      description:
        'ຊັ້ນ L4 ລາຄາ 200,000 ກີບ/1 (ຈຳນວນ 500 ກ່ອງ) · ຄອມມິດຊັ່ນ 4 ຊັ້ນຈ່າຍລາຍເດືອນ: L1 15% · L2 10% · L3 7% · L4 5% · L4 Price: 200,000 kip/1 (Qty 500) with monthly commission.',
      retailPrice: 200000 / 600,
      memberPrice: 200000 / 600,
      pv: 200000 / 600,
      stock: 500,
      reorderLevel: 50,
      imageUrl: './assets/aistudio/9f777724-af65-4fc4-a8e9-70cfe3546b74_44092b0f.jpg',
      status: 'active',
    },
    {
      id: 'prod_pearl_deluxe_spatula',
      ownerId,
      sku: 'PL-L5-PEARL',
      name: 'L5 ຄຣີມໄຂ່ມຸກ PL Pearl Care Face ຊື້ທົ່ວໄປ (380,000 ₭/1 · ຈຳນວນ 1,000) / L5 PL Pearl Care Face Retail (380,000 ₭/1 · Qty 1000)',
      category: 'Pearl Facial Cream / ຄຣີມໄຂ່ມຸກບຳລຸງຜິວໜ້າ',
      description:
        'ຊັ້ນ L5 ລາຄາ 380,000 ກີບ/1 (ຈຳນວນ 1,000 ກ່ອງ · ຊື້ທົ່ວໄປ 0% ຄອມມິດຊັ່ນ) · L5 Price: 380,000 kip/1 (Qty 1000 · Direct Retail 0% Commission).',
      retailPrice: 380000 / 600,
      memberPrice: 380000 / 600,
      pv: 380000 / 600,
      stock: 1000,
      reorderLevel: 100,
      imageUrl: './assets/aistudio/07_9f4fa4fd.jpg',
      status: 'active',
    },
  ];
}

export function getInitialDistributors(ownerId: string): Distributor[] {
  return [
    {
      id: 'dist_root_founder',
      ownerId,
      code: 'PL-FOUNDER',
      fullName: 'Narinrattana Phak (ຜູ້ກໍ່ຕັ້ງແບຣນ / Master Founder)',
      rank: 'Diamond Ambassador',
      sponsorId: 'ROOT',
      levelDepth: 0,
      personalSalesVolume: 18000,
      groupSalesVolume: 48000,
      totalCommissionEarned: 6450,
      pendingPayout: 1950,
      paidOutTotal: 4500,
      status: 'active',
      email: 'founder@plskincare.com',
      phone: '+856 20 5588 9900',
      nationalId: 'LA-010099881',
      bankName: 'BCEL One',
      bankAccount: '160-12-00-009881-001',
      bankAccountName: 'NARINRATTANA PHAK',
      bankQrData: 'BCELONE://160-12-00-009881-001/NARINRATTANA-PHAK',
      kycDocType: 'passport',
      kycDocName: 'Passport_LA_010099881_Verified.pdf',
      kycStatus: 'verified',
      activePackage: 'Diamond Founder',
      username: 'PL-FOUNDER',
      password: '123456',
    },
    {
      id: 'dist_l1_claire',
      ownerId,
      code: 'Pl Skincare1',
      fullName: 'Pl Skincare1 (ສະມາຊິກ L1 · ຊັ້ນທີ 1 / L1 Member)',
      rank: 'Emerald Executive',
      sponsorId: 'dist_root_founder',
      levelDepth: 1,
      personalSalesVolume: 9000,
      groupSalesVolume: 27000,
      totalCommissionEarned: 3660,
      pendingPayout: 1460,
      paidOutTotal: 2200,
      status: 'active',
      email: 'l1@plskincare.com',
      phone: '+856 20 5522 3311',
      nationalId: 'LA-010077210',
      bankName: 'BCEL One',
      bankAccount: '160-12-00-007721-001',
      bankAccountName: 'PL SKINCARE 1',
      bankQrData: 'BCELONE://160-12-00-007721-001/PL-SKINCARE-1',
      kycDocType: 'national_id',
      kycDocName: 'Lao_ID_Card_LA010077210.jpg',
      kycStatus: 'verified',
      activePackage: 'Bronze Starter',
      username: 'Pl Skincare1',
      password: '123456',
    },
    {
      id: 'dist_l2_elena',
      ownerId,
      code: 'Pl Skincare2',
      fullName: 'Pl Skincare2 (ສະມາຊິກ L2 · ຊັ້ນທີ 2 / L2 Member)',
      rank: 'Gold Director',
      sponsorId: 'dist_l1_claire',
      levelDepth: 2,
      personalSalesVolume: 7500,
      groupSalesVolume: 15000,
      totalCommissionEarned: 2300,
      pendingPayout: 1100,
      paidOutTotal: 1200,
      status: 'active',
      email: 'l2@plskincare.com',
      phone: '+856 20 5599 4411',
      nationalId: 'LA-010055432',
      bankName: 'BCEL One',
      bankAccount: '160-12-00-005543-001',
      bankAccountName: 'PL SKINCARE 2',
      bankQrData: 'BCELONE://160-12-00-005543-001/PL-SKINCARE-2',
      kycDocType: 'passport',
      kycDocName: 'Passport_LA010055432.jpg',
      kycStatus: 'verified',
      activePackage: 'Silver Builder',
      username: 'Pl Skincare2',
      password: '123456',
    },
    {
      id: 'dist_l3_sophia',
      ownerId,
      code: 'Pl Skincare3',
      fullName: 'Pl Skincare3 (ສະມາຊິກ L3 · ຊັ້ນທີ 3 / L3 Member)',
      rank: 'Silver Director',
      sponsorId: 'dist_l2_elena',
      levelDepth: 3,
      personalSalesVolume: 4500,
      groupSalesVolume: 6900,
      totalCommissionEarned: 1360,
      pendingPayout: 760,
      paidOutTotal: 600,
      status: 'active',
      email: 'l3@plskincare.com',
      phone: '+856 20 9911 2233',
      nationalId: 'LA-010033890',
      bankName: 'BCEL One',
      bankAccount: '160-12-00-003389-001',
      bankAccountName: 'PL SKINCARE 3',
      bankQrData: 'BCELONE://160-12-00-003389-001/PL-SKINCARE-3',
      kycDocType: 'national_id',
      kycDocName: 'National_ID_LA010033890.jpg',
      kycStatus: 'verified',
      activePackage: 'Gold Pro',
      username: 'Pl Skincare3',
      password: '123456',
    },
    {
      id: 'dist_l4_lucas',
      ownerId,
      code: 'Pl Skincare4',
      fullName: 'Pl Skincare4 (ສະມາຊິກ L4 · ຊັ້ນທີ 4 / L4 Member)',
      rank: 'Brand Partner',
      sponsorId: 'dist_l3_sophia',
      levelDepth: 4,
      personalSalesVolume: 3900,
      groupSalesVolume: 3000,
      totalCommissionEarned: 825,
      pendingPayout: 825,
      paidOutTotal: 0,
      status: 'active',
      email: 'l4@plskincare.com',
      phone: '+856 20 2233 4455',
      nationalId: 'LA-010028901',
      bankName: 'BCEL One',
      bankAccount: '160-12-00-002890-001',
      bankAccountName: 'PL SKINCARE 4',
      bankQrData: 'BCELONE://160-12-00-002890-001/PL-SKINCARE-4',
      kycDocType: 'national_id',
      kycDocName: 'National_ID_LA010028901.jpg',
      kycStatus: 'verified',
      activePackage: 'Diamond Founder',
      username: 'Pl Skincare4',
      password: '123456',
    },
    {
      id: 'dist_l5_amara',
      ownerId,
      code: 'Pl Skincare5',
      fullName:
        'Pl Skincare5 (L5 - ຊື້ສິນຄ້າທົ່ວໄປ ບໍ່ມີຄ່າຄອມມິດຊັ່ນ / General Buy - No Commission)',
      rank: 'Brand Partner',
      sponsorId: 'dist_l4_lucas',
      levelDepth: 5,
      personalSalesVolume: 3000,
      groupSalesVolume: 0,
      totalCommissionEarned: 0,
      pendingPayout: 0,
      paidOutTotal: 0,
      status: 'active',
      email: 'l5@plskincare.com',
      phone: '+856 20 8877 6655',
      nationalId: 'LA-010022551',
      bankName: 'BCEL One',
      bankAccount: '160-12-00-002255-001',
      bankAccountName: 'PL SKINCARE 5',
      bankQrData: 'BCELONE://160-12-00-002255-001/PL-SKINCARE-5',
      kycDocType: 'national_id',
      kycDocName: 'National_ID_LA010022551.jpg',
      kycStatus: 'verified',
      activePackage: 'None',
      username: 'Pl Skincare5',
      password: '123456',
    },
  ];
}

export function getInitialOrders(ownerId: string): Order[] {
  const todayIso = new Date().toISOString().slice(0, 10);
  return [
    {
      id: 'ord_sample_1001',
      ownerId,
      orderNumber: 'ORD-1001',
      orderDate: todayIso,
      customerName: 'Pl Skincare5',
      orderType: 'retail',
      referringDistributorId: 'dist_l4_lucas',
      referringDistributorName: 'Pl Skincare4 (ສະມາຊິກ L4 · ຊັ້ນທີ 4)',
      productId: 'prod_essential_oil_kit',
      productName: 'L4 ຄຣີມໄຂ່ມຸກ PL Pearl Care Face (200,000 ₭/1 · ຈຳນວນ 500)',
      quantity: 1,
      unitPrice: 200000 / 600,
      totalAmount: 200000 / 600,
      totalPv: 200000 / 600,
      totalCommissionGenerated: (200000 / 600) * 0.37,
      status: 'fulfilled',
      paymentMethod: 'bank_qr',
      paymentRef: 'BCEL-QR-998102',
      shippingProvider: 'Anousith Logistics',
      shippingBranch: 'ສາຂາ ນະຄອນຫຼວງວຽງຈັນ (Vientiane Capital Main Hub)',
      shippingPhone: '020 5588 9911',
      shippingTrackingNo: 'ANS-100188',
    },
    {
      id: 'ord_sample_1002',
      ownerId,
      orderNumber: 'ORD-1002',
      orderDate: todayIso,
      customerName: 'Pl Skincare2',
      orderType: 'retail',
      referringDistributorId: 'dist_l1_claire',
      referringDistributorName: 'Pl Skincare1 (ສະມາຊິກ L1 · ຊັ້ນທີ 1)',
      productId: 'prod_botanical_serum',
      productName: 'L1 ຄຣີມໄຂ່ມຸກ PL Pearl Care Face (350,000 ₭/1 · ຈຳນວນ 1–50)',
      quantity: 1,
      unitPrice: 350000 / 600,
      totalAmount: 350000 / 600,
      totalPv: 350000 / 600,
      totalCommissionGenerated: (350000 / 600) * 0.37,
      status: 'fulfilled',
      paymentMethod: 'bank_qr',
      paymentRef: 'BCEL-QR-998245',
      shippingProvider: 'HAL Logistics',
      shippingBranch: 'ສາຂາ ດົງໂດກ (Dongdok Branch)',
      shippingPhone: '020 9977 3344',
      shippingTrackingNo: 'HAL-100288',
    },
  ];
}

export function getInitialCommissions(ownerId: string): Commission[] {
  return [
    {
      id: 'comm_sample_1',
      ownerId,
      orderId: 'ord_sample_1001',
      orderNumber: 'ORD-1001',
      beneficiaryId: 'dist_l4_lucas',
      beneficiaryName: 'Pl Skincare4 (ສະມາຊິກ L4 · ຊັ້ນທີ 4)',
      sourceDistributorId: 'dist_l4_lucas',
      sourceDistributorName: 'Pl Skincare4 (ສະມາຊິກ L4 · ຊັ້ນທີ 4)',
      unilevelTier: 1,
      percentageRate: 15,
      basePv: 1000,
      commissionAmount: 150,
      payoutStatus: 'pending',
    },
    {
      id: 'comm_sample_2',
      ownerId,
      orderId: 'ord_sample_1001',
      orderNumber: 'ORD-1001',
      beneficiaryId: 'dist_l3_sophia',
      beneficiaryName: 'Pl Skincare3 (ສະມາຊິກ L3 · ຊັ້ນທີ 3)',
      sourceDistributorId: 'dist_l4_lucas',
      sourceDistributorName: 'Pl Skincare4 (ສະມາຊິກ L4 · ຊັ້ນທີ 4)',
      unilevelTier: 2,
      percentageRate: 10,
      basePv: 1000,
      commissionAmount: 100,
      payoutStatus: 'pending',
    },
    {
      id: 'comm_sample_3',
      ownerId,
      orderId: 'ord_sample_1001',
      orderNumber: 'ORD-1001',
      beneficiaryId: 'dist_l2_elena',
      beneficiaryName: 'Pl Skincare2 (ສະມາຊິກ L2 · ຊັ້ນທີ 2)',
      sourceDistributorId: 'dist_l4_lucas',
      sourceDistributorName: 'Pl Skincare4 (ສະມາຊິກ L4 · ຊັ້ນທີ 4)',
      unilevelTier: 3,
      percentageRate: 7,
      basePv: 1000,
      commissionAmount: 70,
      payoutStatus: 'pending',
    },
    {
      id: 'comm_sample_4',
      ownerId,
      orderId: 'ord_sample_1001',
      orderNumber: 'ORD-1001',
      beneficiaryId: 'dist_l1_claire',
      beneficiaryName: 'Pl Skincare1 (ສະມາຊິກ L1 · ຊັ້ນທີ 1)',
      sourceDistributorId: 'dist_l4_lucas',
      sourceDistributorName: 'Pl Skincare4 (ສະມາຊິກ L4 · ຊັ້ນທີ 4)',
      unilevelTier: 4,
      percentageRate: 5,
      basePv: 1000,
      commissionAmount: 50,
      payoutStatus: 'pending',
    },
  ];
}

export type AdminRole =
  | 'Super Admin'
  | 'Inventory Manager'
  | 'Payout Controller'
  | 'Network Director';

export interface AdminStaff {
  id: string;
  ownerId: string;
  fullName: string;
  email: string;
  role: AdminRole;
  permissionsSummary: string;
  status: 'active' | 'suspended';
  username?: string;
  password?: string;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export const ADMIN_ROLE_PERMISSIONS: Record<AdminRole, string> = {
  'Super Admin':
    'ສິດຄວບຄຸມສູງສຸດທັງໝົດ / Full backend control: Admins, Stock, 4-Level Tree, Orders & Payouts',
  'Inventory Manager':
    'ຜູ້ຈັດການສາງສິນຄ້າ / Warehouse control: Add/Edit SKUs, Restock, Retail/Member Prices',
  'Payout Controller':
    'ຜູ້ຄວບຄຸມການເງິນຄອມມິດຊັ່ນ / Treasury control: Audit L1–L4 Ledger, Batch Disburse & CSV Export',
  'Network Director':
    'ຜູ້ອຳນວຍການສາຍງານ / Genealogy control: Enroll Partners, Override Ranks & Account Status',
};

export function getInitialAdmins(ownerId: string): AdminStaff[] {
  return [
    {
      id: 'admin_super_founder',
      ownerId,
      fullName: 'Soukyathaichanthaly (ຜູ້ບໍລິຫານສູງສຸດ / Chief Executive Admin)',
      email: 'soukyathaichanthaly@gmail.com',
      role: 'Super Admin',
      permissionsSummary: ADMIN_ROLE_PERMISSIONS['Super Admin'],
      status: 'active',
      username: 'ADMIN-FOUNDER',
      password: 'Pl5550',
    },
    {
      id: 'admin_inventory_lead',
      ownerId,
      fullName: 'Somsak Charoen (ຜູ້ຈັດການສາງສິນຄ້າ / Warehouse Manager)',
      email: 'warehouse@plskincare.com',
      role: 'Inventory Manager',
      permissionsSummary: ADMIN_ROLE_PERMISSIONS['Inventory Manager'],
      status: 'active',
      username: 'ADMIN-STOCK',
      password: 'admin123',
    },
    {
      id: 'admin_payout_treasurer',
      ownerId,
      fullName: 'Alisa Wattana (ຝ່າຍການເງິນຄອມມິດຊັ່ນ / Payout Controller)',
      email: 'treasury@plskincare.com',
      role: 'Payout Controller',
      permissionsSummary: ADMIN_ROLE_PERMISSIONS['Payout Controller'],
      status: 'active',
      username: 'ADMIN-PAYOUT',
      password: 'admin123',
    },
    {
      id: 'admin_network_director',
      ownerId,
      fullName: 'Kittisak Lom (ຝ່າຍບໍລິຫານສາຍງານ 4 ຊັ້ນ / Network Director)',
      email: 'network@plskincare.com',
      role: 'Network Director',
      permissionsSummary: ADMIN_ROLE_PERMISSIONS['Network Director'],
      status: 'active',
      username: 'ADMIN-NETWORK',
      password: 'admin123',
    },
  ];
}

