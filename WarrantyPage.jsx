"use client";

import { useState, useEffect } from "react";

const PLANS = {
  A: { label: "Plan A", color: "#6b7280", accentColor: "#9ca3af", qualification: "Any vehicle regardless of age and distance travelled", maxAge: Infinity, maxKm: Infinity },
  B: { label: "Plan B", color: "#3b82f6", accentColor: "#60a5fa", qualification: "Vehicles 20 years and under, less than 280,000 km", maxAge: 20, maxKm: 280000 },
  C: { label: "Plan C", color: "#8b5cf6", accentColor: "#a78bfa", qualification: "Vehicles 15 years and under, less than 200,000 km", maxAge: 15, maxKm: 200000 },
  D: { label: "Plan D", color: "#f59e0b", accentColor: "#fbbf24", qualification: "Vehicles 10 years and under, less than 160,000 km", maxAge: 10, maxKm: 160000 },
  E: { label: "Plan E", color: "#10b981", accentColor: "#34d399", qualification: "Vehicles 8 years and under, less than 120,000 km", maxAge: 8, maxKm: 120000 },
};

const PRICES = {
  12: { A: 870, B: 1155, C: 1485, D: 2100, E: 2685 },
  36: { A: 1290, B: 1485, C: 2085, D: 2490, E: 3150 },
  60: { A: 1620, B: 1785, C: 2385, D: 3150, E: 3750 },
};

const ROADSIDE = {
  12: { "3star": 88, "5star": 154 },
  24: { "3star": 176, "5star": 300 },
  36: { "3star": 264, "5star": 398 },
  48: { "3star": 352, "5star": 510 },
  60: { "3star": 440, "5star": 610 },
};

const COMPONENTS = {
  "Major Drivetrain": [
    { name: "Engine", limits: { A: 1000, B: 2000, C: 3000, D: 5000, E: 7000 } },
    { name: "Differential", limits: { A: 1000, B: 2000, C: 3000, D: 5000, E: 7000 } },
    { name: "Gearbox / Transmission", limits: { A: 1000, B: 2000, C: 3000, D: 5000, E: 7000 } },
    { name: "Turbo / Super Charger", limits: { A: 1000, B: 2000, C: 3000, D: 5000, E: 7000 } },
  ],
  "Comprehensive Systems": [
    { name: "ABS Brake System", limits: { A: 350, B: 750, C: 1250, D: 1500, E: 2500 } },
    { name: "Air Conditioning", limits: { A: 350, B: 750, C: 1250, D: 1500, E: 2500 } },
    { name: "Brakes", limits: { A: 350, B: 750, C: 1250, D: 1500, E: 2500 } },
    { name: "Clutch", limits: { A: 350, B: 750, C: 1250, D: 1500, E: 2500 } },
    { name: "Cooling System", limits: { A: 350, B: 750, C: 1250, D: 1500, E: 2500 } },
    { name: "Computers", limits: { A: 350, B: 750, C: 1250, D: 1500, E: 2500 } },
    { name: "Cylinder Head & Gasket", limits: { A: 350, B: 750, C: 1250, D: 1500, E: 2500 } },
    { name: "Driveshaft & Universals", limits: { A: 350, B: 750, C: 1250, D: 1500, E: 2500 } },
    { name: "Electrical", limits: { A: 350, B: 750, C: 1250, D: 1500, E: 2500 } },
    { name: "Fuel System", limits: { A: 350, B: 750, C: 1250, D: 1500, E: 2500 } },
    { name: "Ignition System", limits: { A: 350, B: 750, C: 1250, D: 1500, E: 2500 } },
    { name: "Power Windows", limits: { A: 350, B: 750, C: 1250, D: 1500, E: 2500 } },
    { name: "Radiator", limits: { A: 350, B: 750, C: 1250, D: 1500, E: 2500 } },
    { name: "Steering", limits: { A: 350, B: 750, C: 1250, D: 1500, E: 2500 } },
    { name: "Suspension", limits: { A: 350, B: 750, C: 1250, D: 1500, E: 2500 } },
    { name: "Transmission Computer", limits: { A: 350, B: 750, C: 1250, D: 1500, E: 2500 } },
  ],
};

const BENEFITS = [
  { icon: "⏱", text: "Begins when manufacturer's warranty expires" },
  { icon: "∞", text: "Unlimited claims — no cap on number of claims" },
  { icon: "🛣", text: "Unlimited kilometres covered" },
  { icon: "🔧", text: "Parts and labour — Australia-wide" },
  { icon: "🏨", text: "Accommodation allowance included" },
  { icon: "🚗", text: "Car hire allowance while your car is repaired" },
  { icon: "📋", text: "Simple no-forms claims process" },
  { icon: "🔄", text: "Fully transferable to new owner" },
];

function fmt(n) {
  return "$" + Number(n).toLocaleString("en-AU");
}

function getEligiblePlans(age, km) {
  return Object.entries(PLANS)
    .filter(([, p]) => age <= p.maxAge && km < p.maxKm)
    .map(([key]) => key);
}

function StepBadge({ n, active, done }) {
  return (
    <div style={{
      width: 32, height: 32, borderRadius: "50%",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontWeight: 700, fontSize: 14, flexShrink: 0,
      background: done ? "#e97d2b" : active ? "#e97d2b22" : "#1e293b",
      border: active || done ? "2px solid #e97d2b" : "2px solid #334155",
      color: done ? "#fff" : active ? "#e97d2b" : "#64748b",
      transition: "all 0.3s",
    }}>
      {done ? "✓" : n}
    </div>
  );
}

function PlanCard({ planKey, selected, eligible, onSelect, duration, is4wd }) {
  const plan = PLANS[planKey];
  const price = PRICES[duration]?.[planKey];
  const total = price + (is4wd ? 110 : 0);
  const isEligible = eligible.includes(planKey);
  const isSelected = selected === planKey;

  return (
    <div onClick={() => isEligible && onSelect(planKey)} style={{
      border: isSelected ? `2px solid ${plan.accentColor}` : isEligible ? "2px solid #1e293b" : "2px solid #0f172a",
      borderRadius: 16, padding: "20px 16px",
      cursor: isEligible ? "pointer" : "not-allowed",
      opacity: isEligible ? 1 : 0.35,
      background: isSelected ? `linear-gradient(135deg, ${plan.color}18, ${plan.color}08)` : "#0f172a",
      position: "relative", transition: "all 0.25s",
      transform: isSelected ? "translateY(-4px)" : "none",
      boxShadow: isSelected ? `0 8px 32px ${plan.color}33` : "none",
    }}>
      {isSelected && (
        <div style={{ position: "absolute", top: -10, right: 12, background: plan.accentColor, color: "#000", fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 20, letterSpacing: "0.05em" }}>
          SELECTED
        </div>
      )}
      {!isEligible && (
        <div style={{ position: "absolute", top: -10, right: 12, background: "#334155", color: "#94a3b8", fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 20 }}>
          INELIGIBLE
        </div>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: plan.accentColor, boxShadow: `0 0 8px ${plan.accentColor}` }} />
        <span style={{ color: plan.accentColor, fontWeight: 800, fontSize: 16 }}>{plan.label}</span>
      </div>
      <p style={{ color: "#64748b", fontSize: 11, marginBottom: 14, lineHeight: 1.5 }}>{plan.qualification}</p>
      {price && (
        <div>
          <div style={{ color: "#94a3b8", fontSize: 10, marginBottom: 2 }}>{duration}-month plan</div>
          <div style={{ fontSize: 22, fontWeight: 900, color: "#f1f5f9" }}>{fmt(total)}</div>
          {is4wd && <div style={{ fontSize: 10, color: "#e97d2b", marginTop: 2 }}>incl. 4WD surcharge</div>}
          <div style={{ color: "#475569", fontSize: 10, marginTop: 2 }}>incl. GST</div>
        </div>
      )}
    </div>
  );
}

