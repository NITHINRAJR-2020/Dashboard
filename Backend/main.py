from fastapi import FastAPI
from login import router as auth_router
from fastapi.middleware.cors import CORSMiddleware
app=FastAPI()
app = FastAPI(title="FleetFlow", version="1.0.0")



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth_router)

@app.get('/Dashboard')
def Dashboard():
    return {"message": "Welcome"}
    
@app.post("/predict")
async def get_prediction(data:ModelInput):
    result = (data.feature_a + data.feaute_b)/2
    return {"prediction": result,"Status":"success"}