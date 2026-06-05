import json
import os

DATASET_FILE = (
    "app/datasets/datasets.json"
)


def load_datasets():

    if not os.path.exists(
        DATASET_FILE
    ):
        return []

    with open(
        DATASET_FILE,
        "r"
    ) as file:

        return json.load(file)


def save_dataset_metadata(
    dataset
):

    datasets = (
        load_datasets()
    )

    datasets.append(
        dataset
    )

    with open(
        DATASET_FILE,
        "w"
    ) as file:

        json.dump(
            datasets,
            file,
            indent=4
        )