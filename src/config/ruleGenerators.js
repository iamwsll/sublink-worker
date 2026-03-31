/**
 * Rule Generators
 * Functions for generating rules and rule sets
 */

import { PREDEFINED_RULE_SETS, buildRuleContext } from './rules.js';
import { SITE_RULE_SET_BASE_URL, IP_RULE_SET_BASE_URL, CLASH_SITE_RULE_SET_BASE_URL, CLASH_IP_RULE_SET_BASE_URL } from './ruleUrls.js';

function toStringArray(value) {
	if (Array.isArray(value)) {
		return value
			.filter(x => typeof x === 'string').map(x => x.trim())
			.filter(Boolean);
	}
	if (typeof value === 'string') {
		return value.split(',').map(x => x.trim()).filter(Boolean);
	}
	return [];
}

function getRuleSetOverride(ruleSetOverrides, ruleName) {
	return ruleSetOverrides[ruleName] || null;
}

// Helper function to get outbounds based on selected rule names
export function getOutbounds(selectedRuleNames, customRuleGroups = []) {
	const { rules } = buildRuleContext(customRuleGroups);
	if (!selectedRuleNames || !Array.isArray(selectedRuleNames)) {
		return [];
	}
	return rules
		.filter(rule => selectedRuleNames.includes(rule.name))
		.map(rule => rule.name);
}

// Helper function to generate rules based on selected rule names
export function generateRules(selectedRules = [], customRules = [], customRuleGroups = []) {
	const { rules: unifiedRules } = buildRuleContext(customRuleGroups);
	if (typeof selectedRules === 'string' && PREDEFINED_RULE_SETS[selectedRules]) {
		selectedRules = PREDEFINED_RULE_SETS[selectedRules];
	}

	if (!selectedRules || selectedRules.length === 0) {
		selectedRules = PREDEFINED_RULE_SETS.minimal;
	}

	const generatedRules = [];

	unifiedRules.forEach(rule => {
		if (selectedRules.includes(rule.name)) {
			generatedRules.push({
				site_rules: rule.site_rules,
				ip_rules: rule.ip_rules,
				domain_suffix: rule?.domain_suffix,
				domain_keyword: rule?.domain_keyword,
				ip_cidr: rule?.ip_cidr,
				outbound: rule.name
			});
		}
	});

	customRules.reverse();
	customRules.forEach((rule) => {
		generatedRules.unshift({
			site_rules: toStringArray(rule.site),
			ip_rules: toStringArray(rule.ip),
			domain_suffix: toStringArray(rule.domain_suffix),
			domain_keyword: toStringArray(rule.domain_keyword),
			ip_cidr: toStringArray(rule.ip_cidr),
			src_ip_cidr: toStringArray(rule.src_ip_cidr),
			protocol: toStringArray(rule.protocol),
			outbound: rule.name
		});
	});

	return generatedRules;
}

export function generateRuleSets(selectedRules = [], customRules = [], customRuleGroups = []) {
	const { rules: unifiedRules, ruleSetOverrides } = buildRuleContext(customRuleGroups);
	if (typeof selectedRules === 'string' && PREDEFINED_RULE_SETS[selectedRules]) {
		selectedRules = PREDEFINED_RULE_SETS[selectedRules];
	}

	if (!selectedRules || selectedRules.length === 0) {
		selectedRules = PREDEFINED_RULE_SETS.minimal;
	}

	const selectedRulesSet = new Set(selectedRules);

	const siteRuleSets = new Set();
	const ipRuleSets = new Set();

	const ruleSets = [];

	unifiedRules.forEach(rule => {
		if (selectedRulesSet.has(rule.name)) {
			rule.site_rules.forEach(siteRule => siteRuleSets.add(siteRule));
			rule.ip_rules.forEach(ipRule => ipRuleSets.add(ipRule));
		}
	});

	const site_rule_sets = Array.from(siteRuleSets).map(rule => {
		const override = getRuleSetOverride(ruleSetOverrides, rule);
		return {
			tag: rule,
			type: 'remote',
			format: override?.singbox_format || 'binary',
			url: override?.url || `${SITE_RULE_SET_BASE_URL}geosite-${rule}.srs`,
		};
	});

	const ip_rule_sets = Array.from(ipRuleSets).map(rule => {
		const override = getRuleSetOverride(ruleSetOverrides, `${rule}-ip`);
		return {
			tag: `${rule}-ip`,
			type: 'remote',
			format: override?.singbox_format || 'binary',
			url: override?.url || `${IP_RULE_SET_BASE_URL}geoip-${rule}.srs`,
		};
	});

	if (!selectedRules.includes('Non-China')) {
		site_rule_sets.push({
			tag: 'geolocation-!cn',
			type: 'remote',
			format: 'binary',
			url: `${SITE_RULE_SET_BASE_URL}geosite-geolocation-!cn.srs`,
		});
	}

	if (customRules) {
		customRules.forEach(rule => {
			toStringArray(rule.site).forEach(site => {
				site_rule_sets.push({
					tag: site,
					type: 'remote',
					format: 'binary',
					url: `${SITE_RULE_SET_BASE_URL}geosite-${site}.srs`,
				});
			});
			toStringArray(rule.ip).forEach(ip => {
				ip_rule_sets.push({
					tag: `${ip}-ip`,
					type: 'remote',
					format: 'binary',
					url: `${IP_RULE_SET_BASE_URL}geoip-${ip}.srs`,
				});
			});
		});
	}

	ruleSets.push(...site_rule_sets, ...ip_rule_sets);

	return { site_rule_sets, ip_rule_sets };
}

