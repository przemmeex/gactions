import request from 'supertest';

// Define the base URL for the external API
const BASE_URL = 'https://www.wp.pl';
const WEATHER_ENDPOINT = '/v1/weather/756135';

describe('WP.pl Weather API Test (External Endpoint)', () => {
    
    // Initialize Supertest with the external base URL
    const apiRequest = request(BASE_URL);

    it('should respond with HTTP 200 and a JSON body when all headers are set', async () => {
        // We use .set() to add every custom header from the curl command
        await apiRequest
            .get(WEATHER_ENDPOINT)
            // Start of Custom Headers from curl
            .set('sec-ch-ua-full-version-list', '"Chromium";v="140.0.7339.208", "Not=A?Brand";v="24.0.0.0", "Google Chrome";v="140.0.7339.208"')
            .set('sec-ch-ua-platform', '"Windows"')
            .set('viewport-width', '3840')
            .set('device-memory', '8')
            .set('sec-ch-ua', '"Chromium";v="140", "Not=A?Brand";v="24", "Google Chrome";v="140"')
            .set('sec-ch-ua-model', '""')
            .set('sec-ch-ua-mobile', '?0')
            .set('sec-ch-ua-bitness', '"64"')
            .set('sec-ch-ua-arch', '"x86"')
            .set('downlink', '10')
            .set('ect', '4g')
            .set('Referer', 'https://www.wp.pl/')
            .set('dpr', '1')
            .set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36')
            .set('rtt', '50')
            .set('sec-ch-ua-platform-version', '"10.0.0"')
            // End of Custom Headers
            
            // Assertions for a successful response
            .expect('Content-Type', /json/) // Check that the response type is JSON
            .expect(200)                   // Check for a successful HTTP status code (OK)
            // Optional: Assert that the response body is a non-empty object
            .expect(res => {
                if (typeof res.body !== 'object' || Object.keys(res.body).length === 0) {
                    throw new Error('Response body is not a valid, non-empty JSON object');
                }
            });
    });
});