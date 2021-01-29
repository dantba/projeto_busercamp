from core import views
from django.urls import path

urlpatterns = [
    path('api/dapau', views.dapau),
    path('api/login', views.login),
    path('api/logout', views.logout),
    path('api/whoami', views.whoami),
    path('api/settings', views.settings),
    path('api/profile/create', views.create_profile),
    path('api/cartao/create', views.create_cartao)
]
