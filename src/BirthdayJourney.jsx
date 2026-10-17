import React, { useState, useRef, useMemo } from 'react';
import { Play, Pause } from 'lucide-react';
import confetti from 'canvas-confetti';

// ---- Your two files go in the /public folder ----
const SONG_SRC = '/song.mp3';
const VIDEO_SRC = '/bday.mp4';

const NAV = [
  { id: 'page-0', label: 'hello', icon: '🌙' },
  { id: 'page-1', label: 'birthday', icon: '🎂' },
  { id: 'page-2', label: 'tu', icon: '💫' },
  { id: 'page-3', label: 'wishes', icon: '🎁' },
  { id: 'page-4', label: 'letter', icon: '💌' },
  { id: 'page-5', label: 'finally', icon: '⭐' },
];

const WISH_NOTES = [
  'Aap hamesha khush rahein, bas yahi chahti hoon. ⭐',
  'Aapki saari wishes poori hon, ek ek karke.',
  'Hamesha aise hi pagal aur cute rehna. Bilkul mat badalna. 🤭',
  'Life mein problems aayein toh aayein, bas apni smile mat khona.',
  'Har buri nazar se Bhagwan aapko bachaye. 🧿',
  'Aap itna aage jaao ki khud pe proud feel karo.',
  'Apna dhyaan rakha karo, samjha? Khana time pe khaana, aur sona bhi.',
  'Kabhi mat sochna ki aap akele ho. Main hoon na. 🫶',
  'Mumma is always with you, mere Kengra betu. 💛',
];

const FINAL_NOTE =
  'Jar mein sirf thode se wishes hain, kyunki jitne maine aapki liye maange hain wo sab likhti toh poori website lag jaati. 🤭';

