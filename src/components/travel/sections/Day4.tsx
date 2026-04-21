/** Day 4 · 5.02 北戴河惜别 · 夜归盘锦 */
export default function Day4() {
  return (
    <section id="day4" className="py-12 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-rose-500 text-white flex items-center justify-center text-2xl font-black shadow-lg shadow-amber-200">04</div>
          <div>
            <div className="text-sm text-amber-600 font-semibold">5月2日 · 星期六</div>
            <h2 className="text-3xl font-black">北戴河惜别 · 夜归盘锦</h2>
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-rose-50 border border-amber-200 rounded-2xl p-5 mb-6 flex items-start gap-3">
          <i className="ri-lightbulb-flash-fill text-2xl text-amber-500" />
          <div className="flex-1">
            <div className="font-bold text-amber-900 mb-1">⏰ 今日节奏策略</div>
            <p className="text-sm text-amber-900">
              考虑到家在盘锦，不必赶景点，全天在<b>北戴河轻松游玩</b>。
              <b className="text-rose-600">晚餐安排在北戴河吃</b>（海鲜新鲜地道 + 暄暄吃完在车上睡觉接觉，不用饿着赶路），
              饭后自驾约 3h 到盘锦家中，直接洗漱休息，还车放到次日或晚间就近完成。
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Card from="08:00" to="09:30" dot="bg-amber-500" ring="ring-amber-100" icon="ri-sun-foggy-line" iconClr="text-amber-600"
              title="悠闲早餐 · 全家一起"
              descNode={<>睡到自然醒，8 人一起吃顿热闹早餐。推荐 <b>四条包子铺</b> 或 <b>秦皇小吃</b>，海鲜馅饺子、小米粥、鸡蛋糕，暄暄和奶奶都能吃好。</>} />

            <Card from="10:00" to="12:00" dot="bg-cyan-500" ring="ring-cyan-100" icon="ri-landscape-line" iconClr="text-cyan-600"
              title="上午：阿那亚 / 南戴河 三选一"
              desc="根据天气和暄暄状态选一个即可，不求多："
              extra={
                <div className="space-y-2 text-xs">
                  <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-3">
                    <b className="text-cyan-700">🏛️ 阿那亚（推荐）</b>：孤独的图书馆、礼堂海边，适合拍全家福。哥哥们也会喜欢。车程约30分钟。
                  </div>
                  <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-3">
                    <b className="text-cyan-700">🐚 南戴河海滨</b>：比北戴河人少、沙滩更干净，暄暄继续挖沙放风筝，大家吹海风。
                  </div>
                  <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-3">
                    <b className="text-cyan-700">🌳 奥林匹克大道公园</b>：市区内，腿脚累的话就这里，暄暄跑跑跳跳，奶奶逛逛。
                  </div>
                </div>
              } />

            <Card from="12:30" to="14:30" dot="bg-rose-500" ring="ring-rose-100" icon="ri-restaurant-line" iconClr="text-rose-600"
              title="午餐 · 暄暄午睡"
              desc="就近简单午餐（饺子/砂锅/面食），不搞大餐省着晚餐胃口。回民宿让暄暄和奶奶午休 1-1.5 小时，大人顺便打包行李。" />

            <Card from="14:30" to="16:30" dot="bg-emerald-500" ring="ring-emerald-100" icon="ri-gift-line" iconClr="text-emerald-600"
              title="退房 · 特产采买 · 装车"
              descNode={<>办理退房，去 <b>北戴河海鲜市场</b> 或 <b>四道桥市场</b> 给家里带点干海货（虾皮、干贝、海米）。装车、固定儿童座椅、加满油。</>}
              extra={<div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-xs text-emerald-900">💡 活海鲜不好带，建议买干货；大米饭就回盘锦吃家里的</div>} />

            {/* 重点：晚餐高光卡 */}
            <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl p-6 text-white shadow-lg flex gap-4">
              <div className="flex-shrink-0 w-20 text-center">
                <div className="text-xs opacity-80">16:30</div>
                <div className="w-3 h-3 mx-auto my-1 rounded-full bg-white ring-4 ring-white/30" />
                <div className="text-xs opacity-80">18:00</div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <i className="ri-restaurant-fill text-2xl" />
                  <h3 className="font-bold text-lg">🦀 告别晚餐 · 在北戴河吃</h3>
                  <span className="ml-auto text-xs bg-white/25 px-2 py-0.5 rounded">建议</span>
                </div>
                <p className="text-sm opacity-95 mb-3">在北戴河吃最后一顿海鲜大餐！<b>早点开饭（16:30）避开五一返程高峰</b>，吃完出发刚好暄暄犯困睡车上。</p>
                <div className="grid md:grid-cols-2 gap-2 text-xs mb-3">
                  <div className="bg-white/20 rounded-lg p-2">🦐 皮皮虾·梭子蟹</div>
                  <div className="bg-white/20 rounded-lg p-2">🐟 家常炖海鱼</div>
                  <div className="bg-white/20 rounded-lg p-2">🥬 时蔬小炒</div>
                  <div className="bg-white/20 rounded-lg p-2">🍚 白米粥/面条（娃）</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 text-xs">
                  <b>🍽️ 推荐餐厅</b>
                  <div className="mt-1">• <b>老巷子家常菜</b>：老字号，价格公道</div>
                  <div>• <b>北戴河渔家院</b>：本地人推荐，有包间</div>
                  <div>• <b>刘莉家海鲜</b>：新鲜看得见，适合家庭</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex gap-4">
              <div className="flex-shrink-0 w-20 text-center">
                <div className="text-xs text-slate-400">18:00</div>
                <div className="w-3 h-3 mx-auto my-1 rounded-full bg-sky-500 ring-4 ring-sky-100" />
                <div className="text-xs text-slate-400">21:00</div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <i className="ri-road-map-line text-sky-600" />
                  <h3 className="font-bold">返程自驾 · 北戴河 → 盘锦家</h3>
                  <span className="text-xs text-slate-400 ml-auto">约 284 km · 3h</span>
                </div>
                <p className="text-sm text-slate-600 mb-2">京哈高速 → 丹锡高速直达盘锦。暄暄吃饱喝足正好犯困，很可能全程接觉。与爷爷车队前后呼应，中途<b>绥中服务区</b>休息一次。</p>
                <div className="bg-sky-50 rounded-lg p-3 text-xs text-sky-900">
                  🚗 五一返程高峰通常集中在18-20点，提前出发错峰<br />
                  🌙 21点左右到家，把暄暄直接抱上床，完美收官
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex gap-4">
              <div className="flex-shrink-0 w-20 text-center">
                <div className="text-xs text-slate-400">次日</div>
                <div className="w-3 h-3 mx-auto my-1 rounded-full bg-slate-500 ring-4 ring-slate-100" />
                <div className="text-xs text-slate-400">上午</div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <i className="ri-key-2-line text-slate-600" />
                  <h3 className="font-bold">盘锦门店还车</h3>
                </div>
                <p className="text-sm text-slate-600">因为 21 点到家已较晚，建议还车放到次日上午在盘锦站门店完成（租车订单记得选5月3日还）。还车前加满油、清理车内、拍照存证。</p>
                <div className="mt-2 flex flex-wrap gap-2 text-xs">
                  <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-700">⛽ 就近加满油</span>
                  <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-700">📸 四角+里程拍照</span>
                  <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-700">🧹 座椅检查</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gradient-to-br from-amber-500 to-rose-500 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm opacity-80">北戴河天气</span>
                <i className="ri-sun-line text-2xl" />
              </div>
              <div className="text-3xl font-bold">21° / 11°</div>
              <div className="text-sm opacity-80 mt-1">晴转多云 · 西南风</div>
              <div className="mt-4 pt-4 border-t border-white/20 text-xs opacity-90">
                <i className="ri-sun-fill" /> 上午阳光好，适合拍全家福
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-100">
              <h4 className="font-bold mb-3 flex items-center gap-2"><i className="ri-restaurant-2-line text-rose-600" />晚餐决策对比</h4>
              <div className="space-y-3 text-sm">
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200">
                  <div className="flex items-center gap-2 font-bold text-rose-700 mb-1">
                    <i className="ri-checkbox-circle-fill" /> 北戴河吃
                  </div>
                  <div className="text-xs text-rose-900">海鲜正宗 · 暄暄车上睡 · 错峰出行</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 opacity-60">
                  <div className="flex items-center gap-2 font-bold text-slate-500 mb-1">
                    <i className="ri-close-circle-line" /> 服务区吃
                  </div>
                  <div className="text-xs text-slate-500">不推荐 · 餐食差</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 opacity-60">
                  <div className="flex items-center gap-2 font-bold text-slate-500 mb-1">
                    <i className="ri-close-circle-line" /> 到盘锦吃
                  </div>
                  <div className="text-xs text-slate-500">赶路饿肚子 · 暄暄易闹</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-100">
              <h4 className="font-bold mb-3 flex items-center gap-2"><i className="ri-map-pin-time-line text-amber-600" />返程路线</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-sky-500" /><span>北戴河（16:30 晚餐后）</span></div>
                <div className="ml-1 pl-4 border-l-2 border-dashed border-slate-200 text-xs text-slate-500 py-1">京哈·丹锡高速</div>
                <div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-slate-400" /><span>绥中服务区（休息15分）</span></div>
                <div className="ml-1 pl-4 border-l-2 border-dashed border-slate-200 text-xs text-slate-500 py-1">丹锡高速</div>
                <div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-amber-600" /><span>盘锦·爷爷家（21:00）</span></div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
                <div><div className="text-lg font-bold text-amber-600">284</div><div className="text-xs text-slate-500">公里</div></div>
                <div><div className="text-lg font-bold text-amber-600">3h</div><div className="text-xs text-slate-500">车程</div></div>
                <div><div className="text-lg font-bold text-amber-600">¥133</div><div className="text-xs text-slate-500">过路费</div></div>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 font-bold text-emerald-800 mb-2"><i className="ri-checkbox-circle-line" />出发前 checklist</div>
              <ul className="text-sm text-emerald-900 space-y-1.5 list-disc list-inside">
                <li>退房前检查床底/抽屉</li>
                <li>暄暄奶瓶·尿不湿上车</li>
                <li>加满油箱（就近加油站）</li>
                <li>儿童座椅二次固定</li>
                <li>海鲜干货密封防串味</li>
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
