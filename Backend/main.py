
from mlmodel import get_prediction
from models import dataInput
from fastapi import FastAPI
from login import router as auth_router
from fastapi.middleware.cors import CORSMiddleware
from routes import router as main_router
from mlmodel import get_prediction

# app=FastAPI()
app = FastAPI(title="FleetFlow", version="1.0.0")



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth_router)
app.include_router(main_router)


@app.post("/predict")
def predict_endpoint(data:dataInput):
    finalFare = get_prediction(data)

    return {
        "status":"success",
        "prediction":finalFare
    }