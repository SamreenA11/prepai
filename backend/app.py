from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from google import genai
import sqlite3
import os
import json

load_dotenv()

app = Flask(__name__)
CORS(app)

client = genai.Client(api_key=os.getenv('GEMINI_API_KEY'))

def get_db():
    conn = sqlite3.connect('prepai.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "PrepAI is running"})

@app.route('/generate-questions', methods=['POST'])
def generate_questions():
    data = request.get_json()
    job_role = data.get('job_role')
    job_description = data.get('job_description')

    prompt = f"""
    You are a senior technical interviewer at a top tech company.

    Job Role: {job_role}
    Job Description: {job_description}

    Generate exactly 5 technical interview questions  for this role.
    Make them specific, challenging, and relevant to the job description.

    Return ONLY a JSON array like this:
    ["question 1", "question 2", "question 3", "question 4", "question 5"]

    No extra text. Just the JSON array.
    """

    response = client.models.generate_content(
        model='models/gemini-2.5-flash',
        contents=prompt
    )
    raw = response.text.strip()
    # Remove markdown code blocks if Gemini adds them
    if raw.startswith('```'):
        raw = raw.split('\n', 1)[1]
        raw = raw.rsplit('```', 1)[0]
    questions = json.loads(raw.strip())

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(
        'INSERT INTO sessions (job_role, job_description) VALUES (?, ?)',
        (job_role, job_description)
    ) 
    session_id = cursor.lastrowid

    for question in questions:
        cursor.execute(
            'INSERT INTO questions (session_id, question) VALUES (?, ?)',
            (session_id, question)
        )

    conn.commit()
    conn.close()

    return jsonify({
        "session_id": session_id,
        "questions": questions
    })

if __name__ == '__main__':
    from database import init_db
    init_db()
    app.run(debug=True, port=5000)

