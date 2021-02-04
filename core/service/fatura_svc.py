from core.models import Perfil, Cartao, Operacao, Fatura
from core.service import helper_svc, perfil_svc
from django.contrib.auth.models import User
from datetime import date
import json


def get_fatura(data_vencimento, perfil):
    fatura = helper_svc.get_object_or_none(Fatura, data_vencimento=date.fromisoformat(data_vencimento), perfil=perfil)
    if fatura == None:
        return {"Erro": "Fatura inexistente em nosso sistema"}
    return fatura.to_dict_json()

def get_limite(perfil):
    faturas = Fatura.objects.filter(perfil=perfil, ta_pago=False)
    cartao = Cartao.objects.get(perfil=perfil)
    utilizado = 0
    if faturas.exists():
        for f in faturas:
            utilizado += f.total
        
    return{"total": cartao.limite, "utilizado": utilizado, "disponivel": cartao.limite-utilizado}


