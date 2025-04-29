from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Recommendation

User = get_user_model()

# Serializer pour les utilisateurs (inscription)
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True},
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

# Serializer pour les recommandations
class RecommendationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recommendation
        fields = [
            'id', 'title', 'description', 'activite', 'budget', 
            'climat', 'transport', 'created_at', 'updated_at', 'image_url'
        ]
