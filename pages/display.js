import styles from '../styles/display.module.css';
import { useEffect, useState } from 'react';

const stages = [
  "USB王", "跳高王", "擲筊王", "高音王",
  "海賊王", "下腰王", "準時王", "乾眼王",
  "色盲王", "錯王", "蟹堡王", "神射王",
  "搖大王", "守門王", "定格王", "反應王"
];

const icons = [
  "💾", "🔔", "🩴", "🎵",
  "🏴‍☠️", "📏", "⏰", "👁️",
  "🕶️", "❌", "🍔", "🎯",
  "☂️", "🧱", "🤖", "⚡"
];

const Display = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [data, setData] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem("scoreboard");
    if (saved) setData(JSON.parse(saved));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPageIndex((prev) => (prev + 1) % 9);
    }, pageIndex === 0 ? 15000 : 7000);
    return () => clearInterval(interval);
  }, [pageIndex]);

  if (pageIndex === 0) {
    return (
      <div className={styles.grid}>
        {stages.map((stage, index) => {
          const score = data[stage]?.[0] || { name: "--", score: "--" };
          return (
            <div key={stage} className={styles.card} style={{ backgroundColor: data[stage]?.color || "red" }}>
              <div className={styles.stageTitle}>{icons[index]} {stage}</div>
              <div className={styles.score}>成績：{score.score}</div>
              <div className={styles.champion}>👑 {score.name}</div>
            </div>
          );
        })}
      </div>
    );
  }

  const leftIndex = (pageIndex - 1) * 2;
  const rightIndex = leftIndex + 1;

  const renderBlock = (index) => {
    const stage = stages[index];
    const records = data[stage] || [];
    return (
      <div key={stage} className={styles.block}>
        <div className={styles.stage}>{icons[index]} {stage}</div>
        {records.slice(0, 5).map((item, i) => (
          <div key={i} className={styles.entry}>
            {["🥇","🥈","🥉","4️⃣","5️⃣"][i]} {item.name} - {item.score}次
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.carousel}>
      {renderBlock(leftIndex)}
      {rightIndex < stages.length && renderBlock(rightIndex)}
    </div>
  );
};

export default Display;
