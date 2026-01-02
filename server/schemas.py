from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class URLBase(BaseModel):
    original_url: str
    custom_slug: Optional[str] = None

class URLCreate(URLBase):
    pass

class ClickSchema(BaseModel):
    id: int
    timestamp: datetime
    country: Optional[str]
    browser: Optional[str]
    os: Optional[str]

    class Config:
        orm_mode = True

class URL(URLBase):
    id: int
    short_key: str
    created_at: datetime
    clicks_count: int
    is_active: bool
    # clicks: List[ClickSchema] = [] 

    class Config:
        orm_mode = True
