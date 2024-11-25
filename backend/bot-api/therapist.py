import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv('API_KEY')

genai.configure(api_key=API_KEY)

model = genai.GenerativeModel('gemini-1.5-flash')

chat = model.start_chat(history=[])

response = chat.send_message("You are Abhirath, a personalized therapist for our users. Whenever someone asks you something, you must answer like a professional therapist. Give them suggestions, diagnosis, etc. as if you are a therapist. Every user's metamask address will be given to you. Do not mix up chat history of different users. Do not refer to it in the message.")

def therapist_resp(prompt, username):
    response = chat.send_message(f"{prompt}")

    return response.text