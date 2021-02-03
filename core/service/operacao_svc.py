from core.models import Perfil, Cartao, Operacao
from core.service import helper_svc, perfil_svc
from django.contrib.auth.models import User
import json

def create_operacao():
    