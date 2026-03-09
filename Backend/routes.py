from fastapi import APIRouter, Depends,HTTPException
from config import supabase,supabase_admin

from auth_verify import get_current_user
from mlmodel import get_prediction,createAppointment
from models import dataInput,appointmentData

router = APIRouter(
        dependencies = [Depends(get_current_user)]
)
# we will still keep the depends(get_current user ) if we wanna use the user objects
from models import AuthData
router = APIRouter()

@router.get('/dashboard')
def dashboard(user = Depends(get_current_user)):
        payload=supabase.table("users") \
                .select("*") \
                .eq("user_id", user.id) \
                .single() \
                .execute()
        payload.data.update({"email": user.email})
        return {
        "message": "Welcome Auth success",
        "user": payload.data
    }

# we dont wanna use user object here so we can skip the depends code and the router will still be dependenct on get_current user
@router.post("/predict")
def predict_endpoint(data:dataInput):
        finalFare = get_prediction(data)
        return{
                "status":"success",
                "prediction":finalFare
        }

@router.post("/appointment")
def book_appointment(data:appointmentData,user=Depends(get_current_user)):
        appointmentData = createAppointment(data,user)
        response=supabase.table("appointments").insert(appointmentData).execute()
        return{
                "status":"success",
                "message":"Appointment Booked",
                "details":response.data
        }

@router.post('/authRole')
def authrole(roles:AuthData , user=Depends(get_current_user)):
        payload=supabase.table("users") \
                .select("*") \
                .eq("user_id", user.id) \
                .single() \
                .execute()
        if payload.data["role"] not in roles.roles:
               raise HTTPException(status_code=401, detail="you are not authorised")
        
        payload.data.update({"email": user.email})
        return {
                "user":payload.data
        }
@router.get("/doctor")
def getDoctor(department:str):
        payload=supabase.table("doctor") \
                .select("*") \
                .eq("department", department) \
                .single() \
                .execute()
        
