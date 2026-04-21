/** 国庆路书 · 回顾感想区（代替五一版的 TipsChecklist）*/
export default function Reflections() {
  return (
    <>
      <section id="tips" className="py-12 bg-gradient-to-b from-slate-50 to-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="text-sm font-semibold text-rose-600 mb-2">TAKEAWAYS</div>
            <h2 className="text-3xl md:text-4xl font-black">写在行程之后</h2>
            <p className="text-slate-500 mt-2">带 1 岁半的娃跑完 11 天大环线 · 这些经验最值钱</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <Card iconBg="bg-rose-100 text-rose-600" icon="ri-train-fill" title="交通节奏" items={[
              '高铁 + 自驾混合模式最适合带娃：长途高铁省心，短途自驾灵活',
              '跨城驾驶单日不超过 3 小时，暄暄中午刚好能睡一觉',
              '宜尽量选下午出发的班次，错开她的清晨易哭点',
            ]} />
            <Card iconBg="bg-amber-100 text-amber-600" icon="ri-home-heart-fill" title="住宿选择" items={[
              '11 天 4 家酒店已是极限，再多就疲惫不堪',
              '如家 neo 连锁最稳定，和我家里的作息对得上',
              '古镇附近的酒店比景区内性价比高，走路也能进',
            ]} />
            <Card iconBg="bg-emerald-100 text-emerald-600" icon="ri-heart-3-fill" title="亲子收获" items={[
              '暄暄第一次坐高铁居然没哭 · 窗外的田野让她安静了整整 40 分钟',
              '婚礼现场她一点都不怕生，所有阿姨都想抱她',
              '11 天下来不仅没病，还晒出一脸小红扑扑的健康色',
            ]} />
          </div>

          <div className="bg-gradient-to-br from-rose-500 via-amber-500 to-sky-500 rounded-3xl p-8 md:p-12 text-white shadow-xl text-center">
            <div className="text-6xl mb-4">🚅🌾🎐</div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">致 1 岁半的暄暄</h3>
            <p className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto opacity-95">
              这是你人生中第一次真正意义上的长途旅行。<br />
              从帝都的高铁站到东台的喜宴、<br />
              从张家港的黄酒香到苏州园林的月亮门，<br />
              你可能还记不住那些地名，<br />
              但你会记住妈妈抱着你看长江、<br />
              爸爸牵着你走石板路、<br />
              阿姨叔叔给你塞水果糖的秋天。<br /><br />
              <b>江苏的秋天这么美，下次我们再来。</b>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

function Card({ icon, iconBg, title, items }: {
  icon: string; iconBg: string; title: string; items: string[]
}) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
      <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center text-2xl mb-4`}>
        <i className={icon} />
      </div>
      <h3 className="font-bold mb-3">{title}</h3>
      <ul className="text-sm text-slate-600 space-y-2">
        {items.map((it) => <li key={it} className="flex items-start gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 flex-shrink-0" />
          <span>{it}</span>
        </li>)}
      </ul>
    </div>
  )
}
