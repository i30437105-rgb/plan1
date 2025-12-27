import React, { useState, useEffect, useRef } from 'react';
import { Star, Target, Flag, CheckSquare, Clock, Wallet, Lock, Delete, ArrowLeft, Trophy, Archive, Plus, Settings, X, Check, ChevronRight, ChevronDown, Sparkles, Moon, Sun, Heart, Briefcase, TrendingUp, BookOpen, Edit3, MoreVertical, Eye, Search, ZoomIn, Upload, Image, Calendar, Award, AlertCircle } from 'lucide-react';

// ============================================
// СТИЛИ И КОНСТАНТЫ
// ============================================
const COLORS = {
  bg: '#0a0908',
  bgCard: '#1a1714',
  bgCardHover: '#252220',
  gold: '#d4a853',
  goldLight: '#f0d78c',
  goldDark: '#8b6914',
  amber: '#b8860b',
  text: '#e8e4de',
  textMuted: '#8a8279',
  textDark: '#5a5550',
  success: '#4a9e6b',
  warning: '#d4a853',
  danger: '#c45c4a',
  border: '#2a2522',
  prayer: '#6b5b7a',
  prayerLight: '#8b7b9a',
  blue: '#4a7eb8',
};

const SPHERE_ICONS = {
  sphere_money: Wallet,
  sphere_health: Heart,
  sphere_business: Briefcase,
  sphere_relationships: Heart,
  sphere_growth: BookOpen,
};

// Иконки для целей
const GOAL_ICONS = [
  '🎯', '⭐', '🏆', '💰', '💵', '📈', '🏠', '🚗', '✈️', '🎓',
  '📚', '💪', '🏃', '❤️', '👨‍👩‍👧', '🎨', '🎵', '💻', '📱', '🔧',
  '🌍', '🧘', '🍎', '⚡', '🔑', '💎', '🎁', '🌟', '🚀', '🎪'
];

// Приоритеты целей
const GOAL_PRIORITIES = [
  { id: 'none', label: 'Обычная', color: COLORS.textMuted },
  { id: 'important', label: 'Важная', color: COLORS.warning },
  { id: 'strategic_focus', label: 'Стратегический фокус', color: COLORS.gold },
];

// Типы критериев
const CRITERIA_TYPES = [
  { id: 'numeric', label: 'Числовой', desc: 'План и факт' },
  { id: 'boolean', label: 'Да / Нет', desc: 'Выполнено или нет' },
  { id: 'text', label: 'Текстовый', desc: 'Описание + чекбокс' },
];

const NUMERIC_TYPES = [
  { id: 'money', label: 'Деньги', unit: '₽' },
  { id: 'count', label: 'Количество', unit: 'шт' },
  { id: 'time', label: 'Время', unit: 'ч' },
  { id: 'percent', label: 'Проценты', unit: '%' },
  { id: 'points', label: 'Баллы', unit: 'б' },
  { id: 'custom', label: 'Своя единица', unit: '' },
];

// ============================================
// SVG РУБАШКА КАРТЫ
// ============================================
const CardBack = ({ isPrayer = false, title = '', sphereName = '', createdAt = '' }) => {
  const mainColor = isPrayer ? COLORS.prayer : COLORS.gold;
  const lightColor = isPrayer ? COLORS.prayerLight : COLORS.goldLight;
  
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' });
  };
  
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 200 280" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
        <defs>
          <radialGradient id={`glow-${isPrayer ? 'prayer' : 'dream'}`} cx="50%" cy="35%" r="50%">
            <stop offset="0%" stopColor={mainColor} stopOpacity="0.4" />
            <stop offset="100%" stopColor={mainColor} stopOpacity="0" />
          </radialGradient>
          <filter id="blur">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>
        
        <rect width="200" height="280" fill={COLORS.bg} />
        
        {Array.from({ length: 60 }).map((_, i) => (
          <circle
            key={i}
            cx={Math.random() * 200}
            cy={Math.random() * 280}
            r={Math.random() * 2 + 0.5}
            fill={mainColor}
            opacity={Math.random() * 0.5 + 0.1}
          />
        ))}
        
        <ellipse cx="100" cy="100" rx="80" ry="60" fill={`url(#glow-${isPrayer ? 'prayer' : 'dream'})`} />
        
        <g transform="translate(100, 90)">
          <circle r="45" fill="none" stroke={mainColor} strokeWidth="1" opacity="0.3" filter="url(#blur)" />
          
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 15) * Math.PI / 180;
            const innerR = 50;
            const outerR = 65 + Math.random() * 15;
            return (
              <line
                key={i}
                x1={Math.cos(angle) * innerR}
                y1={Math.sin(angle) * innerR}
                x2={Math.cos(angle) * outerR}
                y2={Math.sin(angle) * outerR}
                stroke={mainColor}
                strokeWidth={0.5 + Math.random()}
                opacity={0.4 + Math.random() * 0.4}
              />
            );
          })}
          
          <path
            d="M -30 -20 A 40 40 0 1 1 -30 50 A 30 30 0 1 0 -30 -20"
            fill={mainColor}
            opacity="0.9"
          />
          
          <path
            d="M -28 -15 A 35 35 0 1 1 -28 45 A 27 27 0 1 0 -28 -15"
            fill={lightColor}
            opacity="0.3"
          />
          
          {Array.from({ length: 20 }).map((_, i) => {
            const angle = Math.random() * Math.PI * 2;
            const dist = 40 + Math.random() * 30;
            return (
              <circle
                key={`splash-${i}`}
                cx={Math.cos(angle) * dist}
                cy={Math.sin(angle) * dist}
                r={1 + Math.random() * 2}
                fill={mainColor}
                opacity={0.3 + Math.random() * 0.5}
              />
            );
          })}
        </g>
        
        {Array.from({ length: 8 }).map((_, i) => {
          const x = 60 + i * 12;
          const height = 40 + Math.random() * 80;
          return (
            <line
              key={`drip-${i}`}
              x1={x}
              y1={160}
              x2={x}
              y2={160 + height}
              stroke={mainColor}
              strokeWidth={0.5}
              opacity={0.2 + Math.random() * 0.3}
            />
          );
        })}
        
        <rect x="8" y="8" width="184" height="264" fill="none" stroke={mainColor} strokeWidth="0.5" opacity="0.3" rx="8" />
      </svg>
      
      <div style={{
        position: 'absolute',
        bottom: '35px',
        left: '12px',
        right: '12px',
        textAlign: 'center',
      }}>
        <p style={{
          fontSize: '13px',
          fontWeight: '600',
          color: mainColor,
          marginBottom: '4px',
          fontFamily: 'Georgia, serif',
          textShadow: `0 0 10px ${mainColor}60`,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>{title}</p>
        {sphereName && (
          <p style={{
            fontSize: '10px',
            color: isPrayer ? COLORS.prayerLight : COLORS.goldDark,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            opacity: 0.8,
          }}>{sphereName}</p>
        )}
      </div>
      
      <div style={{
        position: 'absolute',
        bottom: '12px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '10px',
        color: isPrayer ? COLORS.prayerLight : COLORS.gold,
        opacity: 0.9,
      }}>
        {formatDate(createdAt)}
      </div>
    </div>
  );
};

// ============================================
// ИКОНКА ВСЕВИДЯЩЕГО ОКА
// ============================================
const AllSeeingEye = ({ size = 24, color = COLORS.gold, filled = false }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 5C7 5 2.73 8.11 1 12.5C2.73 16.89 7 20 12 20C17 20 21.27 16.89 23 12.5C21.27 8.11 17 5 12 5Z"
      stroke={color}
      strokeWidth="1.5"
      fill={filled ? `${color}20` : 'none'}
    />
    <circle cx="12" cy="12.5" r="3.5" stroke={color} strokeWidth="1.5" fill={filled ? color : 'none'} />
    <path d="M12 2V4M8 3L9 4.5M16 3L15 4.5" stroke={color} strokeWidth="1" opacity="0.6" />
  </svg>
);

// ============================================
// ХРАНИЛИЩЕ ДАННЫХ
// ============================================
const getDefaultSpheres = () => [
  { id: 'sphere_money', name: 'Финансы', isDefault: true, sortOrder: 1 },
  { id: 'sphere_health', name: 'Здоровье', isDefault: true, sortOrder: 2 },
  { id: 'sphere_business', name: 'Бизнес', isDefault: true, sortOrder: 3 },
  { id: 'sphere_relationships', name: 'Отношения', isDefault: true, sortOrder: 4 },
  { id: 'sphere_growth', name: 'Саморазвитие', isDefault: true, sortOrder: 5 },
];

const getDefaultData = () => ({
  pin: null,
  spheres: getDefaultSpheres(),
  dreams: [],
  goals: [],
  goalCriteria: [],
  milestones: [],
  steps: [],
  tasks: [],
});

const useAppStorage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await window.storage.get('planner_v8');
        if (result?.value) {
          const parsed = JSON.parse(result.value);
          setData({ ...getDefaultData(), ...parsed });
        } else {
          setData(getDefaultData());
        }
      } catch {
        setData(getDefaultData());
      }
      setLoading(false);
    };
    loadData();
  }, []);

  const saveData = async (newData) => {
    setData(newData);
    try {
      await window.storage.set('planner_v8', JSON.stringify(newData));
    } catch (e) {
      console.error('Storage error:', e);
    }
  };

  return { data, saveData, loading };
};

