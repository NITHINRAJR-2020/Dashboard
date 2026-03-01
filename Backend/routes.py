from fastapi import APIRouter, Request, Form, Response ,HTTPException
from auth_verify import get_current_user
router = APIRouter()

@router.post('/dashboard')
def dashboard(user:get_current_user):
    return{
        "message":"Welcome Auth success"
    }