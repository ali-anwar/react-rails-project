jasmine.DEFAULT_TIMEOUT_INTERVAL = 99999999;

export const wait = (timeout = 2000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, timeout);
  });
};

export const setValue = async (page, selector, value) => {
  await page.click(selector, { clickCount: 3 });
  await page.keyboard.press('Backspace');
  await page.type(selector, value, {delay: 0});
};

export const capitalize = (string) => {
  return string.replace(/^\w/, c => c.toUpperCase());
}
