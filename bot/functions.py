import base64
import requests


def send_to_server(img_path, scene, server_url):

    with open(img_path, 'rb') as image_file:
        encoded_img = base64.b64encode(image_file.read()).decode('utf-8')

    data = {
        'image': encoded_img,
        "scene" : scene
    }
    
    response = requests.post(server_url, data=data)

    print(response.status_code)
    print(response.text)

def b64_to_img(b64):
    try:
        img = base64.b64decode(b64)
        return img
    except Exception as e:
        print(f"Error decoding Base64: {e}")
        return None

