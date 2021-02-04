# coding: utf-8
import json
from django.http.response import HttpResponse, JsonResponse
from django.contrib import auth
from commons.django_model_utils import get_or_none
from commons.django_views_utils import ajax_login_required
from core.service import log_svc, globalsettings_svc, perfil_svc, cartao_svc, fatura_svc, operacao_svc
from django.views.decorators.csrf import csrf_exempt



def dapau(request):
    raise Exception('break on purpose')


@csrf_exempt
def login(request):
    username = request.POST['username']
    password = request.POST['password']
    user = auth.authenticate(username=username, password=password)
    user_dict = {"Erro": "username ou senha inválido"}
    if user is not None:
        if user.is_active:
            auth.login(request, user)
            log_svc.log_login(request.user)
            user_dict = _user2dict(user)
    return JsonResponse(user_dict, safe=False)

@csrf_exempt
def logout(request):
    if request.method.lower() != 'post':
        raise Exception('Logout only via post')
    if request.user.is_authenticated:
        log_svc.log_logout(request.user)
    auth.logout(request)
    return HttpResponse('{}', content_type='application/json')


def whoami(request):
    i_am = {
        'user': _user2dict(request.user),
        'authenticated': True,
    } if request.user.is_authenticated else {'authenticated': False}
    return JsonResponse(i_am)


def settings(request):
    le_settings = globalsettings_svc.list_settings()
    return JsonResponse(le_settings)

@csrf_exempt
def create_profile(request):
    perfil = perfil_svc.add_perfil(request.POST)
    return JsonResponse(perfil, safe=False)

@csrf_exempt
def create_cartao(request):
    cartao = cartao_svc.add_cartao(request.POST)
    return JsonResponse(cartao, safe=False)

@ajax_login_required
def get_fatura(request, data):
    fatura = fatura_svc.get_fatura(data, request.user.perfil)
    return JsonResponse(fatura, safe=False)    

@ajax_login_required
@csrf_exempt
def create_operacao(request):
    if request.user.is_staff:
        response = operacao_svc.create_operacao(request.POST)
        return JsonResponse(response, safe=False)
    return JsonResponse({"Erro": "Requisição inválida"}, safe=False)

@ajax_login_required
def get_limite(request):
    response = fatura_svc.get_limite(request.user.perfil)
    return JsonResponse(response, safe=False)

def _user2dict(user):
    d = {
        'id': user.id,
        'name': user.get_full_name(),
        'username': user.username,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
        'permissions': {
            'ADMIN': user.is_superuser,
            'STAFF': user.is_staff,
        }
    }
    return d
