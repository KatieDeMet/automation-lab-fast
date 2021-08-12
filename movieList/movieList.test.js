const { Builder, Capabilities, By } = require('selenium-webdriver')
const chromedriver = require('chromedriver')
const { testEnvironment } = require('./jest.config')
const { hasUncaughtExceptionCaptureCallback } = require('process')
const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeAll(async () => {
    await driver.get('http://127.0.0.1:5500/movieList/index.html')
})

afterAll(async () => {
    await driver.quit()
})

test('test movie input', async () => {
    let input = await driver.findElement(By.css('input'))
    let inputVal = 'Shrek'
    await input.sendKeys(inputVal+'\n')
    // await driver.sleep(3000)

    await driver.findElement(By.xpath('//span[contains(text(), inputVal)]')).click()
    // await driver.sleep(2000)

    const aside = await driver.findElement(By.id('message')).getText()
    console.log(aside)
    expect(aside).toBe(`${inputVal} watched!`)

    await driver.findElement(By.id(inputVal)).click()
    // await driver.sleep(3000)

    //Maybe a test that confirms that the messages say the right thing
})
