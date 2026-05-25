const MARKET_BENCHMARKS = {
  'SAP S/4 HANA': {
    savings: 0.3,
    breakeven: 18,
    risk: 'high-cost-modern-core',
    rationale: 'Suite enterprise moderna con costo alto de licenciamiento, soporte especializado y oportunidades claras de racionalizacion.',
  },
  'SAP ECC': {
    savings: 0.35,
    breakeven: 16,
    risk: 'legacy-deadline-pressure',
    rationale: 'ERP legacy con presion de modernizacion, costos de soporte crecientes y alto potencial de simplificacion operativa.',
  },
  'Oracle EBS R12': {
    savings: 0.25,
    breakeven: 14,
    risk: 'oracle-modernization',
    rationale: 'Base Oracle con camino natural hacia Fusion, menor friccion funcional y buen potencial de continuidad tecnica.',
  },
  'Oracle JD Edwards': {
    savings: 0.2,
    breakeven: 12,
    risk: 'distributed-legacy',
    rationale: 'Ambientes maduros con procesos distribuidos; el ahorro depende de consolidacion e integraciones.',
  },
  'Oracle PeopleSoft': {
    savings: 0.22,
    breakeven: 14,
    risk: 'specialized-legacy',
    rationale: 'Plataforma estable pero especializada; el caso mejora cuando hay presion por talento, soporte o reporting.',
  },
  'Microsoft Dynamics 365': {
    savings: 0.28,
    breakeven: 18,
    risk: 'platform-comparison',
    rationale: 'El caso depende de alcance financiero, integraciones y gobierno de datos frente a stack Microsoft existente.',
  },
  NetSuite: {
    savings: 0.15,
    breakeven: 20,
    risk: 'midmarket-fit',
    rationale: 'Suele tener menor costo base; el caso Oracle requiere complejidad operativa, expansion o control financiero superior.',
  },
  'Otro / Greenfield': {
    savings: 0.3,
    breakeven: 18,
    risk: 'greenfield-standardization',
    rationale: 'Caso abierto donde el potencial depende de estandarizacion, volumen transaccional y urgencia de control.',
  },
};

const INDUSTRY_MULTIPLIER = {
  'Servicios financieros': 1.08,
  'Inmobiliario / Centros comerciales': 1.06,
  'Logistica / Distribucion / Transporte': 1.05,
  Otra: 1,
};

const TRANSACTION_MULTIPLIER = {
  '<10K': 0.96,
  '10K-100K': 1,
  '100K-1M': 1.06,
  '>1M': 1.12,
};

const PAIN_MULTIPLIER = {
  'Costo total demasiado alto': 1.08,
  'Reportes financieros lentos o manuales': 1.04,
  'Cierre contable complejo': 1.06,
  'Soporte caro o poco disponible': 1.05,
  'Obsolescencia / riesgo de continuidad': 1.07,
  'Solo explorando': 0.96,
};

const TIMELINE_SCORE = {
  '0-3 meses': 22,
  '3-6 meses': 16,
  '6-12 meses': 9,
  'Solo explorando': 3,
};

const TARGET_SCORE = {
  'Oracle Fusion Cloud': 18,
  'OCI + Oracle Fusion': 16,
  'Comparar Oracle contra otras opciones': 12,
  'No definido': 4,
};

