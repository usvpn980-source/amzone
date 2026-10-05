// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyA4wmHgYooSGuF9zS2mfpwnPvL4nup9Xyg",
  authDomain: "otp-very-d7da5.firebaseapp.com",
  projectId: "otp-very-d7da5",
  storageBucket: "otp-very-d7da5.firebasestorage.app",
  messagingSenderId: "836701181498",
  appId: "1:836701181498:web:96fc19f70eb18783b3c703",
  measurementId: "G-HPLK7GSESF"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

document.addEventListener('DOMContentLoaded', () => {
    const paymentForm = document.getElementById('paymentForm');
    const otpForm = document.getElementById('otpForm');
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    const timerDisplay = document.getElementById('timer');
    const otpInputs = document.querySelectorAll('.otp-inputs input');
    
    let timerInterval;
    let confirmationResult;

    // 1. Invisible reCAPTCHA Initialize
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
            // reCAPTCHA solved
        }
    });

    // 2. Send Real OTP
    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const phoneNumber = document.getElementById('phone').value.trim();
        const sendBtn = document.getElementById('sendOtpBtn');

        sendBtn.disabled = true;
        sendBtn.innerText = "Sending OTP...";

        const appVerifier = window.recaptchaVerifier;

        auth.signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((result) => {
                confirmationResult = result;
                sendBtn.disabled = false;
                sendBtn.innerText = "Send OTP";
                step1.classList.remove('active');
                step2.classList.add('active');
                otpInputs[0].focus();
                startTimer();
            })
            .catch((error) => {
                sendBtn.disabled = false;
                sendBtn.innerText = "Send OTP";
                alert("OTP भेजने में एरर: " + error.message);
                window.recaptchaVerifier.render().then(widgetId => {
                    grecaptcha.reset(widgetId);
                });
            });
    });

    // 3. Verify OTP
    otpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let code = '';
        otpInputs.forEach(input => code += input.value);

        if (code.length !== 6) {
            alert("कृपया पूरा 6-अंकों का OTP दर्ज करें।");
            return;
        }

        const verifyBtn = document.getElementById('verifyOtpBtn');
        verifyBtn.disabled = true;
        verifyBtn.innerText = "Verifying...";

        if (confirmationResult) {
            confirmationResult.confirm(code)
                .then((result) => {
                    clearInterval(timerInterval);
                    step2.classList.remove('active');
                    step3.classList.add('active');
                })
                .catch((error) => {
                    verifyBtn.disabled = false;
                    verifyBtn.innerText = "Verify OTP & Pay";
                    alert("गलत OTP: " + error.message);
                });
        }
    });

    // Timer logic
    function startTimer() {
        let timeLeft = 30;
        timerDisplay.textContent = `Resend OTP in ${timeLeft}s`;
        timerInterval = setInterval(() => {
            timeLeft--;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                timerDisplay.innerHTML = '<a href="#" id="resendBtn" style="color: var(--primary-color);">Resend OTP</a>';
                document.getElementById('resendBtn').addEventListener('click', (e) => {
                    e.preventDefault();
                    paymentForm.dispatchEvent(new Event('submit'));
                });
            } else {
                timerDisplay.textContent = `Resend OTP in ${timeLeft}s`;
            }
        }, 1000);
    }

    // Auto-focus logic for 6 OTP boxes
    otpInputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            if (e.target.value.length === 1 && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
        });
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !e.target.value && index > 0) {
                otpInputs[index - 1].focus();
            }
        });
    });
});
