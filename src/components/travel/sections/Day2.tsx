/** Day 2 · 4.30 鸽子窝看日出 · 老虎石戏浪 */
export default function Day2() {
  return (
    <section id="day2" className="py-12 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-600 text-white flex items-center justify-center text-2xl font-black shadow-lg shadow-cyan-200">02</div>
          <div>
            <div className="text-sm text-cyan-600 font-semibold">4月30日 · 星期四</div>
            <h2 className="text-3xl font-black">鸽子窝看日出 · 老虎石戏浪</h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Card from="05:00" to="07:30" dot="bg-amber-500" ring="ring-amber-100" icon="ri-sun-line" iconClr="text-amber-500"
              title="鸽子窝公园看日出（可选·由爸爸完成）"
              desc="考虑到2 岁的暄暄睡眠规律，建议妈妈和奶奶陪暄暄睡到自然醒，爸爸独自去鸽子窝看日出（北戴河必打卡）。4月底约 05:10 日出。"
              extra={<div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-900">🕊️ 鸽子窝公园门票：25元 · 停车便利 · 鹰角亭是最佳机位</div>} />

            <Card from="08:30" to="11:30" dot="bg-cyan-500" ring="ring-cyan-100" icon="ri-restaurant-line" iconClr="text-cyan-600"
              title="早餐 + 老虎石海上公园"
              descNode={<>就近喝白粥 / 海鲜面，再前往<b>老虎石海上公园</b>（北戴河最热门沙滩）。沙滩细腻，适合暄暄挖沙。五一前海水还凉，不建议下水，以玩沙、踩浪花为主。</>}
              tags={[
                { text: '🪣 挖沙小桶', clr: 'bg-cyan-50 text-cyan-700' },
                { text: '🧴 儿童防晒霜', clr: 'bg-cyan-50 text-cyan-700' },
                { text: '👒 宽檐遮阳帽', clr: 'bg-cyan-50 text-cyan-700' },
                { text: '🦀 沙滩寻宝', clr: 'bg-cyan-50 text-cyan-700' },
              ]} />

            <Card from="12:00" to="14:30" dot="bg-rose-500" ring="ring-rose-100" icon="ri-cup-line" iconClr="text-rose-600"
              title="午餐 + 午睡"
              descNode={<>碧螺塔啤酒广场附近的<b>李记海鲜坊</b> 或<b>老码头海鲜市场</b>，自选海鲜加工。吃完回民宿，暄暄一定要睡个踏实午觉，奶奶和爸妈也能休整。</>} />

            <Card from="15:00" to="17:30" dot="bg-emerald-500" ring="ring-emerald-100" icon="ri-plant-line" iconClr="text-emerald-600"
              title="集发生态农业观光园（带娃首推）"
              desc="距离民宿约15分钟车程。超级适合2岁娃：可以喂小动物（羊/兔/鸭）、看蔬菜瓜果、玩稻草人。比海边更柔和的亲子体验，奶奶也能走走看看。"
              extra={<div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-xs text-emerald-900">🐑 门票约 60 元 · 儿童 1.2m 以下免费 · 园内有母婴室</div>} />

            <Card from="18:00" to="21:00" dot="bg-indigo-500" ring="ring-indigo-100" icon="ri-restaurant-2-line" iconClr="text-indigo-600"
              title="晚餐 · 碧螺塔酒吧公园（可选）"
              desc="回市区吃饺子、烤冷面等轻食。饭后若暄暄状态好，可带去碧螺塔公园外围看夜景（人多不进园）。早些回住处洗澡休息，为明天接驾做准备。" />
          </div>

          <div className="space-y-4">
            <div className="bg-gradient-to-br from-cyan-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm opacity-80">今日天气</span>
                <i className="ri-sun-line text-2xl" />
              </div>
              <div className="text-3xl font-bold">19° / 11°</div>
              <div className="text-sm opacity-80 mt-1">晴 · 海风2-3级</div>
              <div className="mt-4 pt-4 border-t border-white/20 text-xs opacity-90">
                <i className="ri-sun-fill" /> 紫外线强，暄暄防晒别省
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-100">
              <h4 className="font-bold mb-3 flex items-center gap-2"><i className="ri-compass-3-line text-cyan-600" />今日地标</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2"><span className="text-amber-500">🌅</span><div><b>鸽子窝公园</b><div className="text-xs text-slate-500">日出胜地 · 39.848, 119.534</div></div></li>
                <li className="flex items-start gap-2"><span>🐅</span><div><b>老虎石海上公园</b><div className="text-xs text-slate-500">细沙海滩 · 门票25元</div></div></li>
                <li className="flex items-start gap-2"><span>🌻</span><div><b>集发生态园</b><div className="text-xs text-slate-500">亲子首推 · 喂小动物</div></div></li>
                <li className="flex items-start gap-2"><span>🗼</span><div><b>碧螺塔公园</b><div className="text-xs text-slate-500">夜景拍照 · 可选</div></div></li>
              </ul>
            </div>

            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 font-bold text-rose-800 mb-2"><i className="ri-parent-line" />奶奶贴心</div>
              <ul className="text-sm text-rose-900 space-y-1.5 list-disc list-inside">
                <li>早上让奶奶睡到自然醒，一起吃早餐</li>
                <li>老虎石沙滩有台阶，提前准备好走的鞋</li>
                <li>午后温度最高，奶奶可回房休息，不必全程陪</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

type Tag = { text: string; clr: string }

function Card({
  from, to, dot, ring, icon, iconClr, title, desc, descNode, tags, extra,
}: {
  from: string; to: string; dot: string; ring: string
  icon: string; iconClr: string; title: string
  desc?: string; descNode?: React.ReactNode; tags?: Tag[]; extra?: React.ReactNode
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
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 text-xs">
            {tags.map((t) => (
              <span key={t.text} className={`px-2 py-1 rounded-md ${t.clr}`}>{t.text}</span>
            ))}
          </div>
        )}
        {extra}
      </div>
    </div>
  )
}
