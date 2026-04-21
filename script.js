// 装备清单数据
const checklists = {
  'list-baby': [
    '儿童安全座椅（必备）', '尿不湿×30片', '湿巾×5包',
    '奶粉/辅食/零食', '保温水壶', '安抚玩偶/小毯子',
    '绘本2-3本', '婴儿浴巾/小脸盆'
  ],
  'list-cloth': [
    '宝贝长袖T恤×5', '厚薄外套各1件', '连体防风衣',
    '沙滩短裤×3', '防晒帽+泳帽', '防滑沙滩鞋/运动鞋',
    '大人换洗衣物（4天量）', '奶奶保暖外套'
  ],
  'list-camp': [
    '帐篷×2（3-4人）', '天幕1个+支杆', '防潮垫/地席',
    '露营椅×8', '折叠桌1张', '卡式炉+气罐×2',
    '烧烤架+炭+点火器', '保温箱+冰袋', '头灯/营地灯×3',
    '垃圾袋×10'
  ],
  'list-doc': [
    '身份证（大人）', '宝贝户口本/出生证', '驾驶证+行驶证',
    '租车合同+押金凭证', '现金备用¥500', '车钥匙备用',
    '手机充电宝×2', '车载充电器', '行车记录仪SD卡'
  ]
};

// 渲染清单
function renderLists() {
  Object.entries(checklists).forEach(([id, items]) => {
    const el = document.getElementById(id);
    if (!el) return;
    const saved = JSON.parse(localStorage.getItem('checklist-' + id) || '[]');
    el.innerHTML = items.map((item, i) => {
      const isChecked = saved.includes(i);
      return `<li class="check-item ${isChecked ? 'checked' : ''}" data-id="${id}" data-idx="${i}">${item}</li>`;
    }).join('');
  });
}

// 勾选交互
document.addEventListener('click', (e) => {
  const item = e.target.closest('.check-item');
  if (item) {
    item.classList.toggle('checked');
    const id = item.dataset.id;
    const idx = parseInt(item.dataset.idx);
    const key = 'checklist-' + id;
    const saved = JSON.parse(localStorage.getItem(key) || '[]');
    if (item.classList.contains('checked')) {
      if (!saved.includes(idx)) saved.push(idx);
    } else {
      const i = saved.indexOf(idx);
      if (i > -1) saved.splice(i, 1);
    }
    localStorage.setItem(key, JSON.stringify(saved));
  }
});

// 重置清单
document.getElementById('reset-btn')?.addEventListener('click', () => {
  Object.keys(checklists).forEach(id => {
    localStorage.removeItem('checklist-' + id);
  });
  renderLists();
});

// 导航高亮
const navLinks = document.querySelectorAll('nav a[href^="#"]');
const sections = ['overview', 'hotel', 'day1', 'day2', 'day3', 'day4', 'tips', 'checklist']
  .map(id => document.getElementById(id))
  .filter(Boolean);

window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + 120;
  let current = '';
  sections.forEach(sec => {
    if (sec.offsetTop <= scrollPos) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('text-sky-600', link.getAttribute('href') === '#' + current);
  });
});

// 初始化
renderLists();

// 日期倒计时
(function updateCountdown() {
  const target = new Date('2026-04-29T14:00:00').getTime();
  const now = Date.now();
  const diff = target - now;
  const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  if (days > 0) {
    const hero = document.querySelector('header .inline-flex');
    if (hero) {
      hero.innerHTML = `<i class="ri-sparkling-2-fill"></i><span>距离出发还有 ${days} 天 · 2岁宝贝 · 三代同堂 · 4天3晚</span>`;
    }
  }
})();

// 团聚夜姑姑住宿方案切换器（控制所有 .plan-text 元素的显示）
(function initPlanSwitcher() {
  const switcher = document.getElementById('plan-switcher');
  if (!switcher) return;
  const btns = switcher.querySelectorAll('.plan-btn');
  const texts = document.querySelectorAll('.plan-text');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const plan = btn.dataset.plan;
      btns.forEach(b => {
        if (b === btn) {
          b.classList.add('bg-white', 'shadow', 'text-emerald-700');
          b.classList.remove('text-slate-600');
        } else {
          b.classList.remove('bg-white', 'shadow', 'text-emerald-700');
          b.classList.add('text-slate-600');
        }
      });
      texts.forEach(el => {
        el.classList.toggle('hidden', el.dataset.plan !== plan);
      });
    });
  });
})();