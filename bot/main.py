import httpx
from fastapi import FastAPI, HTTPException
from scene import Scene
from gen import generate_story

app = FastAPI()
SPRING_ENDPOINT = "http://localhost:8000/story/get/convertStory"

async def send_data_to_spring(data: dict):
    async with httpx.AsyncClient() as client:
        try:
            response = await client.put(SPRING_ENDPOINT, json=data)
            response.raise_for_status()
        except httpx.HTTPError as e:
            raise HTTPException(status_code=500, detail=f"External server error: {e}")


@app.post("/story/add")
async def add(scene: Scene):
    generated_data = generate_story(scene.image, scene.summary, scene.prompt, scene.topicId, scene.storyId)
    
    data = {
        "storyId": scene.storyId,
        "topicId": scene.topicId,
        "summary": generated_data["story"],
        "tag": generated_data["tag"]
    }
    print(data)
    try:
        await send_data_to_spring(data)
        print("Data sent to external server successfully")
    except HTTPException as e:
        print(f"Failed to send data to external server: {e}")
        raise

    return {"message": "Data sent to external server successfully"}
