const wd = require('wd');

const driver = wd.promiseChainRemote('http://localhost:4723/wd/hub');

async function runTest() {
    const caps = {
        platformName: 'Android',
        deviceName: 'Android Emulator',
        app: '/path/to/your/app.apk',
        automationName: 'UiAutomator2'
    };

    try {
        await driver.init(caps);
        // Add your test steps here
        await driver.quit();
    } catch (err) {
        console.error(err);
    }
}

runTest();
