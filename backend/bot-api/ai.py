import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv('API_KEY')

genai.configure(api_key=API_KEY)

model = genai.GenerativeModel('gemini-1.5-flash')

chat = model.start_chat(history=[])

response = chat.send_message("You are part of a mental well-being app. Users will come to with mental issues, it can be anything ranging from depression, anxiety, suicide, or even something minor. You must help them accordingly, and try not to redirect them to a helpline or anything else. Help them right here. Avoid questions unrelated to their well-being. You will be given each users name at the start of every message. Don't mix up chats between different users.")

def get_response(prompt, username):
    response = chat.send_message(f"{username}: {prompt}")

    return response.text