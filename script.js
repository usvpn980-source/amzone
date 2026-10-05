document.addEventListener('DOMContentLoaded', () => {
    const paymentForm = document.getElementById('paymentForm');
    const otpForm = document.getElementById('otpForm');
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    const timerDisplay = document.getElementById('timer');
    let timerInterval;

    // Handle Payment Form Submission
    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        step1.classList.remove('active');
        step2.classList.add('active');
        startTimer();
    });

    // Handle OTP Form Submission
    otpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        clearInterval(timerInterval);
        step2.classList.remove('active');
        step3.classList.add('active');
    });

    // Timer Function
    function startTimer() {
        let timeLeft = 30;
        timerDisplay.textContent = `Resend OTP in ${timeLeft}s`;
        timerInterval = setInterval(() => {
            timeLeft--;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                timerDisplay.innerHTML = '<a href="#" style="color: var(--primary-color);">Resend OTP</a>';
            } else {
                timerDisplay.textContent = `Resend OTP in ${timeLeft}s`;
            }
        }, 1000);
    }

    // Auto-focus next OTP box
    const otpInputs = document.querySelectorAll('.otp-inputs input');
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
