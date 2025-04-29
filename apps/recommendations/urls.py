from django.urls import path
from .views import RegisterView, LoginView, GetWeather, CreateRecommendation, GetImage, CreateRecommendation 

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('weather/<str:city_name>/', GetWeather.as_view(), name='weather'),
    path('create-recommendation/', CreateRecommendation.as_view(), name='create_recommendation'),
    path('get-image/<str:lieu>/', GetImage.as_view(), name='get_image'),  # Assure-toi que cette ligne est présente
    path('generate-recommendation/', CreateRecommendation.as_view(), name='generate-recommendation'),

]

