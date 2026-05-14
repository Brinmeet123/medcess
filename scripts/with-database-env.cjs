#!/usr/bin/env node
'use strict'

/**
 * Prisma migrate reads DIRECT_URL from the schema. If you only set DATABASE_URL
 * (e.g. Vercel / Neon / Supabase direct URI), default DIRECT_URL so deploys work.
 * When DIRECT_URL is set explicitly (Supabase pooler + direct), it is left unchanged.
 */
if (!process.env.DIRECT_URL && process.env.DATABASE_URL) {
  process.env.DIRECT_URL = process.env.DATABASE_URL
}

const { spawnSync } = require('node:child_process')
const args = process.argv.slice(2)
if (args.length === 0) {
  console.error('Usage: node scripts/with-database-env.cjs <command> [...args]')
  process.exit(1)
}

const [cmd, ...cmdArgs] = args
const r = spawnSync(cmd, cmdArgs, { stdio: 'inherit', env: process.env })
process.exit(r.status != null ? r.status : 1)
