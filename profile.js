const CURRENT = 'test';
const PROFILES = {
  'test': {
    'myHost': 'https://www.test-godaddy.xyz',
    'apiHost': 'https://api.test-godaddy.com',
    'accountHost': 'https://account.test-godaddy.com',
    'ssoHost': 'https://sso.test-godaddy.com',
    'domainsApiHost': 'https://domains.dcc.api.test-godaddy.com',
    'domdnsApiHost': 'https://domdns.api.test-godaddy.com',
  },
  'prod': {
    'myHost': 'https://www.godaddycn.com',
    'apiHost': 'https://api.godaddy.com',
    'accountHost': 'https://account.godaddy.com',
    'ssoHost': 'https://sso.godaddy.com',
    'domainsApiHost': 'https://domainsapi.godaddy.com',
    'domdnsApiHost': 'https://domdns.api.godaddy.com',
  }
}

const ENV = PROFILES[CURRENT]

export { ENV }