// Generate rule sets for Clash using .mrs format
export function generateClashRuleSets(selectedRules = [], customRules = [], useMrs = true, customRuleGroups = []) {
	const { rules: unifiedRules, ruleSetOverrides } = buildRuleContext(customRuleGroups);
	if (typeof selectedRules === 'string' && PREDEFINED_RULE_SETS[selectedRules]) {
		selectedRules = PREDEFINED_RULE_SETS[selectedRules];
	}

	if (!selectedRules || selectedRules.length === 0) {
		selectedRules = PREDEFINED_RULE_SETS.minimal;
	}

	// Determine format based on client compatibility
	const format = useMrs ? 'mrs' : 'yaml';
	const ext = useMrs ? '.mrs' : '.yaml';

	const selectedRulesSet = new Set(selectedRules);

	const siteRuleSets = new Set();
	const ipRuleSets = new Set();

	unifiedRules.forEach(rule => {
		if (selectedRulesSet.has(rule.name)) {
			rule.site_rules.forEach(siteRule => siteRuleSets.add(siteRule));
			rule.ip_rules.forEach(ipRule => ipRuleSets.add(ipRule));
		}
	});

	const site_rule_providers = {};
	const ip_rule_providers = {};

	Array.from(siteRuleSets).forEach(rule => {
		const override = getRuleSetOverride(ruleSetOverrides, rule);
		const ruleFormat = override?.clash_format || format;
		const ruleExt = ruleFormat === 'text' ? '.list' : (ext || '.mrs');
		site_rule_providers[rule] = {
			type: 'http',
			format: ruleFormat,
			behavior: override?.clash_behavior || 'domain',
			url: override?.url || `${CLASH_SITE_RULE_SET_BASE_URL}${rule}${ext}`,
			path: `./ruleset/${rule}${ruleExt}`,
			interval: 86400
		};
	});

	Array.from(ipRuleSets).forEach(rule => {
		const override = getRuleSetOverride(ruleSetOverrides, `${rule}-ip`);
		ip_rule_providers[`${rule}-ip`] = {
			type: 'http',
			format: override?.clash_format || format,
			behavior: override?.clash_behavior || 'ipcidr',
			url: override?.url || `${CLASH_IP_RULE_SET_BASE_URL}${rule}${ext}`,
			path: `./ruleset/${rule}-ip${override?.clash_format === 'text' ? '.list' : ext}`,
			interval: 86400
		};
	});

	// Add Non-China rule set if not included
	if (!selectedRules.includes('Non-China')) {
		site_rule_providers['geolocation-!cn'] = {
			type: 'http',
			format: format,
			behavior: 'domain',
			url: `${CLASH_SITE_RULE_SET_BASE_URL}geolocation-!cn${ext}`,
			path: `./ruleset/geolocation-!cn${ext}`,
			interval: 86400
		};
	}

	// Add custom rules
	if (customRules) {
		customRules.forEach(rule => {
			toStringArray(rule.site).forEach(site => {
				site_rule_providers[site] = {
					type: 'http',
					format: format,
					behavior: 'domain',
					url: `${CLASH_SITE_RULE_SET_BASE_URL}${site}${ext}`,
					path: `./ruleset/${site}${ext}`,
					interval: 86400
				};
			});
			toStringArray(rule.ip).forEach(ip => {
				ip_rule_providers[`${ip}-ip`] = {
					type: 'http',
					format: format,
					behavior: 'ipcidr',
					url: `${CLASH_IP_RULE_SET_BASE_URL}${ip}${ext}`,
					path: `./ruleset/${ip}-ip${ext}`,
					interval: 86400
				};
			});
		});
	}

	return { site_rule_providers, ip_rule_providers };
}
