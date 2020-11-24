import fetch from 'cross-fetch';
//const LOCALIZE_API_KEY = 'XXXXXXXXXXX';
//const LOCALIZE_URL = 'https://localise.biz/api/export/locale';
//const HEADERS = { 'Authorization': `Loco ${LOCALIZE_API_KEY}`};
const getMessages = async () => {
  const res = await fetch(`http://server.optimalrating.com/api/i18n`);
  if (res.status >= 400) console.log('Language load error');
  return await res.json();
};
export default getMessages;
