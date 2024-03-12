from typing import List, Optional
from pydantic import BaseModel

class Scene(BaseModel):
    summary : Optional[List[bytes]]
    img: str
    prompt: str