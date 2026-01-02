from pydantic import BaseModel, HttpUrl, field_validator
from typing import Optional, List
from datetime import datetime
import re

class URLBase(BaseModel):
    original_url: HttpUrl
    custom_slug: Optional[str] = None

    @field_validator('custom_slug')
    @classmethod
    def validate_slug(cls, v: Optional[str]) -> Optional[str]:
        if v is None:
            return v
        if not re.match(r'^[a-zA-Z0-9-]+$', v):
            raise ValueError('Slug must contain only alphanumeric characters and hyphens')
        return v

class URLCreate(URLBase):
    pass

class ClickSchema(BaseModel):
    id: int
    timestamp: datetime
    country: Optional[str]
    browser: Optional[str]
    os: Optional[str]

    class Config:
        from_attributes = True

class URL(URLBase):
    id: int
    short_key: str
    created_at: datetime
    clicks_count: int
    is_active: bool
    # clicks: List[ClickSchema] = [] 

    class Config:
        from_attributes = True
