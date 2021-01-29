from django.contrib import admin

from core.models import ActivityLog, Perfil, Cartao, Fatura, Operacao


class ActivityLogAdmin(admin.ModelAdmin):
    list_display = ('type', 'logged_user', 'created_at')

class PerfilAdmin(admin.ModelAdmin):
    list_display = ('user', 'cpf', 'renda')

class CartaoAdmin(admin.ModelAdmin):
    list_display = ('id', 'data_emissao', 'numero', 'limite', 'perfil')

class FaturaAdmin(admin.ModelAdmin):
    list_display = ('id', 'data_vencimento', 'ta_pago', 'fechada', 'cartao', 'perfil')

class OperacaoAdmin(admin.ModelAdmin):
    list_display = ('id', 'tipo', 'estabelecimento', 'data', 'prestacoes_total', 'perfil', 'cartao')    


admin.site.register(ActivityLog, ActivityLogAdmin)
admin.site.register(Perfil, PerfilAdmin)
admin.site.register(Cartao, CartaoAdmin)
admin.site.register(Fatura, FaturaAdmin)
admin.site.register(Operacao, OperacaoAdmin)