import google.generativeai as genai
import PIL.Image

genai.configure(api_key="AIzaSyCZMKlS-FhxNADhuwAAbfN0Whr4qoFyfEw")
model = genai.GenerativeModel("gemini-pro-vision")

scenes = []
story = ""

def generate_prompt(story):
    bot_info = "너는 이야기 생성 봇이야. "
    story_prompt = f"이전 이야기: {story}, " if story else ""

    return f"{bot_info}{story_prompt}이미지에 어울리는 한 줄 짜리 재미있는 이야기를 만들어줘."

def generate_story(img_path, story):
    img = PIL.Image.open(img_path)
    prompt = generate_prompt(story)
    
    response = model.generate_content([prompt, img])
    response.resolve()
    
    try:
        story += response.text
        scenes.append({
            "img": img,
            "scene": response.text
        })
    except Exception as e:
        print(f'{type(e).__name__}: {e}')
        
    return story

