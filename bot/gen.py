import google.generativeai as genai
import base64
import imghdr

from PIL import Image
from io import BytesIO
from api_key import API_KEY
from prompt import generate_story_prompt, generate_tag_prompt

genai.configure(api_key=API_KEY)
vision_model = genai.GenerativeModel("gemini-pro-vision")
text_model = genai.GenerativeModel("gemini-pro")


def is_valid_image(img_data):
    # 이미지 데이터가 올바른 이미지 파일인지 확인
    img_format = imghdr.what(None, h=img_data)
    return img_format is not None


def generate_story(b64, summary, prompt, topicId, storyId):
    print(b64)
    print(summary)
    print(prompt)
    print(topicId)
    print(storyId)
    img_data = base64.b64decode(b64)

    # 디코딩된 이미지 데이터가 올바른 이미지 파일인지 확인
    if not is_valid_image(img_data):
        raise ValueError("Invalid image data")

    img_buffer = BytesIO(img_data)

    img = Image.open(img_buffer)

    # summary를 이어진 이야기의 시작으로 설정
    story = summary

    # 이어진 이야기를 생성하기 위해 prompt를 설정
    prompt = generate_story_prompt(story, prompt, len(summary))  # 여기가 수정된 부분입니다.

    # GPT 모델을 사용하여 이어진 이야기 생성
    response = vision_model.generate_content([prompt, img])
    response.resolve()
    try:
        # 생성된 이어진 이야기를 저장
        story = response.text
        print(response.text)
    except Exception as e:
        print(f'{type(e).__name__}: {e}')

    # 생성된 이야기에 대한 태그 생성
    tag = generate_tag(story)

    return {"story": story,
            "tag": tag}


def generate_tag(story):
    prompt = generate_tag_prompt(story)
    response = text_model.generate_content(prompt)
    print("TAG : " + response.text)
    return response.text
