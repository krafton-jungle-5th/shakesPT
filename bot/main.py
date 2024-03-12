import httpx
from fastapi import FastAPI, HTTPException
from scene import Scene
from gen import generate_story

app = FastAPI()
SPRING_ENDPOINT = "http://localhost:8080/story/add"

async def send_data_to_spring(data: dict):
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(SPRING_ENDPOINT, json=data)
            response.raise_for_status()
        except httpx.HTTPError as e:
            raise HTTPException(status_code=500, detail=f"External server error: {e}")

@app.post("/story/add")
async def add(scene: Scene):
    data = generate_story(scene.img, scene.summary, scene.prompt)
    print("We got data")
    await send_data_to_spring(data)
    return {"message": "Data sent to external server successfully"}