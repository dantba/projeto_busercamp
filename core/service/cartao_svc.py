from core.models import Perfil, Cartao
from core.service import helper_svc, perfil_svc
from django.contrib.auth.models import User
import json
from random import random, randint
from datetime import date

def add_cartao(perfil_json):
    limite = verifica_score(float(perfil_json['renda']))
    limite = ((limite + 10)//10)*10
    if limite < 500:
        return{"accepted": False, "Erro": "Cartão Recusado"}
    perfil = perfil_svc.add_perfil(perfil_json)
    if(perfil['accepted']):
        #Gera numero aleatorio de cartao até encontrar um que não exista
        numero_cartao = ""
        while True:
            numero_cartao = gerar_num()
            if helper_svc.get_object_or_none(Cartao, numero=numero_cartao) == None:
                break
        cartao = Cartao(data_emissao=date.today(), numero=numero_cartao, limite=limite, perfil=perfil['perfil'])  
        cartao.save()
        return {"accepted": True, "cartao": cartao.to_dict_json()}

    return {"accepted": False, "Erro": "Perfil já cadastrado"}

def get_cartao(cpf):
    return helper_svc.get_object_or_none(Cartao, perfil__cpf=cpf)

def verifica_score(renda):
    return random()*renda

def gerar_num():
    numero = "5"
    for i in range(0, 15):
        numero+=str(randint(0,9))
    return numero

def dict_to_perfil(json):
    print(json)
    return Perfil(
        user=User(username=json['userData']['username'], first_name=json['userData']['name'], email=json['userData']['email']),
        cpf=json['cpf'],
        renda=json['renda']
    )
