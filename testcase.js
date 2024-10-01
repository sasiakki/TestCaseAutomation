Here's the Jest test code based on the provided test cases:

```javascript
// Import the necessary modules and functions
// Assuming you have a login function that handles the login logic
const login = require('./login');

describe('Login Functionality', () => {
  test('Valid Login Credentials', () => {
    const result = login('admin', 'password123');
    expect(result).toBe('Login successful');
  });

  test('Invalid Username', () => {
    const result = login('wronguser', 'password123');
    expect(result).toBe('Invalid username or password');
  });

  test('Invalid Password', () => {
    const result = login('admin', 'wrongpassword');
    expect(result).toBe('Invalid username or password');
  });

  test('Empty Username', () => {
    const result = login('', 'password123');
    expect(result).toBe('Username is required');
  });

  test('Empty Password', () => {
    const result = login('admin', '');
    expect(result).toBe('Password is required');
  });

  test('Case Sensitivity', () => {
    const result = login('Admin', 'Password123');
    expect(result).toBe('Invalid username or password');
  });

  test('Whitespace Trimming', () => {
    const result = login(' admin ', ' password123 ');
    expect(result).toBe('Login successful');
  });

  test('Maximum Length', () => {
    const result = login('a'.repeat(21), 'b'.repeat(21));
    expect(result).toBe('Username and password must be 20 characters or less');
  });

  test('Minimum Length', () => {
    const result = login('ab', '12');
    expect(result).toBe('Username and password must be at least 3 characters long');
  });

  test('Error Message for Invalid Login', () => {
    const result = login('wronguser', 'wrongpassword');
    expect(result).toBe('Invalid username or password');
  });

  test('Successful Login Message', () => {
    const result = login('admin', 'password123');
    expect(result).toBe('Login successful');
  });
});
```

Note that this test suite assumes the existence of a `login` function that takes a username and password as parameters and returns the appropriate message. You'll need to implement this function to match the expected behavior in your actual code.

Also, make sure to have Jest installed in your project and configured properly to run these tests.