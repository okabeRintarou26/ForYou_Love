document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        return false;
    });

    document.addEventListener("selectstart", (e) => {
        if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
            return;
        }
        e.preventDefault();
        return false;
    });

    document.addEventListener("keydown", (e) => {
        if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
            return;
        }
        
        if (
            (e.ctrlKey || e.metaKey) && 
            (e.key === "c" || e.key === "C" || e.key === "u" || e.key === "U" || 
             e.key === "s" || e.key === "S" || e.key === "p" || e.key === "P")
        ) {
            e.preventDefault();
            return false;
        }
        
        if (e.key === "F12") {
            e.preventDefault();
            return false;
        }
    });

    document.addEventListener("DOMContentLoaded", () => {
        const protectImages = () => {
            document.querySelectorAll("img").forEach(img => {
                img.draggable = false;
                img.style.pointerEvents = "auto";
                img.style.userSelect = "none";
                img.style.webkitUserSelect = "none";
                
                img.addEventListener("contextmenu", (e) => {
                    e.preventDefault();
                    showGlassNotification("Foto ini spesial, jangan di-download ya! 💕", false);
                    return false;
                });
                
                img.addEventListener("dragstart", (e) => {
                    e.preventDefault();
                    return false;
                });
            });
        };
        
        protectImages();
        
        const originalProceed = window.proceedToMainContent;
    });
    const photoGallery = [
        "assets/photos/foto1.jpeg",
        "assets/photos/foto2.jpeg",
        "assets/photos/foto3.jpeg",
        "assets/photos/foto4.jpeg",
        "assets/photos/foto5.jpeg",
    ];

    function initPhotoSlider() {
        const slidesContainer = document.getElementById("slidesContainer");
        if (!slidesContainer) return [];
        
        slidesContainer.innerHTML = "";
        
        photoGallery.forEach((photoPath, index) => {
            const slide = document.createElement("div");
            slide.className = "slide";
            slide.innerHTML = `<img src="${photoPath}" alt="Foto ${index + 1}" loading="lazy" draggable="false" oncontextmenu="return false;">`;
            slidesContainer.appendChild(slide);
        });
        
        return document.querySelectorAll("#photoSlider .slide");
    }
    const modal = document.getElementById("romanticModal");
    const mainContent = document.getElementById("mainContent");
    const openBtn = document.getElementById("openWebsiteBtn");
    const bgMusic = document.getElementById("bgMusic");
    const muteBtn = document.getElementById("muteToggleBtn");
    const surpriseBtn = document.getElementById("finalSurpriseBtn");
    const surpriseMessage = document.getElementById("surpriseMessage");
    const finalSection = document.getElementById("finalSection");

    const typingBoxes = document.querySelectorAll(".typing-box");
    const floatingBoxes = document.querySelectorAll(".floating-box");
    const loveTriggers = document.querySelectorAll(".love-trigger");

    const slider = document.getElementById("photoSlider");
    const slidesContainer = document.getElementById("slidesContainer");
    
    let slides = initPhotoSlider();
    
    const hugBtn = document.getElementById("hugBtn");
    const hugRain = document.getElementById("hugRain");

    const sendLoveBtn = document.getElementById("sendLoveBtn");
    const secretSection = document.getElementById("secretSection");

    const envelopeOverlay = document.getElementById("envelopeOverlay");
    const envelope = document.getElementById("envelope");
    const envelopeFlap = document.getElementById("envelopeFlap");
    const envelopeLetter = document.getElementById("envelopeLetter");
    const openEnvelopeBtn = document.getElementById("openEnvelopeBtn");
    const envelopeClickText = document.getElementById("envelopeClickText");

    let modalClosed = false;
    let currentIndex = 0;
    let typingTimeouts = [];

    let surpriseIndex = 0;

    const surpriseMessages = [
        "Kamu adalah alasan senyumku 💕",
        "Aku mencintaimu selamanya ❤️",
        "Terima kasih sudah hadir di hidupku ✨",
        "Setiap momen bersamamu adalah anugerah terindah 🌹",
        "Kamu membuat hari-hariku lebih berwarna 🌈",
        "Aku bersyukur setiap hari karena memilikimu 🙏",
        "Cintaku padamu tak akan pernah berubah 💖",
        "Kamu adalah rumah bagi hatiku 🏠💕",
        "Bersamamu, aku ingin menua bersama 👵👴💑",
        "Kamu adalah mimpi yang jadi kenyataan ✨💫",
        "Aku akan selalu di sini untukmu, apapun yang terjadi 🤝❤️",
        "Cinta kita adalah cerita terindah yang pernah kutulis 📖💕",
        "Kamu adalah bintang yang menerangi gelapku 🌟",
        "Aku jatuh cinta padamu lebih dalam setiap harinya 💘",
        "Terima kasih sudah menjadi bagian dari hidupku 🥰"
    ];

    let hugClickCount = 0;
    let easterEggTriggered = false;

    const hugTeaseMessages = [
        "Hmm, masih mau klik lagi? 😏",
        "Awas baper loh... 💕",
        "Kamu nggak bakal berhenti ya? 🤭",
        "Satu kali lagi... aku tunggu ❤️",
        "🎉 YAAAA! Kamu berhasil! 🎉"
    ];

    let envelopeOpened = false;
    let letterRevealed = false;

    if (envelopeOverlay) {
        envelopeOverlay.style.display = "flex";
    }
    
    mainContent.classList.add("blurred");
    document.body.classList.add("modal-open");
    muteBtn.textContent = "🔊";

    if (modal) {
        modal.style.display = "none";
    }

    document.body.style.userSelect = "none";
    document.body.style.webkitUserSelect = "none";
    document.body.style.mozUserSelect = "none";
    document.body.style.msUserSelect = "none";

    floatingBoxes.forEach(box => {
        box.classList.add("fade-hidden");
    });

    const floatObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove("fade-hidden");
                entry.target.classList.add("fade-show");
            }
        });
    }, { threshold: 0.4 });

    floatingBoxes.forEach(box => floatObserver.observe(box));

    function spawnLove(x, y, size = 18, opacity = 1) {
        const heart = document.createElement("div");
        heart.className = "click-heart";
        heart.textContent = "💖";
        heart.style.left = x + "px";
        heart.style.top = y + "px";
        heart.style.fontSize = size + "px";
        heart.style.opacity = opacity;
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1200);
    }

    loveTriggers.forEach(frame => {

        frame.addEventListener("click", e => {
            spawnLove(e.clientX, e.clientY);
        });

        frame.addEventListener("touchstart", e => {
            const t = e.touches[0];
            spawnLove(t.clientX, t.clientY);
        });

    });

    let trailThrottle = false;

    function spawnTrail(eX, eY){
        if(trailThrottle) return;
        trailThrottle = true;

        spawnLove(eX, eY, 10, 0.5);

        setTimeout(()=>{
            trailThrottle = false;
        },40);
    }

    document.addEventListener("mousemove",(e)=>{
        spawnTrail(e.clientX, e.clientY);
    });

    document.addEventListener("touchmove",(e)=>{
        const t = e.touches[0];
        spawnTrail(t.clientX, t.clientY);
    });

    function clearTyping() {
        typingTimeouts.forEach(t => clearTimeout(t));
        typingTimeouts = [];
    }

    function typeSequential(elements, speed = 28) {

        let index = 0;

        function typeElement(el, callback) {

            const text = el.dataset.original.replace(/\s+/g," ").trim();
            el.textContent = "";
            let i = 0;

            function typing() {
                if (i < text.length) {
                    el.textContent += text.charAt(i);
                    i++;
                    const timeout = setTimeout(typing, speed);
                    typingTimeouts.push(timeout);
                } else {
                    callback();
                }
            }

            typing();
        }

        function next() {
            if (index < elements.length) {
                typeElement(elements[index], () => {
                    index++;
                    next();
                });
            }
        }

        next();
    }

    typingBoxes.forEach(box => {
        box.querySelectorAll(".typing-text").forEach(el => {
            el.dataset.original = el.textContent.replace(/\s+/g," ").trim();
            el.textContent = "";
            el.style.userSelect = "none";
            el.style.webkitUserSelect = "none";
        });
    });

    function openEnvelope() {
        if (envelopeOpened) return;
        envelopeOpened = true;

        if (envelopeClickText) {
            envelopeClickText.style.transition = "opacity 0.3s ease, transform 0.3s ease";
            envelopeClickText.style.opacity = "0";
            envelopeClickText.style.transform = "translateY(-10px)";
            setTimeout(() => {
                envelopeClickText.style.display = "none";
            }, 300);
        }

        if (envelopeFlap) {
            envelopeFlap.style.transition = "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)";
            envelopeFlap.style.transform = "rotateX(180deg)";
        }

        setTimeout(() => {
            if (envelopeLetter) {
                envelopeLetter.style.opacity = "1";
                envelopeLetter.style.transform = "translateY(0)";
                letterRevealed = true;
            }

            if (openEnvelopeBtn) {
                openEnvelopeBtn.style.display = "inline-flex";
                setTimeout(() => {
                    openEnvelopeBtn.style.opacity = "1";
                    openEnvelopeBtn.style.transform = "translateY(0)";
                }, 100);
            }

            for (let i = 0; i < 15; i++) {
                setTimeout(() => {
                    const rect = envelope?.getBoundingClientRect();
                    if (rect) {
                        spawnLove(
                            rect.left + rect.width / 2 + (Math.random() - 0.5) * 100,
                            rect.top + rect.height / 2 + (Math.random() - 0.5) * 100,
                            20,
                            1
                        );
                    }
                }, i * 100);
            }

        }, 600);
    }

    function proceedToMainContent() {
        if (envelopeOverlay) {
            envelopeOverlay.style.transition = "opacity 0.5s ease, transform 0.5s ease";
            envelopeOverlay.style.opacity = "0";
            envelopeOverlay.style.transform = "scale(1.1)";
            
            setTimeout(() => {
                envelopeOverlay.style.display = "none";
                
                if (modal) {
                    modal.style.display = "flex";
                    modal.style.animation = "fadeIn 0.6s ease forwards";
                }
                
                const modalTexts = modal.querySelectorAll(".typing-text");
                typeSequential(modalTexts);
                
                document.querySelectorAll("img").forEach(img => {
                    img.draggable = false;
                    img.style.userSelect = "none";
                    img.style.webkitUserSelect = "none";
                });
                
            }, 500);
        }
    }

    if (envelope) {
        envelope.addEventListener("click", (e) => {
            if (envelopeOpened || e.target === openEnvelopeBtn || openEnvelopeBtn?.contains(e.target)) {
                return;
            }
            openEnvelope();
        });
    }

    if (openEnvelopeBtn) {
        openEnvelopeBtn.addEventListener("click", () => {
            if (!letterRevealed) return;
            proceedToMainContent();
        });
    }

    openBtn.addEventListener("click", () => {

        const confirmMsg = confirm(
            "Yakin mau lanjut lihat? 😏\n\nNanti baper loh ❤️"
        );

        if(!confirmMsg) return;

        clearTyping();

        modal.style.display = "none";
        mainContent.classList.remove("blurred");
        document.body.classList.remove("modal-open");

        modalClosed = true;

        bgMusic.volume = 0.3;
        bgMusic.play().catch(()=>{});

        muteBtn.classList.add("show");

        const heroTexts =
            document.querySelector(".hero .typing-box")
            .querySelectorAll(".typing-text");

        typeSequential(heroTexts);

    }, { once: true });

    muteBtn.addEventListener("click", () => {
        bgMusic.muted = !bgMusic.muted;
        muteBtn.textContent = bgMusic.muted ? "🔈" : "🔊";
    });

    const observer = new IntersectionObserver((entries, obs) => {

        if (!modalClosed) return;

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                if (entry.target.closest(".hero")) return;

                const texts = entry.target.querySelectorAll(".typing-text");
                typeSequential(texts);
                obs.unobserve(entry.target);
            }
        });

    }, { threshold: 0.4 });

    typingBoxes.forEach(box => observer.observe(box));

    setInterval(() => {
        const heart = document.createElement("div");
        heart.className = "bg-heart";
        heart.textContent = "❤";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = (Math.random() * 12 + 10) + "px";
        heart.style.animationDuration = (Math.random() * 4 + 6) + "s";
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 10000);
    }, 900);

    function spawnHeartRain(quantity = 40) {
        if (!document.getElementById("heartRainStyle")) {
            const style = document.createElement("style");
            style.id = "heartRainStyle";
            style.textContent = `
                @keyframes heartFall {
                    0% { transform: translateY(-10vh) rotate(0deg) scale(0); opacity: 1; }
                    10% { transform: translateY(-5vh) rotate(15deg) scale(1); }
                    90% { opacity: 1; }
                    100% { transform: translateY(110vh) rotate(360deg) scale(1); opacity: 0; }
                }
                @keyframes heartSwing {
                    0%, 100% { margin-left: 0; }
                    25% { margin-left: -15px; }
                    75% { margin-left: 15px; }
                }
            `;
            document.head.appendChild(style);
        }

        for (let i = 0; i < quantity; i++) {
            setTimeout(() => {
                const heart = document.createElement("div");
                heart.className = "rain-heart";
                const hearts = ["❤️", "💖", "💕", "💗", "💓", "💝", "🩷"];
                heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
                
                const startX = Math.random() * 100;
                const size = Math.random() * 20 + 15;
                const duration = Math.random() * 3 + 4;
                const delay = Math.random() * 1.5;
                const swingDuration = Math.random() * 2 + 2;
                
                heart.style.cssText = `
                    position: fixed;
                    left: ${startX}vw;
                    top: -10vh;
                    font-size: ${size}px;
                    animation: heartFall ${duration}s ease-in forwards, heartSwing ${swingDuration}s ease-in-out infinite;
                    animation-delay: ${delay}s;
                    z-index: 9998;
                    pointer-events: none;
                    text-shadow: 0 2px 10px rgba(255, 105, 180, 0.5);
                    filter: drop-shadow(0 0 5px rgba(255, 105, 180, 0.6));
                `;
                
                document.body.appendChild(heart);
                
                setTimeout(() => {
                    heart.style.transition = "opacity 0.5s ease";
                    heart.style.opacity = "0";
                    setTimeout(() => heart.remove(), 500);
                }, (duration + delay) * 1000);
                
            }, i * 80);
        }
    }

    surpriseBtn.addEventListener("click", () => {
        spawnHeartRain(50);
        scrollLock = true;
        finalSection.scrollIntoView({ behavior: "smooth" });
        setTimeout(()=>{ scrollLock = false; }, 800);
        clearTyping();
        surpriseIndex = (surpriseIndex + 1) % surpriseMessages.length;
        const nextMessage = surpriseMessages[surpriseIndex];
        surpriseMessage.dataset.original = nextMessage;
        typeSequential([surpriseMessage], 35);
    });

    function showEasterEggGlassBox() {
        const oldBox = document.getElementById("easterEggGlassBox");
        if (oldBox) oldBox.remove();

        const glassBox = document.createElement("div");
        glassBox.id = "easterEggGlassBox";
        glassBox.className = "easter-glass-box";
        
        if (!document.getElementById("easterGlassStyle")) {
            const style = document.createElement("style");
            style.id = "easterGlassStyle";
            style.textContent = `
                @keyframes glassPopIn {
                    0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                    50% { transform: translate(-50%, -50%) scale(1.05); }
                    100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                }
                @keyframes btnPulse {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(255, 105, 180, 0.6); transform: scale(1); }
                    50% { box-shadow: 0 0 0 15px rgba(255, 105, 180, 0); transform: scale(1.02); }
                }
                @keyframes floatHearts {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-10px) rotate(5deg); }
                }
            `;
            document.head.appendChild(style);
        }

        glassBox.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 255, 255, 0.12);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 2px solid rgba(255, 255, 255, 0.4);
            border-radius: 24px;
            padding: 28px 24px;
            color: #fff;
            text-align: center;
            z-index: 10000;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4), 0 0 40px rgba(255, 105, 180, 0.3);
            animation: glassPopIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            max-width: 92vw;
            width: 380px;
        `;

        const floatingHearts = document.createElement("div");
        floatingHearts.style.cssText = `
            position: absolute;
            top: -20px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 28px;
            animation: floatHearts 2s ease-in-out infinite;
            pointer-events: none;
        `;
        floatingHearts.textContent = "💕 💖 💕";
        glassBox.appendChild(floatingHearts);

        const title = document.createElement("h3");
        title.textContent = "🎁 Kamu Spesial! 🎁";
        title.style.cssText = `
            margin: 15px 0 12px;
            font-size: 20px;
            font-weight: 700;
            color: #fff;
            text-shadow: 0 2px 10px rgba(255, 105, 180, 0.5);
        `;
        glassBox.appendChild(title);

        const desc = document.createElement("p");
        desc.innerHTML = "Terima kasih sudah klik peluk virtual sampai 5 kali! ❤️<br><br>Kalau kamu juga sayang, balas yuk~";
        desc.style.cssText = `
            margin: 0 0 20px;
            font-size: 14px;
            line-height: 1.6;
            color: rgba(255, 255, 255, 0.95);
            opacity: 0.95;
            user-select: none;
            -webkit-user-select: none;
        `;
        glassBox.appendChild(desc);

        const replyBtn = document.createElement("button");
        replyBtn.id = "easterReplyBtn";
        replyBtn.className = "easter-reply-btn";
        replyBtn.innerHTML = "💌 Aku Juga Mencintaimu Sayangku ❤️";
        replyBtn.style.cssText = `
            background: linear-gradient(135deg, #ff6b9d, #ff8fab, #ffb3c6);
            border: none;
            border-radius: 50px;
            padding: 14px 28px;
            color: #fff;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 8px 25px rgba(255, 105, 180, 0.5);
            animation: btnPulse 2s ease-in-out infinite;
            width: 100%;
            max-width: 320px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        `;
        
        replyBtn.onmouseenter = function() {
            this.style.transform = "scale(1.03)";
            this.style.boxShadow = "0 12px 35px rgba(255, 105, 180, 0.7)";
        };
        replyBtn.onmouseleave = function() {
            this.style.transform = "scale(1)";
            this.style.boxShadow = "0 8px 25px rgba(255, 105, 180, 0.5)";
        };

        replyBtn.addEventListener("click", () => {
            const loveMessage = "Sayangku ❤️\n\nAku juga mencintaimu lebih dari kata-kata bisa ungkapin 🥺💕\nTerima kasih sudah buat hari-hariku lebih berarti ✨\nI love you forever and always 🌹💖";
            const phoneNumber = "6281316672066";
            const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(loveMessage)}`;
            
            replyBtn.innerHTML = "⏳ Mengirim...";
            replyBtn.style.pointerEvents = "none";
            replyBtn.style.opacity = "0.8";
            
            setTimeout(() => {
                window.open(waUrl, "_blank");
                setTimeout(() => {
                    replyBtn.innerHTML = "💌 Aku Juga Mencintaimu Sayangku ❤️";
                    replyBtn.style.pointerEvents = "auto";
                    replyBtn.style.opacity = "1";
                }, 2000);
            }, 600);
        });

        glassBox.appendChild(replyBtn);

        const closeHint = document.createElement("small");
        closeHint.innerHTML = "<br><small style='opacity:0.6'>💡 Klik area luar untuk menutup</small>";
        closeHint.style.cssText = `
            display: block;
            margin-top: 18px;
            font-size: 11px;
            color: rgba(255,255,255,0.7);
            user-select: none;
            -webkit-user-select: none;
        `;
        glassBox.appendChild(closeHint);

        document.body.appendChild(glassBox);

        const closeHandler = (e) => {
            if (!glassBox.contains(e.target) && e.target !== replyBtn) {
                glassBox.style.transition = "opacity 0.3s ease, transform 0.3s ease";
                glassBox.style.opacity = "0";
                glassBox.style.transform = "translate(-50%, -50%) scale(0.9)";
                setTimeout(() => {
                    glassBox.remove();
                    document.removeEventListener("click", closeHandler);
                    document.removeEventListener("touchstart", closeHandler);
                }, 300);
            }
        };

        setTimeout(() => {
            document.addEventListener("click", closeHandler);
            document.addEventListener("touchstart", closeHandler, { passive: true });
        }, 100);

        return glassBox;
    }

    function showGlassNotification(message, isFinal = false) {
        const oldNotif = document.getElementById("glassNotif");
        if (oldNotif) oldNotif.remove();

        const notif = document.createElement("div");
        notif.id = "glassNotif";
        notif.className = "glass-notif";
        notif.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 16px;
            padding: 12px 24px;
            color: #fff;
            font-size: 14px;
            font-weight: 500;
            text-align: center;
            z-index: 9999;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            animation: slideUpFade 0.4s ease-out, pulseGlow 2s ease-in-out infinite;
            max-width: 90vw;
            word-wrap: break-word;
            user-select: none;
            -webkit-user-select: none;
            pointer-events: none;
        `;
        notif.textContent = message;

        if (!document.getElementById("glassNotifStyle")) {
            const style = document.createElement("style");
            style.id = "glassNotifStyle";
            style.textContent = `
                @keyframes slideUpFade {
                    from { opacity: 0; transform: translateX(-50%) translateY(30px); }
                    to { opacity: 1; transform: translateX(-50%) translateY(0); }
                }
                @keyframes pulseGlow {
                    0%, 100% { box-shadow: 0 8px 32px rgba(255, 105, 180, 0.3); }
                    50% { box-shadow: 0 8px 40px rgba(255, 105, 180, 0.6); }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notif);

        if (!isFinal) {
            setTimeout(() => {
                notif.style.transition = "opacity 0.3s ease, transform 0.3s ease";
                notif.style.opacity = "0";
                notif.style.transform = "translateX(-50%) translateY(20px)";
                setTimeout(() => notif.remove(), 300);
            }, 2500);
        }

        return notif;
    }

    if(hugBtn){
        hugBtn.addEventListener("click", ()=>{
            hugClickCount++;

            const total = 12;
            for(let i=0;i<total;i++){
                setTimeout(()=>{
                    const img = document.createElement("img");
                    img.src = "assets/hug.gif";
                    img.className = "hug-item";
                    img.style.left = Math.random()*100 + "vw";
                    img.style.animationDuration = (Math.random()*2+3)+"s";
                    img.draggable = false;
                    hugRain.appendChild(img);
                    setTimeout(()=>{ img.remove(); }, 5000);
                }, i*120);
            }

            if (hugClickCount < 5) {
                showGlassNotification(hugTeaseMessages[hugClickCount - 1]);
            } 
            else if (hugClickCount === 5 && !easterEggTriggered) {
                easterEggTriggered = true;
                showGlassNotification(hugTeaseMessages[4], true);
                
                for(let i=0; i<12; i++){
                    setTimeout(() => {
                        spawnLove(
                            window.innerWidth / 2 + (Math.random() - 0.5) * 150,
                            window.innerHeight / 2 + (Math.random() - 0.5) * 150,
                            28, 1
                        );
                    }, i * 80);
                }

                setTimeout(() => {
                    showEasterEggGlassBox();
                    if(secretSection) {
                        setTimeout(() => {
                            secretSection.scrollIntoView({ behavior: "smooth" });
                            const secretTexts = secretSection.querySelectorAll(".typing-text");
                            if (secretTexts.length > 0) {
                                setTimeout(() => { typeSequential(secretTexts, 30); }, 600);
                            }
                        }, 800);
                    }
                }, 800);
            }
        });
    }

    if(sendLoveBtn){
        sendLoveBtn.addEventListener("click", ()=>{
            const text = "Hai sayang ❤️ aku sudah lihat semuanya… aku juga sayang kamu 😳";
            const url = "https://wa.me/6281316672066?text=" + encodeURIComponent(text);
            window.open(url,"_blank");
        });
    }

    function updateSlider() {
        if (slidesContainer && slides.length > 0) {
            slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
    }

    function nextSlide() {
        if (slides.length === 0) return;
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    }

    function prevSlide() {
        if (slides.length === 0) return;
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
    }

    if (slider && slidesContainer && slides.length > 0) {
        
        slider.addEventListener("click", (e) => {
            const rect = slider.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            if (clickX > rect.width / 2) {
                nextSlide();
            } else {
                prevSlide();
            }
        });

        let startX = 0;
        slider.addEventListener("touchstart", (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });

        slider.addEventListener("touchend", (e) => {
            let endX = e.changedTouches[0].clientX;
            if (startX - endX > 50) {
                nextSlide();
            } else if (endX - startX > 50) {
                prevSlide();
            }
        }, { passive: true });

        if (slides.length > 1) {
            setInterval(() => {
                nextSlide();
            }, 3000);
        }
        
        updateSlider();
    }

});