// ============================================
// СОРТИРОВКА МЕЧТ
// ============================================
const sortDreams = (dreams) => {
  return [...dreams].sort((a, b) => {
    if (a.type !== b.type) return a.type === 'dream' ? -1 : 1;
    if (a.type === 'dream') {
      if (a.isLeading !== b.isLeading) return a.isLeading ? -1 : 1;
      if (a.isFocused !== b.isFocused) return a.isFocused ? -1 : 1;
    }
    if (a.sortOrder !== undefined && b.sortOrder !== undefined) return a.sortOrder - b.sortOrder;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
};

// ============================================
// РАСЧЁТ ПРОГРЕССА ЦЕЛИ
// ============================================
const calculateGoalProgress = (goal, criteria) => {
  const goalCriteria = criteria.filter(c => c.goalId === goal.id);
  if (goalCriteria.length === 0) return 0;
  
  const progresses = goalCriteria.map(c => {
    if (c.type === 'numeric') {
      if (!c.targetValue || c.targetValue === 0) return 0;
      return Math.min(100, (c.actualValue || 0) / c.targetValue * 100);
    }
    return c.isCompleted ? 100 : 0;
  });
  
  return Math.round(progresses.reduce((a, b) => a + b, 0) / progresses.length);
};

// ============================================
// PIN-ЭКРАН
// ============================================
const PinScreen = ({ mode, onSuccess, onSetPin, storedPin }) => {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [step, setStep] = useState(mode === 'create' ? 'enter' : 'verify');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
  const [lockTime, setLockTime] = useState(0);

  useEffect(() => {
    if (locked && lockTime > 0) {
      const timer = setTimeout(() => setLockTime(lockTime - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (locked && lockTime === 0) {
      setLocked(false);
      setAttempts(0);
    }
  }, [locked, lockTime]);

  const handleDigit = (digit) => {
    if (locked) return;
    setError('');
    
    if (pin.length < 4) {
      const newPin = pin + digit;
      setPin(newPin);
      
      if (newPin.length === 4) {
        setTimeout(() => {
          if (mode === 'create' && step === 'enter') {
            setConfirmPin(newPin);
            setPin('');
            setStep('confirm');
          } else if (mode === 'create' && step === 'confirm') {
            if (newPin === confirmPin) {
              onSetPin(newPin);
            } else {
              setError('PIN-коды не совпадают');
              setPin('');
              setConfirmPin('');
              setStep('enter');
            }
          } else {
            if (newPin === storedPin) {
              onSuccess();
            } else {
              const newAttempts = attempts + 1;
              setAttempts(newAttempts);
              setPin('');
              if (newAttempts >= 5) {
                setLocked(true);
                setLockTime(30);
                setError('Слишком много попыток');
              } else {
                setError('Неверный PIN-код');
              }
            }
          }
        }, 150);
      }
    }
  };

  const handleDelete = () => {
    if (pin.length > 0) setPin(pin.slice(0, -1));
  };

  const getTitle = () => {
    if (locked) return 'Заблокировано';
    if (mode === 'create') return step === 'enter' ? 'Создайте PIN-код' : 'Повторите PIN-код';
    return 'Введите PIN-код';
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: `radial-gradient(ellipse at top, #1a1510 0%, ${COLORS.bg} 50%, #05030a 100%)`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '200px',
        height: '200px',
        background: `radial-gradient(circle, ${COLORS.gold}15 0%, transparent 70%)`,
        borderRadius: '50%',
        filter: 'blur(40px)',
      }} />
      
      <div style={{ marginBottom: '40px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{
          width: '80px',
          height: '80px',
          background: `linear-gradient(135deg, ${COLORS.goldDark} 0%, ${COLORS.gold} 50%, ${COLORS.goldLight} 100%)`,
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
          boxShadow: `0 10px 40px ${COLORS.gold}40`,
        }}>
          <Lock style={{ width: '36px', height: '36px', color: COLORS.bg }} />
        </div>
        <h1 style={{ fontSize: '24px', fontWeight: '600', color: COLORS.text, marginBottom: '8px', fontFamily: 'Georgia, serif' }}>{getTitle()}</h1>
        {locked && <p style={{ color: COLORS.textMuted, fontSize: '14px' }}>Подождите {lockTime} сек.</p>}
      </div>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              background: i < pin.length ? COLORS.gold : 'transparent',
              border: `2px solid ${i < pin.length ? COLORS.gold : COLORS.textDark}`,
              transition: 'all 0.2s ease',
              boxShadow: i < pin.length ? `0 0 15px ${COLORS.gold}60` : 'none',
            }}
          />
        ))}
      </div>

      {error && <p style={{ color: COLORS.danger, marginBottom: '16px', fontSize: '14px' }}>{error}</p>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', maxWidth: '280px' }}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, 'del'].map((digit, i) => (
          <button
            key={i}
            onClick={() => {
              if (digit === 'del') handleDelete();
              else if (digit !== null) handleDigit(String(digit));
            }}
            disabled={locked || digit === null}
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '20px',
              border: 'none',
              fontSize: '28px',
              fontWeight: '500',
              fontFamily: 'Georgia, serif',
              cursor: digit === null ? 'default' : locked ? 'not-allowed' : 'pointer',
              background: digit === null ? 'transparent' : digit === 'del' ? COLORS.bgCard : `linear-gradient(145deg, ${COLORS.bgCard} 0%, ${COLORS.bg} 100%)`,
              color: digit === 'del' ? COLORS.textMuted : COLORS.text,
              opacity: locked ? 0.5 : 1,
              border: digit === null ? 'none' : `1px solid ${COLORS.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {digit === 'del' ? <Delete style={{ width: '24px', height: '24px' }} /> : digit}
          </button>
        ))}
      </div>
    </div>
  );
};

// ============================================
// НИЖНЯЯ НАВИГАЦИЯ
// ============================================
const BottomNav = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'dream', icon: Moon, label: 'Мечты' },
    { id: 'strategy', icon: Target, label: 'Цели' },
    { id: 'tactics', icon: Flag, label: 'Тактика' },
    { id: 'action', icon: CheckSquare, label: 'День' },
    { id: 'productivity', icon: Clock, label: 'Время' },
    { id: 'finance', icon: Wallet, label: 'Финансы' },
  ];

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: `linear-gradient(to top, ${COLORS.bg} 0%, ${COLORS.bg}f0 100%)`,
      borderTop: `1px solid ${COLORS.border}`,
      padding: '8px 4px 20px',
      backdropFilter: 'blur(20px)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '8px 12px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <Icon style={{ 
                width: '22px', 
                height: '22px',
                color: isActive ? COLORS.gold : COLORS.textDark,
                strokeWidth: isActive ? 2.5 : 1.5,
                filter: isActive ? `drop-shadow(0 0 8px ${COLORS.gold}60)` : 'none',
              }} />
              <span style={{ 
                fontSize: '10px', 
                marginTop: '4px',
                color: isActive ? COLORS.gold : COLORS.textDark,
                fontWeight: isActive ? '600' : '400',
              }}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ============================================
// МОДАЛЬНОЕ ОКНО
// ============================================
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.85)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      zIndex: 100,
    }} onClick={onClose}>
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '500px',
          maxHeight: '85vh',
          background: COLORS.bgCard,
          borderRadius: '24px 24px 0 0',
          border: `1px solid ${COLORS.border}`,
          borderBottom: 'none',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{
          padding: '20px',
          borderBottom: `1px solid ${COLORS.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: COLORS.text, fontFamily: 'Georgia, serif' }}>{title}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}>
            <X style={{ width: '20px', height: '20px', color: COLORS.textMuted }} />
          </button>
        </div>
        <div style={{ padding: '20px', overflowY: 'auto', flex: 1 }}>{children}</div>
      </div>
    </div>
  );
};

// ============================================
// ЗАГРУЗКА ИЗОБРАЖЕНИЯ
// ============================================
const ImageUploader = ({ value, onChange, label }) => {
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => onChange(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <label style={{ display: 'block', fontSize: '12px', color: COLORS.textMuted, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</label>
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
      
      {value ? (
        <div style={{ position: 'relative' }}>
          <img src={value} alt="Cover" style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '12px', border: `1px solid ${COLORS.border}` }} />
          <div style={{ position: 'absolute', top: '8px', right: '8px', display: 'flex', gap: '8px' }}>
            <button onClick={() => inputRef.current?.click()} style={{ padding: '8px', background: `${COLORS.bg}cc`, border: `1px solid ${COLORS.border}`, borderRadius: '8px', cursor: 'pointer' }}>
              <Edit3 style={{ width: '16px', height: '16px', color: COLORS.text }} />
            </button>
            <button onClick={() => onChange(null)} style={{ padding: '8px', background: `${COLORS.bg}cc`, border: `1px solid ${COLORS.border}`, borderRadius: '8px', cursor: 'pointer' }}>
              <X style={{ width: '16px', height: '16px', color: COLORS.danger }} />
            </button>
          </div>
        </div>
      ) : (
        <button onClick={() => inputRef.current?.click()} style={{ width: '100%', padding: '24px 16px', background: COLORS.bg, border: `2px dashed ${COLORS.border}`, borderRadius: '12px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <Upload style={{ width: '24px', height: '24px', color: COLORS.textMuted }} />
          <span style={{ color: COLORS.textMuted, fontSize: '14px' }}>Загрузить</span>
        </button>
      )}
    </div>
  );
};

// ============================================
// ПРОГРЕСС-БАР
// ============================================
const ProgressBar = ({ value, color = COLORS.gold, height = 8, showLabel = false }) => (
  <div style={{ width: '100%' }}>
    <div style={{
      width: '100%',
      height: `${height}px`,
      background: COLORS.bg,
      borderRadius: `${height / 2}px`,
      overflow: 'hidden',
    }}>
      <div style={{
        width: `${Math.min(100, Math.max(0, value))}%`,
        height: '100%',
        background: `linear-gradient(90deg, ${color}80 0%, ${color} 100%)`,
        borderRadius: `${height / 2}px`,
        transition: 'width 0.3s ease',
      }} />
    </div>
    {showLabel && (
      <p style={{ fontSize: '12px', color: COLORS.textMuted, marginTop: '4px', textAlign: 'right' }}>{Math.round(value)}%</p>
    )}
  </div>
);

// ============================================
// КАРТОЧКА МЕЧТЫ
// ============================================
const DreamCard = ({ dream, sphere, onClick, onFlip, isFlipped, isFocused, isLeading }) => {
  const isPrayer = dream.type === 'prayer';

  return (
    <div onClick={() => onFlip(dream.id)} style={{ perspective: '1000px', cursor: 'pointer' }}>
      <div style={{
        position: 'relative',
        width: '100%',
        paddingBottom: '140%',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.6s ease',
        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
      }}>
        {/* Рубашка */}
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '16px',
          overflow: 'hidden',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          border: `1px solid ${isLeading ? COLORS.gold : isFocused ? COLORS.gold + '60' : COLORS.border}`,
          boxShadow: isLeading ? `0 8px 32px ${COLORS.gold}30` : `0 4px 20px rgba(0,0,0,0.4)`,
        }}>
          <CardBack isPrayer={isPrayer} title={dream.title} sphereName={sphere?.name || (isPrayer ? 'Аффирмация' : '')} createdAt={dream.createdAt} />
        </div>

        {/* Лицевая сторона */}
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '16px',
          overflow: 'hidden',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          background: dream.coverImage ? `url(${dream.coverImage}) center/cover` : `linear-gradient(135deg, ${COLORS.bgCard} 0%, ${COLORS.bg} 100%)`,
          border: `1px solid ${COLORS.border}`,
          boxShadow: `0 4px 20px rgba(0,0,0,0.4)`,
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.5) 100%)' }} />
          
          <button onClick={(e) => { e.stopPropagation(); onClick(dream); }} style={{
            position: 'absolute', top: '12px', right: '12px', width: '36px', height: '36px',
            background: `${COLORS.bg}cc`, border: `1px solid ${COLORS.border}`, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 2,
          }}>
            <ZoomIn style={{ width: '18px', height: '18px', color: COLORS.gold }} />
          </button>
          
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 16px', zIndex: 1 }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: COLORS.text, marginBottom: '8px', fontFamily: 'Georgia, serif', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{dream.title}</h3>
            <p style={{ fontSize: '12px', color: COLORS.textMuted, lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {dream.description || dream.prayerText || ''}
            </p>
          </div>
        </div>
      </div>
      
      {isFocused && !isFlipped && (
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px', zIndex: 20, pointerEvents: 'none' }}>
          <AllSeeingEye size={20} color={COLORS.gold} filled={true} />
          {isLeading && <Star style={{ width: '18px', height: '18px', color: COLORS.gold, fill: COLORS.gold, filter: `drop-shadow(0 0 4px ${COLORS.gold})` }} />}
        </div>
      )}
    </div>
  );
};

