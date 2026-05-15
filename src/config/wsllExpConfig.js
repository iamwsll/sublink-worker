export const WSLL_EXP_CLASH_RULE_BASE = 'https://raw.githubusercontent.com/iamwsll/myACL4SSR/master/Clash/GeneralClashConfig.yml';
export const WSLL_EXP_QUANX_RULE_BASE = 'https://gist.githubusercontent.com/iamwsll/e2ab043dd387bf5e28cf790f746978c7/raw/quanx.conf';

export const WSLL_EXP_CLASH_BASE_CONFIG = {
	'mixed-port': 7890,
	'socks-port': 7891,
	'allow-lan': true,
	'bind-address': '*',
	'ipv6': true,
	'mode': 'rule',
	'log-level': 'info',
	'external-controller': '127.0.0.1:9090',
	'experimental': {
		'ignore-resolve-fail': true,
		'sniff-tls-sni': true
	},
	'hosts': {
		'dns.alidns.com': ['223.5.5.5', '223.6.6.6'],
		'doh.pub': ['1.12.12.12', '120.53.53.53'],
		'dot.pub': ['1.12.12.12', '120.53.53.53'],
		'cloudflare-dns.com': ['104.16.248.249', '104.16.249.249'],
		'dns.google': ['8.8.8.8', '8.8.4.4'],
		'dns.quad9.net': ['9.9.9.9', '149.112.112.112']
	},
	'dns': {
		'enable': true,
		'ipv6': true,
		'listen': '127.0.0.1:53',
		'enhanced-mode': 'fake-ip',
		'fake-ip-range': '198.18.0.1/16',
		'fake-ip-filter-mode': 'blacklist',
		'fake-ip-filter': [
			'*.lan',
			'*.local',
			'*.arpa',
			'time.*.com',
			'ntp.*.com',
			'+.market.xiaomi.com',
			'localhost.ptlogin2.qq.com',
			'*.msftncsi.com',
			'www.msftconnecttest.com',
			'+.tailscale.net',
			'100.64.0.0/10'
		],
		'prefer-h3': false,
		'respect-rules': true,
		'use-hosts': true,
		'use-system-hosts': false,
		'default-nameserver': [
			'https://223.5.5.5/dns-query#skip-cert-verify=true',
			'https://1.12.12.12/dns-query#skip-cert-verify=true'
		],
		'proxy-server-nameserver': [
			'https://doh.pub/dns-query',
			'https://dns.alidns.com/dns-query'
		],
		'nameserver': [
			'https://cloudflare-dns.com/dns-query#RULES',
			'https://dns.google/dns-query#RULES',
			'https://dns.quad9.net/dns-query#RULES',
			'https://doh.pub/dns-query',
			'tls://dot.pub:853',
			'https://dns.alidns.com/dns-query',
			'tls://dns.alidns.com:853'
		]
	},
	'cfw-latency-timeout': 3000,
	'cfw-latency-url': 'http://www.gstatic.com/generate_204',
	'cfw-conn-break-strategy': {
		'proxy': 'none',
		'profile': true,
		'mode': false
	},
	'cfw-proxies-order': 'default',
	'tun': {
		'enable': true,
		'stack': 'mixed',
		'auto-route': true,
		'auto-detect-interface': true,
		'exclude-interface': ['tailscale0'],
		'route-exclude-address': ['100.64.0.0/10', '192.200.0.0/24']
	},
	'proxies': [],
	'proxy-groups': [],
	'rule-providers': {},
	'rules': []
};

