from fastapi import APIRouter
from predictPrice import fare
from models import dataInput


def get_prediction(data:dataInput):
    
    result = fare(data.num1,data.num2)
    return result