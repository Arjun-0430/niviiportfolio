// Advanced Content Protection System
(function() {
    'use strict';
    
    let isProtected = false;
    let captureAttempts = 0;
    let suspiciousActivity = 0;
    
    // Advanced screenshot detection
    function detectScreenCapture() {
        if (isProtected) return;
        isProtected = true;
        captureAttempts++;
        
        // Immediate content protection
        document.body.style.filter = 'blur(50px)';
        document.body.style.opacity = '0.05';
        document.body.style.transform = 'scale(0.8)';
        
        // Create advanced blocking overlay
        const overlay = document.createElement('div');
        overlay.id = 'advanced-protection';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: linear-gradient(45deg, #000, #1a1a1a, #000);
            z-index: 999999;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-family: 'Courier New', monospace;
            text-align: center;
        `;
        overlay.innerHTML = `
            <div style="border: 2px solid #ff0000; padding: 30px; background: rgba(0,0,0,0.9);">
                <h1 style="color: #ff0000; font-size: 32px; margin-bottom: 20px;">⚠️ SECURITY BREACH DETECTED</h1>
                <p style="font-size: 18px; margin-bottom: 10px;">Screenshot/Recording attempt blocked</p>
                <p style="font-size: 16px; color: #ffff00;">Attempt #${captureAttempts} logged and monitored</p>
                <div style="margin-top: 20px; font-size: 12px; color: #888;">
                    System will restore in <span id="countdown">3</span> seconds
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
        
        // Countdown timer
        let countdown = 3;
        const timer = setInterval(() => {
            countdown--;
            const countdownEl = document.getElementById('countdown');
            if (countdownEl) countdownEl.textContent = countdown;
            if (countdown <= 0) clearInterval(timer);
        }, 1000);
        
        // Restore after delay
        setTimeout(() => {
            document.body.style.filter = '';
            document.body.style.opacity = '';
            document.body.style.transform = '';
            if (overlay.parentNode) overlay.remove();
            isProtected = false;
        }, 3000);
    }
    
    // Comprehensive keyboard protection
    function advancedKeyboardProtection() {
        document.addEventListener('keydown', e => {
            if (e.keyCode === 44 || // Print Screen
                e.keyCode === 123 || // F12
                (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) || // Dev Tools
                (e.ctrlKey && e.keyCode === 83) || // Ctrl+S
                (e.ctrlKey && e.keyCode === 67) || // Ctrl+C
                (e.ctrlKey && e.keyCode === 65) || // Ctrl+A
                (e.ctrlKey && e.keyCode === 80) || // Ctrl+P
                (e.ctrlKey && e.keyCode === 85) || // Ctrl+U
                (e.altKey && e.keyCode === 44) || // Alt+Print Screen
                (e.metaKey && e.shiftKey && e.keyCode === 52) || // Mac screenshot
                (e.metaKey && e.shiftKey && e.keyCode === 53)) { // Mac screenshot
                e.preventDefault();
                e.stopPropagation();
                detectScreenCapture();
                return false;
            }
        });
        
        document.addEventListener('keyup', e => {
            if (e.keyCode === 44) detectScreenCapture();
        });
    }
    
    // Advanced interaction blocking
    function blockInteractions() {
        document.addEventListener('contextmenu', e => {
            e.preventDefault();
            detectScreenCapture();
            return false;
        });
        
        document.addEventListener('selectstart', e => {
            e.preventDefault();
            return false;
        });
        
        document.addEventListener('dragstart', e => {
            e.preventDefault();
            return false;
        });
        
        document.addEventListener('copy', e => {
            e.preventDefault();
            detectScreenCapture();
            return false;
        });
    }
    
    // Advanced detection systems
    function advancedDetection() {
        window.addEventListener('blur', () => {
            suspiciousActivity++;
            if (suspiciousActivity > 1) {
                detectScreenCapture();
            }
            setTimeout(() => suspiciousActivity = 0, 2000);
        });
        
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                detectScreenCapture();
            }
        });
        
        // Developer tools detection
        setInterval(() => {
            if (window.outerHeight - window.innerHeight > 200 || 
                window.outerWidth - window.innerWidth > 200) {
                detectScreenCapture();
            }
        }, 1000);
        
        // Media device monitoring
        if (navigator.mediaDevices) {
            navigator.mediaDevices.addEventListener('devicechange', () => {
                detectScreenCapture();
            });
        }
    }
    
    // Mobile protection
    function mobileProtection() {
        if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            document.addEventListener('touchstart', e => {
                if (e.touches.length > 1) {
                    e.preventDefault();
                    detectScreenCapture();
                }
            });
        }
    }
    
    // Advanced CSS injection
    function injectAdvancedStyles() {
        const style = document.createElement('style');
        style.textContent = `
            * {
                -webkit-user-select: none !important;
                -moz-user-select: none !important;
                -ms-user-select: none !important;
                user-select: none !important;
                -webkit-touch-callout: none !important;
            }
            
            img, video, canvas, svg {
                -webkit-user-drag: none !important;
                pointer-events: none !important;
            }
            
            button, a, input, textarea, select {
                pointer-events: auto !important;
            }
            
            ::selection {
                background: transparent !important;
            }
            
            ::-moz-selection {
                background: transparent !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Initialize protection
    function initAdvancedProtection() {
        advancedKeyboardProtection();
        blockInteractions();
        advancedDetection();
        mobileProtection();
        injectAdvancedStyles();
        
        console.clear();
        console.log('%c🛡️ CONTENT PROTECTED', 'color: #ff0000; font-size: 20px; font-weight: bold;');
    }
    
    // Start protection
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAdvancedProtection);
    } else {
        initAdvancedProtection();
    }
    
})();