const WSLL_EXP_LINES_BEFORE_BASES = [
	'[custom]',
	';不要随意改变关键字，否则会导致出错',
	';acl4SSR规则-基于ACL4SSR_Online_Full_Google.ini,加上了adblock的两条规则和隐私防护规则',
	'',
	';去广告：支持',
	';自动测速：支持',
	';微软分流：支持',
	';苹果分流：支持',
	';增强中国IP段：支持',
	';增强国外GFW：支持',
	'',
	';设置规则标志位',
	'ruleset=🎯 全球直连,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/LocalAreaNetwork.list',
	'ruleset=🎯 全球直连,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/UnBan.list',
	'ruleset=🛑 广告拦截,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanAD.list',
	'ruleset=🍃 应用净化,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanProgramAD.list',
	'ruleset=🆎 AdBlock,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanEasyList.list',
	'ruleset=🆎 AdBlock,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanEasyListChina.list',
	'ruleset=🛡️ 隐私防护,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanEasyPrivacy.list',
	'ruleset=📢 谷歌FCM,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/GoogleFCM.list',
	'ruleset=📢 谷歌🇨🇳Play下载,[]DOMAIN-SUFFIX,xn--ngstr-lra8j.com',
	'ruleset=📢 谷歌🇨🇳Play服务,[]DOMAIN-SUFFIX,services.googleapis.cn',
	'ruleset=📢 谷歌🇨🇳Play服务,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/GoogleCNProxyIP.list',
	'ruleset=📢 谷歌🇨🇳,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/GoogleCN.list',
	'ruleset=📹 油管视频,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/YouTube.list',
	'ruleset=📢 谷歌,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Google.list',
	'ruleset=Ⓜ️ 微软Bing,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Bing.list',
	'ruleset=Ⓜ️ 微软云盘,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/OneDrive.list',
	'ruleset=Ⓜ️ 微软服务,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Microsoft.list',
	'ruleset=🍎 苹果服务,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Apple.list',
	'ruleset=📲 电报消息,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Telegram.list',
	'ruleset=💬 Ai平台,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/AI.list',
	'ruleset=💬 Ai平台,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/OpenAi.list',
	'ruleset=🎶 网易音乐,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/NetEaseMusic.list',
	'ruleset=🎮 游戏平台,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Epic.list',
	'ruleset=🎮 游戏平台,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Origin.list',
	'ruleset=🎮 游戏平台,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Sony.list',
	'ruleset=🎮 游戏平台,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Steam.list',
	'ruleset=🎮 游戏平台,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Nintendo.list',
	'ruleset=🎥 奈飞视频,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Netflix.list',
	'ruleset=📺 巴哈姆特,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Bahamut.list',
	'ruleset=📺 哔哩哔哩,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/BilibiliHMT.list',
	'ruleset=📺 哔哩哔哩,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Bilibili.list',
	'ruleset=🌏 国内媒体,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ChinaMedia.list',
	'ruleset=🌍 国外媒体,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ProxyMedia.list',
	'ruleset=🚀 节点选择,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ProxyGFWlist.list',
	';ruleset=🎯 全球直连,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ChinaIp.list',
	'ruleset=🎯 全球直连,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ChinaDomain.list',
	'ruleset=🎯 全球直连,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ChinaCompanyIp.list',
	'ruleset=🎯 全球直连,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Download.list',
	';ruleset=🎯 全球直连,[]GEOIP,LAN',
	'ruleset=🎯 全球直连,[]GEOIP,CN',
	'ruleset=🐟 漏网之鱼,[]FINAL',
	';设置规则标志位',
	'',
	';设置分组标志位',
	'custom_proxy_group=🚀 节点选择`select`[]🚀 手动切换`[]🇭🇰 香港节点`[]🇨🇳 台湾节点`[]🇸🇬 狮城节点`[]🇯🇵 日本节点`[]🇺🇲 美国节点`[]🇰🇷 韩国节点`[]♻️ 自动选择`[]DIRECT',
	'custom_proxy_group=🚀 手动切换`select`.*',
	'custom_proxy_group=♻️ 自动选择`url-test`.*`http://www.gstatic.com/generate_204`300,,50',
	'custom_proxy_group=📲 电报消息`select`[]🚀 节点选择`[]♻️ 自动选择`[]🇸🇬 狮城节点`[]🇭🇰 香港节点`[]🇨🇳 台湾节点`[]🇯🇵 日本节点`[]🇺🇲 美国节点`[]🇰🇷 韩国节点`[]🚀 手动切换`[]DIRECT',
	'custom_proxy_group=💬 Ai平台`select`[]🚀 节点选择`[]♻️ 自动选择`[]🇸🇬 狮城节点`[]🇭🇰 香港节点`[]🇨🇳 台湾节点`[]🇯🇵 日本节点`[]🇺🇲 美国节点`[]🇰🇷 韩国节点`[]🚀 手动切换`[]DIRECT',
	'custom_proxy_group=📢 谷歌FCM`select`[]🚀 节点选择`[]DIRECT`[]🇺🇲 美国节点`[]🇭🇰 香港节点`[]🇨🇳 台湾节点`[]🇸🇬 狮城节点`[]🇯🇵 日本节点`[]🇰🇷 韩国节点`[]🚀 手动切换',
	'custom_proxy_group=📢 谷歌🇨🇳Play下载`select`[]🚀 节点选择`[]DIRECT`[]♻️ 自动选择`[]🇸🇬 狮城节点`[]🇭🇰 香港节点`[]🇨🇳 台湾节点`[]🇯🇵 日本节点`[]🇺🇲 美国节点`[]🇰🇷 韩国节点`[]🚀 手动切换',
	'custom_proxy_group=📢 谷歌🇨🇳Play服务`select`[]🚀 节点选择`[]DIRECT`[]♻️ 自动选择`[]🇸🇬 狮城节点`[]🇭🇰 香港节点`[]🇨🇳 台湾节点`[]🇯🇵 日本节点`[]🇺🇲 美国节点`[]🇰🇷 韩国节点`[]🚀 手动切换',
	'custom_proxy_group=📢 谷歌🇨🇳`select`[]🚀 节点选择`[]DIRECT`[]🇺🇲 美国节点`[]🇭🇰 香港节点`[]🇨🇳 台湾节点`[]🇸🇬 狮城节点`[]🇯🇵 日本节点`[]🇰🇷 韩国节点`[]🚀 手动切换',
	'custom_proxy_group=📢 谷歌`select`[]🚀 节点选择`[]DIRECT`[]♻️ 自动选择`[]🇸🇬 狮城节点`[]🇭🇰 香港节点`[]🇨🇳 台湾节点`[]🇯🇵 日本节点`[]🇺🇲 美国节点`[]🇰🇷 韩国节点`[]🚀 手动切换',
	'custom_proxy_group=📹 油管视频`select`[]🚀 节点选择`[]♻️ 自动选择`[]🇸🇬 狮城节点`[]🇭🇰 香港节点`[]🇨🇳 台湾节点`[]🇯🇵 日本节点`[]🇺🇲 美国节点`[]🇰🇷 韩国节点`[]🚀 手动切换`[]DIRECT',
	'custom_proxy_group=🎥 奈飞视频`select`[]🚀 节点选择`[]DIRECT`[]♻️ 自动选择`[]🇸🇬 狮城节点`[]🇭🇰 香港节点`[]🇨🇳 台湾节点`[]🇯🇵 日本节点`[]🇺🇲 美国节点`[]🇰🇷 韩国节点`[]🚀 手动切换',
	'custom_proxy_group=📺 巴哈姆特`select`[]🚀 节点选择`[]🇨🇳 台湾节点`[]🚀 手动切换`[]DIRECT',
	'custom_proxy_group=📺 哔哩哔哩`select`[]🎯 全球直连`[]🇨🇳 台湾节点`[]🇭🇰 香港节点',
	'custom_proxy_group=🌍 国外媒体`select`[]🚀 节点选择`[]♻️ 自动选择`[]🇭🇰 香港节点`[]🇨🇳 台湾节点`[]🇸🇬 狮城节点`[]🇯🇵 日本节点`[]🇺🇲 美国节点`[]🇰🇷 韩国节点`[]🚀 手动切换`[]DIRECT',
	'custom_proxy_group=🌏 国内媒体`select`[]DIRECT`[]🇭🇰 香港节点`[]🇨🇳 台湾节点`[]🇸🇬 狮城节点`[]🇯🇵 日本节点`[]🚀 手动切换',
	'custom_proxy_group=Ⓜ️ 微软Bing`select`[]🚀 节点选择`[]DIRECT`[]🇺🇲 美国节点`[]🇭🇰 香港节点`[]🇨🇳 台湾节点`[]🇸🇬 狮城节点`[]🇯🇵 日本节点`[]🇰🇷 韩国节点`[]🚀 手动切换',
	'custom_proxy_group=Ⓜ️ 微软云盘`select`[]🚀 节点选择`[]DIRECT`[]🇺🇲 美国节点`[]🇭🇰 香港节点`[]🇨🇳 台湾节点`[]🇸🇬 狮城节点`[]🇯🇵 日本节点`[]🇰🇷 韩国节点`[]🚀 手动切换',
	'custom_proxy_group=Ⓜ️ 微软服务`select`[]🚀 节点选择`[]DIRECT`[]🇺🇲 美国节点`[]🇭🇰 香港节点`[]🇨🇳 台湾节点`[]🇸🇬 狮城节点`[]🇯🇵 日本节点`[]🇰🇷 韩国节点`[]🚀 手动切换',
	'custom_proxy_group=🍎 苹果服务`select`[]DIRECT`[]🚀 节点选择`[]🇺🇲 美国节点`[]🇭🇰 香港节点`[]🇨🇳 台湾节点`[]🇸🇬 狮城节点`[]🇯🇵 日本节点`[]🇰🇷 韩国节点`[]🚀 手动切换',
	'custom_proxy_group=🎮 游戏平台`select`[]🚀 节点选择`[]DIRECT`[]🇺🇲 美国节点`[]🇭🇰 香港节点`[]🇨🇳 台湾节点`[]🇸🇬 狮城节点`[]🇯🇵 日本节点`[]🇰🇷 韩国节点`[]🚀 手动切换`[]♻️ 自动选择',
	'custom_proxy_group=🎶 网易音乐`select`[]DIRECT`[]🚀 节点选择`[]♻️ 自动选择`(网易|音乐|解锁|Music|NetEase)',
	'custom_proxy_group=🎯 全球直连`select`[]DIRECT`[]🚀 节点选择`[]♻️ 自动选择',
	'custom_proxy_group=🛑 广告拦截`select`[]REJECT`[]DIRECT',
	'custom_proxy_group=🍃 应用净化`select`[]REJECT`[]DIRECT',
	'custom_proxy_group=🆎 AdBlock`select`[]REJECT`[]DIRECT',
	'custom_proxy_group=🛡️ 隐私防护`select`[]REJECT`[]DIRECT',
	'custom_proxy_group=🐟 漏网之鱼`select`[]🚀 节点选择`[]♻️ 自动选择`[]DIRECT`[]🇭🇰 香港节点`[]🇨🇳 台湾节点`[]🇸🇬 狮城节点`[]🇯🇵 日本节点`[]🇺🇲 美国节点`[]🇰🇷 韩国节点`[]🚀 手动切换',
	'custom_proxy_group=🇭🇰 香港节点`url-test`(港|HK|hk|Hong Kong|HongKong|hongkong)`http://www.gstatic.com/generate_204`300,,50',
	'custom_proxy_group=🇯🇵 日本节点`url-test`(日本|川日|东京|大阪|泉日|埼玉|沪日|深日|JP|Japan)`http://www.gstatic.com/generate_204`300,,50',
	'custom_proxy_group=🇺🇲 美国节点`url-test`(美|波特兰|达拉斯|俄勒冈|凤凰城|费利蒙|硅谷|拉斯维加斯|洛杉矶|圣何塞|圣克拉拉|西雅图|芝加哥|US|United States)`http://www.gstatic.com/generate_204`300,,150',
	'custom_proxy_group=🇨🇳 台湾节点`url-test`(台|新北|彰化|TW|Taiwan)`http://www.gstatic.com/generate_204`300,,50',
	'custom_proxy_group=🇸🇬 狮城节点`url-test`(新加坡|坡|狮城|SG|Singapore)`http://www.gstatic.com/generate_204`300,,50',
	'custom_proxy_group=🇰🇷 韩国节点`url-test`(KR|Korea|KOR|首尔|韩|韓)`http://www.gstatic.com/generate_204`300,,50',
	'custom_proxy_group=🎥 奈飞节点`select`(NF|奈飞|解锁|Netflix|NETFLIX|Media)',
	';设置分组标志位',
	'',
	'enable_rule_generator=true',
	'overwrite_original_rules=true',
	''
];

