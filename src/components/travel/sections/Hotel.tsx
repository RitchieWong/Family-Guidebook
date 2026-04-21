import { useState } from 'react'

type Plan = 'a' | 'b'

/** 住宿安排 · 仙随民宿（含方案 A/B 切换） */
export default function Hotel() {
  const [plan, setPlan] = useState<Plan>('a')

  return (
    <section id="hotel" className="py-12 bg-gradient-to-b from-white to-sky-50/40 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <div className="text-sm font-semibold text-sky-600 mb-2">ACCOMMODATION</div>
            <h2 className="text-3xl md:text-4xl font-black">住宿安排</h2>
            <p className="text-slate-500 mt-2 text-sm">秦皇岛仙随民宿（海滨公园店）· 2 间标间 + 1 间榻榻米 · 共 3 晚</p>
          </div>
          <a
            href="https://map.qq.com/?what=%E7%A7%A6%E7%9A%87%E5%B2%9B%E4%BB%99%E9%9A%8F%E6%B0%91%E5%AE%BF%E6%B5%B7%E6%BB%A8%E5%85%AC%E5%9B%AD%E5%BA%97"
            target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-sky-400 hover:shadow-md transition text-sm"
          >
            <i className="ri-map-pin-line text-sky-600" />
            <span>一键地图导航</span>
          </a>
        </div>

        {/* 民宿概览大卡片 */}
        <div className="bg-gradient-to-br from-sky-600 via-cyan-600 to-teal-600 rounded-3xl p-8 md:p-10 text-white shadow-xl mb-6 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 text-[180px] opacity-10 select-none">🏡</div>
          <div className="relative grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-medium mb-3">
                <i className="ri-home-heart-fill" /> 全程唯一住宿地
              </div>
              <h3 className="text-2xl md:text-3xl font-black mb-2">秦皇岛仙随民宿 · 海滨公园店</h3>
              <div className="flex items-start gap-2 text-sm opacity-90 mb-4">
                <i className="ri-map-pin-2-line mt-0.5 flex-shrink-0" />
                <span>河北省秦皇岛市北戴河区河东寨西街47号</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                <Stat n="3" label="间房" />
                <Stat n="3" label="晚" />
                <Stat n="8" label="人入住" />
                <Stat n="🏯" label="2标间+1榻榻米" />
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-5 border border-white/20">
              <div className="text-xs opacity-80 mb-2"><i className="ri-compass-3-line" /> 周边步行可达</div>
              <ul className="text-sm space-y-2">
                <li className="flex justify-between"><span>🌅 海滨公园</span><span className="opacity-70">~5 分钟</span></li>
                <li className="flex justify-between"><span>🏖️ 老虎石沙滩</span><span className="opacity-70">~10 分钟</span></li>
                <li className="flex justify-between"><span>🦀 海鲜市场</span><span className="opacity-70">~8 分钟</span></li>
                <li className="flex justify-between"><span>🥟 四条包子铺</span><span className="opacity-70">~6 分钟</span></li>
              </ul>
            </div>
          </div>
        </div>

        {/* 房间分配 + Plan 切换器 */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-black">房间分配一览</h3>
            <span className="text-xs text-slate-500">5.1 当天暄暄从妈妈房挪到爷爷奶奶房</span>
          </div>
          <div className="inline-flex bg-slate-100 rounded-xl p-1 text-xs font-medium">
            <PlanBtn active={plan === 'a'} onClick={() => setPlan('a')}>方案 A · 姑姑睡榻榻米</PlanBtn>
            <PlanBtn active={plan === 'b'} onClick={() => setPlan('b')}>方案 B · 姑姑陪暄暄</PlanBtn>
          </div>
        </div>

        {/* 3 间房卡片 */}
        <div className="grid md:grid-cols-3 gap-5 mb-6">
          {/* 房 1 标间 A */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-lg transition">
            <div className="bg-gradient-to-r from-sky-500 to-cyan-500 text-white p-4 flex items-center justify-between">
              <div>
                <div className="text-xs opacity-80">房间 1 · 标间 A</div>
                <div className="font-bold text-lg">🛏️ 爸爸 + 妈妈</div>
              </div>
              <div className="text-3xl">👨‍👩</div>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <i className="ri-hotel-bed-line text-sky-600" />
                <span>标准间 · 双床 · 无早</span>
              </div>
              <div className="bg-slate-50 rounded-lg p-3 text-xs text-slate-600 space-y-1.5">
                <div className="font-semibold text-slate-700 mb-1">📅 每晚安排</div>
                <Row left="4.29 · 4.30" right="爸爸 + 妈妈" rightCls="text-sky-600 font-medium" border />
                <Row left="5.01 团聚夜" right="爸爸 + 妈妈" rightCls="text-sky-600 font-medium" />
              </div>
              <div className="text-xs text-emerald-600 flex items-center gap-1">
                <i className="ri-checkbox-circle-fill" />
                <span>连住 3 晚，无需换房</span>
              </div>
            </div>
          </div>

          {/* 房 2 标间 B */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-lg transition">
            <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white p-4 flex items-center justify-between">
              <div>
                <div className="text-xs opacity-80">房间 2 · 标间 B</div>
                <div className="font-bold text-lg">
                  {plan === 'a' ? '👵 奶奶 + 暄暄' : '👵 奶奶 + 姑姑 + 暄暄'}
                </div>
              </div>
              <div className="text-3xl">{plan === 'a' ? '👶' : '👧👶'}</div>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <i className="ri-hotel-bed-line text-rose-500" />
                <span>标准间 · 双床 · 无早</span>
              </div>
              <div className="bg-slate-50 rounded-lg p-3 text-xs text-slate-600 space-y-1.5">
                <div className="font-semibold text-slate-700 mb-1">📅 每晚安排</div>
                <Row left="4.29 · 4.30" right="奶奶 + 暄暄" rightCls="text-rose-600 font-medium" border />
                <Row
                  left="5.01 团聚夜"
                  right={plan === 'a' ? '爷爷 + 奶奶 + 暄暄' : '奶奶 + 姑姑 + 暄暄'}
                  rightCls="text-rose-600 font-medium"
                />
              </div>
              <div className="text-xs text-amber-600 flex items-center gap-1">
                <i className="ri-heart-fill" />
                <span>{plan === 'a' ? '最后一晚爷爷加入，祖孙三代挤一屋 🥰' : '姑姑帮忙照顾暄暄，奶奶也能歇一歇 💕'}</span>
              </div>
            </div>
          </div>

          {/* 房 3 榻榻米 */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-lg transition">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-4 flex items-center justify-between">
              <div>
                <div className="text-xs opacity-80">房间 3 · 榻榻米</div>
                <div className="font-bold text-lg">
                  {plan === 'a' ? '🏯 三姨奶 + 姑姑 + 2 哥哥' : '🏯 爷爷 + 三姨奶 + 2 哥哥'}
                </div>
              </div>
              <div className="text-3xl">{plan === 'a' ? '👵👧👦👦' : '👴👵👦👦'}</div>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <i className="ri-home-4-line text-amber-600" />
                <span>榻榻米大通铺 · 可睡 4 人</span>
              </div>
              <div className="bg-slate-50 rounded-lg p-3 text-xs text-slate-600 space-y-1.5">
                <div className="font-semibold text-slate-700 mb-1">📅 每晚安排</div>
                <Row left="4.29 · 4.30" right="—（未入住）" rightCls="text-slate-400" border />
                <Row
                  left="5.01 团聚夜"
                  right={plan === 'a' ? '三姨奶 + 姑姑 + 2 哥哥' : '爷爷 + 三姨奶 + 2 哥哥'}
                  rightCls="text-amber-600 font-medium"
                />
              </div>
              <div className={`text-xs flex items-center gap-1 ${plan === 'a' ? 'text-emerald-600' : 'text-sky-600'}`}>
                <i className={plan === 'a' ? 'ri-checkbox-circle-fill' : 'ri-gamepad-line'} />
                <span>{plan === 'a' ? '大通铺通 4 人刚好，热闹像夏令营' : '爷爷带着俩孙子，三姨奶作伴，其乐融融'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 横向汇总表 */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm mb-8 overflow-x-auto">
          <div className="min-w-[720px]">
            <div className="grid grid-cols-4 gap-3 text-xs font-semibold text-slate-500 mb-3">
              <div>房间 \ 日期</div>
              <div className="text-center">4.29 周三</div>
              <div className="text-center">4.30 周四</div>
              <div className="text-center">5.01 周五 · 团聚夜</div>
            </div>
            <div className="grid grid-cols-4 gap-3 items-center py-2 border-t border-slate-100">
              <div className="text-sm font-semibold text-sky-700">🛏️ 标间 A</div>
              <Cell cls="bg-sky-50 text-sky-700">爸爸 + 妈妈</Cell>
              <Cell cls="bg-sky-50 text-sky-700">爸爸 + 妈妈</Cell>
              <Cell cls="bg-sky-50 text-sky-700">爸爸 + 妈妈</Cell>
            </div>
            <div className="grid grid-cols-4 gap-3 items-center py-2 border-t border-slate-100">
              <div className="text-sm font-semibold text-rose-700">👵 标间 B</div>
              <Cell cls="bg-rose-50 text-rose-700">奶奶 + 暄暄</Cell>
              <Cell cls="bg-rose-50 text-rose-700">奶奶 + 暄暄</Cell>
              <Cell cls="bg-rose-100 text-rose-800 font-medium">{plan === 'a' ? '爷爷 + 奶奶 + 暄暄' : '奶奶 + 姑姑 + 暄暄'}</Cell>
            </div>
            <div className="grid grid-cols-4 gap-3 items-center py-2 border-t border-slate-100">
              <div className="text-sm font-semibold text-amber-700">🏯 榻榻米</div>
              <Cell cls="text-slate-300">—</Cell>
              <Cell cls="text-slate-300">—</Cell>
              <Cell cls="bg-amber-50 text-amber-800 font-medium">{plan === 'a' ? '三姨奶 + 姑姑 + 2 哥哥' : '爷爷 + 三姨奶 + 2 哥哥'}</Cell>
            </div>
          </div>
        </div>

        {/* 入住时间轴 */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <h4 className="font-bold mb-4 flex items-center gap-2">
            <i className="ri-calendar-check-line text-sky-600" />
            入住时间轴（4.29 - 5.02）
          </h4>
          <div className="overflow-x-auto">
            <div className="min-w-[640px]">
              <div className="grid grid-cols-4 gap-2 mb-3">
                <DateHead bg="bg-sky-50" border="border-sky-100" textCls="text-sky-700" weekday="周三" date="4.29" />
                <DateHead bg="bg-cyan-50" border="border-cyan-100" textCls="text-cyan-700" weekday="周四" date="4.30" />
                <DateHead bg="bg-emerald-50" border="border-emerald-100" textCls="text-emerald-700" weekday="周五·劳动节" date="5.01" />
                <DateHead bg="bg-amber-50" border="border-amber-100" textCls="text-amber-700" weekday="周六 · 退房" date="5.02" />
              </div>
              <div className="grid grid-cols-4 gap-2 mb-3 text-[10px] text-slate-400 text-center">
                <div>夜 1</div><div>夜 2</div><div>夜 3 · 团聚</div>
                <div className="text-amber-600 font-medium">12:00 离店</div>
              </div>

              <Bar dot="bg-sky-500" label="标间 A（爸爸 + 妈妈 · 连住 3 晚）"
                bar="left-[0.5%] right-[25.5%] bg-gradient-to-r from-sky-500 to-cyan-500"
                inner={<><i className="ri-moon-clear-fill mr-1" /> 连住 3 晚</>} />

              <div className="mb-2">
                <div className="text-xs text-slate-500 mb-1 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-rose-500" />
                  <span>标间 B（前 2 晚奶奶 + 暄暄 · 最后 1 晚爷奶 + 暄暄）</span>
                </div>
                <div className="h-10 bg-slate-50 rounded-lg relative overflow-hidden">
                  <div className="absolute top-1 bottom-1 left-[0.5%] right-[50.5%] bg-gradient-to-r from-rose-400 to-pink-400 rounded-l-md flex items-center justify-center text-white text-xs font-medium">
                    <i className="ri-moon-clear-fill mr-1" /> 奶奶 + 暄暄 · 2 晚
                  </div>
                  <div className="absolute top-1 bottom-1 left-[50%] right-[25.5%] bg-gradient-to-r from-rose-600 to-pink-600 rounded-r-md flex items-center justify-center text-white text-xs font-medium">
                    爷奶 + 宝 · 1 晚
                  </div>
                  <CheckoutBlock />
                </div>
              </div>

              <div>
                <div className="text-xs text-slate-500 mb-1 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-500" />
                  <span>{plan === 'a' ? '榻榻米房（三姨奶 + 姑姑 + 2 哥哥 · 仅团聚夜 1 晚）' : '榻榻米房（爷爷 + 三姨奶 + 2 哥哥 · 仅团聚夜 1 晚）'}</span>
                </div>
                <div className="h-10 bg-slate-50 rounded-lg relative overflow-hidden">
                  <div className="absolute top-1 bottom-1 left-[50%] right-[25.5%] bg-gradient-to-r from-amber-500 to-orange-500 rounded-md flex items-center justify-center text-white text-xs font-medium">
                    <i className="ri-moon-clear-fill mr-1" /> 1 晚
                  </div>
                  <CheckoutBlock />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-5 border-t border-slate-100 grid md:grid-cols-3 gap-3 text-sm">
            <Info icon="ri-time-line" iconClr="text-sky-600" title="入住时间" desc="14:00 之后办理 check-in" />
            <Info icon="ri-logout-box-r-line" iconClr="text-rose-500" title="退房时间" desc="次日 12:00 前离店" />
            <Info icon="ri-phone-line" iconClr="text-emerald-600" title="抵达前联系" desc="提前 1 小时电话确认" />
          </div>
        </div>

        {/* 温馨提醒 */}
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-3">
          <i className="ri-lightbulb-flash-fill text-2xl text-amber-500 flex-shrink-0" />
          <div className="text-sm text-amber-900">
            <b>💡 小提示：</b>前 2 晚——爸爸妈妈住标间 A，奶奶带暄暄住标间 B（奶奶带娃经验足、暄暄夜里好安抚）；
            5.1 爷爷、三姨奶、姑姑、2 位哥哥到齐后：<b>方案 A</b> — 爷爷加入奶奶暄暄房成为"祖孙三人间"，三姨奶 + 姑姑 + 2 位哥哥入住榻榻米大通铺；
            <b>方案 B</b>（如姑姑想陪暄暄）— 姑姑进入标间 B 陪奶奶和暄暄，爷爷则和三姨奶 + 2 位哥哥一起住榻榻米。
            预订时请跟前台沟通：<b>标间 B 加儿童围栏/小床</b>、<b>榻榻米房加 4 床被</b>、<b>3 间房尽量同层/相邻</b>，方便串门不折腾。
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- 局部子组件 ---------- */
function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="bg-white/15 backdrop-blur rounded-xl p-3">
      <div className="text-2xl font-black">{n}</div>
      <div className="text-xs opacity-80 mt-0.5">{label}</div>
    </div>
  )
}

function PlanBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg transition ${active ? 'bg-white shadow text-emerald-700' : 'text-slate-600 hover:text-slate-800'}`}
    >
      {children}
    </button>
  )
}

function Row({ left, right, rightCls, border }: { left: string; right: string; rightCls: string; border?: boolean }) {
  return (
    <div className={`flex justify-between items-center py-1 ${border ? 'border-b border-slate-100' : ''}`}>
      <span>{left}</span>
      <span className={rightCls}>{right}</span>
    </div>
  )
}

function Cell({ cls, children }: { cls: string; children: React.ReactNode }) {
  return <div className={`text-center text-xs rounded-lg py-2 ${cls}`}>{children}</div>
}

function DateHead({ bg, border, textCls, weekday, date }: { bg: string; border: string; textCls: string; weekday: string; date: string }) {
  return (
    <div className={`text-center p-2 rounded-lg ${bg} border ${border}`}>
      <div className="text-xs text-slate-500">{weekday}</div>
      <div className={`font-bold ${textCls}`}>{date}</div>
    </div>
  )
}

function Bar({ dot, label, bar, inner }: { dot: string; label: string; bar: string; inner: React.ReactNode }) {
  return (
    <div className="mb-2">
      <div className="text-xs text-slate-500 mb-1 flex items-center gap-2">
        <span className={`inline-block w-2 h-2 rounded-full ${dot}`} />
        <span>{label}</span>
      </div>
      <div className="h-10 bg-slate-50 rounded-lg relative overflow-hidden">
        <div className={`absolute top-1 bottom-1 ${bar} rounded-md flex items-center justify-center text-white text-xs font-medium`}>
          {inner}
        </div>
        <CheckoutBlock />
      </div>
    </div>
  )
}

function CheckoutBlock() {
  return (
    <div className="absolute top-1 bottom-1 right-[0.5%] w-[24%] border-2 border-dashed border-amber-400 bg-amber-50/60 rounded-md flex items-center justify-center text-amber-700 text-[11px] font-medium">
      <i className="ri-logout-box-r-line mr-1" /> 退房
    </div>
  )
}

function Info({ icon, iconClr, title, desc }: { icon: string; iconClr: string; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-2">
      <i className={`${icon} ${iconClr} mt-0.5`} />
      <div>
        <div className="font-semibold text-slate-700">{title}</div>
        <div className="text-xs text-slate-500">{desc}</div>
      </div>
    </div>
  )
}
