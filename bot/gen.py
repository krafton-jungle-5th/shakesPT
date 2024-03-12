import google.generativeai as genai
import base64

from PIL import Image
from io import BytesIO
from api_key import API_KEY
from prompt import generate_story_prompt, generate_tag_prompt

genai.configure(api_key=API_KEY)
vision_model = genai.GenerativeModel("gemini-pro-vision")
text_model = genai.GenerativeModel("gemini-pro")

def generate_story(b64, summary, prompt):
    img_data = base64.b64decode(b64)
    img_buffer = BytesIO(img_data)
    
    img = Image.open(img_buffer)
    
    story = ""
    for i in summary:
        story += i
    
    prompt = generate_story_prompt(story, prompt, len(summary))
    
    response = vision_model.generate_content([prompt, img])
    response.resolve()    
    try:
        story += response.text
        print(response.text)
    except Exception as e:
        print(f'{type(e).__name__}: {e}')
    
    tag = generate_tag(story)
    
    return {"story" : story,
            "tag" : tag}

def generate_tag(story):
    prompt = generate_tag_prompt(story)
    response = text_model.generate_content(prompt)
    print("TAG : " + response.text)
    return response.text