export default function KengraBirthday() {
  const [currentPage, setCurrentPage] = useState('page-0');

  // audio
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef(null);

  // page 2 envelope
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  // wish jar
  const [noteIndex, setNoteIndex] = useState(-1);
  const [jarShake, setJarShake] = useState(false);

  // moon easter egg
  const [moonClicks, setMoonClicks] = useState(0);
  const [toast, setToast] = useState('');
  const [showToast, setShowToast] = useState(false);

  // twinkling stars (generated once)
  const stars = useMemo(
    () =>
      Array.from({ length: 70 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 2.5 + 1,
        delay: Math.random() * 4,
        duration: Math.random() * 3 + 2,
      })),
    []
  );

  const toggleAudio = () => {
    const a = audioRef.current;
    if (!a) return;
    if (isPlaying) {
      a.pause();
      setIsPlaying(false);
    } else {
      a.volume = volume;
      a.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log('Audio play blocked:', err));
    }
  };

  const handleVolume = (e) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  const goTo = (id) => {
    setCurrentPage(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (id === 'page-5') fireConfetti();
  };

  const startApp = () => {
    toggleAudio();
    goTo('page-1');
  };

  const drawNote = () => {
    setJarShake(true);
    setTimeout(() => setJarShake(false), 500);
    setNoteIndex((p) => p + 1);
  };

  const handleMoon = () => {
    const c = moonClicks + 1;
    setMoonClicks(c);
    let msg = 'Chand says: aaj Kengra betu ka birthday hai! 🌙';
    if (c === 3) msg = 'Chand says: itna mat chhed, sharma jaunga 🤭';
    if (c > 5) msg = 'Chand bhi tujhse pyaar karta hai 💛';
    setToast(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const fireConfetti = () => {
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#F6C453', '#FFE9A8', '#A8B4FF', '#FFFFFF'],
    });
  };

  const btnPrimary =
    'px-6 py-2.5 bg-[#F6C453] hover:bg-[#ffd36e] text-[#1a1f4a] font-bold rounded-full shadow-lg transition-all hover:scale-105 active:scale-95';
  const btnGhost =
    'px-5 py-2 bg-white/10 hover:bg-white/20 text-[#FFE9A8] font-bold rounded-full border border-white/20 transition-all';
  const card =
    'bg-white/[0.07] backdrop-blur-md border border-[#F6C453]/30 rounded-3xl shadow-2xl';

  return (
    <div className="min-h-screen text-[#FFF6E0] font-body relative overflow-x-hidden flex flex-col justify-between bg-gradient-to-b from-[#0d1230] via-[#171d4a] to-[#2a2358]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;600;700&display=swap');
        .font-body { font-family: 'Nunito', sans-serif; }
        .font-title { font-family: 'Fredoka', sans-serif; }
        .font-hand { font-family: 'Caveat', cursive; }
        @keyframes twinkle { 0%,100% { opacity: .15; transform: scale(.8);} 50% { opacity: 1; transform: scale(1.2);} }
        @keyframes floaty { 0%,100% { transform: translateY(0);} 50% { transform: translateY(-10px);} }
        @keyframes shake { 0%,100% { transform: rotate(0);} 25% { transform: rotate(-5deg);} 75% { transform: rotate(5deg);} }
        .animate-floaty { animation: floaty 4s ease-in-out infinite; }
        .animate-shake { animation: shake .5s ease-in-out; }
        .glow { text-shadow: 0 0 18px rgba(246,196,83,.55); }
      `}</style>

      {/* stars */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {stars.map((s) => (
          <span
            key={s.id}
            className="absolute rounded-full bg-[#FFF6E0]"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <audio ref={audioRef} loop src={SONG_SRC} />

      {/* nav */}
      {currentPage !== 'page-0' && (
        <nav className="fixed top-4 left-0 right-0 z-40 flex justify-center px-4">
          <div className="bg-[#0d1230]/80 backdrop-blur-md px-3 py-2 rounded-full border border-[#F6C453]/30 shadow-lg flex items-center gap-1 sm:gap-2">
            {NAV.map((t) => (
              <button
                key={t.id}
                onClick={() => goTo(t.id)}
                className={`px-2.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1 ${
                  currentPage === t.id
                    ? 'bg-[#F6C453] text-[#1a1f4a]'
                    : 'text-[#FFE9A8] hover:bg-white/10'
                }`}
              >
                <span>{t.icon}</span>
                <span className="hidden sm:inline">{t.label}</span>
              </button>
            ))}
          </div>
        </nav>
      )}

      {showToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#FFF6E0] text-[#1a1f4a] px-4 py-2 rounded-full shadow-lg text-sm font-bold animate-bounce">
          {toast}
        </div>
      )}

      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 w-full max-w-4xl mx-auto z-10 pt-20 sm:pt-24">
        {/* PAGE 0 — intro */}
        {currentPage === 'page-0' && (
          <section className="flex flex-col items-center justify-center text-center my-auto min-h-[70vh] w-full">
            <div className={`${card} p-8 sm:p-12 max-w-md w-full flex flex-col items-center relative overflow-hidden`}>
              <div className="absolute top-3 left-4 text-xl">✨</div>
              <div className="absolute top-4 right-4 text-xl">⭐</div>
              <div className="absolute bottom-3 left-4 text-xl">💫</div>
              <div className="absolute bottom-3 right-4 text-xl">✨</div>

              <div className="text-6xl mb-4 animate-floaty">🌙</div>

              <h1 className="font-title text-2xl sm:text-3xl font-semibold text-[#F6C453] glow mb-3">
                Kuch khaas hai mere Kengra betu ke liye ⭐
              </h1>
              <p className="font-hand text-2xl text-[#C9D0FF] mb-8">
                Aaja, aap ke liye banaya hai ♡
              </p>
              <button onClick={startApp} className={`${btnPrimary} text-base sm:text-lg flex items-center gap-2`}>
                <span>surprise kholo</span>
                <span>✨</span>
              </button>
            </div>
          </section>
        )}

        {/* PAGE 1 — birthday + video */}
        {currentPage === 'page-1' && (
          <section className="w-full flex flex-col items-center text-center pb-24">
            <div className="inline-block bg-[#F6C453]/15 border border-[#F6C453]/40 px-4 py-1.5 rounded-full text-xs font-semibold text-[#FFE9A8] mb-4">
              ✨ aaj ka din sirf aapka hai ✨
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold font-title text-[#F6C453] glow mb-8 leading-tight">
              Happiest Birthday mere Kengra betu 🎂
            </h1>

            <div className="relative w-full max-w-2xl my-2">
              <button
                onClick={handleMoon}
                className="absolute -top-8 -right-2 z-20 text-4xl sm:text-5xl hover:scale-110 transition-transform animate-floaty"
                title="Tap me!"
              >
                🌙
              </button>

              <div className={`${card} p-3 sm:p-5`}>
                <video
                  controls
                  className="w-full h-auto rounded-2xl bg-[#0d1230] object-cover max-h-[420px]"
                >
                  <source src={VIDEO_SRC} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            <div className="mt-8 max-w-lg space-y-2">
              <p className="font-title text-xl sm:text-2xl font-semibold text-[#FFE9A8]">
                Aaj sirf aapke baare mein hai sab kuch 🥹
              </p>
              <p className="font-hand text-2xl text-[#C9D0FF]">
                toh yeh chhota sa kona poora aapke naam, mere Kengra betu.
              </p>
            </div>

            <div className="mt-8">
              <button onClick={() => goTo('page-2')} className={btnPrimary}>
                aage chal → ⭐
              </button>
            </div>
          </section>
        )}

        {/* PAGE 2 — about him (writing, no photos) */}
        {currentPage === 'page-2' && (
          <section className="w-full flex flex-col items-center text-center pb-24">
            <h2 className="text-3xl sm:text-4xl font-bold font-title text-[#F6C453] glow mb-8">
              Aap mere liye kya hai ♡
            </h2>

            <div className={`${card} p-6 sm:p-8 max-w-xl space-y-4 mb-8`}>
              <p className="font-hand text-3xl font-bold text-[#F6C453]">
                “Pata hai, aap mere liye kitne special ho.” 🥹
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-[#FFF6E0]/90">
                Kabhi kabhi lagta hai ki main aapko ye bata hi nahi paati. Aap bas hai, aur wahi kaafi hai
                mere liye. Aapka pagalpan, aapki cuteness, aapki chhoti chhoti baatein, sab kuch.
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-[#FFF6E0]/90">
                Isliye socha ki is baar kuch alag banau. Kuch jahan main apne dil ki saari baatein
                ek jagah likh sakun, aur aap jab chahe wapas aake padh sake.
              </p>
              <div className="pt-2">
                <span className="inline-block bg-[#F6C453]/15 text-[#FFE9A8] font-bold px-4 py-2 rounded-full text-sm sm:text-base border border-[#F6C453]/40">
                  Mera Kengra betu, mera apna. ⭐
                </span>
              </div>
            </div>

            {/* envelope */}
            <div className="w-full max-w-sm flex flex-col items-center mb-8">
              <div
                onClick={() => setIsEnvelopeOpen(true)}
                className="cursor-pointer bg-white/[0.07] p-5 rounded-2xl w-full hover:border-[#F6C453] transition-all text-center group border-2 border-dashed border-[#F6C453]/50"
              >
                {!isEnvelopeOpen ? (
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-3xl group-hover:scale-110 transition-transform">💌</span>
                    <span className="font-hand text-2xl font-bold text-[#F6C453]">ek chhoti si baat aur ♡</span>
                    <span className="text-xs text-[#C9D0FF]">(tap karke khol)</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <span className="text-2xl">✨</span>
                    <p className="font-hand text-2xl text-[#FFE9A8] leading-snug">
                      “Chahe aap kitne bhi bada ho jaaye, mere liye aap hamesha mera Kengra betu hi rahenge.”
                    </p>
                    <span className="text-xs">⭐</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={() => goTo('page-1')} className={btnGhost}>← back</button>
              <button onClick={() => goTo('page-3')} className={btnPrimary}>next → 🎁</button>
            </div>
          </section>
        )}

        {/* PAGE 3 — wish jar */}
        {currentPage === 'page-3' && (
          <section className="w-full flex flex-col items-center text-center pb-24">
            <h2 className="text-2xl sm:text-3xl font-bold font-title text-[#F6C453] glow mb-2 max-w-lg">
              Website se gift wrap karke toh bhej nahi sakti, isliye ye bana diya 🎁
            </h2>
            <p className="font-hand text-2xl text-[#C9D0FF] mb-6">Ek wish nikaalo  ♡</p>

            <div className="relative my-4 flex flex-col items-center">
              <div
                onClick={drawNote}
                className={`cursor-pointer select-none transition-transform active:scale-95 ${jarShake ? 'animate-shake' : ''}`}
              >
                <div className="w-44 h-56 sm:w-52 sm:h-64 bg-white/10 backdrop-blur-md rounded-3xl border-4 border-white/40 shadow-2xl flex flex-col items-center justify-between p-4 relative overflow-hidden">
                  <div className="absolute -top-1 w-32 h-6 bg-[#F6C453] rounded-md border-2 border-[#ffd36e] flex items-center justify-center">
                    <div className="w-24 h-1 bg-[#c9972a] rounded" />
                  </div>
                  <div className="mt-8 flex-grow w-full flex flex-wrap gap-2 items-end justify-center p-2">
                    <span className="text-lg rotate-12">⭐</span>
                    <span className="text-base -rotate-12">💛</span>
                    <span className="text-xl rotate-45">🌟</span>
                    <span className="text-sm -rotate-6">✨</span>
                    <span className="text-lg rotate-12">💫</span>
                  </div>
                  <div className="text-xs font-bold text-[#1a1f4a] bg-[#FFE9A8] px-3 py-1 rounded-full shadow z-10">
                    Jar ko tap kar! 🫙
                  </div>
                </div>
              </div>

              {noteIndex >= 0 && (
                <div className="mt-6 bg-[#FFF6E0] text-[#1a1f4a] p-6 max-w-md w-full rounded-2xl border-2 border-[#F6C453] shadow-2xl relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F6C453] text-[#1a1f4a] text-xs px-3 py-0.5 rounded-full font-bold">
                    Ek wish 💛
                  </div>
                  <p className="font-hand text-2xl sm:text-3xl my-4 leading-snug">
                    {noteIndex < WISH_NOTES.length ? WISH_NOTES[noteIndex] : FINAL_NOTE}
                  </p>
                  <button
                    onClick={drawNote}
                    className="mt-2 px-4 py-1.5 bg-[#1a1f4a] hover:bg-[#2a2f66] text-[#FFE9A8] font-bold rounded-full text-sm transition-all mx-auto"
                  >
                    ek aur ♡
                  </button>
                </div>
              )}
            </div>

            <div className="flex gap-4 mt-8">
              <button onClick={() => goTo('page-2')} className={btnGhost}>← back</button>
              <button onClick={() => goTo('page-4')} className={btnPrimary}>next → 💌</button>
            </div>
          </section>
        )}

        {/* PAGE 4 — the letter */}
        {currentPage === 'page-4' && (
          <section className="w-full flex flex-col items-center pb-24">
            <h2 className="text-2xl sm:text-3xl font-bold font-title text-[#F6C453] glow mb-6 text-center">
              Ab woh baat, jo mujhe actually kehni thi.
            </h2>

            <div className="relative w-full max-w-2xl mb-8">
              <div className="bg-[#FFF6E0] text-[#2b2a44] p-6 sm:p-10 rounded-2xl shadow-2xl border border-[#F6C453] relative overflow-hidden">
                <div className="absolute top-4 right-4 text-3xl opacity-80">⭐</div>
                <div className="absolute bottom-4 left-4 text-2xl opacity-80">🌙</div>

                <div className="font-hand text-2xl sm:text-3xl space-y-5 leading-relaxed">
                  <p className="text-3xl sm:text-4xl font-bold text-[#b8860b]">Mere Kengra betu,</p>
                  <p>
                    Pata hai, aap mere liye kitne special ho. Aapko hamesha khush dekhna, aapko life mein
                    aage badhte dekhna aur aapki saari wishes poori hote dekhna, bas yahi chahti hoon. Aap
                    hamesha aise hi pagal, cute aur khush rehna. Life mein kitni bhi problems aayein, bas
                    kabhi apni smile mat khona.
                  </p>
                  <p>
                    Bhagwan aapko duniya ki saari khushiyan de, har buri nazar se bachaye aur aapko har woh
                    cheez mile jo aapka dil chahta hai. Aap life mein bahut aage jaaye aur hamesha apne liye
                    proud feel kare.
                  </p>
                  <p className="font-bold text-[#8a6508]">
                    Aur haan, chahe aap kitne bhi bada ho jaaye, mere liye aap hamesha mera Kengra betu hi
                    rahenge.
                  </p>
                  <p>
                    Apna dhyaan rakha karo, khush raha karo aur kabhi bhi yeh mat sochna ki aap akele ho.
                    Meri best wishes aur blessings hamesha aapke saath hain.
                  </p>
                  <div className="text-right pt-4">
                    <span className="text-3xl sm:text-4xl text-[#b8860b] block">
                      Love you loads, Kengra betu 💛
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={() => goTo('page-3')} className={btnGhost}>← back</button>
              <button onClick={() => goTo('page-5')} className={btnPrimary}>next → ⭐</button>
            </div>
          </section>
        )}

        {/* PAGE 5 — final */}
        {currentPage === 'page-5' && (
          <section className="flex flex-col items-center text-center my-auto w-full pb-24">
            <div className={`${card} p-8 sm:p-12 max-w-xl w-full flex flex-col items-center`}>
              <div className="text-5xl mb-3">🌙⭐</div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-title text-[#F6C453] glow mb-6 leading-tight">
                Once again, happiest birthday mere bachhe! 🎂
              </h1>

              <div className="space-y-4 text-[#FFF6E0]/90 text-base sm:text-lg max-w-md">
                <p>
                  I hope aapka yeh saal aapke liye bahut saari happiness, love, success aur beautiful
                  memories lekar aaye.
                </p>
                <p className="text-xl sm:text-2xl font-bold text-[#FFE9A8] font-title pt-2">
                  Love you loads, Kengra betu. 💛
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/20 w-full space-y-2">
                <p className="font-hand text-2xl text-[#C9D0FF]">
                  Aap jaise ho, waise hi rehna. Bas yahi chahiye. ⭐
                </p>
                <p className="text-sm font-bold text-[#F6C453] tracking-wide">
                  Happy Birthday, Kengra betu 🎂
                </p>
              </div>

              <div className="mt-6">
                <button onClick={fireConfetti} className={`${btnGhost} text-xs`}>
                  ✨ phir se celebrate karein! ✨
                </button>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* music player */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-[#0d1230]/85 backdrop-blur-md border border-[#F6C453]/40 shadow-xl rounded-full p-2 flex items-center gap-2 max-w-[200px] sm:max-w-[240px]">
          <button
            onClick={toggleAudio}
            className="w-10 h-10 sm:w-11 sm:h-11 bg-[#F6C453] hover:bg-[#ffd36e] rounded-full flex items-center justify-center shrink-0 shadow active:scale-95 relative"
            title="Play/Pause Music"
          >
            <span className={`text-xl inline-block ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }}>
              ⭐
            </span>
            {isPlaying && <div className="absolute inset-0 rounded-full bg-[#F6C453] -z-10 animate-ping opacity-60" />}
          </button>

          <div className="flex flex-col pr-2 overflow-hidden">
            <span className="text-[10px] sm:text-xs font-bold text-[#FFE9A8] truncate">Aapke liye 🎵</span>
            <div className="flex items-center gap-1">
              <button onClick={toggleAudio} className="text-[#FFE9A8] hover:text-white">
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={handleVolume}
                className="w-12 sm:w-16 h-1 rounded-lg appearance-none cursor-pointer accent-[#F6C453] bg-white/20"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
