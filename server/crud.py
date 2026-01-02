from sqlalchemy.orm import Session
from . import models, schemas
import string
import random

def get_url_by_short_key(db: Session, short_key: str):
    return db.query(models.URL).filter(models.URL.short_key == short_key).first()

def get_url_by_custom_slug(db: Session, slug: str):
    return db.query(models.URL).filter(models.URL.custom_slug == slug).first()

def encode_base62(num):
    alphabet = string.digits + string.ascii_letters
    base = 62
    if num == 0:
        return alphabet[0]
    arr = []
    while num:
        num, rem = divmod(num, base)
        arr.append(alphabet[rem])
    arr.reverse()
    return ''.join(arr)

def create_url(db: Session, url: schemas.URLCreate):
    db_url = models.URL(original_url=str(url.original_url), custom_slug=url.custom_slug)
    db.add(db_url)
    db.commit()
    db.refresh(db_url)
    
    if not url.custom_slug:
        # Simple ID to Base62 conversion
        db_url.short_key = encode_base62(db_url.id)
        db.add(db_url)
        db.commit()
        db.refresh(db_url)
    else:
        db_url.short_key = url.custom_slug 
        db.add(db_url)
        db.commit()
    
    return db_url

def create_click(db: Session, url_id: int, ip: str, country: str, city: str, browser: str, os: str, referrer: str):
    db_click = models.Click(
        url_id=url_id,
        ip_address=ip,
        country=country,
        city=city,
        browser=browser,
        os=os,
        referrer=referrer
    )
    db.add(db_click)
    # Update count
    db_url = db.query(models.URL).filter(models.URL.id == url_id).first()
    if db_url:
        db_url.clicks_count += 1
        db.add(db_url)
    
    db.commit()
    db.refresh(db_click)
    return db_click

def get_urls(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.URL).offset(skip).limit(limit).all()
