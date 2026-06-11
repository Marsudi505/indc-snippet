// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash(
    process.env.ADMIN_PASSWORD || "admin123",
    12
  );

  const admin = await prisma.adminUser.upsert({
    where: { email: process.env.ADMIN_EMAIL || "admin@indc.dev" },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || "admin@indc.dev",
      password: hashedPassword,
      name: "INDC Admin",
    },
  });

  console.log(`✅ Admin user created: ${admin.email}`);

  // Seed sample snippets
  const snippets = [
    {
      title: "Debounce Function",
      description:
        "A utility function to debounce any function call, preventing excessive executions.",
      code: `function debounce(fn, delay = 300) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Usage
const handleSearch = debounce((query) => {
  console.log('Searching for:', query);
}, 500);`,
      language: "javascript",
      category: "Utilities",
    },
    {
      title: "Express Rate Limiter Middleware",
      description:
        "Simple in-memory rate limiter middleware for Express.js APIs.",
      code: `const rateLimit = (windowMs = 60000, max = 100) => {
  const requests = new Map();

  return (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();
    const windowStart = now - windowMs;

    if (!requests.has(ip)) {
      requests.set(ip, []);
    }

    const userRequests = requests.get(ip).filter(t => t > windowStart);
    requests.set(ip, userRequests);

    if (userRequests.length >= max) {
      return res.status(429).json({ error: 'Too many requests' });
    }

    userRequests.push(now);
    next();
  };
};

// Usage
app.use('/api/', rateLimit(60000, 50));`,
      language: "javascript",
      category: "Node.js",
    },
    {
      title: "Discord Bot Command Handler",
      description:
        "Modular command handler for Discord.js bots with slash command support.",
      code: `const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

client.commands = new Collection();

// Load commands dynamically
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));
  if (command.data && command.execute) {
    client.commands.set(command.data.name, command);
  }
}

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'Command failed!', ephemeral: true });
  }
});

client.login(process.env.DISCORD_TOKEN);`,
      language: "javascript",
      category: "Bots",
    },
    {
      title: "Async Queue with Concurrency",
      description:
        "Process async tasks with a controlled concurrency limit to avoid overwhelming APIs.",
      code: `async function asyncQueue(tasks, concurrency = 5) {
  const results = [];
  const executing = new Set();

  for (const task of tasks) {
    const promise = Promise.resolve().then(() => task()).then(result => {
      executing.delete(promise);
      return result;
    });

    results.push(promise);
    executing.add(promise);

    if (executing.size >= concurrency) {
      await Promise.race(executing);
    }
  }

  return Promise.all(results);
}

// Usage
const tasks = urls.map(url => () => fetch(url).then(r => r.json()));
const results = await asyncQueue(tasks, 3);`,
      language: "javascript",
      category: "Utilities",
    },
    {
      title: "PostgreSQL Connection Pool (Node.js)",
      description: "Reusable PostgreSQL connection pool setup using the pg library.",
      code: `const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Query helper
async function query(text, params) {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log('Query executed', { text, duration, rows: res.rowCount });
  return res;
}

module.exports = { query, pool };`,
      language: "javascript",
      category: "Node.js",
    },
    {
      title: "TypeScript Generic Fetch Wrapper",
      description:
        "Type-safe fetch wrapper with error handling and automatic JSON parsing.",
      code: `interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

async function apiFetch<T>(
  url: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      ...options,
    });

    if (!response.ok) {
      const errorBody = await response.text();
      return { data: null, error: errorBody || response.statusText, status: response.status };
    }

    const data: T = await response.json();
    return { data, error: null, status: response.status };
  } catch (err) {
    return { data: null, error: (err as Error).message, status: 0 };
  }
}

// Usage
const { data, error } = await apiFetch<User[]>('/api/users');`,
      language: "typescript",
      category: "Utilities",
    },
  ];

  for (const snippet of snippets) {
    await prisma.snippet.create({ data: snippet });
  }

  console.log(`✅ ${snippets.length} sample snippets seeded.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
