DROP TABLE IF EXISTS users;
DROP EXTENSION IF EXISTS "uuid-ossp";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    hash TEXT NOT NULL,
    birthdate DATE,
    active BOOLEAN NOT NULL DEFAULT FALSE,
    confirmation_token TEXT,
    profile_pic TEXT DEFAULT NULL,
    bio TEXT DEFAULT '',
    deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT (now() AT TIME ZONE 'UTC'),
    update_at TIMESTAMP NOT NULL DEFAULT (now() AT TIME ZONE 'UTC')
);