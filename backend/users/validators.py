from django.core.exceptions import ValidationError
from django.utils import timezone
from datetime import timedelta


def Validator_birthDay(value):
    current = timezone.now().date()
    age = current - timedelta(days=6*365)
    if (value > age):
        ValueError("User must must be at least 6 years old.")