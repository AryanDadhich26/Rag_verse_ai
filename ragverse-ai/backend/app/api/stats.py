from fastapi import APIRouter

from app.services.dataset_manager import (
    load_datasets
)

from app.services.experiment_manager import (
    load_experiments
)

router = APIRouter()


@router.get("/stats")
def get_stats():

    datasets = load_datasets()

    experiments = load_experiments()

    return {

        "rag_count": 10,

        "dataset_count":
            len(datasets),

        "experiment_count":
            len(experiments),

        "export_formats": 2
    }