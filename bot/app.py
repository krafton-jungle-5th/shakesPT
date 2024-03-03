from flask import Flask, request, jsonify
from functions import b64_to_img, send_to_server
from bot import generate_story, generate_prompt
from PIL import Image
import io

app = Flask(__name__)

def update_story(data):
    scene = data.get('scene')
    b64 = data.get('b64')
    img = b64_to_img(b64)
    image = Image.open(io.BytesIO(img))
    
    img_path = ""  # 적절한 이미지 경로를 설정해야 합니다.
    image.save(img_path)
    
    story = generate_story(img_path, scene)
    send_to_server(img_path, story, "여기 스프링 url")

    return {"message": "Success!"}

@app.route('/update_story', methods=['POST'])
def handle_update_story():
    data = request.get_json()
    response = update_story(data)
    return jsonify(response)

if __name__ == '__main__':
    app.run(port=5000)