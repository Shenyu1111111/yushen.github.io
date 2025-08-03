document.addEventListener('DOMContentLoaded', function () {
    const loadingScreen = document.querySelector('.loading-screen');
    const percentDisplay = document.querySelector('.loading-percent');
    const statusDisplay = document.querySelector('.loading-status');
    const infinityLoader = document.querySelector('.infinity-loader');

    // 创建二进制矩阵容器
    const binaryMatrix = document.createElement('div');
    binaryMatrix.className = 'binary-matrix';
    infinityLoader.appendChild(binaryMatrix);

    const statusPhases = [
        { text: "Booting cybernetic core...", percent: 0 },
        { text: "Synchronizing quantum nodes...", percent: 30 },
        { text: "Calibrating visual cortex...", percent: 60 },
        { text: "Establishing uplink...", percent: 85 }
    ];

    let progress = 0;
    const interval = setInterval(() => {
        progress += 1 + Math.random() * 3;
        if (progress > 100) progress = 100;

        percentDisplay.textContent = `${Math.floor(progress)}%`;

        const currentPhase = statusPhases.reduce((acc, phase) =>
            progress >= phase.percent ? phase : acc, statusPhases[0]);
        statusDisplay.textContent = currentPhase.text;

        if (progress >= 100) {
            clearInterval(interval);
            startBinaryTransition();
        }
    }, 120);

    function startBinaryTransition() {
    const binaryMatrix = document.querySelector('.binary-matrix');
    binaryMatrix.innerHTML = '';
    
    // 获取视口中心坐标（更精确的计算）
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    
        
        // 2. 加速莫比乌斯环旋转并准备爆发
        const mobiusRing = document.querySelector('.mobius-ring');
        mobiusRing.style.animation = 'rotate-horizontal 0.2s linear infinite';
        
        // 2. 生成400个二进制粒子（增加数量）
    for (let i = 0; i < 400; i++) {
        const bit = document.createElement('div');
        bit.className = 'binary-particle';
        bit.textContent = Math.random() > 0.5 ? '1' : '0';
        
        // 设置起始位置为屏幕中心附近
        bit.style.left = '50vw';
        bit.style.top = '50vh';
        bit.style.transform = 'translate(-50%, -50%)';

        
        // 增大运动距离（使用vw/vh单位确保全屏覆盖）
        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 50; // 使用更大的值
        bit.style.setProperty('--tx', `${(Math.cos(angle) * distance).toFixed(2)}vw`);
        bit.style.setProperty('--ty', `${(Math.sin(angle) * distance).toFixed(2)}vh`);
            
        // 强制设置初始位置（像素级精确）
        bit.style.left = `${centerX}px`;
        bit.style.top = `${centerY}px`;

        
        
        // 随机动画参数
            bit.style.animationDuration = `${0.8 + Math.random() * 0.5}s`;
            bit.style.animationDelay = `${Math.random() * 0.2}s`;
            bit.style.color = i % 4 === 0 ? 'var(--accent-color)' : 'var(--secondary-color)';
            bit.style.fontSize = `${12 + Math.random() * 8}px`; // 随机大小
            
            binaryMatrix.appendChild(bit);
        }
        
        // 4. 创建过渡蒙版
        const transitionMask = document.createElement('div');
        transitionMask.className = 'transition-mask';
        loadingScreen.appendChild(transitionMask);
        
        // 5. 更新状态文本
        statusDisplay.textContent = 'Matrix synchronization complete';
        
        // 6. 淡出加载界面
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                initPortfolio();
                initEarth();
            }, 2000);
        }, 3000);
    }
});



function initEarth() {
    // 容器设置（保持不变）
    const container = document.createElement('div');
    container.id = 'earth-container';
    container.style.cssText = `
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    z-index: -1 !important;
    opacity: 0.7 !important;
  `;
    document.body.prepend(container);

    // 1. 初始化场景
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // 2. 创建赛博朋克风格线框地球
    const geometry = new THREE.SphereGeometry(3, 32, 32); // 优化网格密度
    const material = new THREE.MeshBasicMaterial({
        wireframe: true,
        color: 0x00f7ff, // 荧光蓝
        transparent: true,
        opacity: 0.9,
        wireframeLinewidth: 2 // 加粗线框（可能需要启用特殊渲染模式）
    });

    const earth = new THREE.Mesh(geometry, material);
    earth.position.set(-3, -1, 0);
    scene.add(earth);

    // 3. 添加发光外环
    const ringGeometry = new THREE.RingGeometry(2.2, 2.3, 32);
    const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0xff00aa, // 粉红霓虹
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2; // 水平旋转
    scene.add(ring);

    // 4. 添加动态脉冲光点
    const starsGeometry = new THREE.BufferGeometry();
    const starPositions = [];
    for (let i = 0; i < 200; i++) {
        starPositions.push(
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
        );
    }
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
    const starsMaterial = new THREE.PointsMaterial({
        color: 0x00f7ff,
        size: 0.1,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true
    });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // 5. 相机位置
    camera.position.z = 5;

    // 6. 动画循环
    function animate() {
        requestAnimationFrame(animate);

        earth.rotation.y += 0.001;
        ring.rotation.z += 0.001;
        stars.rotation.y -= 0.0005;

        // 动态脉冲效果
        const pulse = Math.sin(Date.now() * 0.002) * 0.1 + 0.9;
        material.opacity = pulse * 0.8;
        ringMaterial.opacity = pulse * 0.5;

        renderer.render(scene, camera);
    }
    animate();
}






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






