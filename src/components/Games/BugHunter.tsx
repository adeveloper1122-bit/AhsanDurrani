import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { X, Trophy, ShieldAlert, Zap, RefreshCw, Briefcase } from "lucide-react";
import { useAppStore } from "../../store/useAppStore";
import { playLaserSound, playClickSound } from "../../utils/audio";

export const BugHunter: React.FC = () => {
  const { activeGameModal, setActiveGameModal, soundEnabled, unlockAchievement, addXP } = useAppStore();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);

  if (activeGameModal !== "bugHunter") return null;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let currentScore = 0;
    let currentLevel = 1;

    // Player position
    let playerX = canvas.width / 2;
    const playerY = canvas.height - 40;
    const playerWidth = 40;

    // Projectiles
    let bullets: { x: number; y: number }[] = [];

    // Bugs
    let bugs: { x: number; y: number; speed: number; hp: number; maxHp: number; type: string }[] = [];

    const spawnBug = () => {
      const types = ["SyntaxBug", "SecurityMalware", "PerformanceLag", "BossBug"];
      const type = currentLevel === 3 ? "BossBug" : types[Math.floor(Math.random() * 3)];
      const hp = type === "BossBug" ? 15 : type === "SecurityMalware" ? 3 : 1;
      bugs.push({
        x: Math.random() * (canvas.width - 40) + 20,
        y: -30,
        speed: type === "BossBug" ? 0.8 : Math.random() * 1.5 + 1 + currentLevel * 0.3,
        hp,
        maxHp: hp,
        type,
      });
    };

    let bugSpawnTimer = setInterval(spawnBug, 1200);

    // Mouse movement
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      playerX = Math.max(20, Math.min(canvas.width - 20, e.clientX - rect.left));
    };

    // Click to shoot
    const onClick = () => {
      bullets.push({ x: playerX, y: playerY });
      playLaserSound(soundEnabled);
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("click", onClick);

    const gameLoop = () => {
      ctx.fillStyle = "#0a0512";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Grid lines
      ctx.strokeStyle = "rgba(130, 1, 242, 0.15)";
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw Player
      ctx.fillStyle = "#8201F2";
      ctx.beginPath();
      ctx.arc(playerX, playerY, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowColor = "#8201F2";
      ctx.shadowBlur = 15;

      // Update & Draw Bullets
      ctx.fillStyle = "#a855f7";
      bullets.forEach((b, index) => {
        b.y -= 8;
        ctx.beginPath();
        ctx.arc(b.x, b.y, 4, 0, Math.PI * 2);
        ctx.fill();

        if (b.y < 0) bullets.splice(index, 1);
      });

      // Update & Draw Bugs
      bugs.forEach((bug, bIndex) => {
        bug.y += bug.speed;

        // Draw bug sprite
        ctx.fillStyle = bug.type === "BossBug" ? "#ef4444" : bug.type === "SecurityMalware" ? "#f59e0b" : "#3b82f6";
        ctx.beginPath();
        ctx.arc(bug.x, bug.y, bug.type === "BossBug" ? 28 : 12, 0, Math.PI * 2);
        ctx.fill();

        // Draw hp bar
        if (bug.maxHp > 1) {
          ctx.fillStyle = "#ef4444";
          ctx.fillRect(bug.x - 20, bug.y - 25, 40, 4);
          ctx.fillStyle = "#10b981";
          ctx.fillRect(bug.x - 20, bug.y - 25, (bug.hp / bug.maxHp) * 40, 4);
        }

        // Bullet collision check
        bullets.forEach((bullet, bulletIdx) => {
          const dist = Math.hypot(bullet.x - bug.x, bullet.y - bug.y);
          const hitRadius = bug.type === "BossBug" ? 30 : 16;
          if (dist < hitRadius) {
            bullets.splice(bulletIdx, 1);
            bug.hp -= 1;
            if (bug.hp <= 0) {
              bugs.splice(bIndex, 1);
              currentScore += bug.type === "BossBug" ? 100 : 20;
              setScore(currentScore);

              if (currentScore >= 150 && currentLevel === 1) {
                currentLevel = 2;
                setLevel(2);
              } else if (currentScore >= 350 && currentLevel === 2) {
                currentLevel = 3;
                setLevel(3);
              } else if (currentScore >= 500) {
                setVictory(true);
                unlockAchievement("bug_hunter");
                addXP(150, "Completed Bug Hunter game");
              }
            }
          }
        });

        // Fail condition (bug reaches bottom)
        if (bug.y > canvas.height) {
          setGameOver(true);
          clearInterval(bugSpawnTimer);
        }
      });

      if (!gameOver && !victory) {
        animationId = requestAnimationFrame(gameLoop);
      }
    };

    animationId = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(animationId);
      clearInterval(bugSpawnTimer);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("click", onClick);
    };
  }, [soundEnabled, gameOver, victory, unlockAchievement, addXP]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl rounded-3xl bg-black border border-[#8201F2] p-6 shadow-[0_0_60px_rgba(130,1,242,0.5)] flex flex-col items-center"
      >
        <button
          onClick={() => setActiveGameModal(null)}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-white hover:bg-[#8201F2] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-4">
          <h3 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
            <ShieldAlert className="w-6 h-6 text-[#8201F2]" />
            <span>BUG HUNTER: WEBSITE SECURITY DEFENDER</span>
          </h3>
          <p className="text-xs text-[#B8B8B8] font-mono mt-1">
            Move mouse to aim, click to shoot malware bugs & protect the server!
          </p>
        </div>

        {/* HUD Stats */}
        <div className="w-full flex justify-between px-6 py-2 bg-white/5 rounded-xl border border-white/10 font-mono text-xs text-white mb-4">
          <div>SCORE: <span className="text-[#8201F2] font-bold">{score}</span></div>
          <div>LEVEL: <span className="text-purple-300 font-bold">{level} / 3</span></div>
          <div>TARGET: <span className="text-emerald-400 font-bold">500 PTS</span></div>
        </div>

        {/* Canvas Game Stage */}
        <div className="relative rounded-2xl overflow-hidden border border-white/20">
          <canvas
            ref={canvasRef}
            width={600}
            height={400}
            className="w-full max-w-[600px] h-[360px] cursor-crosshair bg-black"
          />

          {victory && (
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
              <Trophy className="w-16 h-16 text-yellow-400 mb-2 animate-bounce" />
              <h4 className="text-3xl font-black text-white mb-2">VICTORY ACHIEVED!</h4>
              <p className="text-xs text-[#B8B8B8] max-w-md mb-6">
                You successfully protected Ahsan's server stack and unlocked the Master Bug Hunter badge (+150 XP)!
              </p>
              <button
                onClick={() => {
                  setActiveGameModal(null);
                  const el = document.getElementById("contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3 rounded-xl bg-[#8201F2] text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-[0_0_20px_#8201F2]"
              >
                <Briefcase className="w-4 h-4" />
                <span>Hire Ahsan For Your Project</span>
              </button>
            </div>
          )}

          {gameOver && (
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
              <ShieldAlert className="w-16 h-16 text-red-500 mb-2" />
              <h4 className="text-2xl font-bold text-white mb-2">SYSTEM BREACHED</h4>
              <p className="text-xs text-[#B8B8B8] mb-6">A bug bypassed server defense!</p>
              <button
                onClick={() => {
                  setGameOver(false);
                  setScore(0);
                  setLevel(1);
                }}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-[#8201F2] text-white font-bold text-xs flex items-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Try Again</span>
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
