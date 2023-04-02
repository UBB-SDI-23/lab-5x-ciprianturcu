import re

from rest_framework import serializers
from .models import Attorney, Lawsuit, Client, AttorneyOnLawsuit


class AttorneySerializer(serializers.ModelSerializer):
    def validate(self, data):
        pattern = r'^[a-zA-Z\s]+$'
        if not bool(re.match(pattern, data['name'])):
            raise serializers.ValidationError('Name must contain only letters and spaces')
        return data

    class Meta:
        model = Attorney
        fields = '__all__'


class LawsuitSerializer(serializers.ModelSerializer):

    def validate(self, data):
        pattern = r'^[a-zA-Z\s-]+$'
        if not bool(re.match(pattern, data['state'])):
            raise serializers.ValidationError('City must contain only letters, spaces and hyphens')
        return data

    class Meta:
        model = Lawsuit
        fields = ('description', 'type', 'state', 'courtDate','client')


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
        fields = ('name', 'phoneNumber', 'city', 'date_of_birth', 'type', 'lawsuits')


class AttorneyOnLawsuitSerializer(serializers.ModelSerializer):
    class Meta:
        model = AttorneyOnLawsuit
        fields = '__all__'


# DTOs go here
class LawsuitProfitReportDTO(serializers.Serializer):
    description = serializers.CharField()
    profit = serializers.IntegerField(default=0)


class AttorneyTravelDTO(serializers.Serializer):
    name = serializers.CharField()
    city = serializers.CharField()
    lawsuit_state = serializers.CharField()
