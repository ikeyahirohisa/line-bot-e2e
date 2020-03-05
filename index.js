const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox','--disable-setuid-sandbox'],
    ignoreHTTPSErrors: true,
    headless: false
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1000,
    height: 800,
    deviceScaleFactor: 1,
  });
  await page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36"
  );

  // Login
  // await page.goto('https://bots.shuttlestage.com/users/sign_in', {waitUntil: 'networkidle2'});
  await page.goto('https://shuttlerock-bots-stg.herokuapp.com/', {waitUntil: 'networkidle2'});

  await passCloudFlare(page)

  // Test #1 Fail to login with wrong username & pass
  await page.type('#user_username', 'test@example.com');
  await page.type('#user_password', 'wrongpassword');
  await page.click('input[name="commit"]');
  await page.waitFor(3000)

  await browser.close();
})();

async function passCloudFlare(page) {
  // cloudflare
  if (!await page.$('#idp0')) return

  await page.click('#idp0');
  await page.waitFor(3000)
  await page.type('#identifierId', 'shuttlerock-japan-qa@gmail.com');
  await page.click('#identifierNext');
  await page.waitFor(3000)
  await page.type('input', 'hYxeamr_LMZ3-s.8Rrz_');
  await page.click('#passwordNext');
}
