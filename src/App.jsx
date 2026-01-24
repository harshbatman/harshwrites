import React from 'react';
import { motion } from 'framer-motion';
import { Send, User } from 'lucide-react';
import './index.css';

function App() {
  return (
    <div className="app">
      <header>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href="/" className="site-logo">HarshWrites</a>
          <nav>
            {/* Simple nav could go here */}
          </nav>
        </div>
      </header>

      <main className="container">
        <article>
          <motion.header
            className="story-header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="story-meta">Technology & Geopolitics</div>
            <h1 className="story-title">Globalisation, Tech Power, and the Lessons America Taught the World</h1>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#6b7280' }}>
              <User size={16} /> <span>Harsh Mahto</span>
            </div>
          </motion.header>

          <motion.div
            className="story-image-container"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img src="/story1.png" alt="Global leaders collage" style={{ width: '100%', display: 'block' }} />
          </motion.div>

          <motion.div
            className="story-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p><span className="drop-cap">I</span>t started as an efficiency upgrade. It ended as a strategic liability.</p>

            <p>For nearly three decades, the global technology industry ran on a deceptively simple idea: separate thinking from making. The United States would lead in research, design, and software, while manufacturing would move to wherever labour and inputs were cheapest. On balance sheets, the logic was flawless. Costs fell. Profits rose. Consumers won.</p>

            <p><strong>But technology doesn’t reward separation forever.</strong></p>

            <p>Over time, manufacturing stopped being a back-end function and became a source of power. The act of building chips, devices, and components created dense ecosystems of suppliers, engineers, tooling expertise, and process knowledge. Once these ecosystems moved offshore, innovation followed. Design without manufacturing turned out to be slower, weaker, and dangerously dependent.</p>

            <p>Factories don’t just produce goods. They produce leverage.</p>

            <p>China understood this early. While American firms optimised for quarterly earnings and platform dominance, China invested heavily in physical infrastructure — semiconductor fabs, electronics assembly, logistics networks, and materials processing. These weren’t accidents of the market. They were deliberate, state-backed strategies designed to control entire technology value chains.</p>

            <p>One side chased margins. The other chased control.</p>

            <p>The weakness in America’s approach became impossible to ignore when semiconductors emerged as the backbone of the digital economy. Chips power cloud data centres, artificial intelligence, autonomous systems, automobiles, and modern weapons. What once looked like a supply-chain optimisation problem suddenly became a national security issue.</p>

            <p><strong>In the digital age, access beats affordability.</strong></p>

            <p>The pandemic didn’t create this vulnerability. It exposed it. Factory shutdowns thousands of kilometres away stalled production lines at home. Just-in-time supply chains, engineered to eliminate waste, collapsed under stress. The system had no shock absorbers because resilience was treated as inefficiency.</p>

            <p>Efficiency saved money. Resilience was never priced in.</p>

            <p>Globalisation didn’t fail because trade is flawed. It failed because it was applied without guardrails to technologies that underpin national power. Markets excel at minimising costs, but they are indifferent to security, redundancy, and geopolitical risk.</p>

            <p>Markets chase profit. Nations chase survival.</p>

            <p>The response is already visible. Governments are subsidising chip manufacturing, restricting exports, and redesigning supply chains around trust rather than price. This isn’t the end of globalisation. It’s a correction — a recognition that some technologies are too important to outsource entirely.</p>

            <p>Globalisation isn’t ending. Blind globalisation is.</p>

            <hr style={{ margin: '3rem 0', border: 0, borderTop: '1px solid #e5e7eb' }} />

            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '1.5rem' }}>And then there’s India.</h3>

            <p>India watched the experiment fail — and took notes.</p>

            <p>For years, India existed on the periphery of global tech manufacturing. It exported software, talent, and services while observing what happened when a country surrendered physical production in exchange for efficiency. America provided a real-world case study of what not to do.</p>

            <p><strong>Software dominance without hardware depth creates dependence.</strong></p>

            <p>India realised that repeating the same playbook would lock it into long-term vulnerability. So instead of chasing the cheapest supply chains, it chose a slower, messier, but more deliberate path. Strategic sectors — semiconductors, electronics assembly, defence manufacturing, and digital infrastructure — became policy priorities.</p>

            <p>The goal wasn’t dominance. It was optionality.</p>

            <p>Where America trusted markets to self-correct, India leaned on state-backed nudges — production-linked incentives, domestic procurement, and long-term policy signals. These moves weren’t about isolation. They were about learning from a system that broke under pressure.</p>

            <p>Efficiency is optional. Dependence is not.</p>

            <p>India also absorbed another lesson America learned too late: manufacturing capability compounds. Once ecosystems form, they attract suppliers, skills, and capital. Miss that window, and you spend decades trying to buy it back.</p>

            <p>You can’t leapfrog what you don’t control.</p>

            <p>India may not lead in cutting-edge chip nodes today, but it is positioning itself across design talent, packaging, assembly, and trusted supply chains — the unglamorous layers that quietly determine resilience.</p>

            <p>Control the boring parts, and the future follows.</p>

            <p>America showed the world that innovation alone is no longer enough. In a tech-driven global order, leadership belongs to those who control both ideas and the infrastructure that turns them into reality.</p>

            <p><strong>In modern technology, whoever controls the stack controls the future.</strong></p>

            <p>And this time, India doesn’t want to be watching from the sidelines.</p>
          </motion.div>
        </article>

        <section style={{ marginTop: '5rem', marginBottom: '5rem', padding: '3rem', backgroundColor: '#f9fafb', borderRadius: '1rem', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>Enjoyed reading?</h3>
          <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Subscribe to get my latest stories directly in your inbox.</p>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', maxWidth: '400px', margin: '0 auto' }}>
            <input
              type="email"
              placeholder="Enter your email"
              style={{ flex: 1, padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db' }}
            />
            <button style={{ padding: '0.75rem 1.5rem', backgroundColor: '#1a1a1a', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Subscribe <Send size={16} />
            </button>
          </div>
        </section>
      </main>

      <footer style={{ borderTop: '1px solid #e5e7eb', padding: '3rem 0', textAlign: 'center', color: '#6b7280' }}>
        <p>&copy; {new Date().getFullYear()} HarshWrites. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
