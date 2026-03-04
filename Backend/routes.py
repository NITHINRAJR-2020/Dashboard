from fastapi import APIRouter, Depends,HTTPException
from config import supabase
from auth_verify import get_current_user
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
        