// ============================================
// ФОРМА СОЗДАНИЯ МЕЧТЫ
// ============================================
const DreamForm = ({ spheres, onSave, onClose, existingDream, onAddSphere }) => {
  const [type, setType] = useState(existingDream?.type || 'dream');
  const [title, setTitle] = useState(existingDream?.title || '');
  const [description, setDescription] = useState(existingDream?.description || '');
  const [sphereId, setSphereId] = useState(existingDream?.sphereId || spheres[0]?.id);
  const [periodType, setPeriodType] = useState(existingDream?.periodType || 'years');
  const [periodYears, setPeriodYears] = useState(existingDream?.periodYears || 3);
  const [periodDate, setPeriodDate] = useState(existingDream?.periodDate || '');
  const [prayerText, setPrayerText] = useState(existingDream?.prayerText || '');
  const [coverImage, setCoverImage] = useState(existingDream?.coverImage || null);
  const [showChecklist, setShowChecklist] = useState(false);
  const [checklist, setChecklist] = useState({ excites: false, clear: false, values: false });
  const [showNewSphere, setShowNewSphere] = useState(false);
  const [newSphereName, setNewSphereName] = useState('');

  const inputStyle = { width: '100%', padding: '14px 16px', background: COLORS.bg, border: `1px solid ${COLORS.border}`, borderRadius: '12px', color: COLORS.text, fontSize: '16px', outline: 'none', fontFamily: 'inherit' };
  const labelStyle = { display: 'block', fontSize: '12px', color: COLORS.textMuted, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' };

  const handleSubmit = () => {
    if (!title.trim()) return;
    if (type === 'dream' && !existingDream) { setShowChecklist(true); return; }
    saveDream();
  };

  const saveDream = () => {
    onSave({
      id: existingDream?.id || `dream_${Date.now()}`,
      type, title,
      description: type === 'dream' ? description : '',
      sphereId: type === 'dream' ? sphereId : null,
      periodType: type === 'dream' ? periodType : null,
      periodYears: periodType === 'years' ? periodYears : null,
      periodDate: periodType === 'date' ? periodDate : null,
      prayerText: type === 'prayer' ? prayerText : null,
      coverImage,
      isFocused: existingDream?.isFocused || false,
      isLeading: existingDream?.isLeading || false,
      status: 'active',
      createdAt: existingDream?.createdAt || new Date().toISOString(),
      sortOrder: existingDream?.sortOrder,
    });
  };

  const handleAddSphere = () => {
    if (newSphereName.trim()) {
      const newSphere = { id: `sphere_${Date.now()}`, name: newSphereName.trim(), isDefault: false, sortOrder: spheres.length + 1 };
      onAddSphere(newSphere);
      setSphereId(newSphere.id);
      setNewSphereName('');
      setShowNewSphere(false);
    }
  };

  if (showChecklist) {
    const allChecked = checklist.excites && checklist.clear && checklist.values;
    return (
      <div>
        <div style={{ padding: '16px', background: `${COLORS.gold}10`, borderRadius: '12px', marginBottom: '20px', border: `1px solid ${COLORS.gold}30` }}>
          <p style={{ fontSize: '12px', color: COLORS.goldDark, marginBottom: '8px' }}>Проверяем мечту:</p>
          <p style={{ fontSize: '18px', color: COLORS.gold, fontWeight: '600', fontFamily: 'Georgia, serif' }}>{title}</p>
        </div>
        <p style={{ color: COLORS.textMuted, marginBottom: '20px', fontSize: '14px' }}>Убедитесь, что ваша мечта соответствует критериям:</p>
        {[{ key: 'excites', label: 'Зажигает и возбуждает?' }, { key: 'clear', label: 'Возникает ясный образ?' }, { key: 'values', label: 'Соответствует ценностям?' }].map((item) => (
          <label key={item.key} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: checklist[item.key] ? `${COLORS.gold}10` : COLORS.bg, borderRadius: '12px', marginBottom: '12px', cursor: 'pointer', border: `1px solid ${checklist[item.key] ? COLORS.gold : COLORS.border}` }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '6px', border: `2px solid ${checklist[item.key] ? COLORS.gold : COLORS.textDark}`, background: checklist[item.key] ? COLORS.gold : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {checklist[item.key] && <Check style={{ width: '14px', height: '14px', color: COLORS.bg }} />}
            </div>
            <input type="checkbox" checked={checklist[item.key]} onChange={(e) => setChecklist({ ...checklist, [item.key]: e.target.checked })} style={{ display: 'none' }} />
            <span style={{ color: COLORS.text, fontSize: '15px' }}>{item.label}</span>
          </label>
        ))}
        <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
          <button onClick={() => setShowChecklist(false)} style={{ flex: 1, padding: '16px', background: COLORS.bg, border: `1px solid ${COLORS.border}`, borderRadius: '12px', color: COLORS.text, fontSize: '15px', cursor: 'pointer' }}>Назад</button>
          <button onClick={saveDream} disabled={!allChecked} style={{ flex: 1, padding: '16px', background: allChecked ? `linear-gradient(135deg, ${COLORS.goldDark} 0%, ${COLORS.gold} 100%)` : COLORS.bgCard, border: 'none', borderRadius: '12px', color: allChecked ? COLORS.bg : COLORS.textDark, fontSize: '15px', fontWeight: '600', cursor: allChecked ? 'pointer' : 'not-allowed' }}>Создать</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <label style={labelStyle}>Тип</label>
        <div style={{ display: 'flex', gap: '12px' }}>
          {[{ id: 'dream', label: 'Мечта', icon: Moon }, { id: 'prayer', label: 'Аффирмация', icon: Sparkles }].map((t) => {
            const Icon = t.icon;
            return (
              <button key={t.id} onClick={() => setType(t.id)} style={{ flex: 1, padding: '14px', background: type === t.id ? (t.id === 'prayer' ? `${COLORS.prayer}20` : `${COLORS.gold}15`) : COLORS.bg, border: `1px solid ${type === t.id ? (t.id === 'prayer' ? COLORS.prayer : COLORS.gold) : COLORS.border}`, borderRadius: '12px', color: type === t.id ? (t.id === 'prayer' ? COLORS.prayerLight : COLORS.gold) : COLORS.textMuted, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <Icon style={{ width: '18px', height: '18px' }} />{t.label}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={labelStyle}>Название</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={type === 'dream' ? 'Финансовая свобода' : 'Благодарность миру'} style={inputStyle} />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={labelStyle}>{type === 'prayer' ? 'Текст аффирмации' : 'Описание'}</label>
        <textarea value={type === 'prayer' ? prayerText : description} onChange={(e) => type === 'prayer' ? setPrayerText(e.target.value) : setDescription(e.target.value)} placeholder={type === 'dream' ? 'Опишите вашу мечту...' : 'Текст аффирмации...'} rows={3} style={{ ...inputStyle, resize: 'none' }} />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <ImageUploader value={coverImage} onChange={setCoverImage} label="Обложка" />
      </div>

      {type === 'dream' && (
        <>
          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Сфера жизни</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {spheres.map((s) => {
                const Icon = SPHERE_ICONS[s.id] || Star;
                return (
                  <button key={s.id} onClick={() => setSphereId(s.id)} style={{ padding: '10px 14px', background: sphereId === s.id ? `${COLORS.gold}15` : COLORS.bg, border: `1px solid ${sphereId === s.id ? COLORS.gold : COLORS.border}`, borderRadius: '10px', color: sphereId === s.id ? COLORS.gold : COLORS.textMuted, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Icon style={{ width: '14px', height: '14px' }} />{s.name}
                  </button>
                );
              })}
              <button onClick={() => setShowNewSphere(true)} style={{ padding: '10px 14px', background: COLORS.bg, border: `1px dashed ${COLORS.border}`, borderRadius: '10px', color: COLORS.textMuted, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Plus style={{ width: '14px', height: '14px' }} />Новая
              </button>
            </div>
            {showNewSphere && (
              <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
                <input type="text" value={newSphereName} onChange={(e) => setNewSphereName(e.target.value)} placeholder="Название сферы" style={{ ...inputStyle, flex: 1 }} autoFocus />
                <button onClick={handleAddSphere} disabled={!newSphereName.trim()} style={{ padding: '12px 16px', background: newSphereName.trim() ? COLORS.gold : COLORS.bgCard, border: 'none', borderRadius: '12px', color: newSphereName.trim() ? COLORS.bg : COLORS.textDark, cursor: newSphereName.trim() ? 'pointer' : 'not-allowed' }}><Check style={{ width: '18px', height: '18px' }} /></button>
                <button onClick={() => { setShowNewSphere(false); setNewSphereName(''); }} style={{ padding: '12px 16px', background: COLORS.bg, border: `1px solid ${COLORS.border}`, borderRadius: '12px', color: COLORS.textMuted, cursor: 'pointer' }}><X style={{ width: '18px', height: '18px' }} /></button>
              </div>
            )}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Срок достижения</label>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
              {[{ id: 'years', label: 'Через N лет' }, { id: 'date', label: 'К дате' }].map((p) => (
                <button key={p.id} onClick={() => setPeriodType(p.id)} style={{ flex: 1, padding: '12px', background: periodType === p.id ? `${COLORS.gold}15` : COLORS.bg, border: `1px solid ${periodType === p.id ? COLORS.gold : COLORS.border}`, borderRadius: '10px', color: periodType === p.id ? COLORS.gold : COLORS.textMuted, fontSize: '13px', cursor: 'pointer' }}>{p.label}</button>
              ))}
            </div>
            {periodType === 'years' ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <input type="range" min="1" max="15" value={periodYears} onChange={(e) => setPeriodYears(Number(e.target.value))} style={{ flex: 1, accentColor: COLORS.gold }} />
                <span style={{ color: COLORS.gold, fontWeight: '600', minWidth: '70px' }}>{periodYears} {periodYears === 1 ? 'год' : periodYears < 5 ? 'года' : 'лет'}</span>
              </div>
            ) : (
              <input type="date" value={periodDate} onChange={(e) => setPeriodDate(e.target.value)} style={inputStyle} />
            )}
          </div>
        </>
      )}

      <button onClick={handleSubmit} disabled={!title.trim()} style={{ width: '100%', padding: '16px', background: title.trim() ? `linear-gradient(135deg, ${COLORS.goldDark} 0%, ${COLORS.gold} 100%)` : COLORS.bgCard, border: 'none', borderRadius: '12px', color: title.trim() ? COLORS.bg : COLORS.textDark, fontSize: '16px', fontWeight: '600', cursor: title.trim() ? 'pointer' : 'not-allowed', marginTop: '12px' }}>
        {existingDream ? 'Сохранить' : type === 'dream' ? 'Далее' : 'Создать'}
      </button>
    </div>
  );
};

// ============================================
// ДЕТАЛЬНЫЙ ПРОСМОТР МЕЧТЫ
// ============================================
const DreamDetail = ({ dream, sphere, onClose, onEdit, onToggleFocus, onSetLeading, onArchive, onAchieve, isFocused, isLeading }) => {
  const isPrayer = dream.type === 'prayer';
  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(20px)', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 100, padding: '20px', overflowY: 'auto' }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: '340px', display: 'flex', flexDirection: 'column', gap: '16px', paddingTop: '40px', paddingBottom: '40px' }}>
        <div style={{ position: 'relative', width: '100%', paddingBottom: '140%', borderRadius: '20px', overflow: 'hidden', background: dream.coverImage ? `url(${dream.coverImage}) center/cover` : `linear-gradient(135deg, ${COLORS.bgCard} 0%, ${COLORS.bg} 100%)`, border: `2px solid ${isLeading ? COLORS.gold : COLORS.border}`, boxShadow: `0 20px 60px rgba(0,0,0,0.5)` }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.6) 100%)' }} />
          
          {isFocused && (
            <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', gap: '8px', zIndex: 2 }}>
              <AllSeeingEye size={24} color={COLORS.gold} filled={true} />
              {isLeading && <Star style={{ width: '22px', height: '22px', color: COLORS.gold, fill: COLORS.gold, filter: `drop-shadow(0 0 6px ${COLORS.gold})` }} />}
            </div>
          )}
          
          <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px', width: '40px', height: '40px', background: `${COLORS.bg}cc`, border: `1px solid ${COLORS.border}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 2 }}>
            <X style={{ width: '20px', height: '20px', color: COLORS.text }} />
          </button>
          
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 20px', zIndex: 1 }}>
            {sphere && <p style={{ fontSize: '11px', color: COLORS.goldDark, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>{sphere.name}</p>}
            {isPrayer && <p style={{ fontSize: '11px', color: COLORS.prayerLight, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Аффирмация</p>}
            <h2 style={{ fontSize: '22px', fontWeight: '600', color: COLORS.text, marginBottom: '12px', fontFamily: 'Georgia, serif', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>{dream.title}</h2>
            <p style={{ fontSize: '14px', color: COLORS.textMuted, lineHeight: '1.6', marginBottom: '16px' }}>{dream.description || dream.prayerText || 'Без описания'}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', paddingTop: '12px', borderTop: `1px solid ${COLORS.border}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar style={{ width: '14px', height: '14px', color: COLORS.textDark }} />
                <span style={{ fontSize: '12px', color: COLORS.textMuted }}>{formatDate(dream.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button onClick={onEdit} style={{ padding: '14px', background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: '12px', color: COLORS.text, fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <Edit3 style={{ width: '18px', height: '18px' }} />Редактировать
          </button>
          
          {dream.type === 'dream' && (
            <>
              <button onClick={onToggleFocus} style={{ padding: '14px', background: isFocused ? `${COLORS.gold}15` : COLORS.bgCard, border: `1px solid ${isFocused ? COLORS.gold : COLORS.border}`, borderRadius: '12px', color: isFocused ? COLORS.gold : COLORS.text, fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <AllSeeingEye size={18} color={isFocused ? COLORS.gold : COLORS.text} />{isFocused ? 'Убрать из фокуса' : 'В фокус'}
              </button>
              {isFocused && !isLeading && (
                <button onClick={onSetLeading} style={{ padding: '14px', background: `${COLORS.gold}15`, border: `1px solid ${COLORS.gold}`, borderRadius: '12px', color: COLORS.gold, fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Star style={{ width: '18px', height: '18px', fill: COLORS.gold }} />Сделать ведущей
                </button>
              )}
              <button onClick={onAchieve} style={{ padding: '14px', background: `${COLORS.success}15`, border: `1px solid ${COLORS.success}`, borderRadius: '12px', color: COLORS.success, fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <Trophy style={{ width: '18px', height: '18px' }} />Мечта достигнута!
              </button>
            </>
          )}
          
          <button onClick={onArchive} style={{ padding: '14px', background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: '12px', color: COLORS.textMuted, fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <Archive style={{ width: '18px', height: '18px' }} />В архив
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// ЭКРАН МЕЧТЫ
// ============================================
const DreamScreen = ({ data, saveData }) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedDream, setSelectedDream] = useState(null);
  const [editingDream, setEditingDream] = useState(null);
  const [flippedCards, setFlippedCards] = useState({});
  const [showFocusSelect, setShowFocusSelect] = useState(false);
  const [pendingFocusDream, setPendingFocusDream] = useState(null);

  const activeDreams = data.dreams.filter(d => d.status === 'active');
  const sortedDreams = sortDreams(activeDreams);
  const focusedDreams = activeDreams.filter(d => d.isFocused);

  const handleFlip = (dreamId) => setFlippedCards(prev => ({ ...prev, [dreamId]: !prev[dreamId] }));

  const handleSaveDream = (dream) => {
    const existingIndex = data.dreams.findIndex(d => d.id === dream.id);
    let newDreams;
    if (existingIndex >= 0) {
      newDreams = [...data.dreams];
      newDreams[existingIndex] = dream;
    } else {
      dream.sortOrder = Math.max(0, ...data.dreams.map(d => d.sortOrder || 0)) + 1;
      newDreams = [...data.dreams, dream];
    }
    saveData({ ...data, dreams: newDreams });
    setShowForm(false);
    setEditingDream(null);
  };

  const handleAddSphere = (newSphere) => saveData({ ...data, spheres: [...data.spheres, newSphere] });

  const handleToggleFocus = (dream) => {
    if (dream.isFocused) {
      saveData({ ...data, dreams: data.dreams.map(d => d.id === dream.id ? { ...d, isFocused: false, isLeading: false } : d) });
    } else {
      if (focusedDreams.length >= 3) {
        setPendingFocusDream(dream);
        setShowFocusSelect(true);
      } else {
        saveData({ ...data, dreams: data.dreams.map(d => d.id === dream.id ? { ...d, isFocused: true, isLeading: focusedDreams.length === 0 } : d) });
      }
    }
    setSelectedDream(null);
  };

  const handleSetLeading = (dream) => {
    saveData({ ...data, dreams: data.dreams.map(d => ({ ...d, isLeading: d.id === dream.id })) });
    setSelectedDream(null);
  };

  const handleReplaceFocus = (oldDream) => {
    saveData({ ...data, dreams: data.dreams.map(d => {
      if (d.id === oldDream.id) return { ...d, isFocused: false, isLeading: false };
      if (d.id === pendingFocusDream.id) return { ...d, isFocused: true, isLeading: oldDream.isLeading };
      return d;
    })});
    setShowFocusSelect(false);
    setPendingFocusDream(null);
  };

  const handleArchive = (dream) => {
    saveData({ ...data, dreams: data.dreams.map(d => d.id === dream.id ? { ...d, status: 'archived', isFocused: false, isLeading: false } : d) });
    setSelectedDream(null);
  };

  const handleAchieve = (dream) => {
    saveData({ ...data, dreams: data.dreams.map(d => d.id === dream.id ? { ...d, status: 'achieved', achievedAt: new Date().toISOString(), isFocused: false, isLeading: false } : d) });
    setSelectedDream(null);
  };

  return (
    <div style={{ minHeight: '100vh', background: COLORS.bg, paddingBottom: '100px' }}>
      <div style={{ padding: '20px', paddingTop: '60px', background: `linear-gradient(to bottom, ${COLORS.bgCard} 0%, ${COLORS.bg} 100%)` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '600', color: COLORS.text, fontFamily: 'Georgia, serif' }}>Мои Мечты</h1>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{ width: '40px', height: '40px', background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Archive style={{ width: '18px', height: '18px', color: COLORS.textMuted }} />
            </button>
            <button style={{ width: '40px', height: '40px', background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Trophy style={{ width: '18px', height: '18px', color: COLORS.gold }} />
            </button>
          </div>
        </div>

        {focusedDreams.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <p style={{ fontSize: '11px', color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AllSeeingEye size={14} color={COLORS.textMuted} />В фокусе
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {focusedDreams.map((d) => (
                <div key={d.id} style={{ padding: '8px 14px', background: d.isLeading ? `${COLORS.gold}20` : COLORS.bgCard, border: `1px solid ${d.isLeading ? COLORS.gold : COLORS.border}`, borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {d.isLeading && <Star style={{ width: '12px', height: '12px', color: COLORS.gold, fill: COLORS.gold }} />}
                  <span style={{ fontSize: '12px', color: d.isLeading ? COLORS.gold : COLORS.text }}>{d.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ padding: '20px' }}>
        {sortedDreams.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ width: '80px', height: '80px', background: `radial-gradient(circle, ${COLORS.gold}15 0%, transparent 70%)`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <Moon style={{ width: '40px', height: '40px', color: COLORS.gold, opacity: 0.5 }} />
            </div>
            <h3 style={{ color: COLORS.text, fontSize: '18px', marginBottom: '8px', fontFamily: 'Georgia, serif' }}>Колода пуста</h3>
            <p style={{ color: COLORS.textMuted, fontSize: '14px' }}>Добавьте свою первую мечту</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            {sortedDreams.map((dream) => (
              <DreamCard key={dream.id} dream={dream} sphere={data.spheres.find(s => s.id === dream.sphereId)} isFocused={dream.isFocused} isLeading={dream.isLeading} isFlipped={flippedCards[dream.id] || false} onFlip={handleFlip} onClick={(d) => setSelectedDream(d)} />
            ))}
          </div>
        )}
      </div>

      <button onClick={() => setShowForm(true)} style={{ position: 'fixed', right: '20px', bottom: '100px', width: '56px', height: '56px', background: `linear-gradient(135deg, ${COLORS.goldDark} 0%, ${COLORS.gold} 100%)`, border: 'none', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: `0 8px 24px ${COLORS.gold}40` }}>
        <Plus style={{ width: '24px', height: '24px', color: COLORS.bg }} />
      </button>

      <Modal isOpen={showForm} onClose={() => { setShowForm(false); setEditingDream(null); }} title={editingDream ? 'Редактировать' : 'Новая мечта'}>
        <DreamForm spheres={data.spheres} existingDream={editingDream} onSave={handleSaveDream} onClose={() => { setShowForm(false); setEditingDream(null); }} onAddSphere={handleAddSphere} />
      </Modal>

      {selectedDream && (
        <DreamDetail dream={selectedDream} sphere={data.spheres.find(s => s.id === selectedDream.sphereId)} isFocused={selectedDream.isFocused} isLeading={selectedDream.isLeading} onClose={() => setSelectedDream(null)} onEdit={() => { setEditingDream(selectedDream); setSelectedDream(null); setShowForm(true); }} onToggleFocus={() => handleToggleFocus(selectedDream)} onSetLeading={() => handleSetLeading(selectedDream)} onArchive={() => handleArchive(selectedDream)} onAchieve={() => handleAchieve(selectedDream)} />
      )}

      <Modal isOpen={showFocusSelect} onClose={() => { setShowFocusSelect(false); setPendingFocusDream(null); }} title="Выберите мечту для замены">
        <p style={{ color: COLORS.textMuted, marginBottom: '20px', fontSize: '14px' }}>У вас уже 3 мечты в фокусе. Какую заменить?</p>
        {focusedDreams.map((d) => (
          <button key={d.id} onClick={() => handleReplaceFocus(d)} style={{ width: '100%', padding: '16px', background: COLORS.bg, border: `1px solid ${COLORS.border}`, borderRadius: '12px', color: COLORS.text, fontSize: '15px', cursor: 'pointer', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {d.isLeading && <Star style={{ width: '16px', height: '16px', color: COLORS.gold, fill: COLORS.gold }} />}{d.title}
            </span>
            <ChevronRight style={{ width: '18px', height: '18px', color: COLORS.textMuted }} />
          </button>
        ))}
      </Modal>
    </div>
  );
};

// ============================================
// КАРТОЧКА ЦЕЛИ
// ============================================
const GoalCard = ({ goal, dream, criteria, onClick }) => {
  const progress = calculateGoalProgress(goal, criteria);
  const priority = GOAL_PRIORITIES.find(p => p.id === goal.priority) || GOAL_PRIORITIES[0];
  
  return (
    <div onClick={onClick} style={{
      background: COLORS.bgCard,
      borderRadius: '16px',
      padding: '16px',
      border: `1px solid ${goal.priority === 'strategic_focus' ? COLORS.gold + '40' : COLORS.border}`,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
        <div style={{
          width: '44px',
          height: '44px',
          background: COLORS.bg,
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          flexShrink: 0,
        }}>
          {goal.icon || '🎯'}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{
            fontSize: '15px',
            fontWeight: '600',
            color: COLORS.text,
            marginBottom: '4px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>{goal.title}</h3>
          {dream && (
            <p style={{
              fontSize: '11px',
              color: COLORS.gold,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}>
              <Moon style={{ width: '10px', height: '10px' }} />
              {dream.title}
            </p>
          )}
        </div>
        {goal.priority !== 'none' && (
          <div style={{
            padding: '4px 8px',
            background: `${priority.color}15`,
            borderRadius: '6px',
          }}>
            <span style={{ fontSize: '10px', color: priority.color, fontWeight: '600' }}>
              {goal.priority === 'strategic_focus' ? '⭐' : '❗'}
            </span>
          </div>
        )}
      </div>
      
      <ProgressBar value={progress} height={6} />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
        <span style={{ fontSize: '12px', color: COLORS.textMuted }}>
          {criteria.filter(c => c.goalId === goal.id).length} критериев
        </span>
        <span style={{ fontSize: '13px', color: COLORS.gold, fontWeight: '600' }}>{progress}%</span>
      </div>
    </div>
  );
};

// ============================================
// ФОРМА КРИТЕРИЯ
// ============================================
const CriteriaForm = ({ onSave, onClose, existingCriteria }) => {
  const [type, setType] = useState(existingCriteria?.type || 'numeric');
  const [name, setName] = useState(existingCriteria?.name || '');
  const [numericType, setNumericType] = useState(existingCriteria?.numericType || 'count');
  const [customUnit, setCustomUnit] = useState(existingCriteria?.unit || '');
  const [targetValue, setTargetValue] = useState(existingCriteria?.targetValue || '');

  const inputStyle = { width: '100%', padding: '14px 16px', background: COLORS.bg, border: `1px solid ${COLORS.border}`, borderRadius: '12px', color: COLORS.text, fontSize: '16px', outline: 'none' };
  const labelStyle = { display: 'block', fontSize: '12px', color: COLORS.textMuted, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' };

  const selectedNumeric = NUMERIC_TYPES.find(n => n.id === numericType);
  const unit = numericType === 'custom' ? customUnit : selectedNumeric?.unit || '';

  const handleSave = () => {
    if (!name.trim()) return;
    onSave({
      id: existingCriteria?.id || `criteria_${Date.now()}`,
      type,
      name,
      numericType: type === 'numeric' ? numericType : null,
      unit: type === 'numeric' ? unit : null,
      targetValue: type === 'numeric' ? Number(targetValue) || 0 : null,
      actualValue: existingCriteria?.actualValue || 0,
      isCompleted: existingCriteria?.isCompleted || false,
    });
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <label style={labelStyle}>Тип критерия</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {CRITERIA_TYPES.map((t) => (
            <button key={t.id} onClick={() => setType(t.id)} style={{
              padding: '12px 16px',
              background: type === t.id ? `${COLORS.gold}15` : COLORS.bg,
              border: `1px solid ${type === t.id ? COLORS.gold : COLORS.border}`,
              borderRadius: '12px',
              color: type === t.id ? COLORS.gold : COLORS.text,
              fontSize: '14px',
              cursor: 'pointer',
              textAlign: 'left',
            }}>
              <span style={{ fontWeight: '600' }}>{t.label}</span>
              <span style={{ color: COLORS.textMuted, marginLeft: '8px', fontSize: '12px' }}>— {t.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={labelStyle}>Название</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Например: Выручка, Вес, Книг прочитано" style={inputStyle} />
      </div>

      {type === 'numeric' && (
        <>
          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Единица измерения</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {NUMERIC_TYPES.map((n) => (
                <button key={n.id} onClick={() => setNumericType(n.id)} style={{
                  padding: '10px 14px',
                  background: numericType === n.id ? `${COLORS.gold}15` : COLORS.bg,
                  border: `1px solid ${numericType === n.id ? COLORS.gold : COLORS.border}`,
                  borderRadius: '10px',
                  color: numericType === n.id ? COLORS.gold : COLORS.textMuted,
                  fontSize: '13px',
                  cursor: 'pointer',
                }}>
                  {n.label} {n.unit && `(${n.unit})`}
                </button>
              ))}
            </div>
            {numericType === 'custom' && (
              <input type="text" value={customUnit} onChange={(e) => setCustomUnit(e.target.value)} placeholder="Своя единица" style={{ ...inputStyle, marginTop: '12px' }} />
            )}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Целевое значение</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input type="number" value={targetValue} onChange={(e) => setTargetValue(e.target.value)} placeholder="0" style={{ ...inputStyle, flex: 1 }} />
              {unit && <span style={{ color: COLORS.textMuted, fontSize: '14px' }}>{unit}</span>}
            </div>
          </div>
        </>
      )}

      <div style={{ display: 'flex', gap: '12px' }}>
        <button onClick={onClose} style={{ flex: 1, padding: '16px', background: COLORS.bg, border: `1px solid ${COLORS.border}`, borderRadius: '12px', color: COLORS.text, fontSize: '15px', cursor: 'pointer' }}>Отмена</button>
        <button onClick={handleSave} disabled={!name.trim()} style={{ flex: 1, padding: '16px', background: name.trim() ? COLORS.gold : COLORS.bgCard, border: 'none', borderRadius: '12px', color: name.trim() ? COLORS.bg : COLORS.textDark, fontSize: '15px', fontWeight: '600', cursor: name.trim() ? 'pointer' : 'not-allowed' }}>Сохранить</button>
      </div>
    </div>
  );
};

// ============================================
// ФОРМА СОЗДАНИЯ ЦЕЛИ
// ============================================
const GoalForm = ({ dreams, criteria: allCriteria, onSave, onClose, existingGoal, onSaveCriteria }) => {
  const [title, setTitle] = useState(existingGoal?.title || '');
  const [description, setDescription] = useState(existingGoal?.description || '');
  const [icon, setIcon] = useState(existingGoal?.icon || '🎯');
  const [dreamId, setDreamId] = useState(existingGoal?.dreamId || dreams[0]?.id || '');
  const [priority, setPriority] = useState(existingGoal?.priority || 'none');
  const [deadline, setDeadline] = useState(existingGoal?.deadline || '');
  const [rewardText, setRewardText] = useState(existingGoal?.rewardText || '');
  const [rewardImage, setRewardImage] = useState(existingGoal?.rewardImage || null);
  const [criteria, setCriteria] = useState(existingGoal ? allCriteria.filter(c => c.goalId === existingGoal.id) : []);
  const [showCriteriaForm, setShowCriteriaForm] = useState(false);
  const [editingCriteria, setEditingCriteria] = useState(null);
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  const [checklist, setChecklist] = useState({ dream: false, measurable: false, realistic: false });

  const activeDreams = dreams.filter(d => d.status === 'active' && d.type === 'dream');
  const currentYear = new Date().getFullYear();

  const inputStyle = { width: '100%', padding: '14px 16px', background: COLORS.bg, border: `1px solid ${COLORS.border}`, borderRadius: '12px', color: COLORS.text, fontSize: '16px', outline: 'none' };
  const labelStyle = { display: 'block', fontSize: '12px', color: COLORS.textMuted, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' };

  const handleSubmit = () => {
    if (!title.trim() || !dreamId) return;
    if (!existingGoal) { setShowChecklist(true); return; }
    saveGoal();
  };

  const saveGoal = () => {
    const goalId = existingGoal?.id || `goal_${Date.now()}`;
    const goal = {
      id: goalId,
      title,
      description,
      icon,
      dreamId,
      year: currentYear,
      priority,
      deadline: deadline || null,
      rewardText: rewardText || null,
      rewardImage: rewardImage || null,
      status: 'active',
      createdAt: existingGoal?.createdAt || new Date().toISOString(),
    };
    
    // Сохраняем критерии с привязкой к цели
    const goalCriteria = criteria.map(c => ({ ...c, goalId }));
    
    onSave(goal, goalCriteria);
  };

  const handleSaveCriteria = (newCriteria) => {
    if (editingCriteria) {
      setCriteria(criteria.map(c => c.id === editingCriteria.id ? newCriteria : c));
    } else {
      setCriteria([...criteria, newCriteria]);
    }
    setShowCriteriaForm(false);
    setEditingCriteria(null);
  };

  const handleDeleteCriteria = (id) => {
    setCriteria(criteria.filter(c => c.id !== id));
  };

  if (showChecklist) {
    const allChecked = checklist.dream && checklist.measurable && checklist.realistic;
    return (
      <div>
        <div style={{ padding: '16px', background: `${COLORS.gold}10`, borderRadius: '12px', marginBottom: '20px', border: `1px solid ${COLORS.gold}30` }}>
          <p style={{ fontSize: '12px', color: COLORS.goldDark, marginBottom: '8px' }}>Проверяем цель:</p>
          <p style={{ fontSize: '18px', color: COLORS.gold, fontWeight: '600', fontFamily: 'Georgia, serif' }}>{icon} {title}</p>
        </div>
        <p style={{ color: COLORS.textMuted, marginBottom: '20px', fontSize: '14px' }}>Убедитесь, что цель соответствует критериям:</p>
        {[{ key: 'dream', label: 'Приближает к мечте?' }, { key: 'measurable', label: 'Есть измеримые показатели?' }, { key: 'realistic', label: 'Цель реалистична?' }].map((item) => (
          <label key={item.key} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: checklist[item.key] ? `${COLORS.gold}10` : COLORS.bg, borderRadius: '12px', marginBottom: '12px', cursor: 'pointer', border: `1px solid ${checklist[item.key] ? COLORS.gold : COLORS.border}` }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '6px', border: `2px solid ${checklist[item.key] ? COLORS.gold : COLORS.textDark}`, background: checklist[item.key] ? COLORS.gold : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {checklist[item.key] && <Check style={{ width: '14px', height: '14px', color: COLORS.bg }} />}
            </div>
            <input type="checkbox" checked={checklist[item.key]} onChange={(e) => setChecklist({ ...checklist, [item.key]: e.target.checked })} style={{ display: 'none' }} />
            <span style={{ color: COLORS.text, fontSize: '15px' }}>{item.label}</span>
          </label>
        ))}
        <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
          <button onClick={() => setShowChecklist(false)} style={{ flex: 1, padding: '16px', background: COLORS.bg, border: `1px solid ${COLORS.border}`, borderRadius: '12px', color: COLORS.text, fontSize: '15px', cursor: 'pointer' }}>Назад</button>
          <button onClick={saveGoal} disabled={!allChecked} style={{ flex: 1, padding: '16px', background: allChecked ? COLORS.gold : COLORS.bgCard, border: 'none', borderRadius: '12px', color: allChecked ? COLORS.bg : COLORS.textDark, fontSize: '15px', fontWeight: '600', cursor: allChecked ? 'pointer' : 'not-allowed' }}>Создать</button>
        </div>
      </div>
    );
  }

  if (showCriteriaForm) {
    return <CriteriaForm existingCriteria={editingCriteria} onSave={handleSaveCriteria} onClose={() => { setShowCriteriaForm(false); setEditingCriteria(null); }} />;
  }

  return (
    <div>
      {/* Иконка */}
      <div style={{ marginBottom: '20px' }}>
        <label style={labelStyle}>Иконка</label>
        <button onClick={() => setShowIconPicker(!showIconPicker)} style={{
          width: '64px', height: '64px', background: COLORS.bg, border: `1px solid ${COLORS.border}`,
          borderRadius: '16px', fontSize: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {icon}
        </button>
        {showIconPicker && (
          <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '12px', background: COLORS.bg, borderRadius: '12px', border: `1px solid ${COLORS.border}` }}>
            {GOAL_ICONS.map((i) => (
              <button key={i} onClick={() => { setIcon(i); setShowIconPicker(false); }} style={{
                width: '44px', height: '44px', background: icon === i ? `${COLORS.gold}20` : 'transparent',
                border: `1px solid ${icon === i ? COLORS.gold : 'transparent'}`,
                borderRadius: '10px', fontSize: '24px', cursor: 'pointer',
              }}>
                {i}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Название */}
      <div style={{ marginBottom: '20px' }}>
        <label style={labelStyle}>Название</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Заработать 1 млн рублей" style={inputStyle} />
      </div>

      {/* Описание */}
      <div style={{ marginBottom: '20px' }}>
        <label style={labelStyle}>Описание</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Подробности цели..." rows={2} style={{ ...inputStyle, resize: 'none' }} />
      </div>

      {/* Мечта */}
      <div style={{ marginBottom: '20px' }}>
        <label style={labelStyle}>Связанная мечта *</label>
        {activeDreams.length === 0 ? (
          <div style={{ padding: '16px', background: `${COLORS.danger}15`, borderRadius: '12px', border: `1px solid ${COLORS.danger}30` }}>
            <p style={{ color: COLORS.danger, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle style={{ width: '16px', height: '16px' }} />
              Сначала создайте мечту
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {activeDreams.map((d) => (
              <button key={d.id} onClick={() => setDreamId(d.id)} style={{
                padding: '12px 16px',
                background: dreamId === d.id ? `${COLORS.gold}15` : COLORS.bg,
                border: `1px solid ${dreamId === d.id ? COLORS.gold : COLORS.border}`,
                borderRadius: '12px',
                color: dreamId === d.id ? COLORS.gold : COLORS.text,
                fontSize: '14px',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <Moon style={{ width: '16px', height: '16px' }} />
                {d.title}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Приоритет */}
      <div style={{ marginBottom: '20px' }}>
        <label style={labelStyle}>Приоритет</label>
        <div style={{ display: 'flex', gap: '8px' }}>
          {GOAL_PRIORITIES.map((p) => (
            <button key={p.id} onClick={() => setPriority(p.id)} style={{
              flex: 1,
              padding: '12px 8px',
              background: priority === p.id ? `${p.color}15` : COLORS.bg,
              border: `1px solid ${priority === p.id ? p.color : COLORS.border}`,
              borderRadius: '10px',
              color: priority === p.id ? p.color : COLORS.textMuted,
              fontSize: '12px',
              cursor: 'pointer',
            }}>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Дедлайн */}
      <div style={{ marginBottom: '20px' }}>
        <label style={labelStyle}>Дедлайн (опционально)</label>
        <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} style={inputStyle} />
      </div>

      {/* Критерии */}
      <div style={{ marginBottom: '20px' }}>
        <label style={labelStyle}>Критерии измеримости (до 3)</label>
        {criteria.map((c) => (
          <div key={c.id} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            background: COLORS.bg,
            borderRadius: '12px',
            marginBottom: '8px',
            border: `1px solid ${COLORS.border}`,
          }}>
            <div>
              <p style={{ color: COLORS.text, fontSize: '14px', fontWeight: '500' }}>{c.name}</p>
              <p style={{ color: COLORS.textMuted, fontSize: '12px' }}>
                {c.type === 'numeric' ? `${c.targetValue} ${c.unit}` : c.type === 'boolean' ? 'Да/Нет' : 'Текст'}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => { setEditingCriteria(c); setShowCriteriaForm(true); }} style={{ padding: '8px', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                <Edit3 style={{ width: '16px', height: '16px', color: COLORS.textMuted }} />
              </button>
              <button onClick={() => handleDeleteCriteria(c.id)} style={{ padding: '8px', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                <X style={{ width: '16px', height: '16px', color: COLORS.danger }} />
              </button>
            </div>
          </div>
        ))}
        {criteria.length < 3 && (
          <button onClick={() => setShowCriteriaForm(true)} style={{
            width: '100%',
            padding: '14px',
            background: COLORS.bg,
            border: `2px dashed ${COLORS.border}`,
            borderRadius: '12px',
            color: COLORS.textMuted,
            fontSize: '14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}>
            <Plus style={{ width: '18px', height: '18px' }} />
            Добавить критерий
          </button>
        )}
      </div>

      {/* Награда */}
      <div style={{ marginBottom: '20px' }}>
        <label style={labelStyle}>Награда за достижение</label>
        <input type="text" value={rewardText} onChange={(e) => setRewardText(e.target.value)} placeholder="Поездка на море, новый гаджет..." style={{ ...inputStyle, marginBottom: '12px' }} />
        <ImageUploader value={rewardImage} onChange={setRewardImage} label="" />
      </div>

      {/* Кнопка сохранения */}
      <button onClick={handleSubmit} disabled={!title.trim() || !dreamId || activeDreams.length === 0} style={{
        width: '100%',
        padding: '16px',
        background: (title.trim() && dreamId) ? `linear-gradient(135deg, ${COLORS.goldDark} 0%, ${COLORS.gold} 100%)` : COLORS.bgCard,
        border: 'none',
        borderRadius: '12px',
        color: (title.trim() && dreamId) ? COLORS.bg : COLORS.textDark,
        fontSize: '16px',
        fontWeight: '600',
        cursor: (title.trim() && dreamId) ? 'pointer' : 'not-allowed',
        marginTop: '12px',
      }}>
        {existingGoal ? 'Сохранить' : 'Далее'}
      </button>
    </div>
  );
};

// ============================================
// ДЕТАЛЬНЫЙ ПРОСМОТР ЦЕЛИ
// ============================================
const GoalDetail = ({ goal, dream, criteria, onClose, onEdit, onUpdateCriteria, onArchive, onAchieve }) => {
  const progress = calculateGoalProgress(goal, criteria);
  const goalCriteria = criteria.filter(c => c.goalId === goal.id);
  const priority = GOAL_PRIORITIES.find(p => p.id === goal.priority) || GOAL_PRIORITIES[0];
  
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const [editingActual, setEditingActual] = useState(null);
  const [newActualValue, setNewActualValue] = useState('');

  const handleUpdateActual = (criteriaItem) => {
    onUpdateCriteria({ ...criteriaItem, actualValue: Number(newActualValue) || 0 });
    setEditingActual(null);
    setNewActualValue('');
  };

  const handleToggleCompleted = (criteriaItem) => {
    onUpdateCriteria({ ...criteriaItem, isCompleted: !criteriaItem.isCompleted });
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(20px)', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 100, padding: '20px', overflowY: 'auto' }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '16px', paddingTop: '40px', paddingBottom: '40px' }}>
        
        {/* Шапка */}
        <div style={{ background: COLORS.bgCard, borderRadius: '20px', padding: '24px', border: `1px solid ${goal.priority === 'strategic_focus' ? COLORS.gold + '40' : COLORS.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div style={{ fontSize: '48px' }}>{goal.icon || '🎯'}</div>
            <button onClick={onClose} style={{ width: '40px', height: '40px', background: COLORS.bg, border: `1px solid ${COLORS.border}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <X style={{ width: '20px', height: '20px', color: COLORS.text }} />
            </button>
          </div>
          
          <h2 style={{ fontSize: '22px', fontWeight: '600', color: COLORS.text, marginBottom: '8px', fontFamily: 'Georgia, serif' }}>{goal.title}</h2>
          
          {goal.description && (
            <p style={{ fontSize: '14px', color: COLORS.textMuted, lineHeight: '1.6', marginBottom: '16px' }}>{goal.description}</p>
          )}
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
            {dream && (
              <div style={{ padding: '6px 12px', background: `${COLORS.gold}15`, borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Moon style={{ width: '12px', height: '12px', color: COLORS.gold }} />
                <span style={{ fontSize: '12px', color: COLORS.gold }}>{dream.title}</span>
              </div>
            )}
            {goal.priority !== 'none' && (
              <div style={{ padding: '6px 12px', background: `${priority.color}15`, borderRadius: '20px' }}>
                <span style={{ fontSize: '12px', color: priority.color }}>{priority.label}</span>
              </div>
            )}
            <div style={{ padding: '6px 12px', background: COLORS.bg, borderRadius: '20px' }}>
              <span style={{ fontSize: '12px', color: COLORS.textMuted }}>{goal.year}</span>
            </div>
          </div>
          
          {/* Прогресс */}
          <div style={{ marginBottom: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', color: COLORS.textMuted }}>Прогресс</span>
              <span style={{ fontSize: '15px', color: COLORS.gold, fontWeight: '600' }}>{progress}%</span>
            </div>
            <ProgressBar value={progress} height={10} />
          </div>
        </div>

        {/* Критерии */}
        {goalCriteria.length > 0 && (
          <div style={{ background: COLORS.bgCard, borderRadius: '20px', padding: '20px', border: `1px solid ${COLORS.border}` }}>
            <h3 style={{ fontSize: '14px', color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>Критерии</h3>
            {goalCriteria.map((c) => (
              <div key={c.id} style={{ padding: '12px', background: COLORS.bg, borderRadius: '12px', marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ color: COLORS.text, fontWeight: '500' }}>{c.name}</span>
                  {c.type !== 'numeric' && (
                    <button onClick={() => handleToggleCompleted(c)} style={{
                      width: '28px', height: '28px',
                      background: c.isCompleted ? COLORS.success : 'transparent',
                      border: `2px solid ${c.isCompleted ? COLORS.success : COLORS.textDark}`,
                      borderRadius: '8px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer',
                    }}>
                      {c.isCompleted && <Check style={{ width: '16px', height: '16px', color: COLORS.bg }} />}
                    </button>
                  )}
                </div>
                
                {c.type === 'numeric' && (
                  <>
                    <ProgressBar value={(c.actualValue / c.targetValue) * 100} height={6} color={c.actualValue >= c.targetValue ? COLORS.success : COLORS.gold} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                      <span style={{ fontSize: '13px', color: COLORS.textMuted }}>
                        {c.actualValue || 0} / {c.targetValue} {c.unit}
                      </span>
                      {editingActual === c.id ? (
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <input type="number" value={newActualValue} onChange={(e) => setNewActualValue(e.target.value)} style={{ width: '80px', padding: '6px 10px', background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: '8px', color: COLORS.text, fontSize: '14px' }} autoFocus />
                          <button onClick={() => handleUpdateActual(c)} style={{ padding: '6px 12px', background: COLORS.gold, border: 'none', borderRadius: '8px', color: COLORS.bg, fontSize: '12px', cursor: 'pointer' }}>OK</button>
                        </div>
                      ) : (
                        <button onClick={() => { setEditingActual(c.id); setNewActualValue(String(c.actualValue || '')); }} style={{ padding: '6px 12px', background: `${COLORS.gold}15`, border: `1px solid ${COLORS.gold}`, borderRadius: '8px', color: COLORS.gold, fontSize: '12px', cursor: 'pointer' }}>
                          Обновить
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Награда */}
        {(goal.rewardText || goal.rewardImage) && (
          <div style={{ background: COLORS.bgCard, borderRadius: '20px', padding: '20px', border: `1px solid ${COLORS.border}` }}>
            <h3 style={{ fontSize: '14px', color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Award style={{ width: '14px', height: '14px' }} />Награда
            </h3>
            {goal.rewardImage && (
              <img src={goal.rewardImage} alt="Reward" style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '12px', marginBottom: '12px' }} />
            )}
            {goal.rewardText && (
              <p style={{ color: COLORS.text, fontSize: '14px' }}>{goal.rewardText}</p>
            )}
          </div>
        )}

        {/* Кнопки */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button onClick={onEdit} style={{ padding: '14px', background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: '12px', color: COLORS.text, fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <Edit3 style={{ width: '18px', height: '18px' }} />Редактировать
          </button>
          <button onClick={onAchieve} style={{ padding: '14px', background: `${COLORS.success}15`, border: `1px solid ${COLORS.success}`, borderRadius: '12px', color: COLORS.success, fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <Trophy style={{ width: '18px', height: '18px' }} />Цель достигнута!
          </button>
          <button onClick={onArchive} style={{ padding: '14px', background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: '12px', color: COLORS.textMuted, fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <Archive style={{ width: '18px', height: '18px' }} />В архив
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// ЗАЛ СЛАВЫ ЦЕЛЕЙ
// ============================================
const GoalHallOfFame = ({ goals, dreams, onClose }) => {
  const achievedGoals = goals.filter(g => g.status === 'achieved');
  
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(20px)', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 100, padding: '20px', overflowY: 'auto' }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: '400px', paddingTop: '40px', paddingBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: COLORS.gold, fontFamily: 'Georgia, serif', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Trophy style={{ width: '28px', height: '28px' }} />Зал славы
          </h2>
          <button onClick={onClose} style={{ width: '40px', height: '40px', background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <X style={{ width: '20px', height: '20px', color: COLORS.text }} />
          </button>
        </div>
        
        {achievedGoals.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <Trophy style={{ width: '48px', height: '48px', color: COLORS.textDark, marginBottom: '16px' }} />
            <p style={{ color: COLORS.textMuted, fontSize: '15px' }}>Здесь будут ваши достигнутые цели</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {achievedGoals.map((goal) => {
              const dream = dreams.find(d => d.id === goal.dreamId);
              return (
                <div key={goal.id} style={{ background: COLORS.bgCard, borderRadius: '16px', padding: '16px', border: `1px solid ${COLORS.gold}30` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ fontSize: '32px' }}>{goal.icon || '🎯'}</div>
                    <div>
                      <h3 style={{ color: COLORS.text, fontSize: '15px', fontWeight: '600', marginBottom: '4px' }}>{goal.title}</h3>
                      {dream && <p style={{ color: COLORS.gold, fontSize: '12px' }}>{dream.title}</p>}
                      {goal.achievedAt && <p style={{ color: COLORS.textMuted, fontSize: '11px', marginTop: '4px' }}>Достигнута {new Date(goal.achievedAt).toLocaleDateString('ru-RU')}</p>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================
// ЭКРАН ЦЕЛЕЙ (СТРАТЕГИЯ)
// ============================================
const StrategyScreen = ({ data, saveData }) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [editingGoal, setEditingGoal] = useState(null);
  const [showHallOfFame, setShowHallOfFame] = useState(false);
  const [filterDreamId, setFilterDreamId] = useState('all');

  const currentYear = new Date().getFullYear();
  const activeGoals = data.goals.filter(g => g.status === 'active' && g.year === currentYear);
  const filteredGoals = filterDreamId === 'all' ? activeGoals : activeGoals.filter(g => g.dreamId === filterDreamId);
  const activeDreams = data.dreams.filter(d => d.status === 'active' && d.type === 'dream');

  const handleSaveGoal = (goal, goalCriteria) => {
    const existingIndex = data.goals.findIndex(g => g.id === goal.id);
    let newGoals;
    if (existingIndex >= 0) {
      newGoals = [...data.goals];
      newGoals[existingIndex] = goal;
    } else {
      newGoals = [...data.goals, goal];
    }
    
    // Обновляем критерии
    const otherCriteria = data.goalCriteria.filter(c => c.goalId !== goal.id);
    const newCriteria = [...otherCriteria, ...goalCriteria];
    
    saveData({ ...data, goals: newGoals, goalCriteria: newCriteria });
    setShowForm(false);
    setEditingGoal(null);
  };

  const handleUpdateCriteria = (updatedCriteria) => {
    const newCriteria = data.goalCriteria.map(c => c.id === updatedCriteria.id ? updatedCriteria : c);
    saveData({ ...data, goalCriteria: newCriteria });
    // Обновляем selectedGoal если открыт
    if (selectedGoal) {
      setSelectedGoal({ ...selectedGoal });
    }
  };

  const handleArchive = (goal) => {
    saveData({ ...data, goals: data.goals.map(g => g.id === goal.id ? { ...g, status: 'archived' } : g) });
    setSelectedGoal(null);
  };

  const handleAchieve = (goal) => {
    saveData({ ...data, goals: data.goals.map(g => g.id === goal.id ? { ...g, status: 'achieved', achievedAt: new Date().toISOString() } : g) });
    setSelectedGoal(null);
  };

  return (
    <div style={{ minHeight: '100vh', background: COLORS.bg, paddingBottom: '100px' }}>
      {/* Header */}
      <div style={{ padding: '20px', paddingTop: '60px', background: `linear-gradient(to bottom, ${COLORS.bgCard} 0%, ${COLORS.bg} 100%)` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '600', color: COLORS.text, fontFamily: 'Georgia, serif' }}>Цели {currentYear}</h1>
          <button onClick={() => setShowHallOfFame(true)} style={{ width: '40px', height: '40px', background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Trophy style={{ width: '18px', height: '18px', color: COLORS.gold }} />
          </button>
        </div>
        
        {/* Фильтр по мечте */}
        {activeDreams.length > 0 && (
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px' }}>
            <button onClick={() => setFilterDreamId('all')} style={{
              padding: '8px 16px',
              background: filterDreamId === 'all' ? `${COLORS.gold}20` : COLORS.bgCard,
              border: `1px solid ${filterDreamId === 'all' ? COLORS.gold : COLORS.border}`,
              borderRadius: '20px',
              color: filterDreamId === 'all' ? COLORS.gold : COLORS.textMuted,
              fontSize: '13px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}>
              Все
            </button>
            {activeDreams.map((d) => (
              <button key={d.id} onClick={() => setFilterDreamId(d.id)} style={{
                padding: '8px 16px',
                background: filterDreamId === d.id ? `${COLORS.gold}20` : COLORS.bgCard,
                border: `1px solid ${filterDreamId === d.id ? COLORS.gold : COLORS.border}`,
                borderRadius: '20px',
                color: filterDreamId === d.id ? COLORS.gold : COLORS.textMuted,
                fontSize: '13px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}>
                <Moon style={{ width: '12px', height: '12px' }} />
                {d.title}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Список целей */}
      <div style={{ padding: '20px' }}>
        {filteredGoals.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ width: '80px', height: '80px', background: `radial-gradient(circle, ${COLORS.gold}15 0%, transparent 70%)`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <Target style={{ width: '40px', height: '40px', color: COLORS.gold, opacity: 0.5 }} />
            </div>
            <h3 style={{ color: COLORS.text, fontSize: '18px', marginBottom: '8px', fontFamily: 'Georgia, serif' }}>Нет целей</h3>
            <p style={{ color: COLORS.textMuted, fontSize: '14px' }}>
              {activeDreams.length === 0 ? 'Сначала создайте мечту' : 'Добавьте свою первую цель'}
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredGoals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                dream={data.dreams.find(d => d.id === goal.dreamId)}
                criteria={data.goalCriteria}
                onClick={() => setSelectedGoal(goal)}
              />
            ))}
          </div>
        )}
      </div>

      {/* FAB */}
      <button onClick={() => setShowForm(true)} disabled={activeDreams.length === 0} style={{
        position: 'fixed',
        right: '20px',
        bottom: '100px',
        width: '56px',
        height: '56px',
        background: activeDreams.length > 0 ? `linear-gradient(135deg, ${COLORS.goldDark} 0%, ${COLORS.gold} 100%)` : COLORS.bgCard,
        border: 'none',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: activeDreams.length > 0 ? 'pointer' : 'not-allowed',
        boxShadow: activeDreams.length > 0 ? `0 8px 24px ${COLORS.gold}40` : 'none',
        opacity: activeDreams.length > 0 ? 1 : 0.5,
      }}>
        <Plus style={{ width: '24px', height: '24px', color: activeDreams.length > 0 ? COLORS.bg : COLORS.textDark }} />
      </button>

      {/* Модал создания/редактирования */}
      <Modal isOpen={showForm} onClose={() => { setShowForm(false); setEditingGoal(null); }} title={editingGoal ? 'Редактировать цель' : 'Новая цель'}>
        <GoalForm
          dreams={data.dreams}
          criteria={data.goalCriteria}
          existingGoal={editingGoal}
          onSave={handleSaveGoal}
          onClose={() => { setShowForm(false); setEditingGoal(null); }}
        />
      </Modal>

      {/* Детальный просмотр */}
      {selectedGoal && (
        <GoalDetail
          goal={selectedGoal}
          dream={data.dreams.find(d => d.id === selectedGoal.dreamId)}
          criteria={data.goalCriteria}
          onClose={() => setSelectedGoal(null)}
          onEdit={() => { setEditingGoal(selectedGoal); setSelectedGoal(null); setShowForm(true); }}
          onUpdateCriteria={handleUpdateCriteria}
          onArchive={() => handleArchive(selectedGoal)}
          onAchieve={() => handleAchieve(selectedGoal)}
        />
      )}

      {/* Зал славы */}
      {showHallOfFame && (
        <GoalHallOfFame
          goals={data.goals}
          dreams={data.dreams}
          onClose={() => setShowHallOfFame(false)}
        />
      )}
    </div>
  );
};

// ============================================
// ЭКРАНЫ-ЗАГЛУШКИ
// ============================================
const PlaceholderScreen = ({ title, icon: Icon, description, available }) => (
  <div style={{ minHeight: '100vh', background: COLORS.bg, paddingBottom: '100px' }}>
    <div style={{ padding: '20px', paddingTop: '60px', background: `linear-gradient(to bottom, ${COLORS.bgCard} 0%, ${COLORS.bg} 100%)` }}>
      <h1 style={{ fontSize: '28px', fontWeight: '600', color: COLORS.text, fontFamily: 'Georgia, serif' }}>{title}</h1>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 40px', textAlign: 'center' }}>
      <div style={{ width: '80px', height: '80px', background: `radial-gradient(circle, ${COLORS.gold}15 0%, transparent 70%)`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
        <Icon style={{ width: '36px', height: '36px', color: COLORS.textDark }} />
      </div>
      <p style={{ color: COLORS.textMuted, fontSize: '15px', lineHeight: '1.6' }}>{description}</p>
      <p style={{ color: COLORS.textDark, fontSize: '12px', marginTop: '16px', padding: '8px 16px', background: COLORS.bgCard, borderRadius: '20px' }}>{available}</p>
    </div>
  </div>
);

const TacticsScreen = () => <PlaceholderScreen title="Тактика" icon={Flag} description="Квартальные рубежи и тактические шаги для достижения целей" available="Фаза 4" />;
const ActionScreen = () => <PlaceholderScreen title="День" icon={CheckSquare} description="Ежедневные задачи и действия, связанные с вашими целями" available="Фаза 5" />;
const ProductivityScreen = () => <PlaceholderScreen title="Продуктивность" icon={Clock} description="Трекер времени и статистика по видам деятельности" available="Фаза 6" />;
const FinanceScreen = () => <PlaceholderScreen title="Финансы" icon={Wallet} description="Учёт доходов, расходов и накопительные фонды" available="Фаза 7" />;

// ============================================
// ГЛАВНОЕ ПРИЛОЖЕНИЕ
// ============================================
export default function App() {
  const { data, saveData, loading } = useAppStorage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dream');

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: COLORS.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '40px', height: '40px', border: `3px solid ${COLORS.border}`, borderTopColor: COLORS.gold, borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!data.pin) {
    return <PinScreen mode="create" onSetPin={(pin) => { saveData({ ...data, pin }); setIsAuthenticated(true); }} />;
  }

  if (!isAuthenticated) {
    return <PinScreen mode="verify" storedPin={data.pin} onSuccess={() => setIsAuthenticated(true)} />;
  }

  const renderScreen = () => {
    switch (activeTab) {
      case 'dream': return <DreamScreen data={data} saveData={saveData} />;
      case 'strategy': return <StrategyScreen data={data} saveData={saveData} />;
      case 'tactics': return <TacticsScreen />;
      case 'action': return <ActionScreen />;
      case 'productivity': return <ProductivityScreen />;
      case 'finance': return <FinanceScreen />;
      default: return <DreamScreen data={data} saveData={saveData} />;
    }
  };

  return (
    <div style={{ background: COLORS.bg, minHeight: '100vh' }}>
      {renderScreen()}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
