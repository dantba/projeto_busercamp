from core import views
from django.urls import path

urlpatterns = [
    path('api/dapau', views.dapau),
    path('api/login', views.login),
    path('api/logout', views.logout),
    path('api/whoami', views.whoami),
    path('api/settings', views.settings),
    path('api/profile/create', views.create_profile),
    path('api/cartao/create', views.create_cartao),
    path('api/fatura/get/data=<str:data>', views.get_fatura),
    path('api/operacao/create', views.create_operacao),
    path('api/limite/get', views.get_limite)
]
