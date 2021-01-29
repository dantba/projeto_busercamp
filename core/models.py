from django.db import models
from django.contrib.auth.models import User


class ActivityLog(models.Model):
    type = models.CharField(max_length=64)
    logged_user = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL)
    fromuser = models.ForeignKey(User, null=True, blank=True, related_name="activitylogs_withfromuser", on_delete=models.SET_NULL)
    jsondata = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField('criado em', auto_now_add=True)

    class Meta:
        ordering = ('-created_at',)

    def __str__(self):
        return '%s / %s / %s' % (
            self.type,
            self.logged_user,
            self.created_at,
        )



class Perfil(models.Model):
    user = models.OneToOneField(User, related_name='perfil', on_delete=models.CASCADE)
    cpf = models.CharField(max_length=14, unique=True, null=True, blank=True)
    renda = models.FloatField()

    class Meta:
        verbose_name_plural = "Perfis"

    def to_dict_json(self):
        return{
            'cpf': self.cpf,
            'renda': self.renda,
            'userData': _user2dict(self.user),
        }

class Cartao(models.Model):
    data_emissao = models.DateField()
    numero = models.CharField(max_length=16, unique=True)
    data_emissao = models.DateField()
    limite = models.FloatField()
    perfil = models.ForeignKey('perfil', on_delete=models.CASCADE)

       
    class Meta:
        verbose_name_plural = "Cartoes"

    def to_dict_json(self):
        return{
            'data_emissao': self.data_emissao,
            'numero': self.numero,
            'limite': self.limite,
            'perfil': self.perfil.to_dict_json()
        }

class Operacao(models.Model):
    tipo = models.CharField(max_length=10)
    valor = models.FloatField()
    estabelecimento = models.CharField(max_length=30)
    data = models.DateField()
    prestacoes_total = models.IntegerField()
    perfil = models.ForeignKey('perfil', on_delete=models.SET_NULL, null=True)
    cartao = models.ForeignKey('cartao', on_delete=models.SET_NULL, null=True)
   
    class Meta:
        verbose_name_plural = "Operacoes"

    def to_dict_json(self):
        return{
            'tipo': self.tipo,
            'estabelecimento': self.estabelecimento,
            'data': self.data,
            'prestacoes_total': self.prestacoes_total,
            'perfil': self.perfil,
            'cartao': self.cartao
        }



class Fatura(models.Model):
    data_vencimento = models.DateField()
    cartao = models.ForeignKey('cartao', on_delete=models.SET_NULL, null=True)
    perfil = models.ForeignKey('perfil', on_delete=models.SET_NULL, null=True)
    fechada = models.BooleanField()
    ta_pago = models.BooleanField()
    total = models.FloatField()
    operacoes = models.ManyToManyField(Operacao)
    def to_dict_json(self):
        return{
            'data_vencimento': self.data_vencimento,
            'fechada': self.fechada,
            'ta_pago': self.ta_pago,
            'cartao': self.data_vencimento,
            'perfil': self.perfil.to_dict_json(),
            'operacoes': [o.to_dict_json for o in self.operacoes]
        }
            


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