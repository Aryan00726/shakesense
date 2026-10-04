/**
 * ShakeSense — Central Site Configuration
 * =========================================
 * Update content here instead of editing individual components.
 */

export const BRAND = {
  name: 'SHAKESENSE',
  tagline: 'Know before the machine stops.',
  supportingLine: 'Affordable, offline machine-health intelligence for motors and pumps.',
  event: 'RIDE Hack \'26',
};

export const NAV_LINKS = [
  { label: 'System', href: '#system' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Technology', href: '#technology' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'Applications', href: '#applications' },
  { label: 'Vision', href: '#vision' },
];

export const HERO = {
  eyebrow: 'EDGE AI FOR MACHINE HEALTH',
  headline: ['Know Before', 'The Machine Stops.'],
  description:
    'ShakeSense turns machine vibration into an early warning system — using low-cost sensing and on-device intelligence.',
  cta: [
    { label: 'Explore the System', href: '#system', variant: 'primary' },
    { label: 'See How It Works', href: '#how-it-works', variant: 'secondary' },
  ],
};

export const PROBLEM = {
  title: 'Machines Usually Tell You Something Is Wrong\nAfter It\'s Too Late.',
  painPoints: [
    { label: 'Unexpected Downtime', icon: 'downtime' },
    { label: 'Emergency Repair', icon: 'repair' },
    { label: 'Missed Production', icon: 'production' },
    { label: 'Expensive Replacement', icon: 'replacement' },
    { label: 'No Continuous Monitoring', icon: 'monitoring' },
    { label: 'Poor Connectivity', icon: 'connectivity' },
  ],
  sequence: ['NORMAL', 'SUBTLE CHANGE', 'ANOMALY', 'BREAKDOWN', 'DOWNTIME'],
};

export const SOLUTION = {
  title: 'Give Every Machine\nA Sense Of Its Own Health.',
  steps: [
    {
      number: '01',
      label: 'SENSE',
      description: 'MPU6050 captures vibration.',
      icon: 'sensor',
    },
    {
      number: '02',
      label: 'PROCESS',
      description: 'ESP32 processes short vibration windows.',
      icon: 'processor',
    },
    {
      number: '03',
      label: 'UNDERSTAND',
      description: 'FFT + TinyML identify deviations from learned normal behavior.',
      icon: 'brain',
    },
    {
      number: '04',
      label: 'ALERT',
      description: 'The machine becomes:',
      states: ['HEALTHY', 'WARNING', 'CRITICAL'],
      icon: 'alert',
    },
  ],
};

export const ARCHITECTURE = {
  nodes: [
    {
      id: 'machine',
      label: 'MACHINE',
      description: 'Physical rotating equipment — motors, pumps, compressors.',
    },
    {
      id: 'mpu6050',
      label: 'MPU6050',
      description: '3-axis accelerometer and gyroscope capturing real-time vibration.',
    },
    {
      id: 'esp32',
      label: 'ESP32',
      description: 'Low-power microcontroller running local signal processing and inference.',
    },
    {
      id: 'signal',
      label: 'SIGNAL PROCESSING',
      description: 'Windowing and preprocessing raw accelerometer data for analysis.',
    },
    {
      id: 'fft',
      label: 'FFT',
      description: 'Transforms raw vibration signals into frequency-domain information.',
    },
    {
      id: 'tinyml',
      label: 'TINYML',
      description: 'Lightweight anomaly detection running directly on the edge device.',
    },
    {
      id: 'fingerprint',
      label: 'MACHINE FINGERPRINT',
      description: 'Each machine learns its own baseline instead of relying on a universal vibration profile.',
    },
    {
      id: 'health',
      label: 'HEALTH SCORE',
      description: 'Continuous assessment of machine condition from 0 to 100.',
    },
    {
      id: 'alert',
      label: 'ALERT',
      description: 'Local LED, buzzer, and dashboard notifications when anomalies are detected.',
    },
  ],
};

export const FINGERPRINT = {
  title: 'Every Machine Has A Signature.',
  demoMachine: {
    id: 'PUMP-01',
    baselineLabel: 'Baseline captured',
    healthScore: 96,
    anomalyScore: 0.07,
    status: 'HEALTHY',
  },
  degradationSequence: [96, 81, 63, 44],
  warningMessage: 'Abnormal vibration detected.',
  disclaimer: 'Demonstration values — not real measured performance.',
};

export const SIMULATION = {
  title: 'Watch A Machine Change.',
  disclaimer: 'Interactive simulation / prototype visualization',
  modes: [
    { id: 'normal', label: 'NORMAL', color: '#00e5a0' },
    { id: 'imbalance', label: 'IMBALANCE', color: '#f5a623' },
    { id: 'looseness', label: 'LOOSENESS', color: '#f5a623' },
    { id: 'critical', label: 'HIGH ANOMALY', color: '#ff3b5c' },
  ],
};

export const TECHNOLOGY = {
  title: 'Small Hardware.\nSerious Intelligence.',
  cards: [
    {
      id: 'edge-ai',
      label: 'EDGE AI',
      description: 'TinyML inference runs close to the machine.',
      icon: 'chip',
    },
    {
      id: 'offline-first',
      label: 'OFFLINE FIRST',
      description: 'Core anomaly detection does not require continuous internet access.',
      icon: 'offline',
    },
    {
      id: 'low-cost',
      label: 'LOW-COST HARDWARE',
      description: 'Designed around accessible sensing hardware rather than enterprise-scale industrial infrastructure.',
      icon: 'cost',
    },
  ],
};

export const COMPARISON = {
  title: 'Industrial Intelligence\nShouldn\'t Be Reserved For Large Plants.',
  traditional: [
    'Expensive',
    'Complex',
    'Enterprise-focused',
    'Cloud/infrastructure-heavy',
    'Requires specialized setup',
  ],
  shakesense: [
    'Low-cost',
    'Compact',
    'Offline-capable',
    'Machine-specific',
    'Simple alerts',
    'Designed for smaller operators',
  ],
};

export const USE_CASES = [
  {
    id: 'water-pumps',
    number: '01',
    label: 'WATER PUMPS',
    description: 'Detect bearing wear, cavitation, and impeller damage in agricultural and municipal water pumps.',
    anomaly: 'Bearing degradation',
    alert: 'Vibration signature shift detected',
    status: 'PROTOTYPE',
  },
  {
    id: 'small-factories',
    number: '02',
    label: 'SMALL FACTORIES',
    description: 'Monitor critical motors and drives on production lines in small manufacturing units.',
    anomaly: 'Motor imbalance',
    alert: 'Anomaly score exceeding threshold',
    status: 'PROTOTYPE',
  },
  {
    id: 'workshops',
    number: '03',
    label: 'WORKSHOPS',
    description: 'Provide health awareness for lathes, drills, and grinders in small workshops.',
    anomaly: 'Spindle vibration change',
    alert: 'Frequency spectrum deviation',
    status: 'PLANNED EXPANSION',
  },
  {
    id: 'compressors',
    number: '04',
    label: 'COMPRESSORS',
    description: 'Monitor reciprocating and rotary compressors for valve and bearing faults.',
    anomaly: 'Valve flutter',
    alert: 'Harmonic pattern change',
    status: 'PLANNED EXPANSION',
  },
  {
    id: 'conveyors',
    number: '05',
    label: 'CONVEYORS',
    description: 'Detect roller bearing failures and belt misalignment on conveyor systems.',
    anomaly: 'Roller bearing fault',
    alert: 'High-frequency spike detected',
    status: 'PLANNED EXPANSION',
  },
  {
    id: 'cnc-machines',
    number: '06',
    label: 'CNC MACHINES',
    description: 'Monitor spindle health and tool wear on CNC milling and turning centers.',
    anomaly: 'Spindle imbalance',
    alert: 'Tool wear signature detected',
    status: 'PLANNED EXPANSION',
  },
  {
    id: 'gensets',
    number: '07',
    label: 'GENERATOR SETS',
    description: 'Detect engine vibration anomalies and alternator bearing issues in diesel gensets.',
    anomaly: 'Engine misfire pattern',
    alert: 'Vibration anomaly in genset',
    status: 'PLANNED EXPANSION',
  },
];

export const ROADMAP = {
  title: 'From One Sensor\nTo A Machine Intelligence Platform.',
  phases: [
    {
      number: '01',
      label: 'CURRENT PROTOTYPE',
      status: 'NOW',
      items: [
        'ESP32',
        'MPU6050',
        'Vibration capture',
        'FFT',
        'TinyML anomaly detection',
        'Local alerts',
        'Basic dashboard',
      ],
    },
    {
      number: '02',
      label: 'SMARTER MACHINES',
      status: 'NEXT',
      items: [
        'Machine fingerprinting',
        'Health trends',
        'Improved thresholds',
        'Better fault classification',
        'Stronger field validation',
      ],
    },
    {
      number: '03',
      label: 'CONNECTED FLEETS',
      status: 'IN DEVELOPMENT',
      items: [
        'Multiple machines',
        'Fleet dashboard',
        'Remote monitoring',
        'Event history',
        'Maintenance workflows',
      ],
    },
    {
      number: '04',
      label: 'PREDICTIVE INTELLIGENCE',
      status: 'PLANNED',
      items: [
        'Larger machine datasets',
        'Verified failure events',
        'Better fault models',
        'Maintenance recommendations',
        'Advanced trend forecasting',
      ],
    },
    {
      number: '05',
      label: 'SHAKESENSE PLATFORM',
      status: 'VISION',
      items: [
        'Pumps',
        'Motors',
        'Compressors',
        'CNC spindles',
        'Conveyors',
        'Gensets',
        'Broader industrial deployments',
      ],
    },
  ],
};

export const DATA_FLYWHEEL = {
  title: 'Every Machine Makes The System Smarter.',
  steps: ['DEPLOY', 'COLLECT', 'DETECT', 'VERIFY', 'LEARN', 'IMPROVE'],
  description:
    'Every deployment can contribute useful, anonymized machine behavior data. As the system encounters more varied machines and verified events, the models can improve.',
  disclaimer: 'Planned long-term data advantage — no proprietary dataset exists at scale yet.',
};

export const OFFLINE = {
  left: { label: 'REMOTE FARM', icon: 'farm' },
  right: { label: 'INDUSTRIAL WORKSHOP', icon: 'workshop' },
  centerLabel: 'No Reliable Internet Required',
  flow: ['SENSOR', 'ESP32', 'LOCAL INFERENCE', 'ALERT'],
};

export const BUSINESS = {
  title: 'Built For The Places\nEnterprise Monitoring Overlooks.',
  customers: ['Small factories', 'Workshops', 'Pump owners'],
  distribution: ['Mechanics', 'Dealers', 'Service partners'],
  product: ['Low-cost sensor', 'Machine monitoring', 'Health intelligence'],
  pricing: {
    range: '₹100–₹300 / device / month',
    disclaimer: 'Initial pricing hypothesis — to be validated through pilots.',
  },
};

export const PILOT = {
  startingPoint: 'NOIDA',
  label: 'Initial wedge',
  expansion: [
    { region: 'Indian Industrial Clusters', status: 'TARGET MARKET' },
    { region: 'Southeast Asia', status: 'PLANNED EXPANSION' },
    { region: 'Africa', status: 'PLANNED EXPANSION' },
    { region: 'Middle East', status: 'PLANNED EXPANSION' },
  ],
};

export const VALIDATION = {
  title: 'Proof Matters More Than Promises.',
  metrics: [
    { label: 'Customer Interviews', value: 'TO BE VALIDATED', icon: 'interviews' },
    { label: 'Real Machine Data', value: 'TO BE VALIDATED', icon: 'data' },
    { label: 'Unseen Test Data', value: 'TO BE VALIDATED', icon: 'test' },
    { label: 'Detection Rate', value: 'TO BE VALIDATED', icon: 'detection' },
    { label: 'False Alarm Rate', value: 'TO BE VALIDATED', icon: 'alarm' },
    { label: 'Pilot Machines', value: 'TO BE VALIDATED', icon: 'pilot' },
  ],
};

export const PROTOTYPE = {
  components: [
    { label: 'ENCLOSURE', description: 'Protective housing for field deployment' },
    { label: 'SENSOR', description: 'MPU6050 — 3-axis accelerometer + gyroscope' },
    { label: 'PROCESSOR', description: 'ESP32 — dual-core, WiFi, BLE' },
    { label: 'POWER', description: 'USB-C or battery power' },
    { label: 'ALERT', description: 'LED + Buzzer for local notification' },
  ],
  costTarget: 'Prototype hardware target: under ₹2,000',
  disclaimer: 'Prototype target / current development estimate',
};

export const TEAM = {
  members: [
    {
      name: 'Team Member',
      role: 'Customer Research',
      expertise: 'User interviews, market validation, customer discovery',
    },
    {
      name: 'Team Member',
      role: 'Data & Hardware',
      expertise: 'Sensor integration, ESP32, signal acquisition',
    },
    {
      name: 'Team Member',
      role: 'ML & Dashboard',
      expertise: 'TinyML, anomaly detection, data visualization',
    },
    {
      name: 'Team Member',
      role: 'Pitch & Strategy',
      expertise: 'Business model, go-to-market, storytelling',
    },
  ],
};

export const SUPPORT = {
  title: 'What\'s Next?',
  needs: [
    {
      label: 'PILOT ACCESS',
      description: 'Industrial sites and machine owners',
      icon: 'access',
    },
    {
      label: 'MENTORSHIP',
      description: 'Hardware, product and industrial sales guidance',
      icon: 'mentorship',
    },
    {
      label: 'FIELD DATA',
      description: 'Real machine vibration recordings',
      icon: 'field-data',
    },
    {
      label: 'VALIDATION',
      description: 'False alarm and detection measurements',
      icon: 'validation',
    },
    {
      label: 'FUNDING',
      description: 'Sensors, enclosures and pilot deployments',
      icon: 'funding',
    },
    {
      label: 'PARTNERSHIPS',
      description: 'Factories, dealers and mechanics',
      icon: 'partnerships',
    },
  ],
};

export const VISION = {
  title: ['Machines Don\'t Speak.', 'We Give Them A Voice.'],
  subtitle: 'Machine intelligence at the edge.',
};

export const FOOTER = {
  links: [
    { label: 'System', href: '#system' },
    { label: 'Technology', href: '#technology' },
    { label: 'Roadmap', href: '#roadmap' },
    { label: 'Applications', href: '#applications' },
    { label: 'Vision', href: '#vision' },
    { label: 'Contact', href: '#contact' },
  ],
};

// Machine state data interface (for future ESP32 integration)
export const MACHINE_STATE_SCHEMA = {
  machineId: '',
  timestamp: 0,
  acceleration: { x: 0, y: 0, z: 0 },
  anomalyScore: 0,
  healthScore: 100,
  status: 'healthy', // 'healthy' | 'warning' | 'critical'
  probableFault: '',
  confidence: 0,
  frequencyData: [],
  temperature: null,
  signalQuality: 1.0,
};

// Color tokens for status states
export const STATUS_COLORS = {
  healthy: '#00e5a0',
  warning: '#f5a623',
  critical: '#ff3b5c',
  neutral: '#00d4ff',
  surface: '#0a0f1a',
  surfaceLight: '#111827',
  border: 'rgba(0, 212, 255, 0.12)',
  text: '#e2e8f0',
  textMuted: '#64748b',
};
