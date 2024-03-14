from typing import Optional
from pydantic import BaseModel

class Scene(BaseModel):
    summary: str 
    image: str
    prompt: str
    topicId: Optional[int] = None
    storyId: Optional[int] = None