const OMITTED_DEFAULT_CLASH_GROUPS = new Set([
	'🇭🇰 香港节点',
	'🇯🇵 日本节点',
	'🇺🇲 美国节点',
	'🇨🇳 台湾节点',
	'🇸🇬 狮城节点',
	'🇰🇷 韩国节点',
	'🎥 奈飞节点'
]);

function getWsllExpRulesetLines() {
	return WSLL_EXP_LINES_BEFORE_BASES.filter(line => line.startsWith('ruleset='));
}

function getWsllExpProxyGroupLines() {
	return WSLL_EXP_LINES_BEFORE_BASES.filter(line => line.startsWith('custom_proxy_group='));
}

function createRuleProviderName(url, usedNames, index) {
	const fileName = url.split('/').pop() || `ruleset-${index + 1}`;
	const base = fileName
		.replace(/\.(list|yaml|yml|mrs)$/i, '')
		.replace(/[^A-Za-z0-9_-]+/g, '-')
		.replace(/^-+|-+$/g, '') || `ruleset-${index + 1}`;
	let name = base;
	let suffix = 2;
	while (usedNames.has(name)) {
		name = `${base}-${suffix}`;
		suffix += 1;
	}
	usedNames.add(name);
	return name;
}

function buildWsllExpRuleSections() {
	const ruleProviders = {};
	const rules = [];
	const usedProviderNames = new Set();

	getWsllExpRulesetLines().forEach((line, index) => {
		const payload = line.slice('ruleset='.length);
		const commaIndex = payload.indexOf(',');
		if (commaIndex === -1) return;
		const groupName = payload.slice(0, commaIndex);
		const ruleSource = payload.slice(commaIndex + 1);

		if (ruleSource.startsWith('[]')) {
			const [type, ...parts] = ruleSource.slice(2).split(',');
			if (type === 'FINAL') {
				rules.push(`MATCH,${groupName}`);
			} else if (type === 'GEOIP') {
				rules.push(`GEOIP,${parts.join(',')},${groupName}`);
			} else {
				rules.push(`${type},${parts.join(',')},${groupName}`);
			}
			return;
		}

		const providerName = createRuleProviderName(ruleSource, usedProviderNames, index);
		ruleProviders[providerName] = {
			type: 'http',
			format: 'text',
			behavior: 'classical',
			url: ruleSource,
			path: `./ruleset/${providerName}.list`,
			interval: 86400
		};
		rules.push(`RULE-SET,${providerName},${groupName}`);
	});

	return { ruleProviders, rules };
}

