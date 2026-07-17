# -*- coding: utf-8 -*-
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
import json
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_FILE = "/tmp/data.json"

DEFAULT_STATE = {
    "settings": {"cals": 870, "name": "Archibald", "age": 12, "weight": 21.5},
    "weightLog": [
        {"date": "15.11", "value": 22.1},
        {"date": "20.11", "value": 21.8},
        {"date": "25.11", "value": 21.5},
        {"date": "01.12", "value": 21.3},
        {"date": "07.12", "value": 21.2},
        {"date": "Seg", "value": 21.0, "today": True}
    ],
    "medicines": [
        {"name": "Urzahol", "type": "Antiinflammatory", "dosage": "1 tab.", "morning": "09:00", "evening": "21:00", "icon": "fa-capsules", "color": "purple"},
        {"name": "Gepatosan", "type": "Hepatoprotector", "dosage": "1 tab.", "morning": "09:00", "day": "18:00", "icon": "fa-pills", "color": "blue"}
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


@app.post("/api/weight")
async def add_weight(request: Request):
    entry = await request.json()
    state = read_state()
    state["weightLog"] = [{**w, "today": False} for w in state["weightLog"]]
    entry["today"] = True
    state["weightLog"].append(entry)
    if len(state["weightLog"]) > 8:
        state["weightLog"] = state["weightLog"][-8:]
    write_state(state)
    return {"ok": True, "weightLog": state["weightLog"]}


@app.post("/api/medicine")
async def add_medicine(request: Request):
    med = await request.json()
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
async def add_recipe(request: Request):
    recipe = await request.json()
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
async def save_settings(request: Request):
    settings = await request.json()
    state = read_state()
    state["settings"] = settings
    write_state(state)
    return {"ok": True}


@app.get("/")
def root():
    return {"status": "ok", "service": "archie-health-api"}
