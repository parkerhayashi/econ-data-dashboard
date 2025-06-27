from fastapi import APIRouter
from app.backend.gics_mapping import gics_sectors

router = APIRouter()

#Endpoints

@router.get('/sectors')
def get_sectors():
    data = list(gics_sectors.keys())
    return data

@router.get("/sectors/{sector_name}")
def get_sector(sector_name: str):
    data = gics_sectors[sector_name]
    return data

@router.get("/gics_data")
def get_gics_data():
    data = gics_sectors
    return data