function compileGroupMatcher(pattern) {
	if (!pattern || pattern === '.*') {
		return () => true;
	}
	try {
		const regex = new RegExp(pattern, 'i');
		return name => regex.test(name);
	} catch {
		return () => false;
	}
}

function getMatchedProxyNames(pattern, proxyNames) {
	const matcher = compileGroupMatcher(pattern);
	return proxyNames.filter(name => matcher(name));
}

function parseUrlTestTiming(value = '') {
	const [interval, , tolerance] = String(value).split(',');
	const parsedInterval = Number.parseInt(interval, 10);
	const parsedTolerance = Number.parseInt(tolerance, 10);
	return {
		interval: Number.isFinite(parsedInterval) ? parsedInterval : 300,
		...(Number.isFinite(parsedTolerance) ? { tolerance: parsedTolerance } : {})
	};
}

function appendGroupMembers(target, members = [], proxyNames = []) {
	members.forEach(member => {
		if (!member) return;
		if (member.startsWith('[]')) {
			const groupOrProxyName = member.slice(2);
			if (!OMITTED_DEFAULT_CLASH_GROUPS.has(groupOrProxyName)) {
				target.proxies.push(groupOrProxyName);
			}
			return;
		}
		const matches = getMatchedProxyNames(member, proxyNames);
		target.proxies.push(...matches);
	});
}

