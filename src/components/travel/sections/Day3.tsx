/** Day 3 · 5.01 三代同堂 · 海边露营日 */
export default function Day3() {
  return (
    <section id="day3" className="py-12 bg-gradient-to-b from-emerald-50/50 to-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center text-2xl font-black shadow-lg shadow-emerald-200">03</div>
          <div>
            <div className="text-sm text-emerald-600 font-semibold">5月1日 · 星期五 · 劳动节</div>
            <h2 className="text-3xl font-black">三代同堂 · 海边露营日</h2>
          </div>
        </div>

        {/* 团聚时刻图 */}
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm mb-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium mb-3">
              <i className="ri-heart-2-fill" /> TODAY IS FAMILY DAY
            </div>
            <h3 className="text-2xl font-bold">盘锦家人们 → 北戴河集结</h3>
            <p className="text-sm text-slate-500 mt-1">爷爷 · 三姨奶 · 姑姑 · 2位哥哥 从盘锦自驾赶来相聚</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-center">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-rose-50 to-amber-50">
              <div className="text-5xl mb-3">👴👵👧👦👦</div>
              <div className="font-bold">盘锦出发</div>
              <div className="text-xs text-slate-500 mt-1">建议 08:00 出发</div>
              <div className="text-xs text-rose-600 mt-2">约 285 km · 3h20m</div>
            </div>
            <div className="flex items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <i className="ri-arrow-right-double-line text-4xl text-emerald-500 animate-pulse" />
                <div className="text-xs text-slate-500">丹锡高速 · 京哈高速</div>
              </div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-sky-50 to-emerald-50">
              <div className="text-5xl mb-3">👨‍👩‍👵👶</div>
              <div className="font-bold">北戴河等候</div>
              <div className="text-xs text-slate-500 mt-1">预计 11:30 汇合</div>
              <div className="text-xs text-emerald-600 mt-2">午餐海鲜大聚会</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Card from="09:00" to="11:30" dot="bg-emerald-500" ring="ring-emerald-100" icon="ri-walk-line" iconClr="text-emerald-600"
              title="悠闲等候 · 奥林匹克公园散步"
              desc="让暄暄睡到自然醒。早餐后去奥林匹克大道公园散步，放电一下，大人也能整理装备。随时与爷爷保持电话联系确认位置。" />

            <Card from="12:00" to="14:00" dot="bg-rose-500" ring="ring-rose-100" icon="ri-restaurant-fill" iconClr="text-rose-600"
              title="团圆海鲜午餐 🦐🦀"
              descNode={<>8人团聚第一餐！推荐提前预定 <b>南戴河渔岛渔村</b> 或 <b>北戴河海上渔鲜楼</b>（有包间，适合大家庭），点一桌地道海鲜，让爷爷和暄暄好好互动。</>}
              extra={<div className="bg-rose-50 rounded-lg p-3 text-xs text-rose-900">💡 建议提前打电话订包间，五一中午餐厅非常紧张</div>} />

            {/* 高光卡 */}
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg flex gap-4">
              <div className="flex-shrink-0 w-20 text-center">
                <div className="text-xs opacity-80">15:00</div>
                <div className="w-3 h-3 mx-auto my-1 rounded-full bg-white ring-4 ring-white/30" />
                <div className="text-xs opacity-80">20:00</div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <i className="ri-bear-smile-line text-2xl" />
                  <h3 className="font-bold text-lg">🎪 亲子露营高光时刻</h3>
                </div>
                <p className="text-sm opacity-95 mb-3">推荐前往 <b>北戴河浅水湾海巢露营地</b> 或 <b>屿海·寻野露营地</b>。海边支帐篷、烧烤、孩子们挖沙放风筝。两个哥哥带弟弟玩，爷爷奶奶坐营地椅唠嗑，最温馨的五一。</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white/20 rounded-lg p-2">⛺ 帐篷×2 / 天幕×1</div>
                  <div className="bg-white/20 rounded-lg p-2">🍖 烧烤架 + 炭</div>
                  <div className="bg-white/20 rounded-lg p-2">🪁 风筝 · 泡泡机</div>
                  <div className="bg-white/20 rounded-lg p-2">📸 全家福机位</div>
                </div>
                <div className="mt-3 bg-white/10 rounded-lg p-3 text-xs">
                  <b>🏖️ 推荐露营地对比</b>
                  <div className="mt-1">• <b>浅水湾海巢</b>：正海边，方便看日落，39.857, 119.527</div>
                  <div>• <b>屿海·寻野</b>：山海关附近，设施新，适合过夜</div>
                  <div>• <b>mansya漫山野</b>：度假风，适合不想自己搭帐的家庭</div>
                </div>
              </div>
            </div>

            <Card from="20:00" to="22:00" dot="bg-indigo-500" ring="ring-indigo-100" icon="ri-moon-foggy-line" iconClr="text-indigo-600"
              title="听浪数星星 · 分头住宿"
              desc="带2岁娃不建议真过夜露营（夜凉重），露营活动结束后各自回住所。爷爷姑姑哥哥们可订民宿附近的同一家酒店，方便第二天一起出发。" />
          </div>

          <div className="space-y-4">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm opacity-80">今日天气</span>
                <i className="ri-sun-cloudy-line text-2xl" />
              </div>
              <div className="text-3xl font-bold">22° / 12°</div>
              <div className="text-sm opacity-80 mt-1">多云 · 适合户外</div>
              <div className="mt-4 pt-4 border-t border-white/20 text-xs opacity-90">
                <i className="ri-windy-line" /> 海边风3级，搭帐记得下钉固定
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-100">
              <h4 className="font-bold mb-3 flex items-center gap-2"><i className="ri-team-line text-emerald-600" />团聚人员安排</h4>
              <div className="space-y-2 text-sm">
                {([
                  ['👨 爸爸 + 👩 妈妈', '自北京', 'bg-sky-50', 'text-sky-600'],
                  ['👵 奶奶', '自北京', 'bg-sky-50', 'text-sky-600'],
                  ['👶 2 岁的暄暄', '主角', 'bg-rose-50', 'text-rose-600'],
                  ['👴 爷爷', '自盘锦', 'bg-amber-50', 'text-amber-600'],
                  ['👵 三姨奶', '自盘锦', 'bg-amber-50', 'text-amber-600'],
                  ['👧 姑姑', '自盘锦', 'bg-amber-50', 'text-amber-600'],
                  ['👦 2位哥哥', '自盘锦', 'bg-amber-50', 'text-amber-600'],
                ] as const).map(([name, from, bgCls, textCls]) => (
                  <div key={name} className={`flex items-center justify-between p-2 rounded-lg ${bgCls}`}>
                    <span>{name}</span>
                    <span className={`text-xs ${textCls}`}>{from}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 font-bold text-indigo-800 mb-2"><i className="ri-tent-line" />露营装备</div>
              <ul className="text-sm text-indigo-900 space-y-1.5 list-disc list-inside">
                <li>防风帐篷 / 天幕 / 防潮垫</li>
                <li>卡式炉+小锅 / 烧烤架 / 炭</li>
                <li>暄暄厚外套 + 围巾（海风凉）</li>
                <li>露营椅×8把 / 折叠桌</li>
                <li>应急灯 / 头灯 / 暄暄安抚玩具</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Card({
  from, to, dot, ring, icon, iconClr, title, desc, descNode, extra,
}: {
  from: string; to: string; dot: string; ring: string
  icon: string; iconClr: string; title: string
  desc?: string; descNode?: React.ReactNode; extra?: React.ReactNode
}) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex gap-4">
      <div className="flex-shrink-0 w-20 text-center">
        <div className="text-xs text-slate-400">{from}</div>
        <div className={`w-3 h-3 mx-auto my-1 rounded-full ${dot} ring-4 ${ring}`} />
        <div className="text-xs text-slate-400">{to}</div>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <i className={`${icon} ${iconClr}`} />
          <h3 className="font-bold">{title}</h3>
        </div>
        {descNode ? <p className="text-sm text-slate-600 mb-2">{descNode}</p>
          : desc ? <p className="text-sm text-slate-600 mb-2">{desc}</p> : null}
        {extra}
      </div>
    </div>
  )
}
