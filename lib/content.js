export const site = {
  name: 'TTC-Infotech',
  fullName: 'Công ty TNHH Thương Mại và Kỹ Thuật Tin Học TTC-Infotech',
  tagline: 'YOUR IT PARTNER',
  phone: '(+84) 908 161 313',
  phoneHref: 'tel:+84908161313',
  email: 'sales@ttc-infotech.com.vn',
  address: '58 Mac Dinh Chi Street, District 1, Ho Chi Minh City',
  mapHref: 'https://maps.google.com/?q=58%20Mac%20Dinh%20Chi%20Street%2C%20District%201%2C%20HCM%20City',
  facebook: 'https://www.facebook.com/',
};

export const navLinks = [
  { href: '/', key: 'home' },
  { href: '/about', key: 'about' },
  {
    href: '/distribution',
    key: 'distribution',
    children: [
      { href: '/distribution', key: 'distributionAbout' },
      { href: '/products', key: 'products' },
      { href: '/staff', key: 'staff' },
    ],
  },
  {
    href: '/system-integration',
    key: 'systemIntegration',
    children: [
      { href: '/system-integration', key: 'systemIntegrationAbout' },
      {
        href: '/system-integration/solutions',
        key: 'systemIntegrationSolutions',
        children: [
          { href: '/system-integration/solutions/smb-it-solutions', key: 'solutionSmb' },
          { href: '/system-integration/solutions/firewall-load-balancing', key: 'solutionFirewallLoadBalancing' },
          { href: '/system-integration/solutions/central-control', key: 'solutionCentralControl' },
          { href: '/system-integration/solutions/it-infrastructure-services', key: 'solutionInfrastructure' },
        ],
      },
      { href: '/system-integration/staff', key: 'systemIntegrationStaff' },
    ],
  },
  {
    href: '/services',
    key: 'services',
    children: [
      { href: '/services', key: 'servicesAbout' },
      {
        href: '/services/list',
        key: 'servicesList',
        children: [
          { href: '/services/list/tu-van-thiet-ke', key: 'serviceConsulting' },
          { href: '/services/list/trien-khai-lap-dat', key: 'serviceInstallation' },
          { href: '/services/list/sua-chua-khac-phuc-su-co', key: 'serviceRepair' },
          { href: '/services/list/bao-tri-he-thong', key: 'serviceMaintenance' },
          { href: '/services/list/outsourcing-it', key: 'serviceOutsourcing' },
        ],
      },
      { href: '/services/extended-warranty', key: 'servicesExtendedWarranty' },
      { href: '/services/apc-gold-warranty', key: 'servicesApcWarranty' },
      { href: '/services/staff', key: 'servicesStaff' },
    ],
  },
  { href: '/contact', key: 'contact' },
];

export const stats = [
  { value: 20, suffix: '+', key: 'years' },
  { value: 60, suffix: '+', key: 'staff' },
  { value: 1000, suffix: '+', key: 'projects' },
];

export const centers = [
  { slug: 'services', key: 'services', icon: 'Wrench' },
  { slug: 'distribution', key: 'distribution', icon: 'PackageSearch' },
  { slug: 'system-integration', key: 'systemIntegration', icon: 'Network' },
];

export const testimonials = [
  { key: 'trung', name: 'Nguyễn Chí Trung', role: 'IT Manager – CitySmart School', avatar: '/testimonials/nguyen-chi-trung.jpg' },
  { key: 'toan', name: 'Thomas Trịnh Toàn', role: 'CEO – T.C Vietnam Electronics Solutions', avatar: '/testimonials/thomas-trinh-toan.jpg' },
  { key: 'dung', name: 'Huỳnh Quang Dũng', role: 'IT Director – DatViet VAC Group', avatar: '/testimonials/huynh-quang-dung.png' },
  { key: 'minh', name: 'Lại Quang Minh', role: 'IT Senior Chief – Far Eastern Polytex Vietnam', avatar: '/testimonials/lai-quang-minh.jpg' },
];

export const partners = [
  'Schneider Electric',
  'APC by Schneider Electric',
  'Microsoft',
  'Cisco',
  'Dell',
  'HPE',
  'Fortinet',
  'Intel',
  'IBM',
  'Juniper',
  'Lenovo',
  'Palo Alto Networks',
  'Sophos',
  'VMware',
  'Symantec',
];

export const certifications = [
  { key: 'apcElite', image: '/certifications/apc-elite-partner.jpg' },
  { key: 'apcPremier', image: '/certifications/apc-premier-partner.jpg' },
  { key: 'microsoftSilver', image: '/certifications/microsoft-silver-partner.jpg' },
];

