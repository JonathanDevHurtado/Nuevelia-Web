import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
let dbInstance;

export async function openDb() {
  if (!dbInstance) {
    const filename = process.env.DATABASE_URL
      ? path.isAbsolute(process.env.DATABASE_URL)
        ? process.env.DATABASE_URL
        : path.join(__dirname, process.env.DATABASE_URL)
      : path.join(__dirname, 'data', 'database.sqlite');

    const folder = path.dirname(filename);
    await fs.mkdir(folder, { recursive: true });

    dbInstance = await open({
      filename,
      driver: sqlite3.Database,
    });
  }

  return dbInstance;
}

export async function initDb() {
  const db = await openDb();
  await db.exec('PRAGMA foreign_keys = ON');

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      passwordHash TEXT NOT NULL,
      moneda TEXT NOT NULL DEFAULT 'mxn',
      avatar TEXT,
      assistantType TEXT DEFAULT 'nuve',
      notifications INTEGER NOT NULL DEFAULT 1,
      assistantActive INTEGER NOT NULL DEFAULT 1,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS tareas (
      id TEXT PRIMARY KEY,
      userId INTEGER NOT NULL,
      texto TEXT NOT NULL,
      prioridad TEXT NOT NULL,
      fechaLimite TEXT,
      hora TEXT,
      descripcion TEXT,
      completada INTEGER NOT NULL DEFAULT 0,
      createdAt TEXT NOT NULL,
      FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS eventos (
      id TEXT PRIMARY KEY,
      userId INTEGER NOT NULL,
      titulo TEXT NOT NULL,
      fecha TEXT,
      hora TEXT,
      descripcion TEXT,
      createdAt TEXT NOT NULL,
      FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS transacciones (
      id TEXT PRIMARY KEY,
      userId INTEGER NOT NULL,
      descripcion TEXT NOT NULL,
      monto REAL NOT NULL,
      tipo TEXT NOT NULL,
      categoria TEXT,
      fecha TEXT,
      createdAt TEXT NOT NULL,
      FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS compras (
      id TEXT PRIMARY KEY,
      userId INTEGER NOT NULL,
      producto TEXT NOT NULL,
      cantidad TEXT,
      categoria TEXT,
      tienda TEXT,
      completada INTEGER NOT NULL DEFAULT 0,
      createdAt TEXT NOT NULL,
      FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS habitos (
      id TEXT PRIMARY KEY,
      userId INTEGER NOT NULL,
      nombre TEXT NOT NULL,
      icono TEXT,
      color TEXT,
      frecuencia INTEGER NOT NULL,
      tracker TEXT,
      createdAt TEXT NOT NULL,
      FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS notificaciones (
      id TEXT PRIMARY KEY,
      userId INTEGER NOT NULL,
      tipo TEXT,
      titulo TEXT,
      mensaje TEXT,
      fecha TEXT,
      hora TEXT,
      leida INTEGER NOT NULL DEFAULT 0,
      createdAt TEXT NOT NULL,
      FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE
    )
  `);
}
