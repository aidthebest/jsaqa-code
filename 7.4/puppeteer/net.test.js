let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Netology.ru tests", () => {
  beforeEach(async () => {
    await page.goto("https://netology.ru");
  });

  test("The first test'", async () => {
    const title = await page.title();
    console.log("Page title: " + title);
    const firstLink = await page.$("header a + a");
    await firstLink.click();
    await page.waitForNavigation();
    const title2 = await page.title();
    console.log("Page title: " + title2);
    const pageList = await browser.newPage();
    await pageList.goto("https://netology.ru/navigation");
    await pageList.waitForSelector("h1");
  });

  test("The first link text 'Медиа Нетологии'", async () => {
    const actual = await page.$eval("header a + a", (link) => link.textContent);
    expect(actual).toContain("Медиа Нетологии");
  });

  test("The first link leads on 'Медиа' page", async () => {
    await page.click("header a + a");
    await page.waitForSelector(".logo__media", {
      visible: true,
    });
    const actual = await page.$eval(".logo__media", (link) => link.textContent);
    expect(actual).toContain("Медиа");
  });
});

test("vacancy page", async () => {
  await page.goto("https://netology.ru/job");
  const actual = await page.$eval(
    '[class="shared-containers-Jobs-components-Presentation-presentation-module__title--gkLaB"]',
    (link) => link.textContent
  );
  expect(actual).toContain("Работа ");
});

test("expert's page", async () => {
  await page.goto("https://netology.ru/experts");
  const actual = await page.$eval(
    '[class="tn-atom"]',
    (link) => link.textContent
  );
  expect(actual).toContain("Станьте экспертом");
});

test("partners's page", async () => {
  await page.goto("https://netology.ru/partners");
  const actual = await page.$eval(
    '[class="shared-containers-Partners-components-Header-header-module__title--1vdjP"]',
    (link) => link.textContent
  );
  expect(actual).toContain("Станьте партнером Нетологии");
});
