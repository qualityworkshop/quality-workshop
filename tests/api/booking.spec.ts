import {test, expect} from '@playwright/test';

test('GET booking IDs returns HTTP 200', async ({request}) => {
    const response = await request.get('/booking');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
    expect(body[0]).toHaveProperty('bookingid');
    expect(typeof body[0].bookingid).toBe('number');
});

test('Get booking by ID returns booking details', async ({request}) => {
    const listResponse = await request.get('/booking');
    expect(listResponse.status()).toBe(200);
    const bookings = await listResponse.json();
    expect(bookings.length).toBeGreaterThan(0);
    const bookingId = bookings[0].bookingid;
    const response = await request.get(`/booking/${bookingId}`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('firstname');
    expect(body).toHaveProperty('lastname');
    expect(body).toHaveProperty('totalprice');
    expect(body).toHaveProperty('bookingdates');
});

test('POST creates a new booking', async ({request}) => {
    const bookingData = {
        firstname: 'Max',
        lastname: 'Mustermann',
        totalprice: 150,
        depositpaid: true,
        bookingdates: {
            checkin: '2026-11-10',
            checkout: '2026-11-15'
        },
        additionalneeds: 'Breakfast'
    };
    const response = await request.post('/booking', {
        data: bookingData,
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('bookingid');
    expect(typeof body.bookingid).toBe('number');
    expect(body.booking).toEqual(bookingData);
    
    const bookingId = body.bookingid;
    const getResponse = await request.get(`/booking/${bookingId}`);
    expect(getResponse.status()).toBe(200);
    const getBody = await getResponse.json();
    expect(getBody).toEqual(bookingData);
});

test('POST auth returns a token', async ({request}) => {
    const response = await request.post('/auth', {
        data: {
            username: 'admin',
            password: 'password123'
        }
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(typeof body.token).toBe('string');
    expect(body.token.length).toBeGreaterThan(0);
});

test('PUT updates an existing booking', async ({request}) => {
    const bookingData = {
        firstname: 'Max',
        lastname: 'Mustermann',
        totalprice: 150,
        depositpaid: true,
        bookingdates: {
            checkin: '2026-11-10',
            checkout: '2026-11-15'
        },
        additionalneeds: 'Breakfast'
    };
   //1. Eigene Buchugung erstellen
   const createResponse = await request.post('/booking', {
        data: bookingData,
    });
    expect(createResponse.status()).toBe(200);
    const booking = await createResponse.json();
    const bookingId = booking.bookingid;

    //2. Authentifizierung
    const authResponse = await request.post('/auth', {
        data: {
            username: 'admin',
            password: 'password123'
        }
    });
    expect(authResponse.status()).toBe(200);
    const authBody = await authResponse.json();
    const token = authBody.token;
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(0);

    //3. Buchungsdaten verändern
    const updatedBooking = {
        ...bookingData,
        firstname: 'Anna',
        totalprice: 200,   
    };

    const updateResponse = await request.put(`/booking/${bookingId}`, {
        headers: {
            Cookie: `token=${token}`,
        },
        data: updatedBooking,
    });


    expect(updateResponse.status()).toBe(200);

    //4. Aktualisierte Buchung erneut abrufen
    const getResponse = await request.get(`/booking/${bookingId}`);
    expect(getResponse.status()).toBe(200);
    const savedBooking = await getResponse.json();
    expect(savedBooking).toEqual(updatedBooking);
});

test('PUT without authentication is rejected', async ({request}) => {
    const bookingData = {
        firstname: 'Max',
        lastname: 'Mustermann',
        totalprice: 150,
        depositpaid: true,
        bookingdates: {
            checkin: '2026-11-10',
            checkout: '2026-11-15'
        },
        additionalneeds: 'Breakfast'
    };

    //eigene Buchung erstellen
    const createResponse = await request.post('/booking', {
        data: bookingData,
    });
    expect(createResponse.status()).toBe(200);
    const booking = await createResponse.json();
    const bookingId = booking.bookingid;

    //Aktualisierung ohne Token versuchen
    const response = await request.put(`/booking/${bookingId}`, {
        data: {
            ...bookingData,
            firstname: 'Anna',
        }
    });

    expect(response.status()).toBe(403);
});

test('DELETE removes an existing booking', async ({request}) => {
    const bookingData = {
        firstname: 'Max',
        lastname: 'Mustermann',
        totalprice: 150,
        depositpaid: true,
        bookingdates: {
            checkin: '2026-11-10',
            checkout: '2026-11-15'
        },
        additionalneeds: 'Breakfast'
    };

    //1. Buchung erstellen
    const createResponse = await request.post('/booking', {
        data: bookingData,
    });

    expect(createResponse.status()).toBe(200);
    const booking = await createResponse.json();
    const bookingId = booking.bookingid;

    //2. Token anfordern
    const authResponse = await request.post('/auth', {
        data: {
            username: 'admin',
            password: 'password123'
        }
    });

    expect(authResponse.status()).toBe(200);

    const authBody = await authResponse.json();
    const token = authBody.token;
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(0);

    //3. Buchung löschen
    const deleteResponse = await request.delete(`/booking/${bookingId}`, {
        headers: {
            Cookie: `token=${token}`,
        },
    });

    expect(deleteResponse.status()).toBe(201);

    //4. Überprüfen, dass die Buchung gelöscht wurde
    const getResponse = await request.get(`/booking/${bookingId}`);
    expect(getResponse.status()).toBe(404);
}
);