from fastapi import FastAPI
from login import router as auth_router
from fastapi.middleware.cors import CORSMiddleware
from routes import router as main_router
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
<<<<<<< HEAD
app.include_router(main_router)
=======


    

>>>>>>> ce731f000e10c1488419c09c0f980f3b4807c25
