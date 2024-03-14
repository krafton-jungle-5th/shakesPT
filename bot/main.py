import httpx
from fastapi import FastAPI, HTTPException
from scene import Scene
from gen import generate_story

app = FastAPI()

@app.post("/story/add")
async def add(scene: Scene):
    generated_data = generate_story(scene.image, scene.summary, scene.prompt, scene.topicId, scene.storyId)
    
    data = {
        "storyId": scene.storyId,
        "topicId": scene.topicId,
        "summary": generated_data["story"],
        "tag": generated_data["tag"]
    }

    return data
