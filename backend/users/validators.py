from django.core.exceptions import ValidationError
from django.utils import timezone
from datetime import datetime

def Validator_birthDay(value):
    if isinstance(value, str):
        value = datetime.strptime(value, '%Y-%m-%d').date()
    age = datetime.now().date() - value
    if age.days / 365 < 18:
        raise ValueError("User must be at least 18 years old.")
