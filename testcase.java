Here's the Jest test code based on the provided test cases:

```javascript
const request = require('supertest');
const app = require('./app'); // Assuming your main application file is named app.js

describe('Login Tests', () => {
  test('Successful Login Test', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'admin', password: 'password123' });
    expect(response.status).toBe(200);
    expect(response.text).toBe('Login successful!');
  });

  test('Failed Login Test - Incorrect Password', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'admin', password: 'wrongpassword' });
    expect(response.status).toBe(401);
    expect(response.text).toBe('Login failed. Invalid username or password.');
  });

  test('Failed Login Test - Incorrect Username', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'wronguser', password: 'password123' });
    expect(response.status).toBe(401);
    expect(response.text).toBe('Login failed. Invalid username or password.');
  });

  test('Empty Input Test', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: '', password: '' });
    expect(response.status).toBe(400);
    expect(response.text).toBe('Username and password cannot be empty.');
  });

  test('SQL Injection Test', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: "admin' --", password: 'anything' });
    expect(response.status).toBe(401);
    expect(response.text).toBe('Login failed. Invalid username or password.');
  });

  test('HTML Response Structure Test', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'admin', password: 'password123' });
    expect(response.status).toBe(200);
    expect(response.text).toBe('<html><body><h2>Login successful!</h2></body></html>');
  });
});
```