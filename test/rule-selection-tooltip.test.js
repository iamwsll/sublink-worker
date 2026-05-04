import { describe, it, expect } from 'vitest';
import { createTranslator } from '../src/i18n/index.js';

describe('ruleSelectionTooltip', () => {
  const expectedSources = [
    'lyc8503/sing-box-rules',
    'MetaCubeX/meta-rules-dat',
    'NSZA156/surge-geox-rules'
  ];

  it.each(['zh-CN', 'en-US', 'fa', 'ru'])('mentions ruleset sources in %s', (lang) => {
    const t = createTranslator(lang);
    const tooltip = t('ruleSelectionTooltip');

    expectedSources.forEach(source => {
      expect(tooltip).toContain(source);
    });
  });
});
