# Cloud-Based FAQ Chatbot System (Beginner Friendly)

This is a simple rule-based FAQ chatbot built with Python Flask (backend) and plain HTML/CSS/JavaScript (frontend). It's designed for beginners and can be deployed to cloud platforms like Render or PythonAnywhere.

## Project Structure

chatbot-system/
│── app.py
│── requirements.txt
│── templates/
│     └── index.html
│── static/
│     ├── style.css
│     └── script.js

- `app.py`: Flask backend with a rule-based chatbot API.
- `requirements.txt`: Python dependencies (Flask + gunicorn).
- `templates/index.html`: Frontend HTML template rendered by Flask.
- `static/style.css`: Styles for a clean responsive UI.
- `static/script.js`: Frontend JavaScript to send user messages and display replies.

## How the chatbot works (viva-friendly)

- The frontend collects user input and sends it to the backend `/chat` API as JSON.
- The backend (`app.py`) contains a simple function `get_bot_reply(message)` that uses `if`/`else` logic to return predefined replies for keywords like "hello", "fees", "timing", and "contact".
- The backend returns the reply as JSON; the frontend displays the bot's reply instantly in the chat window.
- No machine learning is involved — this is deterministic rule-based behavior, easy to explain in viva.

## Example interactions

- User: `hello` → Bot: `Hi! How can I help you?`
- User: `fees` → Bot: `Please contact the admin office for fee details.`
- User: `timing` → Bot: `College timing is 9 AM to 4 PM.`
- User: `contact` → Bot: `You can contact us at support@example.com`
- Unknown message → Bot: `Sorry, I don't understand. Please try another question.`

## Run locally (Windows)

1. Create a virtual environment and activate it:

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
```

2. Install dependencies:

```powershell
pip install -r chatbot-system\requirements.txt
```

3. Run the app:

```powershell
python chatbot-system\app.py
```

4. Open your browser at `http://127.0.0.1:5000`.

## Deploy to Render (step-by-step)

Render is a popular platform that can auto-deploy from a GitHub repository.

1. Create a Git repository for your project and push the `chatbot-system` folder (or repository root) to GitHub.
2. Sign in to https://render.com and create a new **Web Service**.
3. Connect your GitHub account and select the repository.
4. For the build command use:

```
pip install -r requirements.txt
```

5. For the start command use (Render provides a simple container):

```
gunicorn app:app
```

6. Choose the Python version (e.g., 3.10 or 3.11) and click **Create Web Service**. Render will deploy and give you a public URL.

Notes:
- Make sure `requirements.txt` includes `gunicorn`.
- If your Flask app file is not at the repo root, adjust the repo layout or start command accordingly, e.g. `gunicorn chatbot-system.app:app`.

## Deploy to PythonAnywhere (quick notes)

- Create an account on https://www.pythonanywhere.com/.
- Create a new web app, choose manual configuration with Flask, and point WSGI to the `app.py` application object.
- Upload the project files and install dependencies in a virtualenv.

## Making it cloud-ready

- The app listens on `0.0.0.0` and uses `gunicorn` for production in the start command — this makes it compatible with PaaS platforms.
- For a production app you would add logging, input validation, and secure any admin/contact emails.

## Next steps (suggestions)

- Add a small admin UI to edit canned responses without changing code.
- Persist conversation logs to a file or database for analytics.
- Integrate a simple retrieval-based FAQ from a JSON file for many Q/A pairs.

---

If you want, I can:
- Run the app here and show a quick demo in the terminal.
- Create a Git repo and prepare it for immediate Render deployment.
- Extend the rule-set or add a simple JSON-based FAQ store.
