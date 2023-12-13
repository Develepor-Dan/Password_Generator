
// // Write password to the #password input
// function writePassword() {
//   var password = generatePassword();
//   var passwordText = document.querySelector("#password");

//   passwordText.value = password;


// Function to generate character set using ASCII values
function generateCharset(start, end) {
  return Array.from({ length: end - start + 1 }, (_, i) => String.fromCharCode(start + i));
}

// Character sets from ASCII 
const specialCharacters = generateCharset(33, 47).concat(generateCharset(58, 64), generateCharset(91, 96), generateCharset(123, 126));
const numericCharacters = generateCharset(48, 57);
const lowerCasedCharacters = generateCharset(97, 122);
const upperCasedCharacters = generateCharset(65, 90);

// Function to prompt user for password options
function getPasswordOptions() {
  const length = parseInt(prompt('How many characters would you like your password to contain? Choose between 8 and 128 characters.'), 10);

  if (Number.isNaN(length) || length < 8 || length > 128) {
    alert('Password length must be between 8 and 128 characters.');
    return null;
  }

  const hasSpecialCharacters = confirm('Click OK to include special characters.');
  const hasNumericCharacters = confirm('Click OK to include numeric characters.');
  const hasLowerCasedCharacters = confirm('Click OK to include lowercase characters.');
  const hasUpperCasedCharacters = confirm('Click OK to include uppercase characters.');

  if (!hasSpecialCharacters && !hasNumericCharacters && !hasLowerCasedCharacters && !hasUpperCasedCharacters) {
    alert('Must select at least one character type to include.');
    return null;
  }

  return {
    length,
    hasSpecialCharacters,
    hasNumericCharacters,
    hasLowerCasedCharacters,
    hasUpperCasedCharacters,
  };
}

// Function to get a random element from an array
function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Function to generate a password with user input
function generatePassword() {
  const options = getPasswordOptions();

  if (!options) return null;

  const possibleCharacters = [];
  const guaranteedCharacters = [];

  if (options.hasSpecialCharacters) {
    // If the user wants numeric characters, add all numeric characters to possibleCharacters
    possibleCharacters.push(...specialCharacters);
    // Add a randomly selected numeric character to guaranteedCharacters
    guaranteedCharacters.push(getRandom(specialCharacters));
  }

  if (options.hasNumericCharacters) {
    possibleCharacters.push(...numericCharacters);
    guaranteedCharacters.push(getRandom(numericCharacters));
  }

  if (options.hasLowerCasedCharacters) {
    possibleCharacters.push(...lowerCasedCharacters);
    guaranteedCharacters.push(getRandom(lowerCasedCharacters));
  }

  if (options.hasUpperCasedCharacters) {
    possibleCharacters.push(...upperCasedCharacters);
    guaranteedCharacters.push(getRandom(upperCasedCharacters));
  }

  const result = Array.from({ length: options.length }, () => getRandom(possibleCharacters));
  guaranteedCharacters.forEach((char, i) => (result[i] = char));

  return result.join('');
}

// DOM elements
const generateBtn = document.querySelector('#generate');
const passwordText = document.querySelector('#password');

// Function to write password to the input
function writePassword() {
  const password = generatePassword();
  passwordText.value = password;
}

// Event listener for the generate button
generateBtn.addEventListener('click', writePassword);
