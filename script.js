<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <link rel="stylesheet" href="style.css">
    
    <!-- Firebase SDKs (Compat Version) -->
    <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js"></script>
</head>
<body>
    <div class="container">
        <!-- Step 1: Payment / Phone Entry -->
        <div id="step1" class="step active">
            <h2>Payment Details</h2>
            <form id="paymentForm">
                <div class="input-group">
                    <label for="phone">Phone Number</label>
                    <input type="tel" id="phone" placeholder="+91 9876543210" required>
                </div>
                <div id="recaptcha-container"></div>
                <button type="submit" class="btn">Send OTP</button>
            </form>
        </div>

        <!-- Step 2: OTP Verification -->
        <div id="step2" class="step">
            <h2>Enter OTP</h2>
            <p>Verification code sent to your phone</p>
            <form id="otpForm">
                <div class="otp-inputs">
                    <input type="text" maxlength="1" pattern="\d" required>
                    <input type="text" maxlength="1" pattern="\d" required>
                    <input type="text" maxlength="1" pattern="\d" required>
                    <input type="text" maxlength="1" pattern="\d" required>
                    <input type="text" maxlength="1" pattern="\d" required>
                    <input type="text" maxlength="1" pattern="\d" required>
                </div>
                <div id="timer" class="timer">Resend OTP in 30s</div>
                <button type="submit" class="btn">Verify OTP</button>
            </form>
        </div>

        <!-- Step 3: Success -->
        <div id="step3" class="step">
            <h2>Success!</h2>
            <p>Your OTP has been verified successfully.</p>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
