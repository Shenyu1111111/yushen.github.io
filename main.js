

// 检测是否为触摸设备
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}

// 设置图标点击交互
function setupIconInteractions() {
    const iconContainers = document.querySelectorAll('.ldr-shape-container');

    iconContainers.forEach(container => {
        // 如果是触摸设备，添加点击事件
        if (isTouchDevice()) {
            container.addEventListener('click', function () {
                // 移除其他容器的 active 状态
                iconContainers.forEach(otherContainer => {
                    if (otherContainer !== container) {
                        otherContainer.classList.remove('active');
                    }
                });
                // 切换当前容器的 active 状态
                this.classList.toggle('active');
            });
        }
    });
}

// 主初始化函数
function initPortfolio() {
    // 粒子背景初始化
    particlesJS('particles-js', {
        "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#00f7ff" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5, "random": true },
            "size": { "value": 3, "random": true },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#00f7ff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 3,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": true,
                "attract": {
                    "enable": true,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": { "enable": true, "mode": "bubble" },
                "onclick": { "enable": true, "mode": "repulse" }
            },
            "modes": {
                "bubble": {
                    "distance": 200,
                    "size": 6,
                    "duration": 2,
                    "opacity": 0.8,
                    "speed": 3
                },
                "repulse": { "distance": 100, "duration": 0.4 }
            }
        }
    });

    // 设置图标交互
    setupIconInteractions();

    // 创建 Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;

                // 根据元素类型应用不同动画
                if (el.classList.contains('skill')) {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }
                else if (el.classList.contains('project-card')) {
                    el.style.animation = 'fadeInUp 0.6s forwards';
                }
                else if (el.classList.contains('timeline-item')) {
                    el.style.animation = 'fadeInRight 0.6s forwards';
                }
                else {
                    el.style.animation = 'fadeInUp 0.6s forwards';
                }

                el.classList.add('visible');
                observer.unobserve(el); // 动画触发后停止观察
            }
        });
    }, {
        threshold: 0.1, // 元素可见10%时触发
        rootMargin: '0px 0px -100px 0px' // 提前100px加载
    });

    // 观察所有需要动画的元素
    document.querySelectorAll('.card, .skill, .project-card, .timeline-item').forEach(el => {
        observer.observe(el);
    });

    // 平滑滚动导航
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            setTimeout(() => {
                const target = document.querySelector(this.getAttribute('href'));
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }, 100);
        });
    });

    // 时间轴动画延迟
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });

    // 导航栏滚动效果
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(10, 10, 26, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.backgroundColor = 'rgba(10, 10, 26, 0.9)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        }
    });
}






















// 页面加载事件（修改版：添加切换动画）
document.addEventListener('DOMContentLoaded', function () {
    const loadingScreen = document.querySelector('.minimal-loading');
    const loadingBar = document.querySelector('.loading-bar');
    const loadingPercent = document.querySelector('.loading-percent');
    const body = document.body;

    let progress = 0;
    const interval = setInterval(() => {
        progress += 2 + Math.random() * 8;
        if (progress > 100) progress = 100;

        loadingBar.style.width = `${progress}%`;
        loadingPercent.textContent = `${Math.floor(progress)}%`;

        if ([30, 60, 85].includes(Math.floor(progress))) {
            progress += 0.5;
        }

        if (progress >= 100) {
            clearInterval(interval);
            
            // 1. 先让加载界面淡出
            loadingScreen.style.opacity = '0';
            loadingScreen.style.pointerEvents = 'none';

            // 2. 添加主页切入动画（从下往上滑入）
            body.style.overflow = 'hidden'; // 防止滚动条闪烁
            body.style.animation = 'pageSlideIn 0.8s ease-out forwards';
            
            // 3. 初始化主页面
            setTimeout(() => {
                initPortfolio();
                loadingScreen.remove();
                body.style.overflow = ''; // 恢复滚动
            }, 800); // 动画持续时间
        }
    }, 120);
});
