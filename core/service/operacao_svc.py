from core.models import Perfil, Cartao, Operacao, Fatura
from core.service import helper_svc, perfil_svc, fatura_svc
from django.contrib.auth.models import User
import json
from dateutil.relativedelta import relativedelta
from datetime import date, datetime

def create_operacao(jsonData):
    try:
        dateaux = date.fromisoformat(jsonData['data'])
        perfil = Perfil.objects.get(id=jsonData['perfil_id'])
        cartao = Cartao.objects.get(id=jsonData['cartao_id'])
        ult_mes = (dateaux + relativedelta(months=+int(jsonData['prestacoes_total'])+1)).month 
        operacao = Operacao(
            tipo=jsonData['tipo'],
            perfil=perfil,
            cartao=cartao,
            valor=jsonData['valor'],
            estabelecimento=jsonData['estabelecimento'],
            mes_final=ult_mes,
            data=dateaux,
            prestacoes_total=jsonData['prestacoes_total']
            )
        operacao.save()
        for i in range(0, int(jsonData['prestacoes_total'])):
            fatura = helper_svc.get_object_or_none(Fatura, data_vencimento=date(dateaux.year, dateaux.month+1+i, 8), perfil=perfil)
            if fatura == None:
                fatura = Fatura(
                    data_vencimento=date(dateaux.year, dateaux.month+1+i, 8), 
                    cartao=cartao, 
                    perfil=perfil,
                    fechada=False,
                    ta_pago=False,
                    total=0
                    )
                fatura.save()

            fatura.operacoes.add(operacao)
            valorT = 0

            for o in fatura.operacoes.all():
                if(o.tipo=="Compra"):
                    valorT += o.valor/o.prestacoes_total
            fatura.total = valorT
            fatura.save()  
        return {"Mensagem": "Operacao criada"}
    except Exception as e:
        print(e)
        return {"Erro": "Erro ao criar operacao"}