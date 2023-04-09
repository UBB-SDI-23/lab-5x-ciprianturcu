import re

from rest_framework import serializers

from api.models import Client


class ClientSerializer(serializers.ModelSerializer):
    lawsuits = LawsuitSerializer(many=True, read_only=True)

    def validate(self, data):
        pattern_city = r'^[a-zA-Z\s-]+$'
        pattern_name = r'^[a-zA-Z\s]+$'
        if not bool(re.match(pattern_name, data['name'])):
            raise serializers.ValidationError('Name must contain only letters and spaces')
        if not data['phoneNumber'].isdigit():
            raise serializers.ValidationError('Phone number must contain only digits!')
        if len(data['phoneNumber']) != 10:
            raise serializers.ValidationError('Phone number must be 10 digits long!')
        if not bool(re.match(pattern_city, data['city'])):
            raise serializers.ValidationError('City must contain only letters and  spaces')
        return data

    class Meta:
        model = Client
        fields = ('id','name', 'phoneNumber', 'city', 'date_of_birth', 'type', 'lawsuits')