export const systemIntegrationSolutions = [
  { key: 'smb', slug: 'smb-it-solutions', icon: 'Building2' },
  { key: 'firewallLoadBalancing', slug: 'firewall-load-balancing', icon: 'ShieldCheck' },
  { key: 'centralControl', slug: 'central-control', icon: 'Server' },
  { key: 'infrastructure', slug: 'it-infrastructure-services', icon: 'Cable' },
];

export const distributionBrands = [
  { key: 'apc', icon: 'Zap' },
  { key: 'hpe', icon: 'Wifi' },
  { key: 'microsoft', icon: 'MonitorSmartphone' },
  { key: 'telegartner', icon: 'Network' },
];

export const distributionValues = [
  { key: 'genuine', icon: 'ShieldCheck' },
  { key: 'delivery', icon: 'Truck' },
  { key: 'installation', icon: 'Wrench' },
  { key: 'warranty', icon: 'Clock' },
];

// Shared by the Distribution, System Integration, and Services staff pages:
// Giang and Duc support all three centers, so their contact info lives in one place.
export const consultingStaff = [
  {
    groupKey: 'consulting',
    members: [
      { key: 'giang', name: 'Trịnh Đăng Hồng Giang', phone: '0933 004 576', email: 'Giang.tdh@ttc-infotech.com.vn' },
      { key: 'duc', name: 'Ngô Hoàng Minh Đức', phone: '0906 339 005', email: 'duc.nhm@ttc-infotech.com.vn' },
    ],
  },
];

export const distributionStaff = [
  {
    groupKey: 'sales',
    members: [
      { key: 'phuong', name: 'Vũ Chính Phương', phone: '0903 362 224', email: 'phuong.vc@ttc-infotech.com.vn' },
      { key: 'xuan', name: 'Nguyễn Xuân', phone: '0905 106 846', email: 'xuan.nguyen@ttc-infotech.com.vn' },
      { key: 'tuananh', name: 'Đặng Tuấn Anh', phone: '0903 127 025', email: 'anh.dt@ttc-infotech.com.vn' },
    ],
  },
  ...consultingStaff,
];

export const servicesCriteria = [
  { key: 'fastReliable', icon: 'Zap' },
  { key: 'support247', icon: 'Clock' },
  { key: 'certifiedEngineers', icon: 'ShieldCheck' },
  { key: 'loanerDevices', icon: 'PackageCheck' },
];

// The 8 capabilities the Service Center offers. Only the ones with a `slug`
// have a dedicated detail page under /services/list/<slug>; the rest render
// as plain (non-clickable) cards on /services/list, matching the old site
// (which never gave them their own page either).
export const serviceCapabilities = [
  { key: 'maintenance', icon: 'Wrench', slug: 'bao-tri-he-thong' },
  { key: 'repair', icon: 'ServerCrash', slug: 'sua-chua-khac-phuc-su-co' },
  { key: 'upsRepair', icon: 'Zap' },
  { key: 'installation', icon: 'Network', slug: 'trien-khai-lap-dat' },
  { key: 'extendedWarranty', icon: 'ShieldCheck', href: '/services/extended-warranty' },
  { key: 'relocation', icon: 'Truck' },
  { key: 'consulting', icon: 'PenTool', slug: 'tu-van-thiet-ke' },
  { key: 'outsourcing', icon: 'Users2', slug: 'outsourcing-it' },
];

// The subset of serviceCapabilities that share the ServiceOfferingDetailContent
// template, rendered by the /services/list/[slug] dynamic route.
export const serviceOfferings = serviceCapabilities.filter((item) => item.slug);

export const serviceClients = [
  { name: 'AIA', image: '/clients/AIA.jpg' },
  { name: 'CSC', image: '/clients/CSC.jpg' },
  { name: 'Dai-ichi Life', image: '/clients/Dai-ichi-life.jpg' },
  { name: 'Dunlopillo', image: '/clients/dunlopillo.jpg' },
  { name: 'FedEx', image: '/clients/fedex.jpg' },
  { name: 'Fox', image: '/clients/Fox.jpg' },
  { name: 'Hennessy', image: '/clients/Hennessy.jpg' },
  { name: 'HUTECH', image: '/clients/hutech.jpg' },
  { name: 'Mekong', image: '/clients/mekong.jpg' },
  { name: 'Panalpina', image: '/clients/panalpina.jpg' },
  { name: 'Parker', image: '/clients/Parker.jpg' },
  { name: 'Pico', image: '/clients/Pico.jpg' },
  { name: 'Saint-Gobain', image: '/clients/saint-gobain.jpg' },
  { name: 'Samsung', image: '/clients/samsung-1.jpg' },
  { name: 'Tiger Beer', image: '/clients/Tiger-Beer.jpg' },
  { name: 'Vietnam Brewery', image: '/clients/Vietnam-Brewery.jpg' },
  { name: 'Vĩnh Tường', image: '/clients/vinhtuong.jpg' },
  { name: 'Gem Center', image: '/clients/Gem-center.jpg' },
];