function asNumber(value) {
  const next = Number(value);
  if (!Number.isFinite(next)) return 0;
  return Math.max(0, next);
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getBenchmark(erp) {
  return MARKET_BENCHMARKS[erp] || MARKET_BENCHMARKS['Otro / Greenfield'];
}

function calculateMarketTco(payload) {
  const benchmark = getBenchmark(payload.erp);
  const users = clamp(asNumber(payload.users), 1, 50000);
  const licenseCost = asNumber(payload.licenseCost);
  const infraCost = asNumber(payload.infraCost);
  const supportCost = asNumber(payload.supportCost);
  const totalAnnualCost = licenseCost + infraCost + supportCost;
  const industryMultiplier = INDUSTRY_MULTIPLIER[payload.industry] || 1;
  const transactionMultiplier = TRANSACTION_MULTIPLIER[payload.monthlyTransactions] || 1;
  const painMultiplier = PAIN_MULTIPLIER[payload.primaryPain] || 1;
  const adjustedSavingsRate = clamp(
    benchmark.savings * industryMultiplier * transactionMultiplier * painMultiplier,
    0.08,
    0.42
  );
  const annualSavings = totalAnnualCost * adjustedSavingsRate;
  const oracleAnnualCost = totalAnnualCost - annualSavings;
  const migrationInvestment = Math.max(totalAnnualCost * 0.42, users * 1200, 85000);
  const breakeven = annualSavings > 0
    ? Math.max(6, Math.ceil((migrationInvestment / annualSavings) * 12))
    : benchmark.breakeven;
  const urgencyScore = TIMELINE_SCORE[payload.decisionTimeline] || 0;
  const targetScore = TARGET_SCORE[payload.targetScenario] || 0;
  const costScore = totalAnnualCost >= 1000000 ? 25 : totalAnnualCost >= 500000 ? 20 : totalAnnualCost >= 250000 ? 14 : 8;
  const volumeScore = payload.monthlyTransactions === '>1M' ? 14 : payload.monthlyTransactions === '100K-1M' ? 10 : 5;
  const painScore = payload.primaryPain && payload.primaryPain !== 'Solo explorando' ? 12 : 3;
  const qualificationScore = clamp(costScore + urgencyScore + targetScore + volumeScore + painScore, 0, 100);

  return {
    totalAnnualCost,
    oracleAnnualCost,
    currentTCO1y: totalAnnualCost,
    currentTCO3y: totalAnnualCost * 3,
    currentTCO5y: totalAnnualCost * 5,
    currentTCO10y: totalAnnualCost * 10,
    oracleTCO1y: oracleAnnualCost,
    oracleTCO3y: oracleAnnualCost * 3,
    oracleTCO5y: oracleAnnualCost * 5,
    oracleTCO10y: oracleAnnualCost * 10,
    annualSavings,
    savings5y: annualSavings * 5,
    savings10y: annualSavings * 10,
    migrationInvestment,
    breakeven,
    percentReduction: adjustedSavingsRate * 100,
    qualificationScore,
    market: {
      erp: payload.erp,
      risk: benchmark.risk,
      rationale: benchmark.rationale,
      savingsRateBase: benchmark.savings,
      savingsRateAdjusted: adjustedSavingsRate,
      multipliers: {
        industry: industryMultiplier,
        transactions: transactionMultiplier,
        pain: painMultiplier,
      },
    },
    recommendation: buildRecommendation({
      score: qualificationScore,
      breakeven,
      annualSavings,
      targetScenario: payload.targetScenario,
      decisionTimeline: payload.decisionTimeline,
    }),
  };
}

function buildRecommendation({ score, breakeven, annualSavings, targetScenario, decisionTimeline }) {
  if (score >= 75) {
    return {
      level: 'Alta prioridad',
      nextStep: 'Preparar TCO Comparator privado con supuestos financieros y arquitectura objetivo.',
      summary: `Caso fuerte: ahorro anual estimado de USD ${Math.round(annualSavings).toLocaleString('en-US')} y breakeven aproximado de ${breakeven} meses.`,
    };
  }

  if (score >= 50) {
    return {
      level: 'Evaluacion recomendada',
      nextStep: 'Validar costos reales, contratos, integraciones y ventanas de decision.',
      summary: `Hay senales razonables para comparar. El escenario ${targetScenario || 'no definido'} y plazo ${decisionTimeline || 'no definido'} deben confirmarse.`,
    };
  }

  return {
    level: 'Exploratorio',
    nextStep: 'Mantener como benchmark preliminar y pedir mas contexto antes de una sesion senior.',
    summary: 'El caso todavia necesita mas urgencia, costo o claridad de objetivo para justificar una revision profunda.',
  };
}

exports.calculate = (req, res) => {
  try {
    const result = calculateMarketTco(req.body || {});
    res.json({ ok: true, result });
  } catch (err) {
    console.error('erpTco.calculate error:', err);
    res.status(500).json({ error: 'No se pudo calcular el TCO de mercado.' });
  }
};

exports.calculateMarketTco = calculateMarketTco;
