document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 0. Page Transition & Initial Load
    // ==========================================
    const transitionEl = document.getElementById('page-transition');
    if (transitionEl) {
        // Initial fade-in (remove black screen)
        requestAnimationFrame(() => {
            transitionEl.classList.add('page-transition-enter');
        });
    }

    // Smooth Navigation Transitions
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetEl = document.querySelector(targetId);
            if (targetEl && transitionEl) {
                // Fade out to black
                transitionEl.classList.remove('page-transition-enter');
                transitionEl.classList.add('page-transition-exit');
                
                setTimeout(() => {
                    targetEl.scrollIntoView({ behavior: 'auto' });
                    // Fade back in
                    requestAnimationFrame(() => {
                        transitionEl.classList.remove('page-transition-exit');
                        transitionEl.classList.add('page-transition-enter');
                    });
                }, 400);
            }
        });
    });

    // ==========================================
    // 1. Dynamic Academic Cards (6 Cards)
    // ==========================================
    const academicContainer = document.getElementById('academic-cards-container');
    const cardsData = [
        {
            title: 'PLC 프로그래밍',
            desc: '산업용 로봇 및 자동화 라인의 시퀀스 제어 최적화',
            icon: '⚡',
            label: 'Sequence Control',
            percent: 95,
            topics: ['Ladder Logic 설계 및 디버깅', 'HMI 인터페이스 연동 제어']
        },
        {
            title: '인공지능개론',
            desc: 'AI 모델의 이해 및 데이터 기반 문제 해결 능력, 머신러닝/딥러닝 실무 응용',
            icon: '🧠',
            label: 'AI Data & ML Application',
            percent: 88,
            topics: ['데이터 전처리 및 판단 로직 구축', '신경망 알고리즘 구현 실습']
        },
        {
            title: '웹 프로그래밍',
            desc: '장비 대시보드(SCADA) 및 엔지니어링 협업 툴 개발 역량',
            icon: '🌐',
            label: 'Modern Web Stack',
            percent: 92,
            topics: ['HTML5/CSS3/JS 인터랙티브 디자인', '실시간 데이터 시각화 UI/UX']
        },
        {
            title: '전공 영어',
            desc: 'AMK 글로벌 본사 및 해외 법인과의 기술 소통 역량',
            icon: '✈️',
            label: 'Global Tech Communication',
            percent: 96,
            topics: ['영문 기술 매뉴얼 분석 및 작성', '글로벌 현장 서비스 비즈니스 회화']
        },
        {
            title: 'ROS2 & 로봇 제어',
            desc: 'Mobile Robot 시스템 아키텍처 및 정밀 제어',
            icon: '🤖',
            label: 'Robotics Control',
            percent: 90,
            topics: ['ROS2 기반 로봇 소프트웨어 아키텍처', '자율주행 및 센서 퓨전 기술 적용']
        },
        {
            title: '캡스톤 경진대회 (Special)',
            desc: '웨이퍼 검사 및 이송 자동화 통합 솔루션 구축 (AI 불량 검출 + 로봇 제어)',
            icon: '🏆',
            label: 'Robotics & Vision Integration',
            percent: 96,
            topics: ['Raspberry Pi, OpenCV, YOLO 융합', '다축(2~3축) 로봇 파트 설계 및 제어'],
            isSpecial: true
        }
    ];

    if (academicContainer) {
        cardsData.forEach((data, index) => {
            const delay = (index % 3) * 0.1;
            const cardHtml = `
                <div class="academic-card-pro ${data.isSpecial ? 'capstone-pro' : ''} reveal-up" style="transition-delay: ${delay}s;">
                    <div class="card-glow"></div>
                    <div class="card-icon">${data.icon}</div>
                    <h3>${data.title}</h3>
                    <p class="card-desc">${data.desc}</p>
                    <div class="skill-meter">
                        <div class="meter-label">${data.label} <span>${data.percent}%</span></div>
                        <div class="meter-bar"><div class="fill" data-width="${data.percent}%" style="width: 0%;"></div></div>
                    </div>
                    <ul class="card-topics">
                        ${data.topics.map(t => `<li>${t}</li>`).join('')}
                    </ul>
                </div>
            `;
            academicContainer.insertAdjacentHTML('beforeend', cardHtml);
        });
    }

    // ==========================================
    // 2. Reveal Animations & Skill Bars
    // ==========================================
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                entry.target.classList.add('active');
                
                // Trigger skill bar specifically if it's inside this card
                const fill = entry.target.querySelector('.fill');
                if (fill) {
                    const w = fill.getAttribute('data-width');
                    fill.style.width = w;
                }
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll('[class*="reveal"]').forEach(el => revealObserver.observe(el));

    // ==========================================
    // 3. Abilities Panel Toggle Logic
    // ==========================================
    const btnToggle = document.getElementById('btn-toggle-abilities');
    if (btnToggle) {
        btnToggle.addEventListener('click', () => {
            if (academicContainer) {
                const isHidden = academicContainer.classList.contains('hidden-panel');
                if (isHidden) {
                    academicContainer.classList.remove('hidden-panel');
                    academicContainer.classList.add('show');
                    btnToggle.textContent = 'Hide Core Abilities';
                    
                    // Manually trigger reveal for cards in side
                    const cards = academicContainer.querySelectorAll('.reveal-up');
                    cards.forEach(card => {
                        card.classList.add('reveal-visible');
                        card.classList.add('active');
                        const fill = card.querySelector('.fill');
                        if(fill) fill.style.width = fill.getAttribute('data-width');
                    });
                } else {
                    academicContainer.classList.add('hidden-panel');
                    academicContainer.classList.remove('show');
                    btnToggle.textContent = 'View Core Abilities';
                }
            }
        });
    }

    // ==========================================
    // 4. UI Interactions (Cursor, Navbar, Particles)
    // ==========================================
    const cursor = document.getElementById('cursor-outline');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
        });
    }

    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (!navbar) return;
        if (window.scrollY > 100) {
            navbar.style.padding = "15px 40px";
            navbar.style.background = "rgba(5, 10, 15, 0.8)";
        } else {
            navbar.style.padding = "30px 40px";
            navbar.style.background = "transparent";
        }
    });

    const createParticles = () => {
        const bg = document.querySelector('.bg-gradient');
        if (!bg) return;
        for (let i = 0; i < 20; i++) {
            const dot = document.createElement('div');
            dot.className = 'tech-dot';
            dot.style.cssText = `
                position: absolute; width: 2px; height: 2px;
                background: var(--primary); border-radius: 50%;
                top: ${Math.random() * 100}%; left: ${Math.random() * 100}%;
                opacity: ${Math.random() * 0.5};
                animation: particle-float ${5 + Math.random() * 5}s linear infinite;
            `;
            bg.appendChild(dot);
        }
    };
    createParticles();

    // ==========================================
    // 4. Guestbook Logic
    // ==========================================
    const gbForm = document.getElementById('gb-form');
    const gbMessages = document.getElementById('gb-messages');

    const escapeHTML = (str) => str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[tag]));

    const fetchMessages = async () => {
        if (!gbMessages) return;
        try {
            const res = await fetch('http://localhost:3000/api/guestbook');
            const messages = await res.json();
            if (messages.length === 0) {
                gbMessages.innerHTML = '<div class="gb-loading">첫 번째 메시지를 남겨주세요!</div>';
                return;
            }
            gbMessages.innerHTML = '';
            messages.forEach(msg => {
                const date = new Date(msg.timestamp).toLocaleString('ko-KR', { 
                    year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'
                });
                const msgBox = document.createElement('div');
                msgBox.className = 'gb-message-box';
                msgBox.innerHTML = `
                    <div class="gb-message-header">
                        <span class="gb-name">${escapeHTML(msg.name)}</span>
                        <span class="gb-time">${date}</span>
                    </div>
                    <div class="gb-message-content">${escapeHTML(msg.message)}</div>
                `;
                gbMessages.appendChild(msgBox);
            });
        } catch (error) {
            console.error('Fetch error:', error);
            gbMessages.innerHTML = '<div class="gb-loading">서버 연결 대기 중...</div>';
        }
    };

    if (gbForm) {
        gbForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = gbForm.querySelector('button');
            const name = document.getElementById('gb-name').value.trim();
            const email = document.getElementById('gb-email').value.trim();
            const message = document.getElementById('gb-message').value.trim();

            if (!name || !message) return;
            btn.disabled = true;
            try {
                const res = await fetch('http://localhost:3000/api/guestbook', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, message })
                });
                if (res.ok) {
                    gbForm.reset();
                    fetchMessages();
                }
            } catch (error) {
                console.error('Submit error:', error);
            } finally {
                btn.disabled = false;
            }
        });
        fetchMessages();
    }

    // ==========================================
    // 5. Chatbot Logic
    // ==========================================
    const chatToggle = document.getElementById('chat-toggle');
    const chatModal = document.getElementById('chat-modal');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');

    if (chatToggle) {
        chatToggle.addEventListener('click', () => chatModal.classList.toggle('open'));
    }

    const appendMessage = (sender, text) => {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-bubble ${sender}`;
        msgDiv.textContent = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    if (chatForm) {
        chatForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const text = chatInput.value.trim();
            if (!text) return;

            appendMessage('user', text);
            chatInput.value = '';
            chatInput.disabled = true;

            try {
                const res = await fetch('http://localhost:3000/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: text })
                });
                const data = await res.json();
                setTimeout(() => appendMessage('bot', data.message || '문의가 접수되었습니다.'), 500);
            } catch (error) {
                setTimeout(() => appendMessage('bot', '메시지 전송에 실패했습니다.'), 500);
            } finally {
                chatInput.disabled = false;
                chatInput.focus();
            }
        });
    }
});
