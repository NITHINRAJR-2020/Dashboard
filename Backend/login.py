from fastapi import APIRouter, Request, Form, Response ,HTTPException
from config import supabase
from models import UserCreate , UserLogin
router = APIRouter()

@router.post('/signup')
async def signup_submit(userData:UserCreate):
    # Step 1: Create Auth User
    auth_response = supabase.auth.sign_up({
    "email": userData.email,
    "password": userData.password
    })
    
    user = auth_response.user
    if not auth_response.user:
        supabase.auth.admin.delete_user(user.id)
        raise HTTPException(status_code=400, detail="Signup failed")
    payload = {
    "user_id": user.id,
    "name": userData.name,
    "gender": userData.gender.lower(),
    "role": userData.role.lower(),   
    "phone": userData.phone,
    "address": userData.address,
    "date_of_birth": str(userData.date_of_birth) if userData.date_of_birth else None
    }
    try:
        response = supabase.table("users").insert(payload).execute()
    except Exception as e:
        supabase.auth.admin.delete_user(user.id)
        raise HTTPException(status_code=400, detail=f"Profile creation failed: {str(e)}")
    
    user = auth_response.user
    session = auth_response.session

    return {
        "access_token": session.access_token,
        "refresh_token": session.refresh_token
    }

@router.post("/login")
async def user_login(UserData : UserLogin):
    try:
        # Step 1: Authenticate user
        auth_response = supabase.auth.sign_in_with_password({
            "email": UserData.email.strip(),
            "password": UserData.password
        })

    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    
    if not auth_response.user:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    
    user = auth_response.user
    session = auth_response.session
    profile_response = supabase.table("users") \
        .select("*") \
        .eq("user_id", user.id) \
        .single() \
        .execute()

    if not profile_response.data:
        raise HTTPException(status_code=404, detail="Profile not found")

    return {
        "access_token": session.access_token,
        "refresh_token": session.refresh_token,
        "user": profile_response.data
    }
