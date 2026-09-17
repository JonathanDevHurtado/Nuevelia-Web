import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { openDb } from '../db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'please-change-this-secret';

function formatPerfil(user) {
  return {
    nombre: user.nombre,
    email: user.email,
    moneda: user.moneda,
    avatar: user.avatar,
    assistantType: user.assistantType || 'nuve',
    notifications: !!user.notifications,
    assistantActive: !!user.assistantActive,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

function createToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
}

router.post('/register', async (req, res) => {
  const { nombre, email, password, moneda = 'mxn', accountType = 'personal' } = req.body;
  if (!nombre || !email || !password || password.length < 8) {
    return res.status(400).json({ error: 'Nombre, email y contraseña (mínimo 8 caracteres) son obligatorios.' });
  }

  const db = await openDb();
  const existing = await db.get('SELECT id FROM users WHERE email = ?', email.toLowerCase());
  if (existing) {
    return res.status(409).json({ error: 'Ya existe una cuenta con ese correo electrónico.' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const now = new Date().toISOString();
  const assistantType = accountType === 'empresarial' ? 'empresarial' : 'nuve';

  const result = await db.run(
    `INSERT INTO users (nombre, email, passwordHash, moneda, avatar, assistantType, notifications, assistantActive, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    nombre,
    email.toLowerCase(),
    passwordHash,
    moneda,
    null,
    assistantType,
    1,
    1,
    now,
    now
  );

  const perfil = formatPerfil({
    nombre,
    email: email.toLowerCase(),
    moneda,
    avatar: null,
    assistantType,
    notifications: 1,
    assistantActive: 1,
    createdAt: now,
    updatedAt: now,
  });

  res.json({ token: createToken(result.lastID), perfil });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son obligatorios.' });
  }

  const db = await openDb();
  const user = await db.get('SELECT * FROM users WHERE email = ?', email.toLowerCase());
  if (!user) {
    return res.status(401).json({ error: 'Email o contraseña inválidos.' });
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ error: 'Email o contraseña inválidos.' });
  }

  res.json({ token: createToken(user.id), perfil: formatPerfil(user) });
});

router.get('/me', authMiddleware, async (req, res) => {
  const db = await openDb();
  const user = await db.get('SELECT * FROM users WHERE id = ?', req.userId);
  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado.' });
  }

  res.json({ perfil: formatPerfil(user) });
});

export default router;
