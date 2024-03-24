import { expect, browser, $ } from '@wdio/globals'

describe('Test Suite', () => {

    it('browser Title', async () => {
        await browser.url(`https://cloud-dot-devsite-v2-prod.appspot.com/`);

        let pageTitle = await browser.getTitle();
        pageTitle = pageTitle.replace(/\s/g, ' ');
        const expectedTitle = "Cloud Computing Services  |  Google Cloud".replace(/\s/g, ' ');
        expect(pageTitle).toEqual(expectedTitle);
    })
    
    it('gCloud Search', async () => {


        await $("//input[@placeholder='Search']").setValue("Google Cloud Platform Pricing Calculator");
        await browser.keys('Enter')

        await browser.url("https://cloudpricingcalculator.appspot.com/");
        expect(await browser.getTitle()).toEqual("Cloud Pricing Calculator");

        const computeEngine = await $("#tab-item-1 div.presets-buttons");
        await computeEngine.click();
        

    })

    it('Estimate Form', async () => {
        
        await $("#input_100").addValue("4");
        await $("#input_101").clearValue();

        await $("#select_113").click();
        const optionOs = await $("#select_option_102");
        await optionOs.waitForDisplayed({ timeout: 5000 });
        await optionOs.click();

        await $("#select_117").click();
        const optionModel = await $("#select_option_115");
        await optionModel.waitForDisplayed({ timeout: 5000 });
        await optionModel.click();

        await $("#select_123").click();
        const optionMachine = await $("#select_option_119");
        await optionMachine.waitForDisplayed({ timeout: 5000 });
        await optionMachine.click();

        await $("#select_125").click();
        const optionSeries = await $("#select_option_224");
        await optionSeries.waitForDisplayed({ timeout: 5000 });
        await optionSeries.click();

        await $("#select_127").click();
        const optionType = await $("//div[contains(text(), 'n1-standard-8 (vCPUs: 8, RAM: 30GB)')]");
        await optionType.waitForClickable({ timeout: 5000 });
        await optionType.click();

        const checkboxSelector = "(//div[@class='md-container md-ink-ripple'])[3]";
        await $(checkboxSelector).waitForDisplayed({ timeout: 5000 });
        await $(checkboxSelector).click();

        await $("#select_469").click();
        const optionSsd = await $("//div[contains(text(), '2x375 GB')]");
        await optionSsd.waitForClickable({ timeout: 5000 });
        await optionSsd.click();

        await $("#select_133").click();
        const optionLocation = await $("//div[contains(text(), 'Frankfurt (europe-west3)')]");
        await optionLocation.waitForClickable({ timeout: 5000 });
        await optionLocation.click();

        await $("#select_140").click();
        const optionUsage = await $("#select_option_138");
        await optionUsage.waitForDisplayed({ timeout: 5000 });
        await optionUsage.click();

        const addEstimate = await $("(//button[@type='button'][normalize-space()='Add to Estimate'])[1]");
        await addEstimate.click();

    })

    it('Create Mail and Send', async () => {

        const valueExtract = (textValue) => {
            const result = textValue.match(/[\d,]+\.\d+/);
            return result ? parseFloat(result[0].replace(/,/g, '')) : null;
          };

        await browser.newWindow('https://email-fake.com/');
        expect(await browser.getUrl()).toContain('https://email-fake.com/');
        await $("#copbtn").click();

        const handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[0]);
        
        const firstEstimate = await $(".md-flex.ng-binding.ng-scope").getText();
        const firstExtractValue = valueExtract(firstEstimate);

        const emailEstimate = await $("(//button[@id='Email Estimate'])[1]");
        await emailEstimate.click();

        await $("#dialogContent_621 > form > md-content > div:nth-child(3)").click();
        await browser.keys(['Control', 'v']);
        
        let sendButton= await $("button[ng-disabled='emailForm.$invalid']")
        await sendButton.click();

        await browser.switchToWindow(handles[1]);
        await browser.refresh();

        const secondEstimate = await $("#mobilepadding > td > h2").getText();
        const secondExtractValue = valueExtract(secondEstimate);
        expect(firstExtractValue).toEqual(secondExtractValue);
        

    });



})