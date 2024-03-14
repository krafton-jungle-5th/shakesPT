from typing import List, Optional
from pydantic import BaseModel

class Scene(BaseModel):
    summary: Optional[List[str]] = None  # 문자열 리스트로 변경
    image: str
    prompt: str
    topicId: Optional[int] = None
    storyId: Optional[int] = None
