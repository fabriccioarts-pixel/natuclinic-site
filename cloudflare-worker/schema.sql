CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    source TEXT DEFAULT 'website'
);

CREATE TABLE IF NOT EXISTS articles (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT,
    date TEXT,
    image TEXT,
    excerpt TEXT,
    content TEXT,
    meta_description TEXT,
    meta_keywords TEXT,
    author_name TEXT,
    author_avatar TEXT,
    slug TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
