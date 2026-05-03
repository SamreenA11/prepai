import sqlite3

def init_db():
    conn = sqlite3.connect('prepai.db')
    cursor = conn.cursor()

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            job_role TEXT NOT NULL,
            job_description TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS questions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id INTEGER NOT NULL,
            question TEXT NOT NULL,
            user_answer TEXT,
            ai_feedback TEXT,
            score INTEGER,
            FOREIGN KEY (session_id) REFERENCES sessions(id)
        )
    ''')

    conn.commit()
    conn.close()
    print("Database ready")

if __name__ == '__main__':
    init_db()