import { useState, useEffect } from 'react'

function LandingPage({ onGetStarted }) {
  const [showMockCard, setShowMockCard] = useState(window.innerWidth >= 1100)

  useEffect(() => {
    const handleResize = () => setShowMockCard(window.innerWidth >= 1100)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const MockCard = () => (
    <div style={{
      position: 'absolute',
      right: '60px',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '340px',
      pointerEvents: 'none',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    }}>
      <div style={{background:'#111',border:'1px solid #222',borderRadius:'14px',padding:'20px 22px',boxShadow:'0 24px 60px rgba(0,0,0,0.6)'}}>
        <div style={{fontSize:'0.6rem',fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'#FF6B35',marginBottom:'10px'}}>Question 2 of 5</div>
        <div style={{background:'#0C0C0C',border:'1px solid #1E1E1E',borderRadius:'10px',padding:'14px',fontSize:'0.82rem',color:'#CCC',lineHeight:1.6,marginBottom:'14px'}}>
          Design a rate limiter for an API that handles 10 million requests per day. What data structure would you use?
        </div>
        <div style={{background:'#0C0C0C',border:'1px solid #1E1E1E',borderRadius:'10px',padding:'10px 14px',fontSize:'0.78rem',color:'#555'}}>
          Type your answer here...
        </div>
        <div style={{marginTop:'12px',background:'#FF6B35',borderRadius:'8px',padding:'9px',textAlign:'center',fontSize:'0.8rem',fontWeight:700,color:'white'}}>
          Submit Answer
        </div>
      </div>
      <div style={{background:'#111',border:'1px solid #222',borderRadius:'14px',padding:'18px 22px',boxShadow:'0 24px 60px rgba(0,0,0,0.5)',display:'flex',alignItems:'center',gap:'16px'}}>
        <div style={{fontSize:'2.8rem',fontWeight:950,color:'#FF6B35',letterSpacing:'-0.05em',lineHeight:1,minWidth:'60px'}}>8<span style={{fontSize:'1.2rem',color:'#333'}}>/10</span></div>
        <div>
          <div style={{fontSize:'0.78rem',fontWeight:700,color:'#EEE',marginBottom:'4px'}}>Strong answer</div>
          <div style={{fontSize:'0.72rem',color:'#555',lineHeight:1.5}}>Good use of Redis. Mention token bucket algorithm next time.</div>
        </div>
      </div>
      <div style={{background:'#111',border:'1px solid #222',borderRadius:'14px',padding:'16px 22px',boxShadow:'0 24px 60px rgba(0,0,0,0.4)'}}>
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:'8px'}}>
          <span style={{fontSize:'0.72rem',color:'#555',fontWeight:600}}>Session progress</span>
          <span style={{fontSize:'0.72rem',color:'#FF6B35',fontWeight:700}}>2/5 done</span>
        </div>
        <div style={{background:'#1A1A1A',borderRadius:'99px',height:'4px',overflow:'hidden'}}>
          <div style={{width:'40%',height:'4px',background:'#FF6B35',borderRadius:'99px'}}/>
        </div>
        <div style={{display:'flex',gap:'8px',marginTop:'12px'}}>
          {[8,7,null,null,null].map((score,i)=>(
            <div key={i} style={{flex:1,height:'32px',borderRadius:'6px',background:score?'rgba(255,107,53,0.12)':'#0C0C0C',border:`1px solid ${score?'rgba(255,107,53,0.25)':'#1A1A1A'}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.72rem',fontWeight:700,color:score?'#FF6B35':'#2A2A2A'}}>
              {score||'—'}
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="landing">
      <div style={{position:'fixed',inset:0,backgroundImage:'radial-gradient(circle, #222 1px, transparent 1px)',backgroundSize:'28px 28px',opacity:0.4,pointerEvents:'none',zIndex:0}}/>

      <nav className="navbar" style={{zIndex:999}}>
        <div className="nav-logo">Prep<span>AI</span></div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#how">How it works</a>
          <button className="btn-nav" onClick={onGetStarted}>Get Started</button>
        </div>
      </nav>

      <section className="hero" style={{textAlign:'left',alignItems:'flex-start',position:'relative',zIndex:1}}>
        <div className="hero-glow"/>
        <div className="hero-badge">
          <span className="badge-dot"/>
          Built for placement season
        </div>
        <h1 className="hero-title">
          Your interview is closer<br/>
          <span className="line2">than you think.</span>
        </h1>
        <p className="hero-desc">
          Most candidates walk into interviews underprepared.
          PrepAI fixes that — paste any job description, get 5 hard
          questions tailored to that exact role, answer them, and get
          an honest score with real feedback.
        </p>
        <div className="hero-cta" style={{justifyContent:'flex-start'}}>
          <button className="btn-hero" onClick={onGetStarted}>
            Start your mock interview →
          </button>
          <button className="btn-hero-ghost" onClick={()=>document.getElementById('how').scrollIntoView({behavior:'smooth'})}>
            See how it works
          </button>
        </div>
        <div className="hero-metrics">
          <div className="metric"><span className="metric-val">5<span>x</span></span><span className="metric-label">Questions per role</span></div>
          <div className="metric"><span className="metric-val">&lt;10<span>s</span></span><span className="metric-label">To get feedback</span></div>
          <div className="metric"><span className="metric-val">AI</span><span className="metric-label">Scores every answer</span></div>
          <div className="metric"><span className="metric-val">∞</span><span className="metric-label">Sessions, free</span></div>
        </div>
        {showMockCard && <MockCard/>}
      </section>

      <div className="proof-bar" style={{position:'relative',zIndex:1}}>
        <span className="proof-label">Used to prep for</span>
        <div className="proof-companies">
          {['Google','Amazon','Microsoft','Flipkart','Adobe','Atlassian','Zomato','Swiggy','Razorpay','Freshworks'].map(c=>(
            <span key={c} className="proof-company">{c}</span>
          ))}
        </div>
      </div>

      <section className="features" id="features" style={{position:'relative',zIndex:1}}>
        <div className="section-label">Why PrepAI</div>
        <h2 className="section-title">Not flashcards.<br/>Not YouTube videos.</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon"><svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="10" stroke="#FF6B35" strokeWidth="1.5"/><circle cx="11" cy="11" r="4" fill="#FF6B35" opacity="0.2"/><circle cx="11" cy="11" r="1.5" fill="#FF6B35"/><line x1="11" y1="1" x2="11" y2="5" stroke="#FF6B35" strokeWidth="1.5" strokeLinecap="round"/><line x1="11" y1="17" x2="11" y2="21" stroke="#FF6B35" strokeWidth="1.5" strokeLinecap="round"/><line x1="1" y1="11" x2="5" y2="11" stroke="#FF6B35" strokeWidth="1.5" strokeLinecap="round"/><line x1="17" y1="11" x2="21" y2="11" stroke="#FF6B35" strokeWidth="1.5" strokeLinecap="round"/></svg></span>
            <h3>Questions built for your JD</h3>
            <p>Gemini reads the actual job description and generates questions that match that specific role, stack, and company level.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon"><svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 2L13.5 8.5H20.5L14.5 12.5L17 19L11 15L5 19L7.5 12.5L1.5 8.5H8.5L11 2Z" stroke="#FF6B35" strokeWidth="1.5" strokeLinejoin="round"/></svg></span>
            <h3>Feedback that doesn't sugarcoat</h3>
            <p>Every answer scored 1–10 with specific notes on what landed and what would have cost you the offer.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon"><svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="2" y="14" width="4" height="7" rx="1" fill="#FF6B35" opacity="0.3" stroke="#FF6B35" strokeWidth="1.5"/><rect x="9" y="9" width="4" height="12" rx="1" fill="#FF6B35" opacity="0.3" stroke="#FF6B35" strokeWidth="1.5"/><rect x="16" y="4" width="4" height="17" rx="1" fill="#FF6B35" opacity="0.3" stroke="#FF6B35" strokeWidth="1.5"/></svg></span>
            <h3>Every session saved</h3>
            <p>All interviews stored. Come back, review your past answers, and watch your scores climb over time.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon"><svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="2" y="2" width="8" height="8" rx="2" stroke="#FF6B35" strokeWidth="1.5"/><rect x="12" y="2" width="8" height="8" rx="2" stroke="#FF6B35" strokeWidth="1.5" opacity="0.5"/><rect x="2" y="12" width="8" height="8" rx="2" stroke="#FF6B35" strokeWidth="1.5" opacity="0.5"/><rect x="12" y="12" width="8" height="8" rx="2" stroke="#FF6B35" strokeWidth="1.5" opacity="0.3"/></svg></span>
            <h3>Any role, any company</h3>
            <p>SDE, backend, fullstack, data engineer — paste any JD from LinkedIn, Naukri, or anywhere.</p>
          </div>
        </div>
      </section>

      <section className="how" id="how" style={{position:'relative',zIndex:1}}>
        <div className="section-label">How it works</div>
        <h2 className="section-title">Three steps.<br/>No setup.</h2>
        <div className="steps">
          <div className="step">
            <div className="step-num">01</div>
            <h3>Paste the job description</h3>
            <p>Copy any posting from LinkedIn or Naukri. Paste it in. No configuration, no topic selection.</p>
          </div>
          <div className="step-arrow"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
          <div className="step">
            <div className="step-num">02</div>
            <h3>Get 5 targeted questions</h3>
            <p>Gemini reads the JD and generates 5 hard, role-specific technical questions. Not generic. Built for that exact role.</p>
          </div>
          <div className="step-arrow"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
          <div className="step">
            <div className="step-num">03</div>
            <h3>Answer and get your score</h3>
            <p>Type your answer. Score out of 10, what you did well, exactly what to improve. All in under 10 seconds.</p>
          </div>
        </div>
      </section>

      <section className="cta" style={{position:'relative',zIndex:1}}>
        <div className="cta-glow"/>
        <h2>Your next interview<br/>won't wait.</h2>
        <p>Neither should your prep. Start a mock interview right now — no account, no setup, completely free.</p>
        <button className="btn-primary-lg" onClick={onGetStarted}>Start practicing free →</button>
      </section>

      <footer className="footer" style={{position:'relative',zIndex:1}}>
        <div className="footer-top">
          <div className="footer-brand">
            <div className="nav-logo" style={{fontSize:'1.2rem',marginBottom:'8px'}}>Prep<span>AI</span></div>
            <p className="footer-tagline">Practice interviews. Get placed.</p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <div className="footer-col-title">Product</div>
              <a href="#features">Features</a>
              <a href="#how">How it works</a>
              <a href="#" onClick={onGetStarted}>Start practicing</a>
            </div>
            <div className="footer-col">
              <div className="footer-col-title">Prepare for</div>
              <a href="#">SDE roles</a>
              <a href="#">Backend engineer</a>
              <a href="#">System design</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 PrepAI. All rights reserved.</span>
          <span>Made for placement season 🎯</span>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage