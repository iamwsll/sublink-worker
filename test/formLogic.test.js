import { describe, it, expect } from 'vitest';
import { formLogicFn } from '../src/components/formLogic.js';

describe('formLogic toString fix', () => {
  it('includes parseSurgeConfigInput definition in toString output', () => {
    const fnString = formLogicFn.toString();

    // Verify the function references parseSurgeConfigInput
    expect(fnString).toContain('parseSurgeConfigInput');

    // Verify the arrow function definitions ARE included
    expect(fnString).toMatch(/(?:const|var|let)\s+parseSurgeConfigInput\s*=/);
    expect(fnString).toMatch(/(?:const|var|let)\s+parseSurgeValue\s*=/);
    expect(fnString).toMatch(/(?:const|var|let)\s+convertSurgeIniToJson\s*=/);
  });

  it('does not contain __name calls that break in browser runtime', () => {
    const fnString = formLogicFn.toString();
    // Ensure no function declarations that esbuild would inject __name() for
    expect(fnString).not.toMatch(/^\s*function\s+parseSurgeValue\b/m);
    expect(fnString).not.toMatch(/^\s*function\s+convertSurgeIniToJson\b/m);
    expect(fnString).not.toMatch(/^\s*function\s+parseSurgeConfigInput\b/m);
  });

  it('formData() returns a valid Alpine data object', () => {
    // Simulate browser global environment using Function constructor
    const fakeWindow = { APP_TRANSLATIONS: {}, PREDEFINED_RULE_SETS: {} };
    const fn = new Function('window', '(' + formLogicFn.toString() + ')(); return window;');
    const result = fn(fakeWindow);
    const data = result.formData();
    expect(typeof data.submitForm).toBe('function');
    expect(typeof data.toggleAccordion).toBe('function');
    expect(typeof data.translateOutbound).toBe('function');
    expect(data.showAdvanced).toBe(false);
  });

  it('restores UDP option from URL and expands advanced options', () => {
    const fakeWindow = {
      APP_TRANSLATIONS: {},
      PREDEFINED_RULE_SETS: {},
      location: { href: 'https://example.com/', search: '' },
      history: { replaceState: () => { } },
      dispatchEvent: () => { }
    };
    const fn = new Function('window', '(' + formLogicFn.toString() + ')(); return window;');
    const result = fn(fakeWindow);
    const data = result.formData();
    data.populateFormFromUrl(new URL('https://example.com/clash?config=abc&udp=true'));

    expect(data.forceUdp).toBe(true);
    expect(data.showAdvanced).toBe(true);
  });

  it('applies preset rule defaults for the default template', () => {
    const fakeWindow = {
      APP_TRANSLATIONS: {},
      PREDEFINED_RULE_SETS: {
        default: ['Bilibili', 'Microsoft', 'Apple', '隐私防护', 'AdBlock', '应用净化']
      },
      PREDEFINED_RULE_GROUP_DEFAULTS: {
        default: {
          'Ad Block': 'REJECT',
          '隐私防护': 'REJECT',
          AdBlock: 'REJECT',
          '应用净化': 'REJECT',
          Bilibili: 'DIRECT',
          Microsoft: 'DIRECT',
          Apple: 'DIRECT'
        }
      }
    };
    const fn = new Function('window', '(' + formLogicFn.toString() + ')(); return window;');
    const result = fn(fakeWindow);
    const data = result.formData();
    data.selectedPredefinedRule = 'default';
    data.applyPredefinedRule();

    expect(data.selectedRules).toEqual(['Bilibili', 'Microsoft', 'Apple', '隐私防护', 'AdBlock', '应用净化']);
    expect(data.groupDefaults).toEqual({
      'Ad Block': 'REJECT',
      '隐私防护': 'REJECT',
      AdBlock: 'REJECT',
      '应用净化': 'REJECT',
      Bilibili: 'DIRECT',
      Microsoft: 'DIRECT',
      Apple: 'DIRECT'
    });
  });
});
