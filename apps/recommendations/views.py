from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Recommendation
from .serializers import RegisterSerializer, RecommendationSerializer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
import requests
from django.conf import settings
import google.generativeai as genai  # <-- import Gemini

# Configuration de Gemini
genai.configure(api_key=settings.GEMINI_API_KEY)

# Vue pour l'inscription
class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'detail': 'Utilisateur créé avec succès.'}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Vue pour la connexion
class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_200_OK)

        return Response({"detail": "Identifiants invalides"}, status=status.HTTP_401_UNAUTHORIZED)

# Vue pour récupérer la météo
class GetWeather(APIView):
    def get(self, request, city_name):
        api_key = settings.OPENWEATHERMAP_API_KEY
        url = f"http://api.openweathermap.org/data/2.5/weather?q={city_name}&appid={api_key}&units=metric&lang=fr"

        response = requests.get(url)

        if response.status_code == 200:
            data = response.json()
            result = {
                'temp': data['main']['temp'],
                'description': data['weather'][0]['description'],
                'icon': data['weather'][0]['icon']
            }
            return Response(result)
        else:
            return Response({"detail": "Erreur lors de la récupération des données météo."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Page d'accueil
def home(request):
    return render(request, 'index.html')

# --- CORRECTION ICI pour Gemini
def generate_recommendation_with_gemini(prompt_text):
    try:
        model = genai.GenerativeModel('models/gemini-1.5-pro')  # <-- correction ici !!
        response = model.generate_content(prompt_text)
        return response.text
    except Exception as e:
        print(f"Erreur lors de l'appel Gemini: {e}")
        return None

# Vue pour créer une recommandation touristique
class CreateRecommendation(APIView):
    def post(self, request):
        try:
            # Extraire les données
            lieu = request.data.get('lieu')
            budget = request.data.get('budget')
            activite = request.data.get('activite')
            climat = request.data.get('climat')
            transport = request.data.get('transport')

            # Vérification des champs
            if not all([lieu, budget, activite, climat, transport]):
                return Response(
                    {"detail": "Tous les champs sont nécessaires."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Créer le prompt pour Gemini
            prompt = (
                f"Recommande un lieu à visiter avec les critères suivants : "
                f"Lieu: {lieu}, Budget: {budget}, Activité: {activite}, Climat: {climat}, Transport: {transport}. "
                f"Fais une belle description pour donner envie d'y aller."
            )

            # Appel à Gemini pour générer la description
            generated_description = generate_recommendation_with_gemini(prompt)

            if not generated_description:
                return Response({"detail": "Erreur lors de la génération de la recommandation."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            # Appel à Unsplash pour récupérer l'image
            image_response = requests.get(f"https://api.unsplash.com/photos/random?query={lieu}&client_id={settings.UNSPLASH_ACCESS_KEY}")
            image_data = image_response.json()

            if image_data and isinstance(image_data, list) and len(image_data) > 0:
                image_url = image_data[0]['urls']['regular']
            else:
                image_url = None  # Aucune image trouvée

            # Création et enregistrement de la recommandation
            recommendation = Recommendation.objects.create(
                title=f"Découverte de {lieu}",
                description=generated_description,
                activite=activite,
                budget=budget,
                climat=climat,
                transport=transport,
                image_url=image_url  # L'image récupérée depuis Unsplash
            )

            # Sérialisation et renvoi
            serializer = RecommendationSerializer(recommendation)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except Exception as e:
            print(f"Erreur lors de la création de la recommandation: {e}")
            return Response(
                {"detail": f"Erreur serveur : {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

# Vue pour récupérer une image depuis Unsplash
class GetImage(APIView):
    def get(self, request, lieu):
        url = f"https://api.unsplash.com/photos/random?query={lieu}&client_id={settings.UNSPLASH_ACCESS_KEY}"

        try:
            response = requests.get(url)
            data = response.json()
            print("Données de l'API Unsplash:", data)

            if isinstance(data, dict) and 'urls' in data:
                image_url = data['urls']['regular']
                return Response({"image_url": image_url}, status=status.HTTP_200_OK)
            else:
                return Response({"detail": "Aucune image trouvée."}, status=status.HTTP_404_NOT_FOUND)

        except requests.exceptions.RequestException as e:
            return Response({"detail": f"Erreur lors de la récupération de l'image : {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            return Response({"detail": f"Erreur inattendue : {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