function dedupeMembers(group) {
	if (Array.isArray(group.proxies)) {
		group.proxies = [...new Set(group.proxies.filter(Boolean))];
	}
	if (Array.isArray(group.use)) {
		group.use = [...new Set(group.use.filter(Boolean))];
		if (group.use.length === 0) delete group.use;
	}
	return group;
}

function ensureSelectGroupHasMembers(group, proxyNames = [], providerNames = []) {
	const hasProxies = Array.isArray(group.proxies) && group.proxies.length > 0;
	const hasProviders = Array.isArray(group.use) && group.use.length > 0;
	if (hasProxies || hasProviders || group.type !== 'select') {
		return group;
	}
	if (providerNames.length > 0) {
		group.use = providerNames;
		return group;
	}
	group.proxies = proxyNames.length > 0 ? proxyNames : ['DIRECT'];
	return group;
}

function buildWsllExpProxyGroups({ proxyNames = [], providerNames = [] } = {}) {
	return getWsllExpProxyGroupLines().map(line => {
		const payload = line.slice('custom_proxy_group='.length);
		const [name, type, ...parts] = payload.split('`');
		if (!name || !type) return null;
		if (OMITTED_DEFAULT_CLASH_GROUPS.has(name)) return null;

		if (type === 'url-test') {
			const [pattern = '.*', url = 'http://www.gstatic.com/generate_204', timing = '300'] = parts;
			const matchedProxies = getMatchedProxyNames(pattern, proxyNames);
			const group = {
				name,
				type,
				proxies: matchedProxies.length > 0 ? matchedProxies : proxyNames,
				url,
				...parseUrlTestTiming(timing)
			};
			if (providerNames.length > 0 && pattern === '.*') {
				group.use = providerNames;
			}
			return dedupeMembers(group);
		}

		const group = {
			name,
			type,
			proxies: []
		};
		appendGroupMembers(group, parts, proxyNames);
		if (providerNames.length > 0 && parts.includes('.*')) {
			group.use = providerNames;
		}
		return ensureSelectGroupHasMembers(dedupeMembers(group), proxyNames, providerNames);
	}).filter(Boolean);
}

export function buildWsllExpClashConfigSections({ proxyNames = [], providerNames = [] } = {}) {
	const { ruleProviders, rules } = buildWsllExpRuleSections();
	const proxyGroups = buildWsllExpProxyGroups({ proxyNames, providerNames });
	return {
		ruleProviders,
		proxyGroups,
		rules
	};
}

function normalizeConfigUrl(value, fallback) {
	if (typeof value !== 'string') return fallback;
	const trimmed = value.trim();
	if (!trimmed || /[\r\n]/.test(trimmed)) return fallback;
	return trimmed;
}

export function generateWsllExpSubconverterConfig({ clashRuleBase, quanxRuleBase } = {}) {
	const resolvedClashRuleBase = normalizeConfigUrl(clashRuleBase, WSLL_EXP_CLASH_RULE_BASE);
	const resolvedQuanxRuleBase = normalizeConfigUrl(quanxRuleBase, WSLL_EXP_QUANX_RULE_BASE);
	return [
		...WSLL_EXP_LINES_BEFORE_BASES,
		`clash_rule_base=${resolvedClashRuleBase}`,
		`quanx_rule_base=${resolvedQuanxRuleBase}`,
		';luck'
	].join('\n');
}
