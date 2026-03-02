from fastapi import APIRouter

router=APIRouter()
@router.post("/predict")
async def get_prediction(data:ModelInput):
    result = (data.feature_a + data.feaute_b)/2
    return {"prediction": result,"Status":"success"}