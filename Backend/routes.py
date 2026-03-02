from fastapi import APIRouter, Depends,HTTPException
from config import supabase
from auth_verify import get_current_user
router = APIRouter()

@router.get('/dashboard')
def dashboard(user = Depends(get_current_user)):
        payload=supabase.table("users") \
                .select("*") \
                .eq("user_id", user.id) \
                .single() \
                .execute()
        return {
        "message": "Welcome Auth success",
        "user": payload.data
    }

