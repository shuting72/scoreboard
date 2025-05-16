import { useEffect, useState } from "react";

const defaultRecords = [
  { name: "USB王", unit: "次", icon: "🔌" },
  { name: "跳高王", unit: "公分", icon: "🔔" },
  { name: "擲筊王", unit: "次", icon: "🩴" },
  { name: "高音王", unit: "音", icon: "🎵" },
  { name: "海賊王", unit: "分", icon: "🏴‍☠️" },
  { name: "下腰王", unit: "公分", icon: "🏁" },
  { name: "準時王", unit: "秒", icon: "⏰" },
  { name: "乾眼王", unit: "秒", icon: "👁️" },
  { name: "色盲王", unit: "題", icon: "🕶️" },
  { name: "錯王", unit: "題", icon: "❌" },
  { name: "蟹堡王", unit: "題", icon: "🍔" },
  { name: "神射王", unit: "個", icon: "🏹" },
  { name: "搧大王", unit: "個", icon: "🪭" },
  { name: "守門王", unit: "顆", icon: "🥅" },
  { name: "定格王", unit: "公分", icon: "🤖" },
  { name: "反應王", unit: "毫秒", icon: "⚡" },
];

const teamColors = {
  1: "#FF0000",   // 紅
  2: "#FFA500",   // 橘
  3: "#FFFF00",   // 黃
  4: "#39FF14",   // 螢光綠
  5: "#007F00",   // 深綠
  6: "#00BFFF",   // 淺藍
  7: "#0000CD",   // 深藍
  8: "#800080",   // 紫
  9: "#FF69B4",   // 粉紅
  10: "#FFFFFF",  // 白
};

export default function Display() {
  const [records, setRecords] = useState(defaultRecords.map(r => ({
    ...r, score: "--", holder: "--", team: ""
  })));

  const load = () => {
    const stored = localStorage.getItem("records");
    if (stored) {
      const parsed = JSON.parse(stored);
      const merged = defaultRecords.map((item, i) => ({
        ...item,
        holder: parsed[i]?.holder || "--",
        score: parsed[i]?.score || "--",
        team: parsed[i]?.team || ""
      }));
      setRecords(merged);
    }
  };

  useEffect(() => {
    load();
    const interval = setInterval(() => {
      if (localStorage.getItem("broadcast")) load();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ backgroundColor: "#000", color: "#fff", height: "100vh", padding: "0", margin: 0 }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridTemplateRows: "repeat(4, 1fr)",
        height: "100vh",
        width: "100vw",
      }}>
        {records.map((item, i) => {
          const color = teamColors[item.team] || "#fff";
          return (
            <div
              key={i}
              style={{
                border: `6px solid ${color}`,
                boxShadow: `0 0 20px ${color}`,
                borderRadius: "12px",
                textAlign: "center",
                padding: "1vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <div style={{
                fontSize: "4.5vh", marginBottom: "1vh", whiteSpace: "nowrap"
              }}>
                {item.icon} {item.name}
              </div>
              <div style={{
                fontSize: "3.5vh",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                marginBottom: "0.6vh"
              }}>
                成績：{item.score} {item.unit}
              </div>
              <div style={{
                fontSize: "3vh",
                whiteSpace: "nowrap",
                overflow: "hidden"
              }}>
                👑 {item.holder}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
