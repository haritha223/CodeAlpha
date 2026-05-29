from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


def get_bot_reply(message: str) -> str:
    """Return a rule-based reply for the given user message.

    This keeps the logic simple for beginners and viva explanations.
    The matching is case-insensitive and trims whitespace.
    """
    if not message:
        return "Please type a message."

    msg = message.strip().lower()

    # Simple rule-based responses
    if msg in ("hi", "hello", "hey") or msg.startswith("hello"):
        return "Hi! How can I help you?"
    if "fee" in msg or msg == "fees":
        return "Please contact the admin office for fee details."
    if "time" in msg or msg == "timing":
        return "College timing is 9 AM to 4 PM."
    if "contact" in msg or "email" in msg or msg == "contact":
        return "You can contact us at support@example.com"
    if msg in ("help", "options", "commands"):
        return "Try: hello, fees, timing, contact"

    # Default fallback
    return "Sorry, I don't understand. Please try another question."


@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json(force=True) or {}
    message = data.get('message', '')
    reply = get_bot_reply(message)
    return jsonify({'reply': reply})


if __name__ == '__main__':
    # debug=True is useful during development; disable for production
    app.run(host='0.0.0.0', port=5000, debug=True)
