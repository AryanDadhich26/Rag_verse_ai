from fastapi import APIRouter

from app.services.experiment_manager import (
    save_experiment,
    load_experiments
)

router = APIRouter()


@router.post("/save-experiment")
def save(exp: dict):

    save_experiment(exp)

    return {
        "message":
        "Experiment saved successfully"
    }


@router.get("/experiments")
def get_experiments():

    return load_experiments()