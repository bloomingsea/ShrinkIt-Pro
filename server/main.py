from fastapi import FastAPI, Depends, HTTPException, Request, BackgroundTasks
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
from . import models, schemas, crud, database
import user_agents # type: ignore

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="ShrinkIt Pro")

# CORS Configuration
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/urls/", response_model=schemas.URL)
def create_url(url: schemas.URLCreate, db: Session = Depends(get_db)):
    if url.custom_slug:
        db_url = crud.get_url_by_custom_slug(db, slug=url.custom_slug)
        if db_url:
            raise HTTPException(status_code=400, detail="Slug already taken")
    return crud.create_url(db=db, url=url)

@app.get("/urls/", response_model=List[schemas.URL])
def read_urls(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    urls = crud.get_urls(db, skip=skip, limit=limit)
    return urls

@app.get("/{short_key}")
def redirect_to_url(short_key: str, request: Request, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    # Try finding by short_key (which might be the custom slug too in our logic)
    db_url = crud.get_url_by_short_key(db, short_key=short_key)
    if not db_url:
         db_url = crud.get_url_by_custom_slug(db, slug=short_key)
    
    if not db_url or not db_url.is_active:
        raise HTTPException(status_code=404, detail="URL not found")

    # Analytics 
    background_tasks.add_task(record_analytics, db, db_url.id, request)

    return RedirectResponse(url=db_url.original_url)

def record_analytics(db: Session, url_id: int, request: Request):
    user_agent_str = request.headers.get("user-agent", "")
    ua = user_agents.parse(user_agent_str)
    
    crud.create_click(
        db,
        url_id=url_id,
        ip=request.client.host,
        country="Unknown", # Requires GeoIP setup
        city="Unknown",
        browser=ua.browser.family,
        os=ua.os.family,
        referrer=request.headers.get("referer")
    )

@app.get("/urls/{short_key}/stats", response_model=schemas.URL)
def get_url_stats(short_key: str, db: Session = Depends(get_db)):
    db_url = crud.get_url_by_short_key(db, short_key=short_key)
    if not db_url:
         db_url = crud.get_url_by_custom_slug(db, slug=short_key)
    if not db_url:
        raise HTTPException(status_code=404, detail="URL not found")
    return db_url
