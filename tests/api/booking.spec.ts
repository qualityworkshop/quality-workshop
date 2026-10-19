import {test, expect} from '@playwright/test';

test('GET booking IDs returns HTTP 200', async ({request}) => {
    const response = await request.get('https://restful-booker.herokuapp.com/booking');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
    expect(body[0]).toHaveProperty('bookingid');
    expect(typeof body[0].bookingid).toBe('number');
});