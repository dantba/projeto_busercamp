from core.models import Perfil, Cartao, Operacao, Fatura
from core.service import helper_svc, perfil_svc
from django.contrib.auth.models import User
import json


def get_fatura(mes, ano, perfil):
    fatura = helper_svc.get_object_or_none(Fatura, mes=mes, ano=ano)
    if fatura == None:
        return create_fatura(mes, ano, perfil)
    elif fatura.fechada:
        return update_fatura(mes, ano, fatura)
    return fatura

def update_fatura(mes, ano, fatura):
    return

def create_fatura(mes, ano, perfil):
    return