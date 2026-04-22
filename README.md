

STEPS TO RUN THE WEBSITE ON LOCAL HOST
---------------------------------------------------------------------------------------------------------------------------------
PRE REQUISITE
---------------------------------------------------------------------------------------------------------------------------------
### STEP 1
CREATE AN ACCOUNT ON NEON DB
### STEP 2
 OPEN SQL EDITOR ON LEFT SIDEBAR
 ### STEP 3
PASTE THE SQL COMMANDS INSIDE IT 
-- USERS TABLE
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    refresh_token TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TASKS TABLE (final version with all changes included)
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL,

    title VARCHAR(255) NOT NULL,
    description TEXT,

    status VARCHAR(20) NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending', 'completed')),

    due_date TIMESTAMP WITH TIME ZONE,

    category TEXT,
    tags TEXT[],

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

-- TASK REMINDERS TABLE (final version)
CREATE TABLE task_reminders (
    task_id UUID PRIMARY KEY,
    remind_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),

    CONSTRAINT fk_task
        FOREIGN KEY (task_id)
        REFERENCES tasks(id)
        ON DELETE CASCADE
);
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
open vs code and type in terminal 
git clone https://github.com/sag2025/task_management_complete
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------


--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
BACKEND
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
### STEP1
cd backend
### STEP 2
npm install
### STEP3
node app.js
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

FRONTEND
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
### STEP 1
cd frontend
### STEP  2
npm install
### STEP 3
npm run dev
