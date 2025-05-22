from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import TodoViewSet

router = DefaultRouter()
router.register(r'todos', TodoViewSet)

urlpatterns = [
    path('', include(router.urls)),
] 