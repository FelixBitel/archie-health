from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import Any
import json
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_FILE = "data.json"

DEFAULT_STATE = {
    "settings": {"cals": 870, "name": "Арчибальд", "age": 12, "weight": 21.5},
    "weightLog": [
        {"date": "15.11", "value": 22.1},
        {"date": "20.11", "value": 21.8},
        {"date": "25.11", "value": 21.5},
        {"date": "01.12", "value": 21.3},
        {"date": "07.12", "value": 21.2},
        {"date": "Сег", "value": 21.0, "today": True}
    ],
    "medicines": [
        {"name": "Урзахол", "type": "Противовоспалительное", "dosage": "1 таб.", "morning": "09:00", "evening": "21:00", "icon": "fa-capsules", "color": "purple"},
        {"name": "Гепатосан", "type": "Гепатопротектор", "dosage": "1 таб.", "morning": "09:00", "day": "18:00", "icon": "fa-pills", "color": "blue"}
    ],
    "recipes": []
}


def read_state() -> dict:
    if not os.path.exists(DATA_FILE):
        write_state(DEFAULT_STATE)
        return DEFAULT_STATE
    try:
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return DEFAULT_STATE


def write_state(data: dict):
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


@app.get("/api/state")
def get_state():
    return read_state()


class StatePayload(BaseModel):
    data: Any


@app.post("/api/state")
def save_state(payload: StatePayload):
    write_state(payload.data)
    return {"ok": True}


@app.post("/api/weight")
def add_weight(entry: dict):
    state = read_state()
    state["weightLog"] = [{**w, "today": False} for w in state["weightLog"]]
    entry["today"] = True
    state["weightLog"].append(entry)
    if len(state["weightLog"]) > 8:
        state["weightLog"] = state["weightLog"][-8:]
    write_state(state)
    return {"ok": True, "weightLog": state["weightLog"]}


@app.post("/api/medicine")
def add_medicine(med: dict):
    state = read_state()
    state["medicines"].append(med)
    write_state(state)
    return {"ok": True, "medicines": state["medicines"]}


@app.delete("/api/medicine/{idx}")
def delete_medicine(idx: int):
    state = read_state()
    if idx < 0 or idx >= len(state["medicines"]):
        raise HTTPException(status_code=404, detail="Not found")
    state["medicines"].pop(idx)
    write_state(state)
    return {"ok": True, "medicines": state["medicines"]}


@app.post("/api/recipe")
def add_recipe(recipe: dict):
    state = read_state()
    state["recipes"].insert(0, recipe)
    if len(state["recipes"]) > 10:
        state["recipes"] = state["recipes"][:10]
    write_state(state)
    return {"ok": True, "recipes": state["recipes"]}


@app.delete("/api/recipes")
def clear_recipes():
    state = read_state()
    state["recipes"] = []
    write_state(state)
    return {"ok": True}


@app.post("/api/settings")
def save_settings(settings: dict):
    state = read_state()
    state["settings"] = settings
    write_state(state)
    return {"ok": True}


app.mount("/client", StaticFiles(directory="client"), name="client")

@app.get("/")
def root():
    return FileResponse("client/index.html")

@app.get("/archie.jpg")
def archie_jpg():
    return FileResponse("archie.jpg")