export default function WarrantyPage() {
  const [step, setStep] = useState(1);
  const [vehicleAge, setVehicleAge] = useState("");
  const [vehicleKm, setVehicleKm] = useState("");
  const [is4wd, setIs4wd] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(36);
  const [roadsideDuration, setRoadsideDuration] = useState(null);
  const [roadsideLevel, setRoadsideLevel] = useState(null);
  const [eligiblePlans, setEligiblePlans] = useState(["A", "B", "C", "D", "E"]);
  const [showCoverage, setShowCoverage] = useState(false);

  useEffect(() => {
    if (vehicleAge !== "" && vehicleKm !== "") {
      const eligible = getEligiblePlans(Number(vehicleAge), Number(vehicleKm));
      setEligiblePlans(eligible);
      if (selectedPlan && !eligible.includes(selectedPlan)) setSelectedPlan(null);
    }
  }, [vehicleAge, vehicleKm]);

  const basePrice = selectedPlan && PRICES[selectedDuration] ? PRICES[selectedDuration][selectedPlan] : 0;
  const surcharge = is4wd && selectedPlan ? 110 : 0;
  const roadsidePrice = roadsideDuration && roadsideLevel ? (ROADSIDE[roadsideDuration]?.[roadsideLevel] ?? 0) : 0;
  const totalPrice = basePrice + surcharge + roadsidePrice;
  const planColor = selectedPlan ? PLANS[selectedPlan].accentColor : "#e97d2b";
  const canProceedStep1 = vehicleAge !== "" && vehicleKm !== "" && eligiblePlans.length > 0;
  const canProceedStep2 = selectedPlan !== null;

  const inputStyle = {
    background: "#0f172a", border: "2px solid #1e293b", borderRadius: 10,
    color: "#f1f5f9", fontSize: 16, padding: "12px 16px", width: "100%",
    outline: "none", fontFamily: "inherit", transition: "border-color 0.2s",
  };

  const labelStyle = {
    display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em",
    color: "#94a3b8", textTransform: "uppercase", marginBottom: 8,
  };

  const sectionTitle = {
    fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
    fontSize: 34, fontWeight: 900, marginBottom: 8,
  };

  return (
    <div style={{ minHeight: "100vh", background: "#020c1b", color: "#f1f5f9", fontFamily: "'Barlow', 'Segoe UI', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;600;700;800;900&family=Barlow+Condensed:wght@700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .w-input:focus { border-color: #e97d2b !important; }
        .w-input::placeholder { color: #475569; }
        .w-btn-primary { background: #e97d2b; color: #000; border: none; border-radius: 10px; padding: 14px 28px; font-size: 15px; font-weight: 800; cursor: pointer; font-family: inherit; letter-spacing: 0.02em; transition: all 0.2s; }
        .w-btn-primary:hover { background: #f59a50; transform: translateY(-1px); }
        .w-btn-primary:disabled { opacity: 0.35; cursor: not-allowed; transform: none; }
        .w-btn-ghost { background: transparent; color: #64748b; border: 2px solid #1e293b; border-radius: 10px; padding: 12px 22px; font-size: 14px; font-weight: 700; cursor: pointer; font-family: inherit; transition: all 0.2s; }
        .w-btn-ghost:hover { border-color: #334155; color: #94a3b8; }
        .w-toggle { padding: 10px 18px; border-radius: 8px; border: 2px solid #1e293b; background: #0f172a; color: #64748b; font-weight: 700; font-size: 14px; cursor: pointer; transition: all 0.2s; font-family: inherit; }
        .w-toggle.on { border-color: #e97d2b; background: #e97d2b18; color: #e97d2b; }
        .w-dur { flex: 1; padding: 13px 8px; border-radius: 10px; border: 2px solid #1e293b; background: #0f172a; color: #64748b; font-weight: 800; font-size: 14px; cursor: pointer; transition: all 0.2s; text-align: center; font-family: inherit; }
        .w-dur.on { border-color: #e97d2b; background: #e97d2b18; color: #e97d2b; }
        .w-rs-card { border: 2px solid #1e293b; border-radius: 12px; padding: 18px; cursor: pointer; transition: all 0.2s; background: #0f172a; }
        .w-rs-card.on { border-color: #e97d2b; background: #e97d2b0d; }
        .comp-row:hover { background: #0f172a66; }
        .benefit-row { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid #0f172a; }
        @media(max-width:700px) { .plans-grid { grid-template-columns: 1fr 1fr !important; } .summary-cols { grid-template-columns: 1fr !important; } .step-label { display: none; } }
        @media(max-width:480px) { .plans-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      {/* HERO */}
      <div style={{ position: "relative", overflow: "hidden", padding: "72px 24px 56px", textAlign: "center", borderBottom: "1px solid #1e293b" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 0%, #e97d2b1a 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <div style={{ display: "inline-block", background: "#e97d2b18", border: "1px solid #e97d2b44", borderRadius: 20, padding: "5px 14px", fontSize: 11, fontWeight: 700, color: "#e97d2b", letterSpacing: "0.1em", marginBottom: 20, textTransform: "uppercase" }}>
            ENDURANCE Extended Warranty
          </div>
          <h1 style={{ fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif", fontSize: "clamp(40px, 8vw, 68px)", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.02em", marginBottom: 16 }}>
            WARRANTY<span style={{ color: "#e97d2b", display: "block" }}>CALCULATOR</span>
          </h1>
          <p style={{ color: "#64748b", fontSize: 17, maxWidth: 500, margin: "0 auto 40px" }}>
            Enter your vehicle details, choose your plan, and get an instant quote — no forms, no fuss.
          </p>

          {/* Stepper */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", maxWidth: 500, margin: "0 auto" }}>
            {[{ n: 1, label: "Your Vehicle" }, { n: 2, label: "Choose Plan" }, { n: 3, label: "Add-ons" }, { n: 4, label: "Summary" }].map((s, i, arr) => (
              <div key={s.n} style={{ display: "flex", alignItems: "center", flex: i < arr.length - 1 ? 1 : "none" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <StepBadge n={s.n} active={step === s.n} done={step > s.n} />
                  <span className="step-label" style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.05em", color: step >= s.n ? "#e97d2b" : "#334155", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    {s.label}
                  </span>
                </div>
                {i < arr.length - 1 && (
                  <div style={{ flex: 1, height: 2, background: step > s.n ? "#e97d2b" : "#1e293b", margin: "0 8px", marginBottom: 20, transition: "background 0.3s" }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px" }}>

        {/* ── STEP 1 ── */}
        {step === 1 && (
          <div>
            <h2 style={sectionTitle}>Tell us about your vehicle</h2>
            <p style={{ color: "#64748b", marginBottom: 40 }}>We'll show you which Endurance plans your vehicle qualifies for.</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 28 }}>
              <div>
                <label style={labelStyle}>Vehicle Age (years)</label>
                <input className="w-input" style={inputStyle} type="number" min="0" max="50" placeholder="e.g. 7" value={vehicleAge} onChange={e => setVehicleAge(e.target.value)} />
                <p style={{ color: "#475569", fontSize: 12, marginTop: 6 }}>How many years old is the vehicle?</p>
              </div>
              <div>
                <label style={labelStyle}>Odometer (km)</label>
                <input className="w-input" style={inputStyle} type="number" min="0" placeholder="e.g. 95000" value={vehicleKm} onChange={e => setVehicleKm(e.target.value)} />
                <p style={{ color: "#475569", fontSize: 12, marginTop: 6 }}>Current kilometres on the odometer</p>
              </div>
            </div>

            <div style={{ marginBottom: 40 }}>
              <label style={labelStyle}>Drivetrain</label>
              <div style={{ display: "flex", gap: 12 }}>
                <button className={`w-toggle ${!is4wd ? "on" : ""}`} onClick={() => setIs4wd(false)}>2WD / FWD / RWD</button>
                <button className={`w-toggle ${is4wd ? "on" : ""}`} onClick={() => setIs4wd(true)}>4WD / AWD &nbsp;+$110</button>
              </div>
            </div>

            {vehicleAge !== "" && vehicleKm !== "" && (
              <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 14, padding: "20px 24px", marginBottom: 40 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", marginBottom: 14, letterSpacing: "0.08em", textTransform: "uppercase" }}>Eligible Plans for Your Vehicle</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {["A", "B", "C", "D", "E"].map(k => {
                    const ok = eligiblePlans.includes(k);
                    return (
                      <div key={k} style={{ padding: "6px 14px", borderRadius: 20, fontSize: 13, fontWeight: 700, background: ok ? `${PLANS[k].color}22` : "#1e293b", color: ok ? PLANS[k].accentColor : "#334155", border: `1px solid ${ok ? PLANS[k].accentColor + "44" : "#1e293b"}` }}>
                        {ok ? "✓" : "✗"} Plan {k}
                      </div>
                    );
                  })}
                </div>
                {eligiblePlans.length === 0 && (
                  <p style={{ color: "#ef4444", fontSize: 14, marginTop: 12 }}>⚠ No standard plans available for this vehicle. Please contact us to discuss options.</p>
                )}
              </div>
            )}

            <button className="w-btn-primary" disabled={!canProceedStep1} onClick={() => setStep(2)}>
              See Available Plans →
            </button>
          </div>
        )}

        {/* ── STEP 2 ── */}
        {step === 2 && (
          <div>
            <h2 style={sectionTitle}>Choose your plan</h2>
            <p style={{ color: "#64748b", marginBottom: 32 }}>Select a coverage duration, then pick the plan that suits your needs.</p>

            <div style={{ marginBottom: 36 }}>
              <div style={{ ...labelStyle }}>Coverage Duration</div>
              <div style={{ display: "flex", gap: 12 }}>
                {[12, 36, 60].map(d => (
                  <button key={d} className={`w-dur ${selectedDuration === d ? "on" : ""}`} onClick={() => setSelectedDuration(d)}>
                    {d} months
                    <div style={{ fontSize: 11, fontWeight: 600, marginTop: 3, opacity: 0.7 }}>{d === 12 ? "1 yr" : d === 36 ? "3 yrs" : "5 yrs"}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="plans-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10, marginBottom: 36 }}>
              {["A", "B", "C", "D", "E"].map(k => (
                <PlanCard key={k} planKey={k} selected={selectedPlan} eligible={eligiblePlans} onSelect={setSelectedPlan} duration={selectedDuration} is4wd={is4wd} />
              ))}
            </div>

            <button className="w-btn-ghost" style={{ width: "100%", marginBottom: 20 }} onClick={() => setShowCoverage(!showCoverage)}>
              {showCoverage ? "▲ Hide" : "▼ Show"} Full Coverage Comparison Table
            </button>

            {showCoverage && (
              <div style={{ background: "#0a1628", border: "1px solid #1e293b", borderRadius: 14, overflow: "hidden", marginBottom: 36 }}>
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr", background: "#0f172a", padding: "12px 16px", fontSize: 11, fontWeight: 800, letterSpacing: "0.05em", color: "#94a3b8", textTransform: "uppercase", gap: 8 }}>
                  <div>Component</div>
                  {["A", "B", "C", "D", "E"].map(k => (
                    <div key={k} style={{ color: selectedPlan === k ? PLANS[k].accentColor : "#94a3b8", textAlign: "center" }}>Plan {k}</div>
                  ))}
                </div>
                {Object.entries(COMPONENTS).map(([group, items]) => (
                  <div key={group}>
                    <div style={{ padding: "8px 16px", background: "#0f172a88", fontSize: 10, fontWeight: 700, color: "#e97d2b", letterSpacing: "0.08em", textTransform: "uppercase" }}>{group}</div>
                    {items.map((item, i) => (
                      <div key={item.name} className="comp-row" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr", padding: "10px 16px", gap: 8, borderBottom: "1px solid #0f172a", background: i % 2 === 0 ? "transparent" : "#0f172a33", transition: "background 0.15s" }}>
                        <div style={{ color: "#cbd5e1", fontSize: 13 }}>{item.name}</div>
                        {["A", "B", "C", "D", "E"].map(k => (
                          <div key={k} style={{ textAlign: "center", fontSize: 13, fontWeight: 700, color: selectedPlan === k ? PLANS[k].accentColor : eligiblePlans.includes(k) ? "#64748b" : "#1e293b" }}>
                            {fmt(item.limits[k])}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: "flex", gap: 12 }}>
              <button className="w-btn-ghost" onClick={() => setStep(1)}>← Back</button>
              <button className="w-btn-primary" disabled={!canProceedStep2} onClick={() => setStep(3)}>Continue to Add-ons →</button>
            </div>
          </div>
        )}

        {/* ── STEP 3 ── */}
        {step === 3 && (
          <div>
            <h2 style={sectionTitle}>Emergency Roadside Assistance</h2>
            <p style={{ color: "#64748b", marginBottom: 12 }}>Optional 24/7 breakdown service — towing, fuel, flat battery, flat tyre & locksmith.</p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#0f172a", border: "1px solid #1e293b", borderRadius: 8, padding: "8px 16px", marginBottom: 40, fontSize: 13, color: "#64748b" }}>
              <span style={{ color: "#e97d2b" }}>ℹ</span> This is optional — you can skip if not needed.
            </div>

            <div style={{ marginBottom: 32 }}>
              <div style={labelStyle}>Coverage Level</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 480 }}>
                {[{ key: "3star", label: "⭐⭐⭐ 3 Star", desc: "Essential breakdown coverage" }, { key: "5star", label: "⭐⭐⭐⭐⭐ 5 Star", desc: "Premium full-service coverage" }].map(opt => (
                  <div key={opt.key} className={`w-rs-card ${roadsideLevel === opt.key ? "on" : ""}`} onClick={() => setRoadsideLevel(roadsideLevel === opt.key ? null : opt.key)}>
                    <div style={{ fontWeight: 800, fontSize: 15, color: roadsideLevel === opt.key ? "#e97d2b" : "#f1f5f9", marginBottom: 6 }}>{opt.label}</div>
                    <div style={{ color: "#64748b", fontSize: 13 }}>{opt.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {roadsideLevel && (
              <div style={{ marginBottom: 40 }}>
                <div style={labelStyle}>Roadside Duration</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10, maxWidth: 580 }}>
                  {[12, 24, 36, 48, 60].map(d => {
                    const price = ROADSIDE[d]?.[roadsideLevel];
                    return (
                      <button key={d} className={`w-dur ${roadsideDuration === d ? "on" : ""}`} style={{ padding: "12px 6px" }} onClick={() => setRoadsideDuration(roadsideDuration === d ? null : d)}>
                        {d}m
                        <div style={{ fontSize: 12, fontWeight: 700, marginTop: 4, color: "#e97d2b" }}>{fmt(price)}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button className="w-btn-ghost" onClick={() => setStep(2)}>← Back</button>
              <button className="w-btn-ghost" onClick={() => { setRoadsideDuration(null); setRoadsideLevel(null); setStep(4); }}>Skip Add-ons</button>
              <button className="w-btn-primary" onClick={() => setStep(4)}>Review My Quote →</button>
            </div>
          </div>
        )}

        {/* ── STEP 4 ── */}
        {step === 4 && (
          <div>
            <h2 style={sectionTitle}>Your Warranty Quote</h2>
            <p style={{ color: "#64748b", marginBottom: 40 }}>Here's a full summary of your selected coverage. All prices include GST.</p>

            <div className="summary-cols" style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 28 }}>
              {/* Left */}
              <div>
                {/* Vehicle */}
                <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 14, padding: "24px", marginBottom: 16 }}>
                  <div style={{ ...labelStyle, marginBottom: 16 }}>Vehicle Details</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                    {[{ label: "Age", value: `${vehicleAge} year${vehicleAge == 1 ? "" : "s"}` }, { label: "Odometer", value: `${Number(vehicleKm).toLocaleString("en-AU")} km` }, { label: "Drivetrain", value: is4wd ? "4WD / AWD" : "2WD" }].map(item => (
                      <div key={item.label}>
                        <div style={{ fontSize: 11, color: "#475569", marginBottom: 4 }}>{item.label}</div>
                        <div style={{ fontWeight: 700, color: "#f1f5f9" }}>{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Plan */}
                <div style={{ background: "#0f172a", border: `1px solid ${planColor}44`, borderRadius: 14, padding: "24px", marginBottom: 16 }}>
                  <div style={{ ...labelStyle, marginBottom: 16 }}>Selected Plan</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <div>
                      <div style={{ fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif", fontSize: 28, fontWeight: 900, color: planColor }}>
                        ENDURANCE {selectedPlan && PLANS[selectedPlan].label}
                      </div>
                      <div style={{ color: "#64748b", fontSize: 13, marginTop: 4 }}>{selectedDuration}-month plan</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 26, fontWeight: 900, color: "#f1f5f9" }}>{fmt(basePrice)}</div>
                      {is4wd && <div style={{ fontSize: 12, color: "#e97d2b" }}>+$110 4WD surcharge</div>}
                    </div>
                  </div>
                  <div style={{ color: "#64748b", fontSize: 13 }}>{selectedPlan && PLANS[selectedPlan].qualification}</div>
                </div>

                {/* Roadside */}
                {roadsideDuration && roadsideLevel && (
                  <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 14, padding: "24px", marginBottom: 16 }}>
                    <div style={{ ...labelStyle, marginBottom: 16 }}>Roadside Assistance Add-on</div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ fontWeight: 700, color: "#f1f5f9" }}>{roadsideLevel === "3star" ? "3 Star" : "5 Star"} — {roadsideDuration} months</div>
                        <div style={{ color: "#64748b", fontSize: 13, marginTop: 4 }}>24/7 towing, fuel, battery, tyre & locksmith</div>
                      </div>
                      <div style={{ fontSize: 22, fontWeight: 800, color: "#f1f5f9" }}>{fmt(roadsidePrice)}</div>
                    </div>
                  </div>
                )}

                {/* Benefits */}
                <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 14, padding: "24px" }}>
                  <div style={{ ...labelStyle, marginBottom: 12 }}>What's Included</div>
                  {BENEFITS.map(b => (
                    <div key={b.text} className="benefit-row">
                      <span style={{ fontSize: 18 }}>{b.icon}</span>
                      <span style={{ color: "#cbd5e1", fontSize: 14 }}>{b.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: sticky price card */}
              <div>
                <div style={{ position: "sticky", top: 24, background: "#0f172a", border: `2px solid ${planColor}55`, borderRadius: 20, padding: "32px", boxShadow: `0 0 60px ${planColor}22` }}>
                  <div style={{ ...labelStyle, marginBottom: 24 }}>Quote Summary</div>

                  {[
                    { label: "Warranty Plan", amount: basePrice },
                    ...(is4wd ? [{ label: "4WD Surcharge", amount: 110 }] : []),
                    ...(roadsidePrice > 0 ? [{ label: "Roadside Assistance", amount: roadsidePrice }] : []),
                  ].map(item => (
                    <div key={item.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, color: "#94a3b8", fontSize: 14 }}>
                      <span>{item.label}</span>
                      <span>{fmt(item.amount)}</span>
                    </div>
                  ))}

                  <div style={{ borderTop: "1px solid #1e293b", paddingTop: 20, marginTop: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 13, color: "#94a3b8" }}>Total incl. GST</span>
                      <span style={{ fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif", fontSize: 38, fontWeight: 900, color: planColor }}>
                        {fmt(totalPrice)}
                      </span>
                    </div>
                  </div>

                  <a href="/contact" style={{ display: "block", background: "#e97d2b", color: "#000", textAlign: "center", borderRadius: 10, padding: "16px", fontWeight: 800, fontSize: 16, textDecoration: "none", marginTop: 24 }}>
                    Get This Warranty →
                  </a>

                  <p style={{ color: "#334155", fontSize: 12, textAlign: "center", marginTop: 14, lineHeight: 1.5 }}>
                    Contact our team to finalise. Administered by Integrity Car Care Pty Ltd.
                  </p>

                  <button className="w-btn-ghost" style={{ width: "100%", marginTop: 12 }} onClick={() => { setStep(1); setSelectedPlan(null); setVehicleAge(""); setVehicleKm(""); setIs4wd(false); setRoadsideDuration(null); setRoadsideLevel(null); }}>
                    Start Over
                  </button>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 28 }}>
              <button className="w-btn-ghost" onClick={() => setStep(3)}>← Back to Add-ons</button>
            </div>
          </div>
        )}

        {/* Benefits footer (steps 1–3) */}
        {step !== 4 && (
          <div style={{ marginTop: 80, paddingTop: 56, borderTop: "1px solid #1e293b" }}>
            <div style={{ fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif", fontSize: 26, fontWeight: 900, marginBottom: 28, color: "#94a3b8" }}>
              ENDURANCE WARRANTY BENEFITS
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
              {BENEFITS.map(b => (
                <div key={b.text} style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: "18px", display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{b.icon}</span>
                  <span style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.5 }}>{b.text}</span>
                </div>
              ))}
            </div>
            <p style={{ marginTop: 28, color: "#334155", fontSize: 11, lineHeight: 1.6 }}>
              * Conditions apply. Please refer to Warranty Terms & Conditions for full details. All prices include GST. Warranty administered by Integrity Car Care Pty Ltd, PO Box 9482, Traralgon VIC 3844. P: 03 9723 6177 | admin@iwarranty.com.au | iwarranty.com.au
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
