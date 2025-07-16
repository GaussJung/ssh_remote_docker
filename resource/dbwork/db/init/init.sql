-- ==============================================
-- User Setup
-- ==============================================

DO $$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'dbuser') THEN
      CREATE ROLE dbuser WITH LOGIN PASSWORD 'dbuser123!';
   END IF;
END$$;

-- ==============================================
-- Database & Schema Setup
-- ==============================================

-- Drop DB if exists (for idempotency)
DROP DATABASE IF EXISTS mysvcdb;

-- Create DB owned by dbuser, with UTF8
CREATE DATABASE mysvcdb
    WITH OWNER = dbuser
         ENCODING = 'UTF8'
         LC_COLLATE = 'C.UTF-8'
         LC_CTYPE = 'C.UTF-8'
         TEMPLATE = template0;

-- ==============================================
-- Switch to mysvcdb and schema setup
-- ==============================================

\connect mysvcdb

-- Change owner of public schema to dbuser
ALTER SCHEMA public OWNER TO dbuser;

-- Set dbuser's default search_path to public
ALTER ROLE dbuser SET search_path TO public;

-- Act as dbuser for table creation
SET ROLE dbuser;

-- ==============================================
-- Table: fruit
-- ==============================================

DROP TABLE IF EXISTS fruit CASCADE;

CREATE TABLE fruit (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL
);

-- Change table owner to dbuser
ALTER TABLE fruit OWNER TO dbuser;

INSERT INTO fruit (name) VALUES
('Apple'),
('Banana'),
('Orange'),
('Grape'),
('Mango'),
('Pineapple'),
('Strawberry'),
('Watermelon'),
('Peach'),
('Cherry');

-- ==============================================
-- Table: company
-- ==============================================

DROP TABLE IF EXISTS company CASCADE;

CREATE TABLE company (
    cid INT PRIMARY KEY,
    cname VARCHAR(200) NOT NULL,
    cphone VARCHAR(100),
    industry VARCHAR(200),
    remarks TEXT DEFAULT NULL
);

-- Change table owner to dbuser
ALTER TABLE company OWNER TO dbuser;

INSERT INTO company (cid, cname, cphone, industry, remarks) VALUES
(10100, 'Fast Shopper', '+862319092222', 'Retail', NULL),
(10452, 'Green Energy Co.', '+447911123456', 'Energy', 'Leader in renewable energy solutions.'),
(10987, 'MediPlus Health', NULL, 'Healthcare', 'Provides innovative healthcare services.'),
(11234, 'SkyNet Systems', '+12125551234', 'Technology', 'Specialized in AI and cloud computing.'),
(11567, 'Urban Builders', NULL, 'Construction', NULL);

-- ==============================================
-- Reset role
-- ==============================================

RESET ROLE;

-- ==============================================
-- End of init.sql
-- ==============================================
