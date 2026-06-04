import json
import os

EXPERIMENT_FILE = (
    "app/experiments/experiments.json"
)


def load_experiments():

    if not os.path.exists(
        EXPERIMENT_FILE
    ):
        return []

    with open(
        EXPERIMENT_FILE,
        "r"
    ) as file:

        return json.load(file)


def save_experiment(
    experiment
):

    experiments = (
        load_experiments()
    )

    experiments.append(
        experiment
    )

    with open(
        EXPERIMENT_FILE,
        "w"
    ) as file:

        json.dump(
            experiments,
            file,
            indent=4
        )

    return experiment