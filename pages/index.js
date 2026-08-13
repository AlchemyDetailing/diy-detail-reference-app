import { useState, useEffect } from 'react';
import Head from 'next/head';
import {
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Circle,
  Search,
  X,
  Menu,
  Home,
  Book,
  CheckSquare,
} from 'lucide-react';

const PRODUCTS_DATA = {
  'incredible-suds': {
    name: 'Incredible Suds',
    type: 'Surfactant Concentrate',
    purpose: 'Pre-wash foam cannon or contact wash soap',
    dilution: {
      foam: '1–2 oz per 30oz reservoir (~1000:1)',
      bucket: '½ oz per 3–4 gallons (15ml)',
    },
    application:
      'Creates protective wash surface to prevent swirls and scratching',
    coverage: 'Cuts through heavy dirt, road film, and grime',
    services: ['Exterior Detail', 'Maintenance Wash'],
  },
  'rinse-less-wash': {
    name: 'Rinse Less Wash',
    type: 'Concentrate with Lubricants',
    purpose: 'Final rinse replacement or touchless rinse alternative',
    dilution: '½ oz per gallon (4ml per liter / 256:1)',
    application: 'Applied after contact wash instead of water rinse',
    coverage: 'Safe for all surfaces',
    services: ['Exterior Detail', 'Maintenance Wash', 'Ceramic Coating Prep'],
  },
  'all-clean': {
    name: 'All Clean',
    type: 'Citrus-based All-Purpose Cleaner',
    purpose: 'All-purpose cleaner for interior and exterior',
    dilution: {
      exterior: '15:1 (water to concentrate)',
      interior: '30:1 (water to concentrate)',
    },
    application: 'Spray on microfiber, wipe dry and buff',
    coverage: 'Bugs, tires, wheels, engine, paint, plastic, glass',
    services: ['Interior Detail', 'Exterior Detail'],
  },
  'waterless-wash': {
    name: 'Waterless Wash',
    type: 'Ready to Use (RTU)',
    purpose: 'Dust and fingerprint removal, insect and bird bomb cleaning',
    application: 'Spray liberally, dwell, encapsulate with microfiber, buff dry',
    coverage: 'All exterior surfaces',
    services: ['Maintenance Wash'],
  },
  'iron-remover': {
    name: 'Iron Remover',
    type: 'pH-Neutral RTU',
    purpose: 'Remove ferrous oxide particles from paint',
    dilution: 'Ready to use',
    application:
      '1 spray on quad-fold towel + 1 spray on wet surface, agitate gently (NO PRESSURE), rinse',
    coverage: 'Paint, PPF, vinyl, matte paint, wheels',
    services: ['Exterior Detail', 'Ceramic Coating Prep', 'Paint Correction'],
  },
  'water-spot-remover': {
    name: 'Water Spot Remover',
    type: 'Ready to Use (RTU)',
    purpose: 'Remove dried water mineral deposits',
    dilution: 'Ready to use',
    application: 'Spray on panel, agitate with damp towel, 1–2 min dwell, rinse',
    coverage: 'Paint, interior, windows, wheels, tires',
    services: ['Exterior Detail', 'Ceramic Coating Prep'],
  },
  'tree-sap-remover': {
    name: 'Tree Sap Remover',
    type: 'Professional Solvent RTU',
    purpose: 'Remove stubborn road tar, tree sap, adhesive residue',
    dilution: 'Ready to use',
    application: 'Spray on microfiber, apply to area, let penetrate',
    coverage: 'Clear coat, most plastics, wheels',
    services: ['Exterior Detail', 'Odour Treatment'],
  },
  'panel-prep': {
    name: 'Panel Prep',
    type: 'Spray Cleaner',
    purpose: 'Remove grease and compound residue before ceramic coating',
    dilution: 'Ready to use',
    application: 'Spray on microfiber, wipe dry, buff',
    coverage: 'Paint, plastic, glass',
    services: ['Ceramic Coating Prep'],
  },
  'compound': {
    name: 'Gold Standard Compound',
    type: 'Gel Abrasive with Geodesic Technology',
    purpose: 'Aggressive cutting to remove oxidation and deep scratches',
    dilution: '3–4 drops on damp pad',
    application: 'Wool DA (speed 2–3) or Wool Rotary (speed 1), no pressure',
    coverage: 'Paint correction, oxidation removal',
    services: ['Paint Correction', 'Ceramic Coating Prep'],
  },
  'polish': {
    name: 'Gold Standard Polish',
    type: 'Fine Abrasive Polish',
    purpose: 'Final finishing, swirl removal, gloss enhancement',
    dilution: '1 spray on damp pad',
    application: 'Red Jewelling pad (DA 2–3, Rotary 1), low speed, no pressure',
    coverage: 'Paint finishing',
    services: ['Paint Correction', 'Ceramic Coating Prep'],
  },
  'app': {
    name: 'C6 APP (Adhesion Promoter Polish)',
    type: 'Specialized Polish',
    purpose: 'Prepare paint surface for ceramic coating adhesion',
    dilution: 'Not applicable (applied directly)',
    application:
      'Red Jewelling pad (DRY), 2–9mm stroke DA, wipe with dry microfiber as you go',
    coverage: 'Full paint panel prep',
    services: ['Ceramic Coating Prep'],
  },
  'hydr3': {
    name: 'DIY Detail 3 Year (Type 2)',
    type: 'TEOS-Based Ceramic Coating',
    purpose: 'Professional ceramic coating protection',
    dilution: 'Ready to use',
    application:
      'Foam applicator, several drops, circular motion, 2–5 min dwell, level at 50% clear trigger',
    coverage: 'Paint, PPF, vinyl, trim, chrome, wheels, windows',
    services: ['Ceramic Coating Prep'],
  },
  'hydr5': {
    name: 'DIY Detail 5 Year (Type 3)',
    type: 'TEOS-Based Ceramic Coating',
    purpose: 'Professional-grade ceramic coating protection',
    dilution: 'Ready to use',
    application:
      'Foam applicator, 8–10 drops prime, 1–2 drops per panel, 2–5 min dwell, level at 50% clear',
    coverage: 'Paint, PPF, vinyl, trim, chrome, wheels, windows',
    services: ['Ceramic Coating Prep'],
  },
  'hydr8': {
    name: 'HYDR8 (8-Year, Type 3)',
    type: 'TEOS-Based Pro-Grade Ceramic',
    purpose: '8-year professional coating with enhanced gloss',
    dilution: 'Ready to use',
    application:
      'Foam applicator, 8–10 drops prime, 1–2 drops per panel, full vehicle application allowed',
    coverage: 'Paint, PPF, vinyl, trim, chrome, wheels, windows, matte',
    services: ['Ceramic Coating Prep'],
  },
  'quick-beads': {
    name: 'Quick Beads',
    type: 'Graphene Ceramic Sealant RTU',
    purpose: 'Maintenance sealant with rapid activation',
    dilution: 'Ready to use',
    application: 'Spray on clean wet surface, activate with water pressure, rinse',
    coverage: 'All exterior paint surfaces',
    services: ['Maintenance Wash'],
  },
  'envie': {
    name: 'Envie',
    type: 'Ceramic Detail Spray Sealant RTU',
    purpose: 'Premium ceramic spray sealant for drying aid or quick detailer',
    dilution: 'Ready to use',
    application:
      'As drying aid: mist into towel during drying. As quick detailer: spray dry surface, buff.',
    coverage: 'Paint, plastic, metal, trim, glass, headlights',
    services: ['Maintenance Wash', 'Exterior Detail'],
  },
  'crystal-clear': {
    name: 'Crystal Clear',
    type: 'Glass Coating RTU',
    purpose: 'Professional glass clarity and protection',
    dilution: 'Ready to use',
    application: 'Spray on microfiber towel, wipe streak-free',
    coverage: 'Interior and exterior glass, tinted windows safe',
    services: ['Interior Detail'],
  },
  'tire-dressing': {
    name: 'Tire Dressing',
    type: 'Tire Shine RTU',
    purpose: 'Deep black finish with long-lasting shine',
    dilution: {
      exterior: 'As-is',
      interior: '1:1 (dilute for lighter finish)',
    },
    application: 'Spray in brush, apply to sidewall',
    coverage: 'Tires, can be reapplied after 15 minutes for glossier finish',
    services: ['Exterior Detail', 'Maintenance Wash'],
  },
  'interior-ceramic': {
    name: 'Interior Ceramic',
    type: 'Ready to Use Coating',
    purpose: 'Interior surface protection and stain resistance',
    dilution: 'Ready to use',
    application: 'Spray in red applicator, buff with microfiber',
    coverage: 'Seats, trim, plastics, hard surfaces',
    services: ['Interior Detail'],
  },
};

