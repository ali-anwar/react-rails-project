import { wait, setValue, capitalize } from './util';
import puppeteer from "puppeteer";

const person = {
  name: 'Admin User',
  email: 'admin.user@gmail.com',
  password: '12345678'
};

const newPerson = {
  name: 'Tommy Shelby',
  email: 'tommy.shelby@gmail.com',
  password: '12345678',
  role: 'regular'
};

const updatedPerson = {
  name: 'Peaky Blinder',
  email: 'tommy.shelby@gmail.com',
  role: 'manager'
};

const meal = {
  text: 'Deep pan Pizza',
  calories: 500,
  date: '2019-02-28',
  time: '12:00AM'
}

const updatedMeal = {
  text: 'Newyorker Pizza',
  calories: 600,
  date: '2019-02-27',
  time: '12:10AM' 
}

let browser, page;

describe('Perform all operations of a admin user', () => {
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

  it('Should add a new user', async () => {
    await page.goto('http://localhost:3000/users/new');
    await page.waitForSelector("#root");

    await setValue(page, 'input[name=Name]', newPerson.name);
    await setValue(page, 'input[name=Email]', newPerson.email);

    await page.select('select', newPerson.role);

    await page.click("button[type=submit]");
    await wait();

    const rows = await page.$$("tr");
    const newRecord = rows[rows.length-1];
    const columns = await newRecord.$$("td");

    let name, email, role;

    name = await page.evaluate(el => el.innerText, columns[1])
    email = await page.evaluate(el => el.innerText, columns[2])
    role = await page.evaluate(el => el.innerText, columns[3])

    expect(name).toBe(newPerson.name);
    expect(email).toBe(newPerson.email);
    expect(role).toBe(capitalize(newPerson.role));
  });

  it('Should add a new meal', async () => {
    await page.goto('http://localhost:3000/meals/new');
    await page.waitForSelector("#root");

    await setValue(page, 'input[name=Text]', meal.text);
    await setValue(page, 'input[name=Calories]', meal.calories.toString());
    await setValue(page, 'input[name=date]', meal.date);
    await setValue(page, 'input[name=Time]', meal.time);

    const options = await page.$$('option');
    let value;
    let innerText;
    
    for(let i=0; i < options.length; i++) {
      [value, innerText] = await page.evaluate(el => [el.value, el.innerText], options[i])

      if (innerText === newPerson.name) {
        break;
      }
    }

    await page.select('select', value);

    await page.click("button[type=submit]");
    await wait();

    const rows = await page.$$("tr");
    const newRecord = rows[rows.length-1];
    const columns = await newRecord.$$("td");

    let text, calories, date, time, userName;

    text = await page.evaluate(el => el.innerText, columns[1])
    calories = await page.evaluate(el => el.innerText, columns[2])
    date = await page.evaluate(el => el.innerText, columns[3])
    time = await page.evaluate(el => el.innerText, columns[4])
    userName = await page.evaluate(el => el.innerText, columns[5])

    expect(text).toBe(meal.text);
    expect(calories).toBe(meal.calories.toString());
    expect(date).toBe(meal.date);
    expect(time).toBe("12:00 AM");
    expect(userName).toBe(newPerson.name);
  });

  it('Should update existing meal', async () => {
    let rows = await page.$$("tr");
    let newRecord = rows[rows.length-1];
    const deleteBtn = await newRecord.$('.btn-warning')

    await deleteBtn.click();
    await wait()

    await setValue(page, 'input[name=Text]', updatedMeal.text);
    await setValue(page, 'input[name=Calories]', updatedMeal.calories.toString());
    await setValue(page, 'input[name=date]', updatedMeal.date);
    await setValue(page, 'input[name=Time]', updatedMeal.time);

    const options = await page.$$('option');
    let value;
    let innerText;
    
    for(let i=0; i < options.length; i++) {
      [value, innerText] = await page.evaluate(el => [el.value, el.innerText], options[i])
      
      if (innerText === person.name) {
        break;
      }
    }

    await page.select('select', value);
    await page.click("button[type=submit]");
    await wait();

    rows = await page.$$("tr");
    newRecord = rows[rows.length-1];
    const columns = await newRecord.$$("td");

    let text, calories, date, time, userName;

    text = await page.evaluate(el => el.innerText, columns[1])
    calories = await page.evaluate(el => el.innerText, columns[2])
    date = await page.evaluate(el => el.innerText, columns[3])
    time = await page.evaluate(el => el.innerText, columns[4])
    userName = await page.evaluate(el => el.innerText, columns[5])

    expect(text).toBe(updatedMeal.text);
    expect(calories).toBe(updatedMeal.calories.toString());
    expect(date).toBe(updatedMeal.date);
    expect(time).toBe("12:10 AM");
    expect(userName).toBe(person.name);
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

  it('Should update an existing user', async () => {
    await page.goto('http://localhost:3000/users');

    let rows = await page.$$("tr");
    let newRecord = rows[rows.length-1];
    const updateBtn = await newRecord.$('.btn-warning')

    await updateBtn.click();
    await wait()
    
    await setValue(page, 'input[name=Name]', updatedPerson.name);
    await page.select('select', updatedPerson.role);
    await page.click("button[type=submit]");
    
    await wait();

    rows = await page.$$("tr");
    newRecord = rows[rows.length-1];
    const columns = await newRecord.$$("td");

    let name, role, email;

    name = await page.evaluate(el => el.innerText, columns[1])
    email = await page.evaluate(el => el.innerText, columns[2])
    role = await page.evaluate(el => el.innerText, columns[3])

    expect(name).toBe(updatedPerson.name);
    expect(email).toBe(updatedPerson.email);
    expect(role).toBe(capitalize(updatedPerson.role));
  });

  it('Should delete an existing user', async () => {
    let rows = await page.$$("tr");
    let newRecord = rows[rows.length-1];
    const deleteBtn = await newRecord.$('.btn-danger')

    await deleteBtn.click();
    await wait()

    rows = await page.$$("tr");
    newRecord = rows[rows.length-1];
    const columns = await newRecord.$$("td");

    let name, email;

    name = await page.evaluate(el => el.innerText, columns[1])
    email = await page.evaluate(el => el.innerText, columns[2])

    expect(email).not.toBe(newPerson.email);
  });

});
