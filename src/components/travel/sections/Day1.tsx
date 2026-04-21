/** Day 1 · 4.29 京城出发 · 海边初遇 */
export default function Day1() {
  return (
    <section id="day1" className="py-12 bg-gradient-to-b from-sky-50/50 to-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-sky-700 text-white flex items-center justify-center text-2xl font-black shadow-lg shadow-sky-200">01</div>
          <div>
            <div className="text-sm text-sky-600 font-semibold">4月29日 · 星期三</div>
            <h2 className="text-3xl font-black">京城出发 · 海边初遇</h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <TimelineCard from="14:00" to="15:00" dot="bg-sky-500" ring="ring-sky-100"
              icon="ri-car-line" iconClr="text-sky-600" title="天通苑取车 + 安装儿童座椅"
              desc="天通苑地铁站附近取车，务必检查：儿童安全座椅（面朝前 / 后）、胎压、油量、雨刷、车载充电。把露营装备、行李箱先装后备箱。"
              tags={[
                { text: '🍼 奶粉瓶罐先上车', clr: 'bg-sky-50 text-sky-700' },
                { text: '🧸 暄暄平时安抚玩具', clr: 'bg-sky-50 text-sky-700' },
              ]} />

            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex gap-4">
              <TimeRail from="15:00" to="19:00" dot="bg-sky-500" ring="ring-sky-100" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <i className="ri-road-map-line text-sky-600" />
                  <h3 className="font-bold">自驾北京 → 北戴河</h3>
                  <span className="text-xs text-slate-400 ml-auto">约 321 km · 3h45m</span>
                </div>
                <p className="text-sm text-slate-600 mb-2">走京平高速 → 首都环线高速 → 承秦高速 → 京哈高速，汤河大桥出口下高速。途中红绿灯较少，路况畅通。</p>
                <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-600">
                  <div className="font-semibold text-slate-700 mb-1"><i className="ri-route-line mr-1" />建议中途休息点</div>
                  <div>• <b>平谷服务区</b>（出发约1h15m，加水/换尿不湿）</div>
                  <div>• <b>迁西服务区</b>（出发约2h30m，活动腿脚、吃点水果）</div>
                  <div className="mt-1 text-rose-500">💡 2 岁的暄暄每1.5h停车活动10分钟，避免晕车</div>
                </div>
              </div>
            </div>

            <TimelineCard from="19:00" to="20:30" dot="bg-sky-500" ring="ring-sky-100"
              icon="ri-home-4-line" iconClr="text-sky-600" title="抵达海滨公园民宿 · 晚餐"
              descNode={<>入住海滨公园附近住宿，放下行李。推荐步行到附近的 <b>刘莉家海鲜</b> 或 <b>陈记铁锅炖</b>，皮皮虾、梭子蟹、铁锅炖鱼，暄暄可点蒸蛋和白米粥。</>}
              tags={[
                { text: '🦐 清蒸虾·无刺', clr: 'bg-amber-50 text-amber-700' },
                { text: '🥚 虾仁蒸蛋', clr: 'bg-amber-50 text-amber-700' },
                { text: '🍜 手擀面', clr: 'bg-amber-50 text-amber-700' },
              ]} />

            <TimelineCard from="20:30" to="22:00" dot="bg-indigo-500" ring="ring-indigo-100"
              icon="ri-moon-line" iconClr="text-indigo-600" title="海滨公园夜游 · 听浪入眠"
              desc="饭后慢步到海滨公园，让暄暄第一次看大海（夜晚仅听浪声、看灯光，不下水）。给他穿暖和点，海边夜晚风大。回民宿洗澡、讲绘本、早睡。"
            />
          </div>

          <div className="space-y-4">
            <div className="bg-gradient-to-br from-sky-500 to-sky-700 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm opacity-80">今日天气</span>
                <i className="ri-sun-cloudy-line text-2xl" />
              </div>
              <div className="text-3xl font-bold">18° / 10°</div>
              <div className="text-sm opacity-80 mt-1">多云转晴 · 东南风3级</div>
              <div className="mt-4 pt-4 border-t border-white/20 text-xs opacity-90">
                <i className="ri-alert-line" /> 海边夜晚偏凉，给暄暄备薄外套
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-100">
              <h4 className="font-bold mb-3 flex items-center gap-2"><i className="ri-map-pin-line text-sky-600" />今日路线</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-sky-500" />
                  <span>北京·天通苑</span>
                </div>
                <div className="ml-1 pl-4 border-l-2 border-dashed border-slate-200 text-xs text-slate-500 py-1">京平高速·首都环线·京哈高速</div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-sky-700" />
                  <span>秦皇岛·海港区海滨公园</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
                <div><div className="text-lg font-bold text-sky-600">321</div><div className="text-xs text-slate-500">公里</div></div>
                <div><div className="text-lg font-bold text-sky-600">3h45</div><div className="text-xs text-slate-500">车程</div></div>
                <div><div className="text-lg font-bold text-sky-600">¥158</div><div className="text-xs text-slate-500">过路费</div></div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 font-bold text-amber-800 mb-2"><i className="ri-lightbulb-flash-line" />亲子贴士</div>
              <ul className="text-sm text-amber-900 space-y-1.5 list-disc list-inside">
                <li>出发前2小时让暄暄小睡，车上可接觉</li>
                <li>准备旧围兜/湿巾/备用裤子若干</li>
                <li>预约的民宿需提前确认是否有婴儿床</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- 公用小组件 ---------- */
type Tag = { text: string; clr: string }

function TimeRail({ from, to, dot, ring }: { from: string; to: string; dot: string; ring: string }) {
  return (
    <div className="flex-shrink-0 w-20 text-center">
      <div className="text-xs text-slate-400">{from}</div>
      <div className={`w-3 h-3 mx-auto my-1 rounded-full ${dot} ring-4 ${ring}`} />
      <div className="text-xs text-slate-400">{to}</div>
    </div>
  )
}

function TimelineCard({
  from, to, dot, ring, icon, iconClr, title, desc, descNode, tags,
}: {
  from: string; to: string; dot: string; ring: string
  icon: string; iconClr: string; title: string
  desc?: string; descNode?: React.ReactNode; tags?: Tag[]
}) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex gap-4">
      <TimeRail from={from} to={to} dot={dot} ring={ring} />
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <i className={`${icon} ${iconClr}`} />
          <h3 className="font-bold">{title}</h3>
        </div>
        {descNode ? <p className="text-sm text-slate-600 mb-2">{descNode}</p>
          : desc ? <p className="text-sm text-slate-600 mb-2">{desc}</p> : null}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 text-xs">
            {tags.map((t) => (
              <span key={t.text} className={`px-2 py-1 rounded-md ${t.clr}`}>{t.text}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