const JOBS_DATA = {
  interior: {
    title: 'Interior Detail',
    description: 'Full vacuum, shampooing, conditioning, glass, and protection',
    icon: '🏠',
    steps: [
      {
        id: 1,
        name: 'Vacuum & Shake Out',
        description: 'Remove all loose debris, mats, and shake out carpets',
        product: null,
        notes: 'Get into crevices and under seats',
      },
      {
        id: 2,
        name: 'Shampoo Carpets & Mats',
        description: 'Clean carpet and floor mats thoroughly',
        product: 'All Clean',
        dilution: '30:1 (water to concentrate)',
        notes: 'Interior dilution prevents residue on plastics',
      },
      {
        id: 3,
        name: 'Leather/Vinyl Conditioning',
        description: 'Condition and protect leather and vinyl surfaces',
        product: 'Interior Ceramic',
        notes: 'Increases stain resistance and reduces wear',
      },
      {
        id: 4,
        name: 'Wipe Down Plastics',
        description: 'Clean all plastic surfaces with appropriate cleaner',
        product: 'All Clean',
        dilution: '30:1',
        notes: 'Use 350 GSM All-Purpose Interior Towel',
      },
      {
        id: 5,
        name: 'Glass Cleaning',
        description: 'Clean all interior and exterior glass streak-free',
        product: 'Crystal Clear',
        notes: 'Safe on tinted windows; spray on microfiber towel',
      },
      {
        id: 6,
        name: 'Door Jambs',
        description: 'Clean door jambs and edges',
        product: 'All Clean',
        dilution: '30:1',
        notes: 'Removes dust and grime from hinges',
      },
      {
        id: 7,
        name: 'UV Protection on Trim',
        description: 'Apply UV protection to interior plastics',
        product: 'Interior Ceramic',
        notes: 'Protects against fading and cracking',
      },
    ],
  },
  exterior: {
    title: 'Exterior Detail - Wash, Clay & Seal',
    description: 'Full hand wash, decontamination, and protective sealant',
    icon: '🚗',
    steps: [
      {
        id: 1,
        name: 'Spray (1) - Chemical Rinse',
        description: 'Initial loose dirt removal with foam or spray',
        product: 'Incredible Suds',
        dilution: {
          foam: '1–2 oz per 30oz reservoir',
          bucket: '½ oz per 3–4 gallons',
        },
        notes: 'Foam cannon preferred for coverage',
      },
      {
        id: 2,
        name: 'Rinse',
        description: 'Pressure or water rinse to remove loosened contaminants',
        product: null,
        notes: 'Use water pressure to create protective foam layer',
      },
      {
        id: 3,
        name: 'Spray (2) - Contact Wash',
        description: 'Apply foam for hand wash phase',
        product: 'Incredible Suds',
        dilution: {
          foam: '1–2 oz per 30oz reservoir',
        },
        notes: 'Creates protective surface for mitt or brush',
      },
      {
        id: 4,
        name: 'Contact Wash',
        description: 'Hand wash with brush, mitt, or sponge',
        product: 'Incredible Suds',
        notes: 'Two-bucket method or wash bucket with suds',
      },
      {
        id: 5,
        name: 'Rinse or No-Rinse',
        description: 'Rinse with water or apply Rinse Less Wash',
        product: 'Rinse Less Wash',
        dilution: '½ oz per gallon (256:1)',
        notes: 'No-rinse option for water-restricted areas',
      },
      {
        id: 6,
        name: 'Decon Step 1 - Iron Removal',
        description: 'Remove ferrous oxide particles with chemical spray',
        product: 'Iron Remover',
        dilution: 'Ready to use',
        notes: 'Use quad-fold towel method: 1 spray towel + 1 spray surface, NO PRESSURE',
      },
      {
        id: 7,
        name: 'Decon Step 2 - Water Spot Removal',
        description: 'Remove mineral deposits with specialized remover',
        product: 'Water Spot Remover',
        dilution: 'Ready to use',
        notes: 'Spray generously, 1–2 min dwell, crucial for sealant activation',
      },
      {
        id: 8,
        name: 'Towel Dry',
        description: 'Remove bulk water with high-GSM towels',
        product: 'Twist Towel + Drying Blanket',
        notes: 'First pass with Twist Towel, final with Drying Blanket',
      },
      {
        id: 9,
        name: 'Drying Aid',
        description: 'Apply protective drying lubricant',
        product: 'Envie',
        notes: 'Options: Envie, Quick Beads, or Rinse Less Wash',
      },
      {
        id: 10,
        name: 'Blower',
        description: 'Final air dry to remove remaining moisture',
        product: null,
        notes: 'Ensures spot-free finish and sets drying aid',
      },
    ],
  },
  ceramic: {
    title: 'Ceramic Coating Prep',
    description: 'Full prep for ceramic coating application (3/5/8-year)',
    icon: '✨',
    steps: [
      {
        id: 1,
        name: 'Exterior Wash & Decon',
        description:
          'Complete wash sequence with iron removal and water spot removal',
        product: ['Incredible Suds', 'Iron Remover', 'Water Spot Remover'],
        notes: 'Follow Exterior Detail wash steps 1–7',
      },
      {
        id: 2,
        name: 'Towel Dry',
        description: 'Remove all water with Twist Towel and Drying Blanket',
        product: ['Twist Towel', 'Drying Blanket'],
        notes: 'Paint must be completely dry before polishing',
      },
      {
        id: 3,
        name: 'Paint Correction (if needed)',
        description: 'Apply compound and polish to remove oxidation and scratches',
        product: ['Compound', 'Polish', 'Red Jewelling Pad'],
        notes: 'Use Wool Rotary (heavy cutting) then Red Jewelling (finishing)',
      },
      {
        id: 4,
        name: 'Residue Removal',
        description: 'Remove all polish and compound residue',
        product: 'Rinse Less Wash',
        dilution: '½ oz per gallon',
        notes: 'Use damp microfiber towel to clean all panels',
      },
      {
        id: 5,
        name: 'APP - Adhesion Promoter Polish',
        description: 'Apply C6 APP to swell paint and prepare for coating',
        product: 'C6 APP',
        dilution: 'Not applicable',
        notes:
          'Red Jewelling pad DRY, 2–9mm DA stroke, wipe with dry microfiber. Apply within 48 hours of coating.',
      },
      {
        id: 6,
        name: 'Surface Temperature Check',
        description: 'Verify surface temp is above 40°F (5°C)',
        product: null,
        notes: 'TEOS activation requires warm surface',
      },
      {
        id: 7,
        name: 'Ceramic Coating Application',
        description: 'Apply DIY Detail ceramic coating (3/5/8-year)',
        product: ['HYDR3', 'HYDR5', 'HYDR8'],
        notes:
          'Foam applicator, prime with 8–10 drops, 2–3 drops per panel, circular motion',
      },
      {
        id: 8,
        name: 'Dwell & Visual Trigger',
        description: 'Wait for transition to oil-slick appearance (2–5 min dwell)',
        product: null,
        notes: 'Watch for 50% of surface to turn clear = level trigger',
      },
      {
        id: 9,
        name: 'Level Coating',
        description: 'Gently level high spots with Level One towel (short nap)',
        product: 'Level One',
        notes: 'Light wipe only—do NOT try to clear entire surface',
      },
      {
        id: 10,
        name: 'Buff Final Finish',
        description: 'Buff with Freebird 400 (long nap) with NO PRESSURE',
        product: 'Freebird 400',
        notes: 'Let towel do the work—no pressure = streak-free, high-gloss finish',
      },
      {
        id: 11,
        name: 'Cure Time',
        description: 'Do not expose to water for 12–24 hours (HYDR3) or 24+ (HYDR5)',
        product: null,
        notes: 'Strictly enforced dwell time window',
      },
      {
        id: 12,
        name: 'Post-Cure Care',
        description: 'First wash after 3 days with gentle product',
        product: 'Rinse Less Wash',
        notes: 'Can wash with Incredible Suds or Rinse Less Wash after 3 days',
      },
    ],
  },
  polishing: {
    title: 'Paint Correction',
    description: 'Multi-stage polishing to remove scratches, oxidation, and swirls',
    icon: '🎯',
    steps: [
      {
        id: 1,
        name: 'Wash & Decontamination',
        description: 'Full exterior wash with iron removal and water spot removal',
        product: ['Incredible Suds', 'Iron Remover', 'Water Spot Remover'],
        notes: 'Paint must be clean and dry before compound application',
      },
      {
        id: 2,
        name: 'Towel Dry',
        description: 'Remove all water thoroughly',
        product: ['Twist Towel', 'Drying Blanket'],
        notes: 'No moisture on paint during polishing',
      },
      {
        id: 3,
        name: 'Compound Application',
        description: 'Apply gold standard compound with cutting pad',
        product: 'Gold Standard Compound',
        dilution: '3–4 drops on damp pad',
        notes:
          'Wool Rotary (speed 1) for heavy cutting OR Wool DA (speed 2–3) for medium cut',
      },
      {
        id: 4,
        name: 'Compound Work',
        description: 'Work compound across panel with low speed and zero pressure',
        product: ['Wool Rotary', 'Wool DA'],
        notes: 'Let machine do the work—no hand pressure = max gloss',
      },
      {
        id: 5,
        name: 'Residue Removal',
        description: 'Wipe compound residue with Rinse Less Wash-dampened towel',
        product: 'Rinse Less Wash',
        dilution: '½ oz per gallon',
        notes: 'Use separate microfiber towel to avoid cross-contamination',
      },
      {
        id: 6,
        name: 'Polish Application',
        description: 'Apply gold standard polish for final finishing',
        product: 'Gold Standard Polish',
        dilution: '1 spray on damp pad',
        notes:
          'Red Jewelling pad (dedicated finishing), DA speed 2–3 OR Rotary speed 1',
      },
      {
        id: 7,
        name: 'Polish Work',
        description: 'Work polish across panel for swirl removal and gloss',
        product: 'Red Jewelling Pad',
        notes: 'No pressure—towel nap removes swirls and enhances shine',
      },
      {
        id: 8,
        name: 'Final Residue Removal',
        description: 'Remove final polish residue with dry microfiber',
        product: 'MR. Twister',
        notes: 'Ensures streak-free, showroom-quality finish',
      },
    ],
  },
  odour: {
    title: 'Odour Treatment',
    description: 'Multi-stage odour removal using enzymatic and chemical methods',
    icon: '💨',
    steps: [
      {
        id: 1,
        name: 'Interior Vacuum',
        description: 'Remove all loose debris and odour sources',
        product: null,
        notes: 'Get into all crevices, under seats, air vents',
      },
      {
        id: 2,
        name: 'Cabin Air Filter Replacement',
        description: 'Replace with fresh cabin air filter',
        product: 'Cabin Air Filter',
        notes: 'Removes trapped odour particles from HVAC system',
      },
      {
        id: 3,
        name: 'Enzymatic Treatment (if needed)',
        description: 'Apply enzyme cleaner to odour source areas',
        product: 'Enzymatic Cleaner',
        notes: 'For biological odours: pet, vomit, mold, mildew',
      },
      {
        id: 4,
        name: 'Carpet & Upholstery Shampoo',
        description: 'Deep clean all fabric surfaces',
        product: 'All Clean',
        dilution: '30:1',
        notes: 'Removes absorbed odours from fabric fibers',
      },
      {
        id: 5,
        name: 'BioBomb Interior Reset',
        description: 'Apply specialized odour elimination product',
        product: 'BioBomb Interior Odour Reset',
        notes: 'Multi-stage molecular odour neutralization',
      },
      {
        id: 6,
        name: 'HVAC System Purge',
        description: 'Run AC on recirculate with odour elimination',
        product: 'BioBomb Interior Odour Reset',
        notes: 'Circulates treatment through entire HVAC system',
      },
      {
        id: 7,
        name: 'Air Freshener Application',
        description: 'Apply premium air freshener if desired',
        product: 'Air Freshener',
        notes: 'Optional—only after odour elimination is complete',
      },
    ],
  },
  maintenance: {
    title: 'Maintenance Wash',
    description: 'Quick maintenance detail for coated or sealed vehicles',
    icon: '🧼',
    steps: [
      {
        id: 1,
        name: 'Quick Wash',
        description: 'Fast hand wash to remove dust and light dirt',
        product: 'Incredible Suds',
        dilution: '½ oz per 3–4 gallons',
        notes: 'Use two-bucket method for quick turnaround',
      },
      {
        id: 2,
        name: 'Waterless Touch-Up (optional)',
        description: 'Address spot contamination without rinsing',
        product: 'Waterless Wash',
        notes: 'Spray, dwell, encapsulate with microfiber, buff dry',
      },
      {
        id: 3,
        name: 'Drying Phase',
        description: 'Remove water with towel dry',
        product: ['Twist Towel', 'Mini Drying Blanket'],
        notes: 'Quick first pass only for maintenance details',
      },
      {
        id: 4,
        name: 'Maintenance Sealant',
        description: 'Apply graphene ceramic maintenance spray',
        product: 'Quick Beads',
        notes: 'Spray on wet surface, activate with water pressure, rinse',
      },
      {
        id: 5,
        name: 'Tire Dressing',
        description: 'Apply tire shine for deep black finish',
        product: 'Tire Dressing',
        notes: 'Reapply after 15 minutes for glossier look',
      },
      {
        id: 6,
        name: 'Final Dry & Buff',
        description: 'Final blower and visual inspection',
        product: 'Blower',
        notes: 'Quick maintenance complete—vehicle ready',
      },
    ],
  },
};

export default function DetailApp() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [checklist, setChecklist] = useState({});

  // Load checklist from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('diydetail-checklist');
    if (saved) {
      try {
        setChecklist(JSON.parse(saved));
      } catch (e) {
        console.log('Checklist load error:', e);
      }
    }
  }, []);

  // Save checklist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('diydetail-checklist', JSON.stringify(checklist));
  }, [checklist]);

  const toggleStep = (jobKey, stepId) => {
    const key = `${jobKey}-${stepId}`;
    setChecklist((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const startChecklist = (jobKey) => {
    setSelectedJob(jobKey);
    setCurrentPage('checklist');
    setMobileMenuOpen(false);
  };

  const filteredProducts = Object.entries(PRODUCTS_DATA)
    .filter(
      ([_, product]) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.purpose.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map(([key, value]) => ({ key, ...value }));

  const getJobCompletionPercent = (jobKey) => {
    if (!JOBS_DATA[jobKey]) return 0;
    const steps = JOBS_DATA[jobKey].steps;
    const completed = steps.filter(
      (step) => checklist[`${jobKey}-${step.id}`]
    ).length;
    return Math.round((completed / steps.length) * 100);
  };

  return (
    <>
      <Head>
        <title>DIY Detail Reference - Professional Detailing Guide</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </Head>

      <div className="min-h-screen bg-dark-bg text-accent-light pb-20">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-dark-surface border-b border-dark-border">
          <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {currentPage !== 'home' && (
                <button
                  onClick={() => {
                    setCurrentPage('home');
                    setSearchQuery('');
                    setMobileMenuOpen(false);
                  }}
                  className="p-2 hover:bg-dark-border rounded-lg transition-colors"
                  title="Back to home"
                >
                  <ChevronLeft size={20} />
                </button>
              )}
              <h1 className="font-heading font-bold text-lg">
                DIY Detail
                <span className="text-gold-500 ml-1">Ref</span>
              </h1>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-dark-border rounded-lg transition-colors"
            >
              <Menu size={20} />
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="bg-dark-surface border-t border-dark-border">
              <div className="max-w-3xl mx-auto px-4 py-3 flex gap-2">
                <button
                  onClick={() => {
                    setCurrentPage('home');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    currentPage === 'home'
                      ? 'bg-gold-500 text-dark-bg'
                      : 'hover:bg-dark-border'
                  }`}
                >
                  <Home size={16} />
                  <span className="text-sm">Home</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentPage('products');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    currentPage === 'products'
                      ? 'bg-gold-500 text-dark-bg'
                      : 'hover:bg-dark-border'
                  }`}
                >
                  <Book size={16} />
                  <span className="text-sm">Products</span>
                </button>
              </div>
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className="max-w-3xl mx-auto px-4 py-6">
          {/* HOME PAGE */}
          {currentPage === 'home' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-heading font-bold text-2xl mb-2">
                  Choose Your Detail Type
                </h2>
                <p className="text-accent-gray text-sm">
                  Select a service to see step-by-step workflows and products
                </p>
              </div>

              <div className="grid gap-3">
                {Object.entries(JOBS_DATA).map(([key, job]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setSelectedJob(key);
                      setCurrentPage('job');
                      setMobileMenuOpen(false);
                    }}
                    className="group bg-dark-surface border border-dark-border rounded-lg p-4 hover:border-gold-500 hover:bg-dark-bg transition-all text-left"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{job.icon}</span>
                        <div>
                          <h3 className="font-heading font-bold text-base">
                            {job.title}
                          </h3>
                          <p className="text-accent-gray text-sm mt-1">
                            {job.description}
                          </p>
                        </div>
                      </div>
                      <ChevronRight
                        size={20}
                        className="text-gold-500 mt-1 group-hover:translate-x-1 transition-transform"
                      />
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-3 bg-dark-border rounded h-1 overflow-hidden">
                      <div
                        className="bg-gold-500 h-full transition-all"
                        style={{
                          width: `${getJobCompletionPercent(key)}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-accent-gray mt-2">
                      {getJobCompletionPercent(key)}% complete
                    </p>
                  </button>
                ))}
              </div>

              {/* Quick Access */}
              <div className="mt-8 pt-6 border-t border-dark-border">
                <button
                  onClick={() => {
                    setCurrentPage('products');
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 w-full bg-dark-surface border border-dark-border rounded-lg p-4 hover:border-gold-500 hover:bg-dark-bg transition-all"
                >
                  <Book size={20} className="text-gold-500" />
                  <div className="text-left flex-1">
                    <p className="font-heading font-bold">Product Directory</p>
                    <p className="text-accent-gray text-sm">
                      Look up any product and its applications
                    </p>
                  </div>
                  <ChevronRight size={20} className="text-gold-500" />
                </button>
              </div>
            </div>
          )}

          {/* JOB DETAIL PAGE */}
          {currentPage === 'job' && selectedJob && (
            <div className="space-y-4">
              <div className="bg-dark-surface border border-dark-border rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{JOBS_DATA[selectedJob].icon}</span>
                  <div>
                    <h2 className="font-heading font-bold text-xl">
                      {JOBS_DATA[selectedJob].title}
                    </h2>
                    <p className="text-accent-gray text-sm">
                      {JOBS_DATA[selectedJob].description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => startChecklist(selectedJob)}
                  className="mt-4 w-full bg-gold-500 text-dark-bg font-heading font-bold py-2 rounded-lg hover:bg-gold-400 transition-colors flex items-center justify-center gap-2"
                >
                  <CheckSquare size={18} />
                  Start Checklist
                </button>
              </div>

              <div className="space-y-3">
                {JOBS_DATA[selectedJob].steps.map((step, idx) => (
                  <div
                    key={step.id}
                    className="bg-dark-surface border border-dark-border rounded-lg p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-6 h-6 rounded-full bg-gold-500 text-dark-bg flex items-center justify-center text-xs font-bold">
                          {step.id}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading font-bold text-base">
                          {step.name}
                        </h3>
                        <p className="text-accent-gray text-sm mt-1">
                          {step.description}
                        </p>

                        {step.product && (
                          <div className="mt-2 bg-dark-bg rounded p-2">
                            <p className="text-xs font-bold text-gold-500">
                              PRODUCT:{' '}
                              {Array.isArray(step.product)
                                ? step.product.join(', ')
                                : step.product}
                            </p>
                          </div>
                        )}

                        {step.dilution && (
                          <div className="mt-2 bg-dark-bg rounded p-2">
                            <p className="text-xs font-bold text-gold-500">
                              DILUTION:
                            </p>
                            <p className="text-xs mt-1">
                              {typeof step.dilution === 'object'
                                ? Object.entries(step.dilution)
                                    .map(([key, val]) => `${key}: ${val}`)
                                    .join(' | ')
                                : step.dilution}
                            </p>
                          </div>
                        )}

                        {step.notes && (
                          <p className="text-xs text-accent-gray italic mt-2">
                            💡 {step.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CHECKLIST PAGE */}
          {currentPage === 'checklist' && selectedJob && (
            <div className="space-y-4">
              <div className="bg-dark-surface border border-dark-border rounded-lg p-4 sticky top-20 z-40">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-heading font-bold text-lg">
                    {JOBS_DATA[selectedJob].title}
                  </h2>
                  <span className="text-2xl">{JOBS_DATA[selectedJob].icon}</span>
                </div>

                {/* Progress Bar */}
                <div className="bg-dark-border rounded h-2 overflow-hidden mb-2">
                  <div
                    className="bg-gold-500 h-full transition-all"
                    style={{
                      width: `${getJobCompletionPercent(selectedJob)}%`,
                    }}
                  />
                </div>
                <p className="text-sm font-bold">
                  {getJobCompletionPercent(selectedJob)}% Complete (
                  {
                    JOBS_DATA[selectedJob].steps.filter(
                      (step) => checklist[`${selectedJob}-${step.id}`]
                    ).length
                  }
                  /{JOBS_DATA[selectedJob].steps.length} steps)
                </p>
              </div>

              <div className="space-y-2">
                {JOBS_DATA[selectedJob].steps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => toggleStep(selectedJob, step.id)}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      checklist[`${selectedJob}-${step.id}`]
                        ? 'bg-gold-500 bg-opacity-10 border-gold-500'
                        : 'bg-dark-surface border-dark-border hover:border-gold-500'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0">
                        {checklist[`${selectedJob}-${step.id}`] ? (
                          <CheckCircle2 size={20} className="text-gold-500" />
                        ) : (
                          <Circle size={20} className="text-accent-gray" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3
                          className={`font-heading font-bold ${
                            checklist[`${selectedJob}-${step.id}`]
                              ? 'text-gold-500 line-through'
                              : ''
                          }`}
                        >
                          {step.name}
                        </h3>
                        <p
                          className={`text-sm mt-1 ${
                            checklist[`${selectedJob}-${step.id}`]
                              ? 'text-accent-gray line-through'
                              : 'text-accent-gray'
                          }`}
                        >
                          {step.description}
                        </p>

                        {step.product && (
                          <div className="mt-2 text-xs">
                            <span className="text-gold-500 font-bold">
                              Product:{' '}
                            </span>
                            <span>
                              {Array.isArray(step.product)
                                ? step.product.join(', ')
                                : step.product}
                            </span>
                          </div>
                        )}

                        {step.dilution && (
                          <div className="mt-1 text-xs">
                            <span className="text-gold-500 font-bold">
                              Dilution:{' '}
                            </span>
                            <span>
                              {typeof step.dilution === 'object'
                                ? Object.entries(step.dilution)
                                    .map(([key, val]) => `${key}: ${val}`)
                                    .join(' | ')
                                : step.dilution}
                            </span>
                          </div>
                        )}

                        {step.notes && (
                          <p className="text-xs text-accent-gray italic mt-2">
                            💡 {step.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {getJobCompletionPercent(selectedJob) === 100 && (
                <div className="mt-6 bg-gold-500 bg-opacity-10 border border-gold-500 rounded-lg p-4 text-center">
                  <p className="font-heading font-bold text-gold-500 text-lg">
                    ✓ Job Complete!
                  </p>
                  <p className="text-accent-gray text-sm mt-2">
                    Great work. All steps finished.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* PRODUCT DIRECTORY PAGE */}
          {currentPage === 'products' && (
            <div className="space-y-4">
              <div>
                <h2 className="font-heading font-bold text-2xl mb-4">
                  Product Directory
                </h2>

                {/* Search */}
                <div className="relative mb-6">
                  <Search
                    size={18}
                    className="absolute left-3 top-3 text-accent-gray"
                  />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-dark-surface border border-dark-border rounded-lg pl-10 pr-4 py-2 text-accent-light focus:outline-none focus:border-gold-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-3 text-accent-gray hover:text-accent-light"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="space-y-3">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.key}
                      className="bg-dark-surface border border-dark-border rounded-lg p-4"
                    >
                      <h3 className="font-heading font-bold text-base text-gold-500">
                        {product.name}
                      </h3>
                      <p className="text-xs text-accent-gray mt-1">
                        {product.type}
                      </p>

                      <p className="text-sm mt-3 leading-relaxed">
                        {product.purpose}
                      </p>

                      {product.dilution && (
                        <div className="mt-3 bg-dark-bg rounded p-2">
                          <p className="text-xs font-bold text-gold-500">
                            DILUTION
                          </p>
                          <p className="text-xs mt-1">
                            {typeof product.dilution === 'object'
                              ? Object.entries(product.dilution)
                                  .map(([key, val]) => `${key}: ${val}`)
                                  .join(' | ')
                              : product.dilution}
                          </p>
                        </div>
                      )}

                      {product.application && (
                        <div className="mt-3 bg-dark-bg rounded p-2">
                          <p className="text-xs font-bold text-gold-500">
                            APPLICATION
                          </p>
                          <p className="text-xs mt-1">{product.application}</p>
                        </div>
                      )}

                      {product.coverage && (
                        <div className="mt-3 bg-dark-bg rounded p-2">
                          <p className="text-xs font-bold text-gold-500">
                            COVERAGE
                          </p>
                          <p className="text-xs mt-1">{product.coverage}</p>
                        </div>
                      )}

                      {product.services && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {product.services.map((service) => (
                            <span
                              key={service}
                              className="text-xs bg-gold-500 bg-opacity-20 text-gold-400 px-2 py-1 rounded"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-accent-gray">
                    No products found matching "{searchQuery}"
                  </p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </>
  );
}
