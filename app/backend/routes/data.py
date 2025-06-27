from fastapi import APIRouter
from app.backend.fred_data import get_series_data

router = APIRouter()

# Endpoints

@router.get("/series/{series_id}")
def get_series(series_id: str):
    data = get_series_data(series_id).dropna()
    return {series_id: data.to_dict()}