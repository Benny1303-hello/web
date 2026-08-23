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
      { href: '/services/list', key: 'servicesList' },
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
  { slug: 'services', key: 'services' },
  { slug: 'distribution', key: 'distribution' },
  { slug: 'system-integration', key: 'systemIntegration' },
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
