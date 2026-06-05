from fastapi import APIRouter

from app.services.dataset_manager import (
    load_datasets
)

router = APIRouter()


@router.get("/datasets")
def get_datasets():

    return load_datasets()