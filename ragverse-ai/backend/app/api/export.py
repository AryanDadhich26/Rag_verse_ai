from fastapi import APIRouter
from fastapi.responses import FileResponse

from app.services.experiment_manager import (
    load_experiments
)

import json
import csv

router = APIRouter()

@router.get("/export/json")
def export_json():

    experiments = load_experiments()

    file_path = "exports/experiments.json"

    with open(
        file_path,
        "w"
    ) as file:

        json.dump(
            experiments,
            file,
            indent=4
        )

    return FileResponse(
        file_path,
        filename="experiments.json"
    )

@router.get("/export/csv")
def export_csv():

    experiments = load_experiments()

    file_path = "exports/experiments.csv"

    with open(
        file_path,
        "w",
        newline=""
    ) as csvfile:

        writer = csv.writer(
            csvfile
        )

        writer.writerow([
            "Query",
            "RAG Type",
            "Answer",
            "Total Time",
            "Timestamp"
        ])

        for exp in experiments:

            writer.writerow([

                exp.get(
                    "query",
                    ""
                ),

                exp.get(
                    "rag_type",
                    ""
                ),

                exp.get(
                    "answer",
                    ""
                ),

                exp.get(
                    "metrics",
                    {}
                ).get(
                    "total_time",
                    ""
                ),

                exp.get(
                    "timestamp",
                    ""
                )
            ])

    return FileResponse(
        file_path,
        filename="experiments.csv"
    )