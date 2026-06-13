import "./Nebula.css";

export default function NebulaBackground() {
  return (
    <div className="nebula-container">
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>
      <div className="orb orb-4"></div>
      
      {/* Heavy noise overlay for texture */}
      <div className="noise-overlay"></div>
    </div>
  );
}
