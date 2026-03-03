import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
:root{
  --bg:#0d0f14;--sb:#111318;--sb-b:#1e2029;
  --surf:#161820;--surf-hov:#1c1f2b;
  --acc:#4f7cff;--acc-glow:rgba(79,124,255,.18);--acc-s:rgba(79,124,255,.1);
  --txt:#e8eaf2;--txt2:#7880a0;--muted:#454860;
  --err:#ff4f6a;--err-s:rgba(255,79,106,.1);
  --ok:#3dd68c;--ok-s:rgba(61,214,140,.1);
  --sw:240px;--hh:60px;--r:10px;--rs:6px;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Sora',sans-serif;background:var(--bg);color:var(--txt)}
.db-wrap{display:flex;min-height:100vh}
.db-sidebar{width:var(--sw);min-height:100vh;background:var(--sb);border-right:1px solid var(--sb-b);display:flex;flex-direction:column;position:fixed;top:0;left:0;z-index:100}
.db-brand{display:flex;align-items:center;gap:10px;padding:20px 20px 18px;border-bottom:1px solid var(--sb-b)}
.db-brand-icon{width:32px;height:32px;background:var(--acc);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#fff;flex-shrink:0;box-shadow:0 0 18px var(--acc-glow)}
.db-brand-name{font-size:15px;font-weight:600;letter-spacing:-.3px}
.db-sec-label{font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);padding:20px 20px 8px}
.db-nav{display:flex;flex-direction:column;gap:2px;padding:4px 10px;flex:1}
.db-link{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:var(--rs);font-size:13.5px;font-weight:500;color:var(--txt2);text-decoration:none;transition:all .15s ease;position:relative}
.db-link:hover{background:var(--surf-hov);color:var(--txt)}
.db-link.active{background:var(--acc-s);color:var(--acc)}
.db-link.active::before{content:'';position:absolute;left:0;top:50%;transform:translateY(-50%);width:3px;height:60%;background:var(--acc);border-radius:0 3px 3px 0}
.db-link-ico{font-size:15px;width:20px;text-align:center;flex-shrink:0}
.db-sidebar-footer{padding:12px 10px 20px;border-top:1px solid var(--sb-b)}
.db-logout{width:100%;display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:var(--rs);font-size:13.5px;font-weight:500;color:var(--err);background:transparent;border:none;cursor:pointer;font-family:'Sora',sans-serif;transition:all .15s ease;text-align:left}
.db-logout:hover{background:var(--err-s)}
.db-main{margin-left:var(--sw);flex:1;display:flex;flex-direction:column;min-height:100vh}
.db-header{height:var(--hh);display:flex;align-items:center;justify-content:space-between;padding:0 28px;border-bottom:1px solid var(--sb-b);background:rgba(13,15,20,.9);backdrop-filter:blur(14px);position:sticky;top:0;z-index:50}
.db-header-left h2{font-size:15px;font-weight:600;letter-spacing:-.3px}
.db-header-left p{font-size:11px;color:var(--muted);font-family:'JetBrains Mono',monospace;margin-top:2px}
.db-profile-wrap{position:relative}
.db-profile-btn{display:flex;align-items:center;gap:8px;padding:5px 8px 5px 12px;background:var(--surf);border:1px solid var(--sb-b);border-radius:40px;cursor:pointer;transition:all .15s ease;font-family:'Sora',sans-serif}
.db-profile-btn:hover{border-color:var(--acc);background:var(--acc-s)}
.db-profile-btn-name{font-size:13px;font-weight:500;color:var(--txt)}
.db-avatar{width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,var(--acc),#7c5fff);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;flex-shrink:0}
.db-dropdown{position:absolute;top:calc(100% + 10px);right:0;width:284px;background:var(--sb);border:1px solid var(--sb-b);border-radius:var(--r);box-shadow:0 24px 64px rgba(0,0,0,.55);overflow:hidden;animation:dropIn .15s ease;z-index:200}
@keyframes dropIn{from{opacity:0;transform:translateY(-8px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}
.db-dd-head{display:flex;align-items:center;gap:12px;padding:16px;border-bottom:1px solid var(--sb-b)}
.db-dd-avatar{width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,var(--acc),#7c5fff);display:flex;align-items:center;justify-content:center;font-size:17px;font-weight:700;color:#fff;flex-shrink:0}
.db-dd-name{font-size:14px;font-weight:600}
.db-dd-role{font-size:10px;color:var(--muted);font-family:'JetBrains Mono',monospace;margin-top:3px;text-transform:uppercase;letter-spacing:.06em}
.db-dd-body{padding:12px 16px 16px;display:flex;flex-direction:column}
.db-info-row{display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid rgba(30,32,41,.7)}
.db-info-row:last-child{border-bottom:none}
.db-info-row span:first-child{font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.1em;color:var(--muted)}
.db-info-row span:last-child{font-size:12px;color:var(--txt2);font-family:'JetBrains Mono',monospace;max-width:175px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;text-align:right}
.db-badge{display:inline-flex;align-items:center;padding:2px 8px;border-radius:20px;font-size:10px;font-weight:600;letter-spacing:.06em;font-family:'JetBrains Mono',monospace;text-transform:uppercase}
.db-badge.admin{background:rgba(255,184,0,.12);color:#ffb800}
.db-badge.doctor{background:var(--ok-s);color:var(--ok)}
.db-badge.receptionist{background:var(--acc-s);color:var(--acc)}
.db-body{padding:36px 28px;flex:1}
.db-greeting{font-size:26px;font-weight:700;letter-spacing:-.5px;margin-bottom:6px}
.db-greeting span{color:var(--acc)}
.db-subtext{font-size:13px;color:var(--muted)}
.db-overlay{position:fixed;inset:0;z-index:100}
`;

if (typeof document !== "undefined" && !document.getElementById("db-styles")) {
  const s = document.createElement("style");
  s.id = "db-styles";
  s.textContent = CSS;
  document.head.appendChild(s);
}

const getInitials = (name = "") =>
  name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase() || "?";

const RoleBadge = ({ role }) =>
  role ? <span className={"db-badge " + role}>{role}</span> : null;

const NAV = [
  { role: "receptionist", to: "/receptionist", icon: "📋", label: "Receptionist" },
  { role: "doctor",       to: "/doctor",       icon: "🩺", label: "Doctor"       },
  { role: "admin",        to: "/admin",        icon: "⚙️",  label: "Admin"        },
];

const Dashboard = ({ user }) => {
  const [data, setData]           = useState(user);
  const [profileOpen, setProfile] = useState(false);
  const [sidebarOpen, setSidebar] = useState(false);   // ← NEW
  const navigate                  = useNavigate();

  useEffect(() => { setData(user); }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  if (!data) return <div style={{ color:"#e8eaf2", padding:32, fontFamily:"Sora,sans-serif" }}>Loading…</div>;

  const name  = data?.name  || data?.user?.name;
  const email = data?.email || data?.user?.email;
  const role  = data?.role  || data?.user?.role;
  const uid   = data?.user_id || data?.user?.user_id;

  const visibleLinks = role === "admin" ? NAV : NAV.filter((n) => n.role === role);

  return (
    <div className="db-wrap">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="db-mobile-overlay" onClick={() => setSidebar(false)} />
      )}

      {/* ── Sidebar ── */}
      <aside className={"db-sidebar" + (sidebarOpen ? " open" : "")}>
        <div className="db-brand">
          <div className="db-brand-icon">M</div>
          <span className="db-brand-name">My App</span>
        </div>

        {visibleLinks.length > 0 && (
          <>
            <div className="db-sec-label">Navigation</div>
            <nav className="db-nav">
              {visibleLinks.map((n) => (
                <NavLink
                  key={n.to} to={n.to}
                  className={({ isActive }) => "db-link" + (isActive ? " active" : "")}
                  onClick={() => setSidebar(false)}   // close on mobile nav
                >
                  <span className="db-link-ico">{n.icon}</span>
                  {n.label}
                </NavLink>
              ))}
            </nav>
          </>
        )}

        <div className="db-sidebar-footer">
          <button className="db-logout" onClick={handleLogout}>
            <span className="db-link-ico">🚪</span>
            Logout
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="db-main">
        <header className="db-header">
          <div style={{ display:"flex", alignItems:"center" }}>
            {/* Hamburger — mobile only */}
            <button className="db-hamburger" onClick={() => setSidebar((v) => !v)}>
              ☰
            </button>
            <div className="db-header-left">
              <h2>Welcome back, {name}</h2>
              <p>{new Date().toLocaleDateString("en-US", { weekday:"long", month:"long", day:"numeric" })}</p>
            </div>
          </div>

          {/* Profile pill */}
          <div className="db-profile-wrap">
            <button className="db-profile-btn" onClick={() => setProfile((v) => !v)}>
              <span className="db-profile-btn-name">{name}</span>
              <div className="db-avatar">{getInitials(name)}</div>
            </button>

            {profileOpen && (
              <>
                <div className="db-overlay" onClick={() => setProfile(false)} />
                <div className="db-dropdown">
                  <div className="db-dd-head">
                    <div className="db-dd-avatar">{getInitials(name)}</div>
                    <div>
                      <div className="db-dd-name">{name}</div>
                      <div className="db-dd-role">{role}</div>
                    </div>
                  </div>
                  <div className="db-dd-body">
                    <div className="db-info-row">
                      <span>Email</span><span>{email}</span>
                    </div>
                    <div className="db-info-row">
                      <span>Role</span><span><RoleBadge role={role} /></span>
                    </div>
                    <div className="db-info-row">
                      <span>User ID</span><span>{uid}</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </header>

        <main className="db-body">
          <div className="db-greeting">
            Good to see you, <span>{name?.split(" ")[0]}</span> 👋
          </div>
          <p className="db-subtext">
            Signed in as <strong style={{ color:"#e8eaf2" }}>{role}</strong>. Use the sidebar to navigate.
          </p>
        </main>
      </div>

    </div>
  );
};
export default Dashboard;