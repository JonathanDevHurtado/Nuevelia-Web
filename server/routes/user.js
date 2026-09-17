import express from 'express';
import { openDb } from '../db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/profile', async (req, res) => {
  const db = await openDb();
  const user = await db.get('SELECT * FROM users WHERE id = ?', req.userId);
  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado.' });
  }
  res.json({ perfil: {
    nombre: user.nombre,
    email: user.email,
    moneda: user.moneda,
    avatar: user.avatar,
    assistantType: user.assistantType,
    notifications: !!user.notifications,
    assistantActive: !!user.assistantActive,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }});
});

router.put('/profile', async (req, res) => {
  const { nombre, moneda, avatar, assistantType, notifications, assistantActive } = req.body;
  const db = await openDb();

  const user = await db.get('SELECT * FROM users WHERE id = ?', req.userId);
  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado.' });
  }

  await db.run(
    `UPDATE users SET nombre = ?, moneda = ?, avatar = ?, assistantType = ?, notifications = ?, assistantActive = ?, updatedAt = ? WHERE id = ?`,
    nombre || user.nombre,
    moneda || user.moneda,
    avatar !== undefined ? avatar : user.avatar,
    assistantType || user.assistantType,
    notifications !== undefined ? (notifications ? 1 : 0) : user.notifications,
    assistantActive !== undefined ? (assistantActive ? 1 : 0) : user.assistantActive,
    new Date().toISOString(),
    req.userId
  );

  const updatedUser = await db.get('SELECT * FROM users WHERE id = ?', req.userId);
  res.json({ perfil: {
    nombre: updatedUser.nombre,
    email: updatedUser.email,
    moneda: updatedUser.moneda,
    avatar: updatedUser.avatar,
    assistantType: updatedUser.assistantType,
    notifications: !!updatedUser.notifications,
    assistantActive: !!updatedUser.assistantActive,
    createdAt: updatedUser.createdAt,
    updatedAt: updatedUser.updatedAt,
  }});
});

export default router;
