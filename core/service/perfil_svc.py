from core.models import Perfil
from django.contrib.auth.models import User
import json
from django.core.exceptions import ObjectDoesNotExist
from core.service import helper_svc

def add_perfil(perfil_json):
    perfil = dict_to_perfil(perfil_json)
    if helper_svc.get_object_or_none(Perfil, cpf=perfil.cpf)!=None or helper_svc.get_object_or_none(User, username=perfil.user.username)!=None:
        return {'accepted': False, 'Erro': 'Tanto CPF quanto username devem ser únicos'}
    user = User.objects.create_user(username = perfil.user.username, email = perfil.user.email, password = perfil.user.password, first_name = perfil.user.first_name)
    perfil.user = user
    perfil.save()
    return {'accepted': True, 'perfil': perfil}

    

def dict_to_perfil(json):
    return Perfil(
        user=User(username=json['username'], first_name=json['name'] ,email=json['email'],password=json['password']),
        cpf=json['cpf'],
        renda=json['renda']
    )

def get_perfil_by_cpf(cpf):
    perfil = helper_svc.get_object_or_none(Perfil, cpf=cpf)
    if perfil == None: 
        return {"Erro": "Usuário não encontrado"}
    return perfil.to_dict_json()
