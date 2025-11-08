import { useState } from "react";

const HEROES = [
  "IronMan", "CaptainAmerica", "Thor", "BlackWidow", "Hulk", "Hawkeye", "SpiderMan", 
  "DoctorStrange", "BlackPanther", "ScarletWitch", "Vision", "AntMan", "Wasp", "Falcon", 
  "WinterSoldier", "StarLord", "Gamora", "Drax", "Rocket", "Groot", "Loki", "CaptainMarvel", 
  "NickFury", "Okoye", "Shuri", "TChalla", "WonderWoman", "Batman", "Superman", "Aquaman", 
  "Flash", "Cyborg", "GreenLantern", "HarleyQuinn", "Joker", "Deadpool", "WadeWilson", 
  "Venom", "SpiderGwen", "IronFist", "LukeCage", "JessicaJones", "Daredevil", "Elektra", 
  "ScarletJohansson", "ChrisEvans", "ChrisHemsworth", "Scar", "McMende", "ChrisPratt", 
  "ZoeSaldana", "BenedictCumberbatch", "TomHolland", "ChadwickBoseman", "PaulRudd", 
  "TheUndertaker", "SamuelLJackson", "BrieLarson", "KarenGillan", "DaveBautista", 
  "AnthonyMackie", "SebastianStan", "TomHiddleston", "Elsa", "PaulBettany", "JeremyRenner", 
  "HayleyAtwell", "NataliePortman", "GalGadot", "HenryCavill", "BenAffleck", "JasonMomoa", 
  "EzraMiller", "RayFisher", "MargotRobbie", "JaredLeto", "RyanReynolds", "TomHardy", 
  "ShaileneWoodley", "DylanOBrien", "EmmaWatson", "DanielRadcliffe", "RobertPattinson", 
  "LuciferMorningStar", "ChrisHemsworth2", "MarkRuffalo", "JakieChan"
];

export default function HeroForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [hero, setHero] = useState("");
  const [showHeroList, setShowHeroList] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    
    try {
      const res = await fetch("https://scale-api.wamatamuriu.org/submit-user-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, age: parseInt(age), hero }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Your Name</label>
          <input
            type="text"
            placeholder="e.g., John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Age</label>
          <input
            type="number"
            placeholder="e.g., 25"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            min="1"
            max="120"
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>
            Favorite Hero 
            <button
              type="button"
              onClick={() => setShowHeroList(!showHeroList)}
              style={styles.toggleButton}
            >
              {showHeroList ? "Hide" : "Show"} Options
            </button>
          </label>
          <input
            type="text"
            placeholder="Type or select from list below"
            value={hero}
            onChange={(e) => setHero(e.target.value)}
            required
            style={styles.input}
          />
          {showHeroList && (
            <div style={styles.heroGrid}>
              {HEROES.map((h) => (
                <button
                  key={h}
                  type="button"
                  onClick={() => {
                    setHero(h);
                    setShowHeroList(false);
                  }}
                  style={{
                    ...styles.heroChip,
                    ...(hero === h ? styles.heroChipSelected : {})
                  }}
                >
                  {h}
                </button>
              ))}
            </div>
          )}
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          style={{
            ...styles.button,
            ...(loading ? styles.buttonDisabled : {})
          }}
        >
          {loading ? (
            <span style={styles.buttonContent}>
              <span style={styles.spinner}></span>
              Processing...
            </span>
          ) : (
            "🚀 Get ML Prediction"
          )}
        </button>
      </form>

      {error && (
        <div style={styles.errorBox}>
          <strong>❌ Error:</strong> {error}
        </div>
      )}

      {result && (
        <div style={styles.resultBox}>
          <h3 style={styles.resultTitle}>✨ ML Inference Result</h3>
          <div style={styles.resultContent}>
            {Object.entries(result).map(([key, value]) => (
              <div key={key} style={styles.resultRow}>
                <span style={styles.resultKey}>{key}:</span>
                <span style={styles.resultValue}>
                  {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    padding: "20px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    borderRadius: "12px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px"
  },
  label: {
    color: "#fff",
    fontSize: "14px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  toggleButton: {
    padding: "4px 12px",
    fontSize: "12px",
    backgroundColor: "rgba(255,255,255,0.2)",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.3)",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "all 0.2s ease"
  },
  heroGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
    gap: "8px",
    maxHeight: "300px",
    overflowY: "auto",
    padding: "12px",
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: "8px",
    marginTop: "8px"
  },
  heroChip: {
    padding: "8px 12px",
    fontSize: "13px",
    backgroundColor: "#f0f0f0",
    color: "#333",
    border: "2px solid transparent",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    textAlign: "center",
    fontWeight: "500"
  },
  heroChipSelected: {
    backgroundColor: "#667eea",
    color: "#fff",
    borderColor: "#667eea",
    fontWeight: "bold"
  },
  input: {
    padding: "12px 16px",
    fontSize: "16px",
    border: "2px solid transparent",
    borderRadius: "8px",
    outline: "none",
    transition: "all 0.3s ease",
    backgroundColor: "#fff"
  },
  button: {
    padding: "14px 24px",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#fff",
    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    boxShadow: "0 4px 15px rgba(245, 87, 108, 0.4)",
    marginTop: "10px"
  },
  buttonDisabled: {
    opacity: 0.7,
    cursor: "not-allowed",
    transform: "none"
  },
  buttonContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px"
  },
  spinner: {
    width: "16px",
    height: "16px",
    border: "3px solid rgba(255,255,255,0.3)",
    borderTop: "3px solid #fff",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    display: "inline-block"
  },
  errorBox: {
    marginTop: "20px",
    padding: "16px",
    backgroundColor: "#fee",
    border: "2px solid #fcc",
    borderRadius: "8px",
    color: "#c33"
  },
  resultBox: {
    marginTop: "20px",
    padding: "20px",
    background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    borderRadius: "12px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
    animation: "slideIn 0.5s ease"
  },
  resultTitle: {
    margin: "0 0 16px 0",
    color: "#333",
    fontSize: "20px",
    fontWeight: "bold"
  },
  resultContent: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  resultRow: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    padding: "12px",
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: "6px",
    borderLeft: "4px solid #667eea"
  },
  resultKey: {
    fontSize: "12px",
    fontWeight: "bold",
    color: "#667eea",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
  },
  resultValue: {
    fontSize: "16px",
    color: "#333",
    fontWeight: "500",
    wordBreak: "break-word",
    whiteSpace: "pre-wrap"
  }
};
