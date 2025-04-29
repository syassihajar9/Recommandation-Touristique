import requests
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from django.conf import settings

class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        password = request.data.get("password")
        lieu = request.data.get("lieu")  # Ajouter la récupération du lieu pour l'image

        # Authentifier l'utilisateur
        user = authenticate(username=username, password=password)
        if user:
            # Créer un token JWT pour l'utilisateur
            refresh = RefreshToken.for_user(user)

            # Récupérer l'image via l'API Unsplash
            image_url = self.get_image_from_unsplash(lieu)

            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'image_url': image_url,  # Ajouter l'URL de l'image dans la réponse
            }, status=status.HTTP_200_OK)
        
        return Response({"detail": "Identifiants invalides"}, status=status.HTTP_401_UNAUTHORIZED)

    def get_image_from_unsplash(self, lieu):
        """Méthode pour récupérer une image d'Unsplash en fonction du lieu"""
        url = f"https://api.unsplash.com/photos/random?query={lieu}&client_id={settings.UNSPLASH_ACCESS_KEY}"
        try:
            response = requests.get(url)
            data = response.json()

            # Récupérer l'URL de la première image trouvée
            image_url = data[0]['urls']['regular'] if data else None

            return image_url or "https://via.placeholder.com/300"  # Image par défaut si aucune image trouvée
        except requests.exceptions.RequestException as e:
            return "https://via.placeholder.com/300"  # Retourne une image par défaut en cas d'erreur
