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
        // Initialize the Appium driver
        await driver.init(caps);
        console.log('App launched successfully.');

        // Locate and interact with login elements
        const usernameField = await driver.elementById('com.example:id/username');
        const passwordField = await driver.elementById('com.example:id/password');
        const loginButton = await driver.elementById('com.example:id/login_button');

        // Perform login
        await usernameField.sendKeys('testuser');
        await passwordField.sendKeys('password');
        await loginButton.click();
        console.log('Logged in successfully.');

        // Validate user profile information
        const profileName = await driver.elementById('com.example:id/profile_name');
        const profileEmail = await driver.elementById('com.example:id/profile_email');

        const name = await profileName.text();
        const email = await profileEmail.text();

        if (name === 'Test User' && email === 'testuser@example.com') {
            console.log('Profile information validated successfully.');
        } else {
            console.error('Profile information validation failed.');
        }

        // Log out
        const logoutButton = await driver.elementById('com.example:id/logout_button');
        await logoutButton.click();
        console.log('Logged out successfully.');
    } catch (err) {
        console.error('An error occurred during the test:', err);
    } finally {
        // Clean up and quit the driver
        await driver.quit();
        console.log('Driver quit successfully.');
    }
}

runTest();
