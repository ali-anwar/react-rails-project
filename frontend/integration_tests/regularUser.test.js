import { wait, setValue, capitalize } from './util';
import puppeteer from "puppeteer";

const person = {
  name: 'Regular User',
  email: 'regular.user@gmail.com',
  password: '12345678'
};

const meal = {
  text: 'Fajita pizza',
  calories: 500,
  date: '2019-02-28',
  time: '12:00AM'
}

const updatedMeal = {
  text: 'Italian Pizza',
  calories: 600,
  date: '2019-02-27',
  time: '12:10AM' 
}

let browser, page;

describe('Perform all operations of a regular user', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 80,
      args: [`--window-size=${1080},${720}`]
    });
    page = await browser.newPage();
    await page.setViewport({ width: 1080, height: 720 });
  });

  afterAll(() => {
    browser.close();
  });

  it('Should signup user successfully', async () => {
    await page.goto('http://localhost:3000/signup');
    await page.waitForSelector("#root");
    
    await setValue(page, 'input[name=Name]', person.name);
    await setValue(page, 'input[name=Email]', person.email);
    await setValue(page, 'input[name=Password]', person.password);
    await setValue(page, 'input[name=PasswordConfirmation]', person.password);

    await page.click("button[type=submit]");
    await wait();

    const signOut = await page.$eval("#signOut", el => (el ? true : false));
    expect(signOut).toBe(true);

    await page.click('.dropdown-toggle');
    await wait();
    await page.click('.dropdown-toggle');
    await page.click("#signOut");
  });

  it('Should signin an existing user successfully', async () => {
    await page.goto('http://localhost:3000/login');
    await page.waitForSelector("#root");

    await setValue(page, 'input[name=Email]', person.email);
    await setValue(page, 'input[name=Password]', person.password);

    await page.click("button[type=submit]");
    await wait();

    await page.click('.dropdown-toggle');
    await wait();
    await page.click('.dropdown-toggle');
  

    const signOut = await page.$eval("#signOut", el => (el ? true : false));
    expect(signOut).toBe(true);
  });

  it('Should add a new meal', async () => {
    await page.goto('http://localhost:3000/meals/new');
    await page.waitForSelector("#root");

    await setValue(page, 'input[name=Text]', meal.text);
    await setValue(page, 'input[name=Calories]', meal.calories.toString());
    await setValue(page, 'input[name=date]', meal.date);
    await setValue(page, 'input[name=Time]', meal.time);

    await page.click("button[type=submit]");
    await wait();

    const rows = await page.$$("tr");
    const newRecord = rows[rows.length-1];
    const columns = await newRecord.$$("td");

    let text, calories, date, time;

    text = await page.evaluate(el => el.innerText, columns[1])
    calories = await page.evaluate(el => el.innerText, columns[2])
    date = await page.evaluate(el => el.innerText, columns[3])
    time = await page.evaluate(el => el.innerText, columns[4])

    expect(text).toBe(meal.text);
    expect(calories).toBe(meal.calories.toString());
    expect(date).toBe(meal.date);
    expect(time).toBe("12:00 AM");
  });

  it('Should update existing meal', async () => {
    let rows = await page.$$("tr");
    let newRecord = rows[rows.length-1];
    const updateBtn = await newRecord.$('.btn-warning')

    await updateBtn.click();
    await wait()

    await setValue(page, 'input[name=Text]', updatedMeal.text);
    await setValue(page, 'input[name=Calories]', updatedMeal.calories.toString());
    await setValue(page, 'input[name=date]', updatedMeal.date);
    await setValue(page, 'input[name=Time]', updatedMeal.time);

    await page.click("button[type=submit]");
    await wait();

    rows = await page.$$("tr");
    newRecord = rows[rows.length-1];
    const columns = await newRecord.$$("td");

    let text, calories, date, time;

    text = await page.evaluate(el => el.innerText, columns[1])
    calories = await page.evaluate(el => el.innerText, columns[2])
    date = await page.evaluate(el => el.innerText, columns[3])
    time = await page.evaluate(el => el.innerText, columns[4])

    expect(text).toBe(updatedMeal.text);
    expect(calories).toBe(updatedMeal.calories.toString());
    expect(date).toBe(updatedMeal.date);
    expect(time).toBe("12:10 AM");
  });

  it('Should filiter meals matching criteria', async () => {
    await setValue(page, '#filterStartDate', updatedMeal.date);
    await setValue(page, '#filterEndDate', updatedMeal.date);

    await page.click("#filter");

    const rows = await page.$$("tr");
    const newRecord = rows[rows.length-1];
    const columns = await newRecord.$$("td");

    let text, calories, date, time;

    text = await page.evaluate(el => el.innerText, columns[1])
    calories = await page.evaluate(el => el.innerText, columns[2])
    date = await page.evaluate(el => el.innerText, columns[3])
    time = await page.evaluate(el => el.innerText, columns[4])

    expect(text).toBe(updatedMeal.text);
    expect(calories).toBe(updatedMeal.calories.toString());
    expect(date).toBe(updatedMeal.date);
    expect(time).toBe("12:10 AM");
  });

  it('Should get 404 error if try to access users route', async () => {
    await page.goto('http://localhost:3000/users');

    const h1 = await page.$(".heading");
    const errorMessage = await page.evaluate(el => el.innerText, h1);

    expect(errorMessage).toBe('404');
  });

});
