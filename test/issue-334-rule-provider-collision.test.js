import { describe, it, expect } from 'vitest';
import yaml from 'js-yaml';
import { ClashConfigBuilder } from '../src/builders/ClashConfigBuilder.js';
import { generateRuleSets, generateClashRuleSets } from '../src/config/ruleGenerators.js';

const SS_INPUT = `
ss://YWVzLTEyOC1nY206dGVzdA@example.com:443#HK-Node-1
ss://YWVzLTEyOC1nY206dGVzdA@example.com:444#US-Node-1
`;

describe('Issue #334: rule-provider key collision fix', () => {
  it('google site provider should not be overwritten by ip provider', async () => {
    const builder = new ClashConfigBuilder(SS_INPUT, 'balanced', [], null, 'zh-CN', 'mihomo/1.0');
    const yamlText = await builder.build();
    const config = yaml.load(yamlText);
    const providers = config['rule-providers'];

    // google (site) should be domain behavior
    expect(providers.google).toBeDefined();
    expect(providers.google.behavior).toBe('domain');
    expect(providers.google.url).toContain('geosite');

    // google-ip should exist separately
    expect(providers['google-ip']).toBeDefined();
    expect(providers['google-ip'].behavior).toBe('ipcidr');
    expect(providers['google-ip'].url).toContain('geoip');
  });

  it('cn site provider should not be overwritten by ip provider', async () => {
    const builder = new ClashConfigBuilder(SS_INPUT, 'balanced', [], null, 'zh-CN', 'mihomo/1.0');
    const yamlText = await builder.build();
    const config = yaml.load(yamlText);
    const providers = config['rule-providers'];

    // cn (site) should be domain behavior
    expect(providers.cn).toBeDefined();
    expect(providers.cn.behavior).toBe('domain');

    // cn-ip should exist separately
    expect(providers['cn-ip']).toBeDefined();
    expect(providers['cn-ip'].behavior).toBe('ipcidr');
  });

  it('rules should reference correct provider keys', async () => {
    const builder = new ClashConfigBuilder(SS_INPUT, 'balanced', [], null, 'zh-CN', 'mihomo/1.0');
    const yamlText = await builder.build();
    const config = yaml.load(yamlText);

    // Site rules use plain key
    expect(config.rules).toContainEqual(expect.stringMatching(/^RULE-SET,google,.*谷歌/));
    // IP rules use -ip suffixed key
    expect(config.rules).toContainEqual(expect.stringMatching(/^RULE-SET,google-ip,.*谷歌.*no-resolve/));
    // Non-China should still work
    expect(config.rules).toContainEqual(expect.stringMatching(/^RULE-SET,geolocation-!cn,.*非中国/));
  });

  it('google domain rule should come before non-china rule', async () => {
    const builder = new ClashConfigBuilder(SS_INPUT, 'balanced', [], null, 'zh-CN', 'mihomo/1.0');
    const yamlText = await builder.build();
    const config = yaml.load(yamlText);

    const googleIdx = config.rules.findIndex(r => r.match(/^RULE-SET,google,/));
    const nonChinaIdx = config.rules.findIndex(r => r.includes('geolocation-!cn'));
    expect(googleIdx).toBeGreaterThan(-1);
    expect(nonChinaIdx).toBeGreaterThan(-1);
    expect(googleIdx).toBeLessThan(nonChinaIdx);
  });

  it('icloud us rule should be before apple rule to ensure higher priority', async () => {
    const builder = new ClashConfigBuilder(SS_INPUT, 'default', [], null, 'zh-CN', 'mihomo/1.0');
    const yamlText = await builder.build();
    const config = yaml.load(yamlText);

    const iCloudIdx = config.rules.findIndex(r => r.match(/^RULE-SET,icloud-us,/));
    const appleIdx = config.rules.findIndex(r => r.match(/^RULE-SET,apple,/));
    expect(iCloudIdx).toBeGreaterThan(-1);
    expect(appleIdx).toBeGreaterThan(-1);
    expect(iCloudIdx).toBeLessThan(appleIdx);
  });

  it('icloud us provider should subscribe upstream URL directly', async () => {
    const builder = new ClashConfigBuilder(SS_INPUT, 'default', [], null, 'zh-CN', 'mihomo/1.0');
    const yamlText = await builder.build();
    const config = yaml.load(yamlText);
    const providers = config['rule-providers'];

    expect(providers['icloud-us']).toBeDefined();
    expect(providers['icloud-us'].url).toBe('https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Loon/iCloud/iCloud.list');
    expect(providers['icloud-us'].format).toBe('text');
    expect(providers['icloud-us'].behavior).toBe('classical');
  });

  it('icloud us override should be reusable in sing-box and clash generators', () => {
    const { site_rule_sets } = generateRuleSets(['icloud美区']);
    const iCloudRuleSet = site_rule_sets.find(rule => rule.tag === 'icloud-us');
    expect(iCloudRuleSet).toBeDefined();
    expect(iCloudRuleSet.format).toBe('source');
    expect(iCloudRuleSet.url).toBe('https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Loon/iCloud/iCloud.list');

    const { site_rule_providers } = generateClashRuleSets(['icloud美区'], [], true);
    expect(site_rule_providers['icloud-us']).toBeDefined();
    expect(site_rule_providers['icloud-us'].format).toBe('text');
    expect(site_rule_providers['icloud-us'].behavior).toBe('classical');
    expect(site_rule_providers['icloud-us'].path).toBe('./ruleset/icloud-us.list');
  });

  it('non-overridden clash rules should keep mrs format behavior', () => {
    const { site_rule_providers } = generateClashRuleSets(['AI Services'], [], true);
    expect(site_rule_providers['category-ai-!cn']).toBeDefined();
    expect(site_rule_providers['category-ai-!cn'].format).toBe('mrs');
    expect(site_rule_providers['category-ai-!cn'].behavior).toBe('domain');
  });
});
