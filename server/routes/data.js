import express from 'express';
import { openDb } from '../db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();
router.use(authMiddleware);

const entityConfig = {
  tareas: {
    table: 'tareas',
    fields: ['texto', 'prioridad', 'fechaLimite', 'hora', 'descripcion', 'completada'],
    bool: ['completada'],
  },
  eventos: {
    table: 'eventos',
    fields: ['titulo', 'fecha', 'hora', 'descripcion'],
  },
  transacciones: {
    table: 'transacciones',
    fields: ['descripcion', 'monto', 'tipo', 'categoria', 'fecha'],
  },
  compras: {
    table: 'compras',
    fields: ['producto', 'cantidad', 'categoria', 'tienda', 'completada'],
    bool: ['completada'],
  },
  habitos: {
    table: 'habitos',
    fields: ['nombre', 'icono', 'color', 'frecuencia', 'tracker'],
    json: ['tracker'],
  },
  notificaciones: {
    table: 'notificaciones',
    fields: ['tipo', 'titulo', 'mensaje', 'fecha', 'hora', 'leida'],
    bool: ['leida'],
  },
};

const validateType = (type) => entityConfig[type] || null;
const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

router.get('/all', async (req, res) => {
  try {
    const db = await openDb();
    const data = {};

    for (const type of Object.keys(entityConfig)) {
      const config = entityConfig[type];
      const rows = await db.all(`SELECT * FROM ${config.table} WHERE userId = ? ORDER BY createdAt DESC`, req.userId);
      data[type] = rows.map((row) => {
        if (config.json && row.tracker) {
          return { ...row, tracker: JSON.parse(row.tracker) };
        }
        return row;
      });
    }

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al cargar los datos.' });
  }
});

router.get('/:type', async (req, res) => {
  const type = req.params.type;
  const config = validateType(type);
  if (!config) {
    return res.status(400).json({ error: 'Tipo de dato inválido.' });
  }

  const db = await openDb();
  const rows = await db.all(`SELECT * FROM ${config.table} WHERE userId = ? ORDER BY createdAt DESC`, req.userId);
  const result = rows.map((row) => {
    if (config.json && row.tracker) {
      return { ...row, tracker: JSON.parse(row.tracker) };
    }
    return row;
  });
  res.json({ [type]: result });
});

router.post('/:type', async (req, res) => {
  const type = req.params.type;
  const config = validateType(type);
  if (!config) {
    return res.status(400).json({ error: 'Tipo de dato inválido.' });
  }

  const id = req.body.id || generateId();
  const createdAt = new Date().toISOString();
  const values = [id, req.userId];
  const placeholders = ['?', '?'];
  const columns = ['id', 'userId'];

  for (const field of config.fields) {
    let value = req.body[field];
    if (config.bool && config.bool.includes(field)) {
      value = value ? 1 : 0;
    }
    if (config.json && config.json.includes(field)) {
      value = JSON.stringify(value || {});
    }
    if (field === 'monto') {
      value = Number(value) || 0;
    }
    values.push(value);
    placeholders.push('?');
    columns.push(field);
  }

  values.push(createdAt);
  placeholders.push('?');
  columns.push('createdAt');

  const db = await openDb();
  await db.run(`INSERT INTO ${config.table} (${columns.join(',')}) VALUES (${placeholders.join(',')})`, values);

  const row = await db.get(`SELECT * FROM ${config.table} WHERE id = ?`, id);
  if (config.json && row.tracker) {
    row.tracker = JSON.parse(row.tracker);
  }

  res.json(row);
});

router.put('/:type/:id', async (req, res) => {
  const type = req.params.type;
  const { id } = req.params;
  const config = validateType(type);
  if (!config) {
    return res.status(400).json({ error: 'Tipo de dato inválido.' });
  }

  const db = await openDb();
  const existing = await db.get(`SELECT * FROM ${config.table} WHERE id = ? AND userId = ?`, id, req.userId);
  if (!existing) {
    return res.status(404).json({ error: 'Elemento no encontrado.' });
  }

  const updates = [];
  const values = [];

  for (const field of config.fields) {
    if (Object.prototype.hasOwnProperty.call(req.body, field)) {
      let value = req.body[field];
      if (config.bool && config.bool.includes(field)) {
        value = value ? 1 : 0;
      }
      if (config.json && config.json.includes(field)) {
        value = JSON.stringify(value || {});
      }
      if (field === 'monto') {
        value = Number(value) || 0;
      }
      updates.push(`${field} = ?`);
      values.push(value);
    }
  }

  if (updates.length === 0) {
    return res.status(400).json({ error: 'No se proporcionaron campos a actualizar.' });
  }

  values.push(id);
  values.push(req.userId);

  await db.run(
    `UPDATE ${config.table} SET ${updates.join(', ')} WHERE id = ? AND userId = ?`,
    values
  );

  const row = await db.get(`SELECT * FROM ${config.table} WHERE id = ? AND userId = ?`, id, req.userId);
  if (config.json && row.tracker) {
    row.tracker = JSON.parse(row.tracker);
  }

  res.json(row);
});

router.delete('/:type/:id', async (req, res) => {
  const type = req.params.type;
  const { id } = req.params;
  const config = validateType(type);
  if (!config) {
    return res.status(400).json({ error: 'Tipo de dato inválido.' });
  }

  const db = await openDb();
  await db.run(`DELETE FROM ${config.table} WHERE id = ? AND userId = ?`, id, req.userId);
  res.json({ success: true });
});

export default router;
