'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { AlertTriangle, CheckCircle2, Eye, EyeOff, Loader2, Lock, Mail, User, X } from 'lucide-react';
import { auth, db, firebaseReady } from '@/lib/firebase';
import { getAuthErrorMessage } from '@/lib/authErrors';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AuthModal({ open, initialView = 'login', onClose }) {
  const [view, setView] = useState(initialView);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/70 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-card"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng"
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-ink-400 transition-colors hover:bg-mist-100 hover:text-ink-900"
        >
          <X size={18} />
        </button>

        {!firebaseReady ? (
          <NotConfigured onClose={onClose} />
        ) : (
          <motion.div key={view} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}>
            {view === 'login' && <LoginView onSwitch={setView} onClose={onClose} />}
            {view === 'register' && <RegisterView onSwitch={setView} onClose={onClose} />}
            {view === 'forgot' && <ForgotView onSwitch={setView} />}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

function NotConfigured({ onClose }) {
  return (
    <div className="p-8 text-center">
      <AlertTriangle size={32} className="mx-auto text-amber-500" />
      <h3 className="mt-4 font-display text-lg font-bold text-ink-900">Firebase chưa được cấu hình</h3>
      <p className="mt-2 text-sm text-ink-400">
        Thêm các biến môi trường <code className="rounded bg-mist-100 px-1">NEXT_PUBLIC_FIREBASE_*</code> vào{' '}
        <code className="rounded bg-mist-100 px-1">.env.local</code> (xem file{' '}
        <code className="rounded bg-mist-100 px-1">.env.local.example</code>) rồi khởi động lại server.
      </p>
      <button
        type="button"
        onClick={onClose}
        className="mt-6 rounded-full bg-navy-900 px-6 py-2.5 text-sm font-semibold text-white"
      >
        Đã hiểu
      </button>
    </div>
  );
}

function Field({ icon: Icon, ...props }) {
  return (
    <div className="relative">
      <Icon size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
      <input
        {...props}
        className="w-full rounded-lg border border-black/10 py-2.5 pl-10 pr-4 text-sm text-ink-900 outline-none transition-colors focus:border-brand-500"
      />
    </div>
  );
}

function PasswordField({ value, onChange, placeholder, id }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <Lock size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
      <input
        id={id}
        type={show ? 'text' : 'password'}
        required
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-black/10 py-2.5 pl-10 pr-10 text-sm text-ink-900 outline-none transition-colors focus:border-brand-500"
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        aria-label={show ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 transition-colors hover:text-ink-900"
      >
        {show ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
}

function SubmitButton({ loading, children }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-cyan-400 py-3 text-sm font-semibold text-navy-950 shadow-glow transition-transform duration-200 hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
    >
      {loading && <Loader2 size={16} className="animate-spin" />}
      {children}
    </button>
  );
}

function LoginView({ onSwitch, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      onClose();
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h2 className="font-display text-2xl font-bold text-navy-900">Đăng nhập</h2>
      <p className="mt-1 text-sm text-ink-400">Chào mừng bạn quay lại TTC-Infotech.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <Field
          icon={Mail}
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordField placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} />

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => onSwitch('forgot')}
            className="text-xs font-medium text-brand-600 transition-colors hover:text-brand-700"
          >
            Quên mật khẩu?
          </button>
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600">{error}</p>
        )}

        <SubmitButton loading={loading}>Đăng nhập</SubmitButton>
      </form>

      <p className="mt-6 text-center text-sm text-ink-400">
        Chưa có tài khoản?{' '}
        <button
          type="button"
          onClick={() => onSwitch('register')}
          className="font-semibold text-brand-600 transition-colors hover:text-brand-700"
        >
          Đăng ký
        </button>
      </p>
    </div>
  );
}

function RegisterView({ onSwitch, onClose }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!EMAIL_RE.test(email.trim())) return 'Email không hợp lệ.';
    if (username.trim().length < 2) return 'Tên người dùng phải có ít nhất 2 ký tự.';
    if (password.length < 6) return 'Mật khẩu phải có ít nhất 6 ký tự.';
    if (password !== confirmPassword) return 'Mật khẩu xác nhận không khớp.';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
      await updateProfile(cred.user, { displayName: username.trim() });
      await setDoc(doc(db, 'users', cred.user.uid), {
        uid: cred.user.uid,
        email: cred.user.email,
        username: username.trim(),
        createdAt: serverTimestamp(),
      });
      onClose();
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h2 className="font-display text-2xl font-bold text-navy-900">Đăng ký</h2>
      <p className="mt-1 text-sm text-ink-400">Tạo tài khoản để trải nghiệm đầy đủ dịch vụ.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <Field
          icon={Mail}
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Field
          icon={User}
          type="text"
          required
          placeholder="Tên người dùng"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <PasswordField placeholder="Mật khẩu (tối thiểu 6 ký tự)" value={password} onChange={(e) => setPassword(e.target.value)} />
        <PasswordField
          placeholder="Xác nhận mật khẩu"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600">{error}</p>
        )}

        <SubmitButton loading={loading}>Tạo tài khoản</SubmitButton>
      </form>

      <p className="mt-6 text-center text-sm text-ink-400">
        Đã có tài khoản?{' '}
        <button
          type="button"
          onClick={() => onSwitch('login')}
          className="font-semibold text-brand-600 transition-colors hover:text-brand-700"
        >
          Đăng nhập
        </button>
      </p>
    </div>
  );
}

function ForgotView({ onSwitch }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setError('Email không hợp lệ.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setSent(true);
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="p-8 text-center">
        <CheckCircle2 size={36} className="mx-auto text-brand-500" />
        <h3 className="mt-4 font-display text-lg font-bold text-navy-900">Đã gửi email đặt lại mật khẩu</h3>
        <p className="mt-2 text-sm text-ink-400">
          Kiểm tra hộp thư <span className="font-medium text-ink-900">{email}</span> và làm theo hướng dẫn để đặt
          mật khẩu mới.
        </p>
        <button
          type="button"
          onClick={() => onSwitch('login')}
          className="mt-6 rounded-full bg-navy-900 px-6 py-2.5 text-sm font-semibold text-white"
        >
          Quay lại đăng nhập
        </button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h2 className="font-display text-2xl font-bold text-navy-900">Quên mật khẩu</h2>
      <p className="mt-1 text-sm text-ink-400">
        Nhập email đã đăng ký, chúng tôi sẽ gửi liên kết đặt lại mật khẩu.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <Field
          icon={Mail}
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600">{error}</p>
        )}

        <SubmitButton loading={loading}>Gửi liên kết đặt lại mật khẩu</SubmitButton>
      </form>

      <p className="mt-6 text-center text-sm text-ink-400">
        <button
          type="button"
          onClick={() => onSwitch('login')}
          className="font-semibold text-brand-600 transition-colors hover:text-brand-700"
        >
          Quay lại đăng nhập
        </button>
      </p>
    </div>
  );
}
