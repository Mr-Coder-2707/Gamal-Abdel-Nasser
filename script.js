/**
 * ملف JavaScript الرئيسي لتطبيق جمال عبد الناصر التفاعلي
 * يحتوي على جميع وظائف التفاعل والتنقل والمخططات
 */

// انتظار تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', () => {
    
    // تهيئة القائمة المحمولة
    initializeMobileMenu();
    
    // تهيئة التنقل
    initializeNavigation();
    
    // تهيئة التبويبات
    initializeTabs();
    
    // تهيئة الخط الزمني
    initializeTimeline();
    
    // تهيئة المخططات
    initializeCharts();
});

/**
 * تهيئة وظائف القائمة المحمولة
 */
function initializeMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // إغلاق القائمة عند النقر خارجها
        document.addEventListener('click', (e) => {
            if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }
}

/**
 * تهيئة نظام التنقل والتمرير السلس
 */
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section');
    const mobileMenu = document.getElementById('mobile-menu');

    // تحديث الرابط النشط بناءً على التمرير
    function updateActiveLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active-nav');
            link.classList.add('inactive-nav');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active-nav');
                link.classList.remove('inactive-nav');
            }
        });
    }

    // إضافة وظائف النقر للروابط
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // إغلاق القائمة المحمولة عند النقر على رابط
                if (window.innerWidth < 768 && mobileMenu) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
    
    // مراقبة التمرير لتحديث الرابط النشط
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
}

/**
 * تهيئة نظام التبويبات التفاعلية
 */
function initializeTabs() {
    const tabs = document.querySelectorAll('.tab-button');
    const contents = document.querySelectorAll('.content-section');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // إزالة النشاط من جميع التبويبات
            tabs.forEach(item => {
                item.classList.remove('active', 'border-amber-600', 'text-amber-600', 'font-bold');
                item.classList.add('border-transparent', 'text-gray-500');
            });
            
            // تفعيل التبويب المحدد
            tab.classList.add('active', 'border-amber-600', 'text-amber-600', 'font-bold');
            tab.classList.remove('border-transparent', 'text-gray-500');
            
            // عرض المحتوى المناسب
            const target = tab.textContent;
            contents.forEach(content => {
                content.classList.remove('active');
                if (content.dataset.tab === target) {
                    content.classList.add('active');
                }
            });
        });

        // إضافة دعم لوحة المفاتيح
        tab.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                tab.click();
            }
        });
    });
}

/**
 * تهيئة الخط الزمني التفاعلي
 */
function initializeTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.timeline-item.active');
            
            // إغلاق العنصر النشط حالياً إذا كان مختلفاً
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
            }
            
            // تبديل حالة العنصر المحدد
            item.classList.toggle('active');
        });

        // إضافة دعم لوحة المفاتيح
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                item.click();
            }
        });

        // جعل العناصر قابلة للتركيز
        item.setAttribute('tabindex', '0');
    });
}

/**
 * تهيئة المخططات باستخدام Chart.js
 */
function initializeCharts() {
    const policiesCtx = document.getElementById('policiesChart');
    
    if (policiesCtx) {
        createPoliciesChart(policiesCtx);
    }
}

/**
 * إنشاء مخطط السياسات
 */
function createPoliciesChart(ctx) {
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['تأميم القناة', 'السد العالي', 'الإصلاح الزراعي', 'التصنيع الثقيل', 'التعليم المجاني'],
            datasets: [{
                label: 'الأهمية والتأثير الاستراتيجي',
                data: [100, 95, 85, 80, 90],
                backgroundColor: [
                    'rgba(180, 83, 9, 0.6)',
                    'rgba(217, 119, 6, 0.6)',
                    'rgba(234, 179, 8, 0.6)',
                    'rgba(245, 158, 11, 0.6)',
                    'rgba(202, 138, 4, 0.6)'
                ],
                borderColor: [
                    'rgba(180, 83, 9, 1)',
                    'rgba(217, 119, 6, 1)',
                    'rgba(234, 179, 8, 1)',
                    'rgba(245, 158, 11, 1)',
                    'rgba(202, 138, 4, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    rtl: true,
                    xAlign: 'center',
                    yAlign: 'bottom',
                    titleFont: { 
                        family: 'Cairo', 
                        weight: 'bold', 
                        size: 14 
                    },
                    bodyFont: { 
                        family: 'Cairo', 
                        size: 12 
                    },
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += context.raw + '% تأثير تقديري';
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        font: { family: 'Cairo' },
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                },
                y: {
                    ticks: {
                        font: { 
                            family: 'Cairo', 
                            size: 14, 
                            weight: 'bold' 
                        }
                    }
                }
            }
        }
    });
}

/**
 * وظائف مساعدة إضافية
 */

// تحسين الأداء - تأخير استدعاء الوظائف المتكررة
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// تحديث معالج التمرير مع تحسين الأداء
const debouncedScrollHandler = debounce(() => {
    // يمكن إضافة المزيد من الوظائف هنا عند الحاجة
}, 100);

window.addEventListener('scroll', debouncedScrollHandler);

// إضافة تأثيرات التحميل السلس
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// معالجة تغيير حجم النافذة
window.addEventListener('resize', debounce(() => {
    // إعادة تهيئة المخططات عند تغيير حجم الشاشة
    const charts = Chart.getChart('policiesChart');
    if (charts) {
        charts.resize();
    }
}, 250));
