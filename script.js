const generateBtn = document.getElementById('generate');
const output = document.getElementById('output');
const strengthBar = document.getElementById('strength-bar');
const strengthText = document.getElementById('strength-text');
const copyBtn = document.getElementById('copy');

function generatePassword(length) {
  let chars = "abcdefghijklmnopqrstuvwxyz";
  if(document.getElementById('uppercase').checked) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if(document.getElementById('numbers').checked) chars += "0123456789";
  if(document.getElementById('symbols').checked) chars += "!@#$%^&*()_+[]{}<>?,./";

  let password = "";
  for(let i=0; i<length; i++){
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

function checkStrength(pw) {
  let score = 0;
  if(pw.length >= 8) score++;
  if(/[A-Z]/.test(pw)) score++;
  if(/[0-9]/.test(pw)) score++;
  if(/[^A-Za-z0-9]/.test(pw)) score++;

  switch(score) {
    case 0:
    case 1: return {text: "Weak", color: "red", width: "25%"};
    case 2: return {text: "Medium", color: "orange", width: "50%"};
    case 3: return {text: "Strong", color: "yellow", width: "75%"};
    case 4: return {text: "Very Strong", color: "limegreen", width: "100%"};
  }
}

generateBtn.addEventListener('click', () => {
  const length = parseInt(document.getElementById('length').value);
  const pw = generatePassword(length);
  output.textContent = pw;

  const strength = checkStrength(pw);
  strengthBar.style.width = strength.width;
  strengthBar.style.backgroundColor = strength.color;
  strengthText.textContent = strength.text;

  copyBtn.style.display = "inline-block";
});

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(output.textContent)
    .then(() => alert("Password copied!"))
    .catch(() => alert("Failed to copy"